'use strict';

const LEGACY_STORAGE_KEY = 'tocfl-a1-progress-v2';
const LEGACY_FAVORITES_KEY = 'tocfl-a1-favorites-v2';
const LEGACY_LAST_DAY_KEY = 'tocfl-a1-last-day';
const MULTI_STATE_KEY = 'tocfl-multilevel-state-v1';
const LANGUAGE_KEY = 'tocfl-a1-ui-language-v2'; // keep the old key so existing UI-language preference survives the upgrade
const ENGLISH_CACHE_PREFIX = 'tocfl-english-cache-v3';
const LEGACY_ENGLISH_CACHE_KEY = 'tocfl-a1-english-cache-v2';

// Future-proof level registry. To activate a level later, upload data/<level>.json.
// The enrichment file is optional and follows data/<level>_enrichment.json.
const LEVEL_CATALOG = [
  { id:'A1', base:'./data/a1.json', enrich:['./data/a1_enrichment.json','./data/enrichment_day1.json'] },
  { id:'A2', base:'./data/a2.json', enrich:['./data/a2_enrichment.json'] },
  { id:'B1', base:'./data/b1.json', enrich:['./data/b1_enrichment.json'] },
  { id:'B2', base:'./data/b2.json', enrich:['./data/b2_enrichment.json'] },
  { id:'C1', base:'./data/c1.json', enrich:['./data/c1_enrichment.json'] },
  { id:'C2', base:'./data/c2.json', enrich:['./data/c2_enrichment.json'] }
];
const LEVEL_MAP = Object.fromEntries(LEVEL_CATALOG.map(x=>[x.id,x]));
const CEDICT_URL = 'https://raw.githubusercontent.com/jtoy/crdict/refs/heads/master/cedict_ts.u8';

const I18N = {
  vi: {
    day:'Ngày', navToday:'Hôm nay', navVocab:'Từ vựng', navQuiz:'Quiz', navProgress:'Tiến độ', goal:'Mục tiêu',
    favorite:'Đánh dấu từ', listenWord:'Nghe từ', slow:'Chậm', hidePinyin:'Ẩn Pinyin', showPinyin:'Hiện Pinyin',
    pronunciationPractice:'🎙 Luyện phát âm', startRecording:'Bắt đầu ghi âm', stop:'Dừng', playback:'Phát lại', checkPronunciation:'Kiểm tra phát âm',
    target:'Mẫu:', recognized:'AI nhận ra:', assessmentNote:'Groq Whisper AI nhận dạng giọng nói tiếng Trung. Điểm là độ khớp giữa chữ AI nghe được và từ mẫu; không phải điểm thanh điệu/âm vị chuyên sâu.', accuracyLabel:'Độ chính xác', fluencyLabel:'Độ trôi chảy', completenessLabel:'Độ đầy đủ',
    examples:'💬 Câu ví dụ', examplesHint:'Bấm loa để nghe cả câu bằng giọng zh-TW.', rememberLevel:'Bạn nhớ từ này mức nào?', notRemembered:'Chưa nhớ', learning:'Tạm nhớ', remembered:'Đã nhớ', previous:'Trước', next:'Tiếp theo',
    writingPractice:'✍️ Luyện viết', writingDevices:'Chuột · ngón tay · Apple Pencil', clear:'Xóa', showGuide:'Hiện chữ mẫu mờ', writingTip:'<strong>Cách luyện:</strong> tô theo mẫu → tắt mẫu → tự viết → đọc thành tiếng chữ vừa viết.',
    creatingQuestion:'Đang tạo câu hỏi…', anotherQuestion:'Câu khác', reviewed:'Đã đánh giá', backupTitle:'💾 Sao lưu tiến độ', backupDesc:'Tiến độ được lưu trong trình duyệt của từng thiết bị. Bạn có thể xuất file để chuyển sang thiết bị khác.', exportProgress:'Xuất tiến độ', importProgress:'Nhập tiến độ', resetProgress:'Xóa tiến độ',
    footerNote:'Dữ liệu từ vựng của từng trình độ được tải từ thư mục data. English có thể được bổ sung từ CC-CEDICT khi có mạng; câu ví dụ bổ sung phục vụ học tập và không phải câu mẫu chính thức của TOCFL.',
    newWords:n=>`${n} từ mới`, allDays:'Tất cả ngày', dayOption:n=>`Ngày ${n}`, searchPlaceholder:'Tìm chữ, pinyin hoặc nghĩa…',
    loadingEnglish:'Đang tải nghĩa English…', englishUnavailable:'Chưa lấy được nghĩa English.', sourceWarning:'Lưu ý dữ liệu nguồn:', likelyForm:'Ví dụ dùng dạng được suy đoán theo pinyin/nghĩa:',
    recordIdle:'Giọng ghi âm chỉ lưu tạm trên thiết bị.', recording:'🔴 Đang ghi âm… hãy đọc từ hiện tại.', recordDone:'Đã ghi xong. Bạn có thể phát lại hoặc kiểm tra phát âm.', micDenied:'Không truy cập được microphone. Hãy cấp quyền microphone cho website.', recorderUnsupported:'Thiết bị/trình duyệt này chưa hỗ trợ ghi âm bằng MediaRecorder.',
    speechUnsupported:'Thiết bị/trình duyệt này chưa hỗ trợ thu âm để gửi AI.', speechListening:'🎧 Đang thu âm khoảng 3,5 giây… hãy nói từ mẫu một lần ngay bây giờ.', noRecognition:'AI không nhận được chữ. Hãy nói lại rõ hơn.', recognitionDone:'✅ Groq AI đã nhận dạng xong. Kết quả ở bên dưới.', speechNoSpeech:'🎤 Không phát hiện được tiếng nói. Hãy bấm kiểm tra rồi nói ngay.', speechPermissionDenied:'🔒 Chưa có quyền microphone. Hãy cho phép website dùng microphone.', speechGenericError:'⚠️ Không nhận dạng được bằng Groq AI. Hãy thử lại.', groqLoginRequired:'🔐 Hãy đăng nhập trước khi kiểm tra phát âm.', groqNotConnected:'☁️ Tài khoản chưa kết nối Groq API Key cá nhân. Mở Tài khoản → Groq AI Speech cá nhân để nhập Key.', groqTranscriptionError:'Không lấy được kết quả từ Groq AI.',
    feedbackExcellent:'AI nghe đúng từ mẫu.', feedbackGood:'AI nghe gần đúng. Hãy nghe mẫu và thử lại.', feedbackRetry:'AI nghe thành từ khác. Hãy nghe chậm rồi đọc lại.',
    quizMeaning:q=>`“${q}” nghĩa là gì?`, quizPinyin:q=>`Pinyin của “${q}” là gì?`, quizEnglish:q=>`English của “${q}” là gì?`, correct:'✅ Chính xác!', answer:a=>`❌ Đáp án: ${a}`, noVocab:'Không tìm thấy từ phù hợp.',
    exportDone:'Đã xuất file tiến độ.', importDone:'Đã nhập tiến độ thành công.', resetConfirm:'Xóa toàn bộ tiến độ và từ đã đánh dấu trên thiết bị này?', resetDone:'Đã xóa tiến độ.', invalidFile:'File không đúng định dạng.',
    generatedExample:'Ví dụ bổ sung tự động', curatedExample:'Ví dụ đã biên soạn'
  },
  en: {
    day:'Day', navToday:'Today', navVocab:'Vocabulary', navQuiz:'Quiz', navProgress:'Progress', goal:'Goal',
    favorite:'Favorite word', listenWord:'Listen', slow:'Slow', hidePinyin:'Hide Pinyin', showPinyin:'Show Pinyin',
    pronunciationPractice:'🎙 Pronunciation practice', startRecording:'Start recording', stop:'Stop', playback:'Playback', checkPronunciation:'Check pronunciation',
    target:'Target:', recognized:'AI recognized:', assessmentNote:'Groq Whisper AI transcribes your Chinese speech. The score is text-match similarity, not a professional tone/phoneme pronunciation score.', accuracyLabel:'Accuracy', fluencyLabel:'Fluency', completenessLabel:'Completeness',
    examples:'💬 Example sentences', examplesHint:'Tap the speaker to hear the full sentence in zh-TW.', rememberLevel:'How well do you remember this word?', notRemembered:'Not yet', learning:'Learning', remembered:'Remembered', previous:'Previous', next:'Next',
    writingPractice:'✍️ Writing practice', writingDevices:'Mouse · finger · Apple Pencil', clear:'Clear', showGuide:'Show faint guide', writingTip:'<strong>Practice:</strong> trace the guide → hide it → write from memory → say the character aloud.',
    creatingQuestion:'Creating a question…', anotherQuestion:'Another question', reviewed:'Reviewed', backupTitle:'💾 Progress backup', backupDesc:'Progress is stored in the browser on each device. Export a file to move it to another device.', exportProgress:'Export progress', importProgress:'Import progress', resetProgress:'Reset progress',
    footerNote:'Vocabulary for each level is loaded from the data folder. English glosses may be supplemented from CC-CEDICT when online; example sentences are study supplements and are not official TOCFL examples.',
    newWords:n=>`${n} new words`, allDays:'All days', dayOption:n=>`Day ${n}`, searchPlaceholder:'Search Hanzi, Pinyin or meaning…',
    loadingEnglish:'Loading English definition…', englishUnavailable:'English definition unavailable.', sourceWarning:'Source-data note:', likelyForm:'Examples use the likely intended form based on the source pinyin/meaning:',
    recordIdle:'The recording is kept only temporarily on this device.', recording:'🔴 Recording… say the current word.', recordDone:'Recording complete. Play it back or check pronunciation.', micDenied:'Microphone access failed. Allow microphone permission for this site.', recorderUnsupported:'This browser/device does not support MediaRecorder.',
    speechUnsupported:'This browser/device cannot record audio for AI transcription.', speechListening:'🎧 Recording for about 3.5 seconds… say the target word once now.', noRecognition:'AI did not return recognized text. Please try again clearly.', recognitionDone:'✅ Groq AI transcription complete. See the result below.', speechNoSpeech:'🎤 No speech was detected. Tap check and speak immediately.', speechPermissionDenied:'🔒 Microphone permission is not available. Allow microphone access for this site.', speechGenericError:'⚠️ Groq AI transcription failed. Please try again.', groqLoginRequired:'🔐 Sign in before checking pronunciation.', groqNotConnected:'☁️ This account has not connected its personal Groq API Key. Open Account → Personal Groq AI Speech and enter the key.', groqTranscriptionError:'Could not obtain a result from Groq AI.',
    feedbackExcellent:'AI recognized the target word exactly.', feedbackGood:'AI recognized something close. Listen to the model and try again.', feedbackRetry:'AI recognized a different word. Listen slowly and try again.',
    quizMeaning:q=>`What does “${q}” mean in Vietnamese?`, quizPinyin:q=>`What is the Pinyin for “${q}”?`, quizEnglish:q=>`What does “${q}” mean in English?`, correct:'✅ Correct!', answer:a=>`❌ Answer: ${a}`, noVocab:'No matching vocabulary found.',
    exportDone:'Progress file exported.', importDone:'Progress imported successfully.', resetConfirm:'Delete all progress and favorites on this device?', resetDone:'Progress deleted.', invalidFile:'Invalid progress file.',
    generatedExample:'Auto-generated study example', curatedExample:'Curated example'
  },
  'zh-Hant': {
    day:'第', navToday:'今天', navVocab:'詞彙', navQuiz:'測驗', navProgress:'進度', goal:'今日目標',
    favorite:'收藏單字', listenWord:'聽單字', slow:'慢速', hidePinyin:'隱藏拼音', showPinyin:'顯示拼音',
    pronunciationPractice:'🎙 發音練習', startRecording:'開始錄音', stop:'停止', playback:'播放錄音', checkPronunciation:'檢查發音',
    target:'目標：', recognized:'AI 辨識：', assessmentNote:'Groq Whisper AI 會轉寫你的中文語音。分數代表 AI 文字辨識與目標詞的相似度，不是專業聲調／音位評分。', accuracyLabel:'準確度', fluencyLabel:'流暢度', completenessLabel:'完整度',
    examples:'💬 例句', examplesHint:'按喇叭可用 zh-TW 聽完整句子。', rememberLevel:'你記得這個詞嗎？', notRemembered:'還不會', learning:'不太熟', remembered:'記住了', previous:'上一個', next:'下一個',
    writingPractice:'✍️ 寫字練習', writingDevices:'滑鼠 · 手指 · Apple Pencil', clear:'清除', showGuide:'顯示淡色範字', writingTip:'<strong>練習方式：</strong>描字 → 關閉範字 → 默寫 → 大聲讀出剛寫的字。',
    creatingQuestion:'正在出題…', anotherQuestion:'下一題', reviewed:'已評估', backupTitle:'💾 備份學習進度', backupDesc:'進度儲存在每台裝置的瀏覽器中。可匯出檔案，再匯入另一台裝置。', exportProgress:'匯出進度', importProgress:'匯入進度', resetProgress:'清除進度',
    footerNote:'各級詞彙從 data 資料夾載入。連網時可由 CC-CEDICT 補充英文釋義；例句為學習補充，並非 TOCFL 官方例句。',
    newWords:n=>`${n} 個新詞`, allDays:'全部', dayOption:n=>`第 ${n} 天`, searchPlaceholder:'搜尋漢字、拼音或意思…',
    loadingEnglish:'正在載入英文釋義…', englishUnavailable:'暫時無法取得英文釋義。', sourceWarning:'原始資料提醒：', likelyForm:'例句依原始拼音／意思採用推測的詞形：',
    recordIdle:'錄音只會暫時保留在此裝置。', recording:'🔴 錄音中……請讀目前的詞。', recordDone:'錄音完成。可播放錄音或檢查發音。', micDenied:'無法使用麥克風，請允許此網站使用麥克風。', recorderUnsupported:'此瀏覽器／裝置不支援 MediaRecorder。',
    speechUnsupported:'此瀏覽器／裝置無法錄音給 AI 辨識。', speechListening:'🎧 正在錄音約 3.5 秒……請現在讀一次目標詞。', noRecognition:'AI 沒有回傳辨識文字，請清楚地再試一次。', recognitionDone:'✅ Groq AI 已完成辨識，結果如下。', speechNoSpeech:'🎤 沒有偵測到語音，請按檢查後立即說話。', speechPermissionDenied:'🔒 尚未取得麥克風權限，請允許此網站使用麥克風。', speechGenericError:'⚠️ Groq AI 辨識失敗，請再試一次。', groqLoginRequired:'🔐 請先登入再檢查發音。', groqNotConnected:'☁️ 此帳號尚未連接個人的 Groq API Key。請到帳號 → 個人 Groq AI Speech 輸入 Key。', groqTranscriptionError:'無法取得 Groq AI 的辨識結果。',
    feedbackExcellent:'AI 正確辨識出目標詞。', feedbackGood:'AI 辨識結果接近，請聽範例後再試一次。', feedbackRetry:'AI 辨識成其他詞，請慢速聆聽後再試一次。',
    quizMeaning:q=>`「${q}」的越南文意思是什麼？`, quizPinyin:q=>`「${q}」的拼音是什麼？`, quizEnglish:q=>`「${q}」的英文意思是什麼？`, correct:'✅ 答對了！', answer:a=>`❌ 答案：${a}`, noVocab:'找不到符合的詞。',
    exportDone:'已匯出進度檔。', importDone:'已成功匯入進度。', resetConfirm:'要清除這台裝置上的全部進度與收藏嗎？', resetDone:'已清除進度。', invalidFile:'檔案格式不正確。',
    generatedExample:'自動補充例句', curatedExample:'人工整理例句'
  }
};

