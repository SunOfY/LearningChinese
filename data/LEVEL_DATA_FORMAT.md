# Thêm trình độ mới mà không sửa code

Website v4.7 tự kiểm tra các file sau: `a1.json`, `a2.json`, `b1.json`, `b2.json`, `c1.json`, `c2.json`.

Để kích hoạt một trình độ đang **Coming soon**, chỉ cần upload file dữ liệu gốc đúng tên, ví dụ:

- `data/a2.json` → A2 tự chuyển thành **Sẵn sàng**.
- `data/b1.json` → B1 tự chuyển thành **Sẵn sàng**.

File enrichment là **không bắt buộc** nhưng nên có để thêm nghĩa English và câu ví dụ tốt hơn:

- `data/a2_enrichment.json`
- `data/b1_enrichment.json`
- ...

## Cấu trúc file base

```json
{
  "meta": {
    "title": "TOCFL A2",
    "count": 1,
    "daily_target": 20,
    "language": "zh-TW"
  },
  "vocabulary": [
    {
      "id": "A2-001",
      "traditional": "緊張",
      "pinyin": "jǐnzhāng",
      "level": "A2",
      "pos": "VS",
      "meaning_vi": "căng thẳng",
      "day": 1
    }
  ]
}
```

`id` phải ổn định sau khi người dùng đã học, vì tiến độ được gắn với ID. Nếu bỏ `day`, web tự chia theo `meta.daily_target` (mặc định 20).

## Cấu trúc enrichment

```json
{
  "A2-001": {
    "meaning_en": "nervous; tense",
    "examples": [
      {
        "zh": "我有一點緊張。",
        "pinyin": "Wǒ yǒu yìdiǎn jǐnzhāng.",
        "vi": "Tôi hơi căng thẳng.",
        "en": "I'm a little nervous."
      }
    ]
  }
}
```

Sau khi upload dữ liệu lên GitHub Pages, mở nút **🎓 Trình độ**. Web dùng network-first cho `data/*.json`, nên không cần sửa `app.js` hay `sw.js`.
