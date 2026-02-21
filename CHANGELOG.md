# Changelog

## Unreleased

### Fixed
- Layout: grid now uses `auto-rows-fr` so rows share available height and cards scale to fit viewport (`src/components/GameBoard.jsx`).
- Card sizing: replaced `aspect-square` with `w-full h-full` so grid controls card sizes and prevents overlap (`src/components/Card.jsx`).
- Reduced gaps, padding and emoji font sizes for better fit on dense boards (4×4, 6×6, 8×8).
- Scoreboard made more compact to maximize game area (`src/components/ScoreBoard.jsx`).

### Added
- Difficulty selection screen (`src/components/DifficultyScreen.jsx`) to choose 4×4, 6×6, or 8×8 boards.
- `scripts/layout_test.js` — verifies generated board arrays have correct counts and pairs.

### Notes
- Dev server runs on available ports (5173–5175). Open the URL shown in terminal (e.g. http://localhost:5174/).
- For automated visual screenshots, see `scripts/capture_screenshots.js` and instructions below.

---
