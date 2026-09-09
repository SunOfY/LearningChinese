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
    azureTitle:'🎙 Azure Speech cá nhân', azureNotConnected:'Chưa kết nối Azure Speech riêng.', azureConnectedBadge:'Đã kết nối', azureConnectedAt:'Đã kết nối Azure Speech', azureHelp:'Mỗi tài khoản nhập Key + Region của Azure Speech F0 của chính mình. Key được mã hóa trên server và không lưu trong GitHub hay trình duyệt.', azureRegion:'Azure Region', azureKey:'Speech Key', azureSaveTest:'Lưu & kiểm tra', azureDisconnect:'Ngắt kết nối', azureSaving:'Đang kiểm tra Azure…', azureSaved:'✅ Azure Speech đã kết nối và kiểm tra thành công.', azureDeleted:'Đã ngắt Azure Speech khỏi tài khoản.', azureNeedFields:'Hãy nhập cả Region và Speech Key.', azureFunctionError:'Chưa cấu hình Edge Function azure-speech hoặc schema BYOK.', azureConfirmDelete:'Ngắt Azure Speech cá nhân khỏi tài khoản này?',
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
    azureTitle:'🎙 Personal Azure Speech', azureNotConnected:'No personal Azure Speech resource connected.', azureConnectedBadge:'Connected', azureConnectedAt:'Azure Speech connected', azureHelp:'Each account enters the Key + Region of its own Azure Speech F0 resource. The key is encrypted on the server and is never stored in GitHub or the browser.', azureRegion:'Azure Region', azureKey:'Speech Key', azureSaveTest:'Save & test', azureDisconnect:'Disconnect', azureSaving:'Testing Azure…', azureSaved:'✅ Azure Speech connected and tested successfully.', azureDeleted:'Azure Speech disconnected from this account.', azureNeedFields:'Enter both Region and Speech Key.', azureFunctionError:'The azure-speech Edge Function or BYOK schema is not configured.', azureConfirmDelete:'Disconnect personal Azure Speech from this account?',
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
    azureTitle:'🎙 個人 Azure Speech', azureNotConnected:'尚未連接個人的 Azure Speech。', azureConnectedBadge:'已連接', azureConnectedAt:'Azure Speech 已連接', azureHelp:'每個帳號輸入自己 Azure Speech F0 的 Key 與 Region。Key 會在伺服器端加密，不會儲存在 GitHub 或瀏覽器。', azureRegion:'Azure Region', azureKey:'Speech Key', azureSaveTest:'儲存並測試', azureDisconnect:'中斷連接', azureSaving:'正在測試 Azure…', azureSaved:'✅ Azure Speech 已成功連接並通過測試。', azureDeleted:'已從此帳號移除 Azure Speech。', azureNeedFields:'請輸入 Region 與 Speech Key。', azureFunctionError:'尚未設定 azure-speech Edge Function 或 BYOK schema。', azureConfirmDelete:'要中斷此帳號的個人 Azure Speech 嗎？',
    privacy:'執行內附的 RLS 設定後，每個帳號只能讀寫自己的學習進度。'
  }
};

let supabaseClient = null;
let session = null;
let appReady = false;
let syncTimer = null;
let syncBusy = false;
let suppressSync = false;
let azureStatus = { connected:false, region:null, updatedAt:null };
let azureTokenCache = null;

const $ = id => document.getElementById(id);
const lang = () => window.TOCFLApp?.getLanguage?.() || localStorage.getItem('tocfl-a1-ui-language-v2') || 'vi';
const tr = key => (AUTH_TEXT[lang()] || AUTH_TEXT.vi)[key] || AUTH_TEXT.vi[key] || key;

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
  const azureRegion = $('azureRegion'); if (azureRegion && !azureRegion.value) azureRegion.placeholder = 'eastasia';
  renderAccountUI();
}

function openAuth(mode='login') {
  const modal = $('authModal');
  if (!modal) return;
  modal.hidden = false;
  document.body.classList.add('modal-open');
  showAuthPane(session ? 'profile' : mode);
  if (session?.user) void refreshAzureStatus();
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
  renderAzureUI();
}

function renderAzureUI() {
  const status = $('azureConnectionStatus');
  const badge = $('azureConnectedBadge');
  const regionInput = $('azureRegion');
  const deleteBtn = $('deleteAzureBtn');
  const saveBtn = $('saveAzureBtn');
  if (status) status.textContent = azureStatus.connected ? `${tr('azureConnectedAt')} · ${azureStatus.region || '—'}` : tr('azureNotConnected');
  if (badge) badge.hidden = !azureStatus.connected;
  if (regionInput && azureStatus.connected && !regionInput.value) regionInput.value = azureStatus.region || '';
  if (deleteBtn) deleteBtn.disabled = !session?.user || !azureStatus.connected;
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
  session = null; azureStatus = { connected:false, region:null, updatedAt:null }; azureTokenCache = null;
  setCloudStatus(tr('loggedOut'));
  renderAccountUI();
  closeAuth();
}

