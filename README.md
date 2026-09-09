# TOCFL Traditional Chinese · Multi-level v4.7

Website học TOCFL Phồn thể chạy trên GitHub Pages, hỗ trợ Laptop/iPad/iPhone, Supabase Auth + cloud sync và Groq Speech BYOK.

## Điểm mới v4.7

- Hỗ trợ sẵn A1, A2, B1, B2, C1, C2.
- A1 hoạt động ngay. Các cấp chưa có file dữ liệu hiển thị **Coming soon**.
- Sau này không cần sửa `app.js`: chỉ upload `data/a2.json`, `data/b1.json`... để kích hoạt cấp tương ứng.
- File enrichment là tùy chọn: `data/a2_enrichment.json`, `data/b1_enrichment.json`...
- Sau đăng nhập, nếu chưa bật **Nhớ trình độ đã chọn**, web hiện hộp chọn trình độ.
- Nếu bật **Nhớ trình độ đã chọn**, lần sau tài khoản mở thẳng cấp đã chọn.
- Nếu tắt, web hỏi lại ở một phiên mới; reload trong cùng tab không làm hộp chọn bật liên tục.
- Nút `🎓 A1/A2/...` trên header cho phép đổi trình độ bất kỳ lúc nào.
- Tiến độ, yêu thích và ngày học được tách riêng theo từng trình độ nhưng vẫn dùng **cùng một tài khoản Supabase**.
- Tự migrate tiến độ A1 cũ sang định dạng nhiều trình độ; không cần SQL mới.

## Kích hoạt A2 sau này

Upload:

```text
data/a2.json
data/a2_enrichment.json   # tùy chọn nhưng nên có
```

Sau khi GitHub Pages cập nhật, mở nút `🎓 Trình độ`. A2 sẽ tự chuyển từ **Coming soon** sang **Sẵn sàng**. `sw.js` dùng network-first cho mọi `data/*.json`, nên không cần tăng cache version chỉ vì thêm file dữ liệu.

Xem `data/LEVEL_DATA_FORMAT.md` để biết cấu trúc JSON.

## File dữ liệu hiện tại

- `data/a1.json`: dữ liệu A1 gốc.
- `data/a1_enrichment.json`: nghĩa English + câu ví dụ A1.
- `data/enrichment_day1.json`: giữ lại để tương thích bản cũ.
- `data/a2.example.json` và `data/a2_enrichment.example.json`: file mẫu, **không kích hoạt A2** vì tên có `.example`.

## Supabase

Không cần chạy schema mới cho multi-level. Website vẫn dùng `public.user_learning_state`. Cột `progress` JSONB chứa toàn bộ trạng thái A1–C2; các cột `favorites` và `last_day` tiếp tục giữ bản mirror A1 để tương thích dữ liệu cũ. RLS hiện tại vẫn áp dụng theo `user_id`.

## Lưu ý quan trọng

Giữ `id` của từng từ ổn định sau khi phát hành dữ liệu. Nếu đổi ID, tiến độ đã lưu của người học sẽ không còn khớp với từ đó.
