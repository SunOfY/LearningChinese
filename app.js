'use strict';

const STORAGE_KEY = 'tocfl-a1-progress-v1';
const FAVORITES_KEY = 'tocfl-a1-favorites-v1';

const state = {
  allWords: [],
  enrich: {},
  day: 1,
  dayWords: [],
  index: 0,
  pinyinVisible: true,
  progress: {},
  favorites: new Set(),
  mediaRecorder: null,
  recordedChunks: [],
  recordingUrl: null,
  stream: null,
};

const $ = (id) => document.getElementById(id);

async function init() {
  try {
    const [baseRes, enrichRes] = await Promise.all([
      fetch('./data/a1.json'),
      fetch('./data/enrichment_day1.json')
    ]);
    if (!baseRes.ok || !enrichRes.ok) throw new Error('Không tải được file dữ liệu.');
    const base = await baseRes.json();
    state.allWords = base.vocabulary || [];
    state.enrich = await enrichRes.json();
    loadLocalState();
    buildDaySelectors();
    bindNavigation();
    bindStudyControls();
    bindRecorder();
    bindCanvas();
    bindVocab();
    bindQuiz();
    bindBackup();
    selectDay(Number(localStorage.getItem('tocfl-a1-last-day') || 1));
    registerServiceWorker();
  } catch (err) {
    console.error(err);
    document.querySelector('main').innerHTML = `<div class="card"><strong>Lỗi:</strong> ${escapeHtml(err.message)}<br><br>Hãy mở website qua GitHub Pages hoặc một web server, không mở file index.html trực tiếp bằng file://.</div>`;
  }
}

function loadLocalState() {
  try { state.progress = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch { state.progress = {}; }
  try { state.favorites = new Set(JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]')); } catch { state.favorites = new Set(); }
}
function saveLocalState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress));
  localStorage.setItem(FAVORITES_KEY, JSON.stringify([...state.favorites]));
  updateProgressUI();
}

function buildDaySelectors() {
  const maxDay = Math.max(...state.allWords.map(w => Number(w.day || 1)));
  const options = Array.from({ length: maxDay }, (_, i) => `<option value="${i+1}">Ngày ${i+1}</option>`).join('');
  $('daySelect').innerHTML = options;
  $('vocabDayFilter').innerHTML = `<option value="all">Tất cả ngày</option>${options}`;
  $('daySelect').addEventListener('change', e => selectDay(Number(e.target.value)));
  $('vocabDayFilter').addEventListener('change', renderVocabList);
}

function selectDay(day) {
  state.day = Math.max(1, day);
  state.dayWords = state.allWords.filter(w => Number(w.day) === state.day);
  if (!state.dayWords.length) {
    state.day = 1;
    state.dayWords = state.allWords.filter(w => Number(w.day) === 1);
  }
  state.index = 0;
  $('daySelect').value = String(state.day);
  localStorage.setItem('tocfl-a1-last-day', String(state.day));
  $('dailyTargetLabel').textContent = `${state.dayWords.length} từ mới`;
  renderCurrentWord();
  updateProgressUI();
  renderVocabList();
  makeQuiz();
}

function currentWord() { return state.dayWords[state.index] || state.allWords[0]; }
function getMergedWord(word) {
  const extra = state.enrich[String(word.id)] || {};
  return {
    ...word,
    meaning_en: extra.meaning_en || '— Chưa bổ sung trong bản thử',
    examples: extra.examples || []
  };
}

function renderCurrentWord() {
  if (!state.dayWords.length) return;
  const w = getMergedWord(currentWord());
  $('hanzi').textContent = w.traditional;
  $('traceChar').textContent = w.traditional;
  $('pinyin').textContent = state.pinyinVisible ? w.pinyin : '••••';
  $('meaningVi').textContent = w.meaning_vi || '—';
  $('meaningEn').textContent = w.meaning_en;
  $('levelPos').textContent = `${w.level || 'A1'}${w.pos ? ' · ' + w.pos : ''}`;
  $('wordIndex').textContent = `${state.index + 1} / ${state.dayWords.length}`;
  $('favoriteBtn').textContent = state.favorites.has(w.id) ? '★' : '☆';
  $('togglePinyinBtn').textContent = state.pinyinVisible ? 'Ẩn Pinyin' : 'Hiện Pinyin';
  renderExamples(w);
  renderMemoryButtons(w);
  clearWritingCanvas();
  resetRecordingForNewWord();
}