async function afterSignedIn() {
  renderAccountUI();
  showAuthPane('profile');
  await refreshAzureStatus();
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
    return;
  }
  suppressSync = true;
  try {
    window.TOCFLApp.applyCloudState({
      progress: data.progress || {},
      favorites: Array.isArray(data.favorites) ? data.favorites : [],
      lastDay: data.last_day || 1,
      language: data.ui_language || 'vi'
    });
  } finally {
    suppressSync = false;
  }
  setCloudStatus(tr('cloudLoaded'));
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


function setAzureAccountStatus(message, isError=false) {
  const el = $('azureAccountStatus'); if (!el) return;
  el.textContent = message || ''; el.classList.toggle('error-text', Boolean(isError));
}

async function callAzureFunction(payload) {
  if (!configured || !session?.access_token) throw Object.assign(new Error('NOT_SIGNED_IN'), { code:'NOT_SIGNED_IN' });
  const response = await fetch(`${String(cfg.url).replace(/\/$/,'')}/functions/v1/azure-speech`, {
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
    error.code = data?.code || 'AZURE_FUNCTION_ERROR'; throw error;
  }
  return data;
}

async function refreshAzureStatus() {
  if (!session?.user) { azureStatus={connected:false,region:null,updatedAt:null}; renderAzureUI(); return azureStatus; }
  try {
    const data=await callAzureFunction({action:'status'});
    azureStatus={connected:Boolean(data.connected),region:data.region||null,updatedAt:data.updatedAt||null};
  } catch (error) {
    console.warn('Azure status:', error); azureStatus={connected:false,region:null,updatedAt:null};
  }
  renderAzureUI(); return azureStatus;
}

async function saveAzureCredentials(e) {
  e?.preventDefault?.();
  if (!session?.user) { setAzureAccountStatus(tr('fillRequired'), true); return; }
  const region=$('azureRegion')?.value?.trim().toLowerCase() || '';
  const key=$('azureKey')?.value?.trim() || '';
  if (!region || !key) { setAzureAccountStatus(tr('azureNeedFields'), true); return; }
  setAzureAccountStatus(tr('azureSaving')); const btn=$('saveAzureBtn'); if(btn)btn.disabled=true;
  try {
    const data=await callAzureFunction({action:'save',region,key});
    azureStatus={connected:true,region:data.region||region,updatedAt:data.updatedAt||new Date().toISOString()}; azureTokenCache=null;
    if($('azureKey'))$('azureKey').value=''; setAzureAccountStatus(tr('azureSaved')); renderAzureUI();
  } catch (error) {
    console.error(error); setAzureAccountStatus(error.message || tr('azureFunctionError'), true);
  } finally { if(btn)btn.disabled=false; }
}

async function deleteAzureCredentials() {
  if (!session?.user || !azureStatus.connected) return;
  if (!confirm(tr('azureConfirmDelete'))) return;
  try {
    await callAzureFunction({action:'delete'}); azureStatus={connected:false,region:null,updatedAt:null}; azureTokenCache=null;
    if($('azureRegion'))$('azureRegion').value=''; if($('azureKey'))$('azureKey').value=''; setAzureAccountStatus(tr('azureDeleted')); renderAzureUI();
  } catch(error){ setAzureAccountStatus(error.message || tr('azureFunctionError'), true); }
}

async function getAzureSpeechToken() {
  if (!session?.user) throw Object.assign(new Error('Please sign in first.'), {code:'NOT_SIGNED_IN'});
  if (azureTokenCache && azureTokenCache.expiresAt>Date.now()+30_000) return azureTokenCache;
  const data=await callAzureFunction({action:'token'});
  if (!data.connected || !data.token || !data.region) throw Object.assign(new Error(data.message || tr('azureNotConnected')), {code:'NOT_CONNECTED'});
  azureStatus={connected:true,region:data.region,updatedAt:azureStatus.updatedAt}; renderAzureUI();
  azureTokenCache={token:data.token,region:data.region,expiresAt:Date.now()+8*60*1000}; return azureTokenCache;
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
        await refreshAzureStatus();
        if (appReady) await loadCloudState();
      } else {
        azureStatus={connected:false,region:null,updatedAt:null};
        azureTokenCache=null;
        renderAzureUI();
      }
    });
    if (session?.user) {
      await refreshAzureStatus();
      if (appReady) await loadCloudState();
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
  $('azureCredentialsForm')?.addEventListener('submit', saveAzureCredentials);
  $('deleteAzureBtn')?.addEventListener('click', deleteAzureCredentials);
  document.addEventListener('tocfl:language-changed', applyAuthLanguage);
  document.addEventListener('tocfl:state-changed', scheduleSync);
  document.addEventListener('tocfl:app-ready', async () => {
    appReady = true;
    applyAuthLanguage();
    if (session?.user) await loadCloudState();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !$('authModal')?.hidden) closeAuth(); });
}

window.TOCFLAuth = { syncNow, openAuth, isConfigured: () => configured, getSession: () => session, getAzureSpeechToken, refreshAzureStatus, getAzureStatus: () => ({...azureStatus}) };
initAuth();