const state = {
  allWords: [], enrich: {}, day: 1, dayWords: [], index: 0, pinyinVisible: true,
  progress: {}, favorites: new Set(), lang: 'vi', englishDefs: {}, englishLoaded: false,
  mediaRecorder: null, recordedChunks: [], recordingUrl: null, stream: null,
  groqRecognitionRunning: false,
  pinyinMap: new Map(),
  activeLevel: 'A1', rememberLevel: false, levelStates: {}, levelDataCache: {},
  levelAvailability: {}, currentUserId: null
};

const LEVEL_UI = {
  vi:{title:'Chọn trình độ',subtitle:'Chọn cấp độ bạn muốn học. Trình độ chưa có file dữ liệu sẽ ở trạng thái Coming soon.',remember:'Nhớ trình độ đã chọn',rememberHint:'Bật: lần sau vào tài khoản sẽ mở thẳng trình độ này. Tắt: phiên sau sẽ hỏi lại.',available:'Sẵn sàng',coming:'Coming soon',loading:'Đang kiểm tra…',words:n=>`${n} từ`,choose:'Học trình độ này',levelButton:'Trình độ',close:'Đóng',descriptions:{A1:'Cơ bản',A2:'Sơ cấp nâng cao',B1:'Trung cấp',B2:'Trung cao cấp',C1:'Cao cấp',C2:'Thành thạo'}},
  en:{title:'Choose level',subtitle:'Choose what you want to study. Levels without a data file stay as Coming soon.',remember:'Remember selected level',rememberHint:'On: next time this account opens directly at this level. Off: ask again in a future session.',available:'Ready',coming:'Coming soon',loading:'Checking…',words:n=>`${n} words`,choose:'Study this level',levelButton:'Level',close:'Close',descriptions:{A1:'Beginner',A2:'Upper elementary',B1:'Intermediate',B2:'Upper intermediate',C1:'Advanced',C2:'Proficient'}},
  'zh-Hant':{title:'選擇程度',subtitle:'選擇要學習的程度。尚未上傳資料檔的程度會顯示 Coming soon。',remember:'記住所選程度',rememberHint:'開啟：下次此帳號會直接進入這個程度。關閉：之後的工作階段會再次詢問。',available:'可使用',coming:'Coming soon',loading:'檢查中…',words:n=>`${n} 個詞`,choose:'學習這個程度',levelButton:'程度',close:'關閉',descriptions:{A1:'基礎',A2:'初級進階',B1:'中級',B2:'中高級',C1:'高級',C2:'精熟'}}
};

const $ = id => document.getElementById(id);
const t = (key, ...args) => {
  const pack = I18N[state.lang] || I18N.vi;
  const val = pack[key] ?? I18N.vi[key] ?? key;
  return typeof val === 'function' ? val(...args) : val;
};

const levelText = () => LEVEL_UI[state.lang] || LEVEL_UI.vi;
const levelConfig = id => LEVEL_MAP[String(id || '').toUpperCase()] || null;
const englishCacheKey = level => `${ENGLISH_CACHE_PREFIX}-${String(level||'A1').toLowerCase()}`;
function emptyLevelState(){ return {progress:{},favorites:[],lastDay:1}; }
function normalizeLevelState(value){
  const v=value && typeof value==='object' ? value : {};
  return {
    progress: v.progress && typeof v.progress==='object' ? v.progress : {},
    favorites: Array.isArray(v.favorites) ? v.favorites : [],
    lastDay: Math.max(1, Number(v.lastDay || 1))
  };
}
function a1Inferred(word){ return state.activeLevel==='A1' ? INFERRED_FORMS[word?.id] : undefined; }
function a1EnglishOverride(word){ return state.activeLevel==='A1' ? EN_OVERRIDES[word?.id] : undefined; }

const INFERRED_FORMS = {55:'出國',56:'出來',57:'出去',68:'蛋糕',383:'下面'};
const EN_OVERRIDES = {55:'to go abroad',56:'to come out',57:'to go out',68:'cake',383:'below; underneath'};

function primaryForm(word) {
  if (a1Inferred(word)) return a1Inferred(word);
  let s = String(word.traditional || '').trim();
  if (s.includes('/')) s = s.split('/')[0];
  s = s.replace(/右邊\)$/,'右邊');
  s = s.replace(/\(([^)]+)\)/g, (_,inner) => inner === '兒' ? '' : inner);
  return s;
}
function candidateForms(word) {
  const out = new Set([primaryForm(word), String(word.traditional || '')]);
  let s = String(word.traditional || '');
  if (s.includes('/')) s.split('/').forEach(x=>out.add(x));
  const m=s.match(/^(.*?)\((.*?)\)$/); if(m){out.add(m[1]);out.add(m[1]+m[2]);}
  out.add(s.replace(/[()（）]/g,'')); out.add(s.replace(/\)$/,''));
  return [...out].filter(Boolean);
}

async function fetchJsonOptional(url){
  try{
    const res=await fetch(url,{cache:'no-store'});
    if(res.status===404) return null;
    if(!res.ok) throw new Error(`${url}: HTTP ${res.status}`);
    return await res.json();
  }catch(err){
    if(String(err?.message||'').includes('404')) return null;
    throw err;
  }
}

function normalizeVocabulary(base, levelId){
  const words=Array.isArray(base?.vocabulary) ? base.vocabulary : Array.isArray(base) ? base : [];
  const target=Math.max(1,Number(base?.meta?.daily_target||20));
  return words.map((word,index)=>({
    ...word,
    id: word.id ?? `${levelId}-${String(index+1).padStart(4,'0')}`,
    level: word.level || levelId,
    day: Math.max(1,Number(word.day || Math.floor(index/target)+1))
  }));
}

async function loadLevelData(levelId,{force=false}={}){
  const id=String(levelId||'').toUpperCase();
  const cfg=levelConfig(id); if(!cfg) return null;
  if(!force && state.levelDataCache[id]) return state.levelDataCache[id];
  const base=await fetchJsonOptional(cfg.base);
  if(!base){
    delete state.levelDataCache[id];
    state.levelAvailability[id]={status:'missing',count:0};
    return null;
  }
  const words=normalizeVocabulary(base,id);
  if(!words.length){
    state.levelAvailability[id]={status:'missing',count:0};
    return null;
  }
  let enrich={};
  for(const path of cfg.enrich||[]){
    const found=await fetchJsonOptional(path);
    if(found){ enrich=found.enrichment && typeof found.enrichment==='object' ? found.enrichment : found; break; }
  }
  const pack={meta:base.meta||{},words,enrich};
  state.levelDataCache[id]=pack;
  state.levelAvailability[id]={status:'available',count:words.length,meta:pack.meta};
  return pack;
}

async function probeAllLevels({force=false}={}){
  await Promise.all(LEVEL_CATALOG.map(async cfg=>{
    if(state.levelDataCache[cfg.id]){
      const pack=state.levelDataCache[cfg.id]; state.levelAvailability[cfg.id]={status:'available',count:pack.words.length,meta:pack.meta}; renderLevelSelector(); return;
    }
    if(state.levelAvailability[cfg.id]?.status==='available' && !force) return;
    state.levelAvailability[cfg.id]={...(state.levelAvailability[cfg.id]||{}),status:'loading'}; renderLevelSelector();
    try{
      const res=await fetch(cfg.base,{method:'HEAD',cache:'no-store'});
      if(res.ok) state.levelAvailability[cfg.id]={status:'available',count:null};
      else if(res.status===404) state.levelAvailability[cfg.id]={status:'missing',count:0};
      else if(res.status===405){
        const base=await fetchJsonOptional(cfg.base); state.levelAvailability[cfg.id]=base?{status:'available',count:Array.isArray(base.vocabulary)?base.vocabulary.length:null}:{status:'missing',count:0};
      }else state.levelAvailability[cfg.id]={status:'error',count:0};
    }catch(err){ console.warn(`Level ${cfg.id}:`,err); state.levelAvailability[cfg.id]={status:'error',count:0}; }
    renderLevelSelector();
  }));
}

function loadEnglishCacheForLevel(levelId){
  state.englishDefs={}; state.englishLoaded=false;
  try{
    let raw=localStorage.getItem(englishCacheKey(levelId));
    if(!raw && levelId==='A1') raw=localStorage.getItem(LEGACY_ENGLISH_CACHE_KEY);
    const c=JSON.parse(raw||'{}'); state.englishDefs=c.defs||{}; state.englishLoaded=Boolean(c.complete);
  }catch{ state.englishDefs={}; state.englishLoaded=false; }
}

function saveCurrentLevelSnapshot(){
  if(!state.activeLevel) return;
  state.levelStates[state.activeLevel]={
    progress:state.progress && typeof state.progress==='object' ? state.progress : {},
    favorites:[...state.favorites],
    lastDay:Math.max(1,Number(state.day||1))
  };
}

function persistMultiState(){
  saveCurrentLevelSnapshot();
  const levels={};
  for(const cfg of LEVEL_CATALOG){ if(state.levelStates[cfg.id]) levels[cfg.id]=normalizeLevelState(state.levelStates[cfg.id]); }
  const payload={version:1,levels,settings:{activeLevel:state.activeLevel,rememberLevel:Boolean(state.rememberLevel)}};
  localStorage.setItem(MULTI_STATE_KEY,JSON.stringify(payload));
  // Keep an A1 mirror so an older deployment does not lose existing A1 progress.
  const a1=normalizeLevelState(levels.A1||{});
  localStorage.setItem(LEGACY_STORAGE_KEY,JSON.stringify(a1.progress));
  localStorage.setItem(LEGACY_FAVORITES_KEY,JSON.stringify(a1.favorites));
  localStorage.setItem(LEGACY_LAST_DAY_KEY,String(a1.lastDay));
}

function loadLocalState(){
  const lang=localStorage.getItem(LANGUAGE_KEY); if(I18N[lang]) state.lang=lang;
  let multi=null;
  try{ multi=JSON.parse(localStorage.getItem(MULTI_STATE_KEY)||'null'); }catch{}
  if(multi?.levels && typeof multi.levels==='object'){
    for(const [id,value] of Object.entries(multi.levels)) if(levelConfig(id)) state.levelStates[id]=normalizeLevelState(value);
    const desired=String(multi.settings?.activeLevel||'A1').toUpperCase();
    state.activeLevel=levelConfig(desired)?desired:'A1';
    state.rememberLevel=Boolean(multi.settings?.rememberLevel);
  }else{
    let progress={},favorites=[];
    try{progress=JSON.parse(localStorage.getItem(LEGACY_STORAGE_KEY)||'{}');}catch{}
    try{favorites=JSON.parse(localStorage.getItem(LEGACY_FAVORITES_KEY)||'[]');}catch{}
    state.levelStates.A1=normalizeLevelState({progress,favorites,lastDay:Number(localStorage.getItem(LEGACY_LAST_DAY_KEY)||1)});
    state.activeLevel='A1'; state.rememberLevel=false;
  }
  if(!state.levelStates.A1) state.levelStates.A1=emptyLevelState();
  const current=normalizeLevelState(state.levelStates[state.activeLevel]||emptyLevelState());
  state.progress=current.progress; state.favorites=new Set(current.favorites); state.day=current.lastDay;
  loadEnglishCacheForLevel(state.activeLevel);
}

async function applyLevel(levelId,{notify=true,close=true}={}){
  const id=String(levelId||'').toUpperCase();
  const pack=await loadLevelData(id,{force:false});
  if(!pack) return false;
  saveCurrentLevelSnapshot();
  state.activeLevel=id; state.allWords=pack.words; state.enrich=pack.enrich||{};
  const saved=normalizeLevelState(state.levelStates[id]||emptyLevelState());
  state.levelStates[id]=saved; state.progress=saved.progress; state.favorites=new Set(saved.favorites); state.day=saved.lastDay; state.index=0;
  loadEnglishCacheForLevel(id); buildPinyinMap(); buildDaySelectors(); updateBranding(); applyLanguage();
  selectDay(saved.lastDay,{notify:false});
  persistMultiState();
  if(close) closeLevelSelector();
  if(notify) document.dispatchEvent(new CustomEvent('tocfl:state-changed'));
  void loadEnglishDictionary();
  return true;
}

async function init(){
  try{
    loadLocalState();
    let desired=state.rememberLevel ? state.activeLevel : 'A1';
    let pack=await loadLevelData(desired);
    if(!pack && desired!=='A1'){ desired='A1'; pack=await loadLevelData('A1'); }
    if(!pack) throw new Error('Cannot load data/a1.json.');
    state.activeLevel=desired; state.allWords=pack.words; state.enrich=pack.enrich||{};
    const saved=normalizeLevelState(state.levelStates[desired]||emptyLevelState());
    state.levelStates[desired]=saved; state.progress=saved.progress; state.favorites=new Set(saved.favorites); state.day=saved.lastDay;
    loadEnglishCacheForLevel(desired); buildPinyinMap();
    bindLanguage(); buildDaySelectors(); bindNavigation(); bindStudyControls(); bindRecorder(); bindCanvas(); bindVocab(); bindQuiz(); bindBackup(); bindLevelSelector();
    updateBranding(); applyLanguage(); selectDay(saved.lastDay,{notify:false});
    registerServiceWorker();
    window.TOCFL_APP_READY=true;
    document.dispatchEvent(new CustomEvent('tocfl:app-ready'));
    void probeAllLevels();
    void loadEnglishDictionary();
  }catch(err){
    console.error(err);
    document.querySelector('main').innerHTML=`<div class="card"><strong>Error:</strong> ${escapeHtml(err.message)}<br><br>Open this through GitHub Pages or a web server, not file://.</div>`;
  }
}

function saveLocalState(options={}){
  persistMultiState();
  updateProgressUI();
  if(!options.silent) document.dispatchEvent(new CustomEvent('tocfl:state-changed'));
}

function bindLanguage() {
  $('languageSelect').value = state.lang;
  $('languageSelect').addEventListener('change', e => {
    state.lang = I18N[e.target.value] ? e.target.value : 'vi';
    localStorage.setItem(LANGUAGE_KEY, state.lang);
    applyLanguage(); renderCurrentWord(); renderVocabList(); makeQuiz(); updateProgressUI();
    document.dispatchEvent(new CustomEvent('tocfl:language-changed'));
    document.dispatchEvent(new CustomEvent('tocfl:state-changed'));
  });
}
function applyLanguage() {
  document.documentElement.lang = state.lang === 'zh-Hant' ? 'zh-Hant' : state.lang;
  $('languageSelect').value = state.lang;
  document.querySelectorAll('[data-i18n]').forEach(el=>{el.textContent=t(el.dataset.i18n);});
  document.querySelectorAll('[data-i18n-html]').forEach(el=>{el.innerHTML=t(el.dataset.i18nHtml);});
  document.querySelectorAll('[data-i18n-title]').forEach(el=>{el.title=t(el.dataset.i18nTitle);});
  $('vocabSearch').placeholder=t('searchPlaceholder');
  refreshDaySelectorLabels();
  $('togglePinyinBtn').textContent = state.pinyinVisible ? t('hidePinyin') : t('showPinyin');
  if (!state.recordingUrl && !state.recognitionRunning) $('recordStatus').textContent=t('recordIdle');
  updateBranding();
  renderLevelSelector();
}

