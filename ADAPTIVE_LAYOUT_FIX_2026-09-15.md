# Adaptive layout fix — 2026-09-15

- Removed the nested vertical scrollbar from the Character Origins lesson card. The page now owns vertical scrolling.
- Bottom lesson navigation is sticky, so Previous / Reset / Next remain easy to reach.
- Rebuilt the character selector as a fixed label + horizontal strip. Selecting a character centers only the strip; it no longer shifts the entire row/page.
- Added orientation-aware layouts for laptop, iPad portrait/landscape, and iPhone portrait/landscape.
- Phone portrait origin cards wrap instead of forcing a horizontal content scroller.
- Added safe-area spacing for iPhone.
- Service worker cache: v4.31-adaptive-no-inner-scroll.