function renderExamples(w) {
  const wrap = $('examples');
  wrap.innerHTML = '';
  if (!w.examples.length) {
    wrap.innerHTML = `<div class="tip-box" style="margin-top:10px">English và câu ví dụ cho từ này chưa được bổ sung trong bản thử. Ngày 1 có đủ 20 từ để bạn kiểm tra giao diện.</div>`;
    return;
  }
  w.examples.forEach((ex, idx) => {
    const card = document.createElement('div');
    card.className = 'example';
    const top = document.createElement('div');
    top.className = 'example-top';
    const text = document.createElement('div');
    text.style.minWidth = '0';
    const zh = document.createElement('div'); zh.className = 'example-zh'; zh.textContent = ex.zh;
    const py = document.createElement('div'); py.className = 'example-pinyin'; py.textContent = state.pinyinVisible ? ex.pinyin : '••••••••';
    text.append(zh, py);
    const btn = document.createElement('button'); btn.type = 'button'; btn.className = 'icon-btn'; btn.textContent = '🔊'; btn.title = `Nghe câu ${idx + 1}`;
    btn.addEventListener('click', () => speak(ex.zh, 0.88));
    top.append(text, btn);
    const trans = document.createElement('div'); trans.className = 'example-translations';
    const vi = document.createElement('div'); vi.textContent = `🇻🇳 ${ex.vi}`;
    const en = document.createElement('div'); en.textContent = `🇬🇧 ${ex.en}`;
    trans.append(vi, en);
    card.append(top, trans);
    wrap.append(card);
  });
}

function bindStudyControls() {
  $('speakBtn').addEventListener('click', () => speak(currentWord().traditional, 0.92));
  $('slowBtn').addEventListener('click', () => speak(currentWord().traditional, 0.58));
  $('togglePinyinBtn').addEventListener('click', () => { state.pinyinVisible = !state.pinyinVisible; renderCurrentWord(); });
  $('prevBtn').addEventListener('click', () => { state.index = (state.index - 1 + state.dayWords.length) % state.dayWords.length; renderCurrentWord(); });
  $('nextBtn').addEventListener('click', () => { state.index = (state.index + 1) % state.dayWords.length; renderCurrentWord(); });
  $('favoriteBtn').addEventListener('click', () => {
    const id = currentWord().id;
    if (state.favorites.has(id)) state.favorites.delete(id); else state.favorites.add(id);
    saveLocalState(); renderCurrentWord();
  });
  document.querySelectorAll('[data-memory]').forEach(btn => btn.addEventListener('click', () => {
    const w = currentWord();
    state.progress[w.id] = { ...(state.progress[w.id] || {}), memory: btn.dataset.memory, reviewedAt: new Date().toISOString() };
    saveLocalState(); renderMemoryButtons(w);
  }));
}

function renderMemoryButtons(w) {
  const value = state.progress[w.id]?.memory || '';
  document.querySelectorAll('[data-memory]').forEach(btn => btn.classList.toggle('is-selected', btn.dataset.memory === value));
}

function speak(text, rate = 1) {
  if (!('speechSynthesis' in window)) { alert('Trình duyệt này không hỗ trợ đọc giọng nói.'); return; }
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'zh-TW';
  u.rate = rate;
  const voices = speechSynthesis.getVoices();
  const voice = voices.find(v => v.lang?.toLowerCase() === 'zh-tw') || voices.find(v => v.lang?.toLowerCase().startsWith('zh'));
  if (voice) u.voice = voice;
  speechSynthesis.speak(u);
}

function bindRecorder() {
  $('recordBtn').addEventListener('click', startRecording);
  $('stopRecordBtn').addEventListener('click', stopRecording);
  $('playRecordBtn').addEventListener('click', () => { const a = $('recordingAudio'); a.currentTime = 0; a.play(); });
}