function buildDaySelectors(){
  const maxDay=Math.max(1,...state.allWords.map(w=>Number(w.day||1)));
  $('daySelect').innerHTML=Array.from({length:maxDay},(_,i)=>`<option value="${i+1}"></option>`).join('');
  $('vocabDayFilter').innerHTML=`<option value="all"></option>`+Array.from({length:maxDay},(_,i)=>`<option value="${i+1}"></option>`).join('');
  $('daySelect').onchange=e=>selectDay(Number(e.target.value));
  $('vocabDayFilter').onchange=renderVocabList;
  refreshDaySelectorLabels();
}
function refreshDaySelectorLabels(){
  [...$('daySelect').options].forEach((o,i)=>o.textContent=t('dayOption',i+1));
  [...$('vocabDayFilter').options].forEach((o,i)=>o.textContent=i===0?t('allDays'):t('dayOption',i));
}
function selectDay(day,{notify=true}={}){
  const maxDay=Math.max(1,...state.allWords.map(w=>Number(w.day||1)));
  state.day=Math.max(1,Math.min(maxDay,Number(day||1)));
  state.dayWords=state.allWords.filter(w=>Number(w.day)===state.day);
  if(!state.dayWords.length){
    const first=state.allWords[0]; state.day=Math.max(1,Number(first?.day||1)); state.dayWords=state.allWords.filter(w=>Number(w.day)===state.day);
  }
  state.index=0; $('daySelect').value=String(state.day);
  saveCurrentLevelSnapshot(); persistMultiState();
  $('dailyTargetLabel').textContent=t('newWords',state.dayWords.length);
  renderCurrentWord(); updateProgressUI(); renderVocabList(); makeQuiz();
  if(notify) document.dispatchEvent(new CustomEvent('tocfl:state-changed'));
}
function currentWord(){return state.dayWords[state.index]||state.allWords[0];}
function englishFor(word){
  const curated=state.enrich[String(word.id)]?.meaning_en; if(curated)return curated;
  const override=a1EnglishOverride(word); if(override)return override;
  return state.englishDefs[String(word.id)] || (state.englishLoaded ? t('englishUnavailable') : t('loadingEnglish'));
}
function isEnglishPending(word){return !state.enrich[String(word.id)]?.meaning_en && !a1EnglishOverride(word) && !state.englishDefs[String(word.id)] && !state.englishLoaded;}

function renderCurrentWord(){
  if(!state.dayWords.length)return;
  const w=currentWord();
  $('hanzi').textContent=w.traditional; $('pinyin').textContent=state.pinyinVisible?w.pinyin:'••••';
  $('meaningVi').textContent=w.meaning_vi||'—'; $('meaningEn').textContent=englishFor(w); $('meaningEn').classList.toggle('loading-shimmer',isEnglishPending(w));
  $('levelPos').textContent=`${w.level||'A1'}${w.pos?' · '+w.pos:''}`; $('wordIndex').textContent=`${state.index+1} / ${state.dayWords.length}`;
  $('favoriteBtn').textContent=state.favorites.has(w.id)?'★':'☆'; $('togglePinyinBtn').textContent=state.pinyinVisible?t('hidePinyin'):t('showPinyin');
  renderSourceNote(w); renderExamples(w); renderMemoryButtons(w); renderWritingBoxes(w); resetRecordingForNewWord();
}
function renderSourceNote(w){
  const box=$('dictionaryNote'); box.textContent='';
  if(w.source_note){
    const inferred=a1Inferred(w) ? ` ${t('likelyForm')} ${a1Inferred(w)}.` : '';
    box.textContent=`⚠️ ${t('sourceWarning')} ${w.source_note}${inferred}`;
  }
}

async function loadEnglishDictionary(){
  if(state.englishLoaded){renderCurrentWord();return;}
  try{
    const res=await fetch(CEDICT_URL,{cache:'force-cache'}); if(!res.ok)throw new Error(`CC-CEDICT HTTP ${res.status}`);
    const text=await res.text();
    const needed=new Map();
    state.allWords.forEach(w=>{if(state.enrich[String(w.id)]?.meaning_en||a1EnglishOverride(w))return;candidateForms(w).forEach(f=>needed.set(f,w.id));});
    const byForm=new Map();
    for(const line of text.split(/\r?\n/)){
      if(!line||line.startsWith('#'))continue;
      const m=line.match(/^(\S+)\s+(\S+)\s+\[([^\]]+)\]\s+\/(.+)\/$/); if(!m)continue;
      const trad=m[1],simp=m[2]; if(!needed.has(trad)&&!needed.has(simp))continue;
      const defs=m[4].split('/').map(cleanDefinition).filter(Boolean);
      for(const form of [trad,simp]) if(needed.has(form)) byForm.set(form,[...(byForm.get(form)||[]),...defs]);
    }
    const defs={...state.englishDefs};
    state.allWords.forEach(w=>{
      if(state.enrich[String(w.id)]?.meaning_en||a1EnglishOverride(w))return;
      let arr=[]; for(const f of candidateForms(w)){if(byForm.has(f)){arr=byForm.get(f);break;}}
      arr=[...new Set(arr)].filter(x=>x.length<150).slice(0,4);
      if(arr.length)defs[String(w.id)]=arr.join('; ');
    });
    state.englishDefs=defs; state.englishLoaded=true;
    try{localStorage.setItem(englishCacheKey(state.activeLevel),JSON.stringify({complete:true,defs}));}catch{}
    renderCurrentWord(); renderVocabList();
  }catch(err){
    console.warn('CC-CEDICT load failed:',err); state.englishLoaded=true; renderCurrentWord();
  }
}
function cleanDefinition(s){
  return String(s||'').replace(/\([^)]*pr\.[^)]*\)/gi,'').replace(/M:\s*[^;]+/g,'').replace(/\s+/g,' ').trim().replace(/^to be /,'').replace(/;$/,'');
}

function renderExamples(w){
  const wrap=$('examples'); wrap.innerHTML='';
  const curated=state.enrich[String(w.id)]?.examples;
  const examples=curated?.length ? curated.map(x=>({...x,source:'curated'})) : generateExamples(w,englishFor(w));
  examples.forEach((ex,idx)=>{
    const card=document.createElement('div');card.className='example';
    const top=document.createElement('div');top.className='example-top';
    const text=document.createElement('div');text.style.minWidth='0';
    const zh=document.createElement('div');zh.className='example-zh';zh.textContent=ex.zh;
    const py=document.createElement('div');py.className='example-pinyin';py.textContent=state.pinyinVisible?(ex.pinyin||sentencePinyin(ex.zh,w)):'••••••••';
    text.append(zh,py);
    const btn=document.createElement('button');btn.type='button';btn.className='icon-btn';btn.textContent='🔊';btn.title=`Listen ${idx+1}`;btn.addEventListener('click',()=>speak(ex.zh,.88));
    top.append(text,btn);
    const trans=document.createElement('div');trans.className='example-translations';
    const vi=document.createElement('div');vi.textContent=`🇻🇳 ${ex.vi}`;const en=document.createElement('div');en.textContent=`🇬🇧 ${ex.en}`;
    const source=document.createElement('div');source.className='example-source';source.textContent=ex.source==='curated'?t('curatedExample'):`${t('generatedExample')} · ${state.activeLevel}`;
    trans.append(vi,en,source);card.append(top,trans);wrap.append(card);
  });
}

const PEOPLE = new Set(['爸爸','媽媽','哥哥','弟弟','妹妹','兒子','孩子','家人','朋友','老師','同學','學生','醫生','先生','小姐','太太','男孩','男生','女孩','女生','女兒','姊姊/姐姐']);
const PLACES = new Set(['辦公室','餐廳','車站','廚房','大學','電影院','地方','機場','公司','公寓','公園','海邊','教室','客廳','門口','商店','圖書館','宿舍','洗手間','學校','醫院','銀行','郵局','游泳池','房間','房子','大樓']);
const DRINKS = new Set(['茶','咖啡','可樂','牛奶','水']);
const FOODS = new Set(['包子','菜','飯','熱狗','肉','水果','糖','麵包','面','午餐/午飯','晚餐/晚飯','早餐/早飯']);
const COLORS = new Set(['白色','紅色','黃色','綠色']);
const BODY = new Set(['肚子','腳','手','頭','眼睛','身體']);
const TRANSPORT = new Set(['車(子)','船','飛機','公共汽車','火車','腳踏車']);
const SPORTS = new Set(['棒球','籃球','網球','足球']);
const SEASONS = new Set(['春天','冬天','秋天','夏天']);
const DIRECTIONS = new Set(['北邊','東邊','南(邊)','西邊','右邊)','左(邊)','前面','後面','上面','下麵','對面']);

const SPECIAL_EXAMPLES = {
  '吧': [['我們走吧！','Chúng ta đi nhé!','Let\'s go!'],['你是學生吧？','Bạn là học sinh, đúng không?','You are a student, right?']],
  '把': [['請把門打開。','Hãy mở cửa ra.','Please open the door.'],['我把書放在桌子上。','Tôi đặt sách lên bàn.','I put the book on the table.']],
  '被': [['我的手機被他拿走了。','Điện thoại của tôi bị anh ấy lấy đi.','My phone was taken away by him.'],['他被老師叫去辦公室。','Anh ấy được giáo viên gọi lên văn phòng.','He was called to the office by the teacher.']],
  '比': [['今天比昨天熱。','Hôm nay nóng hơn hôm qua.','Today is hotter than yesterday.'],['他比我高。','Anh ấy cao hơn tôi.','He is taller than me.']],
  '比較': [['這個比較便宜。','Cái này khá rẻ hơn.','This one is relatively cheaper.'],['我比較喜歡茶。','Tôi thích trà hơn.','I prefer tea.']],
  '不客氣': [['謝謝你！—不客氣。','Cảm ơn bạn! — Không có gì.','Thank you! — You\'re welcome.'],['不用客氣，不客氣。','Đừng khách sáo, không có gì.','No need to be polite; you\'re welcome.']],
  '不': [['我不喝咖啡。','Tôi không uống cà phê.','I do not drink coffee.'],['不要走！','Đừng đi!','Don\'t go!']],
  '不好意思': [['不好意思，我遲到了。','Xin lỗi/ngại quá, tôi đến muộn.','Sorry, I am late.'],['不好意思，請問洗手間在哪裡？','Xin lỗi, cho hỏi nhà vệ sinh ở đâu?','Excuse me, where is the restroom?']],
  '才': [['他九點才來。','Mãi chín giờ anh ấy mới đến.','He did not come until nine.'],['我昨天才知道。','Hôm qua tôi mới biết.','I only found out yesterday.']],
  '常常': [['我常常去圖書館。','Tôi thường đi thư viện.','I often go to the library.'],['他常常喝咖啡。','Anh ấy thường uống cà phê.','He often drinks coffee.']],
  '當然': [['當然可以。','Đương nhiên là được.','Of course you can.'],['我當然知道。','Đương nhiên tôi biết.','Of course I know.']],
  '的': [['這是我的書。','Đây là sách của tôi.','This is my book.'],['紅色的衣服很好看。','Quần áo màu đỏ rất đẹp.','The red clothes look nice.']],
  '得': [['他跑得很快。','Anh ấy chạy rất nhanh.','He runs very fast.'],['你中文說得很好。','Bạn nói tiếng Trung rất tốt.','You speak Chinese very well.']],
  '第': [['這是第一課。','Đây là bài thứ nhất.','This is the first lesson.'],['我住在三樓。','Tôi sống ở tầng ba.','I live on the third floor.']],
  '都': [['我們都是學生。','Chúng tôi đều là học sinh/sinh viên.','We are all students.'],['這些我都喜歡。','Những cái này tôi đều thích.','I like all of these.']],
  '多少': [['這個多少錢？','Cái này bao nhiêu tiền?','How much is this?'],['你有多少本書？','Bạn có bao nhiêu quyển sách?','How many books do you have?']],
  '非常': [['今天非常熱。','Hôm nay vô cùng nóng.','It is extremely hot today.'],['我非常喜歡臺灣。','Tôi rất thích Đài Loan.','I like Taiwan very much.']],
  '跟': [['我跟朋友去公園。','Tôi đi công viên cùng bạn.','I go to the park with a friend.'],['我跟他都是學生。','Tôi và anh ấy đều là học sinh/sinh viên.','He and I are both students.']],
  '更': [['今天更冷。','Hôm nay còn lạnh hơn.','Today is even colder.'],['這個更便宜。','Cái này còn rẻ hơn.','This one is even cheaper.']],
  '還是': [['你喝茶還是咖啡？','Bạn uống trà hay cà phê?','Do you drink tea or coffee?'],['我們坐車還是走路？','Chúng ta đi xe hay đi bộ?','Should we take a vehicle or walk?']],
  '好像': [['他好像很忙。','Hình như anh ấy rất bận.','He seems very busy.'],['今天好像會下雨。','Hình như hôm nay sẽ mưa.','It looks like it will rain today.']],
  '和': [['我和他是同學。','Tôi và anh ấy là bạn học.','He and I are classmates.'],['我喜歡茶和咖啡。','Tôi thích trà và cà phê.','I like tea and coffee.']],
  '很': [['我很高興。','Tôi rất vui.','I am very happy.'],['這裡很安靜。','Ở đây rất yên tĩnh.','It is very quiet here.']],
  '就': [['我吃完飯就去。','Ăn cơm xong tôi sẽ đi ngay.','I will go as soon as I finish eating.'],['他八點就到了。','Anh ấy đã đến từ tám giờ.','He arrived as early as eight.']],
  '可能': [['他可能在家。','Có lẽ anh ấy ở nhà.','He may be at home.'],['明天可能下雨。','Ngày mai có thể mưa.','It may rain tomorrow.']],
  '可是': [['我想去，可是我很忙。','Tôi muốn đi nhưng tôi rất bận.','I want to go, but I am very busy.'],['這個很好，可是太貴了。','Cái này rất tốt nhưng quá đắt.','This is good, but too expensive.']],
  '可以': [['我可以進去嗎？','Tôi có thể vào không?','May I go in?'],['這裡可以坐。','Ở đây có thể ngồi.','You can sit here.']],
  '快': [['快來！','Mau đến đây!','Come quickly!'],['我們快走吧。','Chúng ta đi nhanh nhé.','Let\'s go quickly.']],
  '嗎': [['你是學生嗎？','Bạn là học sinh/sinh viên phải không?','Are you a student?'],['你喜歡咖啡嗎？','Bạn thích cà phê không?','Do you like coffee?']],
  '沒': [['我昨天沒去學校。','Hôm qua tôi không đi học.','I did not go to school yesterday.'],['他今天沒來。','Hôm nay anh ấy không đến.','He did not come today.']],
  '沒(有)': [['我沒有錢。','Tôi không có tiền.','I do not have money.'],['他沒有手機。','Anh ấy không có điện thoại di động.','He does not have a mobile phone.']],
  '呢': [['我很好，你呢？','Tôi khỏe, còn bạn thì sao?','I am fine. How about you?'],['我的書呢？','Sách của tôi đâu rồi?','Where is my book?']],
  '能': [['你能來嗎？','Bạn có thể đến không?','Can you come?'],['我今天不能去。','Hôm nay tôi không thể đi.','I cannot go today.']],
  '請問': [['請問，車站在哪裡？','Xin hỏi, trạm xe ở đâu?','Excuse me, where is the station?'],['請問，你叫什麼名字？','Xin hỏi, bạn tên là gì?','May I ask your name?']],
  '所以': [['因為下雨，所以我不去。','Vì trời mưa nên tôi không đi.','Because it is raining, I am not going.'],['我很累，所以想休息。','Tôi rất mệt nên muốn nghỉ ngơi.','I am tired, so I want to rest.']],
  '太': [['今天太熱了。','Hôm nay nóng quá.','It is too hot today.'],['這個太貴了。','Cái này đắt quá.','This is too expensive.']],
  '為什麼': [['你為什麼不去？','Tại sao bạn không đi?','Why are you not going?'],['你為什麼學中文？','Tại sao bạn học tiếng Trung?','Why do you study Chinese?']],
  '先': [['你先吃飯。','Bạn ăn cơm trước đi.','You eat first.'],['我們先去銀行，再去商店。','Chúng ta đi ngân hàng trước rồi đến cửa hàng.','Let\'s go to the bank first, then the store.']],
  '現在': [['我現在在學校。','Bây giờ tôi đang ở trường.','I am at school now.'],['現在幾點？','Bây giờ mấy giờ?','What time is it now?']],
  '也': [['我也喜歡咖啡。','Tôi cũng thích cà phê.','I also like coffee.'],['他也是學生。','Anh ấy cũng là học sinh/sinh viên.','He is also a student.']],
  '一定': [['我一定會去。','Tôi nhất định sẽ đi.','I will definitely go.'],['你一定要小心。','Bạn nhất định phải cẩn thận.','You must be careful.']],
  '一共': [['一共多少錢？','Tổng cộng bao nhiêu tiền?','How much is it in total?'],['我們一共五個人。','Tổng cộng chúng tôi có năm người.','There are five of us in total.']],
  '以後': [['下課以後，我去吃飯。','Sau khi tan học, tôi đi ăn.','After class, I go eat.'],['以後我想去臺灣旅行。','Sau này tôi muốn du lịch Đài Loan.','I want to travel to Taiwan in the future.']],
  '已經': [['我已經吃飯了。','Tôi đã ăn cơm rồi.','I have already eaten.'],['他已經回家了。','Anh ấy đã về nhà rồi.','He has already gone home.']],
  '以前': [['我以前住在臺北。','Trước đây tôi sống ở Đài Bắc.','I used to live in Taipei.'],['上課以前，我先喝咖啡。','Trước khi lên lớp, tôi uống cà phê trước.','Before class, I drink coffee first.']],
  '一起': [['我們一起吃飯吧。','Chúng ta cùng ăn cơm nhé.','Let\'s eat together.'],['我跟朋友一起學中文。','Tôi học tiếng Trung cùng bạn.','I study Chinese with a friend.']],
  '一些': [['我買了一些水果。','Tôi mua một ít trái cây.','I bought some fruit.'],['桌子上有一些書。','Trên bàn có một vài quyển sách.','There are some books on the table.']],
  '一直': [['我一直在等你。','Tôi cứ chờ bạn mãi.','I have been waiting for you.'],['他一直住在這裡。','Anh ấy luôn sống ở đây.','He has been living here all along.']],
  '因為': [['因為下雨，我不去公園。','Bởi vì trời mưa, tôi không đi công viên.','Because it is raining, I am not going to the park.'],['因為我很累，所以想睡覺。','Vì tôi rất mệt nên muốn ngủ.','Because I am tired, I want to sleep.']],
  '有點(兒)': [['今天有點冷。','Hôm nay hơi lạnh.','It is a little cold today.'],['我有點累。','Tôi hơi mệt.','I am a little tired.']],
  '有時候': [['我有時候喝咖啡。','Có lúc tôi uống cà phê.','I sometimes drink coffee.'],['他有時候走路上班。','Có lúc anh ấy đi bộ đi làm.','He sometimes walks to work.']],
  '又': [['他又來了。','Anh ấy lại đến rồi.','He came again.'],['今天又下雨了。','Hôm nay lại mưa rồi.','It is raining again today.']],
  '再': [['請再說一次。','Xin hãy nói lại một lần nữa.','Please say it again.'],['明天再見。','Ngày mai gặp lại.','See you tomorrow.']],
  '在': [['我在學校。','Tôi ở trường.','I am at school.'],['我在吃飯。','Tôi đang ăn cơm.','I am eating.']],
  '怎麼': [['這個字怎麼讀？','Chữ này đọc thế nào?','How do you read this character?'],['你怎麼去學校？','Bạn đi đến trường bằng cách nào?','How do you go to school?']],
  '怎麼辦': [['我忘了帶錢，怎麼辦？','Tôi quên mang tiền, làm sao đây?','I forgot to bring money. What should I do?'],['下雨了，怎麼辦？','Trời mưa rồi, làm sao đây?','It is raining. What should we do?']],
  '怎麼了': [['你怎麼了？','Bạn bị sao vậy?','What happened to you?'],['他怎麼了？','Anh ấy bị sao vậy?','What is wrong with him?']],
  '怎麼樣': [['這個怎麼樣？','Cái này thế nào?','How is this one?'],['你今天怎麼樣？','Hôm nay bạn thế nào?','How are you today?']],
  '對不起': [['對不起，我遲到了。','Xin lỗi, tôi đến muộn.','Sorry, I am late.'],['對不起，我不知道。','Xin lỗi, tôi không biết.','Sorry, I do not know.']],
  '從': [['我從家走到學校。','Tôi đi bộ từ nhà đến trường.','I walk from home to school.'],['我從臺北來。','Tôi đến từ Đài Bắc.','I come from Taipei.']],
  '過': [['我去過臺灣。','Tôi đã từng đến Đài Loan.','I have been to Taiwan.'],['過馬路要小心。','Qua đường phải cẩn thận.','Be careful when crossing the road.']],
  '多': [['請多說中文。','Hãy nói tiếng Trung nhiều hơn.','Please speak more Chinese.'],['這裡人很多。','Ở đây có rất nhiều người.','There are many people here.']],
  '好': [['這個很好。','Cái này rất tốt.','This is very good.'],['他好高。','Anh ấy rất cao.','He is so tall.']],
  '了': [['我吃飯了。','Tôi ăn cơm rồi.','I have eaten.'],['下雨了。','Trời mưa rồi.','It has started raining.']],
  '往': [['請往前面走。','Hãy đi về phía trước.','Please walk forward.'],['往右邊走。','Đi về phía bên phải.','Walk to the right.']],
  '啊': [['啊！我忘了帶手機。','À! Tôi quên mang điện thoại rồi.','Ah! I forgot to bring my phone.'],['啊，我知道了。','À, tôi hiểu rồi.','Oh, I understand now.']]
};

