# Character compound explanations — 2026-09-15

Updated the **Từ hình đến chữ / From image to character** mode so the learner can see not only how an ancient pictograph becomes a modern character, but also **why developed words mean what they mean**.

For all 108 developed vocabulary items in `data/character-origins.json`, the data now includes:

- semantic chunks of the word;
- a formation type (direct compound, grammar pattern, lexicalized word, proper name, historical formation, result complement, classifier phrase, reduplication, etc.);
- an explanation of why the chunks produce the whole meaning;
- a visual memory bridge when helpful.

The UI now displays a visual formula such as:

`看 (look) + 見 (see/result) → 看見 (see)`

and explains that 看 is the action while 見 is the result. For words that should **not** be interpreted literally, the UI explicitly says so, e.g. 水果, 四川, 開水, 目的, 西洋.

Languages supported: Vietnamese, English, Traditional Chinese.
