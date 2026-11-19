/**
 * English flashcards: TOEIC (ETS Starter Vocab LC + RC) and Forum (Từ vựng theo ngữ cảnh).
 *
 * - Spaced repetition (Leitner boxes): Quên / Khó / Nhớ / Dễ.
 * - Each card: word, IPA, audio (normal + slow), meaning, example sentence (EN + VI).
 * - Two study modes: "Lật thẻ" (flip) and "Viết" (handwriting with Apple Pencil / finger,
 *   optional tracing guide, optional typed/Scribble answer that is checked automatically).
 * - Progress lives in localStorage and syncs through the account (progress.toeic in app.js).
 * - "Thêm vào lịch": .ics file (Apple/Outlook) or Google Calendar link.
 */
(() => {
  'use strict';

  const STORAGE_KEY = 'tocfl-toeic-progress-v1';
  const DECKS = {
    toeic: { url: './data/toeic.json', label: 'TOEIC', sub: 'ETS Starter Vocab — Listening (LC) & Reading (RC)' },
    forum: { url: './data/forum.json', label: 'Forum', sub: 'Từ vựng tiếng Anh theo ngữ cảnh — Nguyễn Hoàng Huy', set: 'FO' },
    research: { url: './data/research.json', label: 'Research', sub: 'Tiếng Anh cho nghiên cứu sinh — từ câu cơ bản đến hội thảo', set: 'RS' },
  };
  const SET_DECK = { LC: 'toeic', RC: 'toeic', FO: 'forum', RS: 'research' };
  const isGroupSet = set => set !== 'LC' && set !== 'RC';
  const INTERVALS = [0, 1, 3, 7, 14, 30, 60]; // days per box
  const MASTERED_BOX = 4;
  const PLAN_ORDERS = ['alternate', 'lc-first', 'lc-only', 'rc-only'];

  const TEXT = {
    vi: {
      title: 'Tiếng Anh · Flash card',
      today: 'Hôm nay',
      newWords: n => `${n} từ mới`,
      dueWords: n => `${n} từ cần ôn`,
      start: '▶ Học ngay',
      continue: '▶ Học tiếp',
      writeStart: '✍️ Luyện viết',
      allDone: '🎉 Xong hết cho hôm nay! Có thể học thêm bài tiếp theo.',
      studyNext: '➕ Học thêm bài tiếp',
      calendar: '📅 Thêm vào lịch',
      list: '📋 Danh sách từ',
      settings: '⚙️ Cài đặt',
      statsSeen: 'Đã học',
      statsMastered: 'Đã thuộc',
      statsDue: 'Cần ôn (tất cả bộ)',
      statsStreak: 'Chuỗi ngày',
      planProgress: (done, total) => `Kế hoạch: ${done}/${total} bài`,
      flip: 'Chạm để lật thẻ',
      again: 'Quên',
      hard: 'Khó',
      good: 'Nhớ',
      easy: 'Dễ',
      back: '← Quay lại',
      speak: '🔊 Nghe',
      slow: '🐢 Chậm',
      speakExample: '🔊 Nghe câu',
      example: 'Ví dụ',
      usage: 'Cách dùng',
      cardOf: (i, n) => `${i} / ${n}`,
      sessionDone: 'Hoàn thành phiên học!',
      sessionSummary: (n, again) => `Bạn đã ôn ${n} thẻ · ${again} lần bấm "Quên".`,
      newTag: 'MỚI',
      reviewTag: 'ÔN',
      direction: 'Mặt trước thẻ',
      dirEnVi: 'Tiếng Anh → nghĩa Việt',
      dirViEn: 'Nghĩa Việt → tiếng Anh',
      dirMixed: 'Trộn cả hai',
      order: 'Thứ tự học TOEIC',
      orderAlternate: 'Xen kẽ LC / RC (40 ngày)',
      orderLcFirst: 'Hết LC rồi tới RC (40 ngày)',
      orderLcOnly: 'Chỉ LC (20 ngày)',
      orderRcOnly: 'Chỉ RC (20 ngày)',
      newPerDay: 'Số từ mới mỗi phiên',
      wholeUnit: 'Cả bài',
      autoSpeak: 'Tự đọc từ tiếng Anh khi hiện thẻ',
      showIpaFront: 'Hiện phiên âm ở mặt trước',
      save: 'Lưu',
      close: 'Đóng',
      chooseUnit: 'Chọn bài để xem / học',
      studyThisUnit: '▶ Học bài này',
      writeThisUnit: '✍️ Viết bài này',
      hideMeaning: 'Che nghĩa để tự kiểm tra',
      boxLabel: b => (b <= 0 ? 'Chưa học' : b >= MASTERED_BOX ? 'Đã thuộc' : `Hộp ${b}`),
      mode: 'Cách học',
      modeFlip: '🃏 Lật thẻ',
      modeWrite: '✍️ Viết',
      modeSpeak: '🎤 Nói',
      speakStart: '🎤 Luyện nói',
      mic: '🎤 Nói thử',
      micStop: '⏹ Dừng',
      speakPrompt: 'Đọc to câu này:',
      speakHint: 'Bấm 🎤 rồi đọc to. Nghe mẫu trước (🐢 Chậm) nếu chưa chắc.',
      listening: '🎧 Đang nghe… hãy nói ngay bây giờ.',
      processing: '⏳ Đang nhận diện…',
      youSaid: 'App nghe được',
      scoreGreat: 'Tuyệt vời! Phát âm rất rõ.',
      scoreGood: 'Gần đúng rồi! Thử lại để rõ hơn từ màu đỏ.',
      scoreTry: 'Chưa rõ. Nghe mẫu chậm rồi thử lại nhé.',
      speechNoResult: 'Không nghe được gì. Hãy nói to, rõ và gần micro hơn.',
      speechDenied: 'Chưa có quyền dùng micro. Hãy cho phép micro cho trang này trong cài đặt trình duyệt.',
      speechUnsupported: 'Trình duyệt này chưa hỗ trợ nhận diện giọng nói. Hãy dùng Safari (iPad/iPhone/Mac) hoặc Chrome.',
      speechNetwork: 'Nhận diện giọng nói cần kết nối mạng. Hãy kiểm tra Internet rồi thử lại.',
      speechGroqZh: 'Groq trên tài khoản đang nhận diện theo tiếng Trung, chưa dùng được cho tiếng Anh.',
      speechEngineGroq: 'đang dùng Groq Whisper',
      showAnswer: '👀 Xem nghĩa & ví dụ',
      tryAgain: '🔁 Thử lại',
      suggested: 'gợi ý',
      speakFix: 'Đọc to câu đúng:',
      writePrompt: 'Viết từ tiếng Anh có nghĩa:',
      writeFixPrompt: 'Viết lại câu cho đúng:',
      writeSentencePrompt: 'Viết câu tiếng Anh có nghĩa:',
      trace: 'Tô theo mẫu',
      hint: '💡 Gợi ý',
      hintText: (first, n) => `Bắt đầu bằng "${first}" · ${n} chữ cái`,
      clear: '🧽 Xóa',
      undo: '↶ Hoàn tác',
      check: '✓ Xem đáp án',
      typeHere: 'Gõ hoặc viết tay vào đây (Scribble) để chấm tự động',
      typedRight: '✅ Chính xác!',
      typedWrong: '❌ Chưa đúng — so sánh với đáp án:',
      yourAnswer: 'Bạn viết',
      answer: 'Đáp án',
      selfCheck: 'So sánh chữ bạn viết với đáp án rồi tự chấm:',
      penTip: 'Mẹo: dùng Apple Pencil — app tự bỏ qua lòng bàn tay khi đang viết bằng bút.',
      fixFront: 'Câu này sai ở đâu?',
      fixAnswer: 'Câu đúng',
      groupNotes: '📝 Ghi chú của sách',
      groupIntro: 'Giới thiệu',
      reading: '📖 Đoạn văn mẫu',
      mistakes: '⚠️ Lỗi thường gặp',
      calTitle: '📅 Nhắc học trong lịch',
      calDesc: 'Tạo lịch học hằng ngày theo kế hoạch của bộ đang chọn. Mỗi ngày có báo thức và link mở thẳng vào tab Tiếng Anh.',
      calStart: 'Bắt đầu từ ngày',
      calTime: 'Giờ học',
      calDuration: 'Thời lượng',
      calAlarm: 'Báo trước',
      calAlarmOnTime: 'Đúng giờ',
      calMinutes: m => `${m} phút`,
      calChinese: 'Nhắc ôn tiếng Trung luôn trong cùng sự kiện',
      calIcs: '⬇ Tải file lịch (.ics) — iPhone · iPad · Mac · Outlook',
      calGoogle: '➕ Thêm vào Google Calendar',
      calHelp: 'iPhone/iPad: mở bằng Safari rồi bấm "Thêm tất cả". Google Calendar tạo một sự kiện lặp lại hằng ngày.',
      calEventTitle: unit => `📚 Học ${unit}`,
      calEventTitleGeneric: '📚 Giờ học Tiếng Anh + Tiếng Trung',
      calEventBody: (unit, chinese) =>
        `Hôm nay: ${unit} + ôn các thẻ đến hạn.` + (chinese ? '\nSau đó: ôn tiếng Trung (Từ vựng / Reading).' : ''),
      calDone: 'Đã tạo file lịch. Mở file vừa tải để thêm vào Lịch.',
      loading: 'Đang tải từ vựng…',
      loadError: 'Không tải được dữ liệu',
      resetUnit: '↻ Học lại bài này từ đầu',
      resetConfirm: 'Đặt lại tiến độ của bài này?',
      keyboardHint: 'Phím tắt: Space = lật · 1 Quên · 2 Khó · 3 Nhớ · 4 Dễ · S = nghe',
      groupLabel: g => `Nhóm ${g}`,
    },
    en: {
      title: 'English · Flashcards',
      today: 'Today',
      newWords: n => `${n} new words`,
      dueWords: n => `${n} due for review`,
      start: '▶ Study now',
      continue: '▶ Continue',
      writeStart: '✍️ Writing practice',
      allDone: '🎉 All done for today! You can study the next unit too.',
      studyNext: '➕ Study next unit',
      calendar: '📅 Add to calendar',
      list: '📋 Word list',
      settings: '⚙️ Settings',
      statsSeen: 'Studied',
      statsMastered: 'Mastered',
      statsDue: 'Due (all decks)',
      statsStreak: 'Streak',
      planProgress: (done, total) => `Plan: ${done}/${total} units`,
      flip: 'Tap to flip',
      again: 'Again',
      hard: 'Hard',
      good: 'Good',
      easy: 'Easy',
      back: '← Back',
      speak: '🔊 Listen',
      slow: '🐢 Slow',
      speakExample: '🔊 Sentence',
      example: 'Example',
      usage: 'Usage',
      cardOf: (i, n) => `${i} / ${n}`,
      sessionDone: 'Session complete!',
      sessionSummary: (n, again) => `You reviewed ${n} cards · pressed "Again" ${again} times.`,
      newTag: 'NEW',
      reviewTag: 'REVIEW',
      direction: 'Card front',
      dirEnVi: 'English → Vietnamese',
      dirViEn: 'Vietnamese → English',
      dirMixed: 'Mixed',
      order: 'TOEIC study order',
      orderAlternate: 'Alternate LC / RC (40 days)',
      orderLcFirst: 'All LC, then RC (40 days)',
      orderLcOnly: 'LC only (20 days)',
      orderRcOnly: 'RC only (20 days)',
      newPerDay: 'New words per session',
      wholeUnit: 'Whole unit',
      autoSpeak: 'Read the English word aloud',
      showIpaFront: 'Show IPA on the front',
      save: 'Save',
      close: 'Close',
      chooseUnit: 'Choose a unit to view / study',
      studyThisUnit: '▶ Study this unit',
      writeThisUnit: '✍️ Write this unit',
      hideMeaning: 'Hide meanings to test yourself',
      boxLabel: b => (b <= 0 ? 'Not started' : b >= MASTERED_BOX ? 'Mastered' : `Box ${b}`),
      mode: 'Mode',
      modeFlip: '🃏 Flip',
      modeWrite: '✍️ Write',
      modeSpeak: '🎤 Speak',
      speakStart: '🎤 Speaking practice',
      mic: '🎤 Try saying it',
      micStop: '⏹ Stop',
      speakPrompt: 'Read this aloud:',
      speakHint: 'Tap 🎤 and read aloud. Listen to the model first (🐢 Slow) if unsure.',
      listening: '🎧 Listening… speak now.',
      processing: '⏳ Recognizing…',
      youSaid: 'The app heard',
      scoreGreat: 'Excellent! Very clear.',
      scoreGood: 'Almost! Try again to make the red words clearer.',
      scoreTry: 'Not clear yet. Listen to the slow model and try again.',
      speechNoResult: 'Nothing was heard. Speak louder, clearly, closer to the mic.',
      speechDenied: 'Microphone permission is off. Allow the microphone for this site in your browser settings.',
      speechUnsupported: 'This browser does not support speech recognition. Use Safari (iPad/iPhone/Mac) or Chrome.',
      speechNetwork: 'Speech recognition needs an internet connection. Check it and try again.',
      speechGroqZh: 'The Groq function on this account transcribes Chinese only, so it cannot check English yet.',
      speechEngineGroq: 'using Groq Whisper',
      showAnswer: '👀 Show meaning & example',
      tryAgain: '🔁 Try again',
      suggested: 'suggested',
      speakFix: 'Read the correct sentence aloud:',
      writePrompt: 'Write the English word for:',
      writeFixPrompt: 'Rewrite the sentence correctly:',
      writeSentencePrompt: 'Write the English sentence for:',
      trace: 'Trace the word',
      hint: '💡 Hint',
      hintText: (first, n) => `Starts with "${first}" · ${n} letters`,
      clear: '🧽 Clear',
      undo: '↶ Undo',
      check: '✓ Show answer',
      typeHere: 'Type or handwrite here (Scribble) for automatic checking',
      typedRight: '✅ Correct!',
      typedWrong: '❌ Not quite — compare with the answer:',
      yourAnswer: 'You wrote',
      answer: 'Answer',
      selfCheck: 'Compare your handwriting with the answer, then grade yourself:',
      penTip: 'Tip: with Apple Pencil, palm touches are ignored while you write.',
      fixFront: 'What is wrong with this sentence?',
      fixAnswer: 'Correct sentence',
      groupNotes: '📝 Book notes',
      groupIntro: 'Introduction',
      reading: '📖 Sample paragraphs',
      mistakes: '⚠️ Common mistakes',
      calTitle: '📅 Study reminders',
      calDesc: 'Create a daily study schedule for the selected deck, with an alarm and a link that opens the English tab.',
      calStart: 'Start date',
      calTime: 'Study time',
      calDuration: 'Duration',
      calAlarm: 'Alert',
      calAlarmOnTime: 'At start time',
      calMinutes: m => `${m} min`,
      calChinese: 'Also remind me to review Chinese in the same event',
      calIcs: '⬇ Download calendar file (.ics) — iPhone · iPad · Mac · Outlook',
      calGoogle: '➕ Add to Google Calendar',
      calHelp: 'iPhone/iPad: open in Safari and tap "Add All". Google Calendar creates one daily repeating event.',
      calEventTitle: unit => `📚 ${unit}`,
      calEventTitleGeneric: '📚 Study time: English + Chinese',
      calEventBody: (unit, chinese) =>
        `Today: ${unit} + due reviews.` + (chinese ? '\nThen: review Chinese (Vocabulary / Reading).' : ''),
      calDone: 'Calendar file created. Open it to add the events.',
      loading: 'Loading vocabulary…',
      loadError: 'Could not load data',
      resetUnit: '↻ Restart this unit',
      resetConfirm: 'Reset progress for this unit?',
      keyboardHint: 'Shortcuts: Space = flip · 1 Again · 2 Hard · 3 Good · 4 Easy · S = listen',
      groupLabel: g => `Group ${g}`,
    },
  };

  const $ = id => document.getElementById(id);
  const esc = s =>
    String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const lang = () => (window.TOCFLApp?.getLanguage?.() === 'vi' || !window.TOCFLApp ? 'vi' : 'en');
  const T = () => TEXT[lang()] || TEXT.vi;

  // ---------- dates (local calendar days) ----------
  const pad = n => String(n).padStart(2, '0');
  const dayKey = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const parseDay = key => {
    const [y, m, d] = String(key).split('-').map(Number);
    return new Date(y, (m || 1) - 1, d || 1);
  };
  const addDays = (key, n) => {
    const d = parseDay(key);
    d.setDate(d.getDate() + n);
    return dayKey(d);
  };

  // ---------- state ----------
  const decks = {}; // deck -> {meta, vocabulary, groups?, byUnit: Map}
  const byId = new Map(); // card id -> entry (all loaded decks)
  let state = loadState();
  let session = null;
  let screen = 'home'; // home | session | list | done
  let listUnit = null;
  let hideMeaning = false;

  function defaultState() {
    return {
      version: 2,
      cards: {}, // id -> {box, due, seen, lapses, t}
      log: {}, // YYYY-MM-DD -> {reviewed, learned}
      settings: {
        deck: 'toeic',
        direction: 'en-vi',
        order: 'alternate',
        newPerSession: 60,
        autoSpeak: true,
        ipaFront: true,
        mode: 'flip',
        trace: false,
        t: 0,
      },
      calendar: { time: '20:00', duration: 30, alarm: 10, chinese: true },
    };
  }

  function loadState() {
    try {
      const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (!raw || typeof raw !== 'object') return defaultState();
      const base = defaultState();
      return {
        ...base,
        ...raw,
        version: 2,
        cards: raw.cards && typeof raw.cards === 'object' ? raw.cards : {},
        log: raw.log && typeof raw.log === 'object' ? raw.log : {},
        settings: { ...base.settings, ...(raw.settings || {}) },
        calendar: { ...base.calendar, ...(raw.calendar || {}) },
      };
    } catch {
      return defaultState();
    }
  }

  function save() {
    const keys = Object.keys(state.log).sort();
    while (keys.length > 120) delete state.log[keys.shift()];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
      console.warn('English flashcards: save failed', err);
    }
    document.dispatchEvent(new CustomEvent('tocfl:state-changed'));
    updateTabBadge();
  }

  function setSetting(patch) {
    state.settings = { ...state.settings, ...patch, t: Date.now() };
    save();
  }

  const deckId = () => (DECKS[state.settings.deck] ? state.settings.deck : 'toeic');

  // ---------- data ----------
  async function loadDeck(id) {
    if (decks[id]) return decks[id];
    const res = await fetch(DECKS[id].url, { cache: 'no-cache' });
    if (!res.ok) throw new Error(`${T().loadError}: ${DECKS[id].url} (${res.status})`);
    const data = await res.json();
    data.byUnit = new Map();
    for (const w of data.vocabulary) {
      const key = `${w.set}-${w.day}`;
      if (!data.byUnit.has(key)) data.byUnit.set(key, []);
      data.byUnit.get(key).push(w);
      byId.set(w.id, w);
    }
    decks[id] = data;
    return data;
  }
  const loadAll = () => Promise.all(Object.keys(DECKS).map(id => loadDeck(id).catch(() => null)));

  const deck = () => decks[deckId()];

  function planUnits(id = deckId()) {
    if (id !== 'toeic') {
      const d = decks[id];
      const set = DECKS[id].set;
      return (d?.groups || []).filter(g => d.byUnit.has(`${set}-${g.group}`)).map(g => ({ set, day: g.group }));
    }
    const lc = Array.from({ length: 20 }, (_, i) => ({ set: 'LC', day: i + 1 }));
    const rc = Array.from({ length: 20 }, (_, i) => ({ set: 'RC', day: i + 1 }));
    switch (state.settings.order) {
      case 'lc-first':
        return [...lc, ...rc];
      case 'lc-only':
        return lc;
      case 'rc-only':
        return rc;
      default:
        return lc.flatMap((u, i) => [u, rc[i]]);
    }
  }

  const unitDeck = u => decks[SET_DECK[u.set] || 'toeic'];
  const unitWords = u => unitDeck(u)?.byUnit.get(`${u.set}-${u.day}`) || [];
  const groupInfo = u => unitDeck(u)?.groups?.find(g => g.group === Number(u.day));
  const unitLabel = u =>
    isGroupSet(u.set)
      ? `${DECKS[SET_DECK[u.set]].label} · ${T().groupLabel(u.day)}: ${groupInfo(u)?.title || ''}`
      : `TOEIC ${u.set} · Day ${pad(u.day)}`;
  const unitShort = u => (isGroupSet(u.set) ? T().groupLabel(u.day) : `${u.set} ${pad(u.day)}`);
  const isSeen = w => Boolean(state.cards[w.id]?.seen);
  const unitStarted = u => unitWords(u).some(isSeen);
  const unitComplete = u => unitWords(u).length > 0 && unitWords(u).every(isSeen);
  const currentUnit = (id = deckId()) => planUnits(id).find(u => !unitComplete(u)) || null;

  /** Due cards from every loaded deck — reviews are never left behind when switching decks. */
  function dueCards(today = dayKey()) {
    const out = [];
    for (const [id, c] of Object.entries(state.cards)) {
      if (c?.seen && c.due && c.due <= today && byId.has(id)) out.push(byId.get(id));
    }
    return out.sort((a, b) => (state.cards[a.id].due < state.cards[b.id].due ? -1 : 1));
  }

  const newCards = (unit, limit) => (unit ? unitWords(unit).filter(w => !isSeen(w)).slice(0, limit) : []);

  function stats() {
    const ids = new Set((deck()?.vocabulary || []).map(w => w.id));
    const cards = Object.entries(state.cards).filter(([id]) => ids.has(id)).map(([, c]) => c);
    let streak = 0;
    let key = dayKey();
    if (!state.log[key]) key = addDays(key, -1);
    while (state.log[key] && (state.log[key].reviewed || 0) > 0) {
      streak += 1;
      key = addDays(key, -1);
    }
    return {
      seen: cards.filter(c => c.seen).length,
      mastered: cards.filter(c => c.box >= MASTERED_BOX).length,
      due: dueCards().length,
      streak,
      total: ids.size,
    };
  }

  // ---------- spaced repetition ----------
  function grade(word, rating) {
    const today = dayKey();
    const prev = state.cards[word.id] || { box: 0, seen: 0, lapses: 0 };
    const wasNew = !prev.seen;
    let box = prev.box || 0;
    let due;
    if (rating === 'again') {
      box = 1;
      due = addDays(today, 1);
    } else if (rating === 'hard') {
      box = Math.max(1, box);
      due = addDays(today, 1);
    } else if (rating === 'good') {
      box = Math.min(INTERVALS.length - 1, box + 1);
      due = addDays(today, INTERVALS[box]);
    } else {
      box = Math.min(INTERVALS.length - 1, box + 2);
      due = addDays(today, INTERVALS[box]);
    }
    state.cards[word.id] = {
      box,
      due,
      seen: (prev.seen || 0) + 1,
      lapses: (prev.lapses || 0) + (rating === 'again' ? 1 : 0),
      t: Date.now(),
    };
    const log = (state.log[today] ||= { reviewed: 0, learned: 0 });
    log.reviewed += 1;
    if (wasNew) log.learned += 1;
    save();
  }

  // ---------- word helpers ----------
  const isFix = w => w.kind === 'fix';
  const headword = w => w.en || w.phrase; // what is shown
  const sayText = w => w.say || w.en || w.phrase; // what is spoken / written
  const meaningOf = w => w.vi || w.meaning || '';
  const ipaOf = w => (w.ipa ? `/${w.ipa}/` : '');
  const isTemplate = w => String(w.phrase || '').includes('___');
  /** Word-by-word reading: each word with its IPA right underneath. */
  const rubyHtml = (w, cls = '') =>
    Array.isArray(w.iw) && w.iw.length > 1
      ? `<span class="toeic-ruby ${cls}">${w.iw
          .map(([word, ipa]) => `<span class="iw"><b>${esc(word)}</b><i>${esc(ipa)}</i></span>`)
          .join('')}</span>`
      : '';
  /** Answer used in writing mode: the spoken form without "~", "…" or placeholders. */
  const writeAnswer = w => {
    // Sentence templates ("My research is about ___.") are practised as their fixed part.
    const base = isFix(w) ? w.ex_en.split(' / ')[0] : String(w.phrase || '').includes('___') ? w.phrase.replace(/_{3,}[.,]?/g, '…') : sayText(w);
    return base.replace(/~/g, ' ').replace(/\s+/g, ' ').trim();
  };
  const isSentence = w => (sayText(w).match(/[A-Za-z']+/g) || []).length > 3;

  function exampleHtml(w) {
    const s = w.ex_en || '';
    if (!s) return '';
    // Merge neighbouring spans ("take a photo") into one highlight.
    const spans = [];
    for (const [a, b] of Array.isArray(w.hl) ? w.hl : []) {
      const last = spans[spans.length - 1];
      if (last && /^\s*$/.test(s.slice(last[1], a))) last[1] = b;
      else spans.push([a, b]);
    }
    let out = '';
    let pos = 0;
    for (const [a, b] of spans) {
      if (a < pos || b > s.length) continue;
      out += esc(s.slice(pos, a)) + `<mark>${esc(s.slice(a, b))}</mark>`;
      pos = b;
    }
    return out + esc(s.slice(pos));
  }

  // ---------- speech ----------
  let voice = null;
  function pickVoice() {
    const voices = window.speechSynthesis?.getVoices?.() || [];
    voice =
      voices.find(v => /en[-_]US/i.test(v.lang) && /Samantha|Google US|Aria|Jenny|Natural/i.test(v.name)) ||
      voices.find(v => /en[-_]US/i.test(v.lang)) ||
      voices.find(v => /^en/i.test(v.lang)) ||
      null;
  }
  if ('speechSynthesis' in window) {
    pickVoice();
    window.speechSynthesis.addEventListener?.('voiceschanged', pickVoice);
  }
  function speak(text, rate = 0.92) {
    if (!('speechSynthesis' in window)) return;
    const clean = String(text).replace(/[~…]/g, ' ').replace(/\s+/g, ' ').trim();
    if (!clean) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(clean);
    u.lang = 'en-US';
    if (voice) u.voice = voice;
    u.rate = rate;
    window.speechSynthesis.speak(u);
  }

  // ---------- rendering ----------
  const root = () => $('toeicApp');

  function render() {
    const el = root();
    if (!el) return;
    if (!deck()) {
      el.innerHTML = `<div class="card"><strong>${esc(T().loading)}</strong></div>`;
      loadAll().then(() => {
        updateTabBadge();
        if (deck()) render();
        else el.innerHTML = `<div class="card"><strong>${esc(T().loadError)}</strong></div>`;
      });
      return;
    }
    if (screen === 'session' && session) return renderSession();
    if (screen === 'done' && session) return renderDone();
    if (screen === 'list') return renderList();
    renderHome();
  }

  const deckTabs = () => `
    <div class="toeic-deck-tabs" role="tablist">
      ${Object.entries(DECKS)
        .map(
          ([id, d]) =>
            `<button type="button" role="tab" class="toeic-deck-tab ${id === deckId() ? 'is-active' : ''}" data-deck="${id}" aria-selected="${id === deckId()}">${esc(d.label)}</button>`
        )
        .join('')}
    </div>`;

  const modeToggle = () => `
    <div class="toeic-mode-toggle" role="group" aria-label="${esc(T().mode)}">
      <button type="button" data-mode="flip" class="${state.settings.mode !== 'write' && state.settings.mode !== 'speak' ? 'is-active' : ''}">${esc(T().modeFlip)}</button>
      <button type="button" data-mode="write" class="${state.settings.mode === 'write' ? 'is-active' : ''}">${esc(T().modeWrite)}</button>
      <button type="button" data-mode="speak" class="${state.settings.mode === 'speak' ? 'is-active' : ''}">${esc(T().modeSpeak)}</button>
    </div>`;

  function bindCommon() {
    root()
      .querySelectorAll('[data-deck]')
      .forEach(b =>
        b.addEventListener('click', () => {
          setSetting({ deck: b.dataset.deck });
          screen = 'home';
          render();
        })
      );
    root()
      .querySelectorAll('[data-mode]')
      .forEach(b =>
        b.addEventListener('click', () => {
          setSetting({ mode: b.dataset.mode });
          if (screen === 'session' && session) {
            session.flipped = false;
            session.checked = false;
            renderSession();
          } else render();
        })
      );
  }

  function renderHome() {
    const t = T();
    const id = deckId();
    const unit = currentUnit();
    const plan = planUnits();
    const doneUnits = plan.filter(unitComplete).length;
    const due = dueCards();
    const fresh = newCards(unit, state.settings.newPerSession);
    const s = stats();
    const pct = plan.length ? Math.round((doneUnits / plan.length) * 100) : 0;
    const nothingLeft = !due.length && !fresh.length;
    const started = unit && unitStarted(unit);
    const forumExtras =
      id === 'forum'
        ? `<div class="toeic-actions toeic-forum-extras">
             ${groupInfo({ set: 'FO', day: 11 }) ? `<button type="button" data-open-group="11">${esc(t.reading)}</button>` : ''}
           </div>`
        : '';

    root().innerHTML = `
      ${deckTabs()}
      <div class="toeic-hero card">
        <div>
          <div class="eyebrow">🇬🇧 ${esc(DECKS[id].sub)}</div>
          <h2>${esc(t.title)}</h2>
          ${modeToggle()}
        </div>
        <div class="toeic-today">
          <div class="small muted">${esc(t.today)}</div>
          <strong>${unit ? esc(unitLabel(unit)) : '✓'}</strong>
          <div class="toeic-today-counts">
            <span class="toeic-pill is-new">${esc(t.newWords(fresh.length))}</span>
            <span class="toeic-pill is-due">${esc(t.dueWords(due.length))}</span>
          </div>
        </div>
        <div class="toeic-plan">
          <div class="progress-bar"><div style="width:${pct}%"></div></div>
          <div class="small muted">${esc(t.planProgress(doneUnits, plan.length))}</div>
        </div>
        <div class="toeic-actions">
          ${
            nothingLeft
              ? `<div class="toeic-done-note">${esc(t.allDone)}</div>`
              : `<button id="toeicStartBtn" class="primary toeic-big-btn" type="button">${esc(
                  state.settings.mode === 'write' ? t.writeStart : state.settings.mode === 'speak' ? t.speakStart : started || due.length ? t.continue : t.start
                )}</button>`
          }
          <button id="toeicCalendarBtn" type="button">${esc(t.calendar)}</button>
          <button id="toeicListBtn" type="button">${esc(t.list)}</button>
          <button id="toeicSettingsBtn" type="button">${esc(t.settings)}</button>
        </div>
      </div>
      <div class="toeic-stats">
        ${statTile(t.statsSeen, `${s.seen}<small>/${s.total}</small>`)}
        ${statTile(t.statsMastered, s.mastered)}
        ${statTile(t.statsDue, s.due)}
        ${statTile(t.statsStreak, `🔥 ${s.streak}`)}
      </div>
      <div class="card">
        <h3>${esc(t.chooseUnit)}</h3>
        <div class="toeic-unit-grid ${id !== 'toeic' ? 'is-forum' : ''}">
          ${plan
            .map(u => {
              const words = unitWords(u);
              const seen = words.filter(isSeen).length;
              const cls = unitComplete(u) ? 'is-complete' : seen ? 'is-started' : '';
              const current = unit && u.set === unit.set && u.day === unit.day ? ' is-current' : '';
              const title = isGroupSet(u.set) ? `<em>${esc(groupInfo(u)?.title || '')}</em>` : '';
              return `<button type="button" class="toeic-unit ${cls}${current}" data-unit="${u.set}-${u.day}">
                <strong>${esc(unitShort(u))}</strong>${title}<span>${seen}/${words.length}</span></button>`;
            })
            .join('')}
        </div>
        ${forumExtras}
        <p class="small muted">${esc(t.keyboardHint)}</p>
      </div>`;

    bindCommon();
    $('toeicStartBtn')?.addEventListener('click', () => startSession());
    $('toeicCalendarBtn').addEventListener('click', openCalendarModal);
    $('toeicListBtn').addEventListener('click', () => {
      listUnit = unit || plan[0];
      screen = 'list';
      render();
    });
    $('toeicSettingsBtn').addEventListener('click', openSettingsModal);
    root()
      .querySelectorAll('[data-unit]')
      .forEach(b =>
        b.addEventListener('click', () => {
          const [set, day] = b.dataset.unit.split('-');
          listUnit = { set, day: Number(day) };
          screen = 'list';
          render();
        })
      );
    root()
      .querySelectorAll('[data-open-group]')
      .forEach(b =>
        b.addEventListener('click', () => {
          listUnit = { set: 'FO', day: Number(b.dataset.openGroup) };
          screen = 'list';
          render();
        })
      );
  }

  const statTile = (label, value) =>
    `<div class="card toeic-stat"><div class="small muted">${esc(label)}</div><strong>${value}</strong></div>`;

  function startSession(unitOverride, { forceWrite = false, all = false } = {}) {
    if (forceWrite && state.settings.mode !== 'write') setSetting({ mode: 'write' });
    const unit = unitOverride || currentUnit();
    const due = unitOverride ? [] : dueCards();
    let fresh = unitOverride
      ? unitWords(unitOverride).filter(w => !isSeen(w)).slice(0, state.settings.newPerSession)
      : newCards(unit, state.settings.newPerSession);
    if (all && unitOverride) fresh = [];
    let queue = [...due.map(w => ({ w, isNew: false })), ...fresh.map(w => ({ w, isNew: !isSeen(w) }))];
    if (unitOverride && !queue.length) queue = unitWords(unitOverride).map(w => ({ w, isNew: false }));
    if (!queue.length) return;
    session = { queue, index: 0, flipped: false, checked: false, reviewed: 0, again: 0, requeued: new Set() };
    screen = 'session';
    render();
  }

  function frontSide(item) {
    if (isFix(item.w)) return 'fix';
    const dir = state.settings.direction;
    if (dir === 'mixed') {
      item.front ||= Math.random() < 0.5 ? 'en' : 'vi';
      return item.front;
    }
    return dir === 'vi-en' ? 'vi' : 'en';
  }

  function sessionHead(item) {
    const t = T();
    const w = item.w;
    const pct = Math.round((session.index / session.queue.length) * 100);
    const src = isGroupSet(w.set)
      ? `${DECKS[SET_DECK[w.set]].label} · ${t.groupLabel(w.day)} · #${w.no}`
      : `${w.set} · Day ${pad(w.day)} · #${w.no}`;
    return `
      <div class="toeic-session-head">
        <button id="toeicBackBtn" type="button">${esc(t.back)}</button>
        ${modeToggle()}
        <div class="toeic-session-meta">
          <span class="toeic-pill ${item.isNew ? 'is-new' : 'is-due'}">${esc(item.isNew ? t.newTag : t.reviewTag)}</span>
          <span class="small muted">${esc(src)}</span>
          <strong>${esc(t.cardOf(session.index + 1, session.queue.length))}</strong>
        </div>
      </div>
      <div class="progress-bar"><div style="width:${pct}%"></div></div>`;
  }

  const rateButtons = visible => `
    <div class="toeic-rate ${visible ? '' : 'is-hidden'}">
      <button type="button" data-rate="again" class="toeic-rate-again">😵 ${esc(T().again)}<small>1</small></button>
      <button type="button" data-rate="hard" class="toeic-rate-hard">🤔 ${esc(T().hard)}<small>2</small></button>
      <button type="button" data-rate="good" class="toeic-rate-good">🙂 ${esc(T().good)}<small>3</small></button>
      <button type="button" data-rate="easy" class="toeic-rate-easy">😎 ${esc(T().easy)}<small>4</small></button>
    </div>`;

  /** Meaning + usage + example block shown on the back of a card / after checking. */
  function detailsHtml(w, { showWord = false, hideMeaning: noMeaning = false, noMic = false } = {}) {
    const t = T();
    if (isFix(w)) {
      return `
        <div class="toeic-detail">
          <div class="toeic-detail-label">${esc(t.fixAnswer)}</div>
          <div class="toeic-example-en">${esc(w.ex_en)}</div>
          ${w.meaning ? `<div class="toeic-usage">${esc(w.meaning)}</div>` : ''}
          <div class="toeic-audio-row"><button type="button" data-say-example="1">${esc(t.speakExample)}</button>${micButton()}</div>
          ${speechBox()}
        </div>`;
    }
    return `
      <div class="toeic-detail">
        ${
          showWord
            ? `<div class="toeic-answer-word">${esc(headword(w))} <span class="toeic-ipa">${esc(ipaOf(w))}</span></div>`
            : ''
        }
        ${noMeaning ? '' : `<div class="toeic-meaning">${esc(meaningOf(w))}</div>`}
        ${w.note ? `<div class="toeic-usage">💬 ${esc(w.note)}</div>` : ''}
        ${
          w.ex_en
            ? `<div class="toeic-example">
                 <div class="toeic-detail-label">${esc(t.example)}</div>
                 <div class="toeic-example-en">${exampleHtml(w)}</div>
                 ${w.ex_vi ? `<div class="toeic-example-vi">${esc(w.ex_vi)}</div>` : ''}
               </div>`
            : ''
        }
        <div class="toeic-audio-row">
          <button type="button" data-say-word="1">${esc(t.speak)}</button>
          <button type="button" data-say-slow="1">${esc(t.slow)}</button>
          ${w.ex_en ? `<button type="button" data-say-example="1">${esc(t.speakExample)}</button>` : ''}
          ${noMic ? '' : micButton()}
        </div>
        ${noMic ? '' : speechBox()}
      </div>`;
  }

  function bindAudio(w, scope = root()) {
    scope.querySelectorAll('[data-say-word]').forEach(b =>
      b.addEventListener('click', e => {
        e.stopPropagation();
        speak(sayText(w));
      })
    );
    scope.querySelectorAll('[data-say-slow]').forEach(b =>
      b.addEventListener('click', e => {
        e.stopPropagation();
        speak(sayText(w), 0.55);
      })
    );
    scope.querySelectorAll('[data-say-example]').forEach(b =>
      b.addEventListener('click', e => {
        e.stopPropagation();
        speak(w.ex_en, 0.9);
      })
    );
    scope.querySelectorAll('[data-mic]').forEach(b =>
      b.addEventListener('click', e => {
        e.stopPropagation();
        toggleMic(w);
      })
    );
    paintSpeech(w);
  }

  function renderSession() {
    const item = session.queue[session.index];
    if (!item) {
      screen = 'done';
      return render();
    }
    if (state.settings.mode === 'write') return renderWriteCard(item);
    if (state.settings.mode === 'speak') return renderSpeakCard(item);
    return renderFlipCard(item);
  }

  function renderFlipCard(item) {
    const t = T();
    const w = item.w;
    const front = frontSide(item);
    const card = state.cards[w.id];
    let frontHtml;
    if (front === 'fix') {
      frontHtml = `<span class="toeic-card-kicker">${esc(t.fixFront)}</span>
        <span class="toeic-card-front is-fix">${esc(w.phrase)}</span>
        ${w.context ? `<span class="toeic-card-context">${esc(w.context)}</span>` : ''}`;
    } else if (front === 'en') {
      const showIpa = state.settings.ipaFront || session.flipped;
      const ruby = showIpa ? rubyHtml(w) : '';
      if (ruby && !isTemplate(w)) {
        // Sentence / phrase: show every word with its own phonetic transcription.
        frontHtml = `<span class="toeic-card-front is-en">${ruby}</span>`;
      } else {
        frontHtml = `<span class="toeic-card-front is-en">${esc(headword(w))}</span>
        ${showIpa ? (ruby ? rubyHtml(w, 'is-small') : `<span class="toeic-ipa">${esc(ipaOf(w))}</span>`) : ''}`;
      }
    } else {
      frontHtml = `<span class="toeic-card-front is-vi">${esc(meaningOf(w))}</span>`;
    }
    let backHtml = '';
    if (session.flipped) {
      backHtml =
        front === 'vi'
          ? `<span class="toeic-card-divider"></span>${detailsHtml(w, { showWord: true }).replace(
              /<div class="toeic-meaning">[\s\S]*?<\/div>/,
              ''
            )}`
          : `<span class="toeic-card-divider"></span>${detailsHtml(w)}`;
    }

    root().innerHTML = `
      <div class="card toeic-session">
        ${sessionHead(item)}
        <div id="toeicCard" role="button" tabindex="0" class="toeic-card ${session.flipped ? 'is-flipped' : ''}" aria-live="polite">
          ${frontHtml}
          ${session.flipped ? backHtml : `<span class="toeic-card-hint">${esc(t.flip)}</span>`}
          ${card?.seen ? `<span class="toeic-card-box">${esc(t.boxLabel(card.box))}</span>` : ''}
        </div>
        ${
          !session.flipped && front !== 'vi' && !isFix(w)
            ? `<div class="toeic-audio-row is-center">
                 <button type="button" data-say-word="1">${esc(t.speak)}</button>
                 <button type="button" data-say-slow="1">${esc(t.slow)}</button>
               </div>`
            : ''
        }
        ${rateButtons(session.flipped)}
      </div>`;

    bindCommon();
    $('toeicBackBtn').addEventListener('click', endSession);
    $('toeicCard').addEventListener('click', e => {
      if (e.target.closest('button')) return;
      flip();
    });
    bindAudio(w);
    root()
      .querySelectorAll('[data-rate]')
      .forEach(b => b.addEventListener('click', () => rate(b.dataset.rate)));
    if (front === 'en' && !session.flipped && state.settings.autoSpeak && !item.spoken) {
      item.spoken = true;
      speak(sayText(w));
    }
  }

  // ---------- speaking practice (speech recognition) ----------
  // Engine 1: the browser's SpeechRecognition (Safari on iPad/iPhone/Mac, Chrome) — free, no key.
  // Engine 2 (fallback): the account's Groq Whisper function, if the browser has no recognizer.
  let speech = { id: null, status: 'idle' }; // status: idle | listening | processing | done | error
  let recognizer = null;
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  const micButton = () =>
    `<button type="button" data-mic="1" class="toeic-mic-btn">${esc(speech.status === 'listening' ? T().micStop : T().mic)}</button>`;
  const speechBox = () => `<div class="toeic-speech-result" data-speech-box aria-live="polite"></div>`;
  const speakTarget = w => (isFix(w) ? w.ex_en.split(' / ')[0] : sayText(w));

  const NUMBERS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve',
    'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'];
  const CONTRACTIONS = {
    "i'm": 'i am', "you're": 'you are', "we're": 'we are', "they're": 'they are', "it's": 'it is', "that's": 'that is',
    "what's": 'what is', "there's": 'there is', "here's": 'here is', "let's": 'let us', "i'll": 'i will', "you'll": 'you will',
    "we'll": 'we will', "i've": 'i have', "we've": 'we have', "i'd": 'i would', "don't": 'do not', "doesn't": 'does not',
    "didn't": 'did not', "isn't": 'is not', "aren't": 'are not', "can't": 'cannot', "won't": 'will not', "haven't": 'have not',
    "hasn't": 'has not', "wasn't": 'was not', "couldn't": 'could not', "shouldn't": 'should not', "he's": 'he is', "she's": 'she is',
  };
  /** Words for comparison: lowercase, no punctuation, contractions expanded, numbers as digits, "v s m" → "vsm". */
  function speechWords(text) {
    let s = String(text || '').toLowerCase().replace(/[’`]/g, "'").replace(/…/g, ' ');
    s = s.replace(/(\d)\.(\d)/g, '$1 point $2');
    const raw = s.replace(/[^a-z0-9'\s-]/g, ' ').replace(/-/g, ' ').split(/\s+/).filter(Boolean);
    const out = [];
    for (let tok of raw) {
      tok = tok.replace(/^'+|'+$/g, '');
      if (!tok) continue;
      const exp = CONTRACTIONS[tok];
      if (exp) out.push(...exp.split(' '));
      else if (/^[a-z]+'s$/.test(tok)) out.push(tok.slice(0, -2)); // "lin's" ≈ "lin"
      else out.push(NUMBERS.includes(tok) ? String(NUMBERS.indexOf(tok)) : tok);
    }
    // Join runs of single letters ("v s m" → "vsm") so spoken abbreviations match.
    const merged = [];
    for (let i = 0; i < out.length; ) {
      let j = i;
      // Articles "a" / pronoun "i" never start an abbreviation run.
      if (/^[b-hj-z]$/.test(out[i])) while (j < out.length && /^[a-z]$/.test(out[j])) j++;
      if (j - i >= 2) {
        merged.push(out.slice(i, j).join(''));
        i = j;
      } else {
        merged.push(out[i]);
        i++;
      }
    }
    return merged;
  }

  /** Align target and heard words (LCS); returns per-target-word match flags and a 0–100 score. */
  function compareSpeech(target, heard) {
    const a = speechWords(target);
    const b = speechWords(heard);
    const n = a.length;
    const m = b.length;
    const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
    for (let i = n - 1; i >= 0; i--)
      for (let j = m - 1; j >= 0; j--)
        dp[i][j] = a[i] === b[j] || (a[i].length > 3 && b[j].startsWith(a[i].slice(0, -1)) && Math.abs(a[i].length - b[j].length) <= 2)
          ? dp[i + 1][j + 1] + 1
          : Math.max(dp[i + 1][j], dp[i][j + 1]);
    const ok = new Array(n).fill(false);
    let i = 0;
    let j = 0;
    while (i < n && j < m) {
      const same = a[i] === b[j] || (a[i].length > 3 && b[j].startsWith(a[i].slice(0, -1)) && Math.abs(a[i].length - b[j].length) <= 2);
      if (same && dp[i][j] === dp[i + 1][j + 1] + 1) {
        ok[i] = true;
        i++;
        j++;
      } else if (dp[i + 1][j] >= dp[i][j + 1]) i++;
      else j++;
    }
    const matched = ok.filter(Boolean).length;
    const extra = Math.max(0, m - matched);
    const score = n ? Math.round((100 * matched) / (n + Math.max(0, extra - 1) * 0.5)) : 0;
    return { words: a, ok, score: Math.max(0, Math.min(100, score)) };
  }

  function scoreToRating(score) {
    if (score >= 95) return 'easy';
    if (score >= 80) return 'good';
    if (score >= 55) return 'hard';
    return 'again';
  }

  function paintSpeech(w) {
    const t = T();
    root()
      ?.querySelectorAll('[data-mic]')
      .forEach(b => {
        b.textContent = speech.id === w.id && speech.status === 'listening' ? t.micStop : t.mic;
        b.classList.toggle('is-listening', speech.id === w.id && speech.status === 'listening');
      });
    const box = root()?.querySelector('[data-speech-box]');
    if (!box) return;
    if (speech.id !== w.id || speech.status === 'idle') {
      box.innerHTML = '';
      return;
    }
    if (speech.status === 'listening') box.innerHTML = `<div class="toeic-speech-status is-live">${esc(t.listening)} ${speech.interim ? `<i>${esc(speech.interim)}</i>` : ''}</div>`;
    else if (speech.status === 'processing') box.innerHTML = `<div class="toeic-speech-status">${esc(t.processing)}</div>`;
    else if (speech.status === 'error') box.innerHTML = `<div class="toeic-speech-status is-error">${esc(speech.message)}</div>`;
    else {
      const r = speech.result;
      const verdict = r.score >= 90 ? t.scoreGreat : r.score >= 65 ? t.scoreGood : t.scoreTry;
      const cls = r.score >= 90 ? 'is-great' : r.score >= 65 ? 'is-good' : 'is-try';
      box.innerHTML = `
        <div class="toeic-speech-card ${cls}">
          <div class="toeic-speech-score"><strong>${r.score}%</strong><span>${esc(verdict)}</span></div>
          <div class="toeic-speech-words">${r.words.map((wd, i) => `<span class="${r.ok[i] ? 'ok' : 'miss'}">${esc(wd)}</span>`).join(' ')}</div>
          <div class="toeic-speech-heard"><span>${esc(t.youSaid)}${speech.engine === 'groq' ? ` (${esc(t.speechEngineGroq)})` : ''}:</span> “${esc(speech.heard || '—')}”</div>
        </div>`;
    }
    // Highlight the suggested rating button.
    root()
      ?.querySelectorAll('[data-rate]')
      .forEach(b => b.classList.toggle('is-suggested', speech.status === 'done' && speech.id === w.id && b.dataset.rate === scoreToRating(speech.result.score)));
  }

  function stopMic() {
    try {
      recognizer?.stop();
    } catch {
      /* already stopped */
    }
    recognizer = null;
  }

  function finishSpeech(w, alternatives, engine) {
    const target = speakTarget(w);
    let best = null;
    for (const alt of alternatives.filter(Boolean)) {
      const r = compareSpeech(target, alt);
      if (!best || r.score > best.r.score) best = { r, alt };
    }
    if (!best) {
      speech = { id: w.id, status: 'error', message: T().speechNoResult };
    } else {
      speech = { id: w.id, status: 'done', result: best.r, heard: best.alt, engine };
      if (session && session.queue[session.index]?.w.id === w.id && state.settings.mode === 'speak' && !session.checked) {
        session.checked = true;
        renderSession();
        return;
      }
    }
    paintSpeech(w);
  }

  async function toggleMic(w) {
    if (speech.id === w.id && speech.status === 'listening') {
      stopMic();
      return;
    }
    window.speechSynthesis?.cancel?.();
    stopMic();
    if (Recognition) return listenBrowser(w);
    return listenGroq(w);
  }

  function listenBrowser(w) {
    const rec = new Recognition();
    recognizer = rec;
    rec.lang = 'en-US';
    rec.interimResults = true;
    rec.maxAlternatives = 5;
    rec.continuous = false;
    const alts = [];
    let gotFinal = false;
    speech = { id: w.id, status: 'listening', interim: '' };
    paintSpeech(w);
    const words = speechWords(speakTarget(w)).length;
    const guard = setTimeout(() => {
      try {
        rec.stop();
      } catch {
        /* ignore */
      }
    }, Math.min(15000, 4000 + words * 700));
    rec.onresult = e => {
      let interim = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const res = e.results[i];
        if (res.isFinal) {
          gotFinal = true;
          for (let k = 0; k < res.length; k++) alts.push(res[k].transcript);
        } else interim += res[0].transcript;
      }
      if (!gotFinal && speech.id === w.id) {
        speech.interim = interim;
        paintSpeech(w);
      }
    };
    rec.onerror = e => {
      clearTimeout(guard);
      const code = e.error;
      if (code === 'not-allowed' || code === 'service-not-allowed') speech = { id: w.id, status: 'error', message: T().speechDenied };
      else if (code === 'network') speech = { id: w.id, status: 'error', message: T().speechNetwork };
      else if (code === 'no-speech' || code === 'aborted') speech = { id: w.id, status: 'error', message: T().speechNoResult };
      else speech = { id: w.id, status: 'error', message: `${T().speechNoResult} (${code})` };
      paintSpeech(w);
    };
    rec.onend = () => {
      clearTimeout(guard);
      if (recognizer === rec) recognizer = null;
      if (speech.status === 'error') return;
      if (!alts.length && speech.interim) alts.push(speech.interim);
      finishSpeech(w, alts, 'browser');
    };
    try {
      rec.start();
    } catch (err) {
      speech = { id: w.id, status: 'error', message: String(err.message || err) };
      paintSpeech(w);
    }
  }

  async function listenGroq(w) {
    const t = T();
    const auth = window.TOCFLAuth;
    if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder || !auth?.transcribeWithGroq || !auth.getSession?.()?.user) {
      speech = { id: w.id, status: 'error', message: t.speechUnsupported };
      paintSpeech(w);
      return;
    }
    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      speech = { id: w.id, status: 'error', message: t.speechDenied };
      paintSpeech(w);
      return;
    }
    const words = speechWords(speakTarget(w)).length;
    const recorder = new MediaRecorder(stream);
    const chunks = [];
    recorder.ondataavailable = e => e.data?.size && chunks.push(e.data);
    const stopped = new Promise(resolve => (recorder.onstop = resolve));
    recognizer = { stop: () => recorder.state === 'recording' && recorder.stop() };
    speech = { id: w.id, status: 'listening', interim: '' };
    paintSpeech(w);
    recorder.start(250);
    const guard = setTimeout(() => recognizer?.stop(), Math.min(10000, 2500 + words * 500));
    await stopped;
    clearTimeout(guard);
    recognizer = null;
    stream.getTracks().forEach(tr => tr.stop());
    speech = { id: w.id, status: 'processing' };
    paintSpeech(w);
    try {
      const blob = new Blob(chunks, { type: recorder.mimeType || 'audio/webm' });
      const data = await auth.transcribeWithGroq(blob, speakTarget(w), { language: 'en' });
      const text = String(data?.text || '');
      if (/[㐀-鿿]/.test(text)) {
        speech = { id: w.id, status: 'error', message: t.speechGroqZh };
        paintSpeech(w);
        return;
      }
      finishSpeech(w, [text], 'groq');
    } catch (err) {
      speech = { id: w.id, status: 'error', message: err?.message || t.speechNoResult };
      paintSpeech(w);
    }
  }

  function renderSpeakCard(item) {
    const t = T();
    const w = item.w;
    const fix = isFix(w);
    const checked = session.checked;
    root().innerHTML = `
      <div class="card toeic-session toeic-speak">
        ${sessionHead(item)}
        <div class="toeic-speak-prompt">
          <div class="small muted">${esc(fix ? t.speakFix : t.speakPrompt)}</div>
          <div class="toeic-speak-text">${!fix && rubyHtml(w) ? rubyHtml(w) : esc(speakTarget(w))}</div>
          ${!fix && w.ipa && !rubyHtml(w) ? `<div class="toeic-ipa">${esc(ipaOf(w))}</div>` : ''}
          ${!fix ? `<div class="toeic-speak-meaning">${esc(meaningOf(w))}</div>` : ''}
          <div class="toeic-audio-row">
            <button type="button" data-say-target="1">${esc(t.speak)}</button>
            <button type="button" data-say-target-slow="1">${esc(t.slow)}</button>
          </div>
          <button type="button" data-mic="1" class="toeic-mic-btn is-big">${esc(t.mic)}</button>
          <div class="small muted">${esc(t.speakHint)}</div>
          ${speechBox()}
          ${checked ? '' : `<button type="button" id="toeicSpeakReveal" class="toeic-link-btn">${esc(t.showAnswer)}</button>`}
        </div>
        ${checked ? detailsHtml(w, { hideMeaning: !fix, noMic: true }) : ''}
        ${rateButtons(checked)}
      </div>`;
    bindCommon();
    $('toeicBackBtn').addEventListener('click', endSession);
    root().querySelector('[data-say-target]').addEventListener('click', () => speak(speakTarget(w)));
    root().querySelector('[data-say-target-slow]').addEventListener('click', () => speak(speakTarget(w), 0.55));
    $('toeicSpeakReveal')?.addEventListener('click', () => {
      session.checked = true;
      renderSession();
    });
    bindAudio(w);
    root()
      .querySelectorAll('[data-rate]')
      .forEach(b => b.addEventListener('click', () => rate(b.dataset.rate)));
  }

  // ---------- writing mode ----------
  let pad_ = null; // active WritingPad

  function renderWriteCard(item) {
    const t = T();
    const w = item.w;
    const fix = isFix(w);
    const answer = writeAnswer(w);
    const checked = session.checked;
    const typed = session.typed || '';
    const normalize = s =>
      String(s).toLowerCase().replace(/[’']/g, "'").replace(/[^a-z0-9'£ ]/g, ' ').replace(/\s+/g, ' ').trim();
    const typedOk = typed && normalize(typed) === normalize(answer);

    root().innerHTML = `
      <div class="card toeic-session toeic-write">
        ${sessionHead(item)}
        <div class="toeic-write-prompt">
          <div class="small muted">${esc(fix ? t.writeFixPrompt : isSentence(w) ? t.writeSentencePrompt : t.writePrompt)}</div>
          <div class="toeic-write-meaning">${esc(fix ? w.phrase : meaningOf(w))}</div>
          ${fix && w.context ? `<div class="toeic-card-context">${esc(w.context)}</div>` : ''}
          <div class="toeic-audio-row">
            ${fix ? '' : `<button type="button" data-say-word="1">${esc(t.speak)}</button>
            <button type="button" data-say-slow="1">${esc(t.slow)}</button>`}
            <button type="button" id="toeicHintBtn">${esc(t.hint)}</button>
            <label class="toeic-check is-inline"><input id="toeicTrace" type="checkbox" ${state.settings.trace ? 'checked' : ''}> ${esc(t.trace)}</label>
          </div>
          <div id="toeicHint" class="small muted" ${session.hint ? '' : 'hidden'}>${esc(
            t.hintText(answer.charAt(0), answer.replace(/[^A-Za-z]/g, '').length)
          )}${w.ipa ? ` · ${esc(ipaOf(w))}` : ''}</div>
        </div>
        <div class="toeic-pad-wrap">
          <canvas id="toeicPad" class="toeic-pad" aria-label="Writing pad"></canvas>
          <div class="toeic-pad-tools">
            <button type="button" id="toeicUndo">${esc(t.undo)}</button>
            <button type="button" id="toeicClear">${esc(t.clear)}</button>
          </div>
        </div>
        <input id="toeicTyped" class="toeic-typed" type="text" autocomplete="off" autocapitalize="off" spellcheck="false"
          placeholder="${esc(t.typeHere)}" value="${esc(typed)}" ${checked ? 'readonly' : ''}>
        <div class="small muted">${esc(t.penTip)}</div>
        ${
          checked
            ? `<div class="toeic-write-result ${typed ? (typedOk ? 'is-right' : 'is-wrong') : ''}">
                 ${typed ? `<div><strong>${esc(typedOk ? t.typedRight : t.typedWrong)}</strong></div>` : `<div class="small">${esc(t.selfCheck)}</div>`}
                 ${typed && !typedOk ? `<div class="toeic-diff"><span>${esc(t.yourAnswer)}:</span> ${diffHtml(typed, answer)}</div>` : ''}
                 <div class="toeic-diff"><span>${esc(t.answer)}:</span> <b>${esc(answer)}</b> ${fix ? '' : `<span class="toeic-ipa">${esc(ipaOf(w))}</span>`}</div>
               </div>
               ${detailsHtml(w, { hideMeaning: true })}`
            : `<button id="toeicCheckBtn" class="primary toeic-big-btn" type="button">${esc(t.check)}</button>`
        }
        ${rateButtons(checked)}
      </div>`;

    bindCommon();
    $('toeicBackBtn').addEventListener('click', endSession);
    bindAudio(w);
    $('toeicHintBtn').addEventListener('click', () => {
      session.hint = !session.hint;
      $('toeicHint').hidden = !session.hint;
    });
    $('toeicTrace').addEventListener('change', e => {
      setSetting({ trace: e.target.checked });
      pad_?.setGuide(e.target.checked || checked ? answer : '', checked && !e.target.checked);
    });
    $('toeicTyped').addEventListener('input', e => {
      session.typed = e.target.value;
    });
    $('toeicTyped').addEventListener('keydown', e => {
      if (e.key === 'Enter' && !session.checked) {
        e.preventDefault();
        checkWriting();
      }
    });
    $('toeicCheckBtn')?.addEventListener('click', checkWriting);
    root()
      .querySelectorAll('[data-rate]')
      .forEach(b => b.addEventListener('click', () => rate(b.dataset.rate)));

    // Keep the strokes when re-rendering the same card (e.g. after "Xem đáp án").
    const strokes = session.strokesFor === w.id ? session.strokes : [];
    pad_ = new WritingPad($('toeicPad'), strokes, s => {
      session.strokes = s;
      session.strokesFor = w.id;
    });
    if (state.settings.trace) pad_.setGuide(answer);
    else if (checked) pad_.setGuide(answer, true);
    $('toeicUndo').addEventListener('click', () => pad_.undo());
    $('toeicClear').addEventListener('click', () => pad_.clear());

    if (!fix && state.settings.autoSpeak && !item.spoken) {
      item.spoken = true;
      speak(sayText(w));
    }
  }

  function checkWriting() {
    if (!session) return;
    session.checked = true;
    renderSession();
    const w = session.queue[session.index]?.w;
    if (w && !isFix(w)) speak(sayText(w));
  }

  /** Letter-by-letter comparison of the typed answer with the expected one. */
  function diffHtml(typed, answer) {
    const a = typed.trim();
    const b = answer;
    let out = '';
    for (let i = 0; i < Math.max(a.length, b.length); i++) {
      const ca = a[i] ?? '';
      const cb = b[i] ?? '';
      if (!ca) out += `<i class="is-missing">_</i>`;
      else if (ca.toLowerCase() === cb.toLowerCase()) out += esc(ca);
      else out += `<i class="is-wrong">${esc(ca)}</i>`;
    }
    return out;
  }

  /**
   * Handwriting canvas: pointer events (Apple Pencil, finger, mouse), pressure-aware strokes,
   * palm rejection once a pen is detected, English four-line guide, optional faint tracing text.
   */
  class WritingPad {
    constructor(canvas, strokes = [], onChange = () => {}) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.strokes = strokes.map(s => s.slice());
      this.onChange = onChange;
      this.current = null;
      this.penSeen = false;
      this.guide = '';
      this.reveal = false;
      this.resize = this.resize.bind(this);
      this.resize();
      window.addEventListener('resize', this.resize);
      canvas.addEventListener('pointerdown', e => this.down(e));
      canvas.addEventListener('pointermove', e => this.move(e));
      canvas.addEventListener('pointerup', e => this.up(e));
      canvas.addEventListener('pointercancel', e => this.up(e));
      canvas.addEventListener('pointerleave', e => this.up(e));
      // Stop iOS from scrolling / selecting while writing.
      canvas.addEventListener('touchstart', e => e.preventDefault(), { passive: false });
      canvas.addEventListener('touchmove', e => e.preventDefault(), { passive: false });
    }
    resize() {
      if (!this.canvas.isConnected) {
        window.removeEventListener('resize', this.resize);
        return;
      }
      const rect = this.canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 3);
      this.w = Math.max(200, rect.width);
      this.h = Math.max(160, rect.height);
      this.canvas.width = Math.round(this.w * dpr);
      this.canvas.height = Math.round(this.h * dpr);
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      this.draw();
    }
    point(e) {
      const rect = this.canvas.getBoundingClientRect();
      // Normalised coordinates survive orientation changes.
      return [(e.clientX - rect.left) / rect.width, (e.clientY - rect.top) / rect.height, e.pressure || 0.5];
    }
    down(e) {
      if (e.pointerType === 'pen') this.penSeen = true;
      if (this.penSeen && e.pointerType === 'touch') return; // palm rejection
      e.preventDefault();
      try {
        this.canvas.setPointerCapture?.(e.pointerId);
      } catch {
        /* synthetic or already-released pointer */
      }
      this.current = { id: e.pointerId, pts: [this.point(e)], pen: e.pointerType === 'pen' };
    }
    move(e) {
      if (!this.current || e.pointerId !== this.current.id) return;
      e.preventDefault();
      const coalesced = e.getCoalescedEvents ? e.getCoalescedEvents() : [];
      const events = coalesced.length ? coalesced : [e];
      for (const ev of events) this.current.pts.push(this.point(ev));
      this.draw();
    }
    up(e) {
      if (!this.current || e.pointerId !== this.current.id) return;
      if (this.current.pts.length === 1) this.current.pts.push(this.current.pts[0]);
      this.strokes.push(this.current.pts);
      this.current = null;
      this.onChange(this.strokes);
      this.draw();
    }
    undo() {
      this.strokes.pop();
      this.onChange(this.strokes);
      this.draw();
    }
    clear() {
      this.strokes = [];
      this.onChange(this.strokes);
      this.draw();
    }
    setGuide(text, reveal = false) {
      this.guide = text || '';
      this.reveal = reveal;
      this.draw();
    }
    draw() {
      const { ctx, w, h } = this;
      ctx.clearRect(0, 0, w, h);
      // Four-line handwriting guide (ascender, x-height, baseline, descender).
      const top = h * 0.18;
      const base = h * 0.7;
      const xh = top + (base - top) * 0.45;
      const desc = Math.min(h * 0.92, base + (base - top) * 0.4);
      const line = (y, color, dash) => {
        ctx.beginPath();
        ctx.setLineDash(dash || []);
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.moveTo(12, y);
        ctx.lineTo(w - 12, y);
        ctx.stroke();
      };
      line(top, '#d5e3df');
      line(xh, '#e2ecea', [6, 6]);
      line(base, '#9fbab4');
      line(desc, '#e2ecea', [6, 6]);
      ctx.setLineDash([]);
      if (this.guide) {
        const size = base - top;
        ctx.font = `${Math.round(size * 0.95)}px "Comic Sans MS", "Chalkboard SE", "Segoe Print", "Bradley Hand", cursive, sans-serif`;
        let fontSize = Math.round(size * 0.95);
        while (ctx.measureText(this.guide).width > w - 32 && fontSize > 14) {
          fontSize -= 2;
          ctx.font = `${fontSize}px "Comic Sans MS", "Chalkboard SE", "Segoe Print", "Bradley Hand", cursive, sans-serif`;
        }
        ctx.fillStyle = this.reveal ? 'rgba(15,118,110,0.28)' : 'rgba(21,35,33,0.13)';
        ctx.textBaseline = 'alphabetic';
        ctx.fillText(this.guide, 18, base);
      }
      const all = this.current ? [...this.strokes, this.current.pts] : this.strokes;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = '#1d3b8a';
      for (const pts of all) {
        for (let i = 1; i < pts.length; i++) {
          const [x0, y0, p0] = pts[i - 1];
          const [x1, y1, p1] = pts[i];
          ctx.lineWidth = 1.6 + 3.4 * ((p0 + p1) / 2);
          ctx.beginPath();
          ctx.moveTo(x0 * w, y0 * h);
          ctx.lineTo(x1 * w, y1 * h);
          ctx.stroke();
        }
      }
    }
  }

  // ---------- session flow ----------
  function flip() {
    if (!session || screen !== 'session' || state.settings.mode === 'write' || state.settings.mode === 'speak') return;
    session.flipped = !session.flipped;
    const item = session.queue[session.index];
    if (session.flipped && state.settings.autoSpeak && item && frontSide(item) === 'vi') speak(sayText(item.w));
    renderSession();
  }

  function rate(rating) {
    if (!session) return;
    if (state.settings.mode === 'write' || state.settings.mode === 'speak' ? !session.checked : !session.flipped) return;
    const item = session.queue[session.index];
    grade(item.w, rating);
    session.reviewed += 1;
    if (rating === 'again') {
      session.again += 1;
      if (!session.requeued.has(item.w.id)) {
        session.requeued.add(item.w.id);
        const pos = Math.min(session.queue.length, session.index + 5);
        session.queue.splice(pos, 0, { w: item.w, isNew: false, front: item.front });
      }
    }
    session.index += 1;
    session.flipped = false;
    session.checked = false;
    session.typed = '';
    session.hint = false;
    session.strokes = [];
    stopMic();
    speech = { id: null, status: 'idle' };
    renderSession();
  }

  function endSession() {
    window.speechSynthesis?.cancel?.();
    stopMic();
    session = null;
    screen = 'home';
    render();
  }

  function renderDone() {
    const t = T();
    const next = currentUnit();
    root().innerHTML = `
      <div class="card toeic-done">
        <div class="toeic-done-icon">🎉</div>
        <h2>${esc(t.sessionDone)}</h2>
        <p>${esc(t.sessionSummary(session.reviewed, session.again))}</p>
        <div class="toeic-actions">
          <button id="toeicHomeBtn" class="primary" type="button">${esc(t.back)}</button>
          ${next ? `<button id="toeicNextBtn" type="button">${esc(t.studyNext)} · ${esc(unitLabel(next))}</button>` : ''}
        </div>
      </div>`;
    $('toeicHomeBtn').addEventListener('click', endSession);
    $('toeicNextBtn')?.addEventListener('click', () => startSession(next));
  }

  // ---------- word list / group view ----------
  function renderList() {
    const t = T();
    const u = listUnit || currentUnit() || planUnits()[0];
    const words = unitWords(u);
    const isGroup = isGroupSet(u.set);
    const g = isGroup ? groupInfo(u) : null;
    const extra = u.set === 'FO' && groupInfo({ set: 'FO', day: 11 }) ? [{ set: 'FO', day: 11 }] : [];
    const units = [...planUnits(SET_DECK[u.set] || 'toeic'), ...extra];
    const options = units
      .map(p => `<option value="${p.set}-${p.day}" ${p.set === u.set && p.day === u.day ? 'selected' : ''}>${esc(unitLabel(p))}</option>`)
      .join('');
    const notesHtml = g
      ? `${g.intro ? `<div class="toeic-group-intro">${esc(g.intro)}</div>` : ''}
         ${
           g.table?.length
             ? `<div class="toeic-group-table">${g.table
                 .map(r => `<div><b>${esc(r[0])}</b><span>${esc(r[1])}</span><em>${esc(r[2] || '')}</em></div>`)
                 .join('')}</div>`
             : ''
         }
         ${
           g.notes?.length
             ? `<details class="toeic-notes" ${u.day === 11 ? 'open' : ''}><summary>${esc(t.groupNotes)}</summary>${g.notes
                 .map(p => {
                   const heading = /^(Bài mẫu|Phân biệt|Lựa chọn cá nhân|Sự thay đổi lựa chọn)/.test(p);
                   return heading ? `<h4>${esc(p)}</h4>` : `<p>${esc(p)}</p>`;
                 })
                 .join('')}</details>`
             : ''
         }`
      : '';

    root().innerHTML = `
      <div class="card toeic-list">
        <div class="toeic-session-head">
          <button id="toeicBackBtn" type="button">${esc(t.back)}</button>
          <select id="toeicUnitSelect" aria-label="${esc(t.chooseUnit)}">${options}</select>
          ${
            words.length
              ? `<button id="toeicStudyUnitBtn" class="primary" type="button">${esc(t.studyThisUnit)}</button>
                 <button id="toeicWriteUnitBtn" type="button">${esc(t.writeThisUnit)}</button>`
              : ''
          }
        </div>
        ${notesHtml}
        ${words.length ? `<label class="toeic-check"><input id="toeicHideMeaning" type="checkbox" ${hideMeaning ? 'checked' : ''}> ${esc(t.hideMeaning)}</label>` : ''}
        <div class="toeic-word-list ${hideMeaning ? 'hide-meaning' : ''}">
          ${words
            .map(w => {
              const c = state.cards[w.id];
              const box = c?.box || 0;
              if (isFix(w)) {
                return `<div class="toeic-word-row is-fix box-${Math.min(box, MASTERED_BOX)}">
                  <span class="toeic-word-no">${w.no}</span>
                  <div class="toeic-word-main"><s>${esc(w.phrase)}</s>${w.context ? `<small>${esc(w.context)}</small>` : ''}</div>
                  <div class="toeic-word-vi" tabindex="0"><b>${esc(w.ex_en)}</b><small>${esc(w.meaning)}</small></div>
                  <span class="toeic-word-box">${esc(t.boxLabel(c?.seen ? box : 0))}</span>
                </div>`;
              }
              return `<div class="toeic-word-row box-${Math.min(box, MASTERED_BOX)}">
                <span class="toeic-word-no">${w.no}</span>
                <div class="toeic-word-main">
                  <button type="button" class="toeic-word-en" data-speak="${esc(sayText(w))}">${esc(headword(w))} <span aria-hidden="true">🔊</span></button>
                  <span class="toeic-ipa">${esc(ipaOf(w))}</span>
                </div>
                <div class="toeic-word-vi" tabindex="0">
                  <span>${esc(meaningOf(w))}</span>
                  ${w.ex_en ? `<small class="toeic-word-ex" data-speak="${esc(w.ex_en)}">${exampleHtml(w)}<br><i>${esc(w.ex_vi || '')}</i></small>` : ''}
                </div>
                <span class="toeic-word-box">${esc(t.boxLabel(c?.seen ? box : 0))}</span>
              </div>`;
            })
            .join('')}
        </div>
        ${words.length ? `<button id="toeicResetUnitBtn" type="button" class="danger">${esc(t.resetUnit)}</button>` : ''}
      </div>`;
    $('toeicBackBtn').addEventListener('click', () => {
      screen = 'home';
      render();
    });
    $('toeicUnitSelect').addEventListener('change', e => {
      const [set, day] = e.target.value.split('-');
      listUnit = { set, day: Number(day) };
      renderList();
    });
    $('toeicStudyUnitBtn')?.addEventListener('click', () => {
      if (state.settings.mode === 'write' || state.settings.mode === 'speak') setSetting({ mode: 'flip' });
      startSession(u);
    });
    $('toeicWriteUnitBtn')?.addEventListener('click', () => startSession(u, { forceWrite: true }));
    $('toeicHideMeaning')?.addEventListener('change', e => {
      hideMeaning = e.target.checked;
      renderList();
    });
    root()
      .querySelectorAll('[data-speak]')
      .forEach(b =>
        b.addEventListener('click', e => {
          e.stopPropagation();
          speak(b.dataset.speak);
        })
      );
    root()
      .querySelectorAll('.toeic-word-vi')
      .forEach(el => el.addEventListener('click', () => el.classList.toggle('is-revealed')));
    $('toeicResetUnitBtn')?.addEventListener('click', () => {
      if (!confirm(t.resetConfirm)) return;
      for (const w of words) delete state.cards[w.id];
      save();
      renderList();
    });
  }

  // ---------- modals ----------
  function modal(html) {
    closeModal();
    const wrap = document.createElement('div');
    wrap.className = 'modal-overlay toeic-modal';
    wrap.id = 'toeicModal';
    wrap.innerHTML = `<div class="modal-card toeic-modal-card" role="dialog" aria-modal="true">${html}</div>`;
    wrap.addEventListener('click', e => {
      if (e.target === wrap) closeModal();
    });
    document.body.append(wrap);
    return wrap;
  }
  function closeModal() {
    $('toeicModal')?.remove();
  }

  function openSettingsModal() {
    const t = T();
    const s = state.settings;
    const opt = (v, label, cur) => `<option value="${v}" ${String(cur) === String(v) ? 'selected' : ''}>${esc(label)}</option>`;
    const m = modal(`
      <h2>${esc(t.settings)}</h2>
      <label class="toeic-field">${esc(t.order)}
        <select id="toeicOrder">
          ${opt('alternate', t.orderAlternate, s.order)}${opt('lc-first', t.orderLcFirst, s.order)}
          ${opt('lc-only', t.orderLcOnly, s.order)}${opt('rc-only', t.orderRcOnly, s.order)}
        </select></label>
      <label class="toeic-field">${esc(t.direction)}
        <select id="toeicDirection">
          ${opt('en-vi', t.dirEnVi, s.direction)}${opt('vi-en', t.dirViEn, s.direction)}${opt('mixed', t.dirMixed, s.direction)}
        </select></label>
      <label class="toeic-field">${esc(t.newPerDay)}
        <select id="toeicNewPer">
          ${opt(10, '10', s.newPerSession)}${opt(20, '20', s.newPerSession)}${opt(30, '30', s.newPerSession)}${opt(60, t.wholeUnit, s.newPerSession)}
        </select></label>
      <label class="toeic-check"><input id="toeicAutoSpeak" type="checkbox" ${s.autoSpeak ? 'checked' : ''}> ${esc(t.autoSpeak)}</label>
      <label class="toeic-check"><input id="toeicIpaFront" type="checkbox" ${s.ipaFront ? 'checked' : ''}> ${esc(t.showIpaFront)}</label>
      <div class="toeic-actions">
        <button id="toeicSettingsSave" class="primary" type="button">${esc(t.save)}</button>
        <button id="toeicSettingsClose" type="button">${esc(t.close)}</button>
      </div>`);
    m.querySelector('#toeicSettingsClose').addEventListener('click', closeModal);
    m.querySelector('#toeicSettingsSave').addEventListener('click', () => {
      const order = m.querySelector('#toeicOrder').value;
      setSetting({
        order: PLAN_ORDERS.includes(order) ? order : 'alternate',
        direction: m.querySelector('#toeicDirection').value,
        newPerSession: Number(m.querySelector('#toeicNewPer').value) || 60,
        autoSpeak: m.querySelector('#toeicAutoSpeak').checked,
        ipaFront: m.querySelector('#toeicIpaFront').checked,
      });
      closeModal();
      render();
    });
  }

  function openCalendarModal() {
    const t = T();
    const c = state.calendar;
    const startDefault = dayKey();
    const alarmOpt = m =>
      `<option value="${m}" ${Number(c.alarm) === m ? 'selected' : ''}>${esc(m ? t.calMinutes(m) : t.calAlarmOnTime)}</option>`;
    const durOpt = m => `<option value="${m}" ${Number(c.duration) === m ? 'selected' : ''}>${esc(t.calMinutes(m))}</option>`;
    const m = modal(`
      <h2>${esc(t.calTitle)}</h2>
      <p class="muted">${esc(t.calDesc)}</p>
      <div class="toeic-cal-grid">
        <label class="toeic-field">${esc(t.calStart)}<input id="toeicCalStart" type="date" value="${startDefault}"></label>
        <label class="toeic-field">${esc(t.calTime)}<input id="toeicCalTime" type="time" value="${esc(c.time)}"></label>
        <label class="toeic-field">${esc(t.calDuration)}<select id="toeicCalDuration">${[15, 30, 45, 60].map(durOpt).join('')}</select></label>
        <label class="toeic-field">${esc(t.calAlarm)}<select id="toeicCalAlarm">${[0, 5, 10, 30].map(alarmOpt).join('')}</select></label>
      </div>
      <label class="toeic-check"><input id="toeicCalChinese" type="checkbox" ${c.chinese ? 'checked' : ''}> ${esc(t.calChinese)}</label>
      <div class="toeic-cal-buttons">
        <button id="toeicCalIcs" class="primary" type="button">${esc(t.calIcs)}</button>
        <a id="toeicCalGoogle" class="file-btn toeic-google-btn" target="_blank" rel="noopener">${esc(t.calGoogle)}</a>
      </div>
      <p class="small muted">${esc(t.calHelp)}</p>
      <div id="toeicCalStatus" class="small" aria-live="polite"></div>
      <div class="toeic-actions"><button id="toeicCalClose" type="button">${esc(t.close)}</button></div>`);

    const read = () => {
      const timeVal = m.querySelector('#toeicCalTime').value;
      const opts = {
        start: m.querySelector('#toeicCalStart').value || startDefault,
        time: /^\d{2}:\d{2}$/.test(timeVal) ? timeVal : '20:00',
        duration: Number(m.querySelector('#toeicCalDuration').value) || 30,
        alarm: Number(m.querySelector('#toeicCalAlarm').value) || 0,
        chinese: m.querySelector('#toeicCalChinese').checked,
      };
      state.calendar = { time: opts.time, duration: opts.duration, alarm: opts.alarm, chinese: opts.chinese };
      return opts;
    };
    const refreshGoogle = () => {
      m.querySelector('#toeicCalGoogle').href = googleCalendarUrl(read());
    };
    m.querySelectorAll('input,select').forEach(el => el.addEventListener('change', refreshGoogle));
    refreshGoogle();
    m.querySelector('#toeicCalGoogle').addEventListener('click', () => {
      refreshGoogle();
      save();
    });
    m.querySelector('#toeicCalIcs').addEventListener('click', () => {
      const opts = read();
      save();
      downloadIcs(buildIcs(opts));
      m.querySelector('#toeicCalStatus').textContent = t.calDone;
    });
    m.querySelector('#toeicCalClose').addEventListener('click', closeModal);
  }

  // ---------- calendar ----------
  function appUrl() {
    const u = new URL(window.location.href);
    u.hash = 'toeic';
    u.search = '';
    return u.toString();
  }

  function remainingUnits() {
    const plan = planUnits();
    const cur = currentUnit();
    const idx = cur ? plan.findIndex(u => u.set === cur.set && u.day === cur.day) : plan.length;
    return plan.slice(Math.max(0, idx));
  }

  function eventStart(dateKey, time) {
    const [h, min] = time.split(':').map(Number);
    const d = parseDay(dateKey);
    d.setHours(h, min, 0, 0);
    return d;
  }

  const icsUtc = d =>
    `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;
  const icsEscape = s => String(s).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');

  function fold(line) {
    const enc = new TextEncoder();
    if (enc.encode(line).length <= 75) return line;
    const out = [];
    let cur = '';
    let limit = 75;
    for (const ch of line) {
      if (enc.encode(cur + ch).length > limit) {
        out.push(cur);
        cur = ch;
        limit = 74;
      } else cur += ch;
    }
    out.push(cur);
    return out.join('\r\n ');
  }

  function buildIcs(opts) {
    const t = T();
    const units = remainingUnits();
    const url = appUrl();
    const stamp = icsUtc(new Date());
    const lines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//LearningChinese//English Study Plan//VI',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      `X-WR-CALNAME:${icsEscape(`${DECKS[deckId()].label} Study Plan`)}`,
    ];
    const list = units.length ? units : [null];
    list.forEach((u, i) => {
      const start = eventStart(addDays(opts.start, i), opts.time);
      const end = new Date(start.getTime() + opts.duration * 60000);
      const label = u ? unitLabel(u) : '';
      const summary = u ? t.calEventTitle(label) : t.calEventTitleGeneric;
      const body = `${u ? t.calEventBody(label, opts.chinese) : ''}\n${url}`.trim();
      lines.push(
        'BEGIN:VEVENT',
        `UID:${deckId()}-${opts.start}-${i}-${u ? `${u.set}${u.day}` : 'x'}@learningchinese`,
        `DTSTAMP:${stamp}`,
        `DTSTART:${icsUtc(start)}`,
        `DTEND:${icsUtc(end)}`,
        `SUMMARY:${icsEscape(summary)}`,
        `DESCRIPTION:${icsEscape(body)}`,
        `URL:${url}`,
        'BEGIN:VALARM',
        'ACTION:DISPLAY',
        `DESCRIPTION:${icsEscape(summary)}`,
        `TRIGGER:-PT${opts.alarm}M`,
        'END:VALARM',
        'END:VEVENT'
      );
    });
    lines.push('END:VCALENDAR');
    return lines.map(fold).join('\r\n') + '\r\n';
  }

  function downloadIcs(text) {
    const blob = new Blob([text], { type: 'text/calendar;charset=utf-8' });
    const href = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = href;
    a.download = `${deckId()}-study-plan.ics`;
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(href), 4000);
  }

  function googleCalendarUrl(opts) {
    const t = T();
    const count = Math.max(1, remainingUnits().length);
    const start = eventStart(opts.start, opts.time);
    const end = new Date(start.getTime() + opts.duration * 60000);
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: t.calEventTitleGeneric,
      dates: `${icsUtc(start)}/${icsUtc(end)}`,
      details: `${t.calEventBody(DECKS[deckId()].label, opts.chinese)}\n${appUrl()}`,
      recur: `RRULE:FREQ=DAILY;COUNT=${count}`,
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  }

  // ---------- tab badge, keyboard, wiring ----------
  function updateTabBadge() {
    const badge = $('toeicTabBadge');
    if (!badge || !deck()) return;
    const n = dueCards().length + newCards(currentUnit(), state.settings.newPerSession).length;
    badge.textContent = n ? String(n) : '';
    badge.hidden = !n;
  }

  const isActive = () => $('view-toeic')?.classList.contains('is-active');

  document.addEventListener('keydown', e => {
    if (!isActive() || screen !== 'session' || $('toeicModal')) return;
    if (e.target.closest?.('input,select,textarea')) return;
    const item = session?.queue[session.index];
    if (e.key === 's' || e.key === 'S') {
      if (item) speak(sayText(item.w));
      return;
    }
    if (e.code === 'Space' || e.key === 'Enter') {
      e.preventDefault();
      if (state.settings.mode === 'write') {
        if (!session.checked) checkWriting();
      } else if (state.settings.mode === 'speak') {
        if (item) toggleMic(item.w);
      } else flip();
    } else if ((session?.flipped || session?.checked) && ['1', '2', '3', '4'].includes(e.key)) {
      rate(['again', 'hard', 'good', 'easy'][Number(e.key) - 1]);
    }
  });

  document.addEventListener('tocfl:toeic-cloud-applied', () => {
    state = loadState();
    if (screen !== 'session') render();
    updateTabBadge();
  });
  document.addEventListener('tocfl:language-changed', () => {
    if (screen !== 'session') render();
  });

  function init() {
    const tab = document.querySelector('.tab[data-view="toeic"]');
    tab?.addEventListener('click', () => {
      if (screen === 'done') screen = 'home';
      render();
    });
    if (window.location.hash === '#toeic' || window.location.hash === '#english') {
      let opened = false;
      const open = () => {
        if (opened) return;
        opened = true;
        if (typeof window.showView === 'function') window.showView('toeic');
        render();
      };
      if (window.TOCFL_APP_READY) open();
      else document.addEventListener('tocfl:app-ready', open, { once: true });
      setTimeout(open, 1500);
    }
    loadAll().then(() => {
      updateTabBadge();
      if (isActive()) render();
    });
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        updateTabBadge();
        if (isActive() && screen === 'home') render();
      }
    });
  }

  window.TOCFLToeic = {
    getProgress: () => JSON.parse(JSON.stringify(state)),
    render,
    buildIcs: opts => buildIcs({ start: dayKey(), time: '20:00', duration: 30, alarm: 10, chinese: true, ...opts }),
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
