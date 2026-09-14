import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const cfg = window.TOCFL_SUPABASE_CONFIG || {};
const configured = Boolean(
  cfg.url && cfg.publishableKey &&
  !String(cfg.url).includes('YOUR_PROJECT_ID') &&
  !String(cfg.publishableKey).includes('YOUR_SUPABASE')
);

const AUTH_TEXT = {
  vi: {
    account:'Tài khoản', signIn:'Đăng nhập', signUp:'Tạo tài khoản', signOut:'Đăng xuất', close:'Đóng',
    displayName:'Tên hiển thị', email:'Email', password:'Mật khẩu', passwordAgain:'Nhập lại mật khẩu',
    noAccount:'Chưa có tài khoản?', haveAccount:'Đã có tài khoản?', create:'Tạo tài khoản', login:'Đăng nhập',
    signedInAs:'Đang đăng nhập:', cloudSync:'☁️ Đồng bộ tài khoản', cloudGuest:'Bạn đang dùng chế độ khách. Tiến độ chỉ lưu trên thiết bị này.',
    cloudSignedIn:'Tiến độ được đồng bộ với tài khoản để dùng trên nhiều thiết bị.', syncNow:'Đồng bộ ngay', cloudSynced:'Đã đồng bộ', cloudSyncing:'Đang đồng bộ…', cloudError:'Lỗi đồng bộ',
    setupNeeded:'Chức năng tài khoản chưa được cấu hình. Hãy điền Supabase URL và Publishable Key trong config.js và chạy supabase/schema.sql.',
    passwordMismatch:'Hai mật khẩu không giống nhau.', passwordShort:'Mật khẩu cần ít nhất 6 ký tự.', fillRequired:'Hãy nhập đầy đủ email và mật khẩu.',
    signupSuccess:'Đã tạo tài khoản. Nếu Supabase yêu cầu xác nhận email, hãy mở email xác nhận rồi đăng nhập.',
    loginSuccess:'Đăng nhập thành công.', loggedOut:'Đã đăng xuất. Website chuyển về dữ liệu cục bộ trên thiết bị.',
    firstCloudUpload:'Tài khoản chưa có dữ liệu cloud; tiến độ hiện tại trên thiết bị đã được tải lên.',
    cloudLoaded:'Đã tải tiến độ của tài khoản về thiết bị này.', guest:'Khách', profile:'Hồ sơ',
    groqTitle:'🤖 Groq AI Speech cá nhân', groqNotConnected:'Chưa kết nối Groq API Key riêng.', groqConnectedBadge:'Đã kết nối', groqConnectedAt:'Groq AI Speech đã kết nối', groqHelp:'Mỗi tài khoản dùng Groq API Key của chính mình nên quota không dùng chung. Key được mã hóa trên server và không lưu trong GitHub hay trình duyệt.', groqKey:'Groq API Key', groqSaveTest:'Lưu & kiểm tra', groqDisconnect:'Ngắt kết nối', groqSaving:'Đang kiểm tra Groq Key…', groqSaved:'✅ Groq API Key đã kết nối và kiểm tra thành công.', groqDeleted:'Đã ngắt Groq khỏi tài khoản.', groqNeedKey:'Hãy nhập Groq API Key.', groqFunctionError:'Chưa cấu hình Edge Function groq-speech hoặc schema Groq BYOK.', groqConfirmDelete:'Ngắt Groq AI Speech cá nhân khỏi tài khoản này?', guestTrialReady:(n,l)=>`🎁 Khách: còn ${n}/${l} lượt AI miễn phí trên trình duyệt này.`, guestTrialChecking:'🎁 Đang kiểm tra lượt AI miễn phí…', guestTrialExhausted:'🎁 Bạn đã dùng hết lượt AI miễn phí trên trình duyệt này. Đăng nhập để tiếp tục bằng Groq Key cá nhân.', guestTrialUnavailable:'⚠️ Chế độ AI dùng thử chưa được cấu hình trên Supabase.',
    privacy:'Mỗi tài khoản chỉ đọc/ghi tiến độ của chính mình khi bạn đã chạy file RLS trong thư mục supabase.'
  },
  en: {
    account:'Account', signIn:'Sign in', signUp:'Create account', signOut:'Sign out', close:'Close',
    displayName:'Display name', email:'Email', password:'Password', passwordAgain:'Confirm password',
    noAccount:'No account yet?', haveAccount:'Already have an account?', create:'Create account', login:'Sign in',
    signedInAs:'Signed in as:', cloudSync:'☁️ Account sync', cloudGuest:'You are using guest mode. Progress is stored only on this device.',
    cloudSignedIn:'Progress is synced to your account for use across devices.', syncNow:'Sync now', cloudSynced:'Synced', cloudSyncing:'Syncing…', cloudError:'Sync error',
    setupNeeded:'Accounts are not configured yet. Fill in the Supabase URL and Publishable Key in config.js and run supabase/schema.sql.',
    passwordMismatch:'The passwords do not match.', passwordShort:'Password must be at least 6 characters.', fillRequired:'Enter both email and password.',
    signupSuccess:'Account created. If email confirmation is enabled in Supabase, confirm the email before signing in.',
    loginSuccess:'Signed in successfully.', loggedOut:'Signed out. The site is now using local progress on this device.',
    firstCloudUpload:'No cloud progress existed yet, so this device’s current progress was uploaded.',
    cloudLoaded:'Your account progress was loaded onto this device.', guest:'Guest', profile:'Profile',
    groqTitle:'🤖 Personal Groq AI Speech', groqNotConnected:'No personal Groq API Key connected.', groqConnectedBadge:'Connected', groqConnectedAt:'Groq AI Speech connected', groqHelp:'Each account uses its own Groq API Key, so usage quotas are separate. The key is encrypted on the server and is never stored in GitHub or the browser.', groqKey:'Groq API Key', groqSaveTest:'Save & test', groqDisconnect:'Disconnect', groqSaving:'Testing Groq key…', groqSaved:'✅ Groq API Key connected and tested successfully.', groqDeleted:'Groq disconnected from this account.', groqNeedKey:'Enter a Groq API Key.', groqFunctionError:'The groq-speech Edge Function or Groq BYOK schema is not configured.', groqConfirmDelete:'Disconnect personal Groq AI Speech from this account?', guestTrialReady:(n,l)=>`🎁 Guest: ${n}/${l} free AI checks left in this browser.`, guestTrialChecking:'🎁 Checking free AI trial…', guestTrialExhausted:'🎁 This browser has used all free AI checks. Sign in to continue with a personal Groq key.', guestTrialUnavailable:'⚠️ Guest AI trial is not configured on Supabase yet.',
    privacy:'With the included RLS setup, each account can only read and write its own progress.'
  },
  'zh-Hant': {
    account:'帳號', signIn:'登入', signUp:'建立帳號', signOut:'登出', close:'關閉',
    displayName:'顯示名稱', email:'電子郵件', password:'密碼', passwordAgain:'再次輸入密碼',
    noAccount:'還沒有帳號？', haveAccount:'已經有帳號？', create:'建立帳號', login:'登入',
    signedInAs:'目前登入：', cloudSync:'☁️ 帳號同步', cloudGuest:'目前使用訪客模式，進度只儲存在這台裝置。',
    cloudSignedIn:'學習進度會同步到帳號，可在不同裝置使用。', syncNow:'立即同步', cloudSynced:'已同步', cloudSyncing:'同步中…', cloudError:'同步錯誤',
    setupNeeded:'帳號功能尚未設定。請在 config.js 填入 Supabase URL 與 Publishable Key，並執行 supabase/schema.sql。',
    passwordMismatch:'兩次輸入的密碼不同。', passwordShort:'密碼至少需要 6 個字元。', fillRequired:'請輸入電子郵件與密碼。',
    signupSuccess:'帳號已建立。若 Supabase 啟用電子郵件驗證，請先完成驗證再登入。',
    loginSuccess:'登入成功。', loggedOut:'已登出，目前改用這台裝置的本機進度。',
    firstCloudUpload:'雲端尚無資料，已把這台裝置目前的進度上傳。',
    cloudLoaded:'已把帳號的學習進度載入這台裝置。', guest:'訪客', profile:'個人資料',
    groqTitle:'🤖 個人 Groq AI Speech', groqNotConnected:'尚未連接個人的 Groq API Key。', groqConnectedBadge:'已連接', groqConnectedAt:'Groq AI Speech 已連接', groqHelp:'每個帳號使用自己的 Groq API Key，因此用量額度彼此獨立。Key 會在伺服器端加密，不會儲存在 GitHub 或瀏覽器。', groqKey:'Groq API Key', groqSaveTest:'儲存並測試', groqDisconnect:'中斷連接', groqSaving:'正在測試 Groq Key…', groqSaved:'✅ Groq API Key 已成功連接並通過測試。', groqDeleted:'已從此帳號移除 Groq。', groqNeedKey:'請輸入 Groq API Key。', groqFunctionError:'尚未設定 groq-speech Edge Function 或 Groq BYOK schema。', groqConfirmDelete:'要中斷此帳號的個人 Groq AI Speech 嗎？', guestTrialReady:(n,l)=>`🎁 訪客：此瀏覽器還有 ${n}/${l} 次免費 AI 檢查。`, guestTrialChecking:'🎁 正在檢查免費 AI 次數…', guestTrialExhausted:'🎁 此瀏覽器的免費 AI 次數已用完。登入後可使用個人 Groq Key 繼續。', guestTrialUnavailable:'⚠️ Supabase 尚未設定訪客 AI 試用功能。',
    privacy:'執行內附的 RLS 設定後，每個帳號只能讀寫自己的學習進度。'
  }
};

