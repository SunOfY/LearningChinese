'use strict';

// HomeWork 1 is reconstructed from the attached 3-page worksheet.
// Where the PDF gives an explicit answer/rule, the site can check it.
// Picture-to-pinyin rows are intentionally NOT auto-graded because the PDF itself
// only shows pictures + blank pinyin boxes; the QR source is provided for listening.

const HOMEWORK_STORAGE_KEY = 'tocfl-homework-1-v3';

const HW1 = {
  toneRules: [
    {raw:'mao', answer:'a', why:'Có a → luôn đặt dấu lên a.'},
    {raw:'hua', answer:'a', why:'Có a → luôn đặt dấu lên a.'},
    {raw:'niao', answer:'a', why:'Có a → luôn đặt dấu lên a.'},
    {raw:'gou', answer:'o', why:'Không có a; o đứng trước u trong thứ tự ưu tiên.'},
    {raw:'huo', answer:'o', why:'Không có a; chọn o.'},
    {raw:'fei', answer:'e', why:'Không có a/o; chọn e.'},
    {raw:'niu', answer:'u', why:'iu đi cùng nhau → đặt dấu trên nguyên âm thứ hai: u.'},
    {raw:'liu', answer:'u', why:'iu đi cùng nhau → đặt dấu trên nguyên âm thứ hai: u.'},
    {raw:'jiu', answer:'u', why:'iu đi cùng nhau → đặt dấu trên nguyên âm thứ hai: u.'},
    {raw:'dui', answer:'i', why:'ui đi cùng nhau → đặt dấu trên nguyên âm thứ hai: i.'},
    {raw:'tui', answer:'i', why:'ui đi cùng nhau → đặt dấu trên nguyên âm thứ hai: i.'},
    {raw:'gui', answer:'i', why:'ui đi cùng nhau → đặt dấu trên nguyên âm thứ hai: i.'}
  ],
  tones: [
    {tone:1,pinyin:'mā',hanzi:'媽',meaning:'mẹ / mother',shape:'→',desc:'cao và ngang'},
    {tone:2,pinyin:'má',hanzi:'麻',meaning:'tê / numb',shape:'↗',desc:'đi lên'},
    {tone:3,pinyin:'mǎ',hanzi:'馬',meaning:'ngựa / horse',shape:'↘↗',desc:'xuống rồi lên'},
    {tone:4,pinyin:'mà',hanzi:'罵',meaning:'mắng / scold',shape:'↘',desc:'đi xuống mạnh'}
  ],
  numbers: [
    {n:1,h:'一',p:'yī'},{n:3,h:'三',p:'sān'},{n:7,h:'七',p:'qī'},{n:8,h:'八',p:'bā'},
    {n:2,h:'二',p:'èr'},{n:4,h:'四',p:'sì'},{n:6,h:'六',p:'liù'},{n:5,h:'五',p:'wǔ'},
    {n:9,h:'九',p:'jiǔ'},{n:0,h:'零',p:'líng'},{n:10,h:'十',p:'shí'}
  ],
  // These five groups mirror the QR-separated picture exercises on pages 2–3.
  // The image assets are crops of the original worksheet cells.
  pinyinGroups: [
    {
      id:'p2r1', title:'Trang 2 · Hàng 1', subtitle:'Nghe QR rồi điền Pinyin dưới từng hình.',
      youtubeId:'IGnJNmLHRdo', sourceLabel:'Chinese Pronunciation with PINYIN · Part 1',
      items:Array.from({length:7},(_,i)=>({id:`p2-r1-i${i+1}`,img:`./homework/pinyin-items/p2-r1-i${i+1}.png`}))
    },
    {
      id:'p2r2', title:'Trang 2 · Hàng 2', subtitle:'Nghe QR rồi điền Pinyin dưới từng hình.',
      youtubeId:'PKboNTrDIVE', sourceLabel:'Chinese Pronunciation with PINYIN · Part 2',
      items:Array.from({length:6},(_,i)=>({id:`p2-r2-i${i+1}`,img:`./homework/pinyin-items/p2-r2-i${i+1}.png`}))
    },
    {
      id:'p2r3', title:'Trang 2 · Hàng 3', subtitle:'Nghe QR rồi điền Pinyin dưới từng hình.',
      youtubeId:'WiBlrdAOjq4', sourceLabel:'Chinese Pronunciation with PINYIN · Part 3',
      items:Array.from({length:7},(_,i)=>({id:`p2-r3-i${i+1}`,img:`./homework/pinyin-items/p2-r3-i${i+1}.png`}))
    },
    {
      id:'p3animals', title:'Trang 3 · Nhóm hình đầu', subtitle:'QR đầu trang 3; gồm 7 hình hàng đầu + 2 hình tiếp theo trước QR kế tiếp.',
      youtubeId:'ryyQqsWavhs', sourceLabel:'Chinese Pronunciation with PINYIN · Part 4',
      items:[
        ...Array.from({length:7},(_,i)=>({id:`p3-r1-i${i+1}`,img:`./homework/pinyin-items/p3-r1-i${i+1}.png`})),
        ...Array.from({length:2},(_,i)=>({id:`p3-r2-i${i+1}`,img:`./homework/pinyin-items/p3-r2-i${i+1}.png`}))
      ]
    },
    {
      id:'p3last', title:'Trang 3 · Nhóm sau QR thứ hai', subtitle:'Các hình sau QR thứ hai trên trang 3; điền Pinyin vào từng ô.',
      youtubeId:'l8xuX8531ec', sourceLabel:'Bài luyện bổ sung từ QR',
      items:[
        ...Array.from({length:4},(_,i)=>({id:`p3-r2-i${i+3}`,img:`./homework/pinyin-items/p3-r2-i${i+3}.png`})),
        ...Array.from({length:7},(_,i)=>({id:`p3-r3-i${i+1}`,img:`./homework/pinyin-items/p3-r3-i${i+1}.png`}))
      ]
    }
  ],
  videos: [
    ['Giới thiệu Mandarin Pinyin','https://youtu.be/YWjWYHbKlpo?si=aRus3iPjolonjxD7'],
    ['Pinyin · Number','https://youtu.be/_4YhIKOHaEc'],
    ['Pinyin · Part 1','https://www.youtube.com/watch?v=IGnJNmLHRdo&list=PL9-RzyUUQP3RSYw08KUGoAcVYywqkKswv&index=2'],
    ['Pinyin · Part 2','https://youtu.be/PKboNTrDIVE'],
    ['Pinyin · Part 3','https://youtu.be/WiBlrdAOjq4'],
    ['Pinyin · Part 4','https://youtu.be/ryyQqsWavhs'],
    ['Bài luyện bổ sung','https://www.youtube.com/watch?v=l8xuX8531ec'],
    ['Interactive Pinyin Chart','https://yoyochinese.com/chinese-learning-tools/Mandarin-Chinese-pronunciation-lesson/pinyin-chart-table']
  ]
};