const MEASURE_EXAMPLES = {
  '班':[['我坐八點那班車。','Tôi đi chuyến xe lúc tám giờ.','I take the eight o’clock service.'],['下一班車幾點來？','Chuyến xe tiếp theo mấy giờ đến?','What time does the next service come?']],
  '杯':[['我要一杯茶。','Tôi muốn một ly trà.','I want a cup of tea.'],['他喝了兩杯咖啡。','Anh ấy uống hai ly cà phê.','He drank two cups of coffee.']],
  '本':[['我有三本書。','Tôi có ba quyển sách.','I have three books.'],['這本書很好。','Quyển sách này rất hay.','This book is good.']],
  '次':[['請再說一次。','Xin hãy nói lại một lần.','Please say it one more time.'],['我去過臺北三次。','Tôi đã đi Đài Bắc ba lần.','I have been to Taipei three times.']],
  '點(鐘)':[['現在八點。','Bây giờ là tám giờ.','It is eight o’clock now.'],['我九點上課。','Tôi lên lớp lúc chín giờ.','I have class at nine.']],
  '分鐘':[['請等五分鐘。','Xin chờ năm phút.','Please wait five minutes.'],['走路要十分鐘。','Đi bộ mất mười phút.','It takes ten minutes to walk.']],
  '封':[['我寫了一封信。','Tôi viết một bức thư.','I wrote a letter.'],['桌上有兩封信。','Trên bàn có hai bức thư.','There are two letters on the table.']],
  '個':[['我有一個朋友。','Tôi có một người bạn.','I have a friend.'],['這個很好。','Cái này rất tốt.','This one is good.']],
  '號':[['今天是八號。','Hôm nay là ngày mùng tám.','Today is the eighth.'],['你的號碼是多少？','Số của bạn là bao nhiêu?','What is your number?']],
  '間':[['這是一間教室。','Đây là một phòng học.','This is a classroom.'],['我住在這間房。','Tôi sống trong phòng này.','I live in this room.']],
  '件':[['我買了一件衣服。','Tôi mua một chiếc áo/quần áo.','I bought a piece of clothing.'],['這件衣服很好看。','Bộ đồ này rất đẹp.','This piece of clothing looks nice.']],
  '塊':[['這個五十塊。','Cái này năm mươi đồng.','This costs fifty dollars.'],['我吃了一塊蛋糕。','Tôi ăn một miếng bánh kem.','I ate a piece of cake.']],
  '樓':[['我住三樓。','Tôi sống ở tầng ba.','I live on the third floor.'],['教室在二樓。','Phòng học ở tầng hai.','The classroom is on the second floor.']],
  '瓶':[['我要一瓶水。','Tôi muốn một chai nước.','I want a bottle of water.'],['桌上有兩瓶牛奶。','Trên bàn có hai chai sữa.','There are two bottles of milk on the table.']],
  '雙':[['我買了一雙鞋。','Tôi mua một đôi giày.','I bought a pair of shoes.'],['這雙鞋很漂亮。','Đôi giày này rất đẹp.','This pair of shoes is pretty.']],
  '歲':[['我二十歲。','Tôi hai mươi tuổi.','I am twenty years old.'],['你幾歲？','Bạn bao nhiêu tuổi?','How old are you?']],
  '天':[['我去三天。','Tôi đi ba ngày.','I am going for three days.'],['今天是第一天。','Hôm nay là ngày đầu tiên.','Today is the first day.']],
  '碗':[['我吃了一碗飯。','Tôi ăn một bát cơm.','I ate a bowl of rice.'],['我要一碗麵。','Tôi muốn một bát mì.','I want a bowl of noodles.']],
  '位':[['這位是我的老師。','Vị này là giáo viên của tôi.','This person is my teacher.'],['有兩位客人。','Có hai vị khách.','There are two guests.']],
  '張':[['我有一張照片。','Tôi có một tấm ảnh.','I have a photo.'],['請給我一張紙。','Xin cho tôi một tờ giấy.','Please give me a sheet of paper.']],
  '枝':[['我有兩枝筆。','Tôi có hai cây bút.','I have two pens.'],['桌上有一枝筆。','Trên bàn có một cây bút.','There is a pen on the table.']],
  '只':[['我有一隻貓。','Tôi có một con mèo.','I have a cat.'],['那裡有兩隻狗。','Ở đó có hai con chó.','There are two dogs there.']]
};

