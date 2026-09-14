# Radical examples + font-size controls

- Every expanded radical vocabulary item now has two short example sentences in `data/radicals.json` under `exampleSets`.
- Each example shows Traditional Chinese, Pinyin, translation in the current UI language, and a listen button.
- Core-character lessons keep their original example sentence and use the same example UI.
- Added A− / A+ / reset controls in the Radicals tab. Range: 90%–160%.
- Font size preference is stored locally and synced in the existing account progress payload when signed in.
- No new Supabase table/schema is required.
