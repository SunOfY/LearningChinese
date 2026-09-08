TOCFL A1 Pronunciation Hotfix v4.4

Replace ONLY these files in the GitHub repository root:
- app.js
- sw.js

Changes:
- Recording and pronunciation checking are now separate.
- Recording is only for playback/self-review.
- “Kiểm tra phát âm” always starts a fresh live zh-TW speech-recognition pass.
- The check button works even when no recording has been made.
- Explicit error messages for: no speech, network, microphone permission, audio capture, unsupported language, timeout, and generic recognition errors.
- Pauses page audio before recognition to reduce mobile Safari audio-session conflicts.
- Exact recognized target now scores 100 regardless of browsers that return confidence=0.
- Cache version bumped to v4.4.

After uploading, wait for GitHub Pages deployment. On iPad/iPhone, close and reopen the site. If an old app.js is still cached, clear Website Data for the GitHub Pages domain once.