function generateExamples(w,enMeaning){
  const key=w.traditional, form=primaryForm(w), en=normalizeEnForSentence(enMeaning,w), vi=(w.meaning_vi||key).replace(/\s*\([^)]*\)\s*/g,'').trim();
  if(SPECIAL_EXAMPLES[key])return SPECIAL_EXAMPLES[key].map(x=>({zh:x[0],vi:x[1],en:x[2],source:'generated'}));
  if(w.pos==='M'&&MEASURE_EXAMPLES[key])return MEASURE_EXAMPLES[key].map(x=>({zh:x[0],vi:x[1],en:x[2],source:'generated'}));
  if(w.pos==='Det') return generateDetExamples(w,en);
  if(w.pos==='N') return generateNounExamples(w,form,vi,en);
  if(w.pos==='VA') return generateVerbExamples(w,form,vi,en);
  if(w.pos==='VS') return generateStateExamples(w,form,vi,en);
  return [
    {zh:`我今天學了「${form}」這個詞。`,vi:`Hôm nay tôi học từ “${vi}”.`,en:`Today I learned the word “${en}”.`,source:'generated'},
    {zh:`老師用「${form}」造了一個句子。`,vi:`Giáo viên đã đặt một câu với từ “${vi}”.`,en:`The teacher made a sentence using “${en}”.`,source:'generated'}
  ];
}
function generateDetExamples(w,en){
  const f=primaryForm(w);
  const numberMap={'一':'one','二':'two','兩':'two','三':'three','四':'four','五':'five','六':'six','七':'seven','八':'eight','九':'nine','十':'ten','百':'one hundred','千':'one thousand','半':'half'};
  if(numberMap[f]){
    const n=numberMap[f];
    if(f==='半')return [{zh:'我吃了半個麵包。',vi:'Tôi ăn nửa cái bánh mì.',en:'I ate half a loaf of bread.',source:'generated'},{zh:'還有半小時。',vi:'Còn nửa giờ nữa.',en:'There is half an hour left.',source:'generated'}];
    if(f==='二')return [{zh:'今天是二月二日。',vi:'Hôm nay là ngày 2 tháng 2.',en:'Today is February 2.',source:'generated'},{zh:'我的房間在二樓。',vi:'Phòng của tôi ở tầng hai.',en:'My room is on the second floor.',source:'generated'}];
    if(f==='百')return [{zh:'這本書有一百頁。',vi:'Quyển sách này có một trăm trang.',en:'This book has one hundred pages.',source:'generated'},{zh:'這裡有一百個人。',vi:'Ở đây có một trăm người.',en:'There are one hundred people here.',source:'generated'}];
    if(f==='千')return [{zh:'這個手機一千塊。',vi:'Điện thoại này một nghìn đồng.',en:'This phone costs one thousand dollars.',source:'generated'},{zh:'這裡有一千個人。',vi:'Ở đây có một nghìn người.',en:'There are one thousand people here.',source:'generated'}];
    return [{zh:`我有${f}本書。`,vi:`Tôi có ${w.meaning_vi} quyển sách.`,en:`I have ${n} books.`,source:'generated'},{zh:`桌上有${f}個杯子。`,vi:`Trên bàn có ${w.meaning_vi} cái ly.`,en:`There are ${n} cups on the table.`,source:'generated'}];
  }
  if(f==='幾')return [{zh:'你有幾本書？',vi:'Bạn có mấy quyển sách?',en:'How many books do you have?',source:'generated'},{zh:'現在幾點？',vi:'Bây giờ mấy giờ?',en:'What time is it now?',source:'generated'}];
  if(f==='每')return [{zh:'我每天學中文。',vi:'Mỗi ngày tôi học tiếng Trung.',en:'I study Chinese every day.',source:'generated'},{zh:'每個人都有手機。',vi:'Mỗi người đều có điện thoại.',en:'Everyone has a mobile phone.',source:'generated'}];
  if(f==='什麼')return [{zh:'你叫什麼名字？',vi:'Bạn tên là gì?',en:'What is your name?',source:'generated'},{zh:'你想吃什麼？',vi:'Bạn muốn ăn gì?',en:'What do you want to eat?',source:'generated'}];
  if(f==='那些')return [{zh:'那些是我的書。',vi:'Những thứ đó là sách của tôi.',en:'Those are my books.',source:'generated'},{zh:'我不認識那些人。',vi:'Tôi không quen những người đó.',en:'I do not know those people.',source:'generated'}];
  if(f==='這些')return [{zh:'這些都是我的。',vi:'Những thứ này đều là của tôi.',en:'These are all mine.',source:'generated'},{zh:'我喜歡這些書。',vi:'Tôi thích những quyển sách này.',en:'I like these books.',source:'generated'}];
  if(f==='別的')return [{zh:'我想看別的。',vi:'Tôi muốn xem cái khác.',en:'I want to see something else.',source:'generated'},{zh:'你有別的問題嗎？',vi:'Bạn có câu hỏi khác không?',en:'Do you have another question?',source:'generated'}];
  return [{zh:`我今天學了「${f}」。`,vi:`Hôm nay tôi học “${w.meaning_vi}”.`,en:`Today I learned “${en}”.`,source:'generated'},{zh:`請再看一次「${f}」。`,vi:`Hãy xem lại “${w.meaning_vi}” một lần.`,en:`Look at “${en}” one more time.`,source:'generated'}];
}
function generateNounExamples(w,form,vi,en){
  if(PEOPLE.has(w.traditional))return [{zh:`這是我的${form}。`,vi:`Đây là ${vi} của tôi.`,en:`This is my ${en}.`,source:'generated'},{zh:`我跟${form}一起吃飯。`,vi:`Tôi ăn cơm cùng ${vi}.`,en:`I eat with my ${en}.`,source:'generated'}];
  if(PLACES.has(w.traditional))return [{zh:`我常常去${form}。`,vi:`Tôi thường đi ${vi}.`,en:`I often go to the ${en}.`,source:'generated'},{zh:`${form}在那邊。`,vi:`${capVi(vi)} ở đằng kia.`,en:`The ${en} is over there.`,source:'generated'}];
  if(DRINKS.has(w.traditional))return [{zh:`我喜歡喝${form}。`,vi:`Tôi thích uống ${vi}.`,en:`I like drinking ${en}.`,source:'generated'},{zh:`請給我一杯${form}。`,vi:`Xin cho tôi một ly ${vi}.`,en:`Please give me a cup of ${en}.`,source:'generated'}];
  if(FOODS.has(w.traditional))return [{zh:`我喜歡吃${form}。`,vi:`Tôi thích ăn ${vi}.`,en:`I like eating ${en}.`,source:'generated'},{zh:`這個${form}很好吃。`,vi:`${capVi(vi)} này rất ngon.`,en:`This ${en} tastes good.`,source:'generated'}];
  if(COLORS.has(w.traditional))return [{zh:`我喜歡${form}。`,vi:`Tôi thích ${vi}.`,en:`I like ${en}.`,source:'generated'},{zh:`這件衣服是${form}的。`,vi:`Bộ quần áo này có ${vi}.`,en:`This clothing is ${en}.`,source:'generated'}];
  if(BODY.has(w.traditional))return [{zh:`我的${form}有點痛。`,vi:`${capVi(vi)} của tôi hơi đau.`,en:`My ${en} hurts a little.`,source:'generated'},{zh:`這是我的${form}。`,vi:`Đây là ${vi} của tôi.`,en:`This is my ${en}.`,source:'generated'}];
  if(TRANSPORT.has(w.traditional))return [{zh:`我坐${form}去學校。`,vi:`Tôi đi ${vi} đến trường.`,en:`I take ${en} to school.`,source:'generated'},{zh:`坐${form}很方便。`,vi:`Đi ${vi} rất tiện.`,en:`Taking ${en} is convenient.`,source:'generated'}];
  if(SPORTS.has(w.traditional)){
    const v=form==='足球'?'踢':'打';
    return [{zh:`我喜歡${form}。`,vi:`Tôi thích ${vi}.`,en:`I like ${en}.`,source:'generated'},{zh:`我們一起${v}${form}吧。`,vi:`Chúng ta cùng chơi ${vi} nhé.`,en:`Let\'s play ${en} together.`,source:'generated'}];
  }
  if(SEASONS.has(w.traditional))return [{zh:`我喜歡${form}。`,vi:`Tôi thích ${vi}.`,en:`I like ${en}.`,source:'generated'},{zh:`${form}的天氣很好。`,vi:`Thời tiết ${vi} rất dễ chịu.`,en:`The weather in ${en} is nice.`,source:'generated'}];
  if(DIRECTIONS.has(w.traditional))return [{zh:`請往${form}走。`,vi:`Hãy đi về ${vi}.`,en:`Please go toward the ${en}.`,source:'generated'},{zh:`商店在${form}。`,vi:`Cửa hàng ở ${vi}.`,en:`The store is on the ${en}.`,source:'generated'}];
  const timeSpecial=generateTimeNoun(w,form); if(timeSpecial)return timeSpecial;
  return [{zh:`這是我的${form}。`,vi:`Đây là ${vi} của tôi.`,en:`This is my ${en}.`,source:'generated'},{zh:`${form}在這裡。`,vi:`${capVi(vi)} ở đây.`,en:`The ${en} is here.`,source:'generated'}];
}
function generateTimeNoun(w,form){
  const map={
    '今天':[['今天我有課。','Hôm nay tôi có lớp.','I have class today.'],['今天天氣很好。','Hôm nay thời tiết rất đẹp.','The weather is nice today.']],
    '明天':[['明天我去學校。','Ngày mai tôi đi học.','I am going to school tomorrow.'],['明天見！','Ngày mai gặp nhé!','See you tomorrow!']],
    '昨天':[['昨天我很忙。','Hôm qua tôi rất bận.','I was very busy yesterday.'],['昨天我沒上課。','Hôm qua tôi không lên lớp.','I did not have class yesterday.']],
    '今年':[['今年我在臺灣。','Năm nay tôi ở Đài Loan.','I am in Taiwan this year.'],['今年我想學好中文。','Năm nay tôi muốn học tốt tiếng Trung.','I want to learn Chinese well this year.']],
    '明年':[['明年我想去旅行。','Năm tới tôi muốn đi du lịch.','I want to travel next year.'],['明年見！','Hẹn gặp năm tới!','See you next year!']],
    '去年':[['去年我住在臺北。','Năm ngoái tôi sống ở Đài Bắc.','I lived in Taipei last year.'],['去年我開始學中文。','Năm ngoái tôi bắt đầu học tiếng Trung.','I started learning Chinese last year.']],
    '上午':[['上午我有課。','Buổi sáng tôi có lớp.','I have class in the morning.'],['我們上午見。','Chúng ta gặp nhau buổi sáng.','Let\'s meet in the morning.']],
    '下午':[['下午我去圖書館。','Buổi chiều tôi đi thư viện.','I go to the library in the afternoon.'],['下午三點見。','Gặp lúc ba giờ chiều.','See you at three in the afternoon.']],
    '晚上':[['晚上我在家。','Buổi tối tôi ở nhà.','I am at home in the evening.'],['我晚上十點睡覺。','Tôi ngủ lúc mười giờ tối.','I go to sleep at ten at night.']],
    '早上':[['我早上喝咖啡。','Buổi sáng tôi uống cà phê.','I drink coffee in the morning.'],['早上八點上課。','Tám giờ sáng lên lớp.','Class starts at eight in the morning.']],
    '中午':[['中午我們一起吃飯。','Buổi trưa chúng ta cùng ăn cơm.','We eat together at noon.'],['我中午休息。','Buổi trưa tôi nghỉ ngơi.','I rest at noon.']],
    '週末':[['週末我休息。','Cuối tuần tôi nghỉ ngơi.','I rest on the weekend.'],['週末我們去公園。','Cuối tuần chúng ta đi công viên.','We go to the park on the weekend.']],
    '星期':[['這個星期很忙。','Tuần này rất bận.','This week is busy.'],['下個星期見。','Hẹn gặp tuần sau.','See you next week.']],
    '星期天/星期日':[['星期天我不上課。','Chủ nhật tôi không đi học.','I do not have class on Sunday.'],['星期日我們去公園。','Chủ nhật chúng ta đi công viên.','We go to the park on Sunday.']],
    '時間':[['你有時間嗎？','Bạn có thời gian không?','Do you have time?'],['現在是吃飯時間。','Bây giờ là giờ ăn.','It is time to eat now.']],
    '天氣':[['今天天氣很好。','Hôm nay thời tiết rất đẹp.','The weather is nice today.'],['我喜歡臺灣的天氣。','Tôi thích thời tiết Đài Loan.','I like Taiwan\'s weather.']],
    '月':[['這個月很忙。','Tháng này rất bận.','This month is busy.'],['下個月我去旅行。','Tháng sau tôi đi du lịch.','I will travel next month.']],
    '新年':[['新年快樂！','Chúc mừng năm mới!','Happy New Year!'],['新年我們一起吃飯。','Năm mới chúng ta cùng ăn cơm.','We eat together at New Year.']],
    '雨天':[['雨天要帶傘。','Ngày mưa phải mang ô.','Bring an umbrella on rainy days.'],['雨天我不出去。','Ngày mưa tôi không ra ngoài.','I do not go out on rainy days.']]
  };
  return map[w.traditional]?.map(x=>({zh:x[0],vi:x[1],en:x[2],source:'generated'}))||null;
}

const VERB_SPECIAL = {
  '搬':[['我明天搬家。','Ngày mai tôi chuyển nhà.','I am moving house tomorrow.'],['請幫我搬這個。','Hãy giúp tôi chuyển cái này.','Please help me move this.']],
  '幫':[['你可以幫我嗎？','Bạn có thể giúp tôi không?','Can you help me?'],['我幫媽媽做飯。','Tôi giúp mẹ nấu cơm.','I help my mother cook.']],
  '參加':[['我想參加活動。','Tôi muốn tham gia hoạt động.','I want to join the activity.'],['你參加比賽嗎？','Bạn có tham gia cuộc thi không?','Are you taking part in the competition?']],
  '吃':[['我想吃飯。','Tôi muốn ăn cơm.','I want to eat.'],['你吃什麼？','Bạn ăn gì?','What are you eating?']],
  '吃飯':[['我們一起吃飯吧。','Chúng ta cùng ăn cơm nhé.','Let\'s eat together.'],['我十二點吃飯。','Tôi ăn cơm lúc mười hai giờ.','I eat at twelve.']],
  '穿':[['我今天穿白色衣服。','Hôm nay tôi mặc quần áo trắng.','I am wearing white clothes today.'],['外面很冷，多穿一點。','Bên ngoài lạnh, hãy mặc thêm một chút.','It is cold outside; wear a bit more.']],
  '打':[['我們去打球吧。','Chúng ta đi chơi bóng nhé.','Let\'s go play ball.'],['不要打人。','Đừng đánh người.','Do not hit people.']],
  '打電話':[['我給媽媽打電話。','Tôi gọi điện cho mẹ.','I call my mother.'],['請晚上打電話給我。','Hãy gọi điện cho tôi buổi tối.','Please call me in the evening.']],
  '打開':[['請打開門。','Hãy mở cửa.','Please open the door.'],['我打開電腦。','Tôi mở máy tính.','I turn on the computer.']],
  '到':[['我八點到學校。','Tôi đến trường lúc tám giờ.','I arrive at school at eight.'],['你到了嗎？','Bạn đến chưa?','Have you arrived?']],
  '等':[['我在車站等朋友。','Tôi đợi bạn ở trạm xe.','I wait for my friend at the station.'],['請等一下。','Xin chờ một chút.','Please wait a moment.']],
  '放':[['請把書放在桌子上。','Hãy đặt sách lên bàn.','Please put the book on the table.'],['手機放這裡。','Đặt điện thoại ở đây.','Put the phone here.']],
  '告訴':[['請告訴我你的名字。','Hãy nói cho tôi biết tên bạn.','Please tell me your name.'],['我告訴他時間。','Tôi nói cho anh ấy biết thời gian.','I tell him the time.']],
  '給':[['我給朋友一本書。','Tôi cho bạn một quyển sách.','I give my friend a book.'],['請給我一杯水。','Xin cho tôi một ly nước.','Please give me a cup of water.']],
  '關':[['請關門。','Hãy đóng cửa.','Please close the door.'],['我把電腦關了。','Tôi tắt máy tính rồi.','I turned off the computer.']],
  '寄':[['我去郵局寄信。','Tôi đi bưu điện gửi thư.','I go to the post office to mail a letter.'],['請寄給我。','Hãy gửi cho tôi.','Please send it to me.']],
  '加':[['咖啡裡加一點牛奶。','Thêm một ít sữa vào cà phê.','Add a little milk to the coffee.'],['一加一等於二。','Một cộng một bằng hai.','One plus one equals two.']],
  '見面':[['明天我們見面。','Ngày mai chúng ta gặp nhau.','We will meet tomorrow.'],['我跟朋友在車站見面。','Tôi gặp bạn ở trạm xe.','I meet my friend at the station.']],
  '叫':[['我叫小王。','Tôi tên là Tiểu Vương.','My name is Xiao Wang.'],['大家叫他老師。','Mọi người gọi anh ấy là giáo viên/thầy.','Everyone calls him teacher.']],
  '接':[['我去機場接朋友。','Tôi ra sân bay đón bạn.','I go to the airport to pick up a friend.'],['爸爸來學校接我。','Bố đến trường đón tôi.','My father comes to school to pick me up.']],
  '介紹':[['我介紹我的朋友。','Tôi giới thiệu bạn của tôi.','I introduce my friend.'],['請介紹一下自己。','Hãy giới thiệu bản thân một chút.','Please introduce yourself.']],
  '開':[['我會開車。','Tôi biết lái xe.','I can drive.'],['商店九點開。','Cửa hàng mở lúc chín giờ.','The store opens at nine.']],
  '看':[['我看書。','Tôi đọc/xem sách.','I read a book.'],['晚上我們看電影。','Buổi tối chúng ta xem phim.','We watch a movie in the evening.']],
  '離開':[['我八點離開家。','Tôi rời nhà lúc tám giờ.','I leave home at eight.'],['他已經離開了。','Anh ấy đã rời đi rồi.','He has already left.']],
  '買':[['我去商店買東西。','Tôi đi cửa hàng mua đồ.','I go to the store to buy things.'],['我想買這本書。','Tôi muốn mua quyển sách này.','I want to buy this book.']],
  '賣':[['這家店賣衣服。','Cửa hàng này bán quần áo.','This store sells clothes.'],['他賣咖啡。','Anh ấy bán cà phê.','He sells coffee.']],
  '拿':[['請拿一本書。','Hãy lấy một quyển sách.','Please take a book.'],['我拿手機照相。','Tôi lấy điện thoại chụp ảnh.','I use my phone to take a photo.']],
  '請':[['請坐。','Mời ngồi.','Please sit.'],['請喝茶。','Mời uống trà.','Please have some tea.']],
  '上':[['我上樓。','Tôi lên lầu.','I go upstairs.'],['請上車。','Mời lên xe.','Please get in the vehicle.']],
  '收到':[['我收到你的信了。','Tôi đã nhận được thư của bạn.','I received your letter.'],['你收到照片了嗎？','Bạn nhận được ảnh chưa?','Did you receive the photo?']],
  '送':[['我送朋友一本書。','Tôi tặng bạn một quyển sách.','I give my friend a book as a gift.'],['我送你回家。','Tôi đưa bạn về nhà.','I will see you home.']],
  '聽':[['我喜歡聽音樂。','Tôi thích nghe nhạc.','I like listening to music.'],['請聽老師說。','Hãy nghe giáo viên nói.','Please listen to the teacher.']],
  '問':[['我想問老師一個問題。','Tôi muốn hỏi giáo viên một câu.','I want to ask the teacher a question.'],['你可以問我。','Bạn có thể hỏi tôi.','You can ask me.']],
  '洗':[['我先洗手。','Tôi rửa tay trước.','I wash my hands first.'],['我在洗衣服。','Tôi đang giặt quần áo.','I am washing clothes.']],
  '下':[['我下樓。','Tôi xuống lầu.','I go downstairs.'],['請下車。','Mời xuống xe.','Please get out of the vehicle.']],
  '想':[['我想喝咖啡。','Tôi muốn/uống cà phê.','I want to drink coffee.'],['我想我的家人。','Tôi nhớ gia đình.','I miss my family.']],
  '寫':[['我寫信。','Tôi viết thư.','I write a letter.'],['請寫你的名字。','Hãy viết tên của bạn.','Please write your name.']],
  '寫字':[['我每天寫字。','Mỗi ngày tôi viết chữ.','I write characters every day.'],['老師教我寫字。','Giáo viên dạy tôi viết chữ.','The teacher teaches me to write.']],
  '洗澡':[['我晚上洗澡。','Buổi tối tôi tắm.','I take a shower in the evening.'],['運動以後我洗澡。','Sau khi vận động tôi tắm.','I shower after exercise.']],
  '姓':[['我姓王。','Tôi họ Vương.','My surname is Wang.'],['請問你姓什麼？','Xin hỏi bạn họ gì?','What is your surname?']],
  '學':[['我學中文。','Tôi học tiếng Trung.','I study Chinese.'],['我們一起學吧。','Chúng ta cùng học nhé.','Let\'s study together.']],
  '要':[['我要一杯茶。','Tôi muốn một ly trà.','I want a cup of tea.'],['你要小心。','Bạn phải cẩn thận.','You need to be careful.']],
  '用':[['我用手機照相。','Tôi dùng điện thoại chụp ảnh.','I use my phone to take photos.'],['你可以用我的筆。','Bạn có thể dùng bút của tôi.','You can use my pen.']],
  '有':[['我有一個朋友。','Tôi có một người bạn.','I have a friend.'],['桌上有一本書。','Trên bàn có một quyển sách.','There is a book on the table.']],
  '找':[['我在找手機。','Tôi đang tìm điện thoại.','I am looking for my phone.'],['你找誰？','Bạn tìm ai?','Who are you looking for?']],
  '找到':[['我找到手機了。','Tôi tìm được điện thoại rồi.','I found my phone.'],['你找到書了嗎？','Bạn tìm được sách chưa?','Did you find the book?']],
  '照相':[['我們一起照相吧。','Chúng ta cùng chụp ảnh nhé.','Let\'s take a photo together.'],['我在公園照相。','Tôi chụp ảnh ở công viên.','I take photos in the park.']],
  '住':[['我住在高雄。','Tôi sống ở Cao Hùng.','I live in Kaohsiung.'],['你住哪裡？','Bạn sống ở đâu?','Where do you live?']],
  '坐':[['請坐。','Mời ngồi.','Please sit.'],['我坐公車去學校。','Tôi đi xe buýt đến trường.','I take the bus to school.']],
  '做':[['我在做功課。','Tôi đang làm bài tập.','I am doing homework.'],['你在做什麼？','Bạn đang làm gì?','What are you doing?']],
  '做飯':[['媽媽在做飯。','Mẹ đang nấu cơm.','My mother is cooking.'],['我會做飯。','Tôi biết nấu ăn.','I can cook.']],
  '做完':[['我做完功課了。','Tôi làm xong bài tập rồi.','I finished my homework.'],['做完再休息。','Làm xong rồi hãy nghỉ.','Finish it, then rest.']]
};
function generateVerbExamples(w,form,vi,en){
  if(VERB_SPECIAL[w.traditional])return VERB_SPECIAL[w.traditional].map(x=>({zh:x[0],vi:x[1],en:x[2],source:'generated'}));
  const vEn=verbBase(en),vVi=vi.replace(/^đi\s+/,'đi ');
  return [{zh:`我會${form}。`,vi:`Tôi có thể ${vVi}.`,en:`I can ${vEn}.`,source:'generated'},{zh:`我們一起${form}吧。`,vi:`Chúng ta cùng ${vVi} nhé.`,en:`Let\'s ${vEn} together.`,source:'generated'}];
}

