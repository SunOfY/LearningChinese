# Character Origins classroom-style update

New mode in **Bộ thủ / Components**: **🖼 Từ hình đến chữ**.

The first 9 lessons follow the visual structure shown in the classroom photos:

- Pictograms: 日、月、目、手、門、馬
- Combined ideograms: 明、看
- Phono-semantic compound: 們

Each lesson is intentionally shown one item at a time:

1. Real-object visual / components and ancient form
2. Explanation + memory image
3. One developed word at a time
4. One example sentence at a time
5. Listen / slow / fast / Groq AI pronunciation / handwriting

Progress is stored in `tocfl-character-origin-flow-v1` and is included in the existing account cloud sync payload.

## Data-only expansion

Add more lessons in:

`data/character-origins.json`

Ancient-form images currently reference public-domain oracle-script files on Wikimedia Commons. If one cannot load, the lesson still works and shows a fallback message.

Service worker cache: `tocfl-v4-25-character-origins`.