let supabaseClient = null;
let session = null;
let appReady = false;
let syncTimer = null;
let syncBusy = false;
let suppressSync = false;
let groqStatus = { connected:false, updatedAt:null };
let guestTrialStatus = { loading:false, available:null, limit:20, used:0, remaining:20 };
const GUEST_ID_STORAGE_KEY = 'tocfl-groq-guest-id-v1';

const $ = id => document.getElementById(id);
const lang = () => window.TOCFLApp?.getLanguage?.() || localStorage.getItem('tocfl-a1-ui-language-v2') || 'vi';
const tr = (key, ...args) => {
  const pack = AUTH_TEXT[lang()] || AUTH_TEXT.vi;
  const value = pack[key] ?? AUTH_TEXT.vi[key] ?? key;
  return typeof value === 'function' ? value(...args) : value;
};


function getGuestId() {
  let id = '';
  try { id = String(localStorage.getItem(GUEST_ID_STORAGE_KEY) || ''); } catch {}
  if (!/^[A-Za-z0-9._:-]{16,200}$/.test(id)) {
    const rnd = globalThis.crypto?.randomUUID?.() || `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;
    id = `guest-${rnd}`;
    try { localStorage.setItem(GUEST_ID_STORAGE_KEY, id); } catch {}
  }
  return id;
}

function updateGuestTrialUI() {
  const el = $('guestTrialStatus');
  if (!el) return;
  if (session?.user) { el.textContent = ''; return; }
  if (guestTrialStatus.loading) { el.textContent = tr('guestTrialChecking'); return; }
  if (guestTrialStatus.available === false) { el.textContent = tr('guestTrialUnavailable'); return; }
  if (Number(guestTrialStatus.remaining) <= 0) { el.textContent = tr('guestTrialExhausted'); return; }
  if (guestTrialStatus.available === true) el.textContent = tr('guestTrialReady', guestTrialStatus.remaining, guestTrialStatus.limit);
  else el.textContent = tr('guestTrialReady', guestTrialStatus.remaining, guestTrialStatus.limit);
}

function setGuestTrialStatus(data={}) {
  guestTrialStatus = {
    loading:false,
    available:data.available !== false,
    limit:Number(data.limit ?? guestTrialStatus.limit ?? 20),
    used:Number(data.used ?? guestTrialStatus.used ?? 0),
    remaining:Number(data.remaining ?? guestTrialStatus.remaining ?? 20)
  };
  updateGuestTrialUI();
  document.dispatchEvent(new CustomEvent('tocfl:groq-guest-status', { detail:{...guestTrialStatus} }));
}

async function callGuestGroqStatus() {
  if (!configured) { guestTrialStatus={...guestTrialStatus,loading:false,available:false}; updateGuestTrialUI(); return guestTrialStatus; }
  guestTrialStatus={...guestTrialStatus,loading:true}; updateGuestTrialUI();
  try {
    const response = await fetch(`${String(cfg.url).replace(/\/$/,'')}/functions/v1/groq-guest`, {
      method:'POST',
      headers:{'Content-Type':'application/json','apikey':cfg.publishableKey},
      body:JSON.stringify({action:'status',guestId:getGuestId()})
    });
    let data={}; try{ data=await response.json(); }catch{}
    if(!response.ok || data?.error) throw Object.assign(new Error(data?.message||data?.error||`HTTP ${response.status}`),{code:data?.code||'GUEST_STATUS_ERROR'});
    setGuestTrialStatus({...data,available:true});
  } catch(error) {
    console.warn('Guest Groq status:', error);
    guestTrialStatus={...guestTrialStatus,loading:false,available:false}; updateGuestTrialUI();
  }
  return guestTrialStatus;
}

function setAuthStatus(message, isError=false) {
  const el = $('authStatus');
  if (!el) return;
  el.textContent = message || '';
  el.classList.toggle('error-text', Boolean(isError));
}

function setCloudStatus(message, isError=false) {
  const el = $('cloudSyncStatus');
  if (!el) return;
  el.textContent = message || '';
  el.classList.toggle('error-text', Boolean(isError));
}

function applyAuthLanguage() {
  document.querySelectorAll('[data-auth-i18n]').forEach(el => {
    el.textContent = tr(el.dataset.authI18n);
  });
  const name = $('signupName'); if (name) name.placeholder = tr('displayName');
  const loginEmail = $('loginEmail'); if (loginEmail) loginEmail.placeholder = tr('email');
  const signupEmail = $('signupEmail'); if (signupEmail) signupEmail.placeholder = tr('email');
  const loginPassword = $('loginPassword'); if (loginPassword) loginPassword.placeholder = tr('password');
  const signupPassword = $('signupPassword'); if (signupPassword) signupPassword.placeholder = tr('password');
  const signupPassword2 = $('signupPassword2'); if (signupPassword2) signupPassword2.placeholder = tr('passwordAgain');
  const groqKey = $('groqKey'); if (groqKey && !groqKey.value) groqKey.placeholder = 'gsk_...';
  renderAccountUI();
  updateGuestTrialUI();
}

function openAuth(mode='login') {
  const modal = $('authModal');
  if (!modal) return;
  modal.hidden = false;
  document.body.classList.add('modal-open');
  showAuthPane(session ? 'profile' : mode);
  if (session?.user) void refreshGroqStatus();
  setAuthStatus(configured ? '' : tr('setupNeeded'), !configured);
}

function closeAuth() {
  const modal = $('authModal');
  if (!modal) return;
  modal.hidden = true;
  document.body.classList.remove('modal-open');
}

function showAuthPane(mode) {
  ['login','signup','profile'].forEach(name => {
    const pane = $(`authPane-${name}`);
    if (pane) pane.hidden = name !== mode;
  });
  document.querySelectorAll('[data-auth-tab]').forEach(btn => btn.classList.toggle('is-active', btn.dataset.authTab === mode));
}

function userLabel() {
  if (!session?.user) return tr('guest');
  return session.user.user_metadata?.display_name || session.user.email?.split('@')[0] || tr('account');
}

function renderAccountUI() {
  const btn = $('accountBtn');
  if (btn) {
    btn.innerHTML = session?.user ? `👤 <span>${escapeText(userLabel())}</span>` : `👤 <span>${tr('signIn')}</span>`;
    btn.title = tr('account');
  }
  const profileEmail = $('profileEmail'); if (profileEmail) profileEmail.textContent = session?.user?.email || '—';
  const profileName = $('profileName'); if (profileName) profileName.textContent = userLabel();
  const desc = $('cloudSyncDescription');
  if (desc) desc.textContent = session?.user ? tr('cloudSignedIn') : tr('cloudGuest');
  const syncBtn = $('syncNowBtn'); if (syncBtn) syncBtn.disabled = !session?.user || !configured || syncBusy;
  const accountState = $('cloudAccountState');
  if (accountState) accountState.textContent = session?.user ? `${tr('signedInAs')} ${session.user.email}` : tr('cloudGuest');
  renderGroqUI();
  updateGuestTrialUI();
}

function renderGroqUI() {
  const status = $('groqConnectionStatus');
  const badge = $('groqConnectedBadge');
  const deleteBtn = $('deleteGroqBtn');
  const saveBtn = $('saveGroqBtn');
  if (status) status.textContent = groqStatus.connected ? tr('groqConnectedAt') : tr('groqNotConnected');
  if (badge) badge.hidden = !groqStatus.connected;
  if (deleteBtn) deleteBtn.disabled = !session?.user || !groqStatus.connected;
  if (saveBtn) saveBtn.disabled = !session?.user || !configured;
}


function escapeText(s) {
  return String(s || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

async function signIn(e) {
  e.preventDefault();
  if (!configured || !supabaseClient) { setAuthStatus(tr('setupNeeded'), true); return; }
  const email = $('loginEmail').value.trim();
  const password = $('loginPassword').value;
  if (!email || !password) { setAuthStatus(tr('fillRequired'), true); return; }
  setAuthStatus('…');
  const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
  if (error) { setAuthStatus(error.message, true); return; }
  session = data.session;
  setAuthStatus(tr('loginSuccess'));
  await afterSignedIn();
}

async function signUp(e) {
  e.preventDefault();
  if (!configured || !supabaseClient) { setAuthStatus(tr('setupNeeded'), true); return; }
  const displayName = $('signupName').value.trim();
  const email = $('signupEmail').value.trim();
  const password = $('signupPassword').value;
  const password2 = $('signupPassword2').value;
  if (!email || !password) { setAuthStatus(tr('fillRequired'), true); return; }
  if (password.length < 6) { setAuthStatus(tr('passwordShort'), true); return; }
  if (password !== password2) { setAuthStatus(tr('passwordMismatch'), true); return; }
  setAuthStatus('…');
  const redirect = `${window.location.origin}${window.location.pathname}`;
  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password,
    options: { data: { display_name: displayName || email.split('@')[0] }, emailRedirectTo: redirect }
  });
  if (error) { setAuthStatus(error.message, true); return; }
  session = data.session || null;
  setAuthStatus(tr('signupSuccess'));
  if (session) await afterSignedIn();
  else showAuthPane('login');
}

async function signOut() {
  if (!supabaseClient) return;
  await supabaseClient.auth.signOut();
  session = null; groqStatus = { connected:false, updatedAt:null };
  window.TOCFLApp?.onSignedOut?.();
  setCloudStatus(tr('loggedOut'));
  renderAccountUI();
  closeAuth();
  void callGuestGroqStatus();
}

async function afterSignedIn() {
  renderAccountUI();
  showAuthPane('profile');
  await refreshGroqStatus();
  // After a successful login, return to the learning screen; the level chooser
  // can then appear cleanly on top if the user has not chosen to remember a level.
  closeAuth();
  if (appReady) await loadCloudState();
}

async function loadCloudState() {
  if (!session?.user || !supabaseClient || !window.TOCFLApp) return;
  setCloudStatus(tr('cloudSyncing'));
  const { data, error } = await supabaseClient
    .from('user_learning_state')
    .select('progress,favorites,last_day,ui_language,updated_at')
    .eq('user_id', session.user.id)
    .maybeSingle();
  if (error) { setCloudStatus(`${tr('cloudError')}: ${error.message}`, true); return; }
  if (!data) {
    await syncNow();
    setCloudStatus(tr('firstCloudUpload'));
    await window.TOCFLApp?.afterAccountReady?.(session.user.id);
    return;
  }
  suppressSync = true;
  let applyResult = null;
  try {
    applyResult = await window.TOCFLApp.applyCloudState({
      progress: data.progress || {},
      favorites: Array.isArray(data.favorites) ? data.favorites : [],
      lastDay: data.last_day || 1,
      language: data.ui_language || 'vi'
    });
  } finally {
    suppressSync = false;
  }
  // Existing accounts created before Radical cloud sync keep their local Radical
  // progress once, then the upgraded payload is uploaded automatically.
  if (applyResult?.needsCloudUpgrade) await syncNow();
  else setCloudStatus(tr('cloudLoaded'));
  await window.TOCFLApp?.afterAccountReady?.(session.user.id);
}

async function syncNow() {
  if (!session?.user || !supabaseClient || !window.TOCFLApp || syncBusy) return;
  syncBusy = true;
  renderAccountUI();
  setCloudStatus(tr('cloudSyncing'));
  try {
    const payload = window.TOCFLApp.getCloudState();
    const row = {
      user_id: session.user.id,
      progress: payload.progress || {},
      favorites: payload.favorites || [],
      last_day: Math.max(1, Math.min(26, Number(payload.lastDay || 1))),
      ui_language: ['vi','en','zh-Hant'].includes(payload.language) ? payload.language : 'vi',
      updated_at: new Date().toISOString()
    };
    const { error } = await supabaseClient.from('user_learning_state').upsert(row, { onConflict: 'user_id' });
    if (error) throw error;
    setCloudStatus(`${tr('cloudSynced')} · ${new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}`);
  } catch (error) {
    setCloudStatus(`${tr('cloudError')}: ${error.message}`, true);
  } finally {
    syncBusy = false;
    renderAccountUI();
  }
}


function setGroqAccountStatus(message, isError=false) {
  const el = $('groqAccountStatus'); if (!el) return;
  el.textContent = message || ''; el.classList.toggle('error-text', Boolean(isError));
}

async function callGroqFunction(payload) {
  if (!configured || !session?.access_token) throw Object.assign(new Error('NOT_SIGNED_IN'), { code:'NOT_SIGNED_IN' });
  const response = await fetch(`${String(cfg.url).replace(/\/$/,'')}/functions/v1/groq-speech`, {
    method:'POST',
    headers:{
      'Content-Type':'application/json',
      'Authorization':`Bearer ${session.access_token}`,
      'apikey':cfg.publishableKey
    },
    body:JSON.stringify(payload || {})
  });
  let data={}; try{ data=await response.json(); }catch{}
  if (!response.ok || data?.error) {
    const error = new Error(data?.message || data?.error || `HTTP ${response.status}`);
    error.code = data?.code || 'GROQ_FUNCTION_ERROR'; throw error;
  }
  return data;
}

async function refreshGroqStatus() {
  if (!session?.user) { groqStatus={connected:false,updatedAt:null}; renderGroqUI(); return groqStatus; }
  try {
    const data=await callGroqFunction({action:'status'});
    groqStatus={connected:Boolean(data.connected),updatedAt:data.updatedAt||null};
  } catch (error) {
    console.warn('Groq status:', error); groqStatus={connected:false,updatedAt:null};
  }
  renderGroqUI(); return groqStatus;
}

async function saveGroqCredentials(e) {
  e?.preventDefault?.();
  if (!session?.user) { setGroqAccountStatus(tr('fillRequired'), true); return; }
  const key=$('groqKey')?.value?.trim() || '';
  if (!key) { setGroqAccountStatus(tr('groqNeedKey'), true); return; }
  setGroqAccountStatus(tr('groqSaving')); const btn=$('saveGroqBtn'); if(btn)btn.disabled=true;
  try {
    const data=await callGroqFunction({action:'save',key});
    groqStatus={connected:true,updatedAt:data.updatedAt||new Date().toISOString()};
    if($('groqKey'))$('groqKey').value=''; setGroqAccountStatus(tr('groqSaved')); renderGroqUI();
  } catch (error) {
    console.error(error); setGroqAccountStatus(error.message || tr('groqFunctionError'), true);
  } finally { if(btn)btn.disabled=false; }
}

async function deleteGroqCredentials() {
  if (!session?.user || !groqStatus.connected) return;
  if (!confirm(tr('groqConfirmDelete'))) return;
  try {
    await callGroqFunction({action:'delete'}); groqStatus={connected:false,updatedAt:null};
    if($('groqKey'))$('groqKey').value=''; setGroqAccountStatus(tr('groqDeleted')); renderGroqUI();
  } catch(error){ setGroqAccountStatus(error.message || tr('groqFunctionError'), true); }
}

function audioFilenameForBlob(blob) {
  const type=String(blob?.type||'').toLowerCase();
  if(type.includes('mp4')||type.includes('m4a')) return 'pronunciation.m4a';
  if(type.includes('ogg')) return 'pronunciation.ogg';
  if(type.includes('wav')) return 'pronunciation.wav';
  if(type.includes('mpeg')||type.includes('mp3')) return 'pronunciation.mp3';
  return 'pronunciation.webm';
}

async function transcribeWithGroq(audioBlob, target='') {
  if (!audioBlob?.size) throw Object.assign(new Error('Audio is empty.'), {code:'EMPTY_AUDIO'});
  if (!configured) throw Object.assign(new Error('Supabase is not configured.'), {code:'GROQ_FUNCTION_ERROR'});

  // Signed-in users keep the existing BYOK flow and use their own Groq key.
  if (session?.user) {
    const form=new FormData();
    form.append('action','transcribe');
    form.append('target',String(target||''));
    form.append('audio',audioBlob,audioFilenameForBlob(audioBlob));
    const response=await fetch(`${String(cfg.url).replace(/\/$/,'')}/functions/v1/groq-speech`,{
      method:'POST',
      headers:{'Authorization':`Bearer ${session.access_token}`,'apikey':cfg.publishableKey},
      body:form
    });
    let data={}; try{data=await response.json();}catch{}
    if(!response.ok||data?.error){
      const error=new Error(data?.message||data?.error||`HTTP ${response.status}`);
      error.code=data?.code||'GROQ_TRANSCRIBE_ERROR'; throw error;
    }
    if(!data?.text) throw Object.assign(new Error('Groq did not return recognized text.'),{code:'NO_TRANSCRIPT'});
    groqStatus={connected:true,updatedAt:groqStatus.updatedAt}; renderGroqUI();
    return {...data, guest:false};
  }

  // Guests do not receive the Groq API key. The browser sends audio to a public
  // Supabase Edge Function, which owns the server-side GROQ_GUEST_API_KEY secret.
  const form=new FormData();
  form.append('action','transcribe');
  form.append('guestId',getGuestId());
  form.append('target',String(target||''));
  form.append('audio',audioBlob,audioFilenameForBlob(audioBlob));
  const response=await fetch(`${String(cfg.url).replace(/\/$/,'')}/functions/v1/groq-guest`,{
    method:'POST',
    headers:{'apikey':cfg.publishableKey},
    body:form
  });
  let data={}; try{data=await response.json();}catch{}
  if(!response.ok||data?.error){
    if(Number.isFinite(Number(data?.remaining))) setGuestTrialStatus(data);
    const error=new Error(data?.message||data?.error||`HTTP ${response.status}`);
    error.code=data?.code||'GUEST_GROQ_ERROR'; throw error;
  }
  if(!data?.text) throw Object.assign(new Error('Groq did not return recognized text.'),{code:'NO_TRANSCRIPT'});
  setGuestTrialStatus({...data,available:true});
  return {...data, guest:true};
}

function scheduleSync() {
  if (suppressSync || !session?.user || !configured) return;
  clearTimeout(syncTimer);
  syncTimer = setTimeout(syncNow, 900);
}

async function initAuth() {
  bindUI();
  appReady = Boolean(window.TOCFL_APP_READY || window.TOCFLApp?.isReady?.());
  applyAuthLanguage();
  if (!configured) {
    renderAccountUI();
    setCloudStatus(tr('cloudGuest'));
    return;
  }
  try {
    supabaseClient = createClient(cfg.url, cfg.publishableKey, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
    });
    const { data } = await supabaseClient.auth.getSession();
    session = data.session || null;
    renderAccountUI();
    supabaseClient.auth.onAuthStateChange(async (_event, newSession) => {
      session = newSession;
      renderAccountUI();
      if (session?.user) {
        await refreshGroqStatus();
        if (appReady) await loadCloudState();
      } else {
        groqStatus={connected:false,updatedAt:null};
        renderGroqUI();
        void callGuestGroqStatus();
      }
    });
    if (session?.user) {
      await refreshGroqStatus();
      if (appReady) await loadCloudState();
    } else {
      await callGuestGroqStatus();
    }
  } catch (error) {
    console.error(error);
    setCloudStatus(`${tr('cloudError')}: ${error.message}`, true);
  }
}

function bindUI() {
  $('accountBtn')?.addEventListener('click', () => openAuth(session ? 'profile' : 'login'));
  $('authCloseBtn')?.addEventListener('click', closeAuth);
  $('authModal')?.addEventListener('click', e => { if (e.target === $('authModal')) closeAuth(); });
  document.querySelectorAll('[data-auth-tab]').forEach(btn => btn.addEventListener('click', () => showAuthPane(btn.dataset.authTab)));
  $('loginForm')?.addEventListener('submit', signIn);
  $('signupForm')?.addEventListener('submit', signUp);
  $('logoutBtn')?.addEventListener('click', signOut);
  $('syncNowBtn')?.addEventListener('click', syncNow);
  $('groqCredentialsForm')?.addEventListener('submit', saveGroqCredentials);
  $('deleteGroqBtn')?.addEventListener('click', deleteGroqCredentials);
  document.addEventListener('tocfl:language-changed', applyAuthLanguage);
  document.addEventListener('tocfl:state-changed', scheduleSync);
  document.addEventListener('tocfl:app-ready', async () => {
    appReady = true;
    applyAuthLanguage();
    if (session?.user) await loadCloudState();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !$('authModal')?.hidden) closeAuth(); });
}

window.TOCFLAuth = { syncNow, openAuth, isConfigured: () => configured, getSession: () => session, transcribeWithGroq, refreshGroqStatus, refreshGuestTrialStatus: callGuestGroqStatus, getGroqStatus: () => ({...groqStatus}), getGuestTrialStatus: () => ({...guestTrialStatus}) };
initAuth();