async function startRecording() {
  if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
    $('recordStatus').textContent = 'Thiết bị/trình duyệt này chưa hỗ trợ ghi âm bằng MediaRecorder.';
    return;
  }
  try {
    cleanupRecordingStream();
    state.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    state.recordedChunks = [];
    let recorder;
    try { recorder = new MediaRecorder(state.stream, { mimeType: 'audio/webm' }); }
    catch { recorder = new MediaRecorder(state.stream); }
    state.mediaRecorder = recorder;
    recorder.addEventListener('dataavailable', e => { if (e.data?.size) state.recordedChunks.push(e.data); });
    recorder.addEventListener('stop', finalizeRecording);
    recorder.start();
    $('recordBtn').disabled = true;
    $('stopRecordBtn').disabled = false;
    $('playRecordBtn').disabled = true;
    $('recordStatus').textContent = '🔴 Đang ghi âm… hãy đọc từ hiện tại.';
  } catch (err) {
    console.error(err);
    $('recordStatus').textContent = 'Không truy cập được microphone. Hãy cấp quyền microphone cho website.';
  }
}
function stopRecording() {
  if (state.mediaRecorder?.state === 'recording') state.mediaRecorder.stop();
}
function finalizeRecording() {
  if (state.recordingUrl) URL.revokeObjectURL(state.recordingUrl);
  const type = state.mediaRecorder?.mimeType || 'audio/webm';
  const blob = new Blob(state.recordedChunks, { type });
  state.recordingUrl = URL.createObjectURL(blob);
  const audio = $('recordingAudio');
  audio.src = state.recordingUrl; audio.hidden = false;
  $('recordBtn').disabled = false;
  $('stopRecordBtn').disabled = true;
  $('playRecordBtn').disabled = false;
  $('recordStatus').textContent = 'Đã ghi xong. Bấm ▶ Phát lại để tự so sánh với giọng mẫu.';
  cleanupRecordingStream();
}
function cleanupRecordingStream() {
  if (state.stream) state.stream.getTracks().forEach(t => t.stop());
  state.stream = null;
}
function resetRecordingForNewWord() {
  if (state.mediaRecorder?.state === 'recording') state.mediaRecorder.stop();
  cleanupRecordingStream();
  if (state.recordingUrl) URL.revokeObjectURL(state.recordingUrl);
  state.recordingUrl = null; state.recordedChunks = [];
  const audio = $('recordingAudio'); audio.hidden = true; audio.removeAttribute('src'); audio.load();
  $('recordBtn').disabled = false; $('stopRecordBtn').disabled = true; $('playRecordBtn').disabled = true;
  $('recordStatus').textContent = 'Giọng ghi âm chỉ lưu tạm trên thiết bị.';
}

let canvasCtx, canvasDpr = 1, drawing = false, lastPoint = [0,0];
function bindCanvas() {
  const canvas = $('writingCanvas');
  canvasCtx = canvas.getContext('2d');
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  canvas.addEventListener('pointerdown', e => {
    drawing = true; canvas.setPointerCapture(e.pointerId); lastPoint = canvasPoint(e);
  });
  canvas.addEventListener('pointermove', e => {
    if (!drawing) return;
    const [x,y] = canvasPoint(e);
    canvasCtx.beginPath(); canvasCtx.moveTo(lastPoint[0], lastPoint[1]); canvasCtx.lineTo(x,y); canvasCtx.stroke(); lastPoint=[x,y];
  });
  ['pointerup','pointercancel','pointerleave'].forEach(name => canvas.addEventListener(name, () => drawing=false));
  $('clearCanvasBtn').addEventListener('click', clearWritingCanvas);
  $('showGuideCheckbox').addEventListener('change', e => $('traceChar').style.display = e.target.checked ? 'flex' : 'none');
}
function resizeCanvas() {
  const canvas = $('writingCanvas'); if (!canvas || !canvasCtx) return;
  const r = canvas.getBoundingClientRect(); canvasDpr = Math.max(1, Math.min(devicePixelRatio || 1, 2));
  canvas.width = Math.round(r.width * canvasDpr); canvas.height = Math.round(r.height * canvasDpr);
  canvasCtx.setTransform(canvasDpr,0,0,canvasDpr,0,0); canvasCtx.lineCap='round'; canvasCtx.lineJoin='round'; canvasCtx.lineWidth=Math.max(4, r.width/65); canvasCtx.strokeStyle='#152321';
}
function canvasPoint(e) { const r=$('writingCanvas').getBoundingClientRect(); return [e.clientX-r.left,e.clientY-r.top]; }
function clearWritingCanvas() { if (!canvasCtx) return; const c=$('writingCanvas'); canvasCtx.clearRect(0,0,c.width/canvasDpr,c.height/canvasDpr); }

