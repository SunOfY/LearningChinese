# Cập nhật bộ thủ chỉ bằng dữ liệu

Từ phiên bản này, phần **Bộ thủ** lấy nội dung từ duy nhất file:

`data/radicals.json`

Bạn không cần sửa `radicals.js`, `styles.css`, `index.html` hay logic luyện viết khi thêm bộ mới.

## Cách cập nhật nhanh

1. Mở `data/radicals.json`.
2. Thêm một object mới vào mảng `radicals`.
3. Thêm nhánh từ vựng có cùng `key` vào `expansionTrees`.
4. Nếu muốn, thêm họ âm vào `soundFamilies`.
5. Commit/push **chỉ file `data/radicals.json`** lên GitHub Pages.
6. Refresh trang. Service worker dùng network-first cho JSON nên dữ liệu mới sẽ được lấy trực tiếp từ mạng khi có thể.

## Quy tắc quan trọng

- `key` phải duy nhất, không dấu, ví dụ: `animal`, `metal`, `rain`.
- `expansionTrees` dùng đúng `key` của bộ tương ứng.
- Mỗi chữ chính nên có: chữ Hán, Pinyin, nghĩa 3 ngôn ngữ, cấu tạo, giải thích và câu ví dụ.
- Từ mở rộng có dạng: `[Hanzi, Pinyin, nghĩa VI, nghĩa EN, nghĩa 繁中]`.
- Không được để dấu phẩy thừa cuối object/array vì đây là JSON chuẩn.

## Mẫu một bộ mới

```json
{
  "key": "metal",
  "radical": "金 / 釒",
  "pinyin": "jīn",
  "icon": "🔩",
  "meaning": {
    "vi": "kim loại, tiền bạc",
    "en": "metal; money",
    "zh-Hant": "金屬、金錢"
  },
  "origin": {
    "vi": "金 thường gợi nhóm nghĩa liên quan kim loại, vật kim loại hoặc tiền bạc.",
    "en": "金 often points to metal objects, metals, or money.",
    "zh-Hant": "金常提示金屬、金屬物件或金錢相關意思。"
  },
  "chars": [
    {
      "h": "銀",
      "p": "yín",
      "m": {"vi":"bạc","en":"silver","zh-Hant":"銀"},
      "s": "釒 + 艮",
      "w": {
        "vi": "釒 gợi nghĩa kim loại; 艮 là thành phần gợi âm lịch sử.",
        "en": "釒 gives the metal meaning; 艮 is the historical sound component.",
        "zh-Hant": "釒提示金屬；艮是歷史上的聲音部件。"
      },
      "ex": [
        "這是銀色的。",
        "Zhè shì yínsè de.",
        {"vi":"Cái này màu bạc.","en":"This is silver-colored.","zh-Hant":"這是銀色的。"}
      ]
    }
  ]
}
```

Và trong `expansionTrees`:

```json
"metal": [
  [
    "銀", "yín", "bạc", "silver", "銀",
    [
      ["銀行", "yínháng", "ngân hàng", "bank", "銀行"],
      ["銀色", "yínsè", "màu bạc", "silver color", "銀色"]
    ]
  ]
]
```

## Từ lần sau

Nếu chỉ muốn thêm bộ mới/từ mới, chỉ cần thay `data/radicals.json`. Không cần upload lại toàn bộ website.
