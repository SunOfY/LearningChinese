'use strict';

// HomeWork 1 is reconstructed from the attached 3-page worksheet.
// Where the PDF gives an explicit answer/rule, the site can check it.
// Picture-to-pinyin rows are intentionally NOT auto-graded because the PDF itself
// only shows pictures + blank pinyin boxes; the QR source is provided for listening.

const HOMEWORK_STORAGE_KEY = 'tocfl-homework-1-v4';

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


const HW_I18N = {
  vi: {
    heroEyebrow:'HOMEWORK · BÀI TẬP 1', heroTitle:'Introduction to Mandarin Pinyin',
    heroDesc:'Mục tiêu trước khi lên lớp: hiểu 4 thanh điệu, biết đặt dấu đúng, nghe QR và tự điền Pinyin vào các ô giống worksheet gốc.',
    itemUnit:'mục', openPdf:'📄 Mở PDF gốc', pinyinChart:'🎧 Interactive Pinyin Chart',
    rememberTip:'<strong>Nhớ 1 câu:</strong> Pinyin cho biết âm gì · số thanh cho biết giọng lên/xuống · <code>a &gt; o &gt; e &gt; i &gt; u &gt; ü</code> chỉ giúp quyết định dấu viết trên nguyên âm nào. Riêng <code>iu/ui</code> đặt dấu ở nguyên âm thứ hai.',
    part1:'PHẦN 1', part1Title:'4 thanh điệu — nghe rồi tự đọc', tone:n=>`Thanh ${n}`, listen:'🔊 Nghe', aiCheck:'🎙 AI kiểm tra', practiced:'✅ Đã luyện', notChecked:'Chưa kiểm tra',
    toneDescs:['cao và ngang','đi lên','xuống rồi lên','đi xuống mạnh'], toneMeanings:['mẹ','tê','ngựa','mắng'],
    aiNote:'AI hiện tại dùng Groq Whisper để nhận dạng chữ bạn nói. Nếu AI nhận đúng chữ mẫu thì phát âm của bạn đã đủ gần để hệ thống hiểu; đây chưa phải máy chấm đường cao độ/thanh điệu chuyên sâu.',
    part2:'PHẦN 2', part2Title:'Đặt dấu thanh đúng vị trí', part2Desc:'Bấm vào nguyên âm mà bạn nghĩ phải mang dấu. Đây là đúng danh sách luyện tập ở trang 1 của PDF.', ruleQuestion:'Dấu đặt trên chữ nào?',
    part3:'PHẦN 3', part3Title:'Số 0–10 và số điện thoại', part3Desc:'Bấm nghe, đọc lại rồi dùng AI để kiểm tra.',
    phoneTitle:'📱 Give me your phone number', phoneDesc:'Ví dụ trong PDF: <strong>Lǐ Yīngměi 0913-785-246</strong>. Số bạn nhập chỉ được dùng ngay trên trình duyệt và không lưu vào tiến độ.', namePlaceholder:'Tên, ví dụ: Lǐ Yīngměi', buildReading:'Tạo cách đọc', listenDigits:'🔊 Nghe dãy số', checkDigits:'🎙 AI kiểm tra dãy số',
    part4:'PHẦN 4 · PINYIN + TONE', part4Title:'Nghe QR → điền Pinyin → chọn tone đúng', part4Desc:'Video cho nghe Pinyin trước, sau đó đọc âm đó với 4 tone. Với mỗi hình, hãy điền Pinyin rồi chọn thanh đúng cho từng âm tiết.',
    part4Tip:'<strong>Cách làm:</strong> ① bấm <strong>Nghe bài QR</strong> ② điền Pinyin ③ chọn tone <strong>cho từng âm tiết</strong>. Từ ghép hãy cách âm tiết bằng dấu cách, ví dụ <code>hong lv deng</code>. Bạn có thể gõ <code>v</code> hoặc <code>u:</code> thay cho <code>ü</code>, hoặc bấm nút <strong>ü</strong>. Web sẽ tự đổi thành <code>ü</code>. Ví dụ <code>hong lv deng + 2/4/1 → hóng lǜ dēng</code>. <strong>Lựa chọn được lưu tự động.</strong>',
    convertTone:'✨ Đổi số thanh → dấu (ni3 → nǐ)', groupHint:'Nghe video QR: âm Pinyin → 4 tone → chọn tone đúng cho từng hình.', listenQR:'🔊 Nghe bài QR', toneComplete:(a,b)=>`Tone hoàn tất ${a}/${b}`, pinyinCount:(a,b,c,d)=>`Pinyin ${a}/${b} · đã chọn tone ${c}/${d}`,
    compoundHint:'Từ ghép: cách âm tiết bằng dấu cách, ví dụ <strong>hong lv deng</strong>.', selectEachTone:'Chọn tone cho từng âm tiết', noSyllable:'Chưa có âm tiết.', fillFirst:'Điền Pinyin trước để chọn tone.', insertUmlaut:'Chèn chữ ü',
    part5:'PHẦN 5', part5Title:'Đối chiếu trang gốc + toàn bộ QR', part5Desc:'Dùng phần này khi bạn muốn nhìn lại nguyên trang PDF hoặc mở riêng từng nguồn QR.', viewLarge:i=>`🔎 Xem lớn trang ${i}`, viewed:'✅ Đã xem', markViewed:'Đánh dấu đã xem', openQrVideo:'Mở video QR', openPinyinTool:'Mở công cụ luyện Pinyin',
    checklistTitle:'✅ Checklist trước khi lên lớp', checklist:'1) Phân biệt được mā / má / mǎ / mà. 2) Biết đặt dấu trên âm như <strong>mao, fei, liu, dui</strong>. 3) Đọc được 0–10. 4) Nghe từng QR và hoàn thành các ô Pinyin của trang 2–3.', reset:'Làm lại HomeWork 1 từ đầu', resetConfirm:'Xóa tiến độ HomeWork 1 và làm lại từ đầu?',
    sourceWorksheet:'Nguồn QR trong worksheet', openYoutube:'↗ Mở YouTube', closeAudio:'⏹ Đóng bài nghe',
    wrongRule:'❌ Chưa đúng. Hãy áp dụng thứ tự a > o > e > i > u > ü; riêng iu/ui lấy nguyên âm thứ hai.',
    ruleWhy:['Có a → luôn đặt dấu lên a.','Có a → luôn đặt dấu lên a.','Có a → luôn đặt dấu lên a.','Không có a; o đứng trước u trong thứ tự ưu tiên.','Không có a; chọn o.','Không có a/o; chọn e.','iu đi cùng nhau → đặt dấu trên nguyên âm thứ hai: u.','iu đi cùng nhau → đặt dấu trên nguyên âm thứ hai: u.','iu đi cùng nhau → đặt dấu trên nguyên âm thứ hai: u.','ui đi cùng nhau → đặt dấu trên nguyên âm thứ hai: i.','ui đi cùng nhau → đặt dấu trên nguyên âm thứ hai: i.','ui đi cùng nhau → đặt dấu trên nguyên âm thứ hai: i.'],
    groupTitles:{p2r1:'Trang 2 · Hàng 1',p2r2:'Trang 2 · Hàng 2',p2r3:'Trang 2 · Hàng 3',p3animals:'Trang 3 · Nhóm hình đầu',p3last:'Trang 3 · Nhóm sau QR thứ hai'},
    videoTitles:['Giới thiệu Mandarin Pinyin','Pinyin · Number','Pinyin · Part 1','Pinyin · Part 2','Pinyin · Part 3','Pinyin · Part 4','Bài luyện bổ sung','Interactive Pinyin Chart'],
    pictureAlt:(g,i)=>`Bài Pinyin ${g} hình ${i}`, toneAria:(i,s)=>`Chọn tone cho âm tiết ${i}: ${s}`,
    phoneEmpty:'Hãy nhập số điện thoại trước.', loginFirst:'🔐 Hãy đăng nhập trước. Sau đó kiểm tra lại.', groqNotReady:'⚠️ Chưa sẵn sàng Groq AI Speech.', speakNow:'🎧 Nói ngay…', listening:isDigits=>`🎧 Đang nghe ${isDigits?'dãy số':'mẫu'}…`, aiRecognizing:'🤖 AI đang nhận dạng…', noTranscript:'AI không nhận được chữ.', sample:'Mẫu', heard:'AI nghe', exact:'✅ AI nhận đúng mẫu.', close:'🟡 Khá gần — nghe mẫu và thử lại.', different:'❌ AI nghe thành từ khác — đọc chậm, rõ rồi thử lại.', notConnected:'☁️ Chưa kết nối Groq API Key. Mở Tài khoản → Groq AI Speech cá nhân.', micPermission:'🔒 Hãy cấp quyền microphone cho website.', genericError:'Không kiểm tra được. Hãy thử lại.',
    hanzi:'Hán tự:', enterPhone:'Nhập số điện thoại để tạo cách đọc.', converted:n=>`✅ Đã đổi ${n} ô`, nothingToConvert:'Không có số thanh cần đổi', progress:(a,b)=>`${a} / ${b} mục`
  },
  en: {
    heroEyebrow:'HOMEWORK · ASSIGNMENT 1', heroTitle:'Introduction to Mandarin Pinyin',
    heroDesc:'Goal before class: understand the 4 tones, place tone marks correctly, listen to the QR exercises, and fill in the Pinyin boxes like the original worksheet.',
    itemUnit:'items', openPdf:'📄 Open original PDF', pinyinChart:'🎧 Interactive Pinyin Chart',
    rememberTip:'<strong>One rule to remember:</strong> Pinyin tells you the sound · the tone number tells you the pitch movement · <code>a &gt; o &gt; e &gt; i &gt; u &gt; ü</code> only tells you which vowel receives the tone mark. For <code>iu/ui</code>, mark the second vowel.',
    part1:'PART 1', part1Title:'The 4 tones — listen and repeat', tone:n=>`Tone ${n}`, listen:'🔊 Listen', aiCheck:'🎙 AI check', practiced:'✅ Practiced', notChecked:'Not checked',
    toneDescs:['high and level','rising','falling then rising','sharp falling'], toneMeanings:['mother','hemp / numb','horse','scold'],
    aiNote:'The current AI check uses Groq Whisper to recognize the Chinese text you say. If it recognizes the target character, your pronunciation is close enough for speech recognition, but this is not a professional pitch/tone assessment.',
    part2:'PART 2', part2Title:'Place the tone mark correctly', part2Desc:'Tap the vowel that should carry the tone mark. These are the same practice items as page 1 of the PDF.', ruleQuestion:'Which vowel gets the tone mark?',
    part3:'PART 3', part3Title:'Numbers 0–10 and phone number', part3Desc:'Listen, repeat, then use AI to check.',
    phoneTitle:'📱 Give me your phone number', phoneDesc:'Example from the PDF: <strong>Lǐ Yīngměi 0913-785-246</strong>. The number you enter is used only in the browser and is not saved in your progress.', namePlaceholder:'Name, e.g. Lǐ Yīngměi', buildReading:'Build reading', listenDigits:'🔊 Listen to digits', checkDigits:'🎙 AI check digits',
    part4:'PART 4 · PINYIN + TONE', part4Title:'Listen to QR → enter Pinyin → choose the correct tones', part4Desc:'The video gives the Pinyin first and then reads it with four tones. Enter the Pinyin for each picture and choose a tone for every syllable.',
    part4Tip:'<strong>How to do it:</strong> ① tap <strong>Listen to QR</strong> ② enter Pinyin ③ choose a tone <strong>for each syllable</strong>. Separate compound syllables with spaces, for example <code>hong lv deng</code>. You may type <code>v</code> or <code>u:</code> for <code>ü</code>, or tap the <strong>ü</strong> button. The site converts it automatically. Example: <code>hong lv deng + 2/4/1 → hóng lǜ dēng</code>. <strong>Your choices are saved automatically.</strong>',
    convertTone:'✨ Convert tone numbers → marks (ni3 → nǐ)', groupHint:'Listen to the QR video: Pinyin sound → four tones → choose the correct tone for each picture.', listenQR:'🔊 Listen to QR', toneComplete:(a,b)=>`Tone complete ${a}/${b}`, pinyinCount:(a,b,c,d)=>`Pinyin ${a}/${b} · tones completed ${c}/${d}`,
    compoundHint:'Compound words: separate syllables with spaces, e.g. <strong>hong lv deng</strong>.', selectEachTone:'Choose a tone for each syllable', noSyllable:'No syllable yet.', fillFirst:'Enter Pinyin first to choose tones.', insertUmlaut:'Insert ü',
    part5:'PART 5', part5Title:'Compare with the original pages + all QR links', part5Desc:'Use this section to view the original worksheet pages or open each QR source separately.', viewLarge:i=>`🔎 Enlarge page ${i}`, viewed:'✅ Viewed', markViewed:'Mark as viewed', openQrVideo:'Open QR video', openPinyinTool:'Open Pinyin tool',
    checklistTitle:'✅ Checklist before class', checklist:'1) Distinguish mā / má / mǎ / mà. 2) Place tone marks correctly in <strong>mao, fei, liu, dui</strong>. 3) Read 0–10. 4) Listen to every QR exercise and complete the Pinyin boxes on pages 2–3.', reset:'Restart HomeWork 1', resetConfirm:'Delete HomeWork 1 progress and start over?',
    sourceWorksheet:'QR source from the worksheet', openYoutube:'↗ Open YouTube', closeAudio:'⏹ Close audio',
    wrongRule:'❌ Not yet. Use the priority a > o > e > i > u > ü; for iu/ui, mark the second vowel.',
    ruleWhy:['There is an a → always mark a.','There is an a → always mark a.','There is an a → always mark a.','No a; o has priority over u.','No a; choose o.','No a/o; choose e.','For iu, mark the second vowel: u.','For iu, mark the second vowel: u.','For iu, mark the second vowel: u.','For ui, mark the second vowel: i.','For ui, mark the second vowel: i.','For ui, mark the second vowel: i.'],
    groupTitles:{p2r1:'Page 2 · Row 1',p2r2:'Page 2 · Row 2',p2r3:'Page 2 · Row 3',p3animals:'Page 3 · First picture group',p3last:'Page 3 · Group after the second QR'},
    videoTitles:['Mandarin Pinyin introduction','Pinyin · Numbers','Pinyin · Part 1','Pinyin · Part 2','Pinyin · Part 3','Pinyin · Part 4','Extra QR practice','Interactive Pinyin Chart'],
    pictureAlt:(g,i)=>`Pinyin exercise ${g}, picture ${i}`, toneAria:(i,s)=>`Choose tone for syllable ${i}: ${s}`,
    phoneEmpty:'Enter a phone number first.', loginFirst:'🔐 Sign in first, then try again.', groqNotReady:'⚠️ Groq AI Speech is not ready.', speakNow:'🎧 Speak now…', listening:isDigits=>`🎧 Listening to ${isDigits?'the digit sequence':'the target'}…`, aiRecognizing:'🤖 AI is transcribing…', noTranscript:'AI did not recognize any text.', sample:'Target', heard:'AI heard', exact:'✅ AI recognized the target.', close:'🟡 Quite close — listen to the sample and try again.', different:'❌ AI heard a different word — speak slowly and clearly, then try again.', notConnected:'☁️ No Groq API Key connected. Open Account → Personal Groq AI Speech.', micPermission:'🔒 Allow microphone access for this website.', genericError:'Could not check pronunciation. Please try again.',
    hanzi:'Hanzi:', enterPhone:'Enter a phone number to build the reading.', converted:n=>`✅ Converted ${n} box${n===1?'':'es'}`, nothingToConvert:'No tone numbers to convert', progress:(a,b)=>`${a} / ${b} items`
  },
  'zh-Hant': {
    heroEyebrow:'作業 · 第 1 份', heroTitle:'Mandarin Pinyin 拼音入門',
    heroDesc:'上課前目標：了解四聲、正確標聲調、聽 QR 練習，並像原始講義一樣填寫拼音。',
    itemUnit:'項', openPdf:'📄 開啟原始 PDF', pinyinChart:'🎧 互動拼音表',
    rememberTip:'<strong>記住一句話：</strong>拼音告訴你讀什麼音 · 聲調數字告訴你音高走向 · <code>a &gt; o &gt; e &gt; i &gt; u &gt; ü</code> 只用來決定聲調符號標在哪個母音上。<code>iu/ui</code> 則標在第二個母音。',
    part1:'第 1 部分', part1Title:'四聲 — 先聽再自己讀', tone:n=>`第 ${n} 聲`, listen:'🔊 聽', aiCheck:'🎙 AI 檢查', practiced:'✅ 已練習', notChecked:'尚未檢查',
    toneDescs:['高而平','上升','先降再升','快速下降'], toneMeanings:['媽媽','麻／麻木','馬','罵'],
    aiNote:'目前的 AI 檢查使用 Groq Whisper 辨識你說出的中文字。若 AI 能辨識目標字，代表發音已接近可辨識範圍；這不是專業的音高／聲調評分器。',
    part2:'第 2 部分', part2Title:'把聲調標在正確位置', part2Desc:'點選你認為應該標聲調的母音。題目與 PDF 第 1 頁的練習相同。', ruleQuestion:'聲調要標在哪個字母？',
    part3:'第 3 部分', part3Title:'0–10 與電話號碼', part3Desc:'先聽、再跟讀，然後用 AI 檢查。',
    phoneTitle:'📱 Give me your phone number', phoneDesc:'PDF 範例：<strong>Lǐ Yīngměi 0913-785-246</strong>。你輸入的號碼只在瀏覽器中即時使用，不會存入學習進度。', namePlaceholder:'姓名，例如：Lǐ Yīngměi', buildReading:'產生讀法', listenDigits:'🔊 聽號碼', checkDigits:'🎙 AI 檢查號碼',
    part4:'第 4 部分 · 拼音 + 聲調', part4Title:'聽 QR → 填拼音 → 選正確聲調', part4Desc:'影片先念拼音，再用四個聲調示範。每張圖片請填拼音，並為每一個音節分別選擇聲調。',
    part4Tip:'<strong>做法：</strong>① 按 <strong>聽 QR</strong> ② 填入拼音 ③ 對<strong>每個音節</strong>選聲調。複合詞請用空格分開音節，例如 <code>hong lv deng</code>。可以輸入 <code>v</code> 或 <code>u:</code> 代表 <code>ü</code>，也可以直接按 <strong>ü</strong> 按鈕，網站會自動轉換。例如 <code>hong lv deng + 2/4/1 → hóng lǜ dēng</code>。<strong>選擇會自動儲存。</strong>',
    convertTone:'✨ 聲調數字轉符號 (ni3 → nǐ)', groupHint:'聽 QR 影片：拼音 → 四聲 → 為每張圖選正確聲調。', listenQR:'🔊 聽 QR', toneComplete:(a,b)=>`聲調完成 ${a}/${b}`, pinyinCount:(a,b,c,d)=>`拼音 ${a}/${b} · 聲調完成 ${c}/${d}`,
    compoundHint:'複合詞：用空格分開音節，例如 <strong>hong lv deng</strong>。', selectEachTone:'為每個音節選聲調', noSyllable:'尚未輸入音節。', fillFirst:'請先輸入拼音，再選聲調。', insertUmlaut:'插入 ü',
    part5:'第 5 部分', part5Title:'對照原始頁面 + 全部 QR', part5Desc:'需要查看原始 PDF 頁面或單獨開啟某個 QR 來源時可使用這一區。', viewLarge:i=>`🔎 放大第 ${i} 頁`, viewed:'✅ 已查看', markViewed:'標記為已查看', openQrVideo:'開啟 QR 影片', openPinyinTool:'開啟拼音工具',
    checklistTitle:'✅ 上課前檢查清單', checklist:'1) 能分辨 mā / má / mǎ / mà。2) 能在 <strong>mao, fei, liu, dui</strong> 等拼音上正確標聲調。3) 能讀 0–10。4) 聽完每個 QR 並完成第 2–3 頁的拼音欄。', reset:'重新做 HomeWork 1', resetConfirm:'刪除 HomeWork 1 的進度並從頭開始嗎？',
    sourceWorksheet:'講義中的 QR 來源', openYoutube:'↗ 開啟 YouTube', closeAudio:'⏹ 關閉聽力',
    wrongRule:'❌ 還不對。請依 a > o > e > i > u > ü 的優先順序；iu/ui 則標第二個母音。',
    ruleWhy:['有 a → 一律標在 a。','有 a → 一律標在 a。','有 a → 一律標在 a。','沒有 a；o 的優先順序高於 u。','沒有 a；選 o。','沒有 a/o；選 e。','iu 在一起時標第二個母音 u。','iu 在一起時標第二個母音 u。','iu 在一起時標第二個母音 u。','ui 在一起時標第二個母音 i。','ui 在一起時標第二個母音 i。','ui 在一起時標第二個母音 i。'],
    groupTitles:{p2r1:'第 2 頁 · 第 1 排',p2r2:'第 2 頁 · 第 2 排',p2r3:'第 2 頁 · 第 3 排',p3animals:'第 3 頁 · 第一組圖片',p3last:'第 3 頁 · 第二個 QR 後的圖片'},
    videoTitles:['Mandarin Pinyin 拼音介紹','拼音 · 數字','拼音 · Part 1','拼音 · Part 2','拼音 · Part 3','拼音 · Part 4','QR 補充練習','互動拼音表'],
    pictureAlt:(g,i)=>`拼音練習 ${g}，第 ${i} 張圖`, toneAria:(i,s)=>`為第 ${i} 個音節 ${s} 選聲調`,
    phoneEmpty:'請先輸入電話號碼。', loginFirst:'🔐 請先登入，再重新檢查。', groqNotReady:'⚠️ Groq AI Speech 尚未準備好。', speakNow:'🎧 現在請說…', listening:isDigits=>`🎧 正在聽${isDigits?'號碼':'目標詞'}…`, aiRecognizing:'🤖 AI 正在辨識…', noTranscript:'AI 沒有辨識到文字。', sample:'目標', heard:'AI 聽到', exact:'✅ AI 正確辨識目標。', close:'🟡 很接近 — 請再聽一次後重試。', different:'❌ AI 辨識成其他詞 — 請慢一點、清楚一點再試。', notConnected:'☁️ 尚未連接 Groq API Key。請開啟「帳號 → 個人 Groq AI Speech」。', micPermission:'🔒 請允許網站使用麥克風。', genericError:'無法檢查，請再試一次。',
    hanzi:'漢字：', enterPhone:'輸入電話號碼後產生讀法。', converted:n=>`✅ 已轉換 ${n} 格`, nothingToConvert:'沒有需要轉換的聲調數字', progress:(a,b)=>`${a} / ${b} 項`
  }
};

