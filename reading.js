'use strict';

(() => {
  const STORAGE_KEY='tocfl-reading-progress-v1';
  const DATA_URL='./data/readings.json';
  const VOCAB_URLS=['./data/a1.json','./data/a2.json'];

  const UI={
    vi:{
      subtitle:'Học theo từng bài trong sách: từ vựng → hội thoại/đoạn đọc → học thuộc → thi thử chỉ nhìn tiếng Trung.',
      lesson:n=>`Bài ${n}`, source:p=>`Trang sách ${p}`, study:'📘 Học', memorize:'🧠 Học thuộc', exam:'🎓 Thi thử',
      vocabulary:'🧠 Từ vựng', vocabTitle:'Từ vựng của bài', vocabHint:'Học từ trước để khi sang Reading bạn nhận ra chữ và tự đọc được.',
      remembered:'✅ Đã nhớ', notRemembered:'😕 Chưa nhớ', vocabProgress:(a,b)=>`${a}/${b} từ đã nhớ`,
      derivedVocab:'Từ trong đoạn (khớp dữ liệu TOCFL A1/A2)', bookVocab:'Từ mới trong bài', nextReading:'Bắt đầu đoạn đầu tiên →',
      listen:'🔊 Nghe cả đoạn', slow:'🐢 Nghe chậm', showPinyin:'Hiện Pinyin', showMeaning:'Hiện nghĩa Việt', hideChars:'Mức ẩn chữ', peek:'👁 Giữ để xem đáp án', sentencePractice:'Luyện từng câu',
      examHelp:'Chế độ thi chỉ hiện tiếng Trung của đoạn đang chọn. Hãy tự nhớ cách đọc, ghi âm toàn đoạn rồi để AI so khớp phần chữ nhận được.',
      start:'🎙 Bắt đầu ghi âm', stop:'⏹ Dừng', check:'✓ Kiểm tra bài đọc', playback:'▶ Nghe lại', idle:'Chưa ghi âm.', recording:'🔴 Đang ghi âm… hãy đọc toàn bộ đoạn đang chọn.', recorded:'Đã ghi xong. Bạn có thể nghe lại hoặc kiểm tra.',
      checking:'🤖 AI đang nhận dạng…', login:'Hãy đăng nhập trước khi dùng AI kiểm tra.', groq:'Tài khoản chưa kết nối Groq API Key.', result:'Kết quả AI', recognized:'AI nhận ra', textMatch:'Độ khớp chữ', scoreNote:'Điểm này đo độ khớp giữa chữ AI nghe được và đoạn mẫu; không phải điểm thanh điệu chuyên sâu.',
      complete:'✓ Đánh dấu đã thuộc', completed:'✓ Đã thuộc đoạn', best:'Tốt nhất', noScore:'Chưa kiểm tra', progress:(done,total)=>`${done}/${total} bài có đoạn đã thuộc`, sourceBook:'Modern Chinese',
      micError:'Không dùng được microphone. Hãy cấp quyền microphone cho website.', noAudio:'Chưa có bản ghi để kiểm tra.', excellent:'Rất tốt — AI nhận được gần như đầy đủ đoạn đọc.', good:'Khá tốt — hãy xem lại những chỗ còn thiếu và đọc lại.', retry:'Nên luyện lại — AI nhận được khá khác đoạn mẫu.',
      noVocab:'Chưa có danh sách từ riêng cho bài này.', write:'✍️ Viết chữ', closeWriting:'Đóng luyện viết', writingTitle:w=>`Luyện viết · ${w}`, writingHint:'Mỗi chữ: xem thứ tự nét → tô theo mẫu → tự viết. Nét bạn viết được giữ nguyên để tự so sánh.', charLabel:n=>`Chữ ${n}`, model:'Mẫu / thứ tự nét', trace:'Tô theo mẫu', free:'Tự viết', stroke:'▶ Xem nét', clearWriting:'Xóa chữ', wrote:'✍️ Đã luyện viết', writingClose:'✕ Đóng', writingWorkspaceHint:'Viết trực tiếp bằng Apple Pencil, ngón tay hoặc chuột. Nét của bạn không bị tự sửa.'
    },
    en:{
      subtitle:'Study each textbook lesson in order: vocabulary → dialogues/readings → memorization → Chinese-only test.',
      lesson:n=>`Lesson ${n}`, source:p=>`Book page ${p}`, study:'📘 Study', memorize:'🧠 Memorize', exam:'🎓 Test',
      vocabulary:'🧠 Vocabulary', vocabTitle:'Lesson vocabulary', vocabHint:'Learn the words first so you can recognize the characters in the reading.',
      remembered:'✅ Remembered', notRemembered:'😕 Not yet', vocabProgress:(a,b)=>`${a}/${b} words remembered`,
      derivedVocab:'Words found in the passage (TOCFL A1/A2 match)', bookVocab:'Textbook vocabulary', nextReading:'Start first passage →',
      listen:'🔊 Listen', slow:'🐢 Slow', showPinyin:'Show Pinyin', showMeaning:'Show Vietnamese meaning', hideChars:'Hide characters', peek:'👁 Hold to reveal', sentencePractice:'Sentence practice',
      examHelp:'Test mode shows Chinese only for the selected passage. Read it from memory, record yourself, then let AI compare the recognized text.',
      start:'🎙 Start recording', stop:'⏹ Stop', check:'✓ Check reading', playback:'▶ Playback', idle:'No recording yet.', recording:'🔴 Recording… read the selected passage.', recorded:'Recording complete. Play it back or check it.',
      checking:'🤖 AI is transcribing…', login:'Sign in before using AI checking.', groq:'This account has no Groq API Key connected.', result:'AI result', recognized:'AI recognized', textMatch:'Text match', scoreNote:'This measures text-match similarity, not professional tone/phoneme pronunciation.',
      complete:'✓ Mark memorized', completed:'✓ Memorized', best:'Best', noScore:'Not checked', progress:(done,total)=>`${done}/${total} lessons have a memorized passage`, sourceBook:'Modern Chinese',
      micError:'Microphone is unavailable. Allow microphone access for this site.', noAudio:'Record the passage first.', excellent:'Excellent — AI recognized nearly the complete passage.', good:'Good — review the missing parts and try again.', retry:'Practice again — the recognized text differs substantially from the target.', noVocab:'No separate vocabulary list is available for this lesson yet.', write:'✍️ Write', closeWriting:'Close writing', writingTitle:w=>`Writing practice · ${w}`, writingHint:'For each character: preview stroke order → trace the model → write from memory. Your ink stays exactly as drawn.', charLabel:n=>`Character ${n}`, model:'Model / stroke order', trace:'Trace', free:'Write from memory', stroke:'▶ Strokes', clearWriting:'Clear character', wrote:'✍️ Practiced', writingClose:'✕ Close', writingWorkspaceHint:'Write with Apple Pencil, finger, or mouse. Your ink is never auto-corrected.'
    },
    'zh-Hant':{
      subtitle:'依課本課次：先學生詞，再練對話／短文，最後只看中文背誦與測驗。',
      lesson:n=>`第 ${n} 課`, source:p=>`課本第 ${p} 頁`, study:'📘 學習', memorize:'🧠 背誦', exam:'🎓 模擬測驗',
      vocabulary:'🧠 生詞', vocabTitle:'本課生詞', vocabHint:'先把生詞記熟，再進入課文朗讀。', remembered:'✅ 已記住', notRemembered:'😕 還不熟', vocabProgress:(a,b)=>`已記住 ${a}/${b} 個`,
      derivedVocab:'課文中符合 TOCFL A1/A2 的詞', bookVocab:'課本生詞', nextReading:'開始第一篇 →', listen:'🔊 聽全文', slow:'🐢 慢速', showPinyin:'顯示拼音', showMeaning:'顯示越文意思', hideChars:'隱藏文字', peek:'👁 按住看答案', sentencePractice:'逐句練習',
      examHelp:'測驗模式只顯示所選課文的中文。請憑記憶朗讀全文、錄音，再用 AI 比對辨識文字。',
      start:'🎙 開始錄音', stop:'⏹ 停止', check:'✓ 檢查朗讀', playback:'▶ 播放錄音', idle:'尚未錄音。', recording:'🔴 錄音中……請朗讀所選課文。', recorded:'錄音完成，可以播放或檢查。',
      checking:'🤖 AI 辨識中……', login:'請先登入再使用 AI 檢查。', groq:'此帳號尚未連接 Groq API Key。', result:'AI 結果', recognized:'AI 辨識', textMatch:'文字符合度', scoreNote:'此分數是辨識文字與課文的相似度，不是專業聲調／音位評分。',
      complete:'✓ 標記已背熟', completed:'✓ 已背熟', best:'最佳', noScore:'尚未檢查', progress:(done,total)=>`${done}/${total} 課已有背熟課文`, sourceBook:'時代華語 · Modern Chinese',
      micError:'無法使用麥克風，請允許網站使用麥克風。', noAudio:'請先錄下全文。', excellent:'很好——AI 幾乎辨識出完整課文。', good:'不錯——請複習缺少的部分再試一次。', retry:'建議再練習——辨識結果與課文差異較大。', noVocab:'本課目前沒有獨立生詞表。', write:'✍️ 寫字', closeWriting:'關閉寫字', writingTitle:w=>`寫字練習 · ${w}`, writingHint:'每個字：先看筆順 → 描字 → 默寫。你自己寫的筆跡會完整保留，方便比較。', charLabel:n=>`第 ${n} 個字`, model:'範字 / 筆順', trace:'描字', free:'默寫', stroke:'▶ 看筆順', clearWriting:'清除此字', wrote:'✍️ 已練習', writingClose:'✕ 關閉', writingWorkspaceHint:'可使用 Apple Pencil、手指或滑鼠直接書寫；你的筆跡不會被自動修正。'
    }
  };

  const state={lessons:[],lessonIndex:0,passageIndex:0,content:'vocab',mode:'study',mask:0,peek:false,showPinyin:true,showMeaning:true,progress:{lessons:{},vocabulary:{},vocabularyWriting:{},lastLesson:1,lastPassageByLesson:{}},vocabBank:[],recorder:null,stream:null,chunks:[],blob:null,url:null,writingVocabKey:null,writingCanvases:[],writingWriters:[],writingObservers:[]};
  const $=id=>document.getElementById(id);
  const lang=()=>window.TOCFLApp?.getLanguage?.()||localStorage.getItem('tocfl-a1-ui-language-v2')||'vi';
  const tx=()=>UI[lang()]||UI.vi;
  const escapeHtml=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));

  function loadProgress(){
    try{const x=JSON.parse(localStorage.getItem(STORAGE_KEY)||'null');if(x&&typeof x==='object')state.progress={lessons:x.lessons&&typeof x.lessons==='object'?x.lessons:{},vocabulary:x.vocabulary&&typeof x.vocabulary==='object'?x.vocabulary:{},vocabularyWriting:x.vocabularyWriting&&typeof x.vocabularyWriting==='object'?x.vocabularyWriting:{},lastLesson:Number(x.lastLesson||1),lastPassageByLesson:x.lastPassageByLesson&&typeof x.lastPassageByLesson==='object'?x.lastPassageByLesson:{}};}catch{}
  }
  function saveProgress(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state.progress));document.dispatchEvent(new CustomEvent('tocfl:state-changed'));}
  function passageProgress(id){return state.progress.lessons[id]||{};}
  function currentLesson(){return state.lessons[state.lessonIndex]||null;}
  function currentPassage(){const l=currentLesson();return l?.passages?.[state.passageIndex]||l?.passages?.[0]||null;}
  function localizedLessonName(l){
    const lg=lang();
    if(lg==='zh-Hant') return l?.title_zh||l?.title_vi||'';
    if(lg==='vi') return l?.title_vi||l?.title_zh||'';
    return l?.title_en||l?.title_vi||l?.title_zh||'';
  }
  function localizedPassageName(p,index=0){
    const lg=lang();
    if(lg==='zh-Hant') return p?.title_zh||p?.title_vi||'';
    if(lg==='vi') return p?.title_vi||((p?.kind==='dialogue')?`Hội thoại ${index+1}`:p?.title_zh)||'';
    return p?.title_en||p?.title_vi||((p?.kind==='dialogue')?`Dialogue ${index+1}`:p?.title_zh)||'';
  }
  function localizedContext(p){
    const lg=lang();
    if(lg==='zh-Hant') return p?.context_zh||'';
    if(lg==='vi') return p?.context_vi||'';
    return p?.context_en||p?.context_vi||'';
  }
  function fullText(p=currentPassage()){return (p?.sentences||[]).map(s=>s.zh).join('');}
  function vocabKey(lesson,word){return `${lesson.lesson}|${word.zh}`;}
  function isVocabRemembered(lesson,word){return state.progress.vocabulary[vocabKey(lesson,word)]==='easy';}
  
  function vocabWritingKey(lesson,word){return `${lesson.lesson}|${word.zh}`;}
  function hasPracticedWriting(lesson,word){return Boolean(state.progress.vocabularyWriting?.[vocabWritingKey(lesson,word)]);}
  function chineseChars(text){return Array.from(String(text||'')).filter(ch=>/[\u3400-\u9FFF\uF900-\uFAFF]/.test(ch));}
  function readingBrushMode(){try{return Boolean(JSON.parse(localStorage.getItem('tocfl-writing-settings-v1')||'{}')?.brushMode);}catch{return false;}}
  function strokeDataUrl(ch){return `https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0.1/${encodeURIComponent(ch)}.json`;}
  function readingStrokeLoader(char,onComplete,onError){fetch(strokeDataUrl(char),{cache:'force-cache'}).then(r=>{if(!r.ok)throw new Error(`Stroke data HTTP ${r.status}`);return r.json();}).then(onComplete).catch(onError);}
  function clearReadingSelection(){
    try{window.getSelection?.()?.removeAllRanges?.();}catch{}
    try{document.selection?.empty?.();}catch{}
  }
  function setReadingWritingLock(active){
    document.body.classList.toggle('reading-writing-active',Boolean(active));
    if(active)clearReadingSelection();
  }
  function clearReadingWritingRuntime(){
    state.writingObservers.forEach(o=>{try{o.disconnect();}catch{}});
    state.writingObservers=[];
    state.writingCanvases=[];
    state.writingWriters=[];
    setReadingWritingLock(false);
  }
  function makeReadingGuide(host,ch,{animate=false}={}){
    if(typeof window.HanziWriter==='undefined')return null;
    host.replaceChildren();
    // Fixed 100x100 vector coordinate system. CSS scales the SVG with the square,
    // so the model stays centered when iPad/phone/laptop layouts resize.
    return window.HanziWriter.create(host,ch,{
      width:100,height:100,padding:8,
      showOutline:Boolean(animate),showCharacter:true,
      strokeColor:animate?'#17211f':'#0f766e',outlineColor:'rgba(15,118,110,.16)',
      strokeAnimationSpeed:1,delayBetweenStrokes:160,
      charDataLoader:(char,onComplete,loaderError)=>readingStrokeLoader(char,onComplete,loaderError)
    });
  }
  function resizeReadingCanvas(item,{preserve=true}={}){
    const canvas=item?.canvas;if(!canvas?.isConnected)return;
    const rect=canvas.getBoundingClientRect();if(rect.width<20||rect.height<20)return;
    const dpr=Math.max(1,window.devicePixelRatio||1),w=Math.round(rect.width*dpr),h=Math.round(rect.height*dpr);
    if(canvas.width===w&&canvas.height===h)return;
    let old=null;
    if(preserve&&canvas.width&&canvas.height){old=document.createElement('canvas');old.width=canvas.width;old.height=canvas.height;old.getContext('2d').drawImage(canvas,0,0);}
    canvas.width=w;canvas.height=h;
    const ctx=canvas.getContext('2d');ctx.setTransform(dpr,0,0,dpr,0,0);ctx.lineCap='round';ctx.lineJoin='round';ctx.strokeStyle='#17211f';ctx.fillStyle='#17211f';
    if(old)ctx.drawImage(old,0,0,old.width,old.height,0,0,rect.width,rect.height);
  }
  function clearReadingCanvas(item){
    const c=item?.canvas;if(!c)return;const ctx=c.getContext('2d');ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,c.width,c.height);ctx.restore();item.last=null;item.active=false;item.lastWidth=3.2;c.classList.remove('has-ink');
  }
  function bindReadingCanvas(canvas,onCommit){
    const item={canvas,last:null,active:false,lastTime:0,lastPressure:.5,lastWidth:3.2,pointerId:null};
    state.writingCanvases.push(item);
    const prevent=e=>{if(e?.cancelable)e.preventDefault();clearReadingSelection();};
    const point=e=>{
      const r=canvas.getBoundingClientRect();
      return{
        x:Math.max(0,Math.min(r.width,e.clientX-r.left)),
        y:Math.max(0,Math.min(r.height,e.clientY-r.top)),
        p:(e.pointerType==='pen'&&Number.isFinite(e.pressure)&&e.pressure>0)?Math.max(0,Math.min(1,e.pressure)):null,
        tilt:(()=>{
          if(e.pointerType!=='pen')return 0;
          if(Number.isFinite(e.altitudeAngle))return Math.max(0,Math.min(1,1-e.altitudeAngle/(Math.PI/2)));
          if(Number.isFinite(e.tiltX)&&Number.isFinite(e.tiltY))return Math.max(0,Math.min(1,Math.hypot(e.tiltX,e.tiltY)/90));
          return 0;
        })(),
        pen:e.pointerType==='pen',
        t:e.timeStamp||performance.now()
      };
    };
    const drawPoint=p=>{
      const ctx=canvas.getContext('2d'),brush=readingBrushMode(),prev=item.last;
      let width=3.2;
      if(brush){
        let speed=0;
        if(prev){const dt=Math.max(1,p.t-prev.t),dist=Math.hypot(p.x-prev.x,p.y-prev.y);speed=dist/dt;}
        const pressure=p.pen&&p.p!=null ? p.p : Math.max(.24,Math.min(.66,.54-speed*.10));
        const tilt=p.pen ? (p.tilt||0) : 0;
        let target=(1.35+pressure*5.9+tilt*1.55)*Math.max(.78,Math.min(1.10,1.05-speed*.18));
        target=Math.max(1.45,Math.min(9.2,target));
        width=Number.isFinite(item.lastWidth)?item.lastWidth*.58+target*.42:target;
        item.lastPressure=pressure;item.lastWidth=width;
      }else{
        item.lastWidth=3.2;
      }
      ctx.lineWidth=width;
      if(prev){ctx.beginPath();ctx.moveTo(prev.x,prev.y);ctx.lineTo(p.x,p.y);ctx.stroke();}else{ctx.beginPath();ctx.arc(p.x,p.y,width/2,0,Math.PI*2);ctx.fill();}
      item.last=p;canvas.classList.add('has-ink');
    };
    ['contextmenu','selectstart','dragstart'].forEach(name=>canvas.addEventListener(name,e=>e.preventDefault()));
    ['touchstart','touchmove','touchend','touchcancel'].forEach(name=>canvas.addEventListener(name,prevent,{passive:false}));
    canvas.addEventListener('pointerdown',e=>{
      if(e.pointerType==='mouse'&&e.button!==0)return;
      prevent(e);resizeReadingCanvas(item);setReadingWritingLock(true);item.active=true;item.pointerId=e.pointerId;item.last=null;item.lastWidth=3.2;
      try{canvas.setPointerCapture(e.pointerId);}catch{}drawPoint(point(e));
    },{passive:false});
    canvas.addEventListener('pointermove',e=>{
      if(!item.active||(item.pointerId!==null&&e.pointerId!==item.pointerId))return;prevent(e);
      const events=e.getCoalescedEvents?.()||[e];events.forEach(ev=>drawPoint(point(ev)));
    },{passive:false});
    const end=e=>{
      if(!item.active)return;if(e?.pointerId!=null&&item.pointerId!==null&&e.pointerId!==item.pointerId)return;
      prevent(e);item.active=false;item.pointerId=null;item.last=null;setReadingWritingLock(false);
      try{canvas.releasePointerCapture?.(e.pointerId);}catch{}onCommit?.();
    };
    canvas.addEventListener('pointerup',end,{passive:false});canvas.addEventListener('pointercancel',end,{passive:false});canvas.addEventListener('lostpointercapture',end);
    requestAnimationFrame(()=>requestAnimationFrame(()=>resizeReadingCanvas(item,{preserve:false})));
    if('ResizeObserver'in window){const ro=new ResizeObserver(()=>resizeReadingCanvas(item,{preserve:true}));ro.observe(canvas);state.writingObservers.push(ro);}
    return item;
  }
  function mountVocabWriting(panel,lesson,word){
    clearReadingWritingRuntime();
    const t=tx(),chars=chineseChars(word.zh);panel.innerHTML='';panel.hidden=false;
    const head=document.createElement('div');head.className='reading-writing-head';
    const intro=document.createElement('div');intro.innerHTML=`<strong>${escapeHtml(t.writingTitle(word.zh))}</strong><p>${escapeHtml(t.writingHint)}</p><p class="small muted">${escapeHtml(t.writingWorkspaceHint)}</p>`;
    const close=document.createElement('button');close.type='button';close.className='reading-writing-workspace-close';close.textContent=t.writingClose;close.addEventListener('click',()=>{state.writingVocabKey=null;clearReadingWritingRuntime();renderVocabulary();});
    head.append(intro,close);panel.append(head);
    const grid=document.createElement('div');grid.className='reading-writing-char-grid';panel.append(grid);
    const commit=()=>{state.progress.vocabularyWriting=state.progress.vocabularyWriting||{};state.progress.vocabularyWriting[vocabWritingKey(lesson,word)]=true;saveProgress();};
    chars.forEach((ch,idx)=>{
      const block=document.createElement('section');block.className='reading-writing-char';
      const title=document.createElement('div');title.className='reading-writing-char-title';title.innerHTML=`<strong>${escapeHtml(ch)}</strong><span>${escapeHtml(t.charLabel(idx+1))}</span>`;block.append(title);
      const boxes=document.createElement('div');boxes.className='reading-writing-boxes';block.append(boxes);
      const mkBox=(label,mode)=>{const wrap=document.createElement('div');wrap.className=`reading-writing-box ${mode}`;const lab=document.createElement('span');lab.className='reading-writing-box-label';lab.textContent=label;const sq=document.createElement('div');sq.className='reading-writing-square';sq.innerHTML='<i></i><i></i><i></i><i></i>';wrap.append(lab,sq);boxes.append(wrap);return{wrap,sq};};
      const model=mkBox(t.model,'model'),trace=mkBox(t.trace,'trace'),free=mkBox(t.free,'free');
      const modelHost=document.createElement('div');modelHost.className='reading-writing-guide model-guide';model.sq.append(modelHost);
      const play=document.createElement('button');play.type='button';play.className='reading-writing-play';play.textContent='▶';play.title=t.stroke;model.sq.append(play);
      const traceHost=document.createElement('div');traceHost.className='reading-writing-guide trace-guide';trace.sq.append(traceHost);
      const traceCanvas=document.createElement('canvas');traceCanvas.className='reading-writing-canvas';trace.sq.append(traceCanvas);
      const freeCanvas=document.createElement('canvas');freeCanvas.className='reading-writing-canvas';free.sq.append(freeCanvas);
      const clear=document.createElement('button');clear.type='button';clear.className='reading-writing-clear';clear.textContent=t.clearWriting;block.append(clear);
      grid.append(block);
      requestAnimationFrame(()=>requestAnimationFrame(()=>{
        let modelWriter=null;
        try{modelWriter=makeReadingGuide(modelHost,ch,{animate:true});if(modelWriter)state.writingWriters.push(modelWriter);}catch{}
        try{const traceWriter=makeReadingGuide(traceHost,ch);if(traceWriter)state.writingWriters.push(traceWriter);}catch{}
        const a=bindReadingCanvas(traceCanvas,commit),b=bindReadingCanvas(freeCanvas,commit);
        clear.addEventListener('click',()=>{clearReadingCanvas(a);clearReadingCanvas(b);});
        play.addEventListener('click',()=>{if(!modelWriter)return;try{modelWriter.hideCharacter({duration:80});setTimeout(()=>modelWriter.animateCharacter(),100);}catch{try{modelWriter.animateCharacter();}catch{}}});
      }));
    });
  }
  

  function normalizeData(data){
    if(Array.isArray(data?.lessons))return data.lessons.map(l=>({...l,passages:Array.isArray(l.passages)?l.passages:[],vocabulary:Array.isArray(l.vocabulary)?l.vocabulary:[]}));
    const readings=Array.isArray(data?.readings)?data.readings:[];
    return readings.map(r=>({id:`MC-L${r.lesson}`,lesson:r.lesson,title_zh:`第${r.lesson}課`,title_vi:`Bài ${r.lesson}`,vocabulary:[],passages:[r]}));
  }
  async function loadVocabBank(){
    const out=[];
    for(const url of VOCAB_URLS){
      try{const res=await fetch(url,{cache:'no-store'});if(!res.ok)continue;const d=await res.json(),arr=Array.isArray(d)?d:(Array.isArray(d?.vocabulary)?d.vocabulary:[]);arr.forEach(w=>{if(w?.traditional)out.push({zh:String(w.traditional),pinyin:w.pinyin||'',pos:w.pos||'',vi:w.meaning_vi||'',source:w.level||''});});}catch{}
    }
    state.vocabBank=out;
  }
  function lessonVocabulary(lesson){
    const explicit=Array.isArray(lesson?.vocabulary)?lesson.vocabulary:[];
    const seen=new Set(),out=[];
    explicit.forEach(w=>{if(w?.zh&&!seen.has(w.zh)){seen.add(w.zh);out.push({...w,_kind:'book'});}});
    const byFirst=new Map();
    state.vocabBank.forEach(w=>{
      if(!w?.zh)return; const first=Array.from(w.zh)[0];
      if(!byFirst.has(first))byFirst.set(first,[]); byFirst.get(first).push(w);
    });
    byFirst.forEach(arr=>arr.sort((a,b)=>Array.from(b.zh).length-Array.from(a.zh).length));
    const text=(lesson?.passages||[]).map(fullText).join('');
    for(let i=0;i<text.length;){
      const ch=text[i];
      if(!/[\u3400-\u9FFF\uF900-\uFAFF]/.test(ch)){i++;continue;}
      const candidates=byFirst.get(ch)||[]; let hit=null;
      for(const w of candidates){if(text.startsWith(w.zh,i)){hit=w;break;}}
      if(hit){if(!seen.has(hit.zh)){seen.add(hit.zh);out.push({...hit,_kind:'derived'});} i+=hit.zh.length;} else i++;
    }
    return out.slice(0,120);
  }

  function ensureExtraUI(){
    const switcher=document.querySelector('#view-reading .reading-mode-switch');if(!switcher||$('readingContentTabs'))return;
    const tabs=document.createElement('div');tabs.id='readingContentTabs';tabs.className='reading-content-tabs';switcher.before(tabs);
    const panel=document.createElement('section');panel.id='readingVocabularyPanel';panel.className='reading-vocab-panel';panel.hidden=true;
    panel.innerHTML='<div class="reading-vocab-head"><div><h3 id="readingVocabTitle"></h3><p id="readingVocabHint" class="muted"></p></div><strong id="readingVocabProgress"></strong></div><div id="readingWritingWorkspace" class="reading-writing-workspace" hidden></div><div id="readingVocabList" class="reading-vocab-list"></div><div class="toolbar"><button id="readingNextPassageBtn" type="button" class="primary"></button></div>';
    switcher.before(panel);
    $('readingNextPassageBtn')?.addEventListener('click',()=>{state.content='passage';state.passageIndex=0;cleanupAudio();render();});
  }

  async function init(){
    const root=$('readingApp');if(!root)return;loadProgress();ensureExtraUI();
    try{const res=await fetch(DATA_URL,{cache:'no-store'});if(!res.ok)throw new Error(`HTTP ${res.status}`);const data=await res.json();state.lessons=normalizeData(data);await loadVocabBank();const idx=state.lessons.findIndex(l=>Number(l.lesson)===Number(state.progress.lastLesson));state.lessonIndex=idx>=0?idx:0;const lesson=currentLesson(),savedId=state.progress.lastPassageByLesson?.[lesson?.lesson];if(savedId){const pi=lesson.passages.findIndex(p=>p.id===savedId);if(pi>=0)state.passageIndex=pi;}bind();render();}
    catch(err){root.innerHTML=`<div class="card"><strong>Reading:</strong> ${escapeHtml(err.message)}</div>`;}
  }

  function bind(){
    document.querySelectorAll('[data-reading-mode]').forEach(btn=>btn.addEventListener('click',e=>{e.preventDefault();state.mode=btn.dataset.readingMode||'study';state.peek=false;render();}));
    $('readingPinyinToggle')?.addEventListener('change',e=>{state.showPinyin=e.target.checked;renderPassage();});
    $('readingMeaningToggle')?.addEventListener('change',e=>{state.showMeaning=e.target.checked;renderPassage();});
    const mask=$('readingMaskRange');const updateMask=e=>{state.mask=Math.max(0,Math.min(100,Number(e.target.value||0)));state.peek=false;renderMaskLabel();renderPassage();};
    mask?.addEventListener('input',updateMask);mask?.addEventListener('change',updateMask);
    $('readingListenBtn')?.addEventListener('click',()=>speak(fullText(),.92));$('readingSlowBtn')?.addEventListener('click',()=>speak(fullText(),.68));$('readingCompleteBtn')?.addEventListener('click',toggleComplete);
    $('readingRecordBtn')?.addEventListener('click',startRecording);$('readingStopBtn')?.addEventListener('click',stopRecording);$('readingPlaybackBtn')?.addEventListener('click',()=>{const a=$('readingAudio');if(a?.src)a.play();});$('readingCheckBtn')?.addEventListener('click',checkReading);
    const peek=$('readingPeekBtn');
    const reveal=e=>{if(e?.cancelable)e.preventDefault();e?.stopPropagation?.();state.peek=true;try{peek?.setPointerCapture?.(e.pointerId);}catch{}renderPassage();};
    const hide=e=>{if(e?.cancelable)e.preventDefault();e?.stopPropagation?.();state.peek=false;renderPassage();};
    peek?.addEventListener('pointerdown',reveal,{passive:false});peek?.addEventListener('pointerup',hide,{passive:false});peek?.addEventListener('pointercancel',hide,{passive:false});peek?.addEventListener('lostpointercapture',hide);
    peek?.addEventListener('keydown',e=>{if(e.key===' '||e.key==='Enter')reveal(e);});peek?.addEventListener('keyup',e=>{if(e.key===' '||e.key==='Enter')hide(e);});peek?.addEventListener('contextmenu',e=>e.preventDefault());
    document.addEventListener('selectionchange',()=>{if(document.body.classList.contains('reading-writing-active'))clearReadingSelection();});
    window.addEventListener('resize',()=>state.writingCanvases.forEach(x=>resizeReadingCanvas(x,{preserve:true})));
    document.addEventListener('tocfl:language-changed',render);document.addEventListener('tocfl:reading-cloud-applied',()=>{loadProgress();const i=state.lessons.findIndex(l=>Number(l.lesson)===Number(state.progress.lastLesson));if(i>=0)state.lessonIndex=i;render();});
  }

  function render(){
    const t=tx(),lesson=currentLesson();if(!lesson)return;
    const completedLessons=state.lessons.filter(l=>(l.passages||[]).some(p=>passageProgress(p.id)?.completed)).length;
    $('readingSubtitle').textContent=t.subtitle;$('readingProgressSummary').textContent=t.progress(completedLessons,state.lessons.length);renderLessonList();renderContentTabs();
    const vocabMode=state.content==='vocab',modeSwitch=document.querySelector('#view-reading .reading-mode-switch'),toolbar=document.querySelector('#view-reading .reading-toolbar');
    $('readingVocabularyPanel').hidden=!vocabMode;if(modeSwitch)modeSwitch.hidden=vocabMode;if(toolbar)toolbar.hidden=vocabMode;$('readingMemorizeControls').hidden=vocabMode||state.mode!=='memorize';$('readingPassage').hidden=vocabMode;$('readingSentencePracticeWrap').hidden=vocabMode||state.mode!=='study';$('readingExamPanel').hidden=vocabMode||state.mode!=='exam';$('readingCompleteBtn').hidden=vocabMode;$('readingBestScore').hidden=vocabMode;
    if(vocabMode){renderVocabulary();return;}
    const p=currentPassage();if(!p)return;
    $('readingLessonTitle').textContent=`${t.lesson(lesson.lesson)} · ${localizedPassageName(p,state.passageIndex)}`;const context=localizedContext(p);$('readingLessonSub').textContent=`${context?`${context} · `:''}${t.sourceBook}${p.book_page?` · ${t.source(p.book_page)}`:''}`;
    document.querySelectorAll('[data-reading-mode]').forEach(b=>{const on=b.dataset.readingMode===state.mode;b.classList.toggle('is-active',on);b.setAttribute('aria-selected',String(on));});
    $('readingModeStudy').textContent=t.study;$('readingModeMemorize').textContent=t.memorize;$('readingModeExam').textContent=t.exam;$('readingListenBtn').textContent=t.listen;$('readingSlowBtn').textContent=t.slow;$('readingPinyinText').textContent=t.showPinyin;$('readingMeaningText').textContent=t.showMeaning;$('readingMaskTitle').textContent=t.hideChars;$('readingPeekBtn').textContent=t.peek;$('readingExamHelp').textContent=t.examHelp;$('readingRecordBtn').textContent=t.start;$('readingStopBtn').textContent=t.stop;$('readingCheckBtn').textContent=t.check;$('readingPlaybackBtn').textContent=t.playback;
    $('readingPinyinToggle').checked=state.showPinyin;$('readingMeaningToggle').checked=state.showMeaning;$('readingMaskRange').value=String(state.mask);renderMaskLabel();
    const pp=passageProgress(p.id),complete=Boolean(pp.completed);$('readingCompleteBtn').textContent=complete?t.completed:t.complete;$('readingCompleteBtn').classList.toggle('is-complete',complete);$('readingBestScore').textContent=pp.bestScore!=null?`${t.best}: ${pp.bestScore}/100`:t.noScore;renderPassage();
  }

  function renderLessonList(){
    const list=$('readingLessonList'),t=tx();if(!list)return;list.innerHTML='';
    state.lessons.forEach((l,i)=>{const passages=l.passages||[],done=passages.filter(p=>passageProgress(p.id)?.completed).length,vocab=lessonVocabulary(l),known=vocab.filter(w=>isVocabRemembered(l,w)).length,b=document.createElement('button');b.type='button';b.className='reading-lesson-item';if(i===state.lessonIndex)b.classList.add('is-current');const left=document.createElement('span');const lessonName=localizedLessonName(l);left.innerHTML=`<strong>${escapeHtml(t.lesson(l.lesson))}${lessonName?` · ${escapeHtml(lessonName)}`:''}</strong><small>🧠 ${known}/${vocab.length} · 📖 ${done}/${passages.length}</small>`;const right=document.createElement('span');right.className='reading-lesson-state';right.textContent=done===passages.length&&passages.length?'✓':'—';b.append(left,right);b.addEventListener('click',()=>{cleanupAudio();state.lessonIndex=i;state.passageIndex=0;state.content='vocab';state.progress.lastLesson=l.lesson;saveProgress();render();});list.append(b);});
  }

  function renderContentTabs(){
    const wrap=$('readingContentTabs'),t=tx(),l=currentLesson();if(!wrap||!l)return;wrap.innerHTML='';
    const add=(label,on,fn)=>{const b=document.createElement('button');b.type='button';b.className='reading-content-tab';b.classList.toggle('is-active',on);b.textContent=label;b.addEventListener('click',fn);wrap.append(b);};
    add(t.vocabulary,state.content==='vocab',()=>{cleanupAudio();state.content='vocab';render();});
    (l.passages||[]).forEach((p,i)=>add(`${p.kind==='dialogue'?'💬':'📖'} ${localizedPassageName(p,i)}`,state.content==='passage'&&state.passageIndex===i,()=>{cleanupAudio();state.content='passage';state.passageIndex=i;state.progress.lastPassageByLesson[l.lesson]=p.id;saveProgress();render();}));
  }

  function renderVocabulary(){
    const t=tx(),l=currentLesson(),words=lessonVocabulary(l);
    $('readingLessonTitle').textContent=`${t.lesson(l.lesson)} · ${t.vocabTitle}`;
    const lessonName=localizedLessonName(l);
    $('readingLessonSub').textContent=`${lessonName?`${lessonName} · `:''}${t.sourceBook}${(lang()==='vi'&&l.note_vi)?` · ${l.note_vi}`:''}`;
    $('readingVocabTitle').textContent=t.vocabTitle;$('readingVocabHint').textContent=t.vocabHint;
    const known=words.filter(w=>isVocabRemembered(l,w)).length;$('readingVocabProgress').textContent=t.vocabProgress(known,words.length);
    const list=$('readingVocabList');list.innerHTML='';clearReadingWritingRuntime();
    words.forEach(w=>{
      const key=vocabWritingKey(l,w),card=document.createElement('article');card.className='reading-vocab-card';if(isVocabRemembered(l,w))card.classList.add('is-known');
      const top=document.createElement('div');top.className='reading-vocab-card-top';
      const main=document.createElement('div');main.className='reading-vocab-main';
      const zh=document.createElement('strong');zh.className='reading-vocab-zh';zh.textContent=w.zh;
      const py=document.createElement('span');py.className='reading-vocab-pinyin';py.textContent=w.pinyin||'';
      const pos=document.createElement('span');pos.className='reading-vocab-pos';pos.textContent=w.pos||'';
      const vi=document.createElement('div');vi.className='reading-vocab-meaning';vi.textContent=w.vi||'';main.append(zh,py,pos,vi);
      if(hasPracticedWriting(l,w)){const badge=document.createElement('small');badge.className='reading-writing-done';badge.textContent=t.wrote;main.append(badge);}
      const actions=document.createElement('div');actions.className='reading-vocab-actions';
      const audio=document.createElement('button');audio.type='button';audio.textContent='🔊';audio.addEventListener('click',()=>speak(w.zh,.82));
      const write=document.createElement('button');write.type='button';write.className='reading-vocab-write';write.textContent=state.writingVocabKey===key?t.closeWriting:t.write;
      const mem=document.createElement('button');mem.type='button';mem.className=isVocabRemembered(l,w)?'primary':'';mem.textContent=isVocabRemembered(l,w)?t.remembered:t.notRemembered;
      mem.addEventListener('click',()=>{const k=vocabKey(l,w);if(isVocabRemembered(l,w))delete state.progress.vocabulary[k];else state.progress.vocabulary[k]='easy';saveProgress();renderVocabulary();renderLessonList();});
      actions.append(audio,write,mem);top.append(main,actions);card.append(top);
      write.addEventListener('click',()=>{state.writingVocabKey=state.writingVocabKey===key?null:key;renderVocabulary();requestAnimationFrame(()=>$('readingWritingWorkspace')?.scrollIntoView?.({behavior:'smooth',block:'nearest'}));});
      list.append(card);
    });
    const workspace=$('readingWritingWorkspace');
    if(workspace){
      const active=words.find(w=>vocabWritingKey(l,w)===state.writingVocabKey);
      if(active){mountVocabWriting(workspace,l,active);}else{clearReadingWritingRuntime();workspace.hidden=true;workspace.innerHTML='';}
    }
    $('readingNextPassageBtn').textContent=t.nextReading;$('readingNextPassageBtn').disabled=!(l.passages||[]).length;
  }

  function renderMaskLabel(){$('readingMaskLabel').textContent=`${state.mask}%`;}
  function masked(text,percent){if(!percent||state.peek)return text;const rate=percent/100,seed=Number(currentLesson()?.lesson||1)*17+state.passageIndex*7;let n=0;return Array.from(text).map(ch=>{if(!/[\u3400-\u9FFF\uF900-\uFAFF]/.test(ch))return ch;const hide=((n*37+seed*13)%100)<rate;n++;return hide?'＿':ch;}).join('');}
  function displayLine(s){return s.speaker?`${s.speaker}：${s.zh}`:s.zh;}
  function renderPassage(){
    const p=currentPassage();if(!p)return;const box=$('readingPassage');box.innerHTML='';box.hidden=false;
    if(state.mode==='study'){
      p.sentences.forEach(s=>{const row=document.createElement('div');row.className='reading-sentence';const top=document.createElement('div');top.className='reading-sentence-zh';const text=document.createElement('span');text.textContent=displayLine(s);const audio=document.createElement('button');audio.type='button';audio.className='reading-sentence-audio';audio.textContent='🔊';audio.title='zh-TW';audio.addEventListener('click',()=>speak(s.zh,.88));top.append(text,audio);row.append(top);if(state.showPinyin&&s.pinyin){const py=document.createElement('div');py.className='reading-sentence-pinyin';py.textContent=s.pinyin;row.append(py);}if(state.showMeaning&&s.vi){const v=document.createElement('div');v.className='reading-sentence-meaning';v.textContent=s.vi;row.append(v);}box.append(row);});
      const practice=$('readingSentencePractice');practice.innerHTML='';p.sentences.forEach((s,i)=>{const b=document.createElement('button');b.type='button';b.textContent=`${i+1}`;b.title=s.zh;b.addEventListener('click',()=>speak(s.zh,.72));practice.append(b);});
    }else{const q=document.createElement('p');q.className='reading-chinese-only';const lines=p.sentences.map(displayLine).join('\n');q.textContent=state.mode==='memorize'?masked(lines,state.mask):lines;box.append(q);}
  }

  function speak(text,rate){if(!('speechSynthesis'in window))return;try{speechSynthesis.cancel();}catch{}const u=new SpeechSynthesisUtterance(String(text||''));u.lang='zh-TW';u.rate=rate;u.pitch=1;const voices=speechSynthesis.getVoices?.()||[],v=voices.find(x=>/^zh[-_]TW/i.test(x.lang))||voices.find(x=>/^zh/i.test(x.lang));if(v)u.voice=v;speechSynthesis.speak(u);}
  function toggleComplete(){const p=currentPassage(),x={...passageProgress(p.id)};x.completed=!x.completed;x.lastStudied=new Date().toISOString();state.progress.lessons[p.id]=x;saveProgress();render();}
  function preferredMime(){if(!window.MediaRecorder)return'';return['audio/mp4','audio/webm;codecs=opus','audio/webm','audio/ogg;codecs=opus'].find(x=>MediaRecorder.isTypeSupported?.(x))||'';}
  async function startRecording(){cleanupAudio();try{state.stream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true,autoGainControl:true}});const mime=preferredMime();state.recorder=mime?new MediaRecorder(state.stream,{mimeType:mime}):new MediaRecorder(state.stream);state.chunks=[];state.recorder.ondataavailable=e=>{if(e.data?.size)state.chunks.push(e.data);};state.recorder.onstop=()=>{const type=state.recorder?.mimeType||state.chunks[0]?.type||mime||'audio/webm';state.blob=new Blob(state.chunks,{type});if(state.url)URL.revokeObjectURL(state.url);state.url=URL.createObjectURL(state.blob);const a=$('readingAudio');a.src=state.url;a.hidden=false;$('readingPlaybackBtn').disabled=false;$('readingCheckBtn').disabled=!state.blob?.size;$('readingRecordStatus').textContent=tx().recorded;state.stream?.getTracks?.().forEach(x=>x.stop());state.stream=null;};state.recorder.start(250);$('readingRecordBtn').disabled=true;$('readingStopBtn').disabled=false;$('readingCheckBtn').disabled=true;$('readingRecordStatus').textContent=tx().recording;}catch(err){$('readingRecordStatus').textContent=tx().micError;}}
  function stopRecording(){if(state.recorder?.state==='recording')try{state.recorder.stop();}catch{};$('readingRecordBtn').disabled=false;$('readingStopBtn').disabled=true;}
  function cleanupAudio(){if(state.recorder?.state==='recording')try{state.recorder.stop();}catch{};state.stream?.getTracks?.().forEach(x=>x.stop());state.stream=null;state.recorder=null;state.chunks=[];state.blob=null;if(state.url){URL.revokeObjectURL(state.url);state.url=null;}const a=$('readingAudio');if(a){a.pause();a.removeAttribute('src');a.hidden=true;}if($('readingPlaybackBtn'))$('readingPlaybackBtn').disabled=true;if($('readingCheckBtn'))$('readingCheckBtn').disabled=true;if($('readingRecordBtn'))$('readingRecordBtn').disabled=false;if($('readingStopBtn'))$('readingStopBtn').disabled=true;if($('readingRecordStatus'))$('readingRecordStatus').textContent=tx().idle;if($('readingResult'))$('readingResult').hidden=true;}
  function normalizeChinese(s){return String(s||'').normalize('NFKC').replace(/[\s，。！？,.!?;；:：、'"“”‘’()（）/\-—]/g,'').toLowerCase();}
  function levenshtein(a,b){const prev=Array.from({length:b.length+1},(_,i)=>i),cur=new Array(b.length+1);for(let i=1;i<=a.length;i++){cur[0]=i;for(let j=1;j<=b.length;j++)cur[j]=Math.min(cur[j-1]+1,prev[j]+1,prev[j-1]+(a[i-1]===b[j-1]?0:1));for(let j=0;j<=b.length;j++)prev[j]=cur[j];}return prev[b.length];}
  function similarity(a,b){if(!a&&!b)return 1;if(!a||!b)return 0;return 1-levenshtein(a,b)/Math.max(a.length,b.length);}
  async function checkReading(){const t=tx(),p=currentPassage();if(!state.blob?.size){$('readingRecordStatus').textContent=t.noAudio;return;}const liveSession=await window.TOCFLAuth?.ensureSession?.();if(!liveSession?.user){$('readingRecordStatus').textContent=t.login;window.TOCFLAuth?.openAuth?.('login');return;}if(!window.TOCFLAuth?.transcribeWithGroq){$('readingRecordStatus').textContent=t.groq;return;}try{$('readingCheckBtn').disabled=true;$('readingRecordStatus').textContent=t.checking;const result=await window.TOCFLAuth.transcribeWithGroq(state.blob,fullText(p)),recognized=String(result?.text||'').trim();const score=Math.max(0,Math.min(100,Math.round(similarity(normalizeChinese(fullText(p)),normalizeChinese(recognized))*100)));$('readingResult').hidden=false;$('readingScore').textContent=String(score);$('readingRecognized').textContent=recognized||'—';$('readingScoreNote').textContent=t.scoreNote;$('readingResultTitle').textContent=t.result;$('readingRecognizedLabel').textContent=t.recognized;$('readingMatchLabel').textContent=t.textMatch;$('readingFeedback').textContent=score>=90?t.excellent:score>=70?t.good:t.retry;const prev=passageProgress(p.id),x={...prev,lastScore:score,bestScore:Math.max(Number(prev.bestScore||0),score),lastStudied:new Date().toISOString()};if(score>=90)x.completed=true;state.progress.lessons[p.id]=x;saveProgress();renderLessonList();$('readingBestScore').textContent=`${t.best}: ${x.bestScore}/100`;$('readingCompleteBtn').textContent=x.completed?t.completed:t.complete;$('readingCompleteBtn').classList.toggle('is-complete',Boolean(x.completed));$('readingRecordStatus').textContent=t.recorded;}catch(err){$('readingRecordStatus').textContent=err?.message||t.groq;}finally{$('readingCheckBtn').disabled=false;}}

  window.TOCFLReading={getProgress:()=>{loadProgress();return JSON.parse(JSON.stringify(state.progress));},applyProgress:value=>{if(value&&typeof value==='object'){localStorage.setItem(STORAGE_KEY,JSON.stringify(value));loadProgress();document.dispatchEvent(new CustomEvent('tocfl:reading-cloud-applied'));}},reset:()=>{localStorage.removeItem(STORAGE_KEY);state.progress={lessons:{},vocabulary:{},vocabularyWriting:{},lastLesson:1,lastPassageByLesson:{}};render();}};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
