# Matching Genius - Quick Reference

## 🚀 Quick Start
```bash
cd MatchingGenius && npm install && npm run dev
# Open http://localhost:5174 in browser
```

## 📁 Project Files

### Components (8 total)
```
Card.jsx              ← Single card display & flip
GameBoard.jsx         ← Main game grid + scores
GameOverScreen.jsx    ← Results & winner
LandingPage.jsx       ← Welcome screen
PlayerSetup.jsx       ← Player config
ScoreBoard.jsx        ← Live scores
Timer.jsx             ← Timer utility
TurnCountdown.jsx     ← 5-second countdown
```

### Core Files
```
App.jsx               ← Game engine & state management
index.css             ← Global styles + animations
main.jsx              ← Entry point
```

### Config
```
package.json          ← Dependencies
tailwind.config.js    ← Tailwind theme
postcss.config.js     ← CSS processing
vite.config.js        ← Build config
```

## 🎮 Game Rules (30 seconds)
1. Setup 1-4 players with names
2. Players take turns flipping 2 cards per turn (15 seconds each)
3. Match pairs = +2 points, continue turn
4. Mismatch = cards flip back, next player
5. Timeout = cards flip back, next player
6. Game ends when all 36 cards matched
7. Winner = highest score

## 🎯 Key Features
✅ 6×6 card grid (36 cards, 18 unique pairs)  
✅ Turn-based gameplay (15 seconds per turn)  
✅ Real-time scoring  
✅ 5-second countdown before turns  
✅ 1-4 local players  
✅ Responsive design (mobile/tablet/desktop)  
✅ Modern dark theme with neon accents  
✅ Smooth animations  

## 🧩 Game States
```
landing → setup → countdown → playing → gameover
```

## 💻 Commands
```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview build
npm run lint     # Check code
```

## 🎨 Customization

### Change Animals
Edit `src/App.jsx` line 10:
```javascript
const ANIMALS = ['🐶', '🐱', '🐭', ...];
```

### Adjust Timer (15 seconds)
Search `setTimeLeft(15)` in `src/App.jsx` and change `15`

### Change Colors
Edit `tailwind.config.js` neon colors

## 📊 Stats
- **Total Cards**: 36
- **Unique Pairs**: 18
- **Players**: 1-4
- **Time per Turn**: 15 seconds
- **Countdown**: 5 seconds
- **Points per Match**: 2 points

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Port in use | Server uses 5174 automatically |
| Doesn't load | Hard refresh (Cmd+Shift+R) |
| Cards won't flip | Update browser, check console |
| Scores wrong | Refresh page |

## 📱 Screen Support
- ✅ Mobile (iPhone, Android)
- ✅ Tablet (iPad, Android tablets)
- ✅ Desktop (Windows, Mac, Linux)
- ✅ All modern browsers

## 📖 Full Documentation
- **README.md** - Complete game guide
- **GAME_GUIDE.md** - How to play + tips
- **ARCHITECTURE.md** - Code deep dive
- **IMPLEMENTATION.md** - Feature checklist

## 🧠 State Structure
```javascript
// Main App state
{
  gameState,           // 'landing'|'setup'|'countdown'|'playing'|'gameover'
  players: [{
    id, name, score
  }],
  board: [{
    id, emoji, matched, flipped
  }],
  currentPlayerIndex,
  selectedCards,
  timeLeft,
  matchedCount,
  isAnimating
}
```

## 🎯 Component Hierarchy
```
App
├── LandingPage
├── PlayerSetup
├── TurnCountdown
├── GameBoard
│   ├── ScoreBoard
│   └── Card × 36
└── GameOverScreen
```

## 🚀 Deploy
```bash
npm run build
# Upload 'dist' folder to any static host
# (Netlify, Vercel, GitHub Pages, etc.)
```

## 🔑 Key Algorithms

### Fisher-Yates Shuffle
Ensures truly random card placement every game

### Turn Cycling
`(currentPlayerIndex + 1) % players.length`

### Match Detection
`card1.emoji === card2.emoji`

### Score Calculation
`2 points × number of matches`

## ⌨️ Controls
- **Click/Tap**: Flip cards
- **Buttons**: Navigate screens
- **Input**: Enter player names

## 📦 Deliverables
✅ Full React application  
✅ Responsive design  
✅ Complete documentation  
✅ Production-ready code  
✅ No external dependencies (just React + Tailwind)  
✅ Works on all devices  
✅ Local multiplayer support  

## 🎉 Play Now!
```bash
npm run dev
# Game ready at http://localhost:5174
```

---

**Built with React 19 + Vite + Tailwind CSS** ⚡
