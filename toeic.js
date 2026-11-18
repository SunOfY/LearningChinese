/**
 * TOEIC flashcards (ETS Starter Vocab · LC + RC).
 *
 * - Spaced repetition (Leitner boxes): Quên / Khó / Nhớ / Dễ.
 * - Study plan: one "unit" (60 words of one PDF day) per study day.
 * - Progress is kept in localStorage and synced through the existing
 *   account sync (progress.toeic) — see getToeicCloudState in app.js.
 * - "Thêm vào lịch": .ics file (Apple/Outlook) or Google Calendar link.
 */
(() => {
  'use strict';

  const STORAGE_KEY = 'tocfl-toeic-progress-v1';
  const DATA_URL = './data/toeic.json';
  const INTERVALS = [0, 1, 3, 7, 14, 30, 60]; // days per box
  const MASTERED_BOX = 4;
  const PLAN_ORDERS = ['alternate', 'lc-first', 'lc-only', 'rc-only'];

  const TEXT = {
    vi: {
      title: 'TOEIC · Flash card',
      sub: 'ETS Starter Vocab — Listening (LC) & Reading (RC)',
      today: 'Hôm nay',
      unit: (set, day) => `${set} · Day ${String(day).padStart(2, '0')}`,
      newWords: n => `${n} từ mới`,
      dueWords: n => `${n} từ cần ôn`,
      start: '▶ Học ngay',
      continue: '▶ Học tiếp',
      allDone: '🎉 Xong hết cho hôm nay! Có thể học thêm bài tiếp theo.',
      studyNext: '➕ Học thêm bài tiếp',
      calendar: '📅 Thêm vào lịch',
      list: '📋 Danh sách từ',
      settings: '⚙️ Cài đặt',
      statsSeen: 'Đã học',
      statsMastered: 'Đã thuộc',
      statsDue: 'Cần ôn',
      statsStreak: 'Chuỗi ngày',
      planProgress: (done, total) => `Kế hoạch: ${done}/${total} bài`,
      flip: 'Chạm để lật thẻ',
      again: 'Quên',
      hard: 'Khó',
      good: 'Nhớ',
      easy: 'Dễ',
      back: '← Quay lại',
      speak: '🔊 Nghe',
      cardOf: (i, n) => `${i} / ${n}`,
      sessionDone: 'Hoàn thành phiên học!',
      sessionSummary: (n, again) => `Bạn đã ôn ${n} thẻ · ${again} lần bấm "Quên".`,
      newTag: 'MỚI',
      reviewTag: 'ÔN',
      direction: 'Mặt trước thẻ',
      dirEnVi: 'Tiếng Anh → nghĩa Việt',
      dirViEn: 'Nghĩa Việt → tiếng Anh',
      dirMixed: 'Trộn cả hai',
      order: 'Thứ tự học',
      orderAlternate: 'Xen kẽ LC / RC (40 ngày)',
      orderLcFirst: 'Hết LC rồi tới RC (40 ngày)',
      orderLcOnly: 'Chỉ LC (20 ngày)',
      orderRcOnly: 'Chỉ RC (20 ngày)',
      newPerDay: 'Số từ mới mỗi phiên',
      wholeUnit: 'Cả bài (60)',
      autoSpeak: 'Tự đọc từ tiếng Anh khi lật thẻ',
      save: 'Lưu',
      close: 'Đóng',
      chooseUnit: 'Chọn bài để xem / học',
      studyThisUnit: '▶ Học bài này',
      hideMeaning: 'Che nghĩa để tự kiểm tra',
      boxLabel: b => (b <= 0 ? 'Chưa học' : b >= MASTERED_BOX ? 'Đã thuộc' : `Hộp ${b}`),
      calTitle: '📅 Nhắc học trong lịch',
      calDesc: 'Tạo lịch học hằng ngày theo kế hoạch. Mỗi ngày có báo thức và link mở thẳng vào tab TOEIC.',
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
      calEventTitle: unit => `📚 Học TOEIC ${unit}`,
      calEventTitleGeneric: '📚 Giờ học TOEIC + Tiếng Trung',
      calEventBody: (unit, chinese) =>
        `Hôm nay: ${unit} (60 từ mới) + ôn các thẻ đến hạn.` +
        (chinese ? '\nSau đó: ôn tiếng Trung (Từ vựng / Reading).' : ''),
      calDone: 'Đã tạo file lịch. Mở file vừa tải để thêm vào Lịch.',
      loading: 'Đang tải từ vựng TOEIC…',
      loadError: 'Không tải được data/toeic.json',
      resetUnit: '↻ Học lại bài này từ đầu',
      resetConfirm: 'Đặt lại tiến độ của bài này?',
      keyboardHint: 'Phím tắt: Space = lật · 1 Quên · 2 Khó · 3 Nhớ · 4 Dễ',
    },
    en: {
      title: 'TOEIC · Flashcards',
      sub: 'ETS Starter Vocab — Listening (LC) & Reading (RC)',
      today: 'Today',
      unit: (set, day) => `${set} · Day ${String(day).padStart(2, '0')}`,
      newWords: n => `${n} new words`,
      dueWords: n => `${n} due for review`,
      start: '▶ Study now',
      continue: '▶ Continue',
      allDone: '🎉 All done for today! You can study the next unit too.',
      studyNext: '➕ Study next unit',
      calendar: '📅 Add to calendar',
      list: '📋 Word list',
      settings: '⚙️ Settings',
      statsSeen: 'Studied',
      statsMastered: 'Mastered',
      statsDue: 'Due',
      statsStreak: 'Streak',
      planProgress: (done, total) => `Plan: ${done}/${total} units`,
      flip: 'Tap to flip',
      again: 'Again',
      hard: 'Hard',
      good: 'Good',
      easy: 'Easy',
      back: '← Back',
      speak: '🔊 Listen',
      cardOf: (i, n) => `${i} / ${n}`,
      sessionDone: 'Session complete!',
      sessionSummary: (n, again) => `You reviewed ${n} cards · pressed "Again" ${again} times.`,
      newTag: 'NEW',
      reviewTag: 'REVIEW',
      direction: 'Card front',
      dirEnVi: 'English → Vietnamese',
      dirViEn: 'Vietnamese → English',
      dirMixed: 'Mixed',
      order: 'Study order',
      orderAlternate: 'Alternate LC / RC (40 days)',
      orderLcFirst: 'All LC, then RC (40 days)',
      orderLcOnly: 'LC only (20 days)',
      orderRcOnly: 'RC only (20 days)',
      newPerDay: 'New words per session',
      wholeUnit: 'Whole unit (60)',
      autoSpeak: 'Read the English word aloud when flipping',
      save: 'Save',
      close: 'Close',
      chooseUnit: 'Choose a unit to view / study',
      studyThisUnit: '▶ Study this unit',
      hideMeaning: 'Hide meanings to test yourself',
      boxLabel: b => (b <= 0 ? 'Not started' : b >= MASTERED_BOX ? 'Mastered' : `Box ${b}`),
      calTitle: '📅 Study reminders',
      calDesc: 'Create a daily study schedule following your plan, with an alarm and a link that opens the TOEIC tab.',
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
      calEventTitle: unit => `📚 TOEIC ${unit}`,
      calEventTitleGeneric: '📚 Study time: TOEIC + Chinese',
      calEventBody: (unit, chinese) =>
        `Today: ${unit} (60 new words) + due reviews.` + (chinese ? '\nThen: review Chinese (Vocabulary / Reading).' : ''),
      calDone: 'Calendar file created. Open it to add the events.',
      loading: 'Loading TOEIC vocabulary…',
      loadError: 'Could not load data/toeic.json',
      resetUnit: '↻ Restart this unit',
      resetConfirm: 'Reset progress for this unit?',
      keyboardHint: 'Shortcuts: Space = flip · 1 Again · 2 Hard · 3 Good · 4 Easy',
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
  let data = null; // {meta, vocabulary}
  let byUnit = new Map(); // "LC-1" -> [entries]
  let state = loadState();
  let session = null; // {queue, index, flipped, reviewed, again, front}
  let screen = 'home'; // home | session | list | done
  let listUnit = null;

  function defaultState() {
    return {
      version: 1,
      cards: {}, // id -> {box, due, seen, lapses, t}
      log: {}, // YYYY-MM-DD -> {reviewed, learned}
      settings: { direction: 'en-vi', order: 'alternate', newPerSession: 60, autoSpeak: true, t: 0 },
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
    // Keep the log small: last 120 days.
    const keys = Object.keys(state.log).sort();
    while (keys.length > 120) delete state.log[keys.shift()];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
      console.warn('TOEIC save failed', err);
    }
    document.dispatchEvent(new CustomEvent('tocfl:state-changed'));
    updateTabBadge();
  }

  // ---------- data ----------
  async function loadData() {
    if (data) return data;
    const res = await fetch(DATA_URL, { cache: 'no-cache' });
    if (!res.ok) throw new Error(`${T().loadError} (${res.status})`);
    data = await res.json();
    byUnit = new Map();
    for (const w of data.vocabulary) {
      const key = `${w.set}-${w.day}`;
      if (!byUnit.has(key)) byUnit.set(key, []);
      byUnit.get(key).push(w);
    }
    return data;
  }

  function planUnits() {
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

  const unitWords = u => byUnit.get(`${u.set}-${u.day}`) || [];
  const unitLabel = u => T().unit(u.set, u.day);
  const isSeen = w => Boolean(state.cards[w.id]?.seen);
  const unitStarted = u => unitWords(u).some(isSeen);
  const unitComplete = u => unitWords(u).length > 0 && unitWords(u).every(isSeen);

  /** First unit in the plan that still has unseen words. Missing a day never skips a unit. */
  function currentUnit() {
    return planUnits().find(u => !unitComplete(u)) || null;
  }

  function dueCards(today = dayKey()) {
    if (!data) return [];
    return data.vocabulary
      .filter(w => {
        const c = state.cards[w.id];
        return c?.seen && c.due && c.due <= today;
      })
      .sort((a, b) => (state.cards[a.id].due < state.cards[b.id].due ? -1 : 1));
  }

  function newCards(unit, limit) {
    if (!unit) return [];
    return unitWords(unit)
      .filter(w => !isSeen(w))
      .slice(0, limit);
  }

  function stats() {
    const cards = Object.values(state.cards);
    const seen = cards.filter(c => c.seen).length;
    const mastered = cards.filter(c => c.box >= MASTERED_BOX).length;
    let streak = 0;
    let key = dayKey();
    if (!state.log[key]) key = addDays(key, -1); // today not studied yet: streak still counts until midnight
    while (state.log[key] && (state.log[key].reviewed || 0) > 0) {
      streak += 1;
      key = addDays(key, -1);
    }
    return { seen, mastered, due: dueCards().length, streak, total: data?.vocabulary.length || 0 };
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
  function speak(text) {
    if (!('speechSynthesis' in window)) return;
    const clean = String(text).replace(/[~…]/g, ' ').replace(/\s+/g, ' ').trim();
    if (!clean) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(clean);
    u.lang = 'en-US';
    if (voice) u.voice = voice;
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  }

  // ---------- rendering ----------
  const root = () => $('toeicApp');

  function render() {
    const el = root();
    if (!el) return;
    if (!data) {
      el.innerHTML = `<div class="card"><strong>${esc(T().loading)}</strong></div>`;
      loadData()
        .then(() => {
          updateTabBadge();
          render();
        })
        .catch(err => {
          el.innerHTML = `<div class="card"><strong>${esc(err.message)}</strong></div>`;
        });
      return;
    }
    if (screen === 'session' && session) return renderSession();
    if (screen === 'done' && session) return renderDone();
    if (screen === 'list') return renderList();
    renderHome();
  }

  function renderHome() {
    const t = T();
    const unit = currentUnit();
    const plan = planUnits();
    const doneUnits = plan.filter(unitComplete).length;
    const due = dueCards();
    const fresh = newCards(unit, state.settings.newPerSession);
    const s = stats();
    const pct = plan.length ? Math.round((doneUnits / plan.length) * 100) : 0;
    const nothingLeft = !due.length && !fresh.length;
    const started = unit && unitStarted(unit);

    root().innerHTML = `
      <div class="toeic-hero card">
        <div>
          <div class="eyebrow">🇬🇧 ${esc(t.sub)}</div>
          <h2>${esc(t.title)}</h2>
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
              : `<button id="toeicStartBtn" class="primary toeic-big-btn" type="button">${esc(started || due.length ? t.continue : t.start)}</button>`
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
        <div class="toeic-unit-grid">
          ${plan
            .map(u => {
              const words = unitWords(u);
              const seen = words.filter(isSeen).length;
              const cls = unitComplete(u) ? 'is-complete' : seen ? 'is-started' : '';
              const current = unit && u.set === unit.set && u.day === unit.day ? ' is-current' : '';
              return `<button type="button" class="toeic-unit ${cls}${current}" data-unit="${u.set}-${u.day}">
                <strong>${esc(u.set)} ${pad(u.day)}</strong><span>${seen}/${words.length}</span></button>`;
            })
            .join('')}
        </div>
        <p class="small muted">${esc(t.keyboardHint)}</p>
      </div>`;

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
  }

  const statTile = (label, value) =>
    `<div class="card toeic-stat"><div class="small muted">${esc(label)}</div><strong>${value}</strong></div>`;

  function startSession(unitOverride) {
    const unit = unitOverride || currentUnit();
    const due = unitOverride ? [] : dueCards();
    const fresh = unitOverride
      ? unitWords(unitOverride).filter(w => !isSeen(w)).slice(0, state.settings.newPerSession)
      : newCards(unit, state.settings.newPerSession);
    let queue = [...due.map(w => ({ w, isNew: false })), ...fresh.map(w => ({ w, isNew: true }))];
    if (unitOverride && !queue.length) {
      // Unit already seen: drill the whole unit again (counts as review).
      queue = unitWords(unitOverride).map(w => ({ w, isNew: false }));
    }
    if (!queue.length) return;
    session = { queue, index: 0, flipped: false, reviewed: 0, again: 0, requeued: new Set() };
    screen = 'session';
    render();
  }

  function frontSide(item) {
    const dir = state.settings.direction;
    if (dir === 'mixed') {
      item.front ||= Math.random() < 0.5 ? 'en' : 'vi';
      return item.front;
    }
    return dir === 'vi-en' ? 'vi' : 'en';
  }

  function renderSession() {
    const t = T();
    const item = session.queue[session.index];
    if (!item) {
      screen = 'done';
      return render();
    }
    const w = item.w;
    const front = frontSide(item);
    const card = state.cards[w.id];
    const frontText = front === 'en' ? w.en : w.vi;
    const backText = front === 'en' ? w.vi : w.en;
    const pct = Math.round((session.index / session.queue.length) * 100);

    root().innerHTML = `
      <div class="card toeic-session">
        <div class="toeic-session-head">
          <button id="toeicBackBtn" type="button">${esc(t.back)}</button>
          <div class="toeic-session-meta">
            <span class="toeic-pill ${item.isNew ? 'is-new' : 'is-due'}">${esc(item.isNew ? t.newTag : t.reviewTag)}</span>
            <span class="small muted">${esc(w.set)} · Day ${pad(w.day)} · #${w.no}</span>
            <strong>${esc(t.cardOf(session.index + 1, session.queue.length))}</strong>
          </div>
        </div>
        <div class="progress-bar"><div style="width:${pct}%"></div></div>
        <button id="toeicCard" type="button" class="toeic-card ${session.flipped ? 'is-flipped' : ''}" aria-live="polite">
          <span class="toeic-card-front ${front === 'en' ? 'is-en' : 'is-vi'}">${esc(frontText)}</span>
          ${
            session.flipped
              ? `<span class="toeic-card-divider"></span><span class="toeic-card-back ${front === 'en' ? 'is-vi' : 'is-en'}">${esc(backText)}</span>`
              : `<span class="toeic-card-hint">${esc(t.flip)}</span>`
          }
          ${card?.seen ? `<span class="toeic-card-box">${esc(t.boxLabel(card.box))}</span>` : ''}
        </button>
        <div class="toeic-session-tools">
          <button id="toeicSpeakBtn" type="button">${esc(t.speak)}</button>
        </div>
        <div class="toeic-rate ${session.flipped ? '' : 'is-hidden'}">
          <button type="button" data-rate="again" class="toeic-rate-again">😵 ${esc(t.again)}<small>1</small></button>
          <button type="button" data-rate="hard" class="toeic-rate-hard">🤔 ${esc(t.hard)}<small>2</small></button>
          <button type="button" data-rate="good" class="toeic-rate-good">🙂 ${esc(t.good)}<small>3</small></button>
          <button type="button" data-rate="easy" class="toeic-rate-easy">😎 ${esc(t.easy)}<small>4</small></button>
        </div>
      </div>`;

    $('toeicBackBtn').addEventListener('click', endSession);
    $('toeicCard').addEventListener('click', flip);
    $('toeicSpeakBtn').addEventListener('click', () => speak(w.en));
    root()
      .querySelectorAll('[data-rate]')
      .forEach(b => b.addEventListener('click', () => rate(b.dataset.rate)));
    if (front === 'en' && !session.flipped && state.settings.autoSpeak && !item.spoken) {
      item.spoken = true;
      speak(w.en);
    }
  }

  function flip() {
    if (!session || screen !== 'session') return;
    session.flipped = !session.flipped;
    const item = session.queue[session.index];
    if (session.flipped && state.settings.autoSpeak && item && frontSide(item) === 'vi') speak(item.w.en);
    renderSession();
  }

  function rate(rating) {
    if (!session || !session.flipped) return;
    const item = session.queue[session.index];
    grade(item.w, rating);
    session.reviewed += 1;
    if (rating === 'again') {
      session.again += 1;
      // Show it once more later in this session (max once per card).
      if (!session.requeued.has(item.w.id)) {
        session.requeued.add(item.w.id);
        const pos = Math.min(session.queue.length, session.index + 5);
        session.queue.splice(pos, 0, { w: item.w, isNew: false, front: item.front });
      }
    }
    session.index += 1;
    session.flipped = false;
    renderSession();
  }

  function endSession() {
    window.speechSynthesis?.cancel?.();
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

  let hideMeaning = false;
  function renderList() {
    const t = T();
    const u = listUnit || currentUnit() || planUnits()[0];
    const words = unitWords(u);
    const options = planUnits()
      .map(p => `<option value="${p.set}-${p.day}" ${p.set === u.set && p.day === u.day ? 'selected' : ''}>${esc(unitLabel(p))}</option>`)
      .join('');
    root().innerHTML = `
      <div class="card toeic-list">
        <div class="toeic-session-head">
          <button id="toeicBackBtn" type="button">${esc(t.back)}</button>
          <select id="toeicUnitSelect" aria-label="${esc(t.chooseUnit)}">${options}</select>
          <button id="toeicStudyUnitBtn" class="primary" type="button">${esc(t.studyThisUnit)}</button>
        </div>
        <label class="toeic-check"><input id="toeicHideMeaning" type="checkbox" ${hideMeaning ? 'checked' : ''}> ${esc(t.hideMeaning)}</label>
        <div class="toeic-word-list ${hideMeaning ? 'hide-meaning' : ''}">
          ${words
            .map(w => {
              const c = state.cards[w.id];
              const box = c?.box || 0;
              return `<div class="toeic-word-row box-${Math.min(box, MASTERED_BOX)}">
                <span class="toeic-word-no">${w.no}</span>
                <button type="button" class="toeic-word-en" data-speak="${esc(w.en)}">${esc(w.en)} <span aria-hidden="true">🔊</span></button>
                <span class="toeic-word-vi" tabindex="0">${esc(w.vi)}</span>
                <span class="toeic-word-box">${esc(t.boxLabel(c?.seen ? box : 0))}</span>
              </div>`;
            })
            .join('')}
        </div>
        <button id="toeicResetUnitBtn" type="button" class="danger">${esc(t.resetUnit)}</button>
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
    $('toeicStudyUnitBtn').addEventListener('click', () => startSession(u));
    $('toeicHideMeaning').addEventListener('change', e => {
      hideMeaning = e.target.checked;
      renderList();
    });
    root()
      .querySelectorAll('[data-speak]')
      .forEach(b => b.addEventListener('click', () => speak(b.dataset.speak)));
    root()
      .querySelectorAll('.toeic-word-vi')
      .forEach(el => el.addEventListener('click', () => el.classList.toggle('is-revealed')));
    $('toeicResetUnitBtn').addEventListener('click', () => {
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
          ${opt(20, '20', s.newPerSession)}${opt(30, '30', s.newPerSession)}${opt(60, t.wholeUnit, s.newPerSession)}
        </select></label>
      <label class="toeic-check"><input id="toeicAutoSpeak" type="checkbox" ${s.autoSpeak ? 'checked' : ''}> ${esc(t.autoSpeak)}</label>
      <div class="toeic-actions">
        <button id="toeicSettingsSave" class="primary" type="button">${esc(t.save)}</button>
        <button id="toeicSettingsClose" type="button">${esc(t.close)}</button>
      </div>`);
    m.querySelector('#toeicSettingsClose').addEventListener('click', closeModal);
    m.querySelector('#toeicSettingsSave').addEventListener('click', () => {
      const order = m.querySelector('#toeicOrder').value;
      state.settings = {
        ...state.settings,
        order: PLAN_ORDERS.includes(order) ? order : 'alternate',
        direction: m.querySelector('#toeicDirection').value,
        newPerSession: Number(m.querySelector('#toeicNewPer').value) || 60,
        autoSpeak: m.querySelector('#toeicAutoSpeak').checked,
        t: Date.now(),
      };
      save();
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
      const time = /^\d{2}:\d{2}$/.test(m.querySelector('#toeicCalTime').value) ? m.querySelector('#toeicCalTime').value : '20:00';
      const opts = {
        start: m.querySelector('#toeicCalStart').value || startDefault,
        time,
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

  /** Remaining plan units from the current one, so events show what to study each day. */
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

  /** RFC 5545 line folding at 75 octets (UTF-8 safe). */
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
        limit = 74; // continuation lines start with a space
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
      'PRODID:-//LearningChinese//TOEIC Study Plan//VI',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      `X-WR-CALNAME:${icsEscape('TOEIC Study Plan')}`,
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
        `UID:toeic-${opts.start}-${i}-${u ? `${u.set}${u.day}` : 'x'}@learningchinese`,
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
    a.download = 'toeic-study-plan.ics';
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
      details: `${opts.chinese ? t.calEventBody('TOEIC', true) : t.calEventBody('TOEIC', false)}\n${appUrl()}`,
      recur: `RRULE:FREQ=DAILY;COUNT=${count}`,
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  }

  // ---------- tab badge, keyboard, wiring ----------
  function updateTabBadge() {
    const badge = $('toeicTabBadge');
    if (!badge || !data) return;
    const n = dueCards().length + newCards(currentUnit(), state.settings.newPerSession).length;
    badge.textContent = n ? String(n) : '';
    badge.hidden = !n;
  }

  function isActive() {
    return $('view-toeic')?.classList.contains('is-active');
  }

  document.addEventListener('keydown', e => {
    if (!isActive() || screen !== 'session' || $('toeicModal')) return;
    if (e.target.closest?.('input,select,textarea')) return;
    if (e.code === 'Space' || e.key === 'Enter') {
      e.preventDefault();
      flip();
    } else if (session?.flipped && ['1', '2', '3', '4'].includes(e.key)) {
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
    if (window.location.hash === '#toeic') {
      const open = () => {
        if (typeof window.showView === 'function') window.showView('toeic');
        render();
      };
      if (window.TOCFL_APP_READY) open();
      else document.addEventListener('tocfl:app-ready', open, { once: true });
      setTimeout(open, 1500); // fallback if the ready event already fired
    }
    loadData()
      .then(() => {
        updateTabBadge();
        if (isActive()) render();
      })
      .catch(() => {});
    // Recompute badge after midnight / when the tab regains focus.
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
