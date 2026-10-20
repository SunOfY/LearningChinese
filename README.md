# LEARNING TOCFL

Website tự học **TOCFL Traditional Chinese** dành cho học từ vựng, luyện viết, luyện đọc, phát âm, ôn giữa kỳ và theo dõi tiến độ cá nhân.

> **Phiên bản hiện tại:** v5.6.16  
> README này thay cho các file ghi chú/hotfix theo từng phiên bản cũ. Có thể xóa các file lịch sử `.txt` / `.md` cũ nếu chúng chỉ là changelog và không được code sử dụng.

---

## 1. Chức năng chính

### 🏠 Hôm nay
- Hiển thị nội dung cần học theo ngày.
- Chọn cấp độ học như **A1 / A2**.
- Chọn ngày học.
- Hỗ trợ giao diện tiếng Việt / tiếng Anh tùy cấu hình hiện tại.

### 📚 Từ vựng
- Học từ TOCFL bằng **chữ Phồn thể**.
- Hiển thị Pinyin, nghĩa tiếng Việt / tiếng Anh.
- Phát âm từ bằng TTS.
- Đánh dấu từ đã nhớ / yêu thích.
- Luyện viết chữ Hán.
- Xem mẫu chữ và thứ tự nét.
- Hỗ trợ Apple Pencil, cảm ứng và chuột.
- Có chế độ luyện nhiều chữ / copybook.
- Tiến độ được lưu local và có thể đồng bộ tài khoản.

### ✍️ Luyện viết
- Viết trực tiếp trên iPad hoặc máy tính.
- Hỗ trợ Apple Pencil.
- Có mẫu chữ, khung luyện viết và thứ tự nét.
- Nét người học được giữ nguyên để tự so sánh, không tự thay bằng chữ mẫu.
- Giao diện tự điều chỉnh khi xoay ngang / dọc màn hình.

### 🔊 Luyện phát âm
- Ghi âm từ / câu tiếng Trung.
- Dùng AI Speech-to-Text để nhận diện nội dung đã đọc.
- Hiện kết quả nhận diện và so sánh với đáp án.
- Hỗ trợ **Groq Whisper** thông qua API riêng của người dùng.

> Lưu ý: điểm phát âm hiện tại chủ yếu dựa trên **kết quả nhận dạng văn bản**. Nó không phải hệ thống chấm thanh điệu / âm vị chuyên sâu như một công cụ phoneme scoring chuyên dụng.

### 📖 Reading — Modern Chinese
Phần Reading dùng nội dung sách **時代華語 Modern Chinese**.

- Bài 1 đến Bài 15.
- Từ vựng của bài.
- Hội thoại.
- Reading / đoạn văn.
- Grammar và bài tập đã chuyển thành nội dung tương tác khi có dữ liệu.
- Có thể bật / tắt:
  - Pinyin
  - nghĩa tiếng Việt
- Chế độ:
  - Học
  - Học thuộc
  - Thi thử
- Nghe toàn đoạn / nghe chậm.
- Luyện viết từng chữ trong từ vựng.
- Lưu câu đã làm, đáp án, đúng / sai và vị trí đang học.
- Phần **Toàn bộ bài** cho phép xem trang sách gốc để đối chiếu.

Các PDF sách được tách theo từng bài:

```text
data/textbook/
├── lesson01.pdf
├── lesson02.pdf
├── ...
└── lesson15.pdf
```

Việc tách nhỏ giúp:
- dễ upload lên GitHub;
- tránh giới hạn file lớn;
- iPad chỉ cần tải bài đang học.

### 🎯 Ôn giữa kỳ
Phần này được thêm riêng để luyện **Lesson 1 · Dialogue 1 & Dialogue 2** theo format đề mẫu của giáo viên.

Có các phần:
- Listening A — Thanh điệu.
- Listening B — Nghe + nhìn hình.
- Listening C — Nghe hội thoại + chọn hình.
- 生詞看圖 — Từ vựng nhìn hình.
- 看句子選圖 — Đọc câu chọn hình.
- 課文填空 — Điền hội thoại.
- 語法 — Ngữ pháp.
- Ôn ngẫu nhiên.
- Ôn câu sai.
- Thi thử 105 phút.
- Lưu lịch sử kết quả.

#### Chế độ ảnh
Trong từng phần ôn tập có thể chọn:

**Ảnh học**
- lấy trực tiếp từ nội dung gốc;
- có chữ Hán;
- có Pinyin;
- có nghĩa tiếng Anh khi bản gốc có.