let hwState = loadHomeworkState();
let hwBusy = false;

function hwEl(id){ return document.getElementById(id); }
function esc(s){ return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function allPinyinItems(){ return HW1.pinyinGroups.flatMap(g=>g.items); }

function loadHomeworkState(){
  try{
    // Migrate progress from the previous v1 key if this is the first v2 load.
    let x=JSON.parse(localStorage.getItem(HOMEWORK_STORAGE_KEY)||'null');
    if(!x){
      const old=JSON.parse(localStorage.getItem('tocfl-homework-1-v1')||'{}');
      const v2=JSON.parse(localStorage.getItem('tocfl-homework-1-v2')||'null');
      x=v2||{...old,pinyinAnswers:{}};
    }
    return {
      toneRuleDone:x.toneRuleDone||{}, toneDone:x.toneDone||{}, numberDone:x.numberDone||{},
      viewed:x.viewed||{}, pinyinAnswers:x.pinyinAnswers||{}, toneChoices:x.toneChoices||{}
    };
  }catch{return {toneRuleDone:{},toneDone:{},numberDone:{},viewed:{},pinyinAnswers:{},toneChoices:{}};}
}
function persistHomeworkState(){ localStorage.setItem(HOMEWORK_STORAGE_KEY, JSON.stringify(hwState)); }
function saveHomeworkState(){ persistHomeworkState(); updateHomeworkProgress(); }

function pinyinFilledCount(){ return allPinyinItems().filter(x=>String(hwState.pinyinAnswers[x.id]||'').trim()).length; }
function toneSelectedCount(){ return allPinyinItems().filter(x=>[1,2,3,4].includes(Number(hwState.toneChoices[x.id]))).length; }
function homeworkProgress(){
  const pinyinTotal=allPinyinItems().length;
  // Mỗi hình có 2 việc: điền Pinyin + chọn tone 1/2/3/4.
  const total = HW1.toneRules.length + HW1.tones.length + HW1.numbers.length + (pinyinTotal*2) + 3;
  const done = Object.keys(hwState.toneRuleDone).filter(k=>hwState.toneRuleDone[k]).length
    + Object.keys(hwState.toneDone).filter(k=>hwState.toneDone[k]).length
    + Object.keys(hwState.numberDone).filter(k=>hwState.numberDone[k]).length
    + pinyinFilledCount() + toneSelectedCount()
    + [1,2,3].filter(i=>hwState.viewed['page'+i]).length;
  return {done,total,pct:Math.round(done/total*100)};
}

function renderHomework(){
  const root=hwEl('homeworkApp'); if(!root)return;
  root.innerHTML=`
    <section class="card hw-hero">
      <div>
        <div class="eyebrow">HOMEWORK · BÀI TẬP 1</div>
        <h2>Introduction to Mandarin Pinyin</h2>
        <p class="muted">Mục tiêu trước khi lên lớp: hiểu 4 thanh điệu, biết đặt dấu đúng, nghe QR và tự điền Pinyin vào các ô giống worksheet gốc.</p>
      </div>
      <div class="hw-progress-box">
        <strong id="hwProgressPct">0%</strong>
        <div class="progress-bar"><div id="hwProgressBar"></div></div>
        <span id="hwProgressText" class="small muted">0 / 0 mục</span>
      </div>
      <div class="toolbar hw-top-actions">
        <a class="button-link primary" href="./homework/homework-1-mandarin-pinyin.pdf" target="_blank" rel="noopener">📄 Mở PDF gốc</a>
        <a class="button-link" href="https://yoyochinese.com/chinese-learning-tools/Mandarin-Chinese-pronunciation-lesson/pinyin-chart-table" target="_blank" rel="noopener">🎧 Interactive Pinyin Chart</a>
      </div>
      <div class="tip-box"><strong>Nhớ 1 câu:</strong> Pinyin cho biết âm gì · số thanh cho biết giọng lên/xuống · <code>a &gt; o &gt; e &gt; i &gt; u &gt; ü</code> chỉ giúp quyết định dấu viết trên nguyên âm nào. Riêng <code>iu/ui</code> đặt dấu ở nguyên âm thứ hai.</div>
    </section>

    <section class="card hw-section">
      <div class="section-title-row"><div><div class="eyebrow">PHẦN 1</div><h2>4 thanh điệu — nghe rồi tự đọc</h2></div></div>
      <div class="hw-tone-grid">${HW1.tones.map((x,i)=>`
        <article class="hw-tone-card ${hwState.toneDone[i]?'is-done':''}" data-tone-index="${i}">
          <div class="hw-tone-main"><span class="hw-tone-pinyin">${x.pinyin}</span><span class="hw-tone-shape">${x.shape}</span></div>
          <strong>Thanh ${x.tone}</strong><span class="small muted">${x.desc} · ${x.meaning}</span>
          <div class="toolbar"><button type="button" data-hw-listen="tone:${i}">🔊 Nghe</button><button type="button" class="primary" data-hw-check="tone:${i}">🎙 AI kiểm tra</button></div>
          <div class="hw-ai-result small" id="hwToneResult${i}">${hwState.toneDone[i]?'✅ Đã luyện':'Chưa kiểm tra'}</div>
        </article>`).join('')}</div>
      <p class="small muted hw-note">AI hiện tại dùng Groq Whisper để nhận dạng chữ bạn nói. Nếu AI nhận đúng chữ mẫu thì phát âm của bạn đã đủ gần để hệ thống hiểu; đây chưa phải máy chấm đường cao độ/thanh điệu chuyên sâu.</p>
    </section>

    <section class="card hw-section">
      <div class="section-title-row"><div><div class="eyebrow">PHẦN 2</div><h2>Đặt dấu thanh đúng vị trí</h2><p class="muted">Bấm vào nguyên âm mà bạn nghĩ phải mang dấu. Đây là đúng danh sách luyện tập ở trang 1 của PDF.</p></div></div>
      <div class="hw-rule-grid">${HW1.toneRules.map((x,i)=>renderToneRuleItem(x,i)).join('')}</div>
    </section>

    <section class="card hw-section">
      <div class="section-title-row"><div><div class="eyebrow">PHẦN 3</div><h2>Số 0–10 và số điện thoại</h2><p class="muted">Bấm nghe, đọc lại rồi dùng AI để kiểm tra.</p></div></div>
      <div class="hw-number-grid">${HW1.numbers.map((x,i)=>`
        <article class="hw-number-card ${hwState.numberDone[i]?'is-done':''}">
          <span class="hw-number">${x.n}</span><strong>${x.h}</strong><span>${x.p}</span>
          <div class="toolbar"><button type="button" data-hw-listen="number:${i}">🔊</button><button type="button" data-hw-check="number:${i}">🎙</button></div>
          <div class="hw-ai-result small" id="hwNumberResult${i}">${hwState.numberDone[i]?'✅ Đã luyện':''}</div>
        </article>`).join('')}</div>
      <div class="hw-phone-box">
        <h3>📱 Give me your phone number</h3>
        <p class="small muted">Ví dụ trong PDF: <strong>Lǐ Yīngměi 0913-785-246</strong>. Số bạn nhập chỉ được dùng ngay trên trình duyệt và không lưu vào tiến độ.</p>
        <div class="hw-phone-inputs"><input id="hwPhoneName" type="text" placeholder="Tên, ví dụ: Lǐ Yīngměi"/><input id="hwPhoneNumber" type="tel" inputmode="numeric" placeholder="0913-785-246" value="0913-785-246"/></div>
        <div class="toolbar"><button id="hwBuildPhoneBtn" type="button">Tạo cách đọc</button><button id="hwListenPhoneBtn" type="button">🔊 Nghe dãy số</button><button id="hwCheckPhoneBtn" class="primary" type="button">🎙 AI kiểm tra dãy số</button></div>
        <div id="hwPhoneReading" class="hw-phone-reading"></div><div id="hwPhoneResult" class="hw-ai-result small"></div>
      </div>
    </section>

    <section class="card hw-section hw-pinyin-section">
      <div class="section-title-row"><div><div class="eyebrow">PHẦN 4 · PINYIN + TONE</div><h2>Nghe QR → điền Pinyin → chọn tone đúng</h2><p class="muted">Đúng theo cách bài QR hoạt động: video cho nghe Pinyin trước, sau đó đọc âm đó với 4 tone. Với mỗi hình, bạn điền Pinyin rồi chọn thanh 1, 2, 3 hoặc 4.</p></div></div>
      <div class="tip-box hw-source-note"><strong>Cách làm:</strong> ① bấm <strong>Nghe bài QR</strong> ② nghe âm Pinyin và 4 cách đọc ③ điền Pinyin dưới hình ④ chọn tone bạn cho là đúng. Web sẽ tự ghép Pinyin + tone để hiện dạng có dấu, ví dụ <code>gou + 3 → gǒu</code>. <strong>Lựa chọn được lưu tự động.</strong></div>
      <div class="toolbar hw-pinyin-tools"><button type="button" id="hwConvertToneBtn">✨ Đổi số thanh → dấu (ni3 → nǐ)</button><span class="small muted" id="hwPinyinCount"></span></div>
      <div class="hw-pinyin-groups">${HW1.pinyinGroups.map(renderPinyinGroup).join('')}</div>
    </section>

    <section class="card hw-section">
      <div class="section-title-row"><div><div class="eyebrow">PHẦN 5</div><h2>Đối chiếu trang gốc + toàn bộ QR</h2><p class="muted">Dùng phần này khi bạn muốn nhìn lại nguyên trang PDF hoặc mở riêng từng nguồn QR.</p></div></div>
      <div class="hw-pages">${[1,2,3].map(i=>`
        <article class="hw-page-card ${hwState.viewed['page'+i]?'is-done':''}">
          <a href="./homework/homework-1-page-${i}.png" target="_blank" rel="noopener"><img src="./homework/homework-1-page-${i}.png" alt="Homework 1 page ${i}" loading="lazy"></a>
          <div class="toolbar"><a class="button-link" href="./homework/homework-1-page-${i}.png" target="_blank" rel="noopener">🔎 Xem lớn trang ${i}</a><button type="button" data-hw-page-done="${i}">${hwState.viewed['page'+i]?'✅ Đã xem':'Đánh dấu đã xem'}</button></div>
        </article>`).join('')}</div>
      <div class="hw-video-grid">${HW1.videos.map(([title,url],i)=>`<a class="hw-video-link" href="${esc(url)}" target="_blank" rel="noopener"><span>${i<7?'▶':'🎧'}</span><strong>${esc(title)}</strong><small>${i<7?'Mở video QR':'Mở công cụ luyện Pinyin'}</small></a>`).join('')}</div>
    </section>

    <section class="card hw-section hw-finish">
      <h2>✅ Checklist trước khi lên lớp</h2>
      <p>1) Phân biệt được mā / má / mǎ / mà. 2) Biết đặt dấu trên âm như <strong>mao, fei, liu, dui</strong>. 3) Đọc được 0–10. 4) Nghe từng QR và hoàn thành các ô Pinyin của trang 2–3.</p>
      <button id="hwResetBtn" type="button" class="danger">Làm lại HomeWork 1 từ đầu</button>
    </section>`;

  bindHomework();
  buildPhoneReading();
  updateHomeworkProgress();
}

function renderToneRuleItem(x,i){
  const done=Boolean(hwState.toneRuleDone[i]);
  return `<article class="hw-rule-card ${done?'is-done':''}" id="hwRule${i}"><div class="hw-rule-word">${[...x.raw].map((ch,idx)=>/[aeiouü]/i.test(ch)?`<button type="button" class="hw-vowel" data-hw-vowel="${i}:${idx}:${ch.toLowerCase()}">${ch}</button>`:`<span>${ch}</span>`).join('')}</div><div class="small muted">Dấu đặt trên chữ nào?</div><div class="hw-rule-feedback small" id="hwRuleFeedback${i}">${done?'✅ '+esc(x.why):''}</div></article>`;
}

function renderPinyinGroup(group){
  const filled=group.items.filter(x=>String(hwState.pinyinAnswers[x.id]||'').trim()).length;
  const tones=group.items.filter(x=>[1,2,3,4].includes(Number(hwState.toneChoices[x.id]))).length;
  return `<article class="hw-pinyin-group" id="hwGroup-${group.id}">
    <div class="hw-pinyin-group-head">
      <div><h3>${esc(group.title)}</h3><p class="small muted">Nghe video QR: âm Pinyin → 4 tone → chọn tone đúng cho từng hình.</p></div>
      <div class="hw-pinyin-group-actions">
        <button type="button" class="primary" data-hw-source="${group.id}">🔊 Nghe bài QR</button>
        <span class="small muted" id="hwGroupCount-${group.id}">Pinyin ${filled}/${group.items.length} · Tone ${tones}/${group.items.length}</span>
      </div>
    </div>
    <div class="hw-source-player" id="hwSource-${group.id}" hidden></div>
    <div class="hw-picture-grid">${group.items.map((item,i)=>renderPinyinToneItem(group,item,i)).join('')}</div>
  </article>`;
}

function renderPinyinToneItem(group,item,i){
  const raw=String(hwState.pinyinAnswers[item.id]||'');
  const tone=Number(hwState.toneChoices[item.id]||0);
  const preview=tone && raw.trim() ? applyChosenTone(raw,tone) : '';
  const labels={1:'1 ¯',2:'2 ´',3:'3 ˇ',4:'4 `'};
  return `<div class="hw-picture-item ${tone?'has-tone':''}" id="hwPic-${item.id}">
    <div class="hw-picture-index">${i+1}</div>
    <img src="${item.img}" alt="Bài Pinyin ${esc(group.title)} hình ${i+1}" loading="lazy">
    <input class="hw-pinyin-input" type="text" inputmode="text" autocomplete="off" autocapitalize="off" spellcheck="false" data-hw-pinyin="${item.id}" data-hw-group="${group.id}" value="${esc(raw)}" placeholder="pinyin..." aria-label="Nhập pinyin cho hình ${i+1}">
    <div class="hw-tone-choice-label small muted">Tone nào đúng?</div>
    <div class="hw-tone-choices" role="group" aria-label="Chọn tone cho hình ${i+1}">${[1,2,3,4].map(t=>`<button type="button" class="hw-tone-choice ${tone===t?'is-selected':''}" data-hw-tone-choice="${item.id}:${t}" data-hw-group="${group.id}" aria-pressed="${tone===t?'true':'false'}">${labels[t]}</button>`).join('')}</div>
    <div class="hw-tone-preview small" id="hwTonePreview-${item.id}">${preview?`Bạn chọn: <strong>tone ${tone}</strong> → <strong>${esc(preview)}</strong>`:'Chưa chọn tone'}</div>
  </div>`;
}

function bindHomework(){
  document.querySelectorAll('[data-hw-listen]').forEach(b=>b.addEventListener('click',()=>homeworkListen(b.dataset.hwListen)));
  document.querySelectorAll('[data-hw-check]').forEach(b=>b.addEventListener('click',()=>homeworkCheck(b.dataset.hwCheck,b)));
  document.querySelectorAll('[data-hw-vowel]').forEach(b=>b.addEventListener('click',()=>checkTonePlacement(b)));
  document.querySelectorAll('[data-hw-page-done]').forEach(b=>b.addEventListener('click',()=>{const i=b.dataset.hwPageDone;hwState.viewed['page'+i]=!hwState.viewed['page'+i];saveHomeworkState();renderHomework();}));
  document.querySelectorAll('[data-hw-source]').forEach(b=>b.addEventListener('click',()=>toggleHomeworkSource(b.dataset.hwSource,b)));
  document.querySelectorAll('[data-hw-pinyin]').forEach(input=>{
    input.addEventListener('input',()=>savePinyinInput(input));
    input.addEventListener('change',()=>savePinyinInput(input));
  });
  document.querySelectorAll('[data-hw-tone-choice]').forEach(button=>button.addEventListener('click',()=>saveToneChoice(button)));
  hwEl('hwConvertToneBtn')?.addEventListener('click',convertAllNumberedPinyin);
  hwEl('hwBuildPhoneBtn')?.addEventListener('click',buildPhoneReading);
  hwEl('hwListenPhoneBtn')?.addEventListener('click',()=>{const x=phoneTarget(); if(x.hanzi) speak(x.hanzi,.82);});
  hwEl('hwCheckPhoneBtn')?.addEventListener('click',e=>checkPhone(e.currentTarget));
  hwEl('hwPhoneNumber')?.addEventListener('input',buildPhoneReading);
  hwEl('hwResetBtn')?.addEventListener('click',()=>{if(confirm('Xóa tiến độ HomeWork 1 và làm lại từ đầu?')){localStorage.removeItem(HOMEWORK_STORAGE_KEY);localStorage.removeItem('tocfl-homework-1-v2');localStorage.removeItem('tocfl-homework-1-v1');hwState=loadHomeworkState();renderHomework();}});
}

function savePinyinInput(input){
  const id=input.dataset.hwPinyin;
  hwState.pinyinAnswers[id]=input.value;
  persistHomeworkState();
  updateHomeworkProgress();
  updatePinyinGroupCount(input.dataset.hwGroup);
  updateTonePreview(id);
}

function saveToneChoice(button){
  const [id,toneRaw]=button.dataset.hwToneChoice.split(':');
  const tone=Number(toneRaw);
  hwState.toneChoices[id]=tone;
  persistHomeworkState();
  const card=hwEl('hwPic-'+id);
  card?.querySelectorAll('[data-hw-tone-choice]').forEach(b=>{
    const chosen=Number(b.dataset.hwToneChoice.split(':')[1])===tone;
    b.classList.toggle('is-selected',chosen);
    b.setAttribute('aria-pressed',chosen?'true':'false');
  });
  card?.classList.add('has-tone');
  updateTonePreview(id);
  updateHomeworkProgress();
  updatePinyinGroupCount(button.dataset.hwGroup);
}

function updateTonePreview(id){
  const out=hwEl('hwTonePreview-'+id); if(!out)return;
  const raw=String(hwState.pinyinAnswers[id]||'').trim();
  const tone=Number(hwState.toneChoices[id]||0);
  if(!tone){out.textContent='Chưa chọn tone';return;}
  if(!raw){out.innerHTML=`Đã chọn <strong>tone ${tone}</strong> · hãy điền Pinyin để ghép dấu.`;return;}
  out.innerHTML=`Bạn chọn: <strong>tone ${tone}</strong> → <strong>${esc(applyChosenTone(raw,tone))}</strong>`;
}

function updatePinyinGroupCount(groupId){
  const group=HW1.pinyinGroups.find(g=>g.id===groupId); if(!group)return;
  const filled=group.items.filter(x=>String(hwState.pinyinAnswers[x.id]||'').trim()).length;
  const tones=group.items.filter(x=>[1,2,3,4].includes(Number(hwState.toneChoices[x.id]))).length;
  const el=hwEl('hwGroupCount-'+groupId); if(el)el.textContent=`Pinyin ${filled}/${group.items.length} · Tone ${tones}/${group.items.length}`;
}

function toggleHomeworkSource(groupId,button){
  const group=HW1.pinyinGroups.find(g=>g.id===groupId); const panel=hwEl('hwSource-'+groupId);
  if(!group||!panel)return;
  const isOpen=!panel.hidden;
  // Keep only one embedded QR source open at a time.
  document.querySelectorAll('.hw-source-player').forEach(x=>{x.hidden=true;x.innerHTML='';});
  document.querySelectorAll('[data-hw-source]').forEach(x=>x.textContent='🔊 Nghe bài QR');
  if(isOpen)return;
  panel.hidden=false;
  panel.innerHTML=`<div class="hw-source-meta"><div><strong>${esc(group.sourceLabel)}</strong><div class="small muted">Nguồn QR trong worksheet</div></div><a class="button-link" href="https://www.youtube.com/watch?v=${encodeURIComponent(group.youtubeId)}" target="_blank" rel="noopener">↗ Mở YouTube</a></div><div class="hw-video-frame"><iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(group.youtubeId)}?autoplay=1&rel=0" title="${esc(group.sourceLabel)}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe></div>`;
  button.textContent='⏹ Đóng bài nghe';
  panel.scrollIntoView({behavior:'smooth',block:'nearest'});
}

function checkTonePlacement(btn){
  const [i,,v]=btn.dataset.hwVowel.split(':'); const x=HW1.toneRules[Number(i)];
  const card=hwEl('hwRule'+i), feedback=hwEl('hwRuleFeedback'+i);
  card.querySelectorAll('.hw-vowel').forEach(b=>b.classList.remove('is-correct','is-wrong'));
  if(v===x.answer){btn.classList.add('is-correct');feedback.textContent='✅ '+x.why;hwState.toneRuleDone[i]=true;card.classList.add('is-done');saveHomeworkState();}
  else{btn.classList.add('is-wrong');feedback.textContent='❌ Chưa đúng. Hãy áp dụng thứ tự a > o > e > i > u > ü; riêng iu/ui lấy nguyên âm thứ hai.';}
}

function homeworkListen(key){
  const [type,s]=key.split(':'); const i=Number(s);
  if(type==='tone') speak(HW1.tones[i].hanzi,.8);
  if(type==='number') speak(HW1.numbers[i].h,.82);
}

async function homeworkCheck(key,button){
  if(hwBusy)return;
  const [type,s]=key.split(':'); const i=Number(s);
  const item= type==='tone' ? HW1.tones[i] : HW1.numbers[i];
  const target=item.hanzi||item.h;
  const pinyin=item.pinyin||item.p;
  const out= type==='tone' ? hwEl('hwToneResult'+i) : hwEl('hwNumberResult'+i);
  const doneMap=type==='tone'?hwState.toneDone:hwState.numberDone;
  await runHomeworkSpeechCheck({target,pinyin,out,button,onPass:()=>{doneMap[i]=true;saveHomeworkState();}});
}

async function checkPhone(button){
  const x=phoneTarget(); const out=hwEl('hwPhoneResult');
  if(!x.hanzi){out.textContent='Hãy nhập số điện thoại trước.';return;}
  await runHomeworkSpeechCheck({target:x.hanzi,pinyin:x.pinyin,out,button,onPass:null,duration:6500});
}

async function runHomeworkSpeechCheck({target,pinyin,out,button,onPass,duration=3500}){
  if(!window.TOCFLAuth?.getSession?.()?.user){out.textContent='🔐 Hãy đăng nhập trước. Sau đó kiểm tra lại.';window.TOCFLAuth?.openAuth?.('login');return;}
  if(!window.TOCFLAuth?.transcribeWithGroq){out.textContent='⚠️ Chưa sẵn sàng Groq AI Speech.';return;}
  hwBusy=true; const old=button?.textContent; if(button){button.disabled=true;button.textContent='🎧 Nói ngay…';}
  out.textContent=`🎧 Đang nghe ${duration>4000?'dãy số':'mẫu'}…`;
  try{
    if('speechSynthesis' in window) try{speechSynthesis.cancel();}catch{}
    const clip=await capturePronunciationClip(duration);
    out.textContent='🤖 AI đang nhận dạng…';
    const result=await window.TOCFLAuth.transcribeWithGroq(clip,target);
    const recognized=String(result?.text||'').trim();
    if(!recognized) throw Object.assign(new Error('AI không nhận được chữ.'),{code:'NO_TRANSCRIPT'});
    const a=normalizeChinese(target), b=normalizeChinese(recognized);
    const score=Math.max(0,Math.min(100,Math.round(similarity(a,b)*100)));
    out.innerHTML=`<strong>${score}/100</strong> · Mẫu: <strong>${esc(target)} ${esc(pinyin||'')}</strong> · AI nghe: <strong>${esc(recognized)}</strong><br>${score>=95?'✅ AI nhận đúng mẫu.':score>=60?'🟡 Khá gần — nghe mẫu và thử lại.':'❌ AI nghe thành từ khác — đọc chậm, rõ rồi thử lại.'}`;
    if(score>=95 && onPass)onPass();
  }catch(err){
    const code=String(err?.code||'');
    if(code==='NOT_CONNECTED')out.textContent='☁️ Chưa kết nối Groq API Key. Mở Tài khoản → Groq AI Speech cá nhân.';
    else if(code==='MIC_PERMISSION')out.textContent='🔒 Hãy cấp quyền microphone cho website.';
    else out.textContent='⚠️ '+(err?.message||'Không kiểm tra được. Hãy thử lại.');
  }finally{hwBusy=false;if(button){button.disabled=false;button.textContent=old;}}
}

function phoneTarget(){
  const digits=String(hwEl('hwPhoneNumber')?.value||'').replace(/\D/g,'');
  const map={0:['零','líng'],1:['一','yī'],2:['二','èr'],3:['三','sān'],4:['四','sì'],5:['五','wǔ'],6:['六','liù'],7:['七','qī'],8:['八','bā'],9:['九','jiǔ']};
  return {hanzi:[...digits].map(d=>map[d]?.[0]||'').join(' '),pinyin:[...digits].map(d=>map[d]?.[1]||'').join(' '),digits};
}
function buildPhoneReading(){
  const x=phoneTarget(), el=hwEl('hwPhoneReading'); if(!el)return;
  el.innerHTML=x.digits?`<div><strong>Hán tự:</strong> ${esc(x.hanzi)}</div><div><strong>Pinyin:</strong> ${esc(x.pinyin)}</div>`:'Nhập số điện thoại để tạo cách đọc.';
}

// Convenience helper only: it changes numbered Pinyin typed by the learner into tone marks.
// It does not supply or grade any worksheet answer.
function numberedPinyinToMarks(text){
  const marks={
    a:['a','ā','á','ǎ','à'], e:['e','ē','é','ě','è'], i:['i','ī','í','ǐ','ì'],
    o:['o','ō','ó','ǒ','ò'], u:['u','ū','ú','ǔ','ù'], ü:['ü','ǖ','ǘ','ǚ','ǜ']
  };
  return String(text||'').replace(/([A-Za-züÜvV:]+)([1-5])/g,(m,raw,num)=>{
    const tone=Number(num); let syl=raw.replace(/u:/ig,'ü').replace(/v/ig,'ü');
    if(tone===5)return syl;
    const low=syl.toLowerCase(); let idx=-1;
    if(low.includes('a'))idx=low.indexOf('a');
    else if(low.includes('e'))idx=low.indexOf('e');
    else if(low.includes('ou'))idx=low.indexOf('o');
    else{
      for(let j=syl.length-1;j>=0;j--){if('aeiouü'.includes(low[j])){idx=j;break;}}
    }
    if(idx<0)return syl;
    const ch=low[idx], mark=marks[ch]?.[tone]||syl[idx];
    const out=(syl[idx]===syl[idx].toUpperCase()&&/[A-ZÜ]/.test(syl[idx]))?mark.toUpperCase():mark;
    return syl.slice(0,idx)+out+syl.slice(idx+1);
  });
}

function stripPinyinToneMarks(text){
  const map={
    'ā':'a','á':'a','ǎ':'a','à':'a','Ā':'A','Á':'A','Ǎ':'A','À':'A',
    'ē':'e','é':'e','ě':'e','è':'e','Ē':'E','É':'E','Ě':'E','È':'E',
    'ī':'i','í':'i','ǐ':'i','ì':'i','Ī':'I','Í':'I','Ǐ':'I','Ì':'I',
    'ō':'o','ó':'o','ǒ':'o','ò':'o','Ō':'O','Ó':'O','Ǒ':'O','Ò':'O',
    'ū':'u','ú':'u','ǔ':'u','ù':'u','Ū':'U','Ú':'U','Ǔ':'U','Ù':'U',
    'ǖ':'ü','ǘ':'ü','ǚ':'ü','ǜ':'ü','Ǖ':'Ü','Ǘ':'Ü','Ǚ':'Ü','Ǜ':'Ü'
  };
  return String(text||'').replace(/[āáǎàĀÁǍÀēéěèĒÉĚÈīíǐìĪÍǏÌōóǒòŌÓǑÒūúǔùŪÚǓÙǖǘǚǜǕǗǙǛ]/g,ch=>map[ch]||ch).replace(/[1-5]/g,'').trim();
}

function applyChosenTone(raw,tone){
  const base=stripPinyinToneMarks(raw);
  if(!base)return '';
  return base.split(/(\s+|-)/).map(part=>/^[A-Za-züÜvV:]+$/.test(part)?numberedPinyinToMarks(part+tone):part).join('');
}
function convertAllNumberedPinyin(){
  let changed=0;
  document.querySelectorAll('[data-hw-pinyin]').forEach(input=>{
    const next=numberedPinyinToMarks(input.value);
    if(next!==input.value){input.value=next;changed++;savePinyinInput(input);}
  });
  const btn=hwEl('hwConvertToneBtn');
  if(btn){const old=btn.textContent;btn.textContent=changed?`✅ Đã đổi ${changed} ô`:'Không có số thanh cần đổi';setTimeout(()=>btn.textContent=old,1600);}
}

function updateHomeworkProgress(){
  const p=homeworkProgress(); if(hwEl('hwProgressPct'))hwEl('hwProgressPct').textContent=p.pct+'%';
  if(hwEl('hwProgressBar'))hwEl('hwProgressBar').style.width=p.pct+'%';
  if(hwEl('hwProgressText'))hwEl('hwProgressText').textContent=`${p.done} / ${p.total} mục`;
  const count=hwEl('hwPinyinCount'); if(count)count.textContent=`Pinyin ${pinyinFilledCount()}/${allPinyinItems().length} · đã chọn tone ${toneSelectedCount()}/${allPinyinItems().length}`;
}

function initHomework(){renderHomework();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initHomework,{once:true}); else initHomework();
