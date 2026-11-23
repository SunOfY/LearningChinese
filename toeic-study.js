(() => {
  const panel = document.querySelector('#toeic-smart');
  const tab = document.querySelector('[data-view="toeic-study"]');
  if (!panel || !tab) return;

  const key = 'learningchinese-toeic-context-review-v1';
  const intervals = [1, 3, 7, 14, 30, 60];
  let progress = {};
  let words, current, loading = false;
  const get = id => panel.querySelector(`#${id}`);
  const status = get('toeic-smart-status');
  const card = get('toeic-smart-card');
  const answer = get('toeic-smart-answer');
  const reveal = get('toeic-smart-reveal');
  const start = get('toeic-smart-start');

  function day(offset = 0) {
    const date = new Date();
    date.setDate(date.getDate() + offset);
    return [date.getFullYear(), date.getMonth() + 1, date.getDate()]
      .map(value => String(value).padStart(2, '0')).join('-');
  }

  try {
    const saved = JSON.parse(localStorage.getItem(key) || '{}');
    if (saved && typeof saved === 'object' && !Array.isArray(saved)) progress = saved;
  } catch {}

  function nextCard() {
    const today = day();
    const due = words.filter(word => progress[word.id]?.due <= today)
      .sort((a, b) => progress[a.id].due.localeCompare(progress[b.id].due));
    const learnedToday = Object.values(progress).filter(record => record?.first === today).length;
    const newWords = words.filter(word => !progress[word.id]).slice(0, Math.max(0, 10 - learnedToday));
    current = due[0] || newWords[0];
    status.textContent = current
      ? `${due.length} từ đến hạn · ${newWords.length} từ mới có thể học hôm nay`
      : 'Đã hoàn thành lượt học hôm nay. Hãy quay lại khi có từ đến hạn.';
    card.hidden = !current;
    answer.hidden = true;
    reveal.hidden = false;
    if (!current) return;

    get('toeic-smart-word').textContent = current.en;
    get('toeic-smart-ipa').textContent = current.ipa ? `/${current.ipa}/` : '';
    get('toeic-smart-meaning').textContent = current.vi || current.meaning;
    get('toeic-smart-example').textContent = current.ex_en;
    get('toeic-smart-translation').textContent = current.ex_vi;
  }

  reveal.addEventListener('click', () => {
    answer.hidden = false;
    reveal.hidden = true;
    answer.querySelector('button').focus();
  });

  answer.addEventListener('click', event => {
    const rating = event.target.closest('button[data-rating]')?.dataset.rating;
    if (!rating || !current) return;
    const previous = progress[current.id];
    const level = Number.isInteger(previous?.level) ? previous.level : -1;
    const next = rating === 'remember'
      ? Math.max(0, Math.min(level + 1, intervals.length - 1))
      : -1;
    progress[current.id] = {
      first: previous?.first || day(),
      due: day(next < 0 ? 0 : intervals[next]),
      level: next
    };
    try {
      localStorage.setItem(key, JSON.stringify(progress));
    } catch {
      status.textContent = 'Trình duyệt không lưu được tiến độ. Hãy kiểm tra quyền lưu dữ liệu.';
      return;
    }
    if (rating === 'again') {
      // Move this item to the end of today's queue after older due cards.
      const word = current;
      words = words.filter(item => item !== word).concat(word);
    }
    nextCard();
    if (current) reveal.focus();
  });

  start.addEventListener('click', async () => {
    if (loading) return;
    if (words) {
      nextCard();
      return;
    }
    loading = true;
    start.disabled = true;
    status.textContent = 'Đang tải bộ từ vựng TOEIC…';
    try {
      const response = await fetch('./data/toeic.json');
      if (!response.ok) throw new Error('Vocabulary unavailable');
      const data = await response.json();
      words = data.vocabulary.filter(word => word.id && word.en && word.ex_en && word.ex_vi);
      if (!words.length) throw new Error('No examples');
      nextCard();
      if (current) reveal.focus();
    } catch {
      words = undefined;
      status.textContent = 'Chưa tải được từ vựng. Kiểm tra kết nối rồi bấm Học và ôn từ lại.';
    } finally {
      loading = false;
      start.disabled = false;
    }
  });
})();