**Ảnh thi**
- dùng ảnh theo dạng kiểm tra;
- chỉ giữ thông tin phù hợp với chế độ thi;
- không dùng ảnh do code tự vẽ lại.

Các ảnh của Midterm hiện được **nhúng trực tiếp trong `midterm.js`**, vì vậy bản cập nhật Midterm thường không cần upload riêng thư mục ảnh.

### 🧠 Quiz
- Trắc nghiệm từ vựng.
- Kiểm tra nội dung đã học.
- Kết quả được dùng để theo dõi tiến độ.

### 📊 Tiến độ
- Theo dõi từ đã học / đã nhớ.
- Tiến độ Reading.
- Tiến độ luyện viết.
- Tiến độ Midterm.
- Lịch sử bài thi thử.
- Có cơ chế Export / Import dữ liệu.

### 部首 — Bộ thủ
- Học bộ thủ.
- Có phần luyện viết bộ thủ.
- Hỗ trợ mẫu chữ / luyện nhiều lần / A4 copybook theo phiên bản hiện tại.

---

# 2. Tài khoản cá nhân và đồng bộ dữ liệu

Website dùng **Supabase Auth** để tạo tài khoản và đăng nhập.

Khi đăng nhập thành công, tiến độ có thể được đồng bộ theo `user_id` của tài khoản trong bảng:

```text
user_learning_state
```

Dữ liệu có thể bao gồm:
- tiến độ A1 / A2;
- từ đã nhớ;
- favorites;
- ngày đang học;
- Bộ thủ;
- Reading;
- luyện viết;
- câu & bài tập;
- Midterm Review;
- câu đã làm;
- đáp án đã chọn;
- câu đúng / sai;
- lịch sử thi thử;
- vị trí học hiện tại.

Nếu chưa đăng nhập hoặc Supabase tạm thời không kết nối được, website vẫn có thể lưu dữ liệu trên thiết bị bằng `localStorage`, nhưng phần đó **chưa được đồng bộ lên tài khoản cloud**.

---

## 3. Cách tạo tài khoản trên website

1. Mở website.
2. Bấm nút **Đăng nhập / tài khoản** ở góc trên.
3. Chọn **Tạo tài khoản**.
4. Nhập:
   - email;
   - mật khẩu.
5. Bấm đăng ký.
6. Nếu Supabase đang bật **Confirm email**, mở email xác nhận và bấm link xác nhận.
7. Quay lại website và đăng nhập.

Supabase Hosted Projects thường có thể yêu cầu xác minh email tùy cấu hình Auth của project.

Sau khi đăng nhập:
- học như bình thường;
- chờ một chút để web sync tiến độ;
- trên thiết bị khác, đăng nhập lại cùng tài khoản để tải tiến độ cloud.

### Nếu hiện `Load failed`
Kiểm tra:
1. Supabase project còn **Active** hay đang Paused.
2. `config.js` có đúng Supabase URL và public key.
3. Authentication → URL Configuration có đúng:
   - Site URL;
   - Redirect URLs của GitHub Pages.
4. Trình duyệt có đang chặn kết nối hay không.

> Không nên xóa Website Data / localStorage trước khi chắc chắn dữ liệu đã được sync lên cloud.

---

# 4. Lấy Groq API để dùng AI nhận diện giọng nói

Website hỗ trợ Speech-to-Text bằng **Groq Whisper**.

Model đang dùng / tương thích:

```text
whisper-large-v3
```

Groq cũng cung cấp `whisper-large-v3-turbo`, nhưng nếu code hiện tại đã cấu hình `whisper-large-v3` thì không cần đổi.

## Cách tạo Groq API Key

1. Truy cập:

```text
https://console.groq.com/
```

2. Đăng nhập hoặc tạo tài khoản Groq.
3. Mở trang **API Keys**:

```text
https://console.groq.com/keys
```

4. Bấm **Create API Key**.
5. Đặt tên, ví dụ:

```text
LearningTOCFL
```

6. Tạo key.
7. Sao chép key và lưu ở nơi an toàn.

Groq lưu ý phải bảo vệ API key để tránh truy cập trái phép.

## Thêm API Key vào website

Trong website:
1. Mở phần cài đặt / luyện phát âm có mục Groq API.
2. Dán API Key cá nhân.
3. Lưu.
4. Cho phép trình duyệt sử dụng microphone.
5. Bấm **Bắt đầu ghi âm**.
6. Đọc từ hoặc câu tiếng Trung.
7. Dừng ghi âm.
8. Bấm kiểm tra / nhận diện.

Luồng cơ bản:

