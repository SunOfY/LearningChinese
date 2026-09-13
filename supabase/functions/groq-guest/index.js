import { createClient } from 'npm:@supabase/supabase-js@2';

const DEFAULT_LIMIT = 20;
const DEFAULT_ALLOWED_ORIGINS = [
  'https://sunofy.github.io',
  'http://localhost:8000',
  'http://127.0.0.1:8000',
  'http://localhost:5500',
  'http://127.0.0.1:5500'
];

function json(data, status = 200, origin = '') {
  const headers = new Headers({
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'Vary': 'Origin'
  });
  if (origin) headers.set('Access-Control-Allow-Origin', origin);
  headers.set('Access-Control-Allow-Headers', 'content-type, apikey, authorization');
  headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  return new Response(JSON.stringify(data), { status, headers });
}

function allowedOrigins() {
  const configured = String(Deno.env.get('GROQ_GUEST_ALLOWED_ORIGINS') || '')
    .split(',')
    .map(x => x.trim())
    .filter(Boolean);
  return new Set(configured.length ? configured : DEFAULT_ALLOWED_ORIGINS);
}

function resolveOrigin(req) {
  const origin = String(req.headers.get('origin') || '').trim();
  if (!origin) return '';
  return allowedOrigins().has(origin) ? origin : null;
}

function envKeyMap(name) {
  try {
    const raw = Deno.env.get(name);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Object.values(parsed || {}).filter(v => typeof v === 'string');
  } catch {
    return [];
  }
}

function serviceKey() {
  return Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || envKeyMap('SUPABASE_SECRET_KEYS')[0] || '';
}

function acceptedPublishableKeys() {
  const keys = envKeyMap('SUPABASE_PUBLISHABLE_KEYS');
  const legacy = Deno.env.get('SUPABASE_ANON_KEY');
  if (legacy) keys.push(legacy);
  return keys;
}

function parseLimit() {
  const n = Number(Deno.env.get('GROQ_GUEST_LIMIT') || DEFAULT_LIMIT);
  return Number.isFinite(n) ? Math.max(1, Math.min(Math.floor(n), 1000)) : DEFAULT_LIMIT;
}

async function sha256(value) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2, '0')).join('');
}

function validGuestId(value) {
  const id = String(value || '');
  return /^[A-Za-z0-9._:-]{16,200}$/.test(id) ? id : '';
}

function rowFromRpc(data) {
  if (Array.isArray(data)) return data[0] || {};
  return data || {};
}