const HUMAN_STATE = new Set(['愛','懂','餓','感冒','高興','健康','累','忙','生病','舒服','痛','有空']);
const PLACE_STATE = new Set(['安靜','吵','乾淨','熱鬧','近','遠','冷','熱']);
const STATE_SPECIAL = {
  '愛':[['我愛我的家人。','Tôi yêu gia đình của tôi.','I love my family.'],['我愛喝咖啡。','Tôi thích uống cà phê.','I love drinking coffee.']],
  '吃飽':[['我吃飽了。','Tôi ăn no rồi.','I am full.'],['你吃飽了嗎？','Bạn ăn no chưa?','Are you full?']],
  '錯':[['這個答案錯了。','Đáp án này sai rồi.','This answer is wrong.'],['對不起，我說錯了。','Xin lỗi, tôi nói sai rồi.','Sorry, I said it wrong.']],
  '懂':[['我懂了。','Tôi hiểu rồi.','I understand now.'],['你聽懂了嗎？','Bạn nghe hiểu chưa?','Did you understand what you heard?']],
  '對':[['你說得對。','Bạn nói đúng.','You are right.'],['這個答案是對的。','Đáp án này đúng.','This answer is correct.']],
  '感冒':[['我感冒了。','Tôi bị cảm rồi.','I have a cold.'],['他感冒了，今天不來。','Anh ấy bị cảm nên hôm nay không đến.','He has a cold and is not coming today.']],
  '好吃':[['這個包子很好吃。','Bánh bao này rất ngon.','This bun is delicious.'],['臺灣的水果很好吃。','Trái cây Đài Loan rất ngon.','Taiwanese fruit is delicious.']],
  '好玩':[['這個遊戲很好玩。','Trò này rất vui.','This game is fun.'],['臺灣很好玩。','Đài Loan rất thú vị để đi chơi.','Taiwan is fun to visit.']],
  '會':[['我會說中文。','Tôi biết nói tiếng Trung.','I can speak Chinese.'],['明天會下雨。','Ngày mai sẽ mưa.','It will rain tomorrow.']],
  '行':[['這樣行嗎？','Như vậy được không?','Is this okay?'],['行，沒問題。','Được, không vấn đề.','Okay, no problem.']],
  '有意思':[['這本書很有意思。','Quyển sách này rất thú vị.','This book is interesting.'],['這個問題很有意思。','Câu hỏi này rất thú vị.','This question is interesting.']],
  '一樣':[['我們的書一樣。','Sách của chúng ta giống nhau.','Our books are the same.'],['這兩個一樣大。','Hai cái này lớn bằng nhau.','These two are the same size.']],
  '重要':[['這個很重要。','Cái này rất quan trọng.','This is very important.'],['學中文很重要。','Học tiếng Trung rất quan trọng.','Learning Chinese is important.']],
  '歡迎':[['歡迎來臺灣。','Chào mừng đến Đài Loan.','Welcome to Taiwan.'],['歡迎你來我家。','Chào mừng bạn đến nhà tôi.','You are welcome to come to my home.']],
  '結束':[['課結束了。','Buổi học kết thúc rồi.','Class has ended.'],['電影九點結束。','Phim kết thúc lúc chín giờ.','The movie ends at nine.']],
  '進步':[['我的中文進步了。','Tiếng Trung của tôi tiến bộ rồi.','My Chinese has improved.'],['你進步很多。','Bạn đã tiến bộ rất nhiều.','You have improved a lot.']],
  '開始':[['我們開始上課吧。','Chúng ta bắt đầu học nhé.','Let\'s start class.'],['電影八點開始。','Phim bắt đầu lúc tám giờ.','The movie starts at eight.']],
  '沒關係':[['對不起。—沒關係。','Xin lỗi. — Không sao.','Sorry. — It\'s okay.'],['沒關係，我可以等。','Không sao, tôi có thể đợi.','It\'s okay; I can wait.']],
  '沒問題':[['明天可以嗎？—沒問題。','Ngày mai được không? — Không vấn đề.','Is tomorrow okay? — No problem.'],['這個沒問題。','Cái này không có vấn đề.','There is no problem with this.']],
  '完':[['功課做完了。','Bài tập đã làm xong rồi.','The homework is finished.'],['電影看完了。','Đã xem xong bộ phim.','I finished watching the movie.']],
  '晚安':[['晚安，明天見。','Ngủ ngon, ngày mai gặp lại.','Good night. See you tomorrow.'],['媽媽說：「晚安！」','Mẹ nói: “Ngủ ngon!”','Mom says, “Good night!”']],
  '忘':[['我忘了帶手機。','Tôi quên mang điện thoại.','I forgot to bring my phone.'],['別忘了帶傘。','Đừng quên mang ô.','Don\'t forget to bring an umbrella.']],
  '喂':[['喂，你好。','A lô, xin chào.','Hello?'],['喂，請問王先生在嗎？','A lô, cho hỏi ông Vương có ở đó không?','Hello, may I speak to Mr. Wang?']],
  '下課':[['我們五點下課。','Chúng tôi tan học lúc năm giờ.','We finish class at five.'],['下課了！','Tan học rồi!','Class is over!']],
  '謝謝':[['謝謝你幫我。','Cảm ơn bạn đã giúp tôi.','Thank you for helping me.'],['謝謝老師。','Cảm ơn giáo viên.','Thank you, teacher.']],
  '知道':[['我知道了。','Tôi biết rồi.','I understand now.'],['你知道他在哪裡嗎？','Bạn biết anh ấy ở đâu không?','Do you know where he is?']],
  '覺得':[['我覺得很好。','Tôi cảm thấy rất tốt.','I think it is very good.'],['你覺得怎麼樣？','Bạn cảm thấy thế nào?','What do you think?']],
  '記得':[['我記得他的名字。','Tôi nhớ tên của anh ấy.','I remember his name.'],['記得帶傘。','Nhớ mang ô nhé.','Remember to bring an umbrella.']],
  '認識':[['我認識他。','Tôi quen anh ấy.','I know him.'],['很高興認識你。','Rất vui được làm quen với bạn.','Nice to meet you.']],
  '喜歡':[['我喜歡咖啡。','Tôi thích cà phê.','I like coffee.'],['你喜歡中文嗎？','Bạn thích tiếng Trung không?','Do you like Chinese?']]
};
function generateStateExamples(w,form,vi,en){
  if(STATE_SPECIAL[w.traditional])return STATE_SPECIAL[w.traditional].map(x=>({zh:x[0],vi:x[1],en:x[2],source:'generated'}));
  if(HUMAN_STATE.has(w.traditional))return [{zh:`我今天很${form}。`,vi:`Hôm nay tôi rất ${vi}.`,en:`I feel very ${en} today.`,source:'generated'},{zh:`他也很${form}。`,vi:`Anh ấy cũng rất ${vi}.`,en:`He is also very ${en}.`,source:'generated'}];
  if(PLACE_STATE.has(w.traditional))return [{zh:`這裡很${form}。`,vi:`Ở đây rất ${vi}.`,en:`It is very ${en} here.`,source:'generated'},{zh:`今天這裡比較${form}。`,vi:`Hôm nay ở đây khá ${vi}.`,en:`It is relatively ${en} here today.`,source:'generated'}];
  return [{zh:`這個很${form}。`,vi:`Cái này rất ${vi}.`,en:`This is very ${en}.`,source:'generated'},{zh:`我覺得它很${form}。`,vi:`Tôi cảm thấy nó rất ${vi}.`,en:`I think it is very ${en}.`,source:'generated'}];
}
function normalizeEnForSentence(en,w){
  let x=String(en||'').replace(/^—\s*/,'').replace(/\([^)]*\)/g,'').split(';')[0].trim();
  if(!x||x===t('englishUnavailable')||x===t('loadingEnglish'))x=w.traditional;
  return x.replace(/^to\s+/,'').replace(/^a\s+/,'').replace(/^an\s+/,'').replace(/^the\s+/,'');
}
function verbBase(en){return String(en||'').split(';')[0].trim().replace(/^to\s+/,'').replace(/^be\s+/,'be ');}
function capVi(s){return s? s.charAt(0).toUpperCase()+s.slice(1):s;}

function buildPinyinMap(){
  state.pinyinMap.clear();
  const staticMap={
    '我':'wǒ','你':'nǐ','他':'tā','她':'tā','我們':'wǒmen','你們':'nǐmen','這':'zhè','這個':'zhège','這裡':'zhèlǐ','那裡':'nàlǐ','那邊':'nàbiān','是':'shì','的':'de','很':'hěn','比較':'bǐjiào','也':'yě','都':'dōu','在':'zài','有':'yǒu','沒有':'méiyǒu','一起':'yìqǐ','喜歡':'xǐhuān','想':'xiǎng','會':'huì','可以':'kěyǐ','請':'qǐng','再':'zài','先':'xiān','去':'qù','來':'lái','走':'zǒu','吃':'chī','喝':'hē','看':'kàn','說':'shuō','學':'xué','寫':'xiě','買':'mǎi','給':'gěi','打':'dǎ','踢':'tī','坐':'zuò','放':'fàng','拿':'ná','等':'děng','問':'wèn','知道':'zhīdào','覺得':'juédé','老師':'lǎoshī','朋友':'péngyǒu','媽媽':'māma','爸爸':'bàba','學校':'xuéxiào','公園':'gōngyuán','圖書館':'túshūguǎn','車站':'chēzhàn','商店':'shāngdiàn','銀行':'yínháng','桌子':'zhuōzi','書':'shū','手機':'shǒujī','衣服':'yīfú','咖啡':'kāfēi','茶':'chá','水':'shuǐ','牛奶':'niúnǎi','飯':'fàn','麵包':'miànbāo','水果':'shuǐguǒ','門':'mén','中文':'zhōngwén','臺灣':'Táiwān','臺北':'Táiběi','高雄':'Gāoxióng','今天':'jīntiān','明天':'míngtiān','昨天':'zuótiān','晚上':'wǎnshàng','早上':'zǎoshàng','上午':'shàngwǔ','下午':'xiàwǔ','中午':'zhōngwǔ','現在':'xiànzài','八點':'bā diǎn','九點':'jiǔ diǎn','十點':'shí diǎn','十二點':'shí\'èr diǎn','一':'yī','二':'èr','兩':'liǎng','三':'sān','四':'sì','五':'wǔ','六':'liù','七':'qī','八':'bā','九':'jiǔ','十':'shí','百':'bǎi','千':'qiān','本':'běn','個':'gè','杯':'bēi','件':'jiàn','張':'zhāng','隻':'zhī','了':'le','嗎':'ma','吧':'ba','呢':'ne','又':'yòu','因為':'yīnwèi','所以':'suǒyǐ','可是':'kěshì','還是':'háishì','跟':'gēn','和':'hé','比':'bǐ','把':'bǎ','被':'bèi','從':'cóng','往':'wǎng','多少':'duōshǎo','什麼':'shénme','哪裡':'nǎlǐ','為什麼':'wèishénme','怎麼':'zěnme','怎麼樣':'zěnmeyàng','怎麼辦':'zěnme bàn','對不起':'duìbùqǐ','不好意思':'bùhǎoyìsi','下雨':'xiàyǔ','天氣':'tiānqì','好':'hǎo','太':'tài','快':'kuài','慢':'màn','小心':'xiǎoxīn',
    '它':'tā','桌':'zhuō','桌上':'zhuōshàng','詞':'cí','造':'zào','句':'jù','句子':'jùzi','子':'zi','見':'jiàn','帶':'dài','別':'bié','客':'kè','客氣':'kèqì','遲':'chí','答':'dá','案':'àn','答案':"dá'àn",'王':'Wáng','鞋':'xié','那':'nà','還':'hái','氣':'qì','跑':'pǎo','遊':'yóu','戲':'xì','遊戲':'yóuxì','裡':'lǐ','於':'yú','房':'fáng','店':'diàn','麵':'miàn','教':'jiāo','樣':'yàng','這樣':'zhèyàng','字':'zì','讀':'dú','公':'gōng','日':'rì','頁':'yè','路':'lù','馬路':'mǎlù','人':'rén','樓':'lóu'
  };
  Object.entries(staticMap).forEach(([k,v])=>state.pinyinMap.set(k,v));
  state.allWords.forEach(w=>candidateForms(w).forEach(f=>state.pinyinMap.set(f,w.pinyin.replace(/[()]/g,''))));
  if(state.activeLevel==='A1')Object.entries(INFERRED_FORMS).forEach(([id,form])=>{const w=state.allWords.find(x=>String(x.id)===id);if(w)state.pinyinMap.set(form,w.pinyin);});
}
function sentencePinyin(sentence,w){
  const text=String(sentence||''); const keys=[...state.pinyinMap.keys()].sort((a,b)=>b.length-a.length); let i=0,out=[];
  while(i<text.length){
    const ch=text[i]; if(/[，。！？；：、,.!?“”「」—\s]/.test(ch)){out.push(ch);i++;continue;}
    let matched=''; for(const k of keys){if(text.startsWith(k,i)){matched=k;break;}}
    if(matched){out.push(state.pinyinMap.get(matched));i+=matched.length;}else{out.push(ch);i++;}
  }
  return out.join(' ').replace(/\s+([，。！？；：、,.!?])/g,'$1').replace(/([“「])\s+/g,'$1').replace(/\s+([”」])/g,'$1').replace(/\s+/g,' ').trim();
}