```text
Microphone
→ ghi âm
→ gửi audio tới Groq Speech-to-Text
→ Whisper nhận dạng tiếng Trung
→ website so sánh text nhận dạng với đáp án
→ hiển thị kết quả
```

Groq Speech-to-Text hỗ trợ endpoint:

```text
POST https://api.groq.com/openai/v1/audio/transcriptions
```

### Bảo mật API Key

**KHÔNG** làm các việc sau:
- ghi API key trực tiếp vào `app.js`;
- ghi API key vào `config.js`;
- commit API key lên GitHub;
- gửi ảnh API key công khai;
- để key trong repository public.

Nếu key bị lộ:
1. vào Groq Console;
2. xóa / revoke key cũ;
3. tạo key mới.

Nếu deployment hiện tại dùng Supabase Edge Function như `groq-speech`, nên giữ API handling qua cơ chế đó thay vì hard-code khóa trong frontend.

---

# 5. Cấp quyền microphone

Speech Recognition cần quyền microphone.

### Safari / iPad
- mở website bằng HTTPS;
- cho phép Microphone khi Safari hỏi;
- nếu đã từ chối:
  - Settings → Safari / Website Settings;
  - bật lại quyền microphone cho website.

### Chrome / Edge
- bấm biểu tượng ổ khóa bên trái địa chỉ;
- Site settings;
- Microphone → Allow.

GitHub Pages sử dụng HTTPS nên phù hợp cho microphone trên trình duyệt.

---

# 6. Cấu trúc project chính

```text
LearningChinese/
├── index.html
├── app.js
├── auth.js
├── config.js
├── reading.js
├── midterm.js
├── radicals.js
├── pinyin-helper.js
├── styles.css
├── sw.js
├── manifest.webmanifest
│
├── data/
│   ├── a1.json
│   ├── a2.json
│   ├── a1_enrichment.json
│   ├── radicals.json
│   ├── readings.json
│   └── textbook/
│       ├── lesson01.pdf
│       ├── ...
│       └── lesson15.pdf
│
├── icons/
├── supabase/
└── README.md
```

Một số file có thể khác tùy phiên bản repository hiện tại.

---

# 7. Các file quan trọng — không nên xóa

```text
index.html
app.js
auth.js
config.js
reading.js
midterm.js
radicals.js
pinyin-helper.js
styles.css
sw.js
manifest.webmanifest
README.md
```

Và các thư mục:

```text
data/
icons/
supabase/
```

Nếu repository có `homework/` và bạn vẫn cần nội dung đó thì giữ lại.

---

# 8. Các file lịch sử có thể xóa

Các file chỉ dùng để ghi lại lịch sử hotfix / phiên bản cũ có thể xóa sau khi nội dung đã được tổng hợp vào README này.

Ví dụ:

```text
COPYBOOK_*_v*.txt
FOUNDATION_STUDY_v*.txt
FULL_CHAPTERS_v*.txt
MIDTERM_*_v*.txt
READING_*_v*.txt
STROKE_*_v*.txt
WRITING_*_v*.txt
CHARACTER_*_2026-*.md
ADAPTIVE_LAYOUT_FIX_*.md
```

Chỉ xóa khi chắc chắn đó là **tài liệu ghi chú**, không phải file được import / fetch bởi code.

Giữ lại:

```text
README.md
```

---

# 9. Cập nhật website trên GitHub

## Cập nhật nhanh
Nếu được cung cấp bản `QUICK`, chỉ upload các file có trong QUICK.

Ví dụ:

```text
midterm.js
sw.js
```

hoặc:

```text
midterm.js
styles.css
sw.js
```

Không cần upload lại toàn bộ source nếu không được yêu cầu.

## Cập nhật toàn bộ
Bản `FULL` dùng khi:
- muốn tạo lại repository;
- cần backup toàn bộ project;
- project trên GitHub đã bị thiếu file.

### Lưu ý khi upload bằng GitHub Web
GitHub Web có thể giới hạn kích thước file và số lượng file upload cùng một lần.

Vì vậy:
- PDF sách đã được chia thành 15 file;
- nếu có quá nhiều file, upload từng thư mục / từng nhóm nhỏ;
- hoặc dùng GitHub Desktop / git.

---

# 10. GitHub Pages

Thông thường:

1. Repository → **Settings**.
2. **Pages**.
3. Source:
   - Deploy from a branch.
4. Branch:
   - `main`
   - `/ (root)`
5. Save.
6. Chờ deployment hoàn tất.

Sau khi cập nhật:
- GitHub Pages có thể mất một lúc để deploy;
- Service Worker có thể vẫn giữ cache cũ.

Nếu web vẫn hiển thị bản cũ:
1. đóng tab;
2. mở lại website;
3. refresh.