function hwLang(){
  const lang=window.TOCFLApp?.getLanguage?.() || localStorage.getItem('tocfl-a1-ui-language-v2') || 'vi';
  return HW_I18N[lang] ? lang : 'vi';
}
function hwt(key,...args){
  const pack=HW_I18N[hwLang()]||HW_I18N.vi;
  const value=pack[key] ?? HW_I18N.vi[key] ?? key;
  return typeof value==='function' ? value(...args) : value;
}
function hwRuleWhy(i){ return (HW_I18N[hwLang()]?.ruleWhy||HW_I18N.vi.ruleWhy)[i] || HW1.toneRules[i]?.why || ''; }
function hwGroupTitle(id){ return HW_I18N[hwLang()]?.groupTitles?.[id] || HW_I18N.vi.groupTitles[id] || id; }
function hwVideoTitle(i,fallback){ return (HW_I18N[hwLang()]?.videoTitles||HW_I18N.vi.videoTitles)[i] || fallback; }

let hwState = loadHomeworkState();
let hwBusy = false;

function hwEl(id){ return document.getElementById(id); }
function esc(s){ return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function allPinyinItems(){ return HW1.pinyinGroups.flatMap(g=>g.items); }

function loadHomeworkState(){
  try{
    // Migrate progress from previous HomeWork versions so learners do not lose their work.
    let x=JSON.parse(localStorage.getItem(HOMEWORK_STORAGE_KEY)||'null');
    if(!x){
      const old=JSON.parse(localStorage.getItem('tocfl-homework-1-v1')||'{}');
      const v2=JSON.parse(localStorage.getItem('tocfl-homework-1-v2')||'null');
      const v3=JSON.parse(localStorage.getItem('tocfl-homework-1-v3')||'null');
      x=v3||v2||{...old,pinyinAnswers:{}};
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
function normalizePinyinAliases(text){
  return String(text||'')
    .replace(/U:/g,'Ü').replace(/u:/g,'ü')
    .replace(/V/g,'Ü').replace(/v/g,'ü');
}
function pinyinSyllables(raw){
  const base=normalizePinyinAliases(stripPinyinToneMarks(raw));
  return base.match(/[A-Za-zÜü]+/g)||[];
}
function toneArrayFor(id,count){
  const stored=hwState.toneChoices[id];
  if(Array.isArray(stored)) return Array.from({length:count},(_,i)=>[1,2,3,4].includes(Number(stored[i]))?Number(stored[i]):0);
  // Old versions stored only one tone for the whole item. Keep it only for a true one-syllable item;
  // for compounds we intentionally ask the learner again instead of guessing which syllable it belonged to.
  if(count===1 && [1,2,3,4].includes(Number(stored))) return [Number(stored)];
  return Array(count).fill(0);
}
function toneItemComplete(item){
  const syllables=pinyinSyllables(hwState.pinyinAnswers[item.id]||'');
  if(!syllables.length)return false;
  const tones=toneArrayFor(item.id,syllables.length);
  return tones.length===syllables.length && tones.every(t=>[1,2,3,4].includes(Number(t)));
}
function toneSelectedCount(){ return allPinyinItems().filter(toneItemComplete).length; }
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
        <div class="eyebrow">${hwt('heroEyebrow')}</div>
        <h2>${hwt('heroTitle')}</h2>
        <p class="muted">${hwt('heroDesc')}</p>
      </div>
      <div class="hw-progress-box">
        <strong id="hwProgressPct">0%</strong>
        <div class="progress-bar"><div id="hwProgressBar"></div></div>
        <span id="hwProgressText" class="small muted">${hwt('progress',0,0)}</span>
      </div>
      <div class="toolbar hw-top-actions">
        <a class="button-link primary" href="./homework/homework-1-mandarin-pinyin.pdf" target="_blank" rel="noopener">${hwt('openPdf')}</a>
        <a class="button-link" href="https://yoyochinese.com/chinese-learning-tools/Mandarin-Chinese-pronunciation-lesson/pinyin-chart-table" target="_blank" rel="noopener">${hwt('pinyinChart')}</a>
      </div>
      <div class="tip-box">${hwt('rememberTip')}</div>
    </section>

    <section class="card hw-section">
      <div class="section-title-row"><div><div class="eyebrow">${hwt('part1')}</div><h2>${hwt('part1Title')}</h2></div></div>
      <div class="hw-tone-grid">${HW1.tones.map((x,i)=>`
        <article class="hw-tone-card ${hwState.toneDone[i]?'is-done':''}" data-tone-index="${i}">
          <div class="hw-tone-main"><span class="hw-tone-pinyin">${x.pinyin}</span><span class="hw-tone-shape">${x.shape}</span></div>
          <strong>${hwt('tone',x.tone)}</strong><span class="small muted">${esc(HW_I18N[hwLang()].toneDescs[i])} · ${esc(HW_I18N[hwLang()].toneMeanings[i])}</span>
          <div class="toolbar"><button type="button" data-hw-listen="tone:${i}">${hwt('listen')}</button><button type="button" class="primary" data-hw-check="tone:${i}">${hwt('aiCheck')}</button></div>
          <div class="hw-ai-result small" id="hwToneResult${i}">${hwState.toneDone[i]?hwt('practiced'):hwt('notChecked')}</div>
        </article>`).join('')}</div>
      <p class="small muted hw-note">${hwt('aiNote')}</p>
    </section>

    <section class="card hw-section">
      <div class="section-title-row"><div><div class="eyebrow">${hwt('part2')}</div><h2>${hwt('part2Title')}</h2><p class="muted">${hwt('part2Desc')}</p></div></div>
      <div class="hw-rule-grid">${HW1.toneRules.map((x,i)=>renderToneRuleItem(x,i)).join('')}</div>
    </section>

    <section class="card hw-section">
      <div class="section-title-row"><div><div class="eyebrow">${hwt('part3')}</div><h2>${hwt('part3Title')}</h2><p class="muted">${hwt('part3Desc')}</p></div></div>
      <div class="hw-number-grid">${HW1.numbers.map((x,i)=>`
        <article class="hw-number-card ${hwState.numberDone[i]?'is-done':''}">
          <span class="hw-number">${x.n}</span><strong>${x.h}</strong><span>${x.p}</span>
          <div class="toolbar"><button type="button" data-hw-listen="number:${i}">🔊</button><button type="button" data-hw-check="number:${i}">🎙</button></div>
          <div class="hw-ai-result small" id="hwNumberResult${i}">${hwState.numberDone[i]?hwt('practiced'):''}</div>
        </article>`).join('')}</div>
      <div class="hw-phone-box">
        <h3>${hwt('phoneTitle')}</h3>
        <p class="small muted">${hwt('phoneDesc')}</p>
        <div class="hw-phone-inputs"><input id="hwPhoneName" type="text" placeholder="${esc(hwt('namePlaceholder'))}"/><input id="hwPhoneNumber" type="tel" inputmode="numeric" placeholder="0913-785-246" value="0913-785-246"/></div>
        <div class="toolbar"><button id="hwBuildPhoneBtn" type="button">${hwt('buildReading')}</button><button id="hwListenPhoneBtn" type="button">${hwt('listenDigits')}</button><button id="hwCheckPhoneBtn" class="primary" type="button">${hwt('checkDigits')}</button></div>
        <div id="hwPhoneReading" class="hw-phone-reading"></div><div id="hwPhoneResult" class="hw-ai-result small"></div>
      </div>
    </section>

    <section class="card hw-section hw-pinyin-section">
      <div class="section-title-row"><div><div class="eyebrow">${hwt('part4')}</div><h2>${hwt('part4Title')}</h2><p class="muted">${hwt('part4Desc')}</p></div></div>
      <div class="tip-box hw-source-note">${hwt('part4Tip')}</div>
      <div class="toolbar hw-pinyin-tools"><button type="button" id="hwConvertToneBtn">${hwt('convertTone')}</button><span class="small muted" id="hwPinyinCount"></span></div>
      <div class="hw-pinyin-groups">${HW1.pinyinGroups.map(renderPinyinGroup).join('')}</div>
    </section>

    <section class="card hw-section">
      <div class="section-title-row"><div><div class="eyebrow">${hwt('part5')}</div><h2>${hwt('part5Title')}</h2><p class="muted">${hwt('part5Desc')}</p></div></div>
      <div class="hw-pages">${[1,2,3].map(i=>`
        <article class="hw-page-card ${hwState.viewed['page'+i]?'is-done':''}">
          <a href="./homework/homework-1-page-${i}.png" target="_blank" rel="noopener"><img src="./homework/homework-1-page-${i}.png" alt="Homework 1 page ${i}" loading="lazy"></a>
          <div class="toolbar"><a class="button-link" href="./homework/homework-1-page-${i}.png" target="_blank" rel="noopener">${hwt('viewLarge',i)}</a><button type="button" data-hw-page-done="${i}">${hwState.viewed['page'+i]?hwt('viewed'):hwt('markViewed')}</button></div>
        </article>`).join('')}</div>
      <div class="hw-video-grid">${HW1.videos.map(([title,url],i)=>`<a class="hw-video-link" href="${esc(url)}" target="_blank" rel="noopener"><span>${i<7?'▶':'🎧'}</span><strong>${esc(hwVideoTitle(i,title))}</strong><small>${i<7?hwt('openQrVideo'):hwt('openPinyinTool')}</small></a>`).join('')}</div>
    </section>

    <section class="card hw-section hw-finish">
      <h2>${hwt('checklistTitle')}</h2>
      <p>${hwt('checklist')}</p>
      <button id="hwResetBtn" type="button" class="danger">${hwt('reset')}</button>
    </section>`;

  bindHomework();
  buildPhoneReading();
  updateHomeworkProgress();
}

function renderToneRuleItem(x,i){
  const done=Boolean(hwState.toneRuleDone[i]);
  return `<article class="hw-rule-card ${done?'is-done':''}" id="hwRule${i}"><div class="hw-rule-word">${[...x.raw].map((ch,idx)=>/[aeiouü]/i.test(ch)?`<button type="button" class="hw-vowel" data-hw-vowel="${i}:${idx}:${ch.toLowerCase()}">${ch}</button>`:`<span>${ch}</span>`).join('')}</div><div class="small muted">${hwt('ruleQuestion')}</div><div class="hw-rule-feedback small" id="hwRuleFeedback${i}">${done?'✅ '+esc(hwRuleWhy(i)):''}</div></article>`;
}

function renderPinyinGroup(group){
  const filled=group.items.filter(x=>String(hwState.pinyinAnswers[x.id]||'').trim()).length;
  const tones=group.items.filter(toneItemComplete).length;
  const title=hwGroupTitle(group.id);
  return `<article class="hw-pinyin-group" id="hwGroup-${group.id}">
    <div class="hw-pinyin-group-head">
      <div><h3>${esc(title)}</h3><p class="small muted">${hwt('groupHint')}</p></div>
      <div class="hw-pinyin-group-actions">
        <button type="button" class="primary" data-hw-source="${group.id}">${hwt('listenQR')}</button>
        <span class="small muted" id="hwGroupCount-${group.id}">Pinyin ${filled}/${group.items.length} · ${hwt('toneComplete',tones,group.items.length)}</span>
      </div>
    </div>
    <div class="hw-source-player" id="hwSource-${group.id}" hidden></div>
    <div class="hw-picture-grid">${group.items.map((item,i)=>renderPinyinToneItem(group,item,i)).join('')}</div>
  </article>`;
}

function renderPinyinToneItem(group,item,i){
  const raw=String(hwState.pinyinAnswers[item.id]||'');
  const syllables=pinyinSyllables(raw);
  const tones=toneArrayFor(item.id,syllables.length);
  const complete=syllables.length>0 && tones.every(t=>[1,2,3,4].includes(Number(t)));
  const title=hwGroupTitle(group.id);
  return `<div class="hw-picture-item ${complete?'has-tone':''}" id="hwPic-${item.id}">
    <div class="hw-picture-index">${i+1}</div>
    <img src="${item.img}" alt="${esc(hwt('pictureAlt',title,i+1))}" loading="lazy">
    <div class="hw-pinyin-entry">
      <input class="hw-pinyin-input" type="text" inputmode="text" autocomplete="off" autocapitalize="off" spellcheck="false" data-hw-pinyin="${item.id}" data-hw-group="${group.id}" value="${esc(raw)}" placeholder="pinyin... (v = ü)" aria-label="Pinyin ${i+1}">
      <button type="button" class="hw-umlaut-btn" data-hw-insert-umlaut="${item.id}" title="${esc(hwt('insertUmlaut'))}" aria-label="${esc(hwt('insertUmlaut'))}">ü</button>
    </div>
    <div class="hw-pinyin-hint small muted">${hwt('compoundHint')}</div>
    <div class="hw-tone-choice-label small muted">${hwt('selectEachTone')}</div>
    <div class="hw-syllable-tone-editor" id="hwToneEditor-${item.id}">${renderSyllableToneEditor(item.id,raw)}</div>
    <div class="hw-tone-preview small" id="hwTonePreview-${item.id}">${syllables.length ? tonePreviewHtml(raw,tones) : hwt('fillFirst')}</div>
  </div>`;
}

function renderSyllableToneEditor(id,raw){
  const syllables=pinyinSyllables(raw);
  if(!syllables.length)return `<div class="small muted hw-no-syllable">${hwt('noSyllable')}</div>`;
  const tones=toneArrayFor(id,syllables.length);
  const labels={1:'1 ¯',2:'2 ´',3:'3 ˇ',4:'4 `'};
  return syllables.map((syllable,si)=>`
    <div class="hw-syllable-tone-row">
      <div class="hw-syllable-name"><span>${si+1}</span><strong>${esc(syllable)}</strong></div>
      <div class="hw-tone-choices" role="group" aria-label="${esc(hwt('toneAria',si+1,syllable))}">
        ${[1,2,3,4].map(t=>`<button type="button" class="hw-tone-choice ${tones[si]===t?'is-selected':''}" data-hw-tone-choice="${id}:${si}:${t}" aria-pressed="${tones[si]===t?'true':'false'}">${labels[t]}</button>`).join('')}
      </div>
    </div>`).join('');
}

function tonePreviewHtml(raw,tones){
  const syllables=pinyinSyllables(raw);
  const toneText=syllables.map((_,i)=>[1,2,3,4].includes(Number(tones[i]))?tones[i]:'?').join(' · ');
  return `Tone: <strong>${toneText}</strong> → <strong>${esc(applyChosenTones(raw,tones))}</strong>`;
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
  bindToneChoiceButtons(document);
  document.querySelectorAll('[data-hw-insert-umlaut]').forEach(button=>button.addEventListener('click',()=>insertUmlaut(button)));
  hwEl('hwConvertToneBtn')?.addEventListener('click',convertAllNumberedPinyin);
  hwEl('hwBuildPhoneBtn')?.addEventListener('click',buildPhoneReading);
  hwEl('hwListenPhoneBtn')?.addEventListener('click',()=>{const x=phoneTarget(); if(x.hanzi) speak(x.hanzi,.82);});
  hwEl('hwCheckPhoneBtn')?.addEventListener('click',e=>checkPhone(e.currentTarget));
  hwEl('hwPhoneNumber')?.addEventListener('input',buildPhoneReading);
  hwEl('hwResetBtn')?.addEventListener('click',()=>{if(confirm(hwt('resetConfirm'))){localStorage.removeItem(HOMEWORK_STORAGE_KEY);localStorage.removeItem('tocfl-homework-1-v3');localStorage.removeItem('tocfl-homework-1-v2');localStorage.removeItem('tocfl-homework-1-v1');hwState=loadHomeworkState();renderHomework();}});
}

function savePinyinInput(input){
  const id=input.dataset.hwPinyin;
  const normalized=normalizePinyinAliases(input.value);
  if(normalized!==input.value){
    const wasAtEnd=input.selectionStart===input.value.length;
    input.value=normalized;
    if(wasAtEnd) try{input.setSelectionRange(normalized.length,normalized.length);}catch{}
  }
  hwState.pinyinAnswers[id]=input.value;

  // Resize per-syllable tone state when the learner changes a compound.
  const syllables=pinyinSyllables(input.value);
  const old=hwState.toneChoices[id];
  if(Array.isArray(old)) hwState.toneChoices[id]=Array.from({length:syllables.length},(_,i)=>[1,2,3,4].includes(Number(old[i]))?Number(old[i]):0);
  else if(syllables.length===1 && [1,2,3,4].includes(Number(old))) hwState.toneChoices[id]=[Number(old)];
  else if(syllables.length!==1) hwState.toneChoices[id]=Array(syllables.length).fill(0);

  persistHomeworkState();
  refreshSyllableToneEditor(id);
  updateHomeworkProgress();
  updatePinyinGroupCount(input.dataset.hwGroup);
  updateTonePreview(id);
}

function bindToneChoiceButtons(scope){
  scope.querySelectorAll?.('[data-hw-tone-choice]').forEach(button=>button.addEventListener('click',()=>saveToneChoice(button)));
}

function insertUmlaut(button){
  const id=button.dataset.hwInsertUmlaut;
  const input=document.querySelector(`[data-hw-pinyin="${id}"]`);
  if(!input)return;
  const start=Number.isInteger(input.selectionStart)?input.selectionStart:input.value.length;
  const end=Number.isInteger(input.selectionEnd)?input.selectionEnd:start;
  input.value=input.value.slice(0,start)+'ü'+input.value.slice(end);
  try{input.setSelectionRange(start+1,start+1);}catch{}
  input.focus();
  savePinyinInput(input);
}

function refreshSyllableToneEditor(id){
  const editor=hwEl('hwToneEditor-'+id); if(!editor)return;
  const raw=String(hwState.pinyinAnswers[id]||'');
  editor.innerHTML=renderSyllableToneEditor(id,raw);
  bindToneChoiceButtons(editor);
}

function saveToneChoice(button){
  const [id,syllableRaw,toneRaw]=button.dataset.hwToneChoice.split(':');
  const syllableIndex=Number(syllableRaw), tone=Number(toneRaw);
  const raw=String(hwState.pinyinAnswers[id]||'');
  const syllables=pinyinSyllables(raw);
  if(!syllables[syllableIndex])return;
  const tones=toneArrayFor(id,syllables.length);
  tones[syllableIndex]=tone;
  hwState.toneChoices[id]=tones;
  persistHomeworkState();

  const editor=hwEl('hwToneEditor-'+id);
  editor?.querySelectorAll(`[data-hw-tone-choice^="${id}:${syllableIndex}:"]`).forEach(b=>{
    const parts=b.dataset.hwToneChoice.split(':');
    const chosen=Number(parts[2])===tone;
    b.classList.toggle('is-selected',chosen);
    b.setAttribute('aria-pressed',chosen?'true':'false');
  });
  const card=hwEl('hwPic-'+id);
  card?.classList.toggle('has-tone',tones.every(t=>[1,2,3,4].includes(Number(t))));
  updateTonePreview(id);
  updateHomeworkProgress();
  const input=document.querySelector(`[data-hw-pinyin="${id}"]`);
  updatePinyinGroupCount(input?.dataset.hwGroup);
}

function updateTonePreview(id){
  const out=hwEl('hwTonePreview-'+id); if(!out)return;
  const raw=String(hwState.pinyinAnswers[id]||'').trim();
  const syllables=pinyinSyllables(raw);
  if(!syllables.length){out.textContent=hwt('fillFirst');return;}
  const tones=toneArrayFor(id,syllables.length);
  out.innerHTML=tonePreviewHtml(raw,tones);
}

function updatePinyinGroupCount(groupId){
  const group=HW1.pinyinGroups.find(g=>g.id===groupId); if(!group)return;
  const filled=group.items.filter(x=>String(hwState.pinyinAnswers[x.id]||'').trim()).length;
  const tones=group.items.filter(toneItemComplete).length;
  const el=hwEl('hwGroupCount-'+groupId); if(el)el.textContent=`Pinyin ${filled}/${group.items.length} · ${hwt('toneComplete',tones,group.items.length)}`;
}

function toggleHomeworkSource(groupId,button){
  const group=HW1.pinyinGroups.find(g=>g.id===groupId); const panel=hwEl('hwSource-'+groupId);
  if(!group||!panel)return;
  const isOpen=!panel.hidden;
  // Keep only one embedded QR source open at a time.
  document.querySelectorAll('.hw-source-player').forEach(x=>{x.hidden=true;x.innerHTML='';});
  document.querySelectorAll('[data-hw-source]').forEach(x=>x.textContent=hwt('listenQR'));
  if(isOpen)return;
  panel.hidden=false;
  panel.innerHTML=`<div class="hw-source-meta"><div><strong>${esc(group.sourceLabel)}</strong><div class="small muted">${hwt('sourceWorksheet')}</div></div><a class="button-link" href="https://www.youtube.com/watch?v=${encodeURIComponent(group.youtubeId)}" target="_blank" rel="noopener">${hwt('openYoutube')}</a></div><div class="hw-video-frame"><iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(group.youtubeId)}?autoplay=1&rel=0" title="${esc(group.sourceLabel)}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe></div>`;
  button.textContent=hwt('closeAudio');
  panel.scrollIntoView({behavior:'smooth',block:'nearest'});
}

function checkTonePlacement(btn){
  const [i,,v]=btn.dataset.hwVowel.split(':'); const x=HW1.toneRules[Number(i)];
  const card=hwEl('hwRule'+i), feedback=hwEl('hwRuleFeedback'+i);
  card.querySelectorAll('.hw-vowel').forEach(b=>b.classList.remove('is-correct','is-wrong'));
  if(v===x.answer){btn.classList.add('is-correct');feedback.textContent='✅ '+hwRuleWhy(Number(i));hwState.toneRuleDone[i]=true;card.classList.add('is-done');saveHomeworkState();}
  else{btn.classList.add('is-wrong');feedback.textContent=hwt('wrongRule');}
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
  if(!x.hanzi){out.textContent=hwt('phoneEmpty');return;}
  await runHomeworkSpeechCheck({target:x.hanzi,pinyin:x.pinyin,out,button,onPass:null,duration:6500});
}

async function runHomeworkSpeechCheck({target,pinyin,out,button,onPass,duration=3500}){
  if(!window.TOCFLAuth?.getSession?.()?.user){out.textContent=hwt('loginFirst');window.TOCFLAuth?.openAuth?.('login');return;}
  if(!window.TOCFLAuth?.transcribeWithGroq){out.textContent=hwt('groqNotReady');return;}
  hwBusy=true; const old=button?.textContent; if(button){button.disabled=true;button.textContent=hwt('speakNow');}
  out.textContent=hwt('listening',duration>4000);
  try{
    if('speechSynthesis' in window) try{speechSynthesis.cancel();}catch{}
    const clip=await capturePronunciationClip(duration);
    out.textContent=hwt('aiRecognizing');
    const result=await window.TOCFLAuth.transcribeWithGroq(clip,target);
    const recognized=String(result?.text||'').trim();
    if(!recognized) throw Object.assign(new Error(hwt('noTranscript')),{code:'NO_TRANSCRIPT'});
    const a=normalizeChinese(target), b=normalizeChinese(recognized);
    const score=Math.max(0,Math.min(100,Math.round(similarity(a,b)*100)));
    out.innerHTML=`<strong>${score}/100</strong> · ${hwt('sample')}: <strong>${esc(target)} ${esc(pinyin||'')}</strong> · ${hwt('heard')}: <strong>${esc(recognized)}</strong><br>${score>=95?hwt('exact'):score>=60?hwt('close'):hwt('different')}`;
    if(score>=95 && onPass)onPass();
  }catch(err){
    const code=String(err?.code||'');
    if(code==='NOT_CONNECTED')out.textContent=hwt('notConnected');
    else if(code==='MIC_PERMISSION')out.textContent=hwt('micPermission');
    else out.textContent='⚠️ '+(err?.message||hwt('genericError'));
  }finally{hwBusy=false;if(button){button.disabled=false;button.textContent=old;}}
}

function phoneTarget(){
  const digits=String(hwEl('hwPhoneNumber')?.value||'').replace(/\D/g,'');
  const map={0:['零','líng'],1:['一','yī'],2:['二','èr'],3:['三','sān'],4:['四','sì'],5:['五','wǔ'],6:['六','liù'],7:['七','qī'],8:['八','bā'],9:['九','jiǔ']};
  return {hanzi:[...digits].map(d=>map[d]?.[0]||'').join(' '),pinyin:[...digits].map(d=>map[d]?.[1]||'').join(' '),digits};
}
function buildPhoneReading(){
  const x=phoneTarget(), el=hwEl('hwPhoneReading'); if(!el)return;
  el.innerHTML=x.digits?`<div><strong>${hwt('hanzi')}</strong> ${esc(x.hanzi)}</div><div><strong>Pinyin:</strong> ${esc(x.pinyin)}</div>`:hwt('enterPhone');
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

function applyChosenTones(raw,tones){
  const normalized=normalizePinyinAliases(stripPinyinToneMarks(raw));
  if(!normalized)return '';
  let si=0;
  return normalized.replace(/[A-Za-zÜü]+/g,syllable=>{
    const tone=Number(tones?.[si++]);
    return [1,2,3,4].includes(tone)?numberedPinyinToMarks(syllable+tone):syllable;
  });
}
function applyChosenTone(raw,tone){
  return applyChosenTones(raw,pinyinSyllables(raw).map(()=>Number(tone)));
}
function convertAllNumberedPinyin(){
  let changed=0;
  document.querySelectorAll('[data-hw-pinyin]').forEach(input=>{
    const next=numberedPinyinToMarks(input.value);
    if(next!==input.value){input.value=next;changed++;savePinyinInput(input);}
  });
  const btn=hwEl('hwConvertToneBtn');
  if(btn){const old=btn.textContent;btn.textContent=changed?hwt('converted',changed):hwt('nothingToConvert');setTimeout(()=>btn.textContent=old,1600);}
}

function updateHomeworkProgress(){
  const p=homeworkProgress(); if(hwEl('hwProgressPct'))hwEl('hwProgressPct').textContent=p.pct+'%';
  if(hwEl('hwProgressBar'))hwEl('hwProgressBar').style.width=p.pct+'%';
  if(hwEl('hwProgressText'))hwEl('hwProgressText').textContent=hwt('progress',p.done,p.total);
  const count=hwEl('hwPinyinCount'); if(count)count.textContent=hwt('pinyinCount',pinyinFilledCount(),allPinyinItems().length,toneSelectedCount(),allPinyinItems().length);
}

function initHomework(){renderHomework();}
document.addEventListener('tocfl:language-changed',()=>renderHomework());
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initHomework,{once:true}); else initHomework();