Deno.serve(async (req) => {
  const origin = resolveOrigin(req);
  if (req.method === 'OPTIONS') {
    if (origin === null) return json({ error: 'Origin not allowed', code: 'ORIGIN_NOT_ALLOWED' }, 403, '');
    return json({ ok: true }, 200, origin || '');
  }

  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405, origin || '');
  if (origin === null) return json({ error: 'Origin not allowed', code: 'ORIGIN_NOT_ALLOWED' }, 403, '');

  // The publishable key is public, so this is not a secret-auth mechanism. It simply
  // rejects accidental calls that are not coming through this Supabase project client.
  const accepted = acceptedPublishableKeys();
  const providedApiKey = String(req.headers.get('apikey') || '');
  if (accepted.length && !accepted.includes(providedApiKey)) {
    return json({ error: 'Invalid project key', code: 'INVALID_PROJECT_KEY' }, 401, origin || '');
  }

  const groqKey = String(Deno.env.get('GROQ_GUEST_API_KEY') || '').trim();
  const url = String(Deno.env.get('SUPABASE_URL') || '').trim();
  const adminKey = serviceKey();
  const limit = parseLimit();
  if (!groqKey || !url || !adminKey) {
    return json({ error: 'Guest AI is not configured', code: 'GUEST_NOT_CONFIGURED', limit, remaining: 0 }, 503, origin || '');
  }

  const admin = createClient(url, adminKey, { auth: { persistSession: false, autoRefreshToken: false } });
  const contentType = String(req.headers.get('content-type') || '');

  let action = '';
  let guestId = '';
  let audio = null;

  try {
    if (contentType.includes('application/json')) {
      const body = await req.json();
      action = String(body?.action || 'status');
      guestId = validGuestId(body?.guestId);
    } else if (contentType.includes('multipart/form-data')) {
      const form = await req.formData();
      action = String(form.get('action') || 'transcribe');
      guestId = validGuestId(form.get('guestId'));
      const candidate = form.get('audio');
      audio = candidate instanceof File ? candidate : null;
    } else {
      return json({ error: 'Unsupported content type', code: 'BAD_CONTENT_TYPE' }, 415, origin || '');
    }
  } catch {
    return json({ error: 'Invalid request body', code: 'BAD_REQUEST' }, 400, origin || '');
  }

  if (!guestId) return json({ error: 'Missing guest ID', code: 'INVALID_GUEST_ID' }, 400, origin || '');
  const guestHash = await sha256(guestId);

  if (action === 'status') {
    const { data, error } = await admin
      .from('guest_groq_usage')
      .select('used_count')
      .eq('guest_hash', guestHash)
      .maybeSingle();
    if (error) return json({ error: 'Quota storage is not ready', message: error.message, code: 'GUEST_QUOTA_DB_ERROR' }, 500, origin || '');
    const used = Math.max(0, Number(data?.used_count || 0));
    return json({ ok: true, available: true, guest: true, limit, used, remaining: Math.max(limit - used, 0) }, 200, origin || '');
  }

  if (action !== 'transcribe') return json({ error: 'Unknown action', code: 'UNKNOWN_ACTION' }, 400, origin || '');
  if (!audio || !audio.size) return json({ error: 'Audio is empty', code: 'EMPTY_AUDIO' }, 400, origin || '');
  if (audio.size > 8 * 1024 * 1024) return json({ error: 'Audio file is too large', code: 'AUDIO_TOO_LARGE' }, 413, origin || '');

  // Reserve one of the 20 attempts before calling Groq so simultaneous requests cannot
  // race past the quota. If Groq fails, the reservation is refunded below.
  const { data: quotaData, error: quotaError } = await admin.rpc('consume_guest_groq_trial', {
    p_guest_hash: guestHash,
    p_limit: limit
  });
  if (quotaError) return json({ error: 'Quota storage is not ready', message: quotaError.message, code: 'GUEST_QUOTA_DB_ERROR' }, 500, origin || '');

  const quota = rowFromRpc(quotaData);
  const allowed = Boolean(quota.allowed);
  const used = Math.max(0, Number(quota.used_count || 0));
  const remaining = Math.max(0, Number(quota.remaining || 0));
  if (!allowed) {
    return json({ error: 'Free guest AI limit reached', message: 'Free guest AI limit reached.', code: 'GUEST_LIMIT_REACHED', guest: true, limit, used, remaining: 0 }, 429, origin || '');
  }

  try {
    const groqForm = new FormData();
    groqForm.append('file', audio, audio.name || 'pronunciation.webm');
    groqForm.append('model', 'whisper-large-v3-turbo');
    groqForm.append('language', 'zh');
    groqForm.append('response_format', 'json');
    groqForm.append('temperature', '0');

    // Intentionally do not prompt Groq with the target word. A target prompt could bias
    // transcription toward the expected answer and make a pronunciation check too lenient.
    const groqResponse = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${groqKey}` },
      body: groqForm
    });

    let groqData = {};
    try { groqData = await groqResponse.json(); } catch {}
    if (!groqResponse.ok) {
      await admin.rpc('refund_guest_groq_trial', { p_guest_hash: guestHash });
      const message = String(groqData?.error?.message || groqData?.message || `Groq HTTP ${groqResponse.status}`);
      return json({ error: 'Groq transcription failed', message, code: 'GROQ_TRANSCRIBE_ERROR', guest: true, limit, used: Math.max(used - 1, 0), remaining: Math.min(remaining + 1, limit) }, 502, origin || '');
    }

    const text = String(groqData?.text || '').trim();
    if (!text) {
      await admin.rpc('refund_guest_groq_trial', { p_guest_hash: guestHash });
      return json({ error: 'Groq did not return text', code: 'NO_TRANSCRIPT', guest: true, limit, used: Math.max(used - 1, 0), remaining: Math.min(remaining + 1, limit) }, 502, origin || '');
    }

    return json({ ok: true, text, guest: true, limit, used, remaining }, 200, origin || '');
  } catch (error) {
    await admin.rpc('refund_guest_groq_trial', { p_guest_hash: guestHash });
    return json({ error: 'Groq request failed', message: error instanceof Error ? error.message : String(error), code: 'GROQ_NETWORK_ERROR', guest: true, limit, used: Math.max(used - 1, 0), remaining: Math.min(remaining + 1, limit) }, 502, origin || '');
  }
});