function bindStudyControls(){
  $('speakBtn').addEventListener('click',()=>speak(primaryForm(currentWord()),.92));
  $('slowBtn').addEventListener('click',()=>speak(primaryForm(currentWord()),.58));
  $('togglePinyinBtn').addEventListener('click',()=>{state.pinyinVisible=!state.pinyinVisible;renderCurrentWord();});
  $('prevBtn').addEventListener('click',()=>{state.index=(state.index-1+state.dayWords.length)%state.dayWords.length;renderCurrentWord();});
  $('nextBtn').addEventListener('click',()=>{state.index=(state.index+1)%state.dayWords.length;renderCurrentWord();});
  $('favoriteBtn').addEventListener('click',()=>{const id=currentWord().id;state.favorites.has(id)?state.favorites.delete(id):state.favorites.add(id);saveLocalState();renderCurrentWord();});
  document.querySelectorAll('[data-memory]').forEach(btn=>btn.addEventListener('click',()=>{const w=currentWord();state.progress[w.id]={...(state.progress[w.id]||{}),memory:btn.dataset.memory,reviewedAt:new Date().toISOString()};saveLocalState();renderMemoryButtons(w);}));
}
function renderMemoryButtons(w){const value=state.progress[w.id]?.memory||'';document.querySelectorAll('[data-memory]').forEach(btn=>btn.classList.toggle('is-selected',btn.dataset.memory===value));}
function speak(text,rate=1){if(!('speechSynthesis'in window)){alert('Speech synthesis is not supported.');return;}speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='zh-TW';u.rate=rate;const voices=speechSynthesis.getVoices();const voice=voices.find(v=>v.lang?.toLowerCase()==='zh-tw')||voices.find(v=>v.lang?.toLowerCase().startsWith('zh'));if(voice)u.voice=voice;speechSynthesis.speak(u);}

