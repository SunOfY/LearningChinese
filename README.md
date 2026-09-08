# TOCFL A1 · GitHub Pages v3

Website học **TOCFL A1 Phồn thể** dành cho Laptop, iPad và iPhone. Website là static site nên có thể host miễn phí trên GitHub Pages. Phần tài khoản/đồng bộ dùng Supabase (có free tier) và là tùy chọn.

## Những gì đã có

- **507 mục A1** từ PDF nguồn.
- Chia **20 từ/ngày**, tổng 26 ngày.
- Chữ Phồn thể + Pinyin + nghĩa tiếng Việt.
- Nghĩa tiếng Anh: 20 từ đầu có sẵn; các từ còn lại được tra từ CC-CEDICT khi website có mạng và lưu cache trên thiết bị.
- **2 câu ví dụ cho mọi từ**: 507 từ × 2 = **1.014 câu**.
  - 20 từ đầu có câu biên soạn riêng.
  - Các từ còn lại dùng bộ câu A1 được tạo theo từ loại/nhóm nghĩa.
- Pinyin cho câu ví dụ; bộ kiểm tra hiện không còn ký tự Hán chưa chuyển sang Pinyin trong 1.014 câu tạo tự động.
- Nút 🔊 đọc từ và đọc câu bằng `zh-TW`.
- 🎙 Ghi âm, ⏹ dừng, ▶ phát lại.
- **So sánh phát âm** bằng Speech Recognition của trình duyệt:
  - khi ghi âm, website đồng thời cố nhận dạng giọng nói;
  - so sánh chữ nhận dạng với từ mục tiêu;
  - hiển thị chữ máy nhận ra + điểm 0–100 + phản hồi.
  - Đây là **điểm nhận dạng từ**, không phải pronunciation assessment chuyên sâu cho từng thanh điệu/âm vị.
- ✍️ Luyện viết bằng chuột, ngón tay hoặc Apple Pencil.
- Quiz, tìm từ, yêu thích, tiến độ, export/import tiến độ.
- Đổi giao diện: **Tiếng Việt / English / 中文（繁體）**.
- Responsive cho Laptop, iPad, iPhone.
- PWA/service worker.
- **Tạo tài khoản / đăng nhập / đăng xuất** bằng email + mật khẩu.
- **Đồng bộ tiến độ theo từng tài khoản** giữa nhiều thiết bị khi cấu hình Supabase.
- Nếu chưa cấu hình Supabase, website vẫn chạy bình thường ở **Guest mode**.

---

# A. Upload website lên GitHub Pages

1. Tạo một repository trên GitHub, ví dụ `tocfl-a1`.
2. Upload **toàn bộ file bên trong thư mục này** vào nhánh `main`.
3. Vào `Settings` → `Pages`.
4. Chọn `Deploy from a branch`.
5. Chọn `main` và `/ (root)` → Save.
6. GitHub sẽ tạo URL kiểu:

```text
https://YOUR_GITHUB_USERNAME.github.io/tocfl-a1/
```

Website học cơ bản chạy được ngay, kể cả khi bạn chưa cấu hình tài khoản.

---

# B. Bật chức năng tạo tài khoản + đăng nhập + đồng bộ

Website dùng **Supabase Auth + Postgres**. Bạn chỉ cần làm phần này **một lần**.

## Bước 1 — Tạo Supabase project

1. Tạo tài khoản tại Supabase.
2. Tạo một project mới.
3. Trong Supabase Dashboard, lấy:
   - **Project URL**
   - **Publishable key** (hoặc anon/public key tùy giao diện project của bạn)

> Không bao giờ đưa `service_role` / secret key vào website hoặc GitHub.

## Bước 2 — Tạo bảng tiến độ và RLS

Mở:

```text
Supabase Dashboard → SQL Editor
```

Copy toàn bộ nội dung file:

```text
supabase/schema.sql
```

và Run.

File SQL này tạo bảng `user_learning_state` và Row Level Security để mỗi người chỉ đọc/ghi tiến độ của chính tài khoản đó.

## Bước 3 — Điền config.js

Mở file:

```text
config.js
```

Thay:

```js
window.TOCFL_SUPABASE_CONFIG = {
  url: 'https://YOUR_PROJECT_ID.supabase.co',
  publishableKey: 'YOUR_SUPABASE_PUBLISHABLE_KEY'
};
```

bằng Project URL + Publishable key thật của bạn.

Sau đó commit/push lại lên GitHub.

