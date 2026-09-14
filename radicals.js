'use strict';

(function(){
  const $=id=>document.getElementById(id);
  const getLang=()=>window.TOCFLApp?.getLanguage?.()||localStorage.getItem('tocfl-a1-ui-language-v2')||'vi';
  const pick=(obj,lang=getLang())=>obj?.[lang]??obj?.vi??obj?.en??'';

  const UI={
    vi:{tab:'Bộ thủ',title:'Bộ thủ & Họ chữ',sub:'Học từ cấu tạo: phần gợi nghĩa + phần gợi âm → chữ → từ → câu.',semantic:'Bộ gợi nghĩa',phonetic:'Họ âm',pinyin:'Pinyin gần âm Việt',search:'Tìm bộ, chữ, pinyin hoặc nghĩa…',listen:'Nghe',listenWord:'Nghe chữ',listenSentence:'Nghe câu',slow:'Chậm',initialTitle:'Thanh mẫu (âm đầu)',finalTitle:'Vận mẫu (phần vần)',specialTitle:'Quy tắc đặc biệt dễ nhầm',demoTitle:'Thử nhanh một Pinyin',demoHint:'Nhập ví dụ: qǐng, xué, lǜ, zhōngwén…',analyze:'Phân tích',why:'Vì sao dễ nhớ?',structure:'Cấu tạo',example:'Ví dụ',note:'Lưu ý: đây là cách phân tích để học và ghi nhớ. Không phải mọi chữ đều “sinh ra” trực tiếp từ bộ theo cách hiện đại; nhiều chữ là hình thanh, trong đó một phần gợi nghĩa và một phần gợi âm.',soundNote:'Gợi âm tiếng Việt chỉ là cầu nối ban đầu. Hãy ưu tiên nghe giọng zh-TW vì nhiều âm Mandarin không có bản tương đương chính xác trong tiếng Việt.',familyNote:'Họ âm cho thấy cùng một thành phần có thể lặp lại để gợi cách đọc, còn bộ bên trái/bên dưới thường đổi để gợi nghĩa.',all:'Tất cả',chooseRadical:'Chọn từng bộ để luyện',chooseHint:'Mỗi bộ được tách riêng. Chọn một bộ để học chữ, từ mở rộng và luyện viết riêng bộ đó.',practiceWriting:'Luyện viết bộ này',practiceHint:'Chọn chữ hoặc từ → xem thứ tự nét → bật Luyện nét để web kiểm tra thứ tự viết.',practiceTarget:'Chữ / từ muốn luyện',strokeOrder:'Thứ tự nét',startQuiz:'Luyện nét',rewrite:'Viết lại',showGuide:'Hiện mẫu',hideGuide:'Ẩn mẫu',writingReady:'Bấm “Luyện nét” rồi viết trực tiếp lên ô.',writingGood:'Hoàn thành đúng thứ tự nét!',writingMistake:'Nét này chưa đúng, thử lại nhé.',writerUnavailable:'Không tải được dữ liệu nét chữ. Hãy kiểm tra mạng rồi thử lại.',progress:'Tiến độ viết',coreChars:'Chữ chính',expandedWords:'Từ mở rộng',singleRadical:'Từng bộ'},
    en:{tab:'Components',title:'Radicals & Character Families',sub:'Learn structure: semantic clue + sound clue → character → word → sentence.',semantic:'Semantic radicals',phonetic:'Sound families',pinyin:'Vietnamese sound bridge',search:'Search radical, character, pinyin or meaning…',listen:'Listen',listenWord:'Character',listenSentence:'Sentence',slow:'Slow',initialTitle:'Initials',finalTitle:'Finals',specialTitle:'Easy-to-miss spelling rules',demoTitle:'Try a Pinyin',demoHint:'Type e.g. qǐng, xué, lǜ, zhōngwén…',analyze:'Analyze',why:'Why it helps',structure:'Structure',example:'Example',note:'This is a learning-oriented structural analysis. Not every character literally “grew” from its radical in a modern step-by-step way; many characters combine a semantic component with a phonetic component.',soundNote:'Vietnamese approximations are only a bridge. Prefer the zh-TW audio because many Mandarin sounds do not have exact Vietnamese equivalents.',familyNote:'Sound families show how one component can hint at pronunciation while another component changes the semantic field.',all:'All',chooseRadical:'Choose one radical to practise',chooseHint:'Each radical is separated. Pick one to study its characters, expanded vocabulary, and handwriting.',practiceWriting:'Practise writing this radical',practiceHint:'Choose a character or word → view stroke order → start stroke quiz to check your writing order.',practiceTarget:'Character / word',strokeOrder:'Stroke order',startQuiz:'Stroke quiz',rewrite:'Rewrite',showGuide:'Show model',hideGuide:'Hide model',writingReady:'Press “Stroke quiz” and write directly in the box.',writingGood:'Correct stroke order completed!',writingMistake:'That stroke is not right yet—try again.',writerUnavailable:'Stroke data could not be loaded. Check your connection and try again.',progress:'Writing progress',coreChars:'Core characters',expandedWords:'Expanded words',singleRadical:'One radical'},
    'zh-Hant':{tab:'部件',title:'部首・部件與字族',sub:'從結構學習：義符 + 聲符 → 字 → 詞 → 句子。',semantic:'義符部件',phonetic:'聲符字族',pinyin:'越南語近似音提示',search:'搜尋部件、字、拼音或意思…',listen:'聽',listenWord:'聽單字',listenSentence:'聽例句',slow:'慢速',initialTitle:'聲母',finalTitle:'韻母',specialTitle:'容易混淆的拼音規則',demoTitle:'快速分析拼音',demoHint:'例如輸入：qǐng、xué、lǜ、zhōngwén…',analyze:'分析',why:'為什麼好記？',structure:'結構',example:'例句',note:'這裡以學習與記憶為目的分析字形。不是所有漢字都能用現代「加一個部首就產生新字」來解釋；很多漢字屬於形聲結構，由義符提示意思、聲符提示讀音。',soundNote:'越南語近似音只作為入門橋樑。許多華語語音沒有完全相同的越南語對應音，請以 zh-TW 音檔為準。',familyNote:'聲符字族可以看出同一聲符如何提示讀音，而其他部件改變字義範圍。',all:'全部',chooseRadical:'選一個部件單獨練習',chooseHint:'每個部件已分開。選一個部件，集中學習相關字、延伸詞與書寫。',practiceWriting:'練寫這個部件',practiceHint:'選擇單字或詞語 → 看筆順 → 開始筆順練習，系統會檢查書寫順序。',practiceTarget:'要練的字／詞',strokeOrder:'筆順',startQuiz:'筆順練習',rewrite:'重寫',showGuide:'顯示字形',hideGuide:'隱藏字形',writingReady:'按「筆順練習」後，直接在方格內書寫。',writingGood:'筆順完成正確！',writingMistake:'這一筆還不對，再試一次。',writerUnavailable:'無法載入筆順資料，請檢查網路後再試。',progress:'書寫進度',coreChars:'核心字',expandedWords:'延伸詞',singleRadical:'單一部件'}
  };

  let radicals=[];
  let expansionTrees={};
  let soundFamilies=[];
  let pinyinRows={initials:[],finals:[],specials:[]};
  let radicalDataLoaded=false;
  let radicalDataError='';

  const expansionUI={"vi":{"title":"Mở rộng từ vựng","hint":"Mỗi nhánh lấy một chữ làm gốc rồi phát triển thành các từ ghép thường dùng. Hãy học theo cây thay vì học rời từng từ.","words":"từ"},"en":{"title":"Vocabulary expansion","hint":"Each branch uses one character as a root and expands into common compounds. Learn it as a tree instead of isolated words.","words":"words"},"zh-Hant":{"title":"詞彙擴展","hint":"每個分支以一個核心字出發，再延伸成常用複合詞。用樹狀方式學，比孤立背單字更好記。","words":"個詞"}};
  /* expansionTrees loaded from ./data/radicals.json */

  /* soundFamilies loaded from ./data/radicals.json */

  /* pinyinRows loaded from ./data/radicals.json */

  function validRadicalData(data){
    return data && Array.isArray(data.radicals) && data.expansionTrees && typeof data.expansionTrees==='object' && Array.isArray(data.soundFamilies) && data.pinyinRows && typeof data.pinyinRows==='object';
  }
  async function loadRadicalData(){
    try{
      const res=await fetch('./data/radicals.json',{cache:'no-store'});
      if(!res.ok)throw new Error(`HTTP ${res.status}`);
      const data=await res.json();
      if(!validRadicalData(data))throw new Error('Invalid radicals.json structure');
      radicals=data.radicals;
      expansionTrees=data.expansionTrees;
      soundFamilies=data.soundFamilies;
      pinyinRows=data.pinyinRows;
      radicalDataLoaded=true;
      radicalDataError='';
      if(selectedRadicalKey!=='all' && !radicals.some(r=>r.key===selectedRadicalKey)){
        selectedRadicalKey=radicals[0]?.key||'all';
        try{localStorage.setItem(SELECTED_RADICAL_KEY,selectedRadicalKey);}catch{}
      }
      window.TOCFLRadicalData={version:data.version||'',count:radicals.length};
      return true;
    }catch(err){
      console.error('Cannot load radical data:',err);
      radicalDataLoaded=false;
      radicalDataError=String(err?.message||err||'Unknown error');
      return false;
    }
  }


  function speak(text,rate=.74){
    if(!('speechSynthesis' in window))return;
    speechSynthesis.cancel();
    const u=new SpeechSynthesisUtterance(text);u.lang='zh-TW';u.rate=rate;u.pitch=1;
    const voices=speechSynthesis.getVoices();
    const v=voices.find(x=>x.lang?.toLowerCase()==='zh-tw')||voices.find(x=>x.lang?.toLowerCase().startsWith('zh'));
    if(v)u.voice=v;speechSynthesis.speak(u);
  }
  function audioButtons(text,ui,kind='listen'){
    const wrap=document.createElement('div');wrap.className='rad-audio-actions';
    const normal=document.createElement('button');normal.type='button';normal.className='rad-listen';normal.textContent=`🔊 ${kind==='word'?ui.listenWord:kind==='sentence'?ui.listenSentence:ui.listen}`;normal.addEventListener('click',()=>speak(text,.74));
    const slow=document.createElement('button');slow.type='button';slow.textContent=`🐢 ${ui.slow}`;slow.addEventListener('click',()=>speak(text,.5));
    wrap.append(normal,slow);return wrap;
  }
  function pinyinHintNode(pinyin){
    const box=document.createElement('div');box.className='rad-pinyin-hint';
    if(getLang()==='vi' && window.TOCFLPinyin){box.textContent='🇻🇳 '+window.TOCFLPinyin.compactGuide(pinyin);}
    else box.hidden=true;
    return box;
  }

  function expansionMeaning(word){
    const lang=getLang();
    return lang==='en'?word[3]:lang==='zh-Hant'?word[4]:word[2];
  }
  function branchMeaning(branch){
    const lang=getLang();
    return lang==='en'?branch[3]:lang==='zh-Hant'?branch[4]:branch[2];
  }
  function branchWhy(branch){
    const lang=getLang(), root=branch[0];
    if(lang==='en')return `Keep ${root} as the root, then combine it with other characters to grow a practical vocabulary branch.`;
    if(lang==='zh-Hant')return `保留「${root}」作為核心字，再和其他字組合，形成一組實用詞彙。`;
    return `Giữ chữ ${root} làm gốc rồi ghép thêm chữ khác để phát triển thành một nhánh từ vựng thực dụng.`;
  }
  function expansionSection(r,ui){
    const branches=expansionTrees[r.key]||[];
    if(!branches.length)return document.createDocumentFragment();
    const lang=getLang();
    const labels=expansionUI[lang]||expansionUI.vi;
    const total=branches.reduce((n,b)=>n+b[5].length,0);
    const details=document.createElement('details');
    details.className='rad-word-expansion';
    const summary=document.createElement('summary');
    summary.innerHTML=`<span>🌱 ${labels.title}</span><strong>${total} ${labels.words}</strong>`;
    details.append(summary);
    const intro=document.createElement('p');intro.className='rad-expansion-hint';intro.textContent=labels.hint;details.append(intro);
    const grid=document.createElement('div');grid.className='rad-expansion-grid';
    branches.forEach(branch=>{
      const group=document.createElement('section');group.className='rad-expansion-branch';
      const head=document.createElement('div');head.className='rad-expansion-branch-head';
      const core=document.createElement('div');core.className='rad-expansion-root';core.textContent=branch[0];
      const meta=document.createElement('div');meta.innerHTML=`<strong>${branch[1]}</strong><span>${branchMeaning(branch)}</span>`;
      head.append(core,meta,audioButtons(branch[0],ui,'word'));
      const why=document.createElement('p');why.className='rad-expansion-why';why.textContent=branchWhy(branch);
      const list=document.createElement('div');list.className='rad-expansion-words';
      branch[5].forEach(word=>{
        const row=document.createElement('div');row.className='rad-expansion-word';
        const main=document.createElement('div');main.className='rad-expansion-word-main';
        main.innerHTML=`<strong>${word[0]}</strong><span>${word[1]}</span><small>${expansionMeaning(word)}</small>`;
        row.append(main,audioButtons(word[0],ui));
        list.append(row);
      });
      group.append(head,why,list);grid.append(group);
    });
    details.append(grid);
    return details;
  }

  const WRITING_PROGRESS_KEY='tocfl-radical-writing-v1';
  const SELECTED_RADICAL_KEY='tocfl-radical-selected-v1';
  let selectedRadicalKey=localStorage.getItem(SELECTED_RADICAL_KEY)||'person';
  const radicalWriterInstances=[];

  function hanziChars(text){
    return Array.from(String(text||'')).filter(ch=>/[\u3400-\u9FFF\uF900-\uFAFF]/.test(ch));
  }
  function uniqueTexts(items){
    const seen=new Set();
    return items.filter(item=>{const key=item.text;if(!key||seen.has(key))return false;seen.add(key);return true;});
  }
  function writingTargets(r){
    const items=[];
    const primary=r.radical.split('/')[0].trim();
    if(primary)items.push({text:primary,p:r.pinyin,m:pick(r.meaning),group:'core'});
    r.chars.forEach(ch=>items.push({text:ch.h,p:ch.p,m:pick(ch.m),group:'core'}));
    (expansionTrees[r.key]||[]).forEach(branch=>{
      items.push({text:branch[0],p:branch[1],m:branchMeaning(branch),group:'core'});
      branch[5].forEach(word=>items.push({text:word[0],p:word[1],m:expansionMeaning(word),group:'expanded'}));
    });
    return uniqueTexts(items);
  }
  function coreWritingChars(r){
    const chars=[];
    chars.push(...hanziChars(r.radical.split('/')[0].trim()));
    r.chars.forEach(ch=>chars.push(...hanziChars(ch.h)));
    (expansionTrees[r.key]||[]).forEach(branch=>chars.push(...hanziChars(branch[0])));
    return [...new Set(chars)];
  }
  function loadWritingProgress(){
    try{return JSON.parse(localStorage.getItem(WRITING_PROGRESS_KEY)||'{}')||{};}catch{return {};}
  }
  function saveWritingProgress(data){
    try{localStorage.setItem(WRITING_PROGRESS_KEY,JSON.stringify(data));}catch{}
  }
  function markWritingComplete(radicalKey,ch){
    const data=loadWritingProgress();
    data[radicalKey]=data[radicalKey]||{};
    data[radicalKey][ch]=(data[radicalKey][ch]||0)+1;
    saveWritingProgress(data);
  }
  function writingProgress(r){
    const data=loadWritingProgress()[r.key]||{};
    const core=coreWritingChars(r);
    return {done:core.filter(ch=>data[ch]>0).length,total:core.length};
  }
  function progressText(r,ui){
    const p=writingProgress(r);
    return `${ui.progress}: ${p.done}/${p.total}`;
  }
  function updateWritingProgressBadges(r,ui){
    document.querySelectorAll(`[data-rad-progress="${r.key}"]`).forEach(el=>{el.textContent=progressText(r,ui);});
  }
  function radicalCharDataLoader(char,onComplete,onError){
    fetch(`https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0.1/${encodeURIComponent(char)}.json`,{cache:'force-cache'})
      .then(res=>{if(!res.ok)throw new Error(`HTTP ${res.status}`);return res.json();})
      .then(onComplete).catch(onError);
  }
  function makePracticeWriter(host,ch,ui,r,status){
    if(typeof window.HanziWriter==='undefined'){
      status.textContent=ui.writerUnavailable;status.className='rad-writing-status is-error';return null;
    }
    const size=Math.max(170,Math.min(238,(window.innerWidth||320)-86));
    let writer;
    try{
      writer=window.HanziWriter.create(host,ch,{
        width:size,height:size,padding:12,
        showOutline:true,showCharacter:true,
        strokeAnimationSpeed:1,delayBetweenStrokes:180,
        strokeColor:'#173b37',radicalColor:'#0f766e',outlineColor:'#cbded9',
        drawingColor:'#db3a34',drawingWidth:5,
        charDataLoader:radicalCharDataLoader,
        onLoadCharDataError:()=>{status.textContent=ui.writerUnavailable;status.className='rad-writing-status is-error';}
      });
      radicalWriterInstances.push(writer);
      return writer;
    }catch(err){
      console.warn('Radical writing writer unavailable:',ch,err);
      status.textContent=ui.writerUnavailable;status.className='rad-writing-status is-error';return null;
    }
  }
  function renderWritingTarget(container,target,r,ui){
    container.innerHTML='';
    const targetHead=document.createElement('div');targetHead.className='rad-writing-target-head';
    targetHead.innerHTML=`<div><strong>${target.text}</strong><span>${target.p||''}</span><small>${target.m||''}</small></div>`;
    targetHead.append(audioButtons(target.text,ui,'word'));container.append(targetHead);
    const chars=hanziChars(target.text);
    const grid=document.createElement('div');grid.className='rad-writing-grid';container.append(grid);
    chars.forEach(ch=>{
      const unit=document.createElement('article');unit.className='rad-writing-unit';
      const label=document.createElement('div');label.className='rad-writing-unit-label';label.textContent=ch;
      const host=document.createElement('div');host.className='rad-writing-box';
      const status=document.createElement('div');status.className='rad-writing-status';status.textContent=ui.writingReady;
      const actions=document.createElement('div');actions.className='rad-writing-actions';
      const animate=document.createElement('button');animate.type='button';animate.textContent=`▶ ${ui.strokeOrder}`;
      const quiz=document.createElement('button');quiz.type='button';quiz.className='primary';quiz.textContent=`✍ ${ui.startQuiz}`;
      const reset=document.createElement('button');reset.type='button';reset.textContent=`↺ ${ui.rewrite}`;
      const guide=document.createElement('button');guide.type='button';guide.textContent=`👁 ${ui.hideGuide}`;
      actions.append(animate,quiz,reset,guide);unit.append(label,host,actions,status);grid.append(unit);
      let guideVisible=true;
      const writer=makePracticeWriter(host,ch,ui,r,status);
      if(!writer){animate.disabled=quiz.disabled=reset.disabled=guide.disabled=true;return;}
      animate.addEventListener('click',()=>{
        try{writer.cancelQuiz();writer.showOutline({duration:0});writer.showCharacter({duration:0});writer.animateCharacter();status.textContent=ui.strokeOrder;}catch{}
      });
      quiz.addEventListener('click',()=>{
        status.textContent=ui.writingReady;status.className='rad-writing-status';
        try{
          writer.cancelQuiz();
          writer.quiz({
            showHintAfterMisses:2,highlightOnComplete:true,
            onMistake:()=>{status.textContent=ui.writingMistake;status.className='rad-writing-status is-warn';},
            onCorrectStroke:()=>{status.textContent=ui.writingReady;status.className='rad-writing-status';},
            onComplete:()=>{status.textContent=ui.writingGood;status.className='rad-writing-status is-good';markWritingComplete(r.key,ch);updateWritingProgressBadges(r,ui);}
          });
        }catch(err){console.warn('Hanzi quiz error',err);status.textContent=ui.writerUnavailable;status.className='rad-writing-status is-error';}
      });
      reset.addEventListener('click',()=>{
        try{writer.cancelQuiz();writer.showOutline({duration:0});if(guideVisible)writer.showCharacter({duration:0});else writer.hideCharacter({duration:0});status.textContent=ui.writingReady;status.className='rad-writing-status';}catch{}
      });
      guide.addEventListener('click',()=>{
        guideVisible=!guideVisible;
        try{guideVisible?writer.showCharacter({duration:120}):writer.hideCharacter({duration:120});}catch{}
        guide.textContent=`👁 ${guideVisible?ui.hideGuide:ui.showGuide}`;
      });
    });
  }
  function writingPracticePanel(r,ui){
    const details=document.createElement('details');details.className='rad-writing-panel';
    const summary=document.createElement('summary');
    summary.innerHTML=`<span>✍ ${ui.practiceWriting}</span><strong data-rad-progress="${r.key}">${progressText(r,ui)}</strong>`;
    details.append(summary);
    const body=document.createElement('div');body.className='rad-writing-panel-body';details.append(body);
    let built=false;
    details.addEventListener('toggle',()=>{
      if(!details.open||built)return;built=true;
      const hint=document.createElement('p');hint.className='rad-writing-hint';hint.textContent=ui.practiceHint;
      const row=document.createElement('label');row.className='rad-writing-select-row';
      const title=document.createElement('span');title.textContent=ui.practiceTarget;
      const select=document.createElement('select');
      const targets=writingTargets(r);
      const coreGroup=document.createElement('optgroup');coreGroup.label=ui.coreChars;
      const expGroup=document.createElement('optgroup');expGroup.label=ui.expandedWords;
      targets.forEach((target,idx)=>{
        const option=document.createElement('option');option.value=String(idx);option.textContent=`${target.text} · ${target.p||''} · ${target.m||''}`;
        (target.group==='expanded'?expGroup:coreGroup).append(option);
      });
      select.append(coreGroup,expGroup);
      const saved=localStorage.getItem(`tocfl-radical-writing-target-${r.key}`);
      if(saved!==null&&targets[Number(saved)])select.value=saved;
      row.append(title,select);body.append(hint,row);
      const stage=document.createElement('div');stage.className='rad-writing-stage';body.append(stage);
      const draw=()=>{
        const idx=Number(select.value)||0;
        try{localStorage.setItem(`tocfl-radical-writing-target-${r.key}`,String(idx));}catch{}
        renderWritingTarget(stage,targets[idx]||targets[0],r,ui);
      };
      select.addEventListener('change',draw);draw();
    });
    return details;
  }
  function radicalSearchText(r){
    const exp=(expansionTrees[r.key]||[]).map(b=>`${b.slice(0,5).join(' ')} ${b[5].flat().join(' ')}`).join(' ');
    return `${r.radical} ${r.pinyin} ${pick(r.meaning)} ${r.chars.map(x=>`${x.h} ${x.p} ${pick(x.m)}`).join(' ')} ${exp}`.toLowerCase();
  }
  function radicalChooser(ui,query=''){
    const section=document.createElement('section');section.className='rad-picker card';
    const intro=document.createElement('div');intro.className='rad-picker-head';intro.innerHTML=`<div><h3>${ui.chooseRadical}</h3><p>${ui.chooseHint}</p></div>`;section.append(intro);
    const grid=document.createElement('div');grid.className='rad-picker-grid';
    const visible=radicals.filter(r=>!query||radicalSearchText(r).includes(query));
    if(!query){
      const all=document.createElement('button');all.type='button';all.className='rad-picker-item rad-picker-all';all.classList.toggle('is-active',selectedRadicalKey==='all');all.innerHTML=`<strong>∞</strong><span>${ui.all}</span>`;
      all.addEventListener('click',()=>{selectedRadicalKey='all';localStorage.setItem(SELECTED_RADICAL_KEY,'all');renderContent();});grid.append(all);
    }
    visible.forEach(r=>{
      const b=document.createElement('button');b.type='button';b.className='rad-picker-item';b.classList.toggle('is-active',selectedRadicalKey===r.key);
      const p=writingProgress(r);
      b.innerHTML=`<strong>${r.radical}</strong><span>${r.pinyin} · ${pick(r.meaning)}</span><small data-rad-progress="${r.key}">${ui.progress}: ${p.done}/${p.total}</small>`;
      b.addEventListener('click',()=>{selectedRadicalKey=r.key;localStorage.setItem(SELECTED_RADICAL_KEY,r.key);renderContent();});grid.append(b);
    });
    section.append(grid);return section;
  }

  function charCard(ch,ui){
    const card=document.createElement('article');card.className='rad-char-card';
    const top=document.createElement('div');top.className='rad-char-top';
    const hanzi=document.createElement('div');hanzi.className='rad-char-hanzi';hanzi.textContent=ch.h;
    const info=document.createElement('div');info.className='rad-char-info';
    const p=document.createElement('strong');p.className='rad-char-pinyin';p.textContent=ch.p;
    const m=document.createElement('span');m.textContent=pick(ch.m);
    info.append(p,m);top.append(hanzi,info);
    const structure=document.createElement('div');structure.className='rad-structure';structure.innerHTML=`<span>${ui.structure}</span><strong>${ch.s}</strong>`;
    const why=document.createElement('div');why.className='rad-why';why.innerHTML=`<strong>${ui.why}</strong><p>${pick(ch.w)}</p>`;
    const ex=document.createElement('div');ex.className='rad-example';ex.innerHTML=`<strong>${ui.example}</strong><div class="rad-example-zh">${ch.ex[0]}</div><div class="rad-example-py">${ch.ex[1]}</div><div>${pick(ch.ex[2])}</div>`;
    card.append(top,pinyinHintNode(ch.p),audioButtons(ch.h,ui,'word'),structure,why,ex,audioButtons(ch.ex[0],ui,'sentence'));
    return card;
  }
  function radicalCard(r,ui){
    const card=document.createElement('section');card.className='rad-group-card';const expSearch=(expansionTrees[r.key]||[]).map(b=>`${b.slice(0,5).join(' ')} ${b[5].flat().join(' ')}`).join(' ');card.dataset.search=`${r.radical} ${r.pinyin} ${pick(r.meaning)} ${r.chars.map(x=>`${x.h} ${x.p} ${pick(x.m)}`).join(' ')} ${expSearch}`.toLowerCase();
    const head=document.createElement('div');head.className='rad-group-head';
    const symbol=document.createElement('div');symbol.className='rad-symbol';symbol.textContent=r.radical;
    const meta=document.createElement('div');meta.innerHTML=`<div class="rad-icon">${r.icon}</div><strong>${r.pinyin}</strong><span>${pick(r.meaning)}</span>`;
    head.append(symbol,meta,audioButtons(r.radical.split('/')[0].trim(),ui,'word'));
    const origin=document.createElement('p');origin.className='rad-origin';origin.textContent=pick(r.origin);
    const chars=document.createElement('div');chars.className='rad-char-grid';r.chars.forEach(ch=>chars.append(charCard(ch,ui)));
    card.append(head,origin,writingPracticePanel(r,ui),chars,expansionSection(r,ui));return card;
  }
  function renderSemantic(root,ui,query=''){
    root.innerHTML='';
    const note=document.createElement('div');note.className='rad-learning-note';note.textContent=ui.note;root.append(note,radicalChooser(ui,query));
    const grid=document.createElement('div');grid.className='rad-group-grid';
    let list=radicals.filter(r=>!query||radicalSearchText(r).includes(query));
    if(!query&&selectedRadicalKey!=='all')list=list.filter(r=>r.key===selectedRadicalKey);
    list.forEach(r=>grid.append(radicalCard(r,ui)));
    if(!list.length){const empty=document.createElement('div');empty.className='rad-learning-note';empty.textContent=getLang()==='en'?'No matching radical found.':getLang()==='zh-Hant'?'找不到符合的部件。':'Không tìm thấy bộ phù hợp.';grid.append(empty);}
    root.append(grid);
  }
  function renderFamilies(root,ui,query=''){
    root.innerHTML=`<div class="rad-learning-note">${ui.familyNote}</div>`;
    const grid=document.createElement('div');grid.className='rad-family-grid';
    soundFamilies.forEach(f=>{
      const search=`${f.base} ${f.p} ${pick(f.meaning)} ${f.items.flat().join(' ')}`.toLowerCase();if(query&&!search.includes(query))return;
      const card=document.createElement('section');card.className='rad-family-card';
      const head=document.createElement('div');head.className='rad-family-head';head.innerHTML=`<div class="rad-family-base">${f.base}</div><div><strong>${f.p}</strong><span>${pick(f.meaning)}</span></div>`;head.append(audioButtons(f.base,ui));
      const chain=document.createElement('div');chain.className='rad-family-chain';
      f.items.forEach(([h,p,s,m])=>{
        const item=document.createElement('div');item.className='rad-family-item';item.innerHTML=`<div class="rad-family-char">${h}</div><div><strong>${p}</strong><span>${pick(m)}</span><small>${s}</small></div>`;
        item.append(audioButtons(h,ui,'word'));chain.append(item);
      });
      card.append(head,chain);grid.append(card);
    });root.append(grid);
  }
  function renderPinyin(root,ui,query=''){
    root.innerHTML=`<div class="rad-learning-note">${ui.soundNote}</div>`;
    const sections=[[ui.initialTitle,'initials'],[ui.finalTitle,'finals'],[ui.specialTitle,'specials']];
    sections.forEach(([title,key])=>{
      const box=document.createElement('section');box.className='pinyin-guide-section';box.innerHTML=`<h3>${title}</h3>`;
      const table=document.createElement('div');table.className='pinyin-guide-grid';
      pinyinRows[key].forEach(row=>{
        const search=row.join(' ').toLowerCase();if(query&&!search.includes(query))return;
        const item=document.createElement('div');item.className='pinyin-guide-row';item.innerHTML=`<strong>${row[0]}</strong><span>${row[1]}</span><small>${row[2]}</small>`;table.append(item);
      });box.append(table);root.append(box);
    });
    const demo=document.createElement('section');demo.className='pinyin-demo card';
    demo.innerHTML=`<h3>${ui.demoTitle}</h3><p class="small muted">${ui.demoHint}</p><div class="pinyin-demo-row"><input id="pinyinDemoInput" value="qǐng" /><button id="pinyinDemoBtn" type="button">${ui.analyze}</button></div><div id="pinyinDemoOutput"></div>`;
    root.append(demo);
    const run=()=>{const val=$('pinyinDemoInput')?.value||'';const out=$('pinyinDemoOutput');if(!out)return;out.innerHTML='';(window.TOCFLPinyin?.guideRows(val)||[]).forEach(g=>{const d=document.createElement('div');d.className='pinyin-demo-result';d.innerHTML=`<strong>${g.raw}</strong><span>${g.text}</span>`;out.append(d);});};
    $('pinyinDemoBtn')?.addEventListener('click',run);$('pinyinDemoInput')?.addEventListener('input',run);run();
  }

  let mode='semantic'; let query='';
  function render(){
    const app=$('radicalsApp');if(!app)return;const lang=getLang();const ui=UI[lang]||UI.vi;
    const tab=$('radicalsTabLabel');if(tab)tab.textContent=ui.tab;
    app.innerHTML=`<section class="rad-hero card"><div><div class="eyebrow">CHARACTER MAP</div><h2>${ui.title}</h2><p>${ui.sub}</p></div><div class="rad-hero-model"><span>義</span><b>+</b><span>音</span><b>→</b><strong>字</strong></div></section><section class="rad-controls card"><div class="rad-mode-tabs"><button data-rad-mode="semantic">🧩 ${ui.semantic}</button><button data-rad-mode="phonetic">🔊 ${ui.phonetic}</button><button data-rad-mode="pinyin">🇻🇳 ${ui.pinyin}</button></div><input id="radicalSearch" type="search" placeholder="${ui.search}" value="${query.replace(/"/g,'&quot;')}" /></section><div id="radicalsContent"></div>`;
    app.querySelectorAll('[data-rad-mode]').forEach(b=>{b.classList.toggle('is-active',b.dataset.radMode===mode);b.addEventListener('click',()=>{mode=b.dataset.radMode;renderContent();});});
    $('radicalSearch')?.addEventListener('input',e=>{query=String(e.target.value||'').trim().toLowerCase();renderContent();});
    renderContent();
  }
  function renderContent(){const root=$('radicalsContent');if(!root)return;const ui=UI[getLang()]||UI.vi;document.querySelectorAll('[data-rad-mode]').forEach(b=>b.classList.toggle('is-active',b.dataset.radMode===mode));if(mode==='semantic')renderSemantic(root,ui,query);else if(mode==='phonetic')renderFamilies(root,ui,query);else renderPinyin(root,ui,query);}
  function renderDataError(){
    const app=$('radicalsApp');if(!app)return;
    const lang=getLang();
    const title=lang==='en'?'Radical data could not be loaded':lang==='zh-Hant'?'無法載入部件資料':'Không tải được dữ liệu bộ thủ';
    const hint=lang==='en'?'Check data/radicals.json and refresh the page.':lang==='zh-Hant'?'請檢查 data/radicals.json 後重新整理。':'Hãy kiểm tra file data/radicals.json rồi tải lại trang.';
    app.innerHTML=`<section class="card"><h2>${title}</h2><p>${hint}</p><pre>${radicalDataError}</pre></section>`;
  }
  async function initRadicals(){
    const ok=await loadRadicalData();
    if(ok)render();else renderDataError();
  }
  document.addEventListener('tocfl:language-changed',()=>{if(radicalDataLoaded)render();else if(radicalDataError)renderDataError();});
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initRadicals);else initRadicals();
})();
