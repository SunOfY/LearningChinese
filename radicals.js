'use strict';

(function(){
  const $=id=>document.getElementById(id);
  const getLang=()=>window.TOCFLApp?.getLanguage?.()||localStorage.getItem('tocfl-a1-ui-language-v2')||'vi';
  const pick=(obj,lang=getLang())=>obj?.[lang]??obj?.vi??obj?.en??'';

  const UI={
    vi:{tab:'Bộ thủ',title:'Bộ thủ & Họ chữ',sub:'Học từ cấu tạo: phần gợi nghĩa + phần gợi âm → chữ → từ → câu.',semantic:'Bộ gợi nghĩa',phonetic:'Họ âm',pinyin:'Pinyin gần âm Việt',search:'Tìm bộ, chữ, pinyin hoặc nghĩa…',listen:'Nghe',listenWord:'Nghe chữ',listenSentence:'Nghe câu',slow:'Chậm',fast:'Nhanh',writeThis:'Viết',initialTitle:'Thanh mẫu (âm đầu)',finalTitle:'Vận mẫu (phần vần)',specialTitle:'Quy tắc đặc biệt dễ nhầm',demoTitle:'Thử nhanh một Pinyin',demoHint:'Nhập ví dụ: qǐng, xué, lǜ, zhōngwén…',analyze:'Phân tích',why:'Vì sao dễ nhớ?',structure:'Cấu tạo',example:'Ví dụ',examples:'Câu ví dụ',examplesHint:'Xem cách dùng trong câu. Mỗi câu có Pinyin, nghĩa và nút nghe.',fontSize:'Cỡ chữ',fontSmaller:'Nhỏ hơn',fontLarger:'Lớn hơn',fontReset:'Mặc định',note:'Lưu ý: đây là cách phân tích để học và ghi nhớ. Không phải mọi chữ đều “sinh ra” trực tiếp từ bộ theo cách hiện đại; nhiều chữ là hình thanh, trong đó một phần gợi nghĩa và một phần gợi âm.',soundNote:'Gợi âm tiếng Việt chỉ là cầu nối ban đầu. Hãy ưu tiên nghe giọng zh-TW vì nhiều âm Mandarin không có bản tương đương chính xác trong tiếng Việt.',familyNote:'Họ âm cho thấy cùng một thành phần có thể lặp lại để gợi cách đọc, còn bộ bên trái/bên dưới thường đổi để gợi nghĩa.',all:'Tất cả',chooseRadical:'Chọn từng bộ để luyện',chooseHint:'Mỗi bộ được tách riêng. Chọn một bộ để học chữ, từ mở rộng và luyện viết riêng bộ đó.',practiceWriting:'Luyện viết bộ này',practiceHint:'Chọn chữ hoặc từ → xem thứ tự nét → bật Luyện nét để web kiểm tra thứ tự viết.',practiceTarget:'Chữ / từ muốn luyện',strokeOrder:'Thứ tự nét',startQuiz:'Luyện nét',rewrite:'Viết lại',showGuide:'Hiện mẫu',hideGuide:'Ẩn mẫu',writingReady:'Bấm “Luyện nét” rồi viết trực tiếp lên ô.',writingGood:'Hoàn thành đúng thứ tự nét!',writingMistake:'Nét này chưa đúng, thử lại nhé.',writerUnavailable:'Không tải được dữ liệu nét chữ. Hãy kiểm tra mạng rồi thử lại.',progress:'Tiến độ viết',coreChars:'Toàn bộ chữ',expandedWords:'Từ / cụm từ phát triển',singleRadical:'Từng bộ',deepStudy:'Học kỹ từ này',formula:'Ghép nghĩa',visualize:'Hình dung để nhớ',usage:'Cách dùng',pronunciation:'Tách phát âm',rootRole:'Vì sao chữ gốc thuộc bộ này?',studyFlow:'Cách học 4 bước',studyFlowText:'1. Nhìn cấu tạo → 2. Nghe 2–3 lần → 3. Nói theo → 4. Viết lại từ trí nhớ',compoundTag:'ghép nghĩa',grammarTag:'ngữ pháp',resultTag:'kết quả / hướng',fixedTag:'từ cố định',redupTag:'lặp từ',soundEach:'Bấm từng âm để nghe chậm',literalTip:'Dùng phép ghép để nhớ nghĩa, nhưng khi nói hãy nhớ cả từ như một khối.',lesson:'Bài học',learned:'Đã học',previous:'Trước',next:'Tiếp',understoodNext:'Đã hiểu · Tiếp',finishRadical:'Hoàn thành bộ',completed:'Đã hoàn thành',lessonHint:'Học từng chữ/từ một. Khi hiểu xong, bấm Tiếp để chuyển sang mục kế tiếp.',coreLesson:'Chữ nền tảng',wordLesson:'Từ phát triển',branchFrom:'Phát triển từ',resume:'Tiếp tục từ lần trước',restart:'Học lại từ đầu',aiCheck:'AI kiểm tra phát âm',aiSentenceCheck:'AI kiểm tra câu',aiListening:'Đang nghe… hãy đọc ngay bây giờ.',aiRecognizing:'AI đang nhận dạng…',aiTarget:'Mẫu',aiRecognized:'AI nghe được',aiScore:'Độ khớp',aiNote:'Groq AI kiểm tra xem hệ thống có nghe ra đúng chữ/câu hay không; đây chưa phải chấm thanh điệu chuyên sâu.',aiExcellent:'AI nghe đúng mẫu.',aiGood:'AI nghe khá gần. Hãy nghe lại và thử chậm hơn.',aiRetry:'AI nghe thành nội dung khác. Hãy nghe mẫu rồi thử lại.',aiUnavailable:'Chưa thể dùng AI kiểm tra phát âm.',aiMicDenied:'Không truy cập được microphone. Hãy cấp quyền microphone cho website.',aiGuestRemaining:(n,l)=>`Guest còn ${n}/${l} lượt AI`},
    en:{tab:'Components',title:'Radicals & Character Families',sub:'Learn structure: semantic clue + sound clue → character → word → sentence.',semantic:'Semantic radicals',phonetic:'Sound families',pinyin:'Vietnamese sound bridge',search:'Search radical, character, pinyin or meaning…',listen:'Listen',listenWord:'Character',listenSentence:'Sentence',slow:'Slow',fast:'Fast',writeThis:'Write',initialTitle:'Initials',finalTitle:'Finals',specialTitle:'Easy-to-miss spelling rules',demoTitle:'Try a Pinyin',demoHint:'Type e.g. qǐng, xué, lǜ, zhōngwén…',analyze:'Analyze',why:'Why it helps',structure:'Structure',example:'Example',examples:'Example sentences',examplesHint:'See the word in context. Each sentence includes Pinyin, meaning, and audio.',fontSize:'Text size',fontSmaller:'Smaller',fontLarger:'Larger',fontReset:'Default',note:'This is a learning-oriented structural analysis. Not every character literally “grew” from its radical in a modern step-by-step way; many characters combine a semantic component with a phonetic component.',soundNote:'Vietnamese approximations are only a bridge. Prefer the zh-TW audio because many Mandarin sounds do not have exact Vietnamese equivalents.',familyNote:'Sound families show how one component can hint at pronunciation while another component changes the semantic field.',all:'All',chooseRadical:'Choose one radical to practise',chooseHint:'Each radical is separated. Pick one to study its characters, expanded vocabulary, and handwriting.',practiceWriting:'Practise writing this radical',practiceHint:'Choose a character or word → view stroke order → start stroke quiz to check your writing order.',practiceTarget:'Character / word',strokeOrder:'Stroke order',startQuiz:'Stroke quiz',rewrite:'Rewrite',showGuide:'Show model',hideGuide:'Hide model',writingReady:'Press “Stroke quiz” and write directly in the box.',writingGood:'Correct stroke order completed!',writingMistake:'That stroke is not right yet—try again.',writerUnavailable:'Stroke data could not be loaded. Check your connection and try again.',progress:'Writing progress',coreChars:'All characters',expandedWords:'Expanded words / phrases',singleRadical:'One radical',deepStudy:'Study this word deeply',formula:'Meaning formula',visualize:'Memory image',usage:'How to use it',pronunciation:'Pronunciation breakdown',rootRole:'Why this root belongs here',studyFlow:'4-step study flow',studyFlowText:'1. See the structure → 2. Listen 2–3 times → 3. Repeat → 4. Write from memory',compoundTag:'semantic compound',grammarTag:'grammar pattern',resultTag:'result / direction',fixedTag:'lexicalized word',redupTag:'reduplication',soundEach:'Tap each syllable to hear it slowly',literalTip:'Use the combination as a memory bridge, but learn the spoken word as one unit.',lesson:'Lesson',learned:'Learned',previous:'Previous',next:'Next',understoodNext:'Got it · Next',finishRadical:'Finish radical',completed:'Completed',lessonHint:'Study one character or word at a time. When it makes sense, press Next to move on.',coreLesson:'Core character',wordLesson:'Developed word',branchFrom:'Built from',resume:'Resume where you left off',restart:'Restart from beginning',aiCheck:'AI pronunciation check',aiSentenceCheck:'Check sentence',aiListening:'Listening… speak now.',aiRecognizing:'AI is transcribing…',aiTarget:'Target',aiRecognized:'AI heard',aiScore:'Match',aiNote:'Groq AI checks whether the speech is recognized as the target text; this is not a professional tone/phoneme score.',aiExcellent:'AI recognized the target.',aiGood:'AI heard something close. Listen again and try more slowly.',aiRetry:'AI heard different text. Listen to the model and try again.',aiUnavailable:'AI pronunciation check is unavailable.',aiMicDenied:'Microphone access failed. Allow microphone permission for this site.',aiGuestRemaining:(n,l)=>`Guest has ${n}/${l} AI checks left`},
    'zh-Hant':{tab:'部件',title:'部首・部件與字族',sub:'從結構學習：義符 + 聲符 → 字 → 詞 → 句子。',semantic:'義符部件',phonetic:'聲符字族',pinyin:'越南語近似音提示',search:'搜尋部件、字、拼音或意思…',listen:'聽',listenWord:'聽單字',listenSentence:'聽例句',slow:'慢速',fast:'加速',writeThis:'練寫',initialTitle:'聲母',finalTitle:'韻母',specialTitle:'容易混淆的拼音規則',demoTitle:'快速分析拼音',demoHint:'例如輸入：qǐng、xué、lǜ、zhōngwén…',analyze:'分析',why:'為什麼好記？',structure:'結構',example:'例句',examples:'例句',examplesHint:'用短句理解實際用法；每句都有拼音、意思與朗讀。',fontSize:'字體大小',fontSmaller:'縮小',fontLarger:'放大',fontReset:'預設',note:'這裡以學習與記憶為目的分析字形。不是所有漢字都能用現代「加一個部首就產生新字」來解釋；很多漢字屬於形聲結構，由義符提示意思、聲符提示讀音。',soundNote:'越南語近似音只作為入門橋樑。許多華語語音沒有完全相同的越南語對應音，請以 zh-TW 音檔為準。',familyNote:'聲符字族可以看出同一聲符如何提示讀音，而其他部件改變字義範圍。',all:'全部',chooseRadical:'選一個部件單獨練習',chooseHint:'每個部件已分開。選一個部件，集中學習相關字、延伸詞與書寫。',practiceWriting:'練寫這個部件',practiceHint:'選擇單字或詞語 → 看筆順 → 開始筆順練習，系統會檢查書寫順序。',practiceTarget:'要練的字／詞',strokeOrder:'筆順',startQuiz:'筆順練習',rewrite:'重寫',showGuide:'顯示字形',hideGuide:'隱藏字形',writingReady:'按「筆順練習」後，直接在方格內書寫。',writingGood:'筆順完成正確！',writingMistake:'這一筆還不對，再試一次。',writerUnavailable:'無法載入筆順資料，請檢查網路後再試。',progress:'書寫進度',coreChars:'全部漢字',expandedWords:'延伸詞／詞組',singleRadical:'單一部件',deepStudy:'深入學這個詞',formula:'組合意思',visualize:'記憶畫面',usage:'用法',pronunciation:'拆分發音',rootRole:'為什麼核心字屬於這個部件？',studyFlow:'四步學習法',studyFlowText:'1. 看結構 → 2. 聽 2–3 次 → 3. 跟讀 → 4. 不看答案寫出來',compoundTag:'語義組合',grammarTag:'語法結構',resultTag:'結果／方向',fixedTag:'固定詞',redupTag:'重疊詞',soundEach:'點每個音節可慢速聽',literalTip:'用字義組合幫助記憶，但實際說話時要把整個詞當成一個單位。',lesson:'學習項目',learned:'已學',previous:'上一個',next:'下一個',understoodNext:'懂了 · 下一個',finishRadical:'完成本部件',completed:'已完成',lessonHint:'一次只學一個字或詞。理解後按「下一個」再進入下一項。',coreLesson:'核心字',wordLesson:'延伸詞',branchFrom:'由此延伸',resume:'從上次進度繼續',restart:'從頭學習',aiCheck:'AI 發音檢查',aiSentenceCheck:'檢查整句',aiListening:'正在聆聽……請現在朗讀。',aiRecognizing:'AI 正在辨識……',aiTarget:'目標',aiRecognized:'AI 聽到',aiScore:'匹配度',aiNote:'Groq AI 檢查語音是否被辨識成目標文字；這不是專業的聲調／音位評分。',aiExcellent:'AI 正確辨識出目標。',aiGood:'AI 辨識結果接近，請再聽一次並放慢速度重試。',aiRetry:'AI 辨識成其他內容，請聽範例後再試。',aiUnavailable:'目前無法使用 AI 發音檢查。',aiMicDenied:'無法使用麥克風，請允許此網站使用麥克風。',aiGuestRemaining:(n,l)=>`訪客還有 ${n}/${l} 次 AI 檢查`}
  };

  const ORIGIN_UI={
    vi:{mode:'Từ hình đến chữ',title:'Học chữ như trên lớp',sub:'Mỗi lần chỉ học 1 chữ: hình thật → chữ cổ → chữ hiện đại → từ → câu → nghe/nói/viết.',source:'Nguồn hình chữ cổ',pictogram:'1. Tượng hình · Pictograms',combined:'2. Hội ý · Combined Ideograms',phonosemantic:'3. Hình thanh · Phono-semantic',object:'Hình ban đầu',ancient:'Chữ cổ',modern:'Chữ hiện đại',step1:'Nhìn hình & sự biến đổi',step2:'Hiểu vì sao',step3:'Học từ phát triển',step4:'Đặt vào câu',step5:'Nghe · nói · viết',nextStep:'Tiếp bước',prevStep:'Bước trước',nextChar:'Đã hiểu · Chữ tiếp theo',finished:'Đã học xong',learned:'Đã hiểu',memory:'Hình dung để nhớ',explain:'Giải thích',vocab:'Từ phát triển',sentence:'Câu ví dụ',vocabPrev:'Từ trước',vocabNext:'Từ tiếp',sentencePrev:'Câu trước',sentenceNext:'Câu tiếp',writeWord:'Luyện viết từ này',writeChar:'Luyện viết chữ này',classStyle:'Trình bày theo đúng kiểu ảnh bài giảng bạn gửi: ít thông tin mỗi màn, tập trung vào một ý.',oracle:'Giáp cốt văn',bronze:'Kim văn',bigseal:'Đại triện',seal:'Tiểu triện',ancientStage:'Dạng chữ cổ',meaningPart:'Phần gợi nghĩa',soundPart:'Phần gợi âm',neutralTone:'Lưu ý: men trong 們 thường là thanh nhẹ.',imageFallback:'Không tải được ảnh chữ cổ; vẫn có thể học bằng phần giải thích bên dưới.',jump:'Chọn chữ',reset:'Học lại từ đầu',formation:'Vì sao ghép lại ra nghĩa này?',formationParts:'Ghép nghĩa',memoryBridge:'Hình dung để nhớ',kindLiteral:'Ghép nghĩa trực tiếp',kindParallel:'Hai ý bổ trợ/nhấn mạnh',kindGrammar:'Mẫu ngữ pháp',kindLexicalized:'Từ cố định',kindProper:'Tên riêng',kindHistorical:'Có bối cảnh lịch sử',kindResult:'Động từ + kết quả',kindClassifier:'Cụm có lượng từ',kindRedup:'Lặp từ để tạo sắc thái',wordExample:'Ví dụ với từ này',writeNow:'Viết ngay'},
    en:{mode:'From image to character',title:'Learn characters like in class',sub:'One character at a time: object → ancient form → modern form → words → sentences → listen/speak/write.',source:'Ancient-form source',pictogram:'1. Pictograms',combined:'2. Combined Ideograms',phonosemantic:'3. Phono-semantic Compounds',object:'Original image',ancient:'Ancient form',modern:'Modern character',step1:'See the image & evolution',step2:'Understand why',step3:'Learn developed words',step4:'Use it in a sentence',step5:'Listen · speak · write',nextStep:'Next step',prevStep:'Previous step',nextChar:'Got it · Next character',finished:'Completed',learned:'Understood',memory:'Memory image',explain:'Explanation',vocab:'Developed word',sentence:'Example sentence',vocabPrev:'Previous word',vocabNext:'Next word',sentencePrev:'Previous sentence',sentenceNext:'Next sentence',writeWord:'Practise writing this word',writeChar:'Practise writing this character',classStyle:'Presented like the classroom photos you shared: one idea per screen with minimal clutter.',oracle:'Oracle-bone form',bronze:'Bronze script',bigseal:'Large seal',seal:'Small seal',ancientStage:'Ancient form',meaningPart:'Meaning clue',soundPart:'Sound clue',neutralTone:'Note: men in 們 is normally neutral tone.',imageFallback:'The ancient-form image could not load; use the explanation below instead.',jump:'Choose character',reset:'Restart',formation:'Why does this combination mean that?',formationParts:'Meaning pieces',memoryBridge:'Memory scene',kindLiteral:'Direct semantic compound',kindParallel:'Reinforcing meanings',kindGrammar:'Grammar pattern',kindLexicalized:'Lexicalized word',kindProper:'Proper name',kindHistorical:'Historical motivation',kindResult:'Verb + result',kindClassifier:'Classifier phrase',kindRedup:'Reduplication',wordExample:'Example with this word',writeNow:'Write now'},
    'zh-Hant':{mode:'從圖像到漢字',title:'像課堂一樣學漢字',sub:'一次一個字：實物 → 古文字 → 現代字 → 詞 → 句子 → 聽說寫。',source:'古文字來源',pictogram:'1. 象形字 · Pictograms',combined:'2. 會意字 · Combined Ideograms',phonosemantic:'3. 形聲字 · Phono-semantic',object:'原始圖像',ancient:'古文字',modern:'現代字',step1:'看圖與字形演變',step2:'理解為什麼',step3:'學延伸詞',step4:'放進句子',step5:'聽 · 說 · 寫',nextStep:'下一步',prevStep:'上一步',nextChar:'懂了 · 下一個字',finished:'已完成',learned:'已理解',memory:'記憶畫面',explain:'解釋',vocab:'延伸詞',sentence:'例句',vocabPrev:'上一個詞',vocabNext:'下一個詞',sentencePrev:'上一句',sentenceNext:'下一句',writeWord:'練寫這個詞',writeChar:'練寫這個字',classStyle:'依照你提供的課堂照片：每個畫面只放一個重點，避免一次出現太多資訊。',oracle:'甲骨文字形',bronze:'金文',bigseal:'大篆',seal:'小篆',ancientStage:'古文字',meaningPart:'義符',soundPart:'聲符',neutralTone:'注意：們的 men 通常讀輕聲。',imageFallback:'古文字圖片載入失敗，可先看下方解釋。',jump:'選擇漢字',reset:'從頭學習',formation:'為什麼這樣組合會有這個意思？',formationParts:'拆開意思',memoryBridge:'記憶畫面',kindLiteral:'直接組義',kindParallel:'近義加強',kindGrammar:'語法結構',kindLexicalized:'固定詞',kindProper:'專有名詞',kindHistorical:'歷史來源',kindResult:'動詞＋結果',kindClassifier:'量詞結構',kindRedup:'重疊構詞',wordExample:'這個詞的例句',writeNow:'直接練寫'}
  };

  let radicals=[];
  let expansionTrees={};
  let soundFamilies=[];
  let pinyinRows={initials:[],finals:[],specials:[]};
  let learningChunks={};
  let branchDetails={};
  let learningOverrides={};
  let exampleSets={};
  let originData={version:'',sourceNote:{},lessons:[]};
  let originDataLoaded=false;
  let originDataError='';
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
      learningChunks=data.learningChunks||{};
      branchDetails=data.branchDetails||{};
      learningOverrides=data.learningOverrides||{};
      exampleSets=data.exampleSets||{};
      try{
        const originRes=await fetch('./data/character-origins.json',{cache:'no-store'});
        if(!originRes.ok)throw new Error(`HTTP ${originRes.status}`);
        const originJson=await originRes.json();
        if(!originJson||!Array.isArray(originJson.lessons))throw new Error('Invalid character-origins.json structure');
        originData=originJson;originDataLoaded=true;originDataError='';
      }catch(originErr){
        console.warn('Cannot load character origin data:',originErr);originDataLoaded=false;originDataError=String(originErr?.message||originErr||'Unknown error');
      }
      radicalDataLoaded=true;
      radicalDataError='';
      if(selectedRadicalKey==='all' || !radicals.some(r=>r.key===selectedRadicalKey)){
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


  const RADICAL_FONT_SCALE_KEY='tocfl-radical-font-scale-v1';
  function clampFontScale(value){
    const n=Number(value);return Number.isFinite(n)?Math.max(.9,Math.min(1.6,Math.round(n*10)/10)):1;
  }
  function getFontScale(){
    try{return clampFontScale(localStorage.getItem(RADICAL_FONT_SCALE_KEY)||1);}catch{return 1;}
  }
  function applyFontScale(){
    const root=$('radicalsContent');if(!root)return;
    const scale=getFontScale();root.style.setProperty('--rad-font-scale',String(scale));root.style.zoom=String(scale);
    const label=$('radFontScaleValue');if(label)label.textContent=`${Math.round(scale*100)}%`;
  }
  function setFontScale(value){
    const scale=clampFontScale(value);
    saveTextState(RADICAL_FONT_SCALE_KEY,String(scale));
    applyFontScale();
  }

  function speak(text,rate=.78){
    if(!('speechSynthesis' in window))return;
    speechSynthesis.cancel();
    const u=new SpeechSynthesisUtterance(text);u.lang='zh-TW';u.rate=rate;u.pitch=1;
    const voices=speechSynthesis.getVoices();
    const v=voices.find(x=>x.lang?.toLowerCase()==='zh-tw')||voices.find(x=>x.lang?.toLowerCase().startsWith('zh'));
    if(v)u.voice=v;speechSynthesis.speak(u);
  }
  function audioButtons(text,ui,kind='listen'){
    const wrap=document.createElement('div');wrap.className='rad-audio-actions';
    const normal=document.createElement('button');normal.type='button';normal.className='rad-listen';normal.textContent=`🔊 ${kind==='word'?ui.listenWord:kind==='sentence'?ui.listenSentence:ui.listen}`;normal.addEventListener('click',()=>speak(text,.78));
    const slow=document.createElement('button');slow.type='button';slow.textContent=`🐢 ${ui.slow}`;slow.addEventListener('click',()=>speak(text,.55));
    const fast=document.createElement('button');fast.type='button';fast.className='rad-fast';fast.textContent=`⚡ ${ui.fast}`;fast.addEventListener('click',()=>speak(text,1.0));
    wrap.append(normal,slow,fast);return wrap;
  }
  function preferredRadRecorderMime(){
    const choices=['audio/webm;codecs=opus','audio/webm','audio/mp4','audio/ogg;codecs=opus'];
    return choices.find(type=>window.MediaRecorder?.isTypeSupported?.(type))||'';
  }
  async function captureRadPronunciationClip(durationMs=4000){
    if(!navigator.mediaDevices?.getUserMedia||!window.MediaRecorder)throw Object.assign(new Error('Recorder unsupported'),{code:'RECORDER_UNSUPPORTED'});
    let stream=null,recorder=null,timer=null;
    try{
      stream=await navigator.mediaDevices.getUserMedia({audio:true});
      const mime=preferredRadRecorderMime();
      recorder=mime?new MediaRecorder(stream,{mimeType:mime}):new MediaRecorder(stream);
      const chunks=[];
      const done=new Promise((resolve,reject)=>{
        recorder.addEventListener('dataavailable',e=>{if(e.data?.size)chunks.push(e.data);});
        recorder.addEventListener('error',e=>reject(e.error||new Error('Recorder error')),{once:true});
        recorder.addEventListener('stop',()=>{
          const type=recorder.mimeType||chunks[0]?.type||mime||'audio/webm';
          const blob=new Blob(chunks,{type});
          blob.size?resolve(blob):reject(Object.assign(new Error('No speech'),{code:'EMPTY_AUDIO'}));
        },{once:true});
      });
      recorder.start(250);
      timer=setTimeout(()=>{if(recorder?.state==='recording')recorder.stop();},durationMs);
      return await done;
    }catch(err){
      if(err?.name==='NotAllowedError'||err?.name==='PermissionDeniedError')throw Object.assign(new Error('Microphone denied'),{code:'MIC_PERMISSION'});
      throw err;
    }finally{
      if(timer)clearTimeout(timer);
      if(recorder?.state==='recording')try{recorder.stop();}catch{}
      stream?.getTracks?.().forEach(track=>track.stop());
    }
  }
  function normalizeRadChinese(s){return String(s||'').normalize('NFKC').replace(/[\s，。！？,.!?;；:：、'"“”‘’()（）/]/g,'').toLowerCase();}
  function radLevenshtein(a,b){
    const m=a.length,n=b.length,dp=Array.from({length:m+1},()=>Array(n+1).fill(0));
    for(let i=0;i<=m;i++)dp[i][0]=i;for(let j=0;j<=n;j++)dp[0][j]=j;
    for(let i=1;i<=m;i++)for(let j=1;j<=n;j++)dp[i][j]=Math.min(dp[i-1][j]+1,dp[i][j-1]+1,dp[i-1][j-1]+(a[i-1]===b[j-1]?0:1));
    return dp[m][n];
  }
  function radSimilarity(a,b){if(!a&&!b)return 1;if(!a||!b)return 0;return 1-radLevenshtein(a,b)/Math.max(a.length,b.length);}
  function saveRadPronunciation(r,target,recognized,score,kind='word'){
    if(!r?.key)return;
    const all=loadLearningState();const saved=all[r.key]||{};
    const pronunciation=saved.pronunciation&&typeof saved.pronunciation==='object'?saved.pronunciation:{};
    pronunciation[`${kind}:${target}`]={score,recognized,checkedAt:new Date().toISOString()};
    all[r.key]={...saved,pronunciation};saveLearningState(all);
  }
  function lastRadPronunciation(r,target,kind='word'){
    if(!r?.key)return null;return loadLearningState()?.[r.key]?.pronunciation?.[`${kind}:${target}`]||null;
  }
  async function runRadPronunciationCheck({target,pinyin='',ui,r,sentence=false,button,status,result,compact=false}){
    if(!window.TOCFLAuth?.transcribeWithGroq){status.textContent=ui.aiUnavailable;status.className='rad-ai-status is-error';return;}
    button.disabled=true;status.textContent=ui.aiListening;status.className='rad-ai-status';result.hidden=true;
    try{
      if('speechSynthesis'in window)try{speechSynthesis.cancel();}catch{}
      const chars=hanziChars(target).length;
      const duration=sentence?Math.min(10000,Math.max(5000,3000+chars*650)):Math.min(5500,Math.max(3500,2800+chars*550));
      const clip=await captureRadPronunciationClip(duration);
      status.textContent=ui.aiRecognizing;
      const data=await window.TOCFLAuth.transcribeWithGroq(clip,target);
      const recognized=String(data?.text||'').trim();
      if(!recognized)throw Object.assign(new Error('No transcript'),{code:'NO_TRANSCRIPT'});
      const a=normalizeRadChinese(target),b=normalizeRadChinese(recognized);
      const score=Math.max(0,Math.min(100,Math.round(radSimilarity(a,b)*100)));
      const feedback=score>=95?ui.aiExcellent:score>=60?ui.aiGood:ui.aiRetry;
      result.innerHTML=`<div class="rad-ai-score"><b>${score}%</b><span>${ui.aiScore}</span></div><div class="rad-ai-lines"><div><small>${ui.aiTarget}</small><strong>${target}${pinyin?` · ${pinyin}`:''}</strong></div><div><small>${ui.aiRecognized}</small><strong>${recognized}</strong></div><p>${feedback}</p></div>`;
      if(compact){result.hidden=true;status.textContent=`✅ ${score}% · ${recognized}`;status.title=data?.guest?ui.aiGuestRemaining(data.remaining,data.limit||20):feedback;status.className='rad-ai-status is-success';}
      else{result.hidden=false;status.textContent=data?.guest?`✅ ${ui.aiGuestRemaining(data.remaining,data.limit||20)}`:'✅';status.className='rad-ai-status is-success';}
      saveRadPronunciation(r,target,recognized,score,sentence?'sentence':'word');
    }catch(err){
      console.warn('Radical pronunciation AI:',err);
      const code=String(err?.code||'');
      if(code==='MIC_PERMISSION')status.textContent=ui.aiMicDenied;
      else if(code==='GUEST_LIMIT_REACHED')status.textContent=getLang()==='en'?'The 20 free guest AI checks have been used. Sign in to continue.':getLang()==='zh-Hant'?'20 次訪客免費 AI 檢查已用完，請登入後繼續。':'Bạn đã dùng hết 20 lượt AI miễn phí. Hãy đăng nhập để tiếp tục.';
      else status.textContent=err?.message||ui.aiUnavailable;
      status.className='rad-ai-status is-error';
    }finally{button.disabled=false;}
  }
  function pronunciationTestNode(text,pinyin,ui,r,{sentence=false,compact=false}={}){
    const box=document.createElement('section');box.className=`rad-ai-pronunciation${compact?' is-compact':''}`;
    const button=document.createElement('button');button.type='button';button.className='rad-ai-check';button.textContent=`🎙 ${sentence?ui.aiSentenceCheck:ui.aiCheck}`;
    const status=document.createElement('div');status.className='rad-ai-status';
    const result=document.createElement('div');result.className='rad-ai-result';result.hidden=true;
    const previous=lastRadPronunciation(r,text,sentence?'sentence':'word');
    if(previous){status.textContent=`↺ ${ui.aiScore}: ${previous.score}% · ${previous.recognized||''}`;}
    button.addEventListener('click',()=>runRadPronunciationCheck({target:text,pinyin,ui,r,sentence,button,status,result,compact}));
    box.append(button,status,result);
    if(!compact){const note=document.createElement('small');note.className='rad-ai-note';note.textContent=ui.aiNote;box.append(note);}
    return box;
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

  const BRANCH_KIND={
    '你':'pronoun','他':'pronoun','住':'verb','休':'verb','吃':'verb','喝':'verb','唱':'verb','叫':'verb',
    '媽':'noun','姐':'noun','妹':'noun','好':'adjective','海':'noun','洗':'verb','清':'adjective','流':'verb',
    '情':'noun','快':'adjective','怕':'adjective','忙':'adjective','說':'verb','請':'verb','話':'noun','語':'noun',
    '打':'verb','拿':'verb','找':'verb','抱':'verb','飯':'noun','餐':'noun','飲':'verb','飽':'adjective',
    '林':'noun','校':'noun','桌':'noun','機':'noun','時':'time','明':'adjective','晚':'time','晴':'adjective',
    '熱':'adjective','煮':'verb','烤':'verb','燈':'noun','看':'verb','眼':'noun','睡':'verb','盲':'adjective'
  };
  const RESULT_MARKERS=['完','到','見','走','來','開','著'];
  const GRAMMAR_MARKERS=['們','的','呢','了'];

  function localized(obj){
    if(!obj)return '';
    if(typeof obj==='string')return obj;
    const lang=getLang();
    return obj[lang]??obj.vi??obj.en??obj['zh-Hant']??'';
  }
  function splitAroundRoot(text,root){
    const i=String(text).indexOf(root);
    if(i<0)return {before:'',root,after:String(text)};
    return {before:String(text).slice(0,i),root,after:String(text).slice(i+root.length)};
  }
  function chunkMeaning(text){return text?localized(learningChunks[text]):'';}
  function relationFor(branch,word){
    const override=learningOverrides[word[0]]||{};
    if(override.relation)return override.relation;
    const text=word[0];
    if(GRAMMAR_MARKERS.some(x=>text.includes(x)))return 'grammar';
    if(RESULT_MARKERS.some(x=>text.includes(x)))return 'result';
    return 'compound';
  }
  function relationLabel(relation,ui){
    if(relation==='grammar')return ui.grammarTag;
    if(relation==='result')return ui.resultTag;
    if(relation==='fixed')return ui.fixedTag;
    if(relation==='redup')return ui.redupTag;
    return ui.compoundTag;
  }
  function genericMemory(branch,word){
    const lang=getLang();
    const {before,after}=splitAroundRoot(word[0],branch[0]);
    const bits=[];
    if(before)bits.push(`${before} = ${chunkMeaning(before)||before}`);
    bits.push(`${branch[0]} = ${branchMeaning(branch)}`);
    if(after)bits.push(`${after} = ${chunkMeaning(after)||after}`);
    const target=expansionMeaning(word);
    if(lang==='en')return `${bits.join(' + ')}. Picture those ideas meeting in one scene, then attach the final meaning “${target}”.`;
    if(lang==='zh-Hant')return `${bits.join(' ＋ ')}。先把這些畫面放在一起，再連到整體意思「${target}」。`;
    return `${bits.join(' + ')}. Hãy ghép các hình ảnh này trong đầu rồi nối với nghĩa cuối “${target}”.`;
  }
  function usageFor(branch,word,relation){
    const override=learningOverrides[word[0]]||{};
    const special=localized(override.usage); if(special)return special;
    const lang=getLang();
    if(relation==='grammar')return lang==='en'?'Treat this as a grammar pattern and remember the whole pattern, not a literal character-by-character translation.':lang==='zh-Hant'?'把它當成語法句型記憶，不要逐字翻譯。':'Hãy học như một mẫu ngữ pháp; đừng dịch từng chữ khi đặt câu.';
    if(relation==='result')return lang==='en'?'The extra character often adds a result, direction, or evaluation. Learn which result the full word expresses.':lang==='zh-Hant'?'附加的字常補充結果、方向或評價；要連同整個詞一起記。':'Phần ghép thêm thường cho biết kết quả, hướng hoặc đánh giá; hãy nhớ cả cụm.';
    if(relation==='fixed')return lang==='en'?'This meaning is lexicalized. The character story is a memory aid, but the whole word is the real unit you should use.':lang==='zh-Hant'?'這是固定詞。拆字只用來幫助記憶，實際使用要把整個詞當成一個單位。':'Đây là từ cố định. Câu chuyện ghép chữ chỉ giúp nhớ; khi dùng hãy nhớ cả từ như một khối.';
    if(relation==='redup')return lang==='en'?'Reduplication often makes kinship terms sound natural and familiar in everyday speech.':lang==='zh-Hant'?'重疊常讓親屬稱呼更自然、口語化。':'Lặp chữ thường tạo cách gọi thân mật, tự nhiên trong giao tiếp.';
    const kind=BRANCH_KIND[branch[0]]||'word';
    if(kind==='verb')return lang==='en'?'Usually follows a subject; add an object, place, or time when the context needs it.':lang==='zh-Hant'?'通常放在主語後，依需要再加受詞、地點或時間。':'Thường đứng sau chủ ngữ; tùy câu có thể thêm tân ngữ, nơi chốn hoặc thời gian.';
    if(kind==='noun')return lang==='en'?'Use it as a noun phrase; it can follow possession, numbers/classifiers, or appear after a verb.':lang==='zh-Hant'?'把它當名詞使用，可接所有格、數量詞，也可放在動詞後。':'Dùng như danh từ; có thể đi sau sở hữu, số/lượng từ hoặc làm tân ngữ.';
    if(kind==='adjective')return lang==='en'?'Often works as a predicate/state word; 很、太、不 commonly appear around it depending on meaning.':lang==='zh-Hant'?'常作狀態／形容詞謂語，可依語意搭配很、太、不。':'Thường dùng làm trạng thái/vị ngữ; hay đi với 很, 太, 不 tùy ý nghĩa.';
    if(kind==='time')return lang==='en'?'Often appears near the beginning of a sentence to set the time.':lang==='zh-Hant'?'常放在句首或動詞前，用來交代時間。':'Thường đặt đầu câu hoặc trước động từ để nêu thời gian.';
    if(kind==='pronoun')return lang==='en'?'Use it as a person reference; particles after it can mark plural, possession, or a follow-up question.':lang==='zh-Hant'?'把它當人稱指稱；後面的助詞可表示複數、所有或追問。':'Dùng để chỉ người; các trợ từ phía sau có thể tạo số nhiều, sở hữu hoặc câu hỏi tiếp.';
    return lang==='en'?'Learn the whole word as one unit; use the structure only as a memory bridge.':lang==='zh-Hant'?'把整個詞當成一個單位記憶，字形拆解只作為記憶橋樑。':'Hãy nhớ cả từ như một khối; phần ghép chữ chỉ là cầu nối để dễ nhớ.';
  }
  function formulaNode(branch,word,ui){
    const wrap=document.createElement('div');wrap.className='rad-word-formula';
    const {before,after}=splitAroundRoot(word[0],branch[0]);
    const parts=[];
    if(before)parts.push([before,chunkMeaning(before)]);
    parts.push([branch[0],branchMeaning(branch)]);
    if(after)parts.push([after,chunkMeaning(after)]);
    parts.forEach((part,i)=>{
      if(i){const plus=document.createElement('b');plus.textContent='+';wrap.append(plus);}
      const chip=document.createElement('span');chip.className='rad-formula-chip';chip.innerHTML=`<strong>${part[0]}</strong><small>${part[1]||''}</small>`;wrap.append(chip);
    });
    const arrow=document.createElement('b');arrow.textContent='→';wrap.append(arrow);
    const result=document.createElement('span');result.className='rad-formula-result';result.innerHTML=`<strong>${word[0]}</strong><small>${expansionMeaning(word)}</small>`;wrap.append(result);
    return wrap;
  }
  function pronunciationBreakdown(word,ui){
    const box=document.createElement('div');box.className='rad-pronunciation-breakdown';
    const guides=window.TOCFLPinyin?.guideRows?.(word[1])||[];
    const chars=hanziChars(word[0]);
    if(!guides.length){box.textContent=word[1];return box;}
    guides.forEach((g,i)=>{
      const row=document.createElement('button');row.type='button';row.className='rad-syllable-chip';
      row.innerHTML=`<strong>${g.raw}</strong><span>${g.text}</span>`;
      const spoken=chars.length===guides.length?chars[i]:word[0];
      row.title=ui.soundEach;row.addEventListener('click',()=>speak(spoken,.55));box.append(row);
    });
    return box;
  }
  function normalizedExample(raw){
    if(!raw)return null;
    if(Array.isArray(raw))return {zh:raw[0]||'',pinyin:raw[1]||'',vi:raw[2]?.vi||raw[2]||'',en:raw[2]?.en||'', 'zh-Hant':raw[2]?.['zh-Hant']||raw[0]||''};
    return raw;
  }
  function exampleTranslation(ex){
    const lang=getLang();
    if(lang==='zh-Hant')return ex['zh-Hant']||ex.zh||'';
    return ex[lang]||ex.vi||ex.en||'';
  }
  function exampleListNode(term,ui,fallback=[],r=null){
    const wrap=document.createElement('section');wrap.className='rad-examples-block';
    const title=document.createElement('div');title.className='rad-examples-title';title.innerHTML=`<strong>💬 ${ui.examples}</strong><span>${ui.examplesHint}</span>`;wrap.append(title);
    const list=document.createElement('div');list.className='rad-example-list';
    const source=[];
    (Array.isArray(fallback)?fallback:[fallback]).filter(Boolean).forEach(x=>source.push(normalizedExample(x)));
    (Array.isArray(exampleSets[term])?exampleSets[term]:[]).forEach(x=>source.push(normalizedExample(x)));
    const seen=new Set();
    source.filter(Boolean).filter(ex=>{const key=ex.zh||'';if(!key||seen.has(key))return false;seen.add(key);return true;}).slice(0,3).forEach((ex,i)=>{
      const row=document.createElement('article');row.className='rad-example-sentence';
      const num=document.createElement('span');num.className='rad-example-number';num.textContent=String(i+1);
      const text=document.createElement('div');text.className='rad-example-sentence-text';
      text.innerHTML=`<div class="rad-example-zh">${ex.zh||''}</div>${ex.pinyin?`<div class="rad-example-py">${ex.pinyin}</div>`:''}<div class="rad-example-meaning">${exampleTranslation(ex)}</div>`;
      const actions=document.createElement('div');actions.className='rad-example-actions';
      const btn=document.createElement('button');btn.type='button';btn.className='rad-example-listen';btn.textContent='🔊';btn.title=ui.listenSentence;btn.addEventListener('click',()=>speak(ex.zh||term,.70));
      actions.append(btn,pronunciationTestNode(ex.zh||term,ex.pinyin||'',ui,r,{sentence:true,compact:true}));
      row.append(num,text,actions);list.append(row);
    });
    if(!list.children.length){
      const empty=document.createElement('div');empty.className='rad-example-empty';empty.textContent=getLang()==='en'?'Example sentences are being prepared.':getLang()==='zh-Hant'?'例句準備中。':'Ví dụ đang được bổ sung.';list.append(empty);
    }
    wrap.append(list);return wrap;
  }

  function deepWordLesson(branch,word,ui,r=null){
    const relation=relationFor(branch,word);
    const override=learningOverrides[word[0]]||{};
    const details=document.createElement('details');details.className='rad-deep-word';
    const summary=document.createElement('summary');summary.innerHTML=`<span>🧠 ${ui.deepStudy}</span><em class="rad-relation-tag is-${relation}">${relationLabel(relation,ui)}</em>`;details.append(summary);
    const body=document.createElement('div');body.className='rad-deep-body';
    const formula=document.createElement('section');formula.className='rad-deep-block';formula.innerHTML=`<h5>🧩 ${ui.formula}</h5>`;formula.append(formulaNode(branch,word,ui));
    const memory=document.createElement('section');memory.className='rad-deep-block';memory.innerHTML=`<h5>🎬 ${ui.visualize}</h5><p>${localized(override.memory)||genericMemory(branch,word)}</p>`;
    const usage=document.createElement('section');usage.className='rad-deep-block';usage.innerHTML=`<h5>💬 ${ui.usage}</h5><p>${usageFor(branch,word,relation)}</p>`;
    const pron=document.createElement('section');pron.className='rad-deep-block';pron.innerHTML=`<h5>🗣 ${ui.pronunciation}</h5><p class="rad-deep-mini">${ui.soundEach}</p>`;pron.append(pronunciationBreakdown(word,ui));
    const examples=exampleListNode(word[0],ui,[],r);
    const flow=document.createElement('section');flow.className='rad-study-flow';flow.innerHTML=`<strong>🎯 ${ui.studyFlow}</strong><span>${ui.studyFlowText}</span>`;
    body.append(formula,memory,usage,pron,examples,flow);details.append(body);return details;
  }
  function rootStudyNode(r,branch,ui){
    const core=r.chars.find(ch=>ch.h===branch[0]);
    const extra=branchDetails[branch[0]]||{};
    const structure=core?.s||extra.s||'';
    const why=core?pick(core.w):localized(extra.w);
    const box=document.createElement('div');box.className='rad-root-study';
    if(structure||why){
      box.innerHTML=`<strong>🧩 ${ui.rootRole}</strong>${structure?`<div class="rad-root-structure"><span>${ui.structure}</span><b>${structure}</b></div>`:''}${why?`<p>${why}</p>`:''}`;
    }else box.textContent=branchWhy(branch);
    return box;
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
      head.append(core,meta,audioButtons(branch[0],ui,'word'),writeTargetButton(r,branch[0],ui));
      const why=rootStudyNode(r,branch,ui);
      const list=document.createElement('div');list.className='rad-expansion-words';
      branch[5].forEach(word=>{
        const row=document.createElement('div');row.className='rad-expansion-word';
        const main=document.createElement('div');main.className='rad-expansion-word-main';
        main.innerHTML=`<strong>${word[0]}</strong><span>${word[1]}</span><small>${expansionMeaning(word)}</small>`;
        const actions=document.createElement('div');actions.className='rad-expansion-actions';actions.append(audioButtons(word[0],ui),writeTargetButton(r,word[0],ui));
        row.append(main,actions,deepWordLesson(branch,word,ui,r));
        list.append(row);
      });
      group.append(head,why,list);grid.append(group);
    });
    details.append(grid);
    return details;
  }

  const WRITING_PROGRESS_KEY='tocfl-radical-writing-v1';
  const SELECTED_RADICAL_KEY='tocfl-radical-selected-v1';
  const WRITING_TARGET_PREFIX='tocfl-radical-writing-target-';
  function notifyRadicalStateChanged(){
    document.dispatchEvent(new CustomEvent('tocfl:state-changed',{detail:{source:'radicals'}}));
  }
  function saveTextState(key,value){
    try{const next=String(value);if(localStorage.getItem(key)===next)return false;localStorage.setItem(key,next);notifyRadicalStateChanged();return true;}catch{return false;}
  }
  function saveJsonState(key,data){
    try{const next=JSON.stringify(data||{});if(localStorage.getItem(key)===next)return false;localStorage.setItem(key,next);notifyRadicalStateChanged();return true;}catch{return false;}
  }
  let selectedRadicalKey=localStorage.getItem(SELECTED_RADICAL_KEY)||'person';
  const radicalWriterInstances=[];
  const writingPanels=new Map();

  function hanziChars(text){
    return Array.from(String(text||'')).filter(ch=>/[\u3400-\u9FFF\uF900-\uFAFF]/.test(ch));
  }
  function uniqueTexts(items){
    const seen=new Set();
    return items.filter(item=>{const key=item.text;if(!key||seen.has(key))return false;seen.add(key);return true;});
  }
  function allWritingChars(r){
    const chars=[];
    const primary=r.radical.split('/')[0].trim();
    chars.push(...hanziChars(primary));
    r.chars.forEach(ch=>chars.push(...hanziChars(ch.h)));
    (expansionTrees[r.key]||[]).forEach(branch=>{
      chars.push(...hanziChars(branch[0]));
      branch[5].forEach(word=>chars.push(...hanziChars(word[0])));
    });
    return [...new Set(chars)];
  }
  function writingTargets(r){
    const meta=new Map();
    const primary=r.radical.split('/')[0].trim();
    if(primary)meta.set(primary,{p:r.pinyin,m:pick(r.meaning)});
    r.chars.forEach(ch=>meta.set(ch.h,{p:ch.p,m:pick(ch.m)}));
    (expansionTrees[r.key]||[]).forEach(branch=>{
      meta.set(branch[0],{p:branch[1],m:branchMeaning(branch)});
    });

    const items=[];
    // Every Hanzi that appears anywhere in this radical tree can be practised individually.
    allWritingChars(r).forEach(ch=>{
      const m=meta.get(ch)||{};
      items.push({text:ch,p:m.p||'',m:m.m||'',group:'core'});
    });
    // Keep every developed compound/phrase as a whole target too, so all of its characters
    // appear side-by-side in the handwriting trainer.
    (expansionTrees[r.key]||[]).forEach(branch=>{
      branch[5].forEach(word=>items.push({text:word[0],p:word[1],m:expansionMeaning(word),group:'expanded'}));
    });
    return uniqueTexts(items);
  }
  function coreWritingChars(r){
    return allWritingChars(r);
  }
  function openWritingTarget(radicalKey,text){
    const panel=writingPanels.get(radicalKey);
    if(panel)panel.openTarget(text);
  }
  function writeTargetButton(r,text,ui){
    const b=document.createElement('button');
    b.type='button';b.className='rad-write-shortcut';b.textContent=`✍ ${ui.writeThis}`;
    b.addEventListener('click',()=>openWritingTarget(r.key,text));
    return b;
  }
  function loadWritingProgress(){
    try{return JSON.parse(localStorage.getItem(WRITING_PROGRESS_KEY)||'{}')||{};}catch{return {};}
  }
  function saveWritingProgress(data){saveJsonState(WRITING_PROGRESS_KEY,data);}
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
    document.querySelectorAll(`[data-rad-writing-progress="${r.key}"]`).forEach(el=>{el.textContent=progressText(r,ui);});
    document.querySelectorAll(`[data-rad-progress="${r.key}"]`).forEach(el=>{const lp=learningProgress(r),wp=writingProgress(r);el.textContent=`📚 ${ui.learned}: ${lp.done}/${lp.total} · ✍ ${ui.progress}: ${wp.done}/${wp.total}`;});
  }
  function radicalCharDataLoader(char,onComplete,onError){
    fetch(`https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0.1/${encodeURIComponent(char)}.json`,{cache:'force-cache'})
      .then(res=>{if(!res.ok)throw new Error(`HTTP ${res.status}`);return res.json();})
      .then(onComplete).catch(onError);
  }
  function makePracticeWriter(host,ch,ui,r,status,options={}){
    if(typeof window.HanziWriter==='undefined'){
      status.textContent=ui.writerUnavailable;status.className='rad-writing-status is-error';return null;
    }
    const autoSize=Math.max(170,Math.min(238,(window.innerWidth||320)-86));const size=Math.max(118,Math.min(238,Number(options.size)||autoSize));
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
  function renderWritingTarget(container,target,r,ui,options={}){
    container.innerHTML='';
    if(!options.hideHeader){const targetHead=document.createElement('div');targetHead.className='rad-writing-target-head';targetHead.innerHTML=`<div><strong>${target.text}</strong><span>${target.p||''}</span><small>${target.m||''}</small></div>`;targetHead.append(audioButtons(target.text,ui,'word'));container.append(targetHead);}
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
      if(options.compact){unit.classList.add('is-compact');animate.textContent='▶';animate.title=ui.strokeOrder;quiz.textContent='✍';quiz.title=ui.startQuiz;reset.textContent='↺';reset.title=ui.rewrite;guide.textContent='👁';guide.title=ui.hideGuide;}const writer=makePracticeWriter(host,ch,ui,r,status,options);
      if(!writer){animate.disabled=quiz.disabled=reset.disabled=guide.disabled=true;return;}
      animate.addEventListener('click',()=>{
        try{writer.cancelQuiz();writer.showOutline({duration:0});writer.showCharacter({duration:0});writer.animateCharacter();status.textContent=ui.strokeOrder;}catch{}
      });
      const startQuiz=()=>{
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
      };
      quiz.addEventListener('click',startQuiz);
      if(options.autoQuiz)setTimeout(startQuiz,180);
      reset.addEventListener('click',()=>{
        try{writer.cancelQuiz();writer.showOutline({duration:0});if(guideVisible)writer.showCharacter({duration:0});else writer.hideCharacter({duration:0});status.textContent=ui.writingReady;status.className='rad-writing-status';}catch{}
      });
      guide.addEventListener('click',()=>{
        guideVisible=!guideVisible;
        try{guideVisible?writer.showCharacter({duration:120}):writer.hideCharacter({duration:120});}catch{}
        guide.textContent=options.compact?'👁':`👁 ${guideVisible?ui.hideGuide:ui.showGuide}`;guide.title=guideVisible?ui.hideGuide:ui.showGuide;
      });
    });
  }
  function writingPracticePanel(r,ui){
    const details=document.createElement('details');details.className='rad-writing-panel';details.dataset.radWritingPanel=r.key;
    const summary=document.createElement('summary');
    summary.innerHTML=`<span>✍ ${ui.practiceWriting}</span><strong data-rad-writing-progress="${r.key}">${progressText(r,ui)}</strong>`;
    details.append(summary);
    const body=document.createElement('div');body.className='rad-writing-panel-body';details.append(body);
    let built=false,targets=[],select=null,stage=null;
    const draw=()=>{
      if(!select||!stage||!targets.length)return;
      const idx=Number(select.value)||0;
      saveTextState(`${WRITING_TARGET_PREFIX}${r.key}`,String(idx));
      renderWritingTarget(stage,targets[idx]||targets[0],r,ui);
    };
    const build=()=>{
      if(built)return;built=true;
      const hint=document.createElement('p');hint.className='rad-writing-hint';hint.textContent=ui.practiceHint;
      const row=document.createElement('label');row.className='rad-writing-select-row';
      const title=document.createElement('span');title.textContent=ui.practiceTarget;
      select=document.createElement('select');
      targets=writingTargets(r);
      const coreGroup=document.createElement('optgroup');coreGroup.label=ui.coreChars;
      const expGroup=document.createElement('optgroup');expGroup.label=ui.expandedWords;
      targets.forEach((target,idx)=>{
        const option=document.createElement('option');option.value=String(idx);option.textContent=`${target.text} · ${target.p||''} · ${target.m||''}`;
        (target.group==='expanded'?expGroup:coreGroup).append(option);
      });
      select.append(coreGroup,expGroup);
      const saved=localStorage.getItem(`${WRITING_TARGET_PREFIX}${r.key}`);
      if(saved!==null&&targets[Number(saved)])select.value=saved;
      row.append(title,select);body.append(hint,row);
      stage=document.createElement('div');stage.className='rad-writing-stage';body.append(stage);
      select.addEventListener('change',draw);draw();
    };
    const openTarget=text=>{
      details.open=true;build();
      const idx=targets.findIndex(t=>t.text===text);
      if(idx>=0){select.value=String(idx);draw();}
      requestAnimationFrame(()=>details.scrollIntoView({behavior:'smooth',block:'start'}));
    };
    writingPanels.set(r.key,{details,openTarget});
    details.addEventListener('toggle',()=>{if(details.open)build();});
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
    visible.forEach(r=>{
      const b=document.createElement('button');b.type='button';b.className='rad-picker-item';b.classList.toggle('is-active',selectedRadicalKey===r.key);
      const p=writingProgress(r),lp=learningProgress(r);
      b.innerHTML=`<strong>${r.radical}</strong><span>${r.pinyin} · ${pick(r.meaning)}</span><small data-rad-progress="${r.key}">📚 ${ui.learned}: ${lp.done}/${lp.total} · ✍ ${ui.progress}: ${p.done}/${p.total}</small>`;
      b.addEventListener('click',()=>{selectedRadicalKey=r.key;saveTextState(SELECTED_RADICAL_KEY,r.key);renderContent();});grid.append(b);
    });
    section.append(grid);return section;
  }

  function charCard(ch,ui,r){
    const card=document.createElement('article');card.className='rad-char-card';
    const top=document.createElement('div');top.className='rad-char-top';
    const hanzi=document.createElement('div');hanzi.className='rad-char-hanzi';hanzi.textContent=ch.h;
    const info=document.createElement('div');info.className='rad-char-info';
    const p=document.createElement('strong');p.className='rad-char-pinyin';p.textContent=ch.p;
    const m=document.createElement('span');m.textContent=pick(ch.m);
    info.append(p,m);top.append(hanzi,info);
    const structure=document.createElement('div');structure.className='rad-structure';structure.innerHTML=`<span>${ui.structure}</span><strong>${ch.s}</strong>`;
    const why=document.createElement('div');why.className='rad-why';why.innerHTML=`<strong>${ui.why}</strong><p>${pick(ch.w)}</p>`;
    const fallback=ch.ex?[{zh:ch.ex[0],pinyin:ch.ex[1],vi:ch.ex[2]?.vi||'',en:ch.ex[2]?.en||'', 'zh-Hant':ch.ex[2]?.['zh-Hant']||ch.ex[0]}]:[];
    const ex=exampleListNode(ch.h,ui,fallback,r);
    const charActions=document.createElement('div');charActions.className='rad-char-actions';charActions.append(audioButtons(ch.h,ui,'word'),writeTargetButton(r,ch.h,ui));
    card.append(top,pinyinHintNode(ch.p),charActions,pronunciationTestNode(ch.h,ch.p,ui,r),structure,why,ex);
    return card;
  }
  const RADICAL_LEARNING_KEY='tocfl-radical-learning-flow-v1';
  function loadLearningState(){
    try{return JSON.parse(localStorage.getItem(RADICAL_LEARNING_KEY)||'{}')||{};}catch{return {};}
  }
  function saveLearningState(data){saveJsonState(RADICAL_LEARNING_KEY,data);}
  function lessonId(item){return `${item.type}:${item.text}`;}
  function radicalLessons(r){
    const items=[];
    r.chars.forEach(ch=>items.push({type:'char',text:ch.h,p:ch.p,m:pick(ch.m),ch}));
    (expansionTrees[r.key]||[]).forEach(branch=>{
      branch[5].forEach(word=>items.push({type:'word',text:word[0],p:word[1],m:expansionMeaning(word),branch,word}));
    });
    const seen=new Set();
    return items.filter(item=>{const id=lessonId(item);if(seen.has(id))return false;seen.add(id);return true;});
  }
  function learningProgress(r){
    const lessons=radicalLessons(r);
    const saved=loadLearningState()[r.key]||{};
    const done=new Set(Array.isArray(saved.done)?saved.done:[]);
    return {done:[...done].filter(id=>lessons.some(item=>lessonId(item)===id)).length,total:lessons.length};
  }
  function wordLessonCard(r,item,ui){
    const {branch,word}=item;
    const card=document.createElement('article');card.className='rad-single-word-card';
    const eyebrow=document.createElement('div');eyebrow.className='rad-lesson-type';eyebrow.textContent=`🌱 ${ui.wordLesson} · ${ui.branchFrom} ${branch[0]} ${branch[1]}`;
    const top=document.createElement('div');top.className='rad-single-word-head';
    const main=document.createElement('div');main.innerHTML=`<strong>${word[0]}</strong><span>${word[1]}</span><small>${expansionMeaning(word)}</small>`;
    top.append(main,audioButtons(word[0],ui,'word'),writeTargetButton(r,word[0],ui));
    const root=rootStudyNode(r,branch,ui);root.classList.add('rad-single-root-note');
    const lesson=deepWordLesson(branch,word,ui,r);lesson.open=true;lesson.classList.add('is-single-lesson');
    card.append(eyebrow,top,pinyinHintNode(word[1]),pronunciationTestNode(word[0],word[1],ui,r),root,lesson);
    return card;
  }
  function singleLessonNode(r,item,ui){
    if(item.type==='char'){
      const wrap=document.createElement('div');wrap.className='rad-single-char-wrap';
      const tag=document.createElement('div');tag.className='rad-lesson-type';tag.textContent=`🧩 ${ui.coreLesson}`;
      wrap.append(tag,charCard(item.ch,ui,r));
      return wrap;
    }
    return wordLessonCard(r,item,ui);
  }
  function radicalStudyPlayer(r,ui){
    const lessons=radicalLessons(r);
    const stateAll=loadLearningState();
    const saved=stateAll[r.key]||{};
    let index=Math.max(0,Math.min(Number(saved.index)||0,Math.max(0,lessons.length-1)));
    let done=new Set(Array.isArray(saved.done)?saved.done:[]);
    const section=document.createElement('section');section.className='rad-study-player';
    const head=document.createElement('div');head.className='rad-study-player-head';
    const title=document.createElement('div');title.innerHTML=`<strong>📚 ${ui.lesson}</strong><span>${ui.lessonHint}</span>`;
    const counter=document.createElement('div');counter.className='rad-study-counter';
    head.append(title,counter);
    const progress=document.createElement('div');progress.className='rad-study-progress';progress.innerHTML='<i></i>';
    const stage=document.createElement('div');stage.className='rad-study-stage';
    const nav=document.createElement('div');nav.className='rad-study-nav';
    const prev=document.createElement('button');prev.type='button';prev.textContent=`← ${ui.previous}`;
    const restart=document.createElement('button');restart.type='button';restart.className='rad-study-restart';restart.textContent=`↺ ${ui.restart}`;
    const next=document.createElement('button');next.type='button';next.className='primary';
    nav.append(prev,restart,next);
    section.append(head,progress,stage,nav);
    const persist=()=>{
      const all=loadLearningState();all[r.key]={...(all[r.key]||{}),index,done:[...done]};saveLearningState(all);
    };
    const draw=()=>{
      stage.innerHTML='';
      const item=lessons[index];
      if(!item){stage.textContent='';return;}
      stage.append(singleLessonNode(r,item,ui));
      const currentDone=done.has(lessonId(item));
      counter.innerHTML=`<b>${index+1}/${lessons.length}</b><small>✓ ${ui.learned}: ${done.size}/${lessons.length}</small>`;
      progress.querySelector('i').style.width=`${lessons.length?((index+1)/lessons.length)*100:0}%`;
      prev.disabled=index===0;
      if(index===lessons.length-1){
        next.textContent=currentDone?`✓ ${ui.completed}`:`✓ ${ui.finishRadical}`;
      }else{
        next.textContent=currentDone?`${ui.next} →`:`✓ ${ui.understoodNext} →`;
      }
      next.classList.toggle('is-complete',currentDone);
      persist();
      document.querySelectorAll(`[data-rad-progress="${r.key}"]`).forEach(el=>{const lp=learningProgress(r),wp=writingProgress(r);el.textContent=`📚 ${ui.learned}: ${lp.done}/${lp.total} · ✍ ${ui.progress}: ${wp.done}/${wp.total}`;});
    };
    prev.addEventListener('click',()=>{if(index>0){index--;draw();section.scrollIntoView({behavior:'smooth',block:'start'});}});
    next.addEventListener('click',()=>{
      const item=lessons[index];if(item)done.add(lessonId(item));
      if(index<lessons.length-1)index++;
      draw();
      section.scrollIntoView({behavior:'smooth',block:'start'});
    });
    restart.addEventListener('click',()=>{index=0;done=new Set();draw();section.scrollIntoView({behavior:'smooth',block:'start'});});
    draw();
    return section;
  }
  function radicalCard(r,ui){
    const card=document.createElement('section');card.className='rad-group-card';const expSearch=(expansionTrees[r.key]||[]).map(b=>`${b.slice(0,5).join(' ')} ${b[5].flat().join(' ')}`).join(' ');card.dataset.search=`${r.radical} ${r.pinyin} ${pick(r.meaning)} ${r.chars.map(x=>`${x.h} ${x.p} ${pick(x.m)}`).join(' ')} ${expSearch}`.toLowerCase();
    const head=document.createElement('div');head.className='rad-group-head';
    const symbol=document.createElement('div');symbol.className='rad-symbol';symbol.textContent=r.radical;
    const meta=document.createElement('div');meta.innerHTML=`<div class="rad-icon">${r.icon}</div><strong>${r.pinyin}</strong><span>${pick(r.meaning)}</span>`;
    head.append(symbol,meta,audioButtons(r.radical.split('/')[0].trim(),ui,'word'));
    const origin=document.createElement('p');origin.className='rad-origin';origin.textContent=pick(r.origin);
    card.append(head,origin,writingPracticePanel(r,ui),radicalStudyPlayer(r,ui));return card;
  }
  function renderSemantic(root,ui,query=''){
    root.innerHTML='';writingPanels.clear();
    const note=document.createElement('div');note.className='rad-learning-note';note.textContent=ui.note;root.append(note,radicalChooser(ui,query));
    const grid=document.createElement('div');grid.className='rad-group-grid';
    let list=radicals.filter(r=>!query||radicalSearchText(r).includes(query));
    if(query){
      const selected=list.find(r=>r.key===selectedRadicalKey)||list[0];
      list=selected?[selected]:[];
    }else{
      list=list.filter(r=>r.key===selectedRadicalKey);
    }
    list.forEach(r=>grid.append(radicalCard(r,ui)));
    if(!list.length){const empty=document.createElement('div');empty.className='rad-learning-note';empty.textContent=getLang()==='en'?'No matching radical found.':getLang()==='zh-Hant'?'找不到符合的部件。':'Không tìm thấy bộ phù hợp.';grid.append(empty);}
    root.append(grid);
  }

  const ORIGIN_FLOW_KEY='tocfl-character-origin-flow-v1';
  function loadOriginState(){
    try{const v=JSON.parse(localStorage.getItem(ORIGIN_FLOW_KEY)||'{}');return v&&typeof v==='object'&&!Array.isArray(v)?v:{};}catch{return {};}
  }
  function saveOriginState(state){saveJsonState(ORIGIN_FLOW_KEY,state);}
  function originCategoryText(category,ou){return category==='combined'?ou.combined:category==='phonosemantic'?ou.phonosemantic:ou.pictogram;}
  function originSearchText(lesson){
    return [lesson.char,lesson.pinyin,pick(lesson.meaning),pick(lesson.explanation),pick(lesson.memory),...(lesson.vocab||[]).flatMap(v=>[v.h,v.p,pick(v.m),v.example?.zh,v.example?.p,pick(v.example?.m)]),...(lesson.examples||[]).flatMap(e=>[e.zh,e.p,pick(e.m)])].join(' ').toLowerCase();
  }
  function originAncientCandidates(lesson,ou){
    const out=[];const seen=new Set();
    const add=(url,label,source)=>{if(!url||seen.has(url))return;seen.add(url);out.push({url,label,source});};
    if(Array.isArray(lesson.ancientStages))lesson.ancientStages.forEach(x=>add(x?.image||x?.url,x?.label||ou.ancientStage,x?.source||''));
    add(lesson.ancientImage,lesson.ancientLabel||ou.oracle,lesson.ancientSource||'');
    const ch=String(lesson.char||'').trim();
    if(ch){
      const base='https://commons.wikimedia.org/wiki/Special:Redirect/file/';
      const wiki='https://commons.wikimedia.org/wiki/File:';
      [["oracle",ou.oracle],["bronze",ou.bronze],["bigseal",ou.bigseal],["seal",ou.seal]].forEach(([kind,label])=>{
        const filename=`${ch}-${kind}.svg`;add(base+encodeURIComponent(filename),label,wiki+encodeURIComponent(filename));
      });
    }
    return out;
  }
  function originAncientImage(lesson,ou){
    const box=document.createElement('div');box.className='origin-ancient-wrap';
    const candidates=originAncientCandidates(lesson,ou);let idx=0;
    const label=document.createElement('small');label.className='origin-ancient-kind';
    const img=document.createElement('img');img.className='origin-ancient-image';img.alt=`${lesson.char} ${ou.ancientStage}`;img.loading='lazy';img.referrerPolicy='no-referrer';
    const fallback=document.createElement('div');fallback.className='origin-image-error';fallback.hidden=true;fallback.textContent=ou.imageFallback;
    const source=document.createElement('a');source.className='origin-ancient-source';source.target='_blank';source.rel='noopener noreferrer';source.textContent='Wikimedia Commons';source.hidden=true;
    const tryNext=()=>{
      if(idx>=candidates.length){img.hidden=true;label.hidden=true;source.hidden=true;fallback.hidden=false;return;}
      const c=candidates[idx++];img.hidden=false;fallback.hidden=true;label.hidden=false;label.textContent=c.label||ou.ancientStage;source.hidden=!c.source;if(c.source)source.href=c.source;img.src=c.url;
    };
    img.addEventListener('error',tryNext);img.addEventListener('load',()=>{fallback.hidden=true;});
    box.append(label,img,source,fallback);tryNext();return box;
  }
  function originAncientStageCard(lesson,ou){
    const ancient=document.createElement('div');ancient.className='origin-stage-card origin-ancient-card';
    const al=document.createElement('span');al.textContent=ou.ancientStage||ou.ancient;ancient.append(al,originAncientImage(lesson,ou));return ancient;
  }
  function originArrow(){const el=document.createElement('div');el.className='origin-arrow';el.textContent='→';return el;}
  function originVisualSlide(lesson,ou){
    const slide=document.createElement('section');slide.className='origin-slide origin-visual-slide';
    const heading=document.createElement('div');heading.className='origin-slide-heading';heading.textContent=originCategoryText(lesson.category,ou);slide.append(heading);
    const flow=document.createElement('div');flow.className=`origin-evolution origin-${lesson.category}`;
    if(lesson.category==='pictogram'){
      const object=document.createElement('div');object.className='origin-stage-card origin-object-card';object.innerHTML=`<span>${ou.object}</span><div class="origin-object-emoji">${lesson.objectEmoji||'🖼️'}</div><strong>${pick(lesson.objectLabel)}</strong>`;
      const ancient=originAncientStageCard(lesson,ou);
      const modern=document.createElement('div');modern.className='origin-stage-card origin-modern-card';modern.innerHTML=`<span>${ou.modern}</span><div class="origin-modern-char">${lesson.char}</div><strong>${lesson.pinyin}</strong><small>${pick(lesson.meaning)}</small>`;
      flow.append(object,originArrow(),ancient,originArrow(),modern);
    }else if(lesson.category==='combined'){
      (lesson.components||[]).forEach((c,idx)=>{
        const comp=document.createElement('div');comp.className='origin-stage-card origin-component-card';comp.innerHTML=`<div class="origin-object-emoji">${c.emoji||''}</div><div class="origin-component-char">${c.char}</div><strong>${c.p||''}</strong><small>${pick(c.m)}</small>`;flow.append(comp);if(idx<(lesson.components||[]).length-1){const plus=document.createElement('div');plus.className='origin-plus';plus.textContent='+';flow.append(plus);}
      });
      flow.append(originArrow(),originAncientStageCard(lesson,ou),originArrow());const modern=document.createElement('div');modern.className='origin-stage-card origin-modern-card';modern.innerHTML=`<span>${ou.modern}</span><div class="origin-modern-char">${lesson.char}</div><strong>${lesson.pinyin}</strong><small>${pick(lesson.meaning)}</small>`;flow.append(modern);
    }else{
      const sem=document.createElement('div');sem.className='origin-stage-card origin-semantic-card';sem.innerHTML=`<span>${ou.meaningPart}</span><div class="origin-component-char">${lesson.semantic?.char||''}</div><strong>${pick(lesson.semantic?.m)}</strong>`;
      const pho=document.createElement('div');pho.className='origin-stage-card origin-phonetic-card';pho.innerHTML=`<span>${ou.soundPart}</span><div class="origin-component-char">${lesson.phonetic?.char||''}</div><strong>${lesson.phonetic?.p||''}</strong><small>${pick(lesson.phonetic?.m)}</small>`;
      const modern=document.createElement('div');modern.className='origin-stage-card origin-modern-card';modern.innerHTML=`<span>${ou.modern}</span><div class="origin-modern-char">${lesson.char}</div><strong>${lesson.pinyin}</strong><small>${pick(lesson.meaning)}</small>`;
      const plus=document.createElement('div');plus.className='origin-plus';plus.textContent='+';flow.append(sem,plus,pho,originArrow(),originAncientStageCard(lesson,ou),originArrow(),modern);
    }
    slide.append(flow);
    const sound=document.createElement('div');sound.className='origin-main-actions';sound.append(audioButtons(lesson.char,UI[getLang()]||UI.vi,'word'),pinyinHintNode(lesson.pinyin));slide.append(sound);
    return slide;
  }
  function originExplanationSlide(lesson,ou){
    const slide=document.createElement('section');slide.className='origin-slide';
    slide.innerHTML=`<div class="origin-slide-heading">${ou.step2}</div><div class="origin-explain-card"><div class="origin-explain-char">${lesson.char}</div><div><h3>${lesson.char} · ${lesson.pinyin} · ${pick(lesson.meaning)}</h3><h4>🧩 ${ou.explain}</h4><p>${pick(lesson.explanation)}</p><h4>🎬 ${ou.memory}</h4><p>${pick(lesson.memory)}</p>${lesson.id==='plural-men'?`<div class="origin-neutral-note">💡 ${ou.neutralTone}</div>`:''}</div></div>`;
    return slide;
  }
  function originFormationKindLabel(kind,ou){
    const map={literal:ou.kindLiteral,parallel:ou.kindParallel,grammar:ou.kindGrammar,lexicalized:ou.kindLexicalized,proper:ou.kindProper,historical:ou.kindHistorical,result:ou.kindResult,classifier:ou.kindClassifier,redup:ou.kindRedup};
    return map[kind]||ou.kindLiteral;
  }
  function originFormationGeneric(v,formation){
    const lang=getLang();
    const parts=(formation?.parts||[]).map(x=>`${x.h} = ${pick(x.m)}`).join(lang==='zh-Hant'?' ＋ ':' + ');
    const meaning=pick(v.m);
    if(formation?.kind==='proper')return lang==='en'?`This is a proper name. Use the pieces as a memory bridge, but learn “${v.h}” as one fixed name.`:lang==='zh-Hant'?`這是專有名詞。拆字只用來幫助記憶，實際要把「${v.h}」當成完整名稱。`:`Đây là tên riêng. Phần tách chữ chỉ giúp hình dung; khi dùng hãy nhớ “${v.h}” như một tên hoàn chỉnh.`;
    if(formation?.kind==='grammar')return lang==='en'?`${parts}. One piece has a grammar function, so the final meaning comes from the pattern rather than a literal translation.`:lang==='zh-Hant'?`${parts}。其中有語法成分，因此要從整個結構理解，不要逐字硬譯。`:`${parts}. Có thành phần làm nhiệm vụ ngữ pháp, vì vậy nghĩa cuối đến từ cả mẫu chứ không phải dịch cứng từng chữ.`;
    if(formation?.kind==='classifier')return lang==='en'?`${parts}. This is a number/classifier phrase; the classifier connects the number with the noun.`:lang==='zh-Hant'?`${parts}。這是數量詞結構，量詞把數字和名詞連起來。`:`${parts}. Đây là cụm số + lượng từ; lượng từ nối số lượng với danh từ.`;
    if(formation?.kind==='result')return lang==='en'?`${parts}. The later piece adds the result/state reached by the first action.`:lang==='zh-Hant'?`${parts}。後面的成分補充前面動作達到的結果／狀態。`:`${parts}. Phần sau bổ sung kết quả/trạng thái đạt được của hành động phía trước.`;
    if(formation?.kind==='redup')return lang==='en'?`${parts}. Repeating the same character changes or strengthens the everyday nuance.`:lang==='zh-Hant'?`${parts}。重疊同一個字可改變或加強語氣與詞義。`:`${parts}. Lặp lại cùng một chữ để tạo sắc thái/cách gọi tự nhiên hơn.`;
    if(formation?.kind==='parallel')return lang==='en'?`${parts}. The two meanings support or reinforce each other, producing “${meaning}”.`:lang==='zh-Hant'?`${parts}。兩個意思彼此補充／加強，形成「${meaning}」。`:`${parts}. Hai ý bổ trợ hoặc nhấn mạnh nhau, từ đó tạo nghĩa “${meaning}”.`;
    if(formation?.kind==='historical')return lang==='en'?`${parts}. The modern word is easier to understand with its historical background rather than a purely literal reading.`:lang==='zh-Hant'?`${parts}。這個詞要配合歷史背景理解，比逐字直譯更準確。`:`${parts}. Từ này dễ hiểu hơn khi biết bối cảnh lịch sử, không nên chỉ dịch từng chữ máy móc.`;
    if(formation?.kind==='lexicalized')return lang==='en'?`${parts}. The word has become lexicalized, so the pieces help memory but the full word must be learned as one unit.`:lang==='zh-Hant'?`${parts}。這個詞已固定化；拆字可以幫助記憶，但實際要整詞學。`:`${parts}. Từ này đã cố định hóa; tách chữ giúp nhớ nhưng khi dùng cần học cả cụm như một đơn vị.`;
    return lang==='en'?`${parts} → ${v.h} = ${meaning}. The final meaning follows fairly directly from the pieces.`:lang==='zh-Hant'?`${parts} → ${v.h}＝${meaning}。整體意思可以比較直接地從各部分組合出來。`:`${parts} → ${v.h} = ${meaning}. Nghĩa toàn từ có thể hình dung khá trực tiếp từ các phần ghép lại.`;
  }
  function originFormationMemory(v,formation){
    const direct=pick(formation?.memory);if(direct)return direct;
    const lang=getLang(),bits=(formation?.parts||[]).map(x=>`${x.h} (${pick(x.m)})`).join(lang==='zh-Hant'?' ＋ ':' + ');
    return lang==='en'?`Put ${bits} into one mental picture, then attach that scene to “${v.h} — ${pick(v.m)}”.`:lang==='zh-Hant'?`把 ${bits} 放進同一個畫面，再把這個畫面連到「${v.h} — ${pick(v.m)}」。`:`Hãy đặt ${bits} vào cùng một cảnh trong đầu, rồi nối cảnh đó với “${v.h} — ${pick(v.m)}”.`;
  }
  function originFormationNode(v,ou){
    const f=v?.formation;if(!f||!Array.isArray(f.parts)||!f.parts.length)return null;
    const box=document.createElement('section');box.className='origin-word-formation';
    const top=document.createElement('div');top.className='origin-formation-title';top.innerHTML=`<b>🧩 ${ou.formation}</b><span>${originFormationKindLabel(f.kind,ou)}</span>`;box.append(top);
    const formula=document.createElement('div');formula.className='origin-formation-formula';
    f.parts.forEach((part,i)=>{if(i){const plus=document.createElement('b');plus.className='origin-formation-plus';plus.textContent='+';formula.append(plus);}const chip=document.createElement('div');chip.className='origin-formation-chip';chip.innerHTML=`<strong>${part.h}</strong><small>${pick(part.m)}</small>`;formula.append(chip);});
    const arrow=document.createElement('b');arrow.className='origin-formation-arrow';arrow.textContent='→';formula.append(arrow);const result=document.createElement('div');result.className='origin-formation-result';result.innerHTML=`<strong>${v.h}</strong><small>${pick(v.m)}</small>`;formula.append(result);box.append(formula);
    const explain=document.createElement('div');explain.className='origin-formation-explain';explain.innerHTML=`<b>💡 ${ou.explain}</b><p>${pick(f.note)||originFormationGeneric(v,f)}</p>`;box.append(explain);
    const memory=document.createElement('div');memory.className='origin-formation-memory';memory.innerHTML=`<b>🎬 ${ou.memoryBridge}</b><p>${originFormationMemory(v,f)}</p>`;box.append(memory);
    return box;
  }
  function originInlineWriting(text,pinyin,meaning,lesson,ui,label){
    const details=document.createElement('details');details.className='origin-inline-writing';const summary=document.createElement('summary');summary.textContent=`✍ ${label}`;details.append(summary);const stage=document.createElement('div');stage.className='origin-inline-writing-stage';details.append(stage);let built=false;details.addEventListener('toggle',()=>{if(details.open&&!built){built=true;renderWritingTarget(stage,{text,p:pinyin,m:meaning,group:'core'},{key:`origin-${lesson.id}`,radical:text,pinyin,meaning:{vi:meaning,en:meaning,'zh-Hant':meaning},chars:[]},ui);}});return details;
  }
  function originOpenWriting(text,pinyin,meaning,lesson,ui,ou){
    const box=document.createElement('section');box.className='origin-writing-open';const label=document.createElement('div');label.className='origin-writing-open-title';label.textContent=`✍ ${ou.writeNow}`;const stage=document.createElement('div');stage.className='origin-writing-open-stage';box.append(label,stage);requestAnimationFrame(()=>renderWritingTarget(stage,{text,p:pinyin,m:meaning,group:'core'},{key:`origin-${lesson.id}`,radical:text,pinyin,meaning:{vi:meaning,en:meaning,'zh-Hant':meaning},chars:[]},ui,{compact:true,size:138,hideHeader:true,autoQuiz:true}));return box;
  }
  function originWordExampleNode(v,ou,ui,lesson){
    const ex=v?.example;if(!ex||!ex.zh)return null;const card=document.createElement('section');card.className='origin-word-example';card.innerHTML=`<div class="origin-word-example-label">💬 ${ou.wordExample}</div><div class="origin-word-example-zh">${ex.zh}</div><div class="origin-word-example-pinyin">${ex.p||''}</div><div class="origin-word-example-meaning">${pick(ex.m)}</div>`;const actions=document.createElement('div');actions.className='origin-word-example-actions';actions.append(audioButtons(ex.zh,ui,'sentence'),pronunciationTestNode(ex.zh,ex.p||'',ui,{key:`origin-${lesson.id}`},{sentence:true,compact:true}));card.append(actions);return card;
  }
  function originVocabSlide(lesson,ou,ui,state,onState){
    const slide=document.createElement('section');slide.className='origin-slide origin-vocab-slide';const list=lesson.vocab||[];let i=Math.max(0,Math.min(Number(state.vocabIndex)||0,Math.max(0,list.length-1)));const shell=document.createElement('div');
    const draw=()=>{shell.innerHTML='';const v=list[i];if(!v){shell.textContent='';return;}const head=document.createElement('div');head.className='origin-slide-heading origin-slide-heading-compact';head.textContent=`${ou.step3} · ${i+1}/${list.length}`;const card=document.createElement('article');card.className='origin-focus-word origin-focus-word-compact';const top=document.createElement('div');top.className='origin-word-top';const summary=document.createElement('div');summary.className='origin-word-summary';summary.innerHTML=`<div class="origin-focus-word-hanzi">${v.h}</div><div><strong>${v.p}</strong><span>${pick(v.m)}</span></div>`;top.append(summary,pinyinHintNode(v.p));const main=document.createElement('div');main.className='origin-focus-word-main';const formation=originFormationNode(v,ou);if(formation)main.append(formation);const ex=originWordExampleNode(v,ou,ui,lesson);if(ex)main.append(ex);const practice=document.createElement('div');practice.className='origin-focus-word-practice';const actions=document.createElement('div');actions.className='origin-word-actions';actions.append(audioButtons(v.h,ui,'word'),pronunciationTestNode(v.h,v.p,ui,{key:`origin-${lesson.id}`},{compact:true}));practice.append(actions,originOpenWriting(v.h,v.p,pick(v.m),lesson,ui,ou));card.append(top,main,practice);const nav=document.createElement('div');nav.className='origin-mini-nav origin-mini-nav-compact';const prev=document.createElement('button');prev.type='button';prev.textContent=`← ${ou.vocabPrev}`;prev.disabled=i===0;const count=document.createElement('b');count.textContent=`${i+1}/${list.length}`;const next=document.createElement('button');next.type='button';next.textContent=`${ou.vocabNext} →`;next.disabled=i>=list.length-1;prev.addEventListener('click',()=>{i--;state.vocabIndex=i;onState();draw();});next.addEventListener('click',()=>{i++;state.vocabIndex=i;onState();draw();});nav.append(prev,count,next);shell.append(head,card,nav);};draw();slide.append(shell);return slide;
  }
  function originExampleSlide(lesson,ou,ui,state,onState){
    const slide=document.createElement('section');slide.className='origin-slide';const list=lesson.examples||[];let i=Math.max(0,Math.min(Number(state.exampleIndex)||0,Math.max(0,list.length-1)));const shell=document.createElement('div');
    const draw=()=>{shell.innerHTML='';const ex=list[i];if(!ex)return;const head=document.createElement('div');head.className='origin-slide-heading';head.textContent=`${ou.step4} · ${i+1}/${list.length}`;const card=document.createElement('article');card.className='origin-example-focus';card.innerHTML=`<div class="origin-example-zh">${ex.zh}</div><div class="origin-example-pinyin">${ex.p}</div><div class="origin-example-meaning">${pick(ex.m)}</div>`;card.append(audioButtons(ex.zh,ui,'sentence'),pronunciationTestNode(ex.zh,ex.p,ui,{key:`origin-${lesson.id}`},{sentence:true,compact:true}));const nav=document.createElement('div');nav.className='origin-mini-nav';const prev=document.createElement('button');prev.type='button';prev.textContent=`← ${ou.sentencePrev}`;prev.disabled=i===0;const count=document.createElement('b');count.textContent=`${i+1}/${list.length}`;const next=document.createElement('button');next.type='button';next.textContent=`${ou.sentenceNext} →`;next.disabled=i>=list.length-1;prev.addEventListener('click',()=>{i--;state.exampleIndex=i;onState();draw();});next.addEventListener('click',()=>{i++;state.exampleIndex=i;onState();draw();});nav.append(prev,count,next);shell.append(head,card,nav);};draw();slide.append(shell);return slide;
  }
  function originPracticeSlide(lesson,ou,ui){
    const slide=document.createElement('section');slide.className='origin-slide origin-final-practice';const head=document.createElement('div');head.className='origin-slide-heading origin-slide-heading-compact';head.textContent=ou.step5;const layout=document.createElement('div');layout.className='origin-final-practice-layout';const hero=document.createElement('div');hero.className='origin-practice-hero origin-practice-hero-compact';hero.innerHTML=`<div class="origin-practice-char">${lesson.char}</div><div><strong>${lesson.pinyin}</strong><span>${pick(lesson.meaning)}</span></div>`;hero.append(audioButtons(lesson.char,ui,'word'),pinyinHintNode(lesson.pinyin),pronunciationTestNode(lesson.char,lesson.pinyin,ui,{key:`origin-${lesson.id}`},{compact:true}));layout.append(hero,originOpenWriting(lesson.char,lesson.pinyin,pick(lesson.meaning),lesson,ui,ou));slide.append(head,layout);return slide;
  }
  function renderOrigins(root,ui,query=''){
    root.innerHTML='';const ou=ORIGIN_UI[getLang()]||ORIGIN_UI.vi;
    if(!originDataLoaded){const err=document.createElement('div');err.className='rad-learning-note';err.textContent=`${ou.mode}: ${originDataError||'data unavailable'}`;root.append(err);return;}
    let list=(originData.lessons||[]).filter(l=>!query||originSearchText(l).includes(query));if(!list.length){const empty=document.createElement('div');empty.className='rad-learning-note';empty.textContent=getLang()==='en'?'No matching character.':getLang()==='zh-Hant'?'找不到符合的漢字。':'Không tìm thấy chữ phù hợp.';root.append(empty);return;}
    const state=loadOriginState();let index=Math.max(0,Math.min(Number(state.index)||0,list.length-1));if(state.lessonId){const found=list.findIndex(l=>l.id===state.lessonId);if(found>=0)index=found;}let step=Math.max(0,Math.min(Number(state.step)||0,4));let done=new Set(Array.isArray(state.done)?state.done:[]);state.vocabIndex=Number(state.vocabIndex)||0;state.exampleIndex=Number(state.exampleIndex)||0;
    const note=document.createElement('div');note.className='origin-source-note';note.innerHTML=`<strong>🖼 ${ou.mode}</strong><span>${ou.classStyle}</span><small>${pick(originData.sourceNote)}</small>`;root.append(note);
    const picker=document.createElement('div');picker.className='origin-character-picker';const pickLabel=document.createElement('span');pickLabel.textContent=`${ou.jump}:`;picker.append(pickLabel);list.forEach((l,i)=>{const b=document.createElement('button');b.type='button';b.textContent=l.char;b.classList.toggle('is-active',i===index);b.classList.toggle('is-done',done.has(l.id));b.addEventListener('click',()=>{index=i;step=0;state.vocabIndex=0;state.exampleIndex=0;persist();draw();});picker.append(b);});root.append(picker);
    const player=document.createElement('section');player.className='origin-player card';const head=document.createElement('div');head.className='origin-player-head';const title=document.createElement('div');const counter=document.createElement('div');counter.className='origin-player-counter';head.append(title,counter);const progress=document.createElement('div');progress.className='origin-step-progress';for(let i=0;i<5;i++){const d=document.createElement('i');progress.append(d);}const stage=document.createElement('div');stage.className='origin-player-stage';const nav=document.createElement('div');nav.className='origin-player-nav';const prev=document.createElement('button');prev.type='button';const reset=document.createElement('button');reset.type='button';reset.textContent=`↺ ${ou.reset}`;const next=document.createElement('button');next.type='button';next.className='primary';nav.append(prev,reset,next);player.append(head,progress,stage,nav);root.append(player);
    // Keep the learning player inside the *visible* part of the current device viewport.
    // This prevents the bottom navigation from falling below the screen on laptops/iPad/iPhone.
    if(typeof window.__tocflOriginFitCleanup==='function')window.__tocflOriginFitCleanup();
    let originFitRaf=0;
    const fitOriginPlayer=()=>{cancelAnimationFrame(originFitRaf);originFitRaf=requestAnimationFrame(()=>{const vv=window.visualViewport;const vh=Math.max(320,Math.floor(vv?.height||window.innerHeight||720));const rect=player.getBoundingClientRect();let available=Math.floor(vh-Math.max(0,rect.top)-10);if(rect.top>=vh-40)available=vh-16;available=Math.max(205,Math.min(720,available));player.style.setProperty('--origin-fit-height',`${available}px`);});};
    const originViewport=window.visualViewport;window.addEventListener('resize',fitOriginPlayer,{passive:true});window.addEventListener('orientationchange',fitOriginPlayer,{passive:true});originViewport?.addEventListener('resize',fitOriginPlayer,{passive:true});
    window.__tocflOriginFitCleanup=()=>{window.removeEventListener('resize',fitOriginPlayer);window.removeEventListener('orientationchange',fitOriginPlayer);originViewport?.removeEventListener('resize',fitOriginPlayer);cancelAnimationFrame(originFitRaf);};
    requestAnimationFrame(fitOriginPlayer);
    const persist=()=>{const lesson=list[index];saveOriginState({index,lessonId:lesson?.id||'',step,done:[...done],vocabIndex:Number(state.vocabIndex)||0,exampleIndex:Number(state.exampleIndex)||0});};
    const draw=()=>{const lesson=list[index];if(!lesson)return;picker.querySelectorAll('button').forEach((b,i)=>{b.classList.toggle('is-active',i===index);b.classList.toggle('is-done',done.has(list[i]?.id));});title.innerHTML=`<span class="origin-category-badge">${originCategoryText(lesson.category,ou)}</span><h3>${lesson.char} <small>${lesson.pinyin} · ${pick(lesson.meaning)}</small></h3>`;counter.innerHTML=`<b>${index+1}/${list.length}</b><small>✓ ${done.size}/${list.length}</small>`;progress.querySelectorAll('i').forEach((el,i)=>el.classList.toggle('is-active',i<=step));stage.innerHTML='';const onState=()=>persist();if(step===0)stage.append(originVisualSlide(lesson,ou));else if(step===1)stage.append(originExplanationSlide(lesson,ou));else if(step===2)stage.append(originVocabSlide(lesson,ou,ui,state,onState));else if(step===3)stage.append(originExampleSlide(lesson,ou,ui,state,onState));else stage.append(originPracticeSlide(lesson,ou,ui));prev.disabled=step===0&&index===0;prev.textContent=step>0?`← ${ou.prevStep}`:`← ${ui.previous}`;next.textContent=step<4?`${ou.nextStep} →`:(done.has(lesson.id)?`${ui.next} →`:`✓ ${ou.nextChar} →`);next.disabled=step===4&&index===list.length-1&&done.has(lesson.id);persist();applyFontScale();const activePicker=picker.querySelectorAll('button')[index];activePicker?.scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'});requestAnimationFrame(fitOriginPlayer);};
    prev.addEventListener('click',()=>{if(step>0)step--;else if(index>0){index--;step=4;}draw();player.scrollIntoView({behavior:'smooth',block:'start'});});
    next.addEventListener('click',()=>{const lesson=list[index];if(step<4)step++;else{done.add(lesson.id);if(index<list.length-1){index++;step=0;state.vocabIndex=0;state.exampleIndex=0;}}draw();player.scrollIntoView({behavior:'smooth',block:'start'});});
    reset.addEventListener('click',()=>{index=0;step=0;done=new Set();state.vocabIndex=0;state.exampleIndex=0;draw();});draw();
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

  const RADICAL_MODE_KEY='tocfl-radical-mode-v1';
  let mode=(()=>{try{const m=localStorage.getItem(RADICAL_MODE_KEY);return ['origins','semantic','phonetic','pinyin'].includes(m)?m:'origins';}catch{return 'origins';}})(); let query='';
  function render(){
    const app=$('radicalsApp');if(!app)return;const lang=getLang();const ui=UI[lang]||UI.vi;
    const tab=$('radicalsTabLabel');if(tab)tab.textContent=ui.tab;
    app.innerHTML=`<section class="rad-hero card"><div><div class="eyebrow">CHARACTER MAP</div><h2>${ui.title}</h2><p>${ui.sub}</p></div><div class="rad-hero-model"><span>義</span><b>+</b><span>音</span><b>→</b><strong>字</strong></div></section><section class="rad-controls card"><div class="rad-mode-tabs"><button data-rad-mode="origins">🖼 ${ORIGIN_UI[lang]?.mode||ORIGIN_UI.vi.mode}</button><button data-rad-mode="semantic">🧩 ${ui.semantic}</button><button data-rad-mode="phonetic">🔊 ${ui.phonetic}</button><button data-rad-mode="pinyin">🇻🇳 ${ui.pinyin}</button></div><div class="rad-font-controls" aria-label="${ui.fontSize}"><span>${ui.fontSize}</span><button id="radFontMinus" type="button" title="${ui.fontSmaller}">A−</button><strong id="radFontScaleValue">100%</strong><button id="radFontPlus" type="button" title="${ui.fontLarger}">A+</button><button id="radFontReset" type="button" title="${ui.fontReset}">↺</button></div><input id="radicalSearch" type="search" placeholder="${ui.search}" value="${query.replace(/"/g,'&quot;')}" /></section><div id="radicalsContent"></div>`;
    app.querySelectorAll('[data-rad-mode]').forEach(b=>{b.classList.toggle('is-active',b.dataset.radMode===mode);b.addEventListener('click',()=>{mode=b.dataset.radMode;saveTextState(RADICAL_MODE_KEY,mode);renderContent();});});
    $('radFontMinus')?.addEventListener('click',()=>setFontScale(getFontScale()-.1));
    $('radFontPlus')?.addEventListener('click',()=>setFontScale(getFontScale()+.1));
    $('radFontReset')?.addEventListener('click',()=>setFontScale(1));
    $('radicalSearch')?.addEventListener('input',e=>{query=String(e.target.value||'').trim().toLowerCase();renderContent();});
    renderContent();applyFontScale();
  }
  function renderContent(){const root=$('radicalsContent');if(!root)return;const ui=UI[getLang()]||UI.vi;document.querySelectorAll('[data-rad-mode]').forEach(b=>b.classList.toggle('is-active',b.dataset.radMode===mode));if(mode==='origins')renderOrigins(root,ui,query);else if(mode==='semantic')renderSemantic(root,ui,query);else if(mode==='phonetic')renderFamilies(root,ui,query);else renderPinyin(root,ui,query);applyFontScale();}
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
  document.addEventListener('tocfl:radical-cloud-applied',()=>{
    selectedRadicalKey=localStorage.getItem(SELECTED_RADICAL_KEY)||radicals[0]?.key||'person';
    try{const m=localStorage.getItem(RADICAL_MODE_KEY);if(['origins','semantic','phonetic','pinyin'].includes(m))mode=m;}catch{}
    if(radicalDataLoaded)render();
    applyFontScale();
  });
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initRadicals);else initRadicals();
})();