function bindRecorder(){
  $('recordBtn').addEventListener('click',startRecording);
  $('stopRecordBtn').addEventListener('click',stopRecording);
  $('playRecordBtn').addEventListener('click',()=>{const a=$('recordingAudio');a.currentTime=0;a.play();});
  $('checkPronunciationBtn').addEventListener('click',checkPronunciationGroq);
  $('checkPronunciationBtn').disabled=false;
}
function preferredRecorderMime(){
  const choices=['audio/webm;codecs=opus','audio/webm','audio/mp4','audio/ogg;codecs=opus'];
  return choices.find(type=>window.MediaRecorder?.isTypeSupported?.(type))||'';
}
async function startRecording(){
  if(!navigator.mediaDevices?.getUserMedia||!window.MediaRecorder){$('recordStatus').textContent=t('recorderUnsupported');return;}
  try{
    resetPronunciationResult(); cleanupRecordingStream();
    state.stream=await navigator.mediaDevices.getUserMedia({audio:true});
    state.recordedChunks=[];
    const mime=preferredRecorderMime();
    const recorder=mime?new MediaRecorder(state.stream,{mimeType:mime}):new MediaRecorder(state.stream);
    state.mediaRecorder=recorder;
    recorder.addEventListener('dataavailable',e=>{if(e.data?.size)state.recordedChunks.push(e.data);});
    recorder.addEventListener('stop',finalizeRecording);
    recorder.start();
    $('recordBtn').disabled=true;$('stopRecordBtn').disabled=false;$('playRecordBtn').disabled=true;$('checkPronunciationBtn').disabled=true;
    $('recordStatus').textContent=t('recording');
  }catch(err){console.error(err);$('recordStatus').textContent=t('micDenied');}
}
function stopRecording(){if(state.mediaRecorder?.state==='recording')state.mediaRecorder.stop();}
function finalizeRecording(){
  if(state.recordingUrl)URL.revokeObjectURL(state.recordingUrl);
  const type=state.mediaRecorder?.mimeType||state.recordedChunks[0]?.type||'audio/webm';
  const blob=new Blob(state.recordedChunks,{type});
  state.recordingUrl=URL.createObjectURL(blob);
  const audio=$('recordingAudio');audio.src=state.recordingUrl;audio.hidden=false;
  $('recordBtn').disabled=false;$('stopRecordBtn').disabled=true;$('playRecordBtn').disabled=false;$('checkPronunciationBtn').disabled=false;
  cleanupRecordingStream();$('recordStatus').textContent=t('recordDone');
}
function cleanupRecordingStream(){if(state.stream)state.stream.getTracks().forEach(t=>t.stop());state.stream=null;}
function resetRecordingForNewWord(){
  if(state.mediaRecorder?.state==='recording')state.mediaRecorder.stop();
  cleanupRecordingStream();state.groqRecognitionRunning=false;
  if(state.recordingUrl)URL.revokeObjectURL(state.recordingUrl);state.recordingUrl=null;state.recordedChunks=[];
  const audio=$('recordingAudio');audio.hidden=true;audio.removeAttribute('src');audio.load();
  $('recordBtn').disabled=false;$('stopRecordBtn').disabled=true;$('playRecordBtn').disabled=true;$('checkPronunciationBtn').disabled=false;
  $('recordStatus').textContent=t('recordIdle');resetPronunciationResult();
}
function resetPronunciationResult(){
  $('pronunciationResult').hidden=true;$('pronunciationScore').textContent='—';$('recognizedText').textContent='';$('pronunciationFeedback').textContent='';
  if($('azureScoreGrid'))$('azureScoreGrid').hidden=true;
  ['accuracyScore','fluencyScore','completenessScore'].forEach(id=>{if($(id))$(id).textContent='—';});
}
function setGroqRecognitionBusy(busy){
  state.groqRecognitionRunning=busy;
  const recording=state.mediaRecorder?.state==='recording';
  $('checkPronunciationBtn').disabled=Boolean(busy||recording);
}
function showGroqFailure(messageKey,messageOverride=''){
  const w=currentWord();$('pronunciationResult').hidden=false;$('pronunciationScore').textContent='—';
  $('pronunciationTarget').textContent=`${primaryForm(w)} · ${w.pinyin}`;$('recognizedText').textContent='—';
  if($('azureScoreGrid'))$('azureScoreGrid').hidden=true;
  $('pronunciationFeedback').textContent=messageOverride||t(messageKey);
}
async function capturePronunciationClip(durationMs=3500){
  if(!navigator.mediaDevices?.getUserMedia||!window.MediaRecorder)throw Object.assign(new Error(t('speechUnsupported')),{code:'RECORDER_UNSUPPORTED'});
  let stream=null,recorder=null,timer=null;
  try{
    stream=await navigator.mediaDevices.getUserMedia({audio:true});
    const mime=preferredRecorderMime();
    recorder=mime?new MediaRecorder(stream,{mimeType:mime}):new MediaRecorder(stream);
    const chunks=[];
    const done=new Promise((resolve,reject)=>{
      recorder.addEventListener('dataavailable',e=>{if(e.data?.size)chunks.push(e.data);});
      recorder.addEventListener('error',e=>reject(e.error||new Error('Recorder error')),{once:true});
      recorder.addEventListener('stop',()=>{
        const type=recorder.mimeType||chunks[0]?.type||mime||'audio/webm';
        const blob=new Blob(chunks,{type});
        blob.size?resolve(blob):reject(Object.assign(new Error(t('speechNoSpeech')),{code:'EMPTY_AUDIO'}));
      },{once:true});
    });
    recorder.start(250);
    timer=setTimeout(()=>{if(recorder?.state==='recording')recorder.stop();},durationMs);
    return await done;
  }catch(err){
    if(err?.name==='NotAllowedError'||err?.name==='PermissionDeniedError')throw Object.assign(new Error(t('speechPermissionDenied')),{code:'MIC_PERMISSION'});
    throw err;
  }finally{
    if(timer)clearTimeout(timer);
    if(recorder?.state==='recording')try{recorder.stop();}catch{}
    stream?.getTracks?.().forEach(track=>track.stop());
  }
}
async function checkPronunciationGroq(){
  resetPronunciationResult();
  if(state.groqRecognitionRunning)return;
  if(!window.TOCFLAuth?.getSession?.()?.user){$('recordStatus').textContent=t('groqLoginRequired');showGroqFailure('groqLoginRequired');window.TOCFLAuth?.openAuth?.('login');return;}
  if(!window.TOCFLAuth?.transcribeWithGroq){$('recordStatus').textContent=t('speechGenericError');showGroqFailure('speechGenericError');return;}
  try{
    setGroqRecognitionBusy(true);
    const audio=$('recordingAudio');if(audio&&!audio.paused)audio.pause();if('speechSynthesis'in window)try{speechSynthesis.cancel();}catch{}
    $('recordStatus').textContent=t('speechListening');
    const w=currentWord(),target=primaryForm(w);
    const clip=await capturePronunciationClip(3500);
    $('recordStatus').textContent='🤖 AI đang nhận dạng…';
    const result=await window.TOCFLAuth.transcribeWithGroq(clip,target);
    const recognized=String(result?.text||'').trim();
    if(!recognized)throw Object.assign(new Error(t('noRecognition')),{code:'NO_TRANSCRIPT'});
    renderGroqPronunciationResult(w,recognized);
    $('recordStatus').textContent=t('recognitionDone');
  }catch(err){
    console.warn('Groq pronunciation:',err);
    const code=String(err?.code||'');
    let key='speechGenericError';
    if(code==='NOT_CONNECTED')key='groqNotConnected'; else if(code==='NOT_SIGNED_IN')key='groqLoginRequired'; else if(code==='MIC_PERMISSION')key='speechPermissionDenied'; else if(code==='NO_TRANSCRIPT'||code==='EMPTY_AUDIO')key='noRecognition';
    $('recordStatus').textContent=err?.message||t(key);showGroqFailure(key,err?.message||'');
  }finally{setGroqRecognitionBusy(false);}
}
function renderGroqPronunciationResult(w,recognized){
  const target=primaryForm(w),a=normalizeChinese(target),b=normalizeChinese(recognized);
  const score=Math.max(0,Math.min(100,Math.round(similarity(a,b)*100)));
  $('pronunciationResult').hidden=false;$('pronunciationScore').textContent=String(score);
  $('pronunciationTarget').textContent=`${target} · ${w.pinyin}`;$('recognizedText').textContent=recognized||'—';
  if($('azureScoreGrid'))$('azureScoreGrid').hidden=true;
  $('pronunciationFeedback').textContent=score>=95?t('feedbackExcellent'):score>=60?t('feedbackGood'):t('feedbackRetry');
  state.progress[w.id]={...(state.progress[w.id]||{}),lastPronunciationScore:score,lastRecognized:recognized,pronunciationProvider:'groq-whisper-large-v3',pronunciationCheckedAt:new Date().toISOString()};
  saveLocalState();
}
function normalizeChinese(s){return String(s||'').normalize('NFKC').replace(/[\s，。！？,.!?;；:：、'"“”‘’()（）/]/g,'').toLowerCase();}
function similarity(a,b){if(!a&&!b)return 1;if(!a||!b)return 0;const d=levenshtein(a,b);return 1-d/Math.max(a.length,b.length);}
function levenshtein(a,b){const prev=Array.from({length:b.length+1},(_,i)=>i),cur=new Array(b.length+1);for(let i=1;i<=a.length;i++){cur[0]=i;for(let j=1;j<=b.length;j++)cur[j]=Math.min(cur[j-1]+1,prev[j]+1,prev[j-1]+(a[i-1]===b[j-1]?0:1));for(let j=0;j<=b.length;j++)prev[j]=cur[j];}return prev[b.length];}

let writingCanvases=[];
function bindCanvas(){
  $('clearCanvasBtn').addEventListener('click',clearWritingCanvas);
  $('showGuideCheckbox').addEventListener('change',e=>{
    document.querySelectorAll('#writingGrid .trace-char').forEach(el=>{el.style.display=e.target.checked?'flex':'none';});
  });
  window.addEventListener('resize',()=>writingCanvases.forEach(resizeWritingCanvas));
}
function writingCharacters(word){
  const raw=primaryForm(word);
  const chars=Array.from(raw).filter(ch=>/[\u3400-\u9FFF\uF900-\uFAFF]/.test(ch));
  return chars.length?chars:Array.from(raw);
}
function renderWritingBoxes(word){
  const grid=$('writingGrid'); if(!grid)return;
  grid.innerHTML=''; writingCanvases=[];
  const chars=writingCharacters(word);
  const label=$('writingWordLabel'); if(label)label.textContent=chars.join('');
  chars.forEach((ch,idx)=>{
    const square=document.createElement('div'); square.className='writing-square';
    const lines=document.createElement('div'); lines.className='grid-lines'; lines.setAttribute('aria-hidden','true');
    const guide=document.createElement('div'); guide.className='trace-char'; guide.textContent=ch;
    guide.style.display=$('showGuideCheckbox').checked?'flex':'none';
    const canvas=document.createElement('canvas'); canvas.className='writing-canvas'; canvas.setAttribute('aria-label',`Luyện viết chữ ${ch}, ô ${idx+1}`);
    square.append(lines,guide,canvas); grid.append(square);
    const ctx=canvas.getContext('2d');
    const item={canvas,ctx,dpr:1,drawing:false,lastPoint:[0,0],baseLineWidth:6,pointerId:null}; writingCanvases.push(item);
    resizeWritingCanvas(item);

    // Safari/iPad: do not let a Pencil/finger stroke turn into text selection,
    // long-press callout, drag, or page scrolling while the pointer is inside the canvas.
    const stopBrowserGesture=e=>{if(e.cancelable)e.preventDefault();};
    ['contextmenu','selectstart','dragstart'].forEach(name=>{
      square.addEventListener(name,e=>e.preventDefault());
      canvas.addEventListener(name,e=>e.preventDefault());
    });

    canvas.addEventListener('pointerdown',e=>{
      if(e.pointerType==='mouse' && e.button!==0)return;
      stopBrowserGesture(e);
      item.drawing=true; item.pointerId=e.pointerId;
      try{canvas.setPointerCapture(e.pointerId);}catch{}
      item.lastPoint=writingCanvasPoint(item,e);
      // Draw a tiny dot so a tap / very short stroke is visible.
      item.ctx.save();
      item.ctx.lineWidth=writingLineWidth(item,e);
      item.ctx.beginPath();
      item.ctx.arc(item.lastPoint[0],item.lastPoint[1],Math.max(1,item.ctx.lineWidth/2),0,Math.PI*2);
      item.ctx.fillStyle=item.ctx.strokeStyle; item.ctx.fill();
      item.ctx.restore();
    },{passive:false});

    canvas.addEventListener('pointermove',e=>{
      if(!item.drawing || (item.pointerId!==null && e.pointerId!==item.pointerId))return;
      stopBrowserGesture(e);
      const samples=typeof e.getCoalescedEvents==='function' ? e.getCoalescedEvents() : [e];
      for(const pe of samples){
        const [x,y]=writingCanvasPoint(item,pe);
        item.ctx.lineWidth=writingLineWidth(item,pe);
        item.ctx.beginPath();
        item.ctx.moveTo(item.lastPoint[0],item.lastPoint[1]);
        item.ctx.lineTo(x,y);
        item.ctx.stroke();
        item.lastPoint=[x,y];
      }
    },{passive:false});

    const finishStroke=e=>{
      if(e && e.pointerId!==undefined && item.pointerId!==null && e.pointerId!==item.pointerId)return;
      if(e)stopBrowserGesture(e);
      item.drawing=false; item.pointerId=null;
    };
    ['pointerup','pointercancel'].forEach(name=>canvas.addEventListener(name,finishStroke,{passive:false}));
    canvas.addEventListener('lostpointercapture',()=>{item.drawing=false;item.pointerId=null;});
  });
}
function resizeWritingCanvas(item){
  if(!item?.canvas||!item.ctx)return;
  const r=item.canvas.getBoundingClientRect(); if(!r.width||!r.height)return;
  const old=item.canvas.toDataURL();
  item.dpr=Math.max(1,Math.min(devicePixelRatio||1,2)); item.canvas.width=Math.round(r.width*item.dpr); item.canvas.height=Math.round(r.height*item.dpr);
  item.ctx.setTransform(item.dpr,0,0,item.dpr,0,0); item.ctx.lineCap='round'; item.ctx.lineJoin='round'; item.baseLineWidth=Math.max(4,r.width/55); item.ctx.lineWidth=item.baseLineWidth; item.ctx.strokeStyle='#152321';
  if(old && !old.endsWith('AAAA')){
    const img=new Image(); img.onload=()=>{item.ctx.drawImage(img,0,0,r.width,r.height);}; img.src=old;
  }
}
function writingCanvasPoint(item,e){const r=item.canvas.getBoundingClientRect();return[e.clientX-r.left,e.clientY-r.top];}
function writingLineWidth(item,e){
  const base=item.baseLineWidth||6;
  // Apple Pencil exposes pressure on supported Safari versions. Keep the variation gentle.
  if(e?.pointerType==='pen' && Number.isFinite(e.pressure) && e.pressure>0)return base*(0.72+Math.min(1,e.pressure)*0.55);
  return base;
}
function clearWritingCanvas(){
  writingCanvases.forEach(item=>{
    const r=item.canvas.getBoundingClientRect(); item.ctx.clearRect(0,0,r.width,r.height);
  });
}

function updateBranding(){
  const id=state.activeLevel||'A1';
  const h1=document.getElementById('appTitle'); if(h1) h1.textContent=`TOCFL ${id}`;
  const btn=document.getElementById('levelBtnLabel'); if(btn) btn.textContent=id;
  const eyebrow=document.getElementById('appEyebrow'); if(eyebrow) eyebrow.textContent='🇹🇼 TOCFL · Traditional Chinese';
  const authEyebrow=document.getElementById('authEyebrow'); if(authEyebrow) authEyebrow.textContent='TOCFL · CLOUD';
  document.title=`TOCFL ${id} · Traditional Chinese`;
}

function renderLevelSelector(){
  const modal=$('levelModal'); if(!modal) return;
  const tx=levelText();
  $('levelModalTitle').textContent=tx.title;
  $('levelModalSubtitle').textContent=tx.subtitle;
  $('rememberLevelText').textContent=tx.remember;
  $('rememberLevelHint').textContent=tx.rememberHint;
  $('levelCloseBtn').title=tx.close;
  $('rememberLevelCheckbox').checked=Boolean(state.rememberLevel);
  const grid=$('levelGrid'); grid.innerHTML='';
  for(const cfg of LEVEL_CATALOG){
    const info=state.levelAvailability[cfg.id]||{status:cfg.id===state.activeLevel&&state.allWords.length?'available':'loading',count:cfg.id===state.activeLevel?state.allWords.length:0};
    const available=info.status==='available';
    const card=document.createElement('button'); card.type='button'; card.className='level-option'; card.disabled=!available; card.dataset.level=cfg.id;
    if(cfg.id===state.activeLevel) card.classList.add('is-current');
    const top=document.createElement('div'); top.className='level-option-top';
    const code=document.createElement('strong'); code.className='level-code'; code.textContent=cfg.id;
    const badge=document.createElement('span'); badge.className=`level-status ${available?'ready':info.status==='loading'?'loading':'soon'}`;
    badge.textContent=available?tx.available:info.status==='loading'?tx.loading:tx.coming;
    top.append(code,badge);
    const desc=document.createElement('div'); desc.className='level-description'; desc.textContent=tx.descriptions[cfg.id]||cfg.id;
    const meta=document.createElement('div'); meta.className='level-meta'; meta.textContent=available?(Number(info.count)>0?tx.words(info.count):cfg.base.replace('./','')):`${cfg.base.replace('./','')} · ${tx.coming}`;
    const action=document.createElement('div'); action.className='level-action'; action.textContent=available?tx.choose:tx.coming;
    card.append(top,desc,meta,action);
    card.addEventListener('click',async()=>{
      const remember=Boolean($('rememberLevelCheckbox')?.checked); state.rememberLevel=remember;
      const ok=await applyLevel(cfg.id,{notify:true,close:true});
      if(ok){
        if(!remember && state.currentUserId) sessionStorage.setItem(`tocfl-level-picked-session:${state.currentUserId}`,'1');
        persistMultiState();
      }
    });
    grid.append(card);
  }
}

function openLevelSelector({force=true}={}){
  const modal=$('levelModal'); if(!modal) return;
  if(!force && state.rememberLevel) return;
  modal.hidden=false; document.body.classList.add('modal-open'); renderLevelSelector();
  void probeAllLevels({force:true});
}
function closeLevelSelector(){
  const modal=$('levelModal'); if(!modal) return; modal.hidden=true;
  if($('authModal')?.hidden!==false) document.body.classList.remove('modal-open');
}
function bindLevelSelector(){
  $('levelBtn')?.addEventListener('click',()=>openLevelSelector({force:true}));
  $('levelCloseBtn')?.addEventListener('click',closeLevelSelector);
  $('levelModal')?.addEventListener('click',e=>{if(e.target===$('levelModal'))closeLevelSelector();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape' && $('levelModal')?.hidden===false)closeLevelSelector();});
}
async function afterAccountReady(userId){
  state.currentUserId=String(userId||'');
  if(state.rememberLevel){
    if(state.activeLevel && state.activeLevel!=='A1') await applyLevel(state.activeLevel,{notify:false,close:false});
    return;
  }
  const key=state.currentUserId?`tocfl-level-picked-session:${state.currentUserId}`:'';
  if(!key || !sessionStorage.getItem(key)) openLevelSelector({force:false});
}
function onSignedOut(){ state.currentUserId=null; closeLevelSelector(); }

function bindNavigation(){document.querySelectorAll('.tab').forEach(btn=>btn.addEventListener('click',()=>showView(btn.dataset.view)));}
function showView(name){document.querySelectorAll('.tab').forEach(x=>x.classList.toggle('is-active',x.dataset.view===name));document.querySelectorAll('.view').forEach(x=>x.classList.toggle('is-active',x.id===`view-${name}`));if(name==='progress')updateProgressUI();if(name==='quiz')makeQuiz();if(name==='vocab')renderVocabList();window.scrollTo({top:0,behavior:'smooth'});}
function bindVocab(){$('vocabSearch').addEventListener('input',renderVocabList);}
function renderVocabList(){
  const wrap=$('vocabList');if(!wrap||!state.allWords.length)return;const q=$('vocabSearch').value.trim().toLowerCase(),day=$('vocabDayFilter').value;
  const filtered=state.allWords.filter(w=>{if(day!=='all'&&String(w.day)!==day)return false;if(!q)return true;return[w.traditional,w.pinyin,w.meaning_vi,englishFor(w)].some(v=>String(v||'').toLowerCase().includes(q));});
  wrap.innerHTML='';filtered.forEach(w=>{const b=document.createElement('button');b.type='button';b.className='vocab-item';const h=document.createElement('div');h.className='vocab-hanzi';h.textContent=w.traditional;const info=document.createElement('div');info.className='vocab-info';const strong=document.createElement('strong');strong.textContent=w.pinyin;const span=document.createElement('span');span.textContent=state.lang==='en'?englishFor(w):w.meaning_vi;info.append(strong,span);const badge=document.createElement('div');badge.className='badge';badge.textContent=`D${w.day}`;b.append(h,info,badge);b.addEventListener('click',()=>{selectDay(Number(w.day));const idx=state.dayWords.findIndex(x=>x.id===w.id);if(idx>=0)state.index=idx;renderCurrentWord();showView('today');});wrap.append(b);});if(!filtered.length)wrap.innerHTML=`<div class="muted">${escapeHtml(t('noVocab'))}</div>`;
}

function bindQuiz(){$('newQuizBtn').addEventListener('click',makeQuiz);}
function makeQuiz(){
  if(!state.dayWords.length)return;const correct=state.dayWords[Math.floor(Math.random()*state.dayWords.length)];let types=['vi','pinyin'];if(state.englishDefs[String(correct.id)]||state.enrich[String(correct.id)]?.meaning_en||a1EnglishOverride(correct))types.push('en');const type=types[Math.floor(Math.random()*types.length)];
  $('quizQuestion').textContent=type==='vi'?t('quizMeaning',correct.traditional):type==='en'?t('quizEnglish',correct.traditional):t('quizPinyin',correct.traditional);
  const others=state.dayWords.filter(w=>w.id!==correct.id).sort(()=>Math.random()-.5).slice(0,3),options=[correct,...others].sort(()=>Math.random()-.5);const wrap=$('quizOptions');wrap.innerHTML='';$('quizResult').textContent='';
  options.forEach(w=>{const b=document.createElement('button');b.type='button';b.className='quiz-option';b.textContent=type==='vi'?w.meaning_vi:type==='en'?englishFor(w):w.pinyin;b.addEventListener('click',()=>{const ok=w.id===correct.id;const ans=type==='vi'?correct.meaning_vi:type==='en'?englishFor(correct):correct.pinyin;$('quizResult').textContent=ok?t('correct'):t('answer',ans);if(ok){state.progress[correct.id]={...(state.progress[correct.id]||{}),quizCorrect:(state.progress[correct.id]?.quizCorrect||0)+1};saveLocalState();}});wrap.append(b);});
}
function updateProgressUI(){const entries=Object.values(state.progress).filter(x=>x.memory),count=x=>entries.filter(e=>e.memory===x).length;$('statReviewed').textContent=entries.length;$('statEasy').textContent=count('easy');$('statMedium').textContent=count('medium');$('statHard').textContent=count('hard');const dayReviewed=state.dayWords.filter(w=>state.progress[w.id]?.memory).length,total=state.dayWords.length||1,pct=Math.round(dayReviewed/total*100);$('dailyProgressBar').style.width=`${pct}%`;$('dailyProgressText').textContent=`${dayReviewed} / ${state.dayWords.length}`;$('dailyTargetLabel').textContent=t('newWords',state.dayWords.length);}

function bindBackup(){
  $('exportBtn').addEventListener('click',exportProgress); $('importInput').addEventListener('change',importProgress);
  $('resetBtn').addEventListener('click',()=>{
    if(!confirm(t('resetConfirm')))return;
    for(const cfg of LEVEL_CATALOG) state.levelStates[cfg.id]=emptyLevelState();
    state.progress={}; state.favorites=new Set(); state.day=1; persistMultiState();
    selectDay(1,{notify:false}); document.dispatchEvent(new CustomEvent('tocfl:state-changed'));
    $('backupStatus').textContent=t('resetDone');
  });
}
function exportProgress(){
  saveCurrentLevelSnapshot(); persistMultiState();
  const data={version:3,format:'tocfl-multilevel-v1',exportedAt:new Date().toISOString(),levels:state.levelStates,settings:{activeLevel:state.activeLevel,rememberLevel:state.rememberLevel},language:state.lang};
  const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');
  a.href=url;a.download=`tocfl-all-levels-progress-${new Date().toISOString().slice(0,10)}.json`;a.click();URL.revokeObjectURL(url);$('backupStatus').textContent=t('exportDone');
}
async function importProgress(e){
  const file=e.target.files?.[0]; if(!file)return;
  try{
    const data=JSON.parse(await file.text());
    if(data.format==='tocfl-multilevel-v1' && data.levels){
      state.levelStates={}; for(const [id,value] of Object.entries(data.levels)) if(levelConfig(id)) state.levelStates[id]=normalizeLevelState(value);
      if(!state.levelStates.A1) state.levelStates.A1=emptyLevelState();
      state.rememberLevel=Boolean(data.settings?.rememberLevel); const wanted=levelConfig(data.settings?.activeLevel)?data.settings.activeLevel:'A1';
      if(I18N[data.language]){state.lang=data.language;localStorage.setItem(LANGUAGE_KEY,state.lang);}
      await applyLevel(wanted,{notify:false,close:false}); persistMultiState(); document.dispatchEvent(new CustomEvent('tocfl:state-changed'));
    }else if(data.progress && typeof data.progress==='object'){
      state.levelStates.A1=normalizeLevelState({progress:data.progress,favorites:Array.isArray(data.favorites)?data.favorites:[],lastDay:data.lastDay||1});
      if(I18N[data.language]){state.lang=data.language;localStorage.setItem(LANGUAGE_KEY,state.lang);}
      await applyLevel('A1',{notify:false,close:false}); persistMultiState(); document.dispatchEvent(new CustomEvent('tocfl:state-changed'));
    }else throw new Error(t('invalidFile'));
    applyLanguage(); $('backupStatus').textContent=t('importDone');
  }catch(err){$('backupStatus').textContent=`Error: ${err.message}`;} e.target.value='';
}

function registerServiceWorker(){if('serviceWorker'in navigator)navigator.serviceWorker.register('./sw.js').catch(err=>console.warn('SW:',err));}
function escapeHtml(s){return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
function getCloudState(){
  saveCurrentLevelSnapshot(); persistMultiState();
  const levels={}; for(const cfg of LEVEL_CATALOG) if(state.levelStates[cfg.id]) levels[cfg.id]=normalizeLevelState(state.levelStates[cfg.id]);
  const a1=normalizeLevelState(levels.A1||emptyLevelState());
  return {
    progress:{__format:'tocfl-multilevel-v1',levels,settings:{activeLevel:state.activeLevel,rememberLevel:Boolean(state.rememberLevel)}},
    // Legacy mirrors keep the existing database schema and make migration reversible.
    favorites:a1.favorites,lastDay:a1.lastDay,language:state.lang
  };
}
async function applyCloudState(data={}){
  const cloudProgress=data.progress && typeof data.progress==='object' ? data.progress : {};
  if(cloudProgress.__format==='tocfl-multilevel-v1' && cloudProgress.levels){
    state.levelStates={};
    for(const [id,value] of Object.entries(cloudProgress.levels)) if(levelConfig(id)) state.levelStates[id]=normalizeLevelState(value);
    if(!state.levelStates.A1) state.levelStates.A1=emptyLevelState();
    state.rememberLevel=Boolean(cloudProgress.settings?.rememberLevel);
    const desired=String(cloudProgress.settings?.activeLevel||'A1').toUpperCase(); state.activeLevel=levelConfig(desired)?desired:'A1';
  }else{
    // Existing users: migrate the old single-level cloud row into A1 without touching future local levels.
    state.levelStates.A1=normalizeLevelState({progress:cloudProgress,favorites:Array.isArray(data.favorites)?data.favorites:[],lastDay:data.lastDay||1});
    if(!state.activeLevel) state.activeLevel='A1';
  }
  if(I18N[data.language]){state.lang=data.language;localStorage.setItem(LANGUAGE_KEY,state.lang);}
  let desired=state.activeLevel||'A1';
  let ok=await applyLevel(desired,{notify:false,close:false});
  if(!ok){desired='A1';state.activeLevel='A1';await applyLevel('A1',{notify:false,close:false});state.rememberLevel=false;}
  persistMultiState(); applyLanguage(); document.dispatchEvent(new CustomEvent('tocfl:language-changed'));
  renderCurrentWord(); renderVocabList(); makeQuiz(); updateProgressUI();
}
window.TOCFLApp={
  getCloudState,applyCloudState,getLanguage:()=>state.lang,isReady:()=>Boolean(window.TOCFL_APP_READY),
  openLevelSelector:()=>openLevelSelector({force:true}),afterAccountReady,onSignedOut,
  getActiveLevel:()=>state.activeLevel,getRememberLevel:()=>state.rememberLevel
};

window.addEventListener('beforeunload',cleanupRecordingStream);
init();