Chỉ xóa Website Data khi thật sự cần và sau khi chắc chắn tiến độ đã sync cloud.

---

# 11. Supabase cho developer

Project sử dụng Supabase cho:
- Authentication;
- tiến độ cloud;
- dữ liệu theo tài khoản;
- Edge Functions nếu được cấu hình.

Các file liên quan nằm trong:

```text
supabase/
```

Khi triển khai project mới:
1. tạo Supabase project;
2. cấu hình Auth;
3. chạy SQL / cấu hình database theo các file trong `supabase/`;
4. cấu hình RLS;
5. cấu hình Site URL + Redirect URLs;
6. cập nhật `config.js`;
7. deploy Edge Function cần thiết nếu dùng.

### Không commit secret
Frontend chỉ nên chứa public / publishable key phù hợp với Supabase client.

Không đưa:
- service role key;
- Groq secret key;
- private secrets

vào repository public.

---

# 12. Dữ liệu tài khoản

Cloud progress được thiết kế để tách theo người dùng.

```text
User A
→ user_id A
→ progress A

User B
→ user_id B
→ progress B
```

Row Level Security (RLS) phải giới hạn user chỉ đọc / ghi dữ liệu của chính mình.

---

# 13. Backup dữ liệu học

Nên định kỳ:
- đăng nhập để đảm bảo sync cloud;
- dùng Export nếu website có nút Export;
- giữ file backup JSON ở máy.

Khi Import:
- kiểm tra đúng tài khoản;
- tránh overwrite dữ liệu mới bằng backup quá cũ.

---

# 14. Midterm progress

Phần Midterm sử dụng state riêng để nhớ:
- phần đang học;
- câu hiện tại;
- đáp án;
- đúng / sai;
- câu sai cần ôn;
- random review;
- mock exam;
- lịch sử.

State local hiện dùng key dạng:

```text
tocfl-midterm-progress-v1
```

Khi cloud sync hoạt động, dữ liệu Midterm được đưa vào progress của tài khoản.

---

# 15. Service Worker / cache

`sw.js` dùng cho cache / PWA behavior.

Sau mỗi cập nhật quan trọng:
- cập nhật `sw.js` cùng bản code;
- nếu cần thì bump cache version.

Nếu code mới đã deploy nhưng trình duyệt vẫn hiển thị code cũ, thường là do:
- Service Worker;
- browser cache;
- GitHub Pages chưa deploy xong.

---

# 16. Quy tắc nội dung tiếng Trung

Project ưu tiên:
- **Traditional Chinese / chữ Phồn thể**;
- giữ đúng cách viết trong sách;
- không tự đổi `妳` thành `你` hoặc ngược lại khi nội dung gốc dùng cách khác;
- Reading / textbook nên đối chiếu với trang scan gốc.

Nếu một chữ có nhiều cách viết hợp lệ, nội dung học vẫn ưu tiên **cách viết xuất hiện trong tài liệu gốc** để tránh gây nhầm khi học thuộc.

---

# 17. Gợi ý workflow học

```text
1. Học từ mới
2. Nghe từ
3. Viết từng chữ
4. Đánh dấu đã nhớ
5. Học hội thoại
6. Tắt Pinyin
7. Tắt nghĩa Việt
8. Học thuộc
9. Làm Grammar / Exercise
10. Ôn ngẫu nhiên
11. Ôn câu sai
12. Làm mock exam
```

---

# 18. Nguồn kỹ thuật

Supabase Auth:
- https://supabase.com/docs/guides/auth
- https://supabase.com/docs/guides/auth/passwords

Groq API Keys:
- https://console.groq.com/keys

Groq Speech-to-Text:
- https://console.groq.com/docs/speech-to-text

---

# 19. Bảo mật

- Không commit API secret.
- Không chia sẻ Groq API Key.
- Không commit Supabase service-role key.
- Repository public chỉ nên chứa frontend code và public configuration phù hợp.
- Nếu nghi ngờ key bị lộ, revoke và tạo key mới ngay.

---

# 20. Ghi chú cuối

Project này được tối ưu cho quá trình tự học TOCFL, đặc biệt:
- Traditional Chinese;
- iPad;
- Apple Pencil;
- pronunciation practice;
- textbook reading;
- Midterm review;
- cloud progress.

Nếu thêm tính năng mới, nên ưu tiên:
1. **không phá chức năng đang ổn định**;
2. cập nhật theo dạng additive;
3. giữ backward compatibility với dữ liệu tiến độ cũ;
4. chỉ thay các file thật sự cần thiết trong QUICK update.