## Bước 4 — Cấu hình URL cho Auth

Trong Supabase Authentication URL/Redirect settings, đặt Site URL là URL GitHub Pages của bạn, ví dụ:

```text
https://YOUR_GITHUB_USERNAME.github.io/tocfl-a1/
```

Thêm cùng URL đó vào Redirect URLs nếu cần xác nhận email.

## Bước 5 — Email confirmation

Có hai cách:

- **Để ON**: người dùng tạo tài khoản → mở email xác nhận → đăng nhập.
- **Tắt tạm khi test**: tạo tài khoản xong có thể đăng nhập ngay.

Nếu website dùng cho bạn bè lâu dài, nên để confirmation bật.

---

# C. Cách đồng bộ hoạt động

- Khi chưa đăng nhập: tiến độ lưu bằng `localStorage` trong trình duyệt.
- Khi tạo tài khoản mới và cloud chưa có dữ liệu: website tải tiến độ hiện tại của thiết bị lên cloud.
- Khi đăng nhập tài khoản đã có dữ liệu: website tải tiến độ cloud về thiết bị.
- Sau mỗi thay đổi như đánh dấu từ, quiz, phát âm, đổi ngày/ngôn ngữ, website tự đồng bộ sau khoảng 1 giây.
- Có nút **Đồng bộ ngay / Sync now / 立即同步** trong trang Tiến độ.

Hiện cơ chế là **last save wins** nếu cùng một tài khoản được dùng đồng thời trên nhiều thiết bị. Với cách học thông thường (dùng lần lượt iPhone/iPad/Laptop), cách này đơn giản và đủ ổn định.

---

# D. Ghi âm và chấm phát âm

Luồng sử dụng:

```text
🔊 Nghe mẫu
→ 🎙 Bắt đầu ghi âm
→ đọc từ
→ ⏹ Dừng
→ ▶ nghe lại giọng của mình
→ xem điểm / chữ máy nhận ra
```

Website dùng:

- `MediaRecorder` để ghi và phát lại.
- `SpeechRecognition` / `webkitSpeechRecognition` với `zh-TW` để nhận dạng từ.
- Levenshtein similarity + confidence của trình duyệt để tạo điểm 0–100.

**Giới hạn:** trình duyệt không cung cấp pronunciation assessment chuyên sâu để đo chính xác thanh 1/2/3/4, âm đầu và âm cuối. Vì vậy website chỉ nên hiểu điểm này là **“máy có nghe ra đúng từ tôi nói không?”**.

Chrome/Edge thường hỗ trợ Speech Recognition tốt hơn. Trên Safari/iOS khả năng hỗ trợ phụ thuộc phiên bản hệ điều hành/trình duyệt. Nếu không hỗ trợ, phần ghi âm/phát lại vẫn dùng được.

---

# E. Cấu trúc project

```text
TOCFL_A1_GitHub_Pages_v3/
├── index.html
├── styles.css
├── app.js
├── auth.js
├── config.js
├── sw.js
├── manifest.webmanifest
├── data/
│   ├── a1.json
│   └── enrichment_day1.json
├── icons/
│   ├── icon-192.png
│   └── icon-512.png
└── supabase/
    └── schema.sql
```

## File chính

- `app.js`: logic học, ví dụ, phát âm, ghi âm, luyện viết, quiz, tiến độ.
- `auth.js`: tạo tài khoản, đăng nhập, đăng xuất, đồng bộ Supabase.
- `config.js`: URL/key public của Supabase.
- `supabase/schema.sql`: bảng cloud + RLS.
- `data/a1.json`: 507 mục A1.

---

# F. Lưu ý dữ liệu nguồn

Một số dòng trong PDF nguồn có chữ/pinyin/nghĩa không khớp. Source data vẫn được giữ nguyên và website hiển thị cảnh báo; các ví dụ sử dụng dạng được suy đoán khi cần thay vì âm thầm sửa file gốc.

Ví dụ các trường hợp đã được đánh dấu trong `data/a1.json` gồm các mục có pinyin/nghĩa tương ứng với `出國`, `出來`, `出去`, `蛋糕`, `下面` nhưng chữ trong PDF có dấu hiệu lệch.

---

# G. Nếu bạn chỉ muốn thử nhanh

Bạn không cần Supabase ngay.

1. Upload tất cả lên GitHub Pages.
2. Mở website.
3. Dùng Guest mode để thử học, loa, ghi âm, viết, quiz.
4. Khi thấy ổn mới cấu hình Supabase.