function bindNavigation() {
  document.querySelectorAll('.tab').forEach(btn => btn.addEventListener('click', () => showView(btn.dataset.view)));
}
function showView(name) {
  document.querySelectorAll('.tab').forEach(x => x.classList.toggle('is-active', x.dataset.view === name));
  document.querySelectorAll('.view').forEach(x => x.classList.toggle('is-active', x.id === `view-${name}`));
  if (name === 'progress') updateProgressUI();
  if (name === 'quiz') makeQuiz();
  if (name === 'vocab') renderVocabList();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function bindVocab() { $('vocabSearch').addEventListener('input', renderVocabList); }
function renderVocabList() {
  const wrap = $('vocabList'); if (!wrap || !state.allWords.length) return;
  const q = $('vocabSearch').value.trim().toLowerCase();
  const day = $('vocabDayFilter').value;
  const filtered = state.allWords.filter(w => {
    if (day !== 'all' && String(w.day) !== day) return false;
    if (!q) return true;
    return [w.traditional,w.pinyin,w.meaning_vi].some(v => String(v||'').toLowerCase().includes(q));
  }).slice(0, 250);
  wrap.innerHTML = '';
  filtered.forEach(w => {
    const b = document.createElement('button'); b.type='button'; b.className='vocab-item';
    const h=document.createElement('div'); h.className='vocab-hanzi'; h.textContent=w.traditional;
    const info=document.createElement('div'); info.className='vocab-info';
    const strong=document.createElement('strong'); strong.textContent=w.pinyin;
    const span=document.createElement('span'); span.textContent=w.meaning_vi;
    info.append(strong,span);
    const badge=document.createElement('div'); badge.className='badge'; badge.textContent=`D${w.day}`;
    b.append(h,info,badge);
    b.addEventListener('click', () => {
      selectDay(Number(w.day));
      const idx=state.dayWords.findIndex(x=>x.id===w.id); if(idx>=0) state.index=idx;
      renderCurrentWord(); showView('today');
    });
    wrap.append(b);
  });
  if (!filtered.length) wrap.innerHTML='<div class="muted">Không tìm thấy từ phù hợp.</div>';
}

function bindQuiz() { $('newQuizBtn').addEventListener('click', makeQuiz); }
function makeQuiz() {
  if (!state.dayWords.length) return;
  const correct = state.dayWords[Math.floor(Math.random()*state.dayWords.length)];
  const type = Math.random() < .5 ? 'vi' : 'pinyin';
  $('quizQuestion').textContent = type === 'vi' ? `“${correct.traditional}” nghĩa là gì?` : `Pinyin của “${correct.traditional}” là gì?`;
  const others = state.dayWords.filter(w => w.id !== correct.id).sort(() => Math.random()-.5).slice(0,3);
  const options = [correct,...others].sort(() => Math.random()-.5);
  const wrap=$('quizOptions'); wrap.innerHTML=''; $('quizResult').textContent='';
  options.forEach(w => {
    const b=document.createElement('button'); b.type='button'; b.className='quiz-option'; b.textContent=type==='vi'?w.meaning_vi:w.pinyin;
    b.addEventListener('click', () => {
      const ok=w.id===correct.id; $('quizResult').textContent=ok?'✅ Chính xác!':`❌ Đáp án: ${type==='vi'?correct.meaning_vi:correct.pinyin}`;
      if(ok){state.progress[correct.id]={...(state.progress[correct.id]||{}),quizCorrect:(state.progress[correct.id]?.quizCorrect||0)+1};saveLocalState();}
    });
    wrap.append(b);
  });
}

function updateProgressUI() {
  const entries=Object.values(state.progress).filter(x=>x.memory);
  const count=t=>entries.filter(x=>x.memory===t).length;
  $('statReviewed').textContent=entries.length; $('statEasy').textContent=count('easy'); $('statMedium').textContent=count('medium'); $('statHard').textContent=count('hard');
  const dayReviewed=state.dayWords.filter(w=>state.progress[w.id]?.memory).length;
  const total=state.dayWords.length||1; const pct=Math.round(dayReviewed/total*100);
  $('dailyProgressBar').style.width=`${pct}%`; $('dailyProgressText').textContent=`${dayReviewed} / ${state.dayWords.length}`;
}

function bindBackup() {
  $('exportBtn').addEventListener('click', exportProgress);
  $('importInput').addEventListener('change', importProgress);
  $('resetBtn').addEventListener('click', () => {
    if (!confirm('Xóa toàn bộ tiến độ và từ đã đánh dấu trên thiết bị này?')) return;
    state.progress={};state.favorites=new Set();saveLocalState();renderCurrentWord();$('backupStatus').textContent='Đã xóa tiến độ.';
  });
}
function exportProgress() {
  const data={version:1,exportedAt:new Date().toISOString(),progress:state.progress,favorites:[...state.favorites],lastDay:state.day};
  const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'}); const url=URL.createObjectURL(blob);
  const a=document.createElement('a');a.href=url;a.download=`tocfl-a1-progress-${new Date().toISOString().slice(0,10)}.json`;a.click();URL.revokeObjectURL(url);
  $('backupStatus').textContent='Đã xuất file tiến độ.';
}
async function importProgress(e) {
  const file=e.target.files?.[0]; if(!file)return;
  try{
    const data=JSON.parse(await file.text());
    if(!data.progress||typeof data.progress!=='object')throw new Error('File không đúng định dạng.');
    state.progress=data.progress;state.favorites=new Set(Array.isArray(data.favorites)?data.favorites:[]);saveLocalState();
    if(data.lastDay)selectDay(Number(data.lastDay));renderCurrentWord();$('backupStatus').textContent='Đã nhập tiến độ thành công.';
  }catch(err){$('backupStatus').textContent=`Lỗi: ${err.message}`;}
  e.target.value='';
}

function registerServiceWorker() {
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(err=>console.warn('SW:',err));
}
function escapeHtml(s){return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}

window.addEventListener('beforeunload', cleanupRecordingStream);
init();
