# Bật 20 lượt Groq AI miễn phí cho Guest

Bản website này đã được sửa để:

- **Không đăng nhập:** dùng `groq-guest` và được tối đa **20 lượt AI / trình duyệt**.
- **Đã đăng nhập:** giữ nguyên luồng Groq BYOK hiện có (`groq-speech`) và dùng API key cá nhân của tài khoản.
- `GROQ_GUEST_API_KEY` **không nằm trong GitHub/JavaScript**, chỉ nằm trong Supabase Edge Function Secret.

> Lưu ý: “20 lượt / thiết bị” được thực hiện bằng một Guest ID lưu trong trình duyệt + bộ đếm server. Nếu người dùng xóa toàn bộ dữ liệu trình duyệt hoặc chuyển sang trình duyệt khác thì có thể nhận Guest ID mới. Đây là giới hạn thử nghiệm, không phải nhận dạng thiết bị tuyệt đối.

## 1. Tạo bảng đếm 20 lượt

Trong Supabase Dashboard của project LearningChinese:

1. Mở **SQL Editor**.
2. Mở file `supabase/guest_trial.sql` trong source này.
3. Copy toàn bộ nội dung và **Run** một lần.

Bảng `guest_groq_usage` không cho `anon` hay `authenticated` đọc/ghi trực tiếp. Chỉ Edge Function dùng quyền server để cập nhật bộ đếm.

## 2. Thêm Groq API key của tài khoản test

Trong Supabase Dashboard, vào phần **Edge Functions / Secrets** (hoặc Project Secrets) và tạo:

- Name: `GROQ_GUEST_API_KEY`
- Value: `gsk_...` của tài khoản Groq chỉ dùng cho Guest

Không paste key này vào `config.js`, `app.js`, `auth.js` hay GitHub.

Tuỳ chọn:

- `GROQ_GUEST_LIMIT` = `20` (không đặt cũng mặc định là 20)
- `GROQ_GUEST_ALLOWED_ORIGINS` = `https://sunofy.github.io`

Nếu sau này dùng custom domain, thêm các origin, cách nhau bằng dấu phẩy.

## 3. Deploy Edge Function

Source function nằm tại:

`supabase/functions/groq-guest/index.js`

Và `supabase/config.toml` đã có:

```toml
[functions.groq-guest]
verify_jwt = false
```

Điều này là bắt buộc vì Guest chưa đăng nhập không có user JWT.

### Cách CLI

Sau khi cài Supabase CLI và link đúng project:

```bash
supabase login
supabase link --project-ref rditnbjqhtpyqhdnuwvb
supabase functions deploy groq-guest
```

Nếu muốn đặt secret bằng CLI thay vì Dashboard:

```bash
supabase secrets set GROQ_GUEST_API_KEY="gsk_..." GROQ_GUEST_LIMIT="20"
```

## 4. Upload frontend lên GitHub Pages

Upload/copy các file frontend trong bản ZIP này lên repository `SunOfY/LearningChinese` như bình thường.

`sw.js` đã được tăng cache version để trình duyệt lấy code mới.

## 5. Kiểm tra

Mở website ở chế độ chưa đăng nhập:

1. Phần luyện phát âm sẽ hiện đại loại: `Guest: còn 20/20 lượt AI miễn phí`.
2. Bấm **Kiểm tra phát âm**.
3. Cho phép microphone và đọc từ.
4. Sau lần thành công đầu tiên sẽ còn `19/20`.
5. HomeWork dùng cùng bộ đếm 20 lượt này.
6. Khi về 0, web báo hết lượt và không gọi Groq nữa.

Đăng nhập lại bằng tài khoản có Groq Key cá nhân thì website tiếp tục dùng `groq-speech` như trước và không trừ 20 lượt Guest.

## Bảo mật

- `GROQ_GUEST_API_KEY` chỉ ở Supabase Secret.
- Function chỉ chấp nhận origin mặc định của website `https://sunofy.github.io` (và localhost để test).
- Bộ đếm nằm server-side nên sửa `localStorage` đơn thuần không tăng lại bộ đếm nếu Guest ID vẫn giữ nguyên.
- Tuy nhiên một người cố tình có thể xóa dữ liệu browser để lấy Guest ID mới. Muốn chống abuse mạnh hơn cần thêm rate-limit/IP/fingerprint ở backend.
