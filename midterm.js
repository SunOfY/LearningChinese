(()=>{
'use strict';
const DATA_URL='./data/midterm_l1.json';
const KEY='tocfl-midterm-progress-v1';
const $=id=>document.getElementById(id);
let data=null;
let state=loadState();
let timerHandle=null;

const UI={
  vi:{title:'🎯 Ôn giữa kỳ',sub:'時代華語 第一冊 · 第一課〈新同學〉',review:'Ôn theo từng phần',mock:'Thi thử 105 phút',resume:'Tiếp tục bài thi',start:'Bắt đầu',back:'← Tổng quan',prev:'← Trước',next:'Tiếp →',submit:'Nộp bài',listen:'🔊 Nghe',listenChoices:'Nghe đáp án',showPinyin:'Hiện Pinyin',showMeaning:'Hiện nghĩa Việt',done:'Đã làm',correct:'Đúng',answer:'Đáp án',yourAnswer:'Bạn chọn',notDone:'Chưa làm',reset:'Làm lại phần này',sourceNote:'Cấu trúc ôn tập bám theo file mẫu giáo viên. Các câu trong file chỉ là ví dụ, không phải đề thi thật.',traditional:'Bài thi yêu cầu viết toàn bộ đáp án bằng chữ Phồn thể.',scope:'Phạm vi',time:'Thời gian',progress:'Tiến độ',mockTitle:'Thi thử giữa kỳ · Lesson 1',finishConfirm:'Nộp bài bây giờ? Sau khi nộp sẽ hiện điểm và đáp án.',newMock:'Tạo đề mới',history:'Lịch sử thi thử',noHistory:'Chưa có lần thi thử nào.',practiceHint:'Ở chế độ ôn tập, bạn có thể bật/tắt Pinyin và nghĩa Việt. Chế độ thi thử sẽ ẩn hai gợi ý này.',sections:{tones:'聽力 A · Thanh điệu',listenPic:'聽力 B · Nghe + nhìn hình',listenDlg:'聽力 C · Nghe hội thoại + chọn hình',vocab:'生詞看圖 · Từ vựng nhìn hình',sentence:'看句子選圖 · Đọc câu chọn hình',dialogue:'課文填空 · Điền hội thoại',grammar:'語法 · Ngữ pháp'}},
  en:{title:'🎯 Midterm Review',sub:'Modern Chinese Book 1 · Lesson 1',review:'Practice by section',mock:'105-minute mock exam',resume:'Resume mock exam',start:'Start',back:'← Overview',prev:'← Previous',next:'Next →',submit:'Submit',listen:'🔊 Listen',listenChoices:'Listen to answers',showPinyin:'Show Pinyin',showMeaning:'Show Vietnamese meaning',done:'Done',correct:'Correct',answer:'Answer',yourAnswer:'Your answer',notDone:'Not answered',reset:'Reset this section',sourceNote:'The practice structure follows the teacher sample. The sample questions are examples only, not the real exam.',traditional:'The exam requires Traditional Chinese characters for all written answers.',scope:'Scope',time:'Time',progress:'Progress',mockTitle:'Lesson 1 Midterm Mock Exam',finishConfirm:'Submit now? Your score and answers will be shown after submission.',newMock:'New mock exam',history:'Mock history',noHistory:'No mock attempts yet.',practiceHint:'Practice mode lets you toggle Pinyin and Vietnamese meaning. Mock mode hides both hints.',sections:{tones:'Listening A · Tones',listenPic:'Listening B · Picture + audio',listenDlg:'Listening C · Dialogue + picture',vocab:'Vocabulary · Match picture',sentence:'Sentence · Choose picture',dialogue:'Dialogue fill-in',grammar:'Grammar'}},
  'zh-Hant':{title:'🎯 期中複習',sub:'時代華語 第一冊 · 第一課〈新同學〉',review:'分項練習',mock:'105 分鐘模擬考',resume:'繼續模擬考',start:'開始',back:'← 回總覽',prev:'← 上一題',next:'下一題 →',submit:'交卷',listen:'🔊 聽',listenChoices:'聽選項',showPinyin:'顯示拼音',showMeaning:'顯示越南語意思',done:'已作答',correct:'答對',answer:'答案',yourAnswer:'你的答案',notDone:'未作答',reset:'重做這一部分',sourceNote:'練習結構依老師提供的考試範例製作；範例題不是正式考題。',traditional:'考試要求所有答案使用繁體字。',scope:'範圍',time:'時間',progress:'進度',mockTitle:'第一課期中模擬考',finishConfirm:'現在交卷嗎？交卷後會顯示分數與答案。',newMock:'建立新模擬考',history:'模擬考紀錄',noHistory:'目前沒有模擬考紀錄。',practiceHint:'分項練習可自由開關拼音與越南語；模擬考會隱藏提示。',sections:{tones:'聽力 A · 聲調',listenPic:'聽力 B · 看圖選答案',listenDlg:'聽力 C · 聽對話選圖',vocab:'生詞看圖',sentence:'看句子選圖',dialogue:'課文填空',grammar:'語法'}}
};
function lang(){return window.TOCFLApp?.getLanguage?.()||localStorage.getItem('tocfl-language')||'vi';}
function tr(){return UI[lang()]||UI.vi;}
function esc(s){return String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
function shuffle(a){const x=[...a];for(let i=x.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[x[i],x[j]]=[x[j],x[i]];}return x;}
function sample(a,n){return shuffle(a).slice(0,Math.min(n,a.length));}
function hashSeed(s){let h=2166136261;for(const ch of String(s)){h^=ch.charCodeAt(0);h=Math.imul(h,16777619);}return h>>>0;}
function stableShuffle(a,seed){const x=[...a];let v=hashSeed(seed)||1;const rnd=()=>{v=(Math.imul(v,1664525)+1013904223)>>>0;return v/4294967296;};for(let i=x.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));[x[i],x[j]]=[x[j],x[i]];}return x;}
function loadState(){try{const x=JSON.parse(localStorage.getItem(KEY)||'null');if(x&&typeof x==='object')return normalize(x);}catch{}return normalize({});}
function normalize(x){return {version:1,view:x.view||'overview',practice:x.practice&&typeof x.practice==='object'?x.practice:{},settings:{pinyin:Boolean(x.settings?.pinyin),meaning:Boolean(x.settings?.meaning)},mock:x.mock&&typeof x.mock==='object'?x.mock:null,history:Array.isArray(x.history)?x.history.slice(0,20):[]};}
function save(){localStorage.setItem(KEY,JSON.stringify(state));document.dispatchEvent(new CustomEvent('tocfl:state-changed'));}
function getProgress(section){if(!state.practice[section])state.practice[section]={index:0,answers:{}};if(!state.practice[section].answers)state.practice[section].answers={};return state.practice[section];}
function imageItem(id){return data.image_vocab.find(x=>x.id===id);}
function imgHtml(id,cls='midterm-picture'){const it=imageItem(id);return it?`<img class="${cls}" src="./${esc(it.image)}" alt="${esc(it.zh)}" loading="lazy">`:'';}
function speak(text,rate=.86){if(!('speechSynthesis'in window))return;window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(String(text||''));u.lang='zh-TW';u.rate=rate;const voices=window.speechSynthesis.getVoices?.()||[];const tw=voices.find(v=>/zh[-_]TW/i.test(v.lang))||voices.find(v=>/^zh/i.test(v.lang));if(tw)u.voice=tw;window.speechSynthesis.speak(u);}
function speakSequence(lines){if(!('speechSynthesis'in window))return;window.speechSynthesis.cancel();const arr=[...lines];const next=()=>{if(!arr.length)return;const u=new SpeechSynthesisUtterance(arr.shift());u.lang='zh-TW';u.rate=.86;u.onend=()=>setTimeout(next,180);const voices=window.speechSynthesis.getVoices?.()||[];const tw=voices.find(v=>/zh[-_]TW/i.test(v.lang))||voices.find(v=>/^zh/i.test(v.lang));if(tw)u.voice=tw;window.speechSynthesis.speak(u);};next();}
const toneMap={
  'ā':['ā','á','ǎ','à'],'á':['ā','á','ǎ','à'],'ǎ':['ā','á','ǎ','à'],'à':['ā','á','ǎ','à'],
  'ē':['ē','é','ě','è'],'é':['ē','é','ě','è'],'ě':['ē','é','ě','è'],'è':['ē','é','ě','è'],
  'ī':['ī','í','ǐ','ì'],'í':['ī','í','ǐ','ì'],'ǐ':['ī','í','ǐ','ì'],'ì':['ī','í','ǐ','ì'],
  'ō':['ō','ó','ǒ','ò'],'ó':['ō','ó','ǒ','ò'],'ǒ':['ō','ó','ǒ','ò'],'ò':['ō','ó','ǒ','ò'],
  'ū':['ū','ú','ǔ','ù'],'ú':['ū','ú','ǔ','ù'],'ǔ':['ū','ú','ǔ','ù'],'ù':['ū','ú','ǔ','ù'],
  'ǖ':['ǖ','ǘ','ǚ','ǜ'],'ǘ':['ǖ','ǘ','ǚ','ǜ'],'ǚ':['ǖ','ǘ','ǚ','ǜ'],'ǜ':['ǖ','ǘ','ǚ','ǜ']
};
function plainPinyin(s){return String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ü/g,'v').replace(/Ü/g,'V');}
function toneOptions(pinyin,seed){const chars=Array.from(pinyin);let idx=chars.findIndex(ch=>toneMap[ch]);if(idx<0)return stableShuffle([pinyin,...stableShuffle(data.tones.filter(x=>x.pinyin!==pinyin).map(x=>x.pinyin),seed+'-fallback').slice(0,3)],seed);const variants=toneMap[chars[idx]].map(v=>{const a=[...chars];a[idx]=v;return a.join('');});return stableShuffle(variants,seed);}
function questionList(section){
  if(section==='tones')return data.tones.map(x=>({qid:x.id,type:'tone',section,data:x}));
  if(section==='listenPic')return data.listening_picture.map(x=>({qid:x.id,type:'listenPic',section,data:x}));
  if(section==='listenDlg')return data.listening_dialogue.map(x=>({qid:x.id,type:'listenDlg',section,data:x}));
  if(section==='vocab')return data.image_vocab.filter(x=>!['shi'].includes(x.id)).map(x=>({qid:`vp-${x.id}`,type:'vocab',section,data:x}));
  if(section==='sentence')return data.sentence_picture.map(x=>({qid:x.id,type:'sentence',section,data:x}));
  if(section==='dialogue')return data.dialogue_fill.map(x=>({qid:x.id,type:'dialogue',section,data:x}));
  if(section==='grammar')return data.grammar.map(x=>({qid:x.id,type:'grammar',section,data:x}));
  return [];
}
function answerFor(q){const d=q.data;if(q.type==='tone')return d.pinyin;if(q.type==='listenPic')return String(d.choices.findIndex(x=>x.correct));if(q.type==='listenDlg'||q.type==='sentence')return d.answer;if(q.type==='vocab')return d.id;return d.answer;}
function optionsFor(q){const d=q.data;
  if(q.type==='tone')return toneOptions(d.pinyin,q.qid).map(x=>({value:x,label:x}));
  if(q.type==='listenPic')return d.choices.map((x,i)=>({value:String(i),label:String.fromCharCode(65+i),audio:x.zh,detail:x}));
  if(q.type==='listenDlg'||q.type==='sentence'){return stableShuffle([d.answer,...d.distractors],q.qid).map(id=>({value:id,image:id}));}
  if(q.type==='vocab'){const pool=stableShuffle(data.image_vocab.filter(x=>x.id!==d.id),q.qid+'-pool');return stableShuffle([d.id,...pool.slice(0,3).map(x=>x.id)],q.qid).map(id=>({value:id,image:id}));}
  return stableShuffle(d.options,q.qid).map(x=>({value:x,label:x}));
}
function practiceSections(){return [
  {id:'tones',icon:'🎧',count:10,weight:'Listening 20% · A'},
  {id:'listenPic',icon:'🖼️',count:5,weight:'Listening 20% · B'},
  {id:'listenDlg',icon:'💬',count:5,weight:'Listening 20% · C'},
  {id:'vocab',icon:'🧠',count:20,weight:'20%'},
  {id:'sentence',icon:'📖',count:10,weight:'20%'},
  {id:'dialogue',icon:'✍️',count:10,weight:'25%'},
  {id:'grammar',icon:'🧩',count:15,weight:'15%'}
];}
function progressStats(section){const p=getProgress(section),qs=questionList(section);let done=0,correct=0;for(const q of qs){const a=p.answers[q.qid];if(a){done++;if(a.correct)correct++;}}return {done,correct,total:qs.length};}
function renderOverview(){clearTimer();state.view='overview';save();const T=tr();const root=$('midtermApp');if(!root||!data)return;
  const cards=practiceSections().map(s=>{const st=progressStats(s.id);const pct=st.total?Math.round(st.done/st.total*100):0;return `<button class="midterm-section-card" data-midterm-section="${s.id}" type="button"><div class="midterm-section-icon">${s.icon}</div><div><strong>${esc(T.sections[s.id])}</strong><span>${esc(s.weight)} · ${st.done}/${st.total} ${esc(T.done)} · ${st.correct} ${esc(T.correct)}</span><i><b style="width:${pct}%"></b></i></div><em>›</em></button>`}).join('');
  const history=state.history.length?state.history.slice(0,5).map(h=>`<div class="midterm-history-row"><span>${new Date(h.finishedAt).toLocaleString()}</span><strong>${Number(h.score||0).toFixed(1)}/100</strong></div>`).join(''):`<div class="small muted">${esc(T.noHistory)}</div>`;
  root.innerHTML=`<div class="midterm-hero card"><div><div class="eyebrow">MIDTERM · L1D1–L1D2</div><h2>${esc(T.title)}</h2><p>${esc(T.sub)}</p></div><div class="midterm-exam-facts"><span><b>${esc(T.scope)}</b>${esc(data.meta.scope)}</span><span><b>${esc(T.time)}</b>${data.meta.duration_minutes} phút · ${esc(data.meta.exam_datetime)}</span></div><div class="midterm-notice">⚠️ ${esc(T.traditional)}<br>${esc(T.sourceNote)}</div><p class="small muted">${esc(T.practiceHint)}</p><div class="midterm-main-actions"><button id="midtermMockBtn" class="primary" type="button">${state.mock?.active?esc(T.resume):'🎓 '+esc(T.mock)}</button></div></div><div class="midterm-grid"><section class="card"><div class="section-title-row"><div><h2>${esc(T.review)}</h2><div class="small muted">20% + 20% + 20% + 25% + 15%</div></div></div><div class="midterm-section-list">${cards}</div></section><section class="card midterm-history"><h2>${esc(T.history)}</h2>${history}</section></div>`;
  root.querySelectorAll('[data-midterm-section]').forEach(b=>b.addEventListener('click',()=>openPractice(b.dataset.midtermSection)));
  $('midtermMockBtn')?.addEventListener('click',()=>{if(state.mock?.active)renderMock();else startMock();});
}
function openPractice(section){state.view=`practice:${section}`;const p=getProgress(section);const qs=questionList(section);p.index=Math.max(0,Math.min(Number(p.index)||0,Math.max(0,qs.length-1)));save();renderPractice(section);}
function renderPractice(section){clearTimer();const T=tr(),root=$('midtermApp'),p=getProgress(section),qs=questionList(section);if(!root||!qs.length)return;const idx=Math.max(0,Math.min(p.index,qs.length-1)),q=qs[idx],st=progressStats(section);root.innerHTML=`<div class="card midterm-practice"><div class="midterm-practice-head"><button id="midtermBack" type="button">${esc(T.back)}</button><div><div class="eyebrow">${esc(T.sections[section])}</div><strong>${idx+1}/${qs.length} · ${st.done}/${st.total} ${esc(T.done)}</strong></div><div class="midterm-hint-toggles"><label><input id="midtermPinyin" type="checkbox" ${state.settings.pinyin?'checked':''}> ${esc(T.showPinyin)}</label><label><input id="midtermMeaning" type="checkbox" ${state.settings.meaning?'checked':''}> ${esc(T.showMeaning)}</label></div></div><div id="midtermQuestion"></div><div class="midterm-question-nav"><button id="midtermPrev" type="button" ${idx===0?'disabled':''}>${esc(T.prev)}</button><button id="midtermResetSection" type="button">↻ ${esc(T.reset)}</button><button id="midtermNext" class="primary" type="button" ${idx===qs.length-1?'disabled':''}>${esc(T.next)}</button></div></div>`;
  renderQuestion(q,$('midtermQuestion'),{exam:false,answer:p.answers[q.qid]});
  $('midtermBack').onclick=renderOverview;$('midtermPrev').onclick=()=>{p.index--;save();renderPractice(section)};$('midtermNext').onclick=()=>{p.index++;save();renderPractice(section)};
  $('midtermResetSection').onclick=()=>{if(confirm('Xóa tiến độ của phần này?')){state.practice[section]={index:0,answers:{}};save();renderPractice(section);}};
  $('midtermPinyin').onchange=e=>{state.settings.pinyin=e.target.checked;save();renderPractice(section)};$('midtermMeaning').onchange=e=>{state.settings.meaning=e.target.checked;save();renderPractice(section)};
}
function detailHtml(obj,exam=false){if(exam)return'';let x='';if(state.settings.pinyin&&obj?.pinyin)x+=`<div class="midterm-pinyin">${esc(obj.pinyin)}</div>`;if(state.settings.meaning&&obj?.vi)x+=`<div class="midterm-meaning">${esc(obj.vi)}</div>`;return x;}
function renderQuestion(q,host,{exam=false,answer=null}={}){const T=tr(),d=q.data;const answered=Boolean(answer);const correct=answerFor(q);let prompt='',body='';
  if(q.type==='tone'){
    const opts=optionsFor(q);prompt=`<div class="midterm-question-title">A. Listen and mark the correct tones</div><div class="midterm-tone-base">${esc(plainPinyin(d.pinyin))}</div><button class="midterm-listen primary" data-speak="${esc(d.zh)}" type="button">${esc(T.listen)}</button>${detailHtml(d,exam)}`;body=optionButtons(opts,answer,correct,exam,'text');
  }else if(q.type==='listenPic'){
    prompt=`<div class="midterm-question-title">B. Look at the picture. Listen and choose A/B/C.</div>${imgHtml(d.picture,'midterm-main-picture')}<div class="midterm-audio-row"><button class="midterm-listen primary" data-speak="${esc(d.prompt_zh)}" type="button">${esc(T.listen)} câu hỏi</button></div>${detailHtml(d,exam)}`;
    const opts=optionsFor(q);body=`<div class="midterm-audio-options">${opts.map(o=>`<button type="button" class="midterm-audio-choice ${answer?.value===o.value?'is-selected':''} ${!exam&&answered?(o.value===correct?'is-correct':answer?.value===o.value?'is-wrong':''):''}" data-answer="${esc(o.value)}"><b>${esc(o.label)}</b><span class="midterm-choice-audio" data-choice-speak="${esc(o.audio)}">🔊</span>${!exam&&answered?`<small>${esc(o.detail.zh)}</small>`:''}</button>`).join('')}</div>`;
  }else if(q.type==='listenDlg'){
    prompt=`<div class="midterm-question-title">C. Listen to the short dialogue. Choose the matching picture.</div><button class="midterm-listen primary" data-dialogue='${esc(JSON.stringify(d.lines))}' type="button">${esc(T.listen)} hội thoại</button>${detailHtml(d,exam)}`;body=optionButtons(optionsFor(q),answer,correct,exam,'image');
  }else if(q.type==='vocab'){
    prompt=`<div class="midterm-question-title">生詞看圖 · Chọn hình đúng với từ</div><div class="midterm-big-word">${esc(d.zh)}</div>${detailHtml(d,exam)}`;body=optionButtons(optionsFor(q),answer,correct,exam,'image');
  }else if(q.type==='sentence'){
    prompt=`<div class="midterm-question-title">看句子選圖 · Đọc câu và chọn hình</div><div class="midterm-sentence">${esc(d.zh)}</div>${detailHtml(d,exam)}`;body=optionButtons(optionsFor(q),answer,correct,exam,'image');
  }else{
    prompt=`<div class="midterm-question-title">${q.type==='grammar'?esc(d.group):'課文填空 · Dialogue 1 & 2'}</div><div class="midterm-sentence">${esc(d.prompt)}</div>${detailHtml(d,exam)}`;body=optionButtons(optionsFor(q),answer,correct,exam,'text');
  }
  const feedback=!exam&&answered?`<div class="midterm-feedback ${answer.correct?'ok':'bad'}"><strong>${answer.correct?'✓ '+esc(T.correct):'✗ '+esc(T.answer)+': '+esc(correct)}</strong>${!answer.correct?`<span>${esc(T.yourAnswer)}: ${esc(answer.value)}</span>`:''}</div>`:'';
  host.innerHTML=`<div class="midterm-question-card">${prompt}<div class="midterm-answer-area">${body}</div>${feedback}</div>`;
  host.querySelectorAll('[data-speak]').forEach(b=>b.addEventListener('click',()=>speak(b.dataset.speak)));
  host.querySelectorAll('[data-choice-speak]').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation();speak(b.dataset.choiceSpeak)}));
  host.querySelectorAll('[data-dialogue]').forEach(b=>b.addEventListener('click',()=>{try{speakSequence(JSON.parse(b.dataset.dialogue))}catch{}}));
  host.querySelectorAll('[data-answer]').forEach(b=>b.addEventListener('click',()=>recordAnswer(q,b.dataset.answer,exam)));
}
function optionButtons(opts,answer,correct,exam,kind){return `<div class="midterm-options ${kind==='image'?'is-images':''}">${opts.map((o,i)=>{const sel=answer?.value===o.value;const status=!exam&&answer?(o.value===correct?'is-correct':sel?'is-wrong':''):'';if(kind==='image'){const it=imageItem(o.image);return `<button type="button" class="midterm-image-option ${sel?'is-selected':''} ${status}" data-answer="${esc(o.value)}"><span>${String.fromCharCode(65+i)}</span>${imgHtml(o.image,'midterm-option-picture')}${!exam&&answer&&it?`<small>${esc(it.zh)}</small>`:''}</button>`;}return `<button type="button" class="midterm-text-option ${sel?'is-selected':''} ${status}" data-answer="${esc(o.value)}">${esc(o.label)}</button>`;}).join('')}</div>`;}
function recordAnswer(q,value,exam){const correct=value===answerFor(q);if(exam){if(!state.mock?.active)return;state.mock.answers[q.mockId||q.qid]={value,correct};save();renderMockQuestion();return;}const p=getProgress(q.section);p.answers[q.qid]={value,correct,at:new Date().toISOString()};save();renderPractice(q.section);}
function buildMock(){const qs=[];const add=(arr,n,section)=>sample(arr,n).forEach(q=>qs.push({...q,mockId:`${section}:${q.qid}`,examSection:section}));add(questionList('tones'),10,'listening');add(questionList('listenPic'),5,'listening');add(questionList('listenDlg'),5,'listening');add(questionList('vocab').filter(q=>!['teacher','student'].includes(q.data.id)),20,'vocabulary_picture');add(questionList('sentence'),10,'sentence_picture');add(questionList('dialogue'),10,'dialogue_fill');add(questionList('grammar'),15,'grammar');return qs;}
function serializeMockQuestions(qs){return qs.map(q=>({mockId:q.mockId,qid:q.qid,type:q.type,section:q.section,examSection:q.examSection}));}
function restoreMockQuestions(list){return (list||[]).map(x=>{const q=questionList(x.section).find(y=>y.qid===x.qid);return q?{...q,mockId:x.mockId,examSection:x.examSection}:null;}).filter(Boolean);}
function startMock(){const T=tr();if(!confirm(`${T.mock}\n${data.meta.duration_minutes} phút · 75 câu`))return;const qs=buildMock();const now=Date.now();state.mock={active:true,startedAt:new Date(now).toISOString(),expiresAt:new Date(now+data.meta.duration_minutes*60000).toISOString(),index:0,questions:serializeMockQuestions(qs),answers:{}};save();renderMock();}
function renderMock(){if(!state.mock?.active){renderOverview();return;}state.view='mock';save();renderMockShell();renderMockQuestion();startTimer();}
function renderMockShell(){const T=tr(),root=$('midtermApp');const qs=restoreMockQuestions(state.mock.questions);const done=Object.keys(state.mock.answers||{}).length;root.innerHTML=`<div class="card midterm-mock"><div class="midterm-mock-head"><div><div class="eyebrow">MIDTERM MOCK · L1D1–L1D2</div><h2>${esc(T.mockTitle)}</h2><div class="small muted">${done}/${qs.length} ${esc(T.done)}</div></div><div class="midterm-timer" id="midtermTimer">105:00</div></div><div class="midterm-mock-jump" id="midtermMockJump"></div><div id="midtermMockQuestion"></div><div class="midterm-question-nav"><button id="midtermMockPrev" type="button">${esc(T.prev)}</button><button id="midtermMockSubmit" class="danger" type="button">${esc(T.submit)}</button><button id="midtermMockNext" class="primary" type="button">${esc(T.next)}</button></div></div>`;
  $('midtermMockPrev').onclick=()=>{state.mock.index=Math.max(0,state.mock.index-1);save();renderMockQuestion()};$('midtermMockNext').onclick=()=>{state.mock.index=Math.min(qs.length-1,state.mock.index+1);save();renderMockQuestion()};$('midtermMockSubmit').onclick=()=>{if(confirm(T.finishConfirm))finishMock(false)};
}
function renderMockQuestion(){const qs=restoreMockQuestions(state.mock?.questions);if(!qs.length){renderOverview();return;}const idx=Math.max(0,Math.min(Number(state.mock.index)||0,qs.length-1));state.mock.index=idx;const q=qs[idx],answer=state.mock.answers?.[q.mockId];const host=$('midtermMockQuestion');if(!host)return;host.innerHTML=`<div class="midterm-mock-counter"><strong>${idx+1}/${qs.length}</strong><span>${esc(mockPartLabel(idx))}</span></div><div id="midtermMockQuestionInner"></div>`;renderQuestion(q,$('midtermMockQuestionInner'),{exam:true,answer});
  const jump=$('midtermMockJump');if(jump){const start=Math.floor(idx/10)*10;const end=Math.min(qs.length,start+10);jump.innerHTML=Array.from({length:end-start},(_,i)=>start+i).map(i=>`<button type="button" data-jump="${i}" class="${i===idx?'is-current':''} ${state.mock.answers?.[qs[i].mockId]?'is-done':''}">${i+1}</button>`).join('');jump.querySelectorAll('[data-jump]').forEach(b=>b.onclick=()=>{state.mock.index=Number(b.dataset.jump);save();renderMockQuestion()});}
  $('midtermMockPrev').disabled=idx===0;$('midtermMockNext').disabled=idx===qs.length-1;
}
function mockPartLabel(idx){if(idx<20)return'一、聽力 Listening · 20%';if(idx<40)return'二、生詞看圖 · 20%';if(idx<50)return'三、看句子選圖 · 20%';if(idx<60)return'四、課文填空 · 25%';return'五、語法 · 15%';}
function startTimer(){clearTimer();const tick=()=>{if(!state.mock?.active)return;const left=Math.max(0,new Date(state.mock.expiresAt).getTime()-Date.now());const m=Math.floor(left/60000),s=Math.floor((left%60000)/1000),el=$('midtermTimer');if(el){el.textContent=`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;el.classList.toggle('is-low',left<=10*60000);}if(left<=0){finishMock(true);return;}timerHandle=setTimeout(tick,1000);};tick();}
function clearTimer(){if(timerHandle){clearTimeout(timerHandle);timerHandle=null;}}
function finishMock(auto=false){clearTimer();const qs=restoreMockQuestions(state.mock?.questions),ans=state.mock?.answers||{};const buckets={listening:{correct:0,total:20,points:20},vocabulary_picture:{correct:0,total:20,points:20},sentence_picture:{correct:0,total:10,points:20},dialogue_fill:{correct:0,total:10,points:25},grammar:{correct:0,total:15,points:15}};for(const q of qs){if(ans[q.mockId]?.correct)buckets[q.examSection].correct++;}let score=0;Object.values(buckets).forEach(b=>score+=(b.correct/b.total)*b.points);const result={finishedAt:new Date().toISOString(),startedAt:state.mock.startedAt,score:Math.round(score*10)/10,autoSubmitted:auto,breakdown:buckets,answers:ans,questions:state.mock.questions};state.history.unshift({finishedAt:result.finishedAt,score:result.score,breakdown:buckets});state.history=state.history.slice(0,20);state.mock={active:false,lastResult:result};save();renderMockResult(result);}
function renderMockResult(r){const T=tr(),root=$('midtermApp');const rows=Object.entries(r.breakdown).map(([k,b])=>`<div class="midterm-result-row"><span>${esc(k.replaceAll('_',' '))}</span><strong>${b.correct}/${b.total}</strong><em>${((b.correct/b.total)*b.points).toFixed(1)}/${b.points}</em></div>`).join('');root.innerHTML=`<div class="card midterm-result"><div class="midterm-score-big"><strong>${r.score.toFixed(1)}</strong><span>/100</span></div><h2>${r.score>=80?'✅ Tốt':'📚 Cần ôn thêm'}</h2><div class="midterm-result-breakdown">${rows}</div><div class="midterm-main-actions"><button id="midtermResultOverview" type="button">${esc(T.back)}</button><button id="midtermNewMock" class="primary" type="button">${esc(T.newMock)}</button></div></div>`;$('midtermResultOverview').onclick=renderOverview;$('midtermNewMock').onclick=startMock;}
function init(){const root=$('midtermApp');if(!root)return;fetch(DATA_URL,{cache:'no-store'}).then(r=>{if(!r.ok)throw new Error(`HTTP ${r.status}`);return r.json();}).then(j=>{data=j;if(state.mock?.active&&new Date(state.mock.expiresAt).getTime()<=Date.now())finishMock(true);else if(state.mock?.active&&state.view==='mock')renderMock();else if(String(state.view).startsWith('practice:'))openPractice(String(state.view).split(':')[1]);else renderOverview();}).catch(err=>{root.innerHTML=`<div class="card"><strong>Không tải được dữ liệu ôn giữa kỳ.</strong><div class="small muted">${esc(err.message)}</div></div>`;});
  document.addEventListener('tocfl:language-changed',()=>{if(data){if(state.mock?.active&&state.view==='mock')renderMock();else if(String(state.view).startsWith('practice:'))renderPractice(String(state.view).split(':')[1]);else renderOverview();}});
  document.addEventListener('tocfl:midterm-cloud-applied',()=>{state=loadState();if(data)renderOverview();});
}
window.MidtermReview={renderOverview};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
