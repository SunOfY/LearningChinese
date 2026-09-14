'use strict';

(function(){
  const $=id=>document.getElementById(id);
  const getLang=()=>window.TOCFLApp?.getLanguage?.()||localStorage.getItem('tocfl-a1-ui-language-v2')||'vi';
  const pick=(obj,lang=getLang())=>obj?.[lang]??obj?.vi??obj?.en??'';

  const UI={
    vi:{tab:'Bộ thủ',title:'Bộ thủ & Họ chữ',sub:'Học từ cấu tạo: phần gợi nghĩa + phần gợi âm → chữ → từ → câu.',semantic:'Bộ gợi nghĩa',phonetic:'Họ âm',pinyin:'Pinyin gần âm Việt',search:'Tìm bộ, chữ, pinyin hoặc nghĩa…',listen:'Nghe',listenWord:'Nghe chữ',listenSentence:'Nghe câu',slow:'Chậm',initialTitle:'Thanh mẫu (âm đầu)',finalTitle:'Vận mẫu (phần vần)',specialTitle:'Quy tắc đặc biệt dễ nhầm',demoTitle:'Thử nhanh một Pinyin',demoHint:'Nhập ví dụ: qǐng, xué, lǜ, zhōngwén…',analyze:'Phân tích',why:'Vì sao dễ nhớ?',structure:'Cấu tạo',example:'Ví dụ',note:'Lưu ý: đây là cách phân tích để học và ghi nhớ. Không phải mọi chữ đều “sinh ra” trực tiếp từ bộ theo cách hiện đại; nhiều chữ là hình thanh, trong đó một phần gợi nghĩa và một phần gợi âm.',soundNote:'Gợi âm tiếng Việt chỉ là cầu nối ban đầu. Hãy ưu tiên nghe giọng zh-TW vì nhiều âm Mandarin không có bản tương đương chính xác trong tiếng Việt.',familyNote:'Họ âm cho thấy cùng một thành phần có thể lặp lại để gợi cách đọc, còn bộ bên trái/bên dưới thường đổi để gợi nghĩa.',all:'Tất cả'},
    en:{tab:'Components',title:'Radicals & Character Families',sub:'Learn structure: semantic clue + sound clue → character → word → sentence.',semantic:'Semantic radicals',phonetic:'Sound families',pinyin:'Vietnamese sound bridge',search:'Search radical, character, pinyin or meaning…',listen:'Listen',listenWord:'Character',listenSentence:'Sentence',slow:'Slow',initialTitle:'Initials',finalTitle:'Finals',specialTitle:'Easy-to-miss spelling rules',demoTitle:'Try a Pinyin',demoHint:'Type e.g. qǐng, xué, lǜ, zhōngwén…',analyze:'Analyze',why:'Why it helps',structure:'Structure',example:'Example',note:'This is a learning-oriented structural analysis. Not every character literally “grew” from its radical in a modern step-by-step way; many characters combine a semantic component with a phonetic component.',soundNote:'Vietnamese approximations are only a bridge. Prefer the zh-TW audio because many Mandarin sounds do not have exact Vietnamese equivalents.',familyNote:'Sound families show how one component can hint at pronunciation while another component changes the semantic field.',all:'All'},
    'zh-Hant':{tab:'部件',title:'部首・部件與字族',sub:'從結構學習：義符 + 聲符 → 字 → 詞 → 句子。',semantic:'義符部件',phonetic:'聲符字族',pinyin:'越南語近似音提示',search:'搜尋部件、字、拼音或意思…',listen:'聽',listenWord:'聽單字',listenSentence:'聽例句',slow:'慢速',initialTitle:'聲母',finalTitle:'韻母',specialTitle:'容易混淆的拼音規則',demoTitle:'快速分析拼音',demoHint:'例如輸入：qǐng、xué、lǜ、zhōngwén…',analyze:'分析',why:'為什麼好記？',structure:'結構',example:'例句',note:'這裡以學習與記憶為目的分析字形。不是所有漢字都能用現代「加一個部首就產生新字」來解釋；很多漢字屬於形聲結構，由義符提示意思、聲符提示讀音。',soundNote:'越南語近似音只作為入門橋樑。許多華語語音沒有完全相同的越南語對應音，請以 zh-TW 音檔為準。',familyNote:'聲符字族可以看出同一聲符如何提示讀音，而其他部件改變字義範圍。',all:'全部'}
  };

  const radicals=[
    {key:'person',radical:'人 / 亻',pinyin:'rén',icon:'🧍',meaning:{vi:'người',en:'person', 'zh-Hant':'人'},origin:{vi:'人 vốn mô phỏng dáng người đứng. Khi đứng bên trái chữ khác thường đổi thành 亻.',en:'人 originally resembles a standing person; as a left-side component it often becomes 亻.','zh-Hant':'「人」原本像站立的人形；放在左側時常寫成「亻」。'}, chars:[
      {h:'休',p:'xiū',m:{vi:'nghỉ',en:'rest','zh-Hant':'休息'},s:'亻 + 木',w:{vi:'Người (亻) tựa vào cây (木) → một hình ảnh rất dễ nhớ cho “nghỉ”. Đây là kiểu hội ý trực quan.',en:'A person (亻) by a tree (木) gives a memorable image for “rest”; this is an associative structure.','zh-Hant':'人（亻）靠著木，容易聯想到「休息」，屬於很直觀的會意記憶。'},ex:['我休息一下。','Wǒ xiūxi yíxià.',{vi:'Tôi nghỉ một chút.',en:'I will rest for a moment.','zh-Hant':'我休息一下。'}]},
      {h:'住',p:'zhù',m:{vi:'ở, cư trú',en:'live; reside','zh-Hant':'居住'},s:'亻 + 主',w:{vi:'亻 đưa chữ vào nhóm liên quan tới người; 主 từng đóng vai trò gợi âm. Vì vậy 住 gắn với “người ở/cư trú”.',en:'亻 places the character in the human domain; 主 historically contributes a sound clue.','zh-Hant':'亻提示與人有關；主在歷史上兼具聲音提示，因此「住」表示人居住。'},ex:['我住在高雄。','Wǒ zhù zài Gāoxióng.',{vi:'Tôi sống ở Cao Hùng.',en:'I live in Kaohsiung.','zh-Hant':'我住在高雄。'}]},
      {h:'你',p:'nǐ',m:{vi:'bạn',en:'you','zh-Hant':'你'},s:'亻 + 尔',w:{vi:'亻 cho biết đây là chữ chỉ người. Phần 尔 là thành phần lịch sử của chữ; âm hiện đại không còn khớp hoàn toàn nên đừng ép nhớ bằng âm.',en:'亻 signals a person-related character. The right component is historical; modern pronunciation is no longer a neat sound match.','zh-Hant':'亻提示與人有關；右側是歷史部件，現代讀音已不是完全規則的聲符對應。'},ex:['你好！','Nǐ hǎo!',{vi:'Xin chào!',en:'Hello!','zh-Hant':'你好！'}]}
    ]},
    {key:'mouth',radical:'口',pinyin:'kǒu',icon:'👄',meaning:{vi:'miệng, nói/ăn/uống',en:'mouth; speech/eating','zh-Hant':'口、說話、飲食'},origin:{vi:'口 giống hình cái miệng/hốc mở; thường xuất hiện ở chữ liên quan nói, âm thanh, ăn uống.',en:'口 resembles an opening or mouth and often appears in speech, sound, eating and drinking characters.','zh-Hant':'「口」像開口，常出現在說話、聲音、飲食相關的字。'},chars:[
      {h:'嗎',p:'ma',m:{vi:'trợ từ hỏi',en:'question particle','zh-Hant':'疑問助詞'},s:'口 + 馬',w:{vi:'口 gợi “lời nói”; 馬 mǎ gợi âm ma. Đây là ví dụ rất rõ của chữ hình thanh.',en:'口 gives the speech meaning; 馬 mǎ gives the sound clue ma—a clear phonosemantic example.','zh-Hant':'口提示語言；馬 mǎ 提示 ma 的讀音，是很典型的形聲字。'},ex:['你好嗎？','Nǐ hǎo ma?',{vi:'Bạn khỏe không?',en:'How are you?','zh-Hant':'你好嗎？'}]},
      {h:'唱',p:'chàng',m:{vi:'hát',en:'sing','zh-Hant':'唱歌'},s:'口 + 昌',w:{vi:'口 gợi hoạt động bằng miệng; 昌 chāng gợi âm gần chàng.',en:'口 points to a mouth action; 昌 chāng gives a pronunciation clue close to chàng.','zh-Hant':'口表示用嘴發聲；昌 chāng 提示「唱 chàng」的讀音。'},ex:['她喜歡唱歌。','Tā xǐhuān chànggē.',{vi:'Cô ấy thích hát.',en:'She likes singing.','zh-Hant':'她喜歡唱歌。'}]},
      {h:'喝',p:'hē',m:{vi:'uống',en:'drink','zh-Hant':'喝'},s:'口 + 曷',w:{vi:'口 liên quan miệng/uống; 曷 là phần gợi âm trong lịch sử. Nhìn 口 trước sẽ giúp đoán nhóm nghĩa.',en:'口 links the character to mouth/drinking; 曷 historically contributes the sound.','zh-Hant':'口提示嘴巴／飲用；曷在歷史上提供聲音線索。'},ex:['我喝水。','Wǒ hē shuǐ.',{vi:'Tôi uống nước.',en:'I drink water.','zh-Hant':'我喝水。'}]}
    ]},
    {key:'female',radical:'女',pinyin:'nǚ',icon:'👩',meaning:{vi:'nữ, phụ nữ',en:'female; woman','zh-Hant':'女、女性'},origin:{vi:'女 là chữ tượng hình cổ về người nữ; thường gợi nhóm nghĩa liên quan nữ giới/gia đình.',en:'女 is an old pictographic character associated with women and often marks female/family meanings.','zh-Hant':'「女」是古老的象形字，常提示女性或家庭相關意思。'},chars:[
      {h:'媽',p:'mā',m:{vi:'mẹ',en:'mother','zh-Hant':'媽媽'},s:'女 + 馬',w:{vi:'女 gợi nghĩa “nữ”; 馬 mǎ gợi âm mā. Âm giống nhau phần “ma”, chỉ khác thanh.',en:'女 supplies the female meaning; 馬 mǎ supplies the ma sound, with a different tone.','zh-Hant':'女提示女性；馬 mǎ 提示 ma 的音，聲調不同。'},ex:['我媽媽很好。','Wǒ māma hěn hǎo.',{vi:'Mẹ tôi rất tốt.',en:'My mother is very kind.','zh-Hant':'我媽媽很好。'}]},
      {h:'好',p:'hǎo',m:{vi:'tốt',en:'good','zh-Hant':'好'},s:'女 + 子',w:{vi:'女 + 子 thường được dùng như hình ảnh ghi nhớ “mẹ/con, gia đình → tốt”. Hãy xem đây là mẹo hình dung, không nên coi là giải thích từ nguyên duy nhất.',en:'女 + 子 is often used as a mnemonic image for “good.” Treat it as a memory aid rather than the only etymological explanation.','zh-Hant':'女＋子常被用作「好」的記憶圖像；較適合當學習提示，而不是唯一的字源解釋。'},ex:['很好！','Hěn hǎo!',{vi:'Rất tốt!',en:'Very good!','zh-Hant':'很好！'}]},
      {h:'她',p:'tā',m:{vi:'cô ấy',en:'she','zh-Hant':'她'},s:'女 + 也',w:{vi:'女 làm rõ đây là đại từ chỉ nữ. Chữ 她 là chữ tương đối mới trong lịch sử chữ viết hiện đại.',en:'女 marks the female referent. 她 is relatively recent in the history of modern written Chinese.','zh-Hant':'女提示女性指稱；「她」在現代書面漢語歷史中是較新的字。'},ex:['她是老師。','Tā shì lǎoshī.',{vi:'Cô ấy là giáo viên.',en:'She is a teacher.','zh-Hant':'她是老師。'}]}
    ]},
    {key:'water',radical:'水 / 氵',pinyin:'shuǐ',icon:'💧',meaning:{vi:'nước, chất lỏng',en:'water; liquid','zh-Hant':'水、液體'},origin:{vi:'水 là hình nước chảy; khi làm bộ bên trái thường biến thành 氵.',en:'水 depicts flowing water; as a left-side component it commonly becomes 氵.','zh-Hant':'「水」像流水；作左側部件時常寫成「氵」。'},chars:[
      {h:'清',p:'qīng',m:{vi:'trong, sạch',en:'clear; clean','zh-Hant':'清、清澈'},s:'氵 + 青',w:{vi:'氵 gợi nước/chất lỏng; 青 qīng gợi đúng âm qīng. Vì thế rất dễ nhớ: “nước + qīng → 清 qīng”.',en:'氵 supplies the water meaning; 青 qīng gives the same sound qīng.','zh-Hant':'氵提示水；青 qīng 同時提示 qīng 的讀音，因此很好記。'},ex:['這裡的水很清。','Zhèlǐ de shuǐ hěn qīng.',{vi:'Nước ở đây rất trong.',en:'The water here is very clear.','zh-Hant':'這裡的水很清。'}]},
      {h:'河',p:'hé',m:{vi:'sông',en:'river','zh-Hant':'河'},s:'氵 + 可',w:{vi:'氵 đưa chữ vào nhóm “nước”; 可 là phần gợi âm lịch sử. Âm hiện đại hé/kě đã lệch nên hãy ưu tiên nhớ nghĩa qua 氵.',en:'氵 puts the character in the water domain; 可 is a historical phonetic component whose modern sound has shifted.','zh-Hant':'氵提示水域；可是歷史聲符，現代 hé／kě 的讀音已產生差異。'},ex:['這條河很長。','Zhè tiáo hé hěn cháng.',{vi:'Con sông này rất dài.',en:'This river is long.','zh-Hant':'這條河很長。'}]},
      {h:'海',p:'hǎi',m:{vi:'biển',en:'sea','zh-Hant':'海'},s:'氵 + 每',w:{vi:'氵 gợi nước; 每 là phần gợi âm lịch sử. Khi thấy 氵, bạn có thể đoán chữ thường liên quan nước/chất lỏng.',en:'氵 gives the water meaning; 每 is a historical sound component.','zh-Hant':'氵提示水；每是歷史聲符。看到氵時，可以先猜與水或液體有關。'},ex:['我喜歡海。','Wǒ xǐhuān hǎi.',{vi:'Tôi thích biển.',en:'I like the sea.','zh-Hant':'我喜歡海。'}]},
      {h:'洗',p:'xǐ',m:{vi:'rửa',en:'wash','zh-Hant':'洗'},s:'氵 + 先',w:{vi:'氵 gợi việc dùng nước; 先 là phần gợi âm lịch sử. Nghĩa “rửa” rất hợp với bộ nước.',en:'氵 suggests an action involving water; 先 is a historical phonetic component.','zh-Hant':'氵提示用水的動作；先是歷史聲符。「洗」和水的關係很直觀。'},ex:['吃飯前要洗手。','Chīfàn qián yào xǐshǒu.',{vi:'Trước khi ăn phải rửa tay.',en:'Wash your hands before eating.','zh-Hant':'吃飯前要洗手。'}]}
    ]},
    {key:'heart',radical:'心 / 忄',pinyin:'xīn',icon:'❤️',meaning:{vi:'tim, cảm xúc, trạng thái tâm lý',en:'heart; emotion','zh-Hant':'心、情緒'},origin:{vi:'心 là tim; khi đứng bên trái thường thành 忄. Rất nhiều chữ về cảm xúc/trạng thái tinh thần có bộ này.',en:'心 means heart; on the left it often becomes 忄 and appears in emotion/mental-state characters.','zh-Hant':'「心」表示心；在左邊常寫成「忄」，常見於情緒與心理狀態的字。'},chars:[
      {h:'情',p:'qíng',m:{vi:'tình cảm, tình trạng',en:'feeling; situation','zh-Hant':'情、感情'},s:'忄 + 青',w:{vi:'忄 gợi cảm xúc; 青 qīng gợi âm qíng. Đây là cặp rất đẹp để nhận ra mô hình “nghĩa + âm”.',en:'忄 gives the emotion meaning; 青 qīng hints at qíng.','zh-Hant':'忄提示情緒；青 qīng 提示 qíng 的讀音，是典型「義符＋聲符」。'},ex:['我今天心情很好。','Wǒ jīntiān xīnqíng hěn hǎo.',{vi:'Hôm nay tâm trạng tôi rất tốt.',en:'I am in a very good mood today.','zh-Hant':'我今天心情很好。'}]},
      {h:'忙',p:'máng',m:{vi:'bận',en:'busy','zh-Hant':'忙'},s:'忄 + 亡',w:{vi:'忄 cho biết trạng thái tâm trí; 亡 wáng gợi âm gần máng (vần -ang giống nhau).',en:'忄 signals a mental state; 亡 wáng gives a sound clue close to máng.','zh-Hant':'忄提示心理狀態；亡 wáng 提供接近 máng 的聲音線索。'},ex:['我今天很忙。','Wǒ jīntiān hěn máng.',{vi:'Hôm nay tôi rất bận.',en:'I am very busy today.','zh-Hant':'我今天很忙。'}]},
      {h:'想',p:'xiǎng',m:{vi:'nghĩ, muốn',en:'think; want','zh-Hant':'想'},s:'相 + 心',w:{vi:'心 nằm bên dưới nhắc tới hoạt động trong tâm trí; 相 xiāng góp phần gợi âm. “Trong tim/tâm trí có hình ảnh → nghĩ”.',en:'心 underneath points to the mind; 相 xiāng contributes a sound clue.','zh-Hant':'下方的心提示心理活動；相 xiāng 提供聲音線索。'},ex:['我想學中文。','Wǒ xiǎng xué Zhōngwén.',{vi:'Tôi muốn học tiếng Trung.',en:'I want to learn Chinese.','zh-Hant':'我想學中文。'}]}
    ]},
    {key:'speech',radical:'言 / 訁',pinyin:'yán',icon:'💬',meaning:{vi:'lời nói, ngôn ngữ',en:'speech; language','zh-Hant':'言語、說話'},origin:{vi:'言 liên quan lời nói. Trong chữ Phồn thể, dạng bộ bên trái thường là 訁.',en:'言 relates to speech; in Traditional Chinese its left-side form is often 訁.','zh-Hant':'「言」與說話有關；繁體字中作左側部件常寫成「訁」。'},chars:[
      {h:'請',p:'qǐng',m:{vi:'mời, xin vui lòng',en:'please; invite','zh-Hant':'請'},s:'訁 + 青',w:{vi:'訁 gợi lời nói/yêu cầu; 青 qīng gợi âm qǐng. Cùng 青 nhưng đổi bộ → đổi nhóm nghĩa.',en:'訁 points to speech/request; 青 qīng gives the sound clue qǐng.','zh-Hant':'訁提示說話／請求；青 qīng 提示 qǐng。換義符，意思也跟著改變。'},ex:['請坐。','Qǐng zuò.',{vi:'Mời ngồi.',en:'Please sit.','zh-Hant':'請坐。'}]},
      {h:'訪',p:'fǎng',m:{vi:'thăm, phỏng vấn',en:'visit; interview','zh-Hant':'訪問'},s:'訁 + 方',w:{vi:'訁 gợi giao tiếp; 方 fāng gợi âm fǎng. Từ 訪問 vì thế rất dễ nối với ý “đến và hỏi/thăm”.',en:'訁 supplies the communication meaning; 方 fāng hints at fǎng.','zh-Hant':'訁提示溝通；方 fāng 提示 fǎng 的音。'},ex:['我去訪問老師。','Wǒ qù fǎngwèn lǎoshī.',{vi:'Tôi đi gặp/phỏng vấn giáo viên.',en:'I am going to interview the teacher.','zh-Hant':'我去訪問老師。'}]},
      {h:'語',p:'yǔ',m:{vi:'ngôn ngữ, lời nói',en:'language; speech','zh-Hant':'語言'},s:'訁 + 吾',w:{vi:'訁 cho biết liên quan ngôn ngữ; 吾 là phần gợi âm lịch sử. Từ 語言 = ngôn ngữ.',en:'訁 marks language/speech; 吾 is a historical phonetic component.','zh-Hant':'訁提示語言；吾是歷史聲符。「語言」就是 language。'},ex:['我會說越南語。','Wǒ huì shuō Yuènányǔ.',{vi:'Tôi biết nói tiếng Việt.',en:'I can speak Vietnamese.','zh-Hant':'我會說越南語。'}]}
    ]},
    {key:'hand',radical:'手 / 扌',pinyin:'shǒu',icon:'✋',meaning:{vi:'tay, động tác bằng tay',en:'hand; hand action','zh-Hant':'手、手部動作'},origin:{vi:'手 nghĩa là tay; khi ở bên trái thường biến thành 扌. Nhìn thấy 扌 thường có thể đoán một động tác bằng tay.',en:'手 means hand; on the left it often becomes 扌 and commonly marks hand actions.','zh-Hant':'「手」表示手；在左邊常寫成「扌」，常提示手部動作。'},chars:[
      {h:'抱',p:'bào',m:{vi:'ôm',en:'hug; hold','zh-Hant':'抱'},s:'扌 + 包',w:{vi:'扌 gợi động tác tay; 包 bāo gợi âm bào. “Dùng tay ôm/bọc lấy” là hình dung rất tự nhiên.',en:'扌 gives the hand-action meaning; 包 bāo hints at bào.','zh-Hant':'扌提示手部動作；包 bāo 提示 bào 的音，可聯想到用手抱住。'},ex:['媽媽抱小孩。','Māma bào xiǎohái.',{vi:'Mẹ ôm em bé.',en:'Mom hugs the child.','zh-Hant':'媽媽抱小孩。'}]},
      {h:'打',p:'dǎ',m:{vi:'đánh; gọi (điện thoại)',en:'hit; make (a call)','zh-Hant':'打'},s:'扌 + 丁',w:{vi:'扌 cho biết động tác tay. 丁 là thành phần âm lịch sử; âm hiện đại không còn khớp rõ.',en:'扌 marks a hand action; 丁 is a historical sound component whose modern pronunciation no longer matches neatly.','zh-Hant':'扌提示手部動作；丁是歷史聲符，現代讀音已不完全對應。'},ex:['我打電話給你。','Wǒ dǎ diànhuà gěi nǐ.',{vi:'Tôi gọi điện cho bạn.',en:'I will call you.','zh-Hant':'我打電話給你。'}]},
      {h:'推',p:'tuī',m:{vi:'đẩy',en:'push','zh-Hant':'推'},s:'扌 + 隹',w:{vi:'扌 = động tác tay; 隹 là phần gợi âm lịch sử. Chỉ cần thấy 扌 là đã có manh mối “một hành động”.',en:'扌 signals a hand action; 隹 is a historical phonetic component.','zh-Hant':'扌提示手部動作；隹是歷史聲符。看到扌就先想到「動作」。'},ex:['請推門。','Qǐng tuī mén.',{vi:'Vui lòng đẩy cửa.',en:'Please push the door.','zh-Hant':'請推門。'}]}
    ]},
    {key:'food',radical:'食 / 飠',pinyin:'shí',icon:'🍚',meaning:{vi:'ăn, thức ăn',en:'food; eating','zh-Hant':'食、飲食'},origin:{vi:'食 liên quan ăn/uống; trong chữ Phồn thể ở bên trái thường viết 飠.',en:'食 relates to food/eating; in Traditional Chinese its left-side form is often 飠.','zh-Hant':'「食」與飲食有關；繁體字左側常寫成「飠」。'},chars:[
      {h:'飯',p:'fàn',m:{vi:'cơm, bữa ăn',en:'rice; meal','zh-Hant':'飯'},s:'飠 + 反',w:{vi:'飠 gợi thức ăn; 反 fǎn gợi âm fàn. Nghĩa nằm ở “đồ ăn”, âm nằm ở phần bên phải.',en:'飠 supplies the food meaning; 反 fǎn gives a sound clue for fàn.','zh-Hant':'飠提示食物；反 fǎn 提示 fàn 的音。'},ex:['我們一起吃飯。','Wǒmen yìqǐ chīfàn.',{vi:'Chúng ta cùng ăn cơm.',en:'Let us eat together.','zh-Hant':'我們一起吃飯。'}]},
      {h:'飽',p:'bǎo',m:{vi:'no',en:'full; satiated','zh-Hant':'飽'},s:'飠 + 包',w:{vi:'飠 gợi trạng thái sau khi ăn; 包 bāo gợi âm bǎo. Cùng họ âm 包 với 抱 bào và 跑 pǎo.',en:'飠 gives the food meaning; 包 bāo hints at bǎo. It belongs to the same sound family as 抱 bào and 跑 pǎo.','zh-Hant':'飠提示飲食；包 bāo 提示 bǎo，與抱 bào、跑 pǎo 同屬包聲字族。'},ex:['我吃飽了。','Wǒ chī bǎo le.',{vi:'Tôi ăn no rồi.',en:'I am full.','zh-Hant':'我吃飽了。'}]},
      {h:'餓',p:'è',m:{vi:'đói',en:'hungry','zh-Hant':'餓'},s:'飠 + 我',w:{vi:'飠 giúp đoán ngay chủ đề ăn uống; 我 là phần âm lịch sử. Đây là ví dụ tốt cho việc bộ thủ giúp đoán nghĩa dù âm đã biến đổi.',en:'飠 immediately points to food; 我 is a historical sound component.','zh-Hant':'飠讓你先猜到飲食語義；我是歷史聲符，現代音已變化。'},ex:['我餓了。','Wǒ è le.',{vi:'Tôi đói rồi.',en:'I am hungry.','zh-Hant':'我餓了。'}]}
    ]},
    {key:'wood',radical:'木',pinyin:'mù',icon:'🌳',meaning:{vi:'cây, gỗ; đồ bằng gỗ',en:'wood; tree','zh-Hant':'木、樹、木製物'},origin:{vi:'木 mô phỏng thân, cành và rễ cây. Nhiều chữ có 木 liên quan cây, gỗ hoặc đồ vật vốn làm bằng gỗ.',en:'木 depicts a tree trunk, branches and roots; many 木 characters relate to trees, wood or wooden objects.','zh-Hant':'「木」像樹幹、枝與根；很多含木的字與樹木、木材或木製物有關。'},chars:[
      {h:'林',p:'lín',m:{vi:'rừng',en:'woods; forest','zh-Hant':'林'},s:'木 + 木',w:{vi:'Hai cây 木 đứng cạnh nhau → nhiều cây → 林. Đây là kiểu hội ý rất dễ hình dung.',en:'Two 木 trees together suggest many trees → 林.','zh-Hant':'兩個木放在一起，表示很多樹 → 林，是很直觀的會意。'},ex:['前面有一片樹林。','Qiánmiàn yǒu yí piàn shùlín.',{vi:'Phía trước có một khu rừng.',en:'There is a forest ahead.','zh-Hant':'前面有一片樹林。'}]},
      {h:'森',p:'sēn',m:{vi:'rậm, rừng rậm',en:'dense forest','zh-Hant':'森'},s:'木 + 木 + 木',w:{vi:'Ba cây 木 → cảm giác còn nhiều và rậm hơn 林. Nhìn hình là có thể nhớ nghĩa.',en:'Three 木 trees intensify the image of a dense forest.','zh-Hant':'三個木讓「樹很多、很茂密」的感覺比林更強。'},ex:['森林裡很安靜。','Sēnlín lǐ hěn ānjìng.',{vi:'Trong rừng rất yên tĩnh.',en:'It is quiet in the forest.','zh-Hant':'森林裡很安靜。'}]},
      {h:'杯',p:'bēi',m:{vi:'cốc, ly',en:'cup','zh-Hant':'杯'},s:'木 + 不',w:{vi:'木 gợi đồ vật từng thường làm bằng gỗ; 不 là phần gợi âm lịch sử. Từ rất hay gặp: 一杯水.',en:'木 hints at an object historically made of wood; 不 is a historical sound component.','zh-Hant':'木提示早期常用木材製作的器物；不是歷史聲符。常見搭配：一杯水。'},ex:['我要一杯水。','Wǒ yào yì bēi shuǐ.',{vi:'Tôi muốn một cốc nước.',en:'I want a glass of water.','zh-Hant':'我要一杯水。'}]}
    ]},
    {key:'sun',radical:'日',pinyin:'rì',icon:'☀️',meaning:{vi:'mặt trời, ngày, thời gian',en:'sun; day; time','zh-Hant':'日、白天、時間'},origin:{vi:'日 vốn là hình mặt trời; vì ngày/thời gian gắn với mặt trời nên nhiều chữ thời gian có 日.',en:'日 depicts the sun, so many time/day-related characters contain it.','zh-Hant':'「日」原本表示太陽，因此許多和白天、時間有關的字含日。'},chars:[
      {h:'晴',p:'qíng',m:{vi:'trời quang',en:'clear/sunny weather','zh-Hant':'晴'},s:'日 + 青',w:{vi:'日 gợi mặt trời/thời tiết; 青 qīng gợi âm qíng. “Có mặt trời → trời quang” rất trực quan.',en:'日 gives the sun/weather meaning; 青 qīng hints at qíng.','zh-Hant':'日提示太陽／天氣；青 qīng 提示 qíng。'},ex:['今天是晴天。','Jīntiān shì qíngtiān.',{vi:'Hôm nay trời nắng/quang.',en:'It is sunny today.','zh-Hant':'今天是晴天。'}]},
      {h:'時',p:'shí',m:{vi:'thời gian, giờ',en:'time; hour','zh-Hant':'時間'},s:'日 + 寺',w:{vi:'日 gợi thời gian/ngày; 寺 là phần gợi âm lịch sử. Từ ghép quan trọng: 時間.',en:'日 points to time/day; 寺 is a historical phonetic component.','zh-Hant':'日提示時間；寺是歷史聲符。重要詞：時間。'},ex:['現在幾點？','Xiànzài jǐ diǎn?',{vi:'Bây giờ mấy giờ?',en:'What time is it now?','zh-Hant':'現在幾點？'}]},
      {h:'晚',p:'wǎn',m:{vi:'muộn, tối',en:'late; evening','zh-Hant':'晚、晚上'},s:'日 + 免',w:{vi:'日 gợi phần trong ngày; 免 là phần gợi âm lịch sử. 晚上 là “buổi tối”.',en:'日 points to a part of the day; 免 is a historical sound component.','zh-Hant':'日提示一天中的時間；免是歷史聲符。「晚上」就是 evening。'},ex:['晚上見！','Wǎnshàng jiàn!',{vi:'Tối gặp nhé!',en:'See you tonight!','zh-Hant':'晚上見！'}]}
    ]},
    {key:'fire',radical:'火 / 灬',pinyin:'huǒ',icon:'🔥',meaning:{vi:'lửa, nhiệt, nấu',en:'fire; heat; cooking','zh-Hant':'火、熱、烹調'},origin:{vi:'火 là lửa; khi nằm dưới một số chữ thường đổi thành 灬. Dạng này thường gợi nhiệt/nấu/cháy.',en:'火 means fire; at the bottom it often appears as 灬 and commonly signals heat/cooking/burning.','zh-Hant':'「火」表示火；在字下方常變成「灬」，常提示熱、烹調或燃燒。'},chars:[
      {h:'燈',p:'dēng',m:{vi:'đèn',en:'lamp; light','zh-Hant':'燈'},s:'火 + 登',w:{vi:'火 gợi ánh sáng/lửa; 登 dēng gợi đúng âm dēng. Đây là chữ rất dễ học theo cấu tạo.',en:'火 supplies the fire/light meaning; 登 dēng gives the same sound dēng.','zh-Hant':'火提示火／光；登 dēng 同時提示 dēng 的讀音。'},ex:['請開燈。','Qǐng kāi dēng.',{vi:'Vui lòng bật đèn.',en:'Please turn on the light.','zh-Hant':'請開燈。'}]},
      {h:'炒',p:'chǎo',m:{vi:'xào',en:'stir-fry','zh-Hant':'炒'},s:'火 + 少',w:{vi:'火 cho biết cách nấu bằng nhiệt; 少 shǎo gợi âm chǎo theo quan hệ âm lịch sử.',en:'火 gives the cooking/heat meaning; 少 shǎo is the historical sound component.','zh-Hant':'火提示加熱烹調；少 shǎo 是歷史聲符。'},ex:['我喜歡吃炒飯。','Wǒ xǐhuān chī chǎofàn.',{vi:'Tôi thích ăn cơm rang.',en:'I like fried rice.','zh-Hant':'我喜歡吃炒飯。'}]},
      {h:'煮',p:'zhǔ',m:{vi:'luộc, nấu',en:'boil; cook','zh-Hant':'煮'},s:'者 + 灬',w:{vi:'灬 ở dưới gợi lửa/nhiệt → “nấu”. Phần 者 đóng vai trò thành phần âm lịch sử.',en:'灬 underneath signals fire/heat → cooking; 者 is a historical phonetic component.','zh-Hant':'下方灬提示火／熱 → 烹煮；者是歷史聲符。'},ex:['我在煮麵。','Wǒ zài zhǔ miàn.',{vi:'Tôi đang nấu mì.',en:'I am cooking noodles.','zh-Hant':'我在煮麵。'}]}
    ]},
    {key:'eye',radical:'目',pinyin:'mù',icon:'👁️',meaning:{vi:'mắt, nhìn',en:'eye; seeing','zh-Hant':'眼睛、看'},origin:{vi:'目 là hình con mắt nhìn thẳng; thường xuất hiện ở chữ liên quan mắt/thị giác.',en:'目 depicts an eye and often appears in characters related to seeing and vision.','zh-Hant':'「目」像眼睛，常見於視覺與眼睛相關的字。'},chars:[
      {h:'睛',p:'jīng',m:{vi:'con ngươi/mắt (trong 眼睛)',en:'eye (in 眼睛)','zh-Hant':'眼睛的睛'},s:'目 + 青',w:{vi:'目 gợi mắt; 青 qīng gợi âm jīng (âm đầu đã đổi nhưng vần gần). Từ thông dụng nhất: 眼睛.',en:'目 supplies the eye meaning; 青 qīng gives a historical sound clue for jīng.','zh-Hant':'目提示眼睛；青 qīng 是歷史聲符，現代聲母已有變化。常見詞：眼睛。'},ex:['她的眼睛很大。','Tā de yǎnjīng hěn dà.',{vi:'Mắt cô ấy rất to.',en:'Her eyes are big.','zh-Hant':'她的眼睛很大。'}]},
      {h:'看',p:'kàn',m:{vi:'nhìn, xem',en:'look; watch','zh-Hant':'看'},s:'龵 + 目',w:{vi:'Có thể hình dung “đưa tay lên trên mắt để nhìn xa” → 看. Đây là mẹo hình ảnh rất dễ nhớ.',en:'A useful mnemonic is “put a hand above the eye to look into the distance.”','zh-Hant':'可以用「把手放在眼睛上方看遠處」來記憶「看」。'},ex:['我看書。','Wǒ kàn shū.',{vi:'Tôi đọc/xem sách.',en:'I read a book.','zh-Hant':'我看書。'}]},
      {h:'眼',p:'yǎn',m:{vi:'mắt',en:'eye','zh-Hant':'眼'},s:'目 + 艮',w:{vi:'目 cho biết nghĩa liên quan mắt; 艮 là phần gợi âm lịch sử. Nhìn bộ 目 là đủ để đoán chủ đề.',en:'目 gives the eye meaning; 艮 is a historical phonetic component.','zh-Hant':'目提示眼睛；艮是歷史聲符。看到目就能先猜語義範圍。'},ex:['我的眼睛有點累。','Wǒ de yǎnjīng yǒudiǎn lèi.',{vi:'Mắt tôi hơi mỏi.',en:'My eyes are a little tired.','zh-Hant':'我的眼睛有點累。'}]}
    ]}
  ];

  const soundFamilies=[
    {base:'青',p:'qīng',meaning:{vi:'họ âm “qing/jing”',en:'qing/jing sound family','zh-Hant':'qing／jing 聲符字族'},items:[
      ['清','qīng','氵 + 青',{vi:'nước → trong/sạch',en:'water → clear','zh-Hant':'水 → 清澈'}],
      ['情','qíng','忄 + 青',{vi:'tim/cảm xúc → tình cảm',en:'heart → feeling','zh-Hant':'心 → 情感'}],
      ['請','qǐng','訁 + 青',{vi:'lời nói → mời/xin',en:'speech → please/request','zh-Hant':'言語 → 請求'}],
      ['晴','qíng','日 + 青',{vi:'mặt trời → trời quang',en:'sun → sunny','zh-Hant':'日 → 晴天'}],
      ['睛','jīng','目 + 青',{vi:'mắt → con mắt',en:'eye → eye part','zh-Hant':'目 → 眼睛'}]
    ]},
    {base:'馬',p:'mǎ',meaning:{vi:'họ âm “ma”',en:'ma sound family','zh-Hant':'ma 聲符字族'},items:[
      ['媽','mā','女 + 馬',{vi:'nữ → mẹ',en:'female → mother','zh-Hant':'女 → 媽媽'}],
      ['嗎','ma','口 + 馬',{vi:'lời nói → trợ từ hỏi',en:'speech → question particle','zh-Hant':'口 → 疑問助詞'}],
      ['碼','mǎ','石 + 馬',{vi:'dấu/mã → số hiệu, mã',en:'mark → code/number','zh-Hant':'石 → 號碼'}],
      ['螞','mǎ','蟲 + 馬',{vi:'côn trùng → trong 螞蟻 (con kiến)',en:'insect → ant in 螞蟻','zh-Hant':'蟲 → 螞蟻'}]
    ]},
    {base:'包',p:'bāo',meaning:{vi:'họ vần “-ao”',en:'-ao sound family','zh-Hant':'-ao 聲符字族'},items:[
      ['抱','bào','扌 + 包',{vi:'tay → ôm',en:'hand → hug','zh-Hant':'手 → 抱'}],
      ['飽','bǎo','飠 + 包',{vi:'ăn → no',en:'food → full','zh-Hant':'食 → 飽'}],
      ['跑','pǎo','足 + 包',{vi:'chân → chạy',en:'foot → run','zh-Hant':'足 → 跑'}],
      ['泡','pào','氵 + 包',{vi:'nước → ngâm/pha',en:'water → soak/brew','zh-Hant':'水 → 泡'}]
    ]},
    {base:'方',p:'fāng',meaning:{vi:'họ âm “fang”',en:'fang sound family','zh-Hant':'fang 聲符字族'},items:[
      ['房','fáng','戶 + 方',{vi:'nhà/cửa → phòng',en:'house/door → room','zh-Hant':'戶 → 房間'}],
      ['訪','fǎng','訁 + 方',{vi:'lời nói → thăm/phỏng vấn',en:'speech → visit/interview','zh-Hant':'言 → 訪問'}],
      ['放','fàng','攵 + 方',{vi:'động tác → đặt/thả',en:'action → put/release','zh-Hant':'攵 → 放'}],
      ['防','fáng','阝 + 方',{vi:'biên/đất → phòng/ngăn',en:'boundary → prevent','zh-Hant':'阝 → 防止'}]
    ]}
  ];

  const pinyinRows={
    initials:[
      ['b','gần p/b nhẹ','Không bật hơi.'],['p','gần ph/p','Bật hơi rõ.'],['d','gần t nhẹ','Không bật hơi.'],['t','gần th','Bật hơi.'],['g','gần c/k nhẹ','Không bật hơi.'],['k','gần kh/k','Bật hơi.'],
      ['j','gần ch rất mềm','Không bật hơi; lưỡi ở phía trước.'],['q','gần ch mềm','Bật hơi mạnh; không phải q tiếng Việt.'],['x','gần x/s mềm','Lưỡi đưa ra trước, khe hẹp.'],
      ['zh','gần tr','Đầu lưỡi hơi cong.'],['ch','gần tr/ch bật hơi','Đầu lưỡi cong + bật hơi.'],['sh','gần s/sh','Đầu lưỡi cong.'],['r','gần r/gi nhưng khác','Cuộn lưỡi nhẹ.'],['z','gần dz/ts','Không bật hơi.'],['c','gần ts','Bật hơi.'],['s','gần x/s','Không cuộn lưỡi.']
    ],
    finals:[
      ['a','a','Khá gần tiếng Việt.'],['o','ô/uo','Thường tròn môi hơn.'],['e','giữa ơ và ư','Gần “ơ” hơn trong nhiều trường hợp; không đọc như e Việt.'],['i','i','Sau z/c/s/zh/ch/sh/r là âm đặc biệt gần “ư” ngắn.'],['u','u','Tròn môi.'],['ü','i/uy với môi tròn','Đặt lưỡi như i nhưng môi như u.'],
      ['ai','ai','Gần tiếng Việt.'],['ei','ây/êi','Chuyển từ e sang i.'],['ao','ao','Gần tiếng Việt.'],['ou','âu/ôu','Tròn môi ở cuối.'],['an','an','Khá gần.'],['en','ân/ơn ngắn','Âm giữa ngắn.'],['ang','ang','Khá gần.'],['eng','âng/ơng','Không phải “eng” Việt.'],['ong','ung/ông','Âm đầu tròn môi.'],['er','ơ + cuộn lưỡi','Âm đặc trưng Mandarin.']
    ],
    specials:[
      ['ju / qu / xu','u thực ra là âm ü','Sau j/q/x, dấu hai chấm của ü bị bỏ trong chính tả.'],['yu / yue / yuan / yun','y + ü...','Yu đại diện âm ü; không phải u thường.'],['iu','≈ iêu','Là dạng viết tắt của iou.'],['ui','≈ uây','Là dạng viết tắt của uei.'],['un','≈ uân','Thường là dạng rút gọn của uen.'],['Tone 3','xuống thấp rồi nhấc lên','Trong hội thoại thường phần “thấp” quan trọng hơn việc phải lên đầy đủ.']
    ]
  };

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
    const card=document.createElement('section');card.className='rad-group-card';card.dataset.search=`${r.radical} ${r.pinyin} ${pick(r.meaning)} ${r.chars.map(x=>`${x.h} ${x.p} ${pick(x.m)}`).join(' ')}`.toLowerCase();
    const head=document.createElement('div');head.className='rad-group-head';
    const symbol=document.createElement('div');symbol.className='rad-symbol';symbol.textContent=r.radical;
    const meta=document.createElement('div');meta.innerHTML=`<div class="rad-icon">${r.icon}</div><strong>${r.pinyin}</strong><span>${pick(r.meaning)}</span>`;
    head.append(symbol,meta,audioButtons(r.radical.split('/')[0].trim(),ui,'word'));
    const origin=document.createElement('p');origin.className='rad-origin';origin.textContent=pick(r.origin);
    const chars=document.createElement('div');chars.className='rad-char-grid';r.chars.forEach(ch=>chars.append(charCard(ch,ui)));
    card.append(head,origin,chars);return card;
  }
  function renderSemantic(root,ui,query=''){
    root.innerHTML='';
    const note=document.createElement('div');note.className='rad-learning-note';note.textContent=ui.note;root.append(note);
    const grid=document.createElement('div');grid.className='rad-group-grid';
    radicals.forEach(r=>{const card=radicalCard(r,ui);if(!query||card.dataset.search.includes(query))grid.append(card);});
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
  document.addEventListener('tocfl:language-changed',render);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',render);else render();
})();
