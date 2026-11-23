(() => {
  const root = document.querySelector('#toeic-practice');
  if (!root) return;

  const groups = [
    { name: 'Văn phòng', icon: '01', words: [
      ['schedule', 'lên lịch', 'Can we ___ a meeting for Friday morning?', 'Chúng ta có thể lên lịch họp vào sáng thứ Sáu không?', 'schedule a meeting = lên lịch một cuộc họp'],
      ['submit', 'nộp', 'Please ___ your expense report by noon.', 'Vui lòng nộp báo cáo chi phí trước buổi trưa.', 'submit a report = nộp báo cáo'],
      ['reschedule', 'đổi lịch', 'Our manager is unavailable, so we need to ___ the meeting.', 'Quản lý đang bận nên chúng ta cần đổi lịch họp.', 'reschedule a meeting = dời cuộc họp sang thời điểm khác'],
      ['attach', 'đính kèm', 'Please ___ the document to your email.', 'Vui lòng đính kèm tài liệu vào email.', 'attach A to B = đính kèm A vào B'],
    ] },
    { name: 'Mua hàng và thanh toán', icon: '02', words: [
      ['invoice', 'hóa đơn yêu cầu thanh toán', 'Please pay the outstanding ___ by Friday.', 'Vui lòng thanh toán hóa đơn còn nợ trước thứ Sáu.', 'pay an invoice = thanh toán hóa đơn'],
      ['refund', 'khoản hoàn tiền', 'The customer received a full ___ after returning the product.', 'Khách được hoàn toàn bộ tiền sau khi trả sản phẩm.', 'a full refund = khoản hoàn tiền toàn bộ'],
      ['receipt', 'biên lai', 'Keep the ___ as proof that you paid.', 'Hãy giữ biên lai làm bằng chứng đã thanh toán.', 'a receipt is proof of payment = biên lai xác nhận đã trả tiền'],
      ['discount', 'mức giảm giá', 'Members receive a 15 percent ___ on all orders.', 'Thành viên được giảm 15% cho mọi đơn hàng.', 'a discount on something = giảm giá cho mặt hàng hoặc dịch vụ nào đó'],
    ] },
    { name: 'Đi lại và khách sạn', icon: '03', words: [
      ['reservation', 'đặt chỗ', 'I have a room ___ under the name Nguyen.', 'Tôi có đặt phòng dưới tên Nguyễn.', 'a reservation under a name = đặt chỗ dưới tên ai'],
      ['departure', 'sự khởi hành', 'A new ___ time was announced after the flight was delayed.', 'Giờ khởi hành mới được thông báo sau khi chuyến bay bị hoãn.', 'departure time = giờ khởi hành'],
      ['luggage', 'hành lý', 'You may leave your ___ at the hotel after checking out.', 'Bạn có thể gửi hành lý tại khách sạn sau khi trả phòng.', 'luggage là danh từ không đếm được'],
      ['itinerary', 'lịch trình', 'The travel agent sent an ___ listing all three flights.', 'Đại lý du lịch gửi lịch trình liệt kê cả ba chuyến bay.', 'an itinerary = lịch trình chi tiết của chuyến đi'],
    ] },
    { name: 'Tuyển dụng', icon: '04', words: [
      ['applicant', 'ứng viên', 'Each ___ must send a résumé and a cover letter.', 'Mỗi ứng viên phải gửi CV và thư xin việc.', 'an applicant for a position = người ứng tuyển vào một vị trí'],
      ['vacancy', 'vị trí còn trống', 'There is a job ___ in the accounting department.', 'Phòng kế toán có một vị trí đang tuyển.', 'a job vacancy = vị trí tuyển dụng còn trống'],
      ['reference', 'người giới thiệu', 'Please list a professional ___ we can contact about your previous work.', 'Vui lòng ghi một người giới thiệu để chúng tôi có thể hỏi về công việc trước đây của bạn.', 'professional reference = người có thể xác nhận kinh nghiệm làm việc'],
      ['orientation', 'buổi định hướng', 'New employees attend an ___ on their first day.', 'Nhân viên mới tham dự buổi định hướng vào ngày đầu tiên.', 'attend an orientation = tham dự buổi định hướng'],
    ] },
  ];
  const grammar = [
    ['A number of invoices ___ still unpaid.', ['is','are','has','was'], 'are', 'A number of + danh từ số nhiều đi với động từ số nhiều.'],
    ['The company announced its ___ into a new market.', ['expand','expansive','expansion','expansively'], 'expansion', 'Sau its cần danh từ expansion, nghĩa là sự mở rộng.'],
    ['The new printer is ___ than the previous model.', ['reliably','reliability','most reliable','more reliable'], 'more reliable', 'More reliable than là cấu trúc so sánh hơn.'],
    ['All receipts must ___ before reimbursement.', ['submit','be submitted','submitting','have submitted'], 'be submitted', 'Hóa đơn được nộp. Sau must dùng be + quá khứ phân từ trong câu bị động.'],
    ['Applicants ___ meet the requirements will be contacted.', ['which','where','who','whose'], 'who', 'Who chỉ người và làm chủ ngữ của meet.'],
    ['___ the delay, the team met its deadline.', ['Although','Despite','Because','Since'], 'Despite', 'Despite đi với cụm danh từ the delay và diễn đạt sự nhượng bộ.'],
    ['The venue will provide attendees ___ a printed schedule.', ['on','in','for','with'], 'with', 'Cấu trúc provide someone with something nghĩa là cung cấp thứ gì cho ai.'],
  ];
  const shuffle = items => {
    const result = [...items];
    for (let index = result.length - 1; index > 0; index--) {
      const other = Math.floor(Math.random() * (index + 1));
      [result[index], result[other]] = [result[other], result[index]];
    }
    return result;
  };
  const decks = groups.map(group => ({
    ...group,
    questions: group.words.map(([word, meaning, prompt, translation, note]) => ({
      id: word, word, meaning, prompt, translation, note,
      options: group.words.map(entry => entry[0]),
    })),
  }));
  decks.push({ name: 'Ngữ pháp Part 5', icon: '05', questions: grammar.map(([prompt, options, word, note], index) => ({
    id: `grammar-${index}`, word, prompt, options, note,
  })) });
  const source = window.toeicSource;
  if (source) {
    for (const group of source.vocabulary) {
      decks.push({
        name: group.name,
        category: 'vocabulary',
        questions: group.rows.map(([term, meaning, sentence], index) => ({
          id: `source-vocab-${term}`,
          word: meaning,
          prompt: `Trong câu này, “${term}” có nghĩa là gì?`,
          context: sentence.replace('___', term),
          note: `${term} = ${meaning}`,
          options: Array.from({ length: 4 }, (_, offset) => group.rows[(index + offset) % group.rows.length][1]),
        })),
      });
    }
    for (const group of source.grammar) {
      decks.push({
        name: group.name,
        category: 'grammar',
        questions: group.rows.map(([prompt, word, ...options]) => ({
          id: `source-grammar-${prompt}`,
          prompt, word, note: options.pop(), options: [word, ...options],
        })),
      });
    }
  }
  const questions = decks.flatMap(deck => deck.questions);
  const key = 'learningchinese-toeic-practice-v1';
  let records = {};
  try { records = JSON.parse(localStorage.getItem(key) || '{}') || {}; } catch {}
  const day = offset => {
    const date = new Date();
    date.setDate(date.getDate() + offset);
    return [date.getFullYear(), date.getMonth() + 1, date.getDate()].map(value => String(value).padStart(2, '0')).join('-');
  };
  const intervals = [1, 3, 7, 14, 30];
  const get = id => root.querySelector(`[data-ui="${id}"]`);
  let queue = [], current, name, answered, total, correct, attempts;
  let lastDeck;
  let retried = new Set();

  function renderLessons() {
    if (!source) return;
    function chapter(container, name, entries, deck) {
      const details = document.createElement('details');
      const title = document.createElement('summary');
      title.textContent = name + ' · ' + entries.length + ' mục';
      const list = document.createElement('dl');
      list.className = 'tp-lesson-body';
      for (const [term, description, example] of entries) {
        const heading = document.createElement('dt');
        heading.textContent = term;
        const explanation = document.createElement('dd');
        const text = document.createElement('p');
        text.textContent = description;
        const sentence = document.createElement('p');
        sentence.lang = 'en';
        sentence.textContent = example;
        explanation.append(text, sentence);
        list.append(heading, explanation);
      }
      details.append(title, list);
      if (deck >= 0) {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'tp-primary tp-lesson-quiz';
        button.dataset.deck = deck;
        button.textContent = 'Luyện A–D nhóm này';
        details.append(button);
      }
      container.append(details);
    }

    for (const { name, rows } of source.reference) {
      chapter(get('reference'), name, rows, -1);
    }
    for (const { name, rows } of source.vocabulary) {
      const deck = decks.findIndex(group => group.category === 'vocabulary' && group.name === name);
      chapter(get('vocabulary'), name, rows.map(([term, definition, sentence]) => [
        term, definition, sentence.replace('___', term),
      ]), deck);
    }
  }

  function renderGroups() {
    for (const container of root.querySelectorAll('[data-decks]')) {
    container.replaceChildren(...decks.map((deck, index) => {
      if ((deck.category || 'extra') !== container.dataset.decks) return null;
      const button = document.createElement('button');
      button.className = 'tp-group';
      button.type = 'button';
      button.dataset.deck = index;
      const title = document.createElement('strong');
      title.textContent = deck.name;
      const count = document.createElement('span');
      const learned = deck.questions.filter(question => records[question.id]?.level >= 0).length;
      count.textContent = `${learned}/${deck.questions.length} câu đã làm đúng`;
      button.append(title, count);
      return button;
    }).filter(Boolean));
    }
    const due = questions.filter(question => records[question.id]?.due <= day(0)).length;
    get('review').textContent = `Ôn đến hạn (${due})`;
    get('review').disabled = due === 0;
  }

  function next() {
    current = queue.shift();
    answered = false;
    get('feedback').hidden = true;
    get('next').hidden = true;
    get('options').replaceChildren();
    get('counter').textContent = `${attempts} lượt đã làm · ${queue.length + Number(!!current)} câu còn lại`;
    get('prompt').textContent = current?.prompt || `Hoàn thành · ${correct}/${total} câu đúng ngay lần đầu`;
    get('context').textContent = current?.context || '';
    get('context').hidden = !current?.context;
    if (!current) {
      renderGroups();
      get('back').focus();
      return;
    }
    shuffle(current.options).forEach((option, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'tp-option';
      button.dataset.option = option;
      button.textContent = `${'ABCD'[index]}. ${option}`;
      get('options').append(button);
    });
    get('prompt').focus();
  }

  function start(label, items) {
    name = label;
    queue = shuffle(items);
    retried = new Set();
    total = items.length;
    correct = attempts = 0;
    get('menu').hidden = true;
    get('session').hidden = false;
    get('topic').textContent = name;
    next();
  }

  function choose(value) {
    if (answered || !current) return;
    answered = true;
    attempts++;
    const success = value === current.word;
    if (success && !retried.has(current.id)) correct++;
    let level = records[current.id]?.level ?? -1;
    if (!success) {
      level = -1;
      if (!retried.has(current.id)) {
        retried.add(current.id);
        queue.splice(Math.min(3, queue.length), 0, current);
      }
    } else if (!retried.has(current.id) && records[current.id]?.due !== day(0)) {
      // Future-due cards remain at their scheduled level when practised early.
      if (!records[current.id]?.due || records[current.id].due > day(0)) {
        level = level < 0 ? 0 : level;
      } else {
        level = Math.min(level + 1, intervals.length - 1);
      }
    } else if (!retried.has(current.id)) {
      level = Math.min(level + 1, intervals.length - 1);
    }
    if (!success || !records[current.id]?.due || records[current.id].due <= day(0)) {
      records[current.id] = { level, due: day(level < 0 ? 0 : intervals[level]) };
    }
    try { localStorage.setItem(key, JSON.stringify(records)); }
    catch { get('storage').textContent = 'Trình duyệt không lưu được tiến độ.'; }
    for (const button of get('options').children) {
      button.disabled = true;
      if (button.dataset.option === current.word) button.classList.add('is-correct');
      else if (button.dataset.option === value) button.classList.add('is-wrong');
    }
    get('result').textContent = success ? 'Chính xác' : `Đáp án đúng là ${current.word}`;
    get('meaning').textContent = current.meaning ? `${current.word} — ${current.meaning}` : '';
    get('example').textContent = current.translation ? current.prompt.replace('___', current.word) : '';
    get('translation').textContent = current.translation || '';
    get('note').textContent = current.note;
    get('feedback').hidden = false;
    get('next').hidden = false;
    get('next').focus();
  }

  root.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button || !root.contains(button)) return;
    if (button.dataset.deck !== undefined) {
      lastDeck = button.dataset.deck;
      const deck = decks[Number(lastDeck)];
      start(deck.name, deck.questions);
    } else if (button.dataset.option !== undefined) {
      choose(button.dataset.option);
    } else if (button === get('review')) {
      start('Ôn đến hạn', questions.filter(question => records[question.id]?.due <= day(0)));
    } else if (button === get('next')) {
      next();
    } else if (button === get('back')) {
      current = undefined;
      queue = [];
      get('session').hidden = true;
      get('menu').hidden = false;
      renderGroups();
      root.querySelector('[data-deck="' + lastDeck + '"]')?.focus();
    }
  });
  renderLessons();
  renderGroups();
})();
