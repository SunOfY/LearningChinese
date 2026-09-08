# TOCFL A1 - GitHub Pages

Website tĩnh (HTML/CSS/JavaScript) để học TOCFL A1 Phồn thể. Không cần backend, không cần để laptop chạy server.

## Có gì trong bản thử

- Toàn bộ **507 mục A1** từ PDF gốc trong `data/a1.json`.
- Chia sẵn khoảng 20 từ/ngày theo trường `day`.
- Ngày 1 có **20 từ được bổ sung English + 2 câu ví dụ song ngữ** để thử giao diện.
- 🔊 Phát âm từ/câu bằng `speechSynthesis`, ưu tiên `zh-TW`.
- 🎙 Ghi âm microphone + ▶ phát lại bằng `MediaRecorder`.
- ✍️ Canvas luyện viết dùng chuột, ngón tay hoặc Apple Pencil.
- Ẩn/hiện Pinyin.
- Đánh dấu mức nhớ: Chưa nhớ / Tạm nhớ / Đã nhớ.
- Quiz.
- Tìm kiếm toàn bộ từ vựng.
- Lưu tiến độ bằng `localStorage`.
- Xuất/nhập file tiến độ giữa các thiết bị.
- Responsive cho laptop / iPad / iPhone.
- PWA cơ bản + service worker để cache website.

> Lưu ý: GitHub Pages dùng HTTPS nên microphone thuận lợi hơn khi chạy bằng địa chỉ IP local. Trình duyệt vẫn sẽ hỏi quyền microphone.

## Upload lên GitHub Pages

1. Tạo một repository mới trên GitHub, ví dụ `tocfl-a1`.
2. Upload **toàn bộ file và thư mục trong project này** lên root repository.
3. Vào **Settings → Pages**.
4. Ở **Build and deployment**, chọn **Deploy from a branch**.
5. Branch: `main`, folder: `/ (root)` → **Save**.
6. Chờ GitHub deploy. Link thường có dạng:
   `https://TEN_GITHUB.github.io/tocfl-a1/`

## iPhone/iPad

Mở website bằng Safari → Share → **Add to Home Screen** để dùng gần giống app.

## Cấu trúc

```text
TOCFL_A1_GitHub_Pages/
├── index.html
├── styles.css
├── app.js
├── sw.js
├── manifest.webmanifest
├── data/
│   ├── a1.json
│   └── enrichment_day1.json
└── icons/
    ├── icon-192.png
    └── icon-512.png
```

## Dữ liệu

`data/a1.json` giữ dữ liệu trích từ tài liệu người dùng cung cấp. Một số điểm bất thường trong PDF gốc được giữ nguyên thay vì tự ý sửa.

`data/enrichment_day1.json` là phần bổ sung cho việc học: English + câu ví dụ; không phải nội dung lấy từ PDF gốc.
# LearningChinese
