'use strict';

(() => {
  const STORAGE_KEY='tocfl-reading-progress-v1';
  const DATA_URL='./data/readings.json';
  const UI={
    vi:{
      subtitle:'Đoạn đọc theo từng bài trong sách. Mục tiêu: nhìn toàn tiếng Trung và tự đọc đúng mà không cần Pinyin.',
      lesson:n=>`Bài ${n}`, source:(p)=>`Trang sách ${p}`, study:'📘 Học', memorize:'🧠 Học thuộc', exam:'🎓 Thi thử',
      listen:'🔊 Nghe cả bài', slow:'🐢 Nghe chậm', showPinyin:'Hiện Pinyin', showMeaning:'Hiện nghĩa Việt',
      hideChars:'Mức ẩn chữ', peek:'👁 Giữ để xem đáp án', sentencePractice:'Luyện từng câu',
      examHelp:'Chế độ thi: chỉ hiện đoạn văn tiếng Trung. Hãy tự đọc toàn bài, ghi âm rồi để AI kiểm tra phần chữ nhận được.',
      start:'🎙 Bắt đầu ghi âm', stop:'⏹ Dừng', check:'✓ Kiểm tra bài đọc', playback:'▶ Nghe lại',
      idle:'Chưa ghi âm.', recording:'🔴 Đang ghi âm… hãy đọc toàn bộ đoạn văn.', recorded:'Đã ghi xong. Bạn có thể nghe lại hoặc kiểm tra.',
      checking:'🤖 AI đang nhận dạng bài đọc…', login:'Hãy đăng nhập trước khi dùng AI kiểm tra.', groq:'Tài khoản chưa kết nối Groq API Key.',
      result:'Kết quả AI', recognized:'AI nhận ra', textMatch:'Độ khớp chữ', scoreNote:'Điểm này đo độ khớp giữa chữ AI nghe được và đoạn mẫu; không phải điểm thanh điệu chuyên sâu.',
      complete:'✓ Đánh dấu đã thuộc', completed:'✓ Đã thuộc bài', best:'Tốt nhất', noScore:'Chưa kiểm tra', page:'Trang',
      progress:(done,total)=>`${done}/${total} bài đã thuộc`, sourceBook:'時代華語 · Modern Chinese',
      micError:'Không dùng được microphone. Hãy cấp quyền microphone cho website.', noAudio:'Chưa có bản ghi để kiểm tra.',
      excellent:'Rất tốt — AI nhận được gần như đầy đủ đoạn đọc.', good:'Khá tốt — hãy xem lại những chỗ còn thiếu và đọc lại.', retry:'Nên luyện lại — AI nhận được khá khác đoạn mẫu.'
    },
    en:{
      subtitle:'Reading passages by textbook lesson. Goal: read the Chinese-only passage correctly without Pinyin.',
      lesson:n=>`Lesson ${n}`, source:(p)=>`Book page ${p}`, study:'📘 Study', memorize:'🧠 Memorize', exam:'🎓 Test',
      listen:'🔊 Listen', slow:'🐢 Slow', showPinyin:'Show Pinyin', showMeaning:'Show Vietnamese meaning',
      hideChars:'Hide characters', peek:'👁 Hold to reveal', sentencePractice:'Sentence practice',
      examHelp:'Test mode shows Chinese only. Read the whole passage, record yourself, then let AI compare the recognized text.',
      start:'🎙 Start recording', stop:'⏹ Stop', check:'✓ Check reading', playback:'▶ Playback',
      idle:'No recording yet.', recording:'🔴 Recording… read the full passage.', recorded:'Recording complete. Play it back or check it.',
      checking:'🤖 AI is transcribing…', login:'Sign in before using AI checking.', groq:'This account has no Groq API Key connected.',
      result:'AI result', recognized:'AI recognized', textMatch:'Text match', scoreNote:'This measures text-match similarity, not professional tone/phoneme pronunciation.',
      complete:'✓ Mark memorized', completed:'✓ Memorized', best:'Best', noScore:'Not checked', page:'Page',
      progress:(done,total)=>`${done}/${total} readings memorized`, sourceBook:'時代華語 · Modern Chinese',
      micError:'Microphone is unavailable. Allow microphone access for this site.', noAudio:'Record the passage first.',
      excellent:'Excellent — AI recognized nearly the complete passage.', good:'Good — review the missing parts and try again.', retry:'Practice again — the recognized text differs substantially from the target.'
    },
    'zh-Hant':{
      subtitle:'依課本課次練習短文。目標：只看中文，不靠拼音也能正確朗讀。',
      lesson:n=>`第 ${n} 課`, source:(p)=>`課本第 ${p} 頁`, study:'📘 學習', memorize:'🧠 背誦', exam:'🎓 模擬測驗',
      listen:'🔊 聽全文', slow:'🐢 慢速', showPinyin:'顯示拼音', showMeaning:'顯示越文意思',
      hideChars:'隱藏文字', peek:'👁 按住看答案', sentencePractice:'逐句練習',
      examHelp:'測驗模式只顯示中文。請朗讀全文、錄音，再用 AI 比對辨識文字。',
      start:'🎙 開始錄音', stop:'⏹ 停止', check:'✓ 檢查朗讀', playback:'▶ 播放錄音',
      idle:'尚未錄音。', recording:'🔴 錄音中……請朗讀全文。', recorded:'錄音完成，可以播放或檢查。',
      checking:'🤖 AI 辨識中……', login:'請先登入再使用 AI 檢查。', groq:'此帳號尚未連接 Groq API Key。',
      result:'AI 結果', recognized:'AI 辨識', textMatch:'文字符合度', scoreNote:'此分數是辨識文字與課文的相似度，不是專業聲調／音位評分。',
      complete:'✓ 標記已背熟', completed:'✓ 已背熟', best:'最佳', noScore:'尚未檢查', page:'頁',
      progress:(done,total)=>`已背熟 ${done}/${total} 篇`, sourceBook:'時代華語 · Modern Chinese',
      micError:'無法使用麥克風，請允許網站使用麥克風。', noAudio:'請先錄下全文。',
      excellent:'很好——AI 幾乎辨識出完整課文。', good:'不錯——請複習缺少的部分再試一次。', retry:'建議再練習——辨識結果與課文差異較大。'
    }
  };

  const state={readings:[],index:0,mode:'study',mask:0,peek:false,showPinyin:true,showMeaning:true,progress:{lessons:{},lastLesson:1},recorder:null,stream:null,chunks:[],blob:null,url:null};
  const $=id=>document.getElementById(id);
  const lang=()=>window.TOCFLApp?.getLanguage?.()||localStorage.getItem('tocfl-a1-ui-language-v2')||'vi';
  const tx=()=>UI[lang()]||UI.vi;

  function loadProgress(){
    try{const x=JSON.parse(localStorage.getItem(STORAGE_KEY)||'null');if(x&&typeof x==='object')state.progress={lessons:x.lessons&&typeof x.lessons==='object'?x.lessons:{},lastLesson:Number(x.lastLesson||1)};}catch{}
  }
  function saveProgress(){
    localStorage.setItem(STORAGE_KEY,JSON.stringify(state.progress));
    document.dispatchEvent(new CustomEvent('tocfl:state-changed'));
  }
  function lessonProgress(id){return state.progress.lessons[id]||{};}
  function current(){return state.readings[state.index]||null;}
  function fullText(r=current()){return (r?.sentences||[]).map(s=>s.zh).join('');}
  function escapeHtml(s){return String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}

  async function init(){
    const root=$('readingApp'); if(!root)return;
    loadProgress();
    try{
      const res=await fetch(DATA_URL,{cache:'no-store'}); if(!res.ok)throw new Error(`HTTP ${res.status}`);
      const data=await res.json(); state.readings=Array.isArray(data?.readings)?data.readings:[];
      const idx=state.readings.findIndex(r=>Number(r.lesson)===Number(state.progress.lastLesson)); state.index=idx>=0?idx:0;
      bind(); render();
    }catch(err){root.innerHTML=`<div class="card"><strong>Reading:</strong> ${escapeHtml(err.message)}</div>`;}
  }

  function bind(){
    document.querySelectorAll('[data-reading-mode]').forEach(btn=>btn.addEventListener('click',()=>{state.mode=btn.dataset.readingMode;render();}));
    $('readingPinyinToggle')?.addEventListener('change',e=>{state.showPinyin=e.target.checked;renderPassage();});
    $('readingMeaningToggle')?.addEventListener('change',e=>{state.showMeaning=e.target.checked;renderPassage();});
    $('readingMaskRange')?.addEventListener('input',e=>{state.mask=Number(e.target.value||0);renderPassage();renderMaskLabel();});
    $('readingListenBtn')?.addEventListener('click',()=>speak(fullText(),0.92));
    $('readingSlowBtn')?.addEventListener('click',()=>speak(fullText(),0.68));
    $('readingCompleteBtn')?.addEventListener('click',toggleComplete);
    $('readingRecordBtn')?.addEventListener('click',startRecording);
    $('readingStopBtn')?.addEventListener('click',stopRecording);
    $('readingPlaybackBtn')?.addEventListener('click',()=>{const a=$('readingAudio');if(a?.src)a.play();});
    $('readingCheckBtn')?.addEventListener('click',checkReading);
    const peek=$('readingPeekBtn');
    const reveal=e=>{if(e?.cancelable)e.preventDefault();state.peek=true;renderPassage();};
    const hide=e=>{if(e?.cancelable)e.preventDefault();state.peek=false;renderPassage();};
    peek?.addEventListener('pointerdown',reveal,{passive:false});
    ['pointerup','pointercancel','pointerleave'].forEach(n=>peek?.addEventListener(n,hide,{passive:false}));
    peek?.addEventListener('touchstart',reveal,{passive:false}); peek?.addEventListener('touchend',hide,{passive:false});
    document.addEventListener('tocfl:language-changed',render);
    document.addEventListener('tocfl:reading-cloud-applied',()=>{loadProgress();const i=state.readings.findIndex(r=>Number(r.lesson)===Number(state.progress.lastLesson));if(i>=0)state.index=i;render();});
  }

  function render(){
    const t=tx(),r=current();if(!r)return;
    $('readingSubtitle').textContent=t.subtitle;
    $('readingProgressSummary').textContent=t.progress(Object.values(state.progress.lessons).filter(x=>x?.completed).length,state.readings.length);
    renderLessonList();
    $('readingLessonTitle').textContent=`${t.lesson(r.lesson)} · ${r.title_zh}`;
    $('readingLessonSub').textContent=`${r.title_vi} · ${t.sourceBook} · ${t.source(r.book_page)}`;
    document.querySelectorAll('[data-reading-mode]').forEach(b=>{const on=b.dataset.readingMode===state.mode;b.classList.toggle('is-active',on);b.setAttribute('aria-selected',String(on));});
    $('readingModeStudy').textContent=t.study;$('readingModeMemorize').textContent=t.memorize;$('readingModeExam').textContent=t.exam;
    $('readingListenBtn').textContent=t.listen;$('readingSlowBtn').textContent=t.slow;
    $('readingPinyinText').textContent=t.showPinyin;$('readingMeaningText').textContent=t.showMeaning;
    $('readingMaskTitle').textContent=t.hideChars;$('readingPeekBtn').textContent=t.peek;$('readingExamHelp').textContent=t.examHelp;
    $('readingRecordBtn').textContent=t.start;$('readingStopBtn').textContent=t.stop;$('readingCheckBtn').textContent=t.check;$('readingPlaybackBtn').textContent=t.playback;
    $('readingPinyinToggle').checked=state.showPinyin;$('readingMeaningToggle').checked=state.showMeaning;
    $('readingMaskRange').value=String(state.mask);renderMaskLabel();
    const isStudy=state.mode==='study',isMem=state.mode==='memorize',isExam=state.mode==='exam';
    $('readingStudyOptions').hidden=isExam;
    $('readingMemorizeControls').hidden=!isMem;
    $('readingExamPanel').hidden=!isExam;
    $('readingSentencePracticeTitle').textContent=t.sentencePractice;
    $('readingSentencePractice').hidden=!isStudy;
    const p=lessonProgress(r.id),complete=Boolean(p.completed);
    $('readingCompleteBtn').textContent=complete?t.completed:t.complete;$('readingCompleteBtn').classList.toggle('is-complete',complete);
    $('readingBestScore').textContent=p.bestScore!=null?`${t.best}: ${p.bestScore}/100`:t.noScore;
    renderPassage();
  }

  function renderLessonList(){
    const list=$('readingLessonList'),t=tx();if(!list)return;list.innerHTML='';
    state.readings.forEach((r,i)=>{
      const p=lessonProgress(r.id),b=document.createElement('button');b.type='button';b.className='reading-lesson-item';if(i===state.index)b.classList.add('is-current');
      const left=document.createElement('span');left.innerHTML=`<strong>${escapeHtml(t.lesson(r.lesson))}</strong><small>${escapeHtml(r.title_zh)} · ${escapeHtml(r.title_vi)}</small>`;
      const right=document.createElement('span');right.className='reading-lesson-state';right.textContent=p.completed?'✓':(p.bestScore!=null?`${p.bestScore}`:'—');
      b.append(left,right);b.addEventListener('click',()=>{cleanupAudio();state.index=i;state.progress.lastLesson=r.lesson;saveProgress();render();});list.append(b);
    });
  }

  function renderMaskLabel(){$('readingMaskLabel').textContent=`${state.mask}%`;}
  function masked(text,percent){
    if(!percent||state.peek)return text;
    const rate=percent/100,seed=Number(current()?.lesson||1)*17;
    let n=0;return Array.from(text).map(ch=>{
      if(!/[\u3400-\u9FFF\uF900-\uFAFF]/.test(ch))return ch;
      const hide=((n*37+seed*13)%100)<rate;n++;return hide?'＿':ch;
    }).join('');
  }
  function renderPassage(){
    const r=current();if(!r)return;
    const box=$('readingPassage');box.innerHTML='';
    if(state.mode==='study'){
      r.sentences.forEach((s,idx)=>{
        const row=document.createElement('div');row.className='reading-sentence';
        const top=document.createElement('div');top.className='reading-sentence-zh';
        const text=document.createElement('span');text.textContent=s.zh;
        const audio=document.createElement('button');audio.type='button';audio.className='reading-sentence-audio';audio.textContent='🔊';audio.title='zh-TW';audio.addEventListener('click',()=>speak(s.zh,.88));top.append(text,audio);row.append(top);
        if(state.showPinyin){const p=document.createElement('div');p.className='reading-sentence-pinyin';p.textContent=s.pinyin;row.append(p);}
        if(state.showMeaning){const v=document.createElement('div');v.className='reading-sentence-meaning';v.textContent=s.vi;row.append(v);}
        box.append(row);
      });
      const practice=$('readingSentencePractice');practice.innerHTML='';r.sentences.forEach((s,i)=>{const b=document.createElement('button');b.type='button';b.textContent=`${i+1}`;b.title=s.zh;b.addEventListener('click',()=>speak(s.zh,.72));practice.append(b);});
    }else{
      const p=document.createElement('p');p.className='reading-chinese-only';p.textContent=state.mode==='memorize'?masked(fullText(r),state.mask):fullText(r);box.append(p);
    }
  }

  function speak(text,rate){
    if(!('speechSynthesis'in window))return;try{speechSynthesis.cancel();}catch{}
    const u=new SpeechSynthesisUtterance(String(text||''));u.lang='zh-TW';u.rate=rate;u.pitch=1;
    const voices=speechSynthesis.getVoices?.()||[];const v=voices.find(x=>/^zh[-_]TW/i.test(x.lang))||voices.find(x=>/^zh/i.test(x.lang));if(v)u.voice=v;speechSynthesis.speak(u);
  }

  function toggleComplete(){
    const r=current(),p={...lessonProgress(r.id)};p.completed=!p.completed;p.lastStudied=new Date().toISOString();state.progress.lessons[r.id]=p;saveProgress();render();
  }

  function preferredMime(){
    if(!window.MediaRecorder)return'';return['audio/mp4','audio/webm;codecs=opus','audio/webm','audio/ogg;codecs=opus'].find(x=>MediaRecorder.isTypeSupported?.(x))||'';
  }
  async function startRecording(){
    cleanupAudio();
    try{
      state.stream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true,autoGainControl:true}});
      const mime=preferredMime();state.recorder=mime?new MediaRecorder(state.stream,{mimeType:mime}):new MediaRecorder(state.stream);state.chunks=[];
      state.recorder.ondataavailable=e=>{if(e.data?.size)state.chunks.push(e.data);};
      state.recorder.onstop=()=>{const type=state.recorder?.mimeType||state.chunks[0]?.type||mime||'audio/webm';state.blob=new Blob(state.chunks,{type});if(state.url)URL.revokeObjectURL(state.url);state.url=URL.createObjectURL(state.blob);const a=$('readingAudio');a.src=state.url;a.hidden=false;$('readingPlaybackBtn').disabled=false;$('readingCheckBtn').disabled=!state.blob?.size;$('readingRecordStatus').textContent=tx().recorded;state.stream?.getTracks?.().forEach(x=>x.stop());state.stream=null;};
      state.recorder.start(250);$('readingRecordBtn').disabled=true;$('readingStopBtn').disabled=false;$('readingCheckBtn').disabled=true;$('readingRecordStatus').textContent=tx().recording;
    }catch(err){$('readingRecordStatus').textContent=tx().micError;}
  }
  function stopRecording(){
    if(state.recorder?.state==='recording')try{state.recorder.stop();}catch{};$('readingRecordBtn').disabled=false;$('readingStopBtn').disabled=true;
  }
  function cleanupAudio(){
    if(state.recorder?.state==='recording')try{state.recorder.stop();}catch{};state.stream?.getTracks?.().forEach(x=>x.stop());state.stream=null;state.recorder=null;state.chunks=[];state.blob=null;if(state.url){URL.revokeObjectURL(state.url);state.url=null;}const a=$('readingAudio');if(a){a.pause();a.removeAttribute('src');a.hidden=true;}if($('readingPlaybackBtn'))$('readingPlaybackBtn').disabled=true;if($('readingCheckBtn'))$('readingCheckBtn').disabled=true;if($('readingRecordBtn'))$('readingRecordBtn').disabled=false;if($('readingStopBtn'))$('readingStopBtn').disabled=true;if($('readingRecordStatus'))$('readingRecordStatus').textContent=tx().idle;if($('readingResult'))$('readingResult').hidden=true;
  }

  function normalizeChinese(s){return String(s||'').normalize('NFKC').replace(/[\s，。！？,.!?;；:：、'"“”‘’()（）/\-—]/g,'').toLowerCase();}
  function levenshtein(a,b){const prev=Array.from({length:b.length+1},(_,i)=>i),cur=new Array(b.length+1);for(let i=1;i<=a.length;i++){cur[0]=i;for(let j=1;j<=b.length;j++)cur[j]=Math.min(cur[j-1]+1,prev[j]+1,prev[j-1]+(a[i-1]===b[j-1]?0:1));for(let j=0;j<=b.length;j++)prev[j]=cur[j];}return prev[b.length];}
  function similarity(a,b){if(!a&&!b)return 1;if(!a||!b)return 0;return 1-levenshtein(a,b)/Math.max(a.length,b.length);}
  async function checkReading(){
    const t=tx(),r=current();if(!state.blob?.size){$('readingRecordStatus').textContent=t.noAudio;return;}
    if(!window.TOCFLAuth?.getSession?.()?.user){$('readingRecordStatus').textContent=t.login;window.TOCFLAuth?.openAuth?.('login');return;}
    if(!window.TOCFLAuth?.transcribeWithGroq){$('readingRecordStatus').textContent=t.groq;return;}
    try{
      $('readingCheckBtn').disabled=true;$('readingRecordStatus').textContent=t.checking;
      const result=await window.TOCFLAuth.transcribeWithGroq(state.blob,fullText(r));const recognized=String(result?.text||'').trim();
      const score=Math.max(0,Math.min(100,Math.round(similarity(normalizeChinese(fullText(r)),normalizeChinese(recognized))*100)));
      $('readingResult').hidden=false;$('readingScore').textContent=String(score);$('readingRecognized').textContent=recognized||'—';$('readingScoreNote').textContent=t.scoreNote;$('readingResultTitle').textContent=t.result;$('readingRecognizedLabel').textContent=t.recognized;$('readingMatchLabel').textContent=t.textMatch;
      $('readingFeedback').textContent=score>=90?t.excellent:score>=70?t.good:t.retry;
      const p={...lessonProgress(r.id),lastScore:score,bestScore:Math.max(Number(lessonProgress(r.id).bestScore||0),score),lastStudied:new Date().toISOString()};if(score>=90)p.completed=true;state.progress.lessons[r.id]=p;saveProgress();renderLessonList();$('readingBestScore').textContent=`${t.best}: ${p.bestScore}/100`;$('readingCompleteBtn').textContent=p.completed?t.completed:t.complete;$('readingCompleteBtn').classList.toggle('is-complete',Boolean(p.completed));$('readingRecordStatus').textContent=t.recorded;
    }catch(err){$('readingRecordStatus').textContent=err?.message||t.groq;}finally{$('readingCheckBtn').disabled=false;}
  }

  window.TOCFLReading={
    getProgress:()=>{loadProgress();return JSON.parse(JSON.stringify(state.progress));},
    applyProgress:value=>{if(value&&typeof value==='object'){localStorage.setItem(STORAGE_KEY,JSON.stringify(value));loadProgress();document.dispatchEvent(new CustomEvent('tocfl:reading-cloud-applied'));}},
    reset:()=>{localStorage.removeItem(STORAGE_KEY);state.progress={lessons:{},lastLesson:1};render();}
  };

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
