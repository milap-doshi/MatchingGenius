# Matching Genius - Complete Setup & Play Guide

## 🎮 Quick Start (60 seconds)

```bash
cd MatchingGenius
npm install
npm run dev
# Open http://localhost:5173 in your browser
```

**Done! The game is ready to play.**

---

## 📖 How to Play

### 1. **Landing Page**
   - Click "Start New Game" button
   - Get ready for player setup!

### 2. **Player Setup**
   - Choose number of players (1-4)
   - Enter each player's name
   - Click "Start Game"

### 3. **Game Intro**
   - See a 5-second countdown: "{Player Name}, get ready!"
   - Screen is locked during countdown

### 4. **Gameplay**
   - **Your Turn**: You have 15 seconds
   - **Flip Cards**: Click any card to reveal an animal
   - **Find Pairs**: Click a second card to match
   - **Match!** Cards stay revealed, +2 points, you continue
   - **Mismatch**: Cards flip back after 1 second, turn passes
   - **Time's Up**: 15 seconds with no match = turn passes

### 5. **Game End**
   - All 36 cards matched? Game over!
   - See final scores and winner
   - Click "Play Again" to restart

---

## 🎯 Winning Strategy

- **Remember Positions**: Watch where cards flip to remember them
- **Look for Patterns**: Some players group similar animals
- **Speed Matters**: Flip quickly to make 2 matches per turn
- **Watch Opponents**: Note what cards they reveal
- **Use Timeouts**: Let timer run out if you forget the positions

---

## 🏗️ Project Files Explained

### Main Application
- **`src/App.jsx`**: Game engine, state management, turn logic
- **`src/main.jsx`**: Entry point
- **`src/index.css`**: Global styles + animations

### Components
- **`LandingPage.jsx`**: Welcome screen (Start Game)
- **`PlayerSetup.jsx`**: Configure players and names
- **`TurnCountdown.jsx`**: 5-second "Get Ready!" screen
- **`GameBoard.jsx`**: Main game view with grid and scores
- **`Card.jsx`**: Individual card with flip animation
- **`ScoreBoard.jsx`**: Player scores display
- **`GameOverScreen.jsx`**: Results and winner
- **`Timer.jsx`**: Utility component (included in GameBoard)

### Config Files
- **`package.json`**: Dependencies and scripts
- **`tailwind.config.js`**: Tailwind CSS configuration
- **`postcss.config.js`**: PostCSS plugins
- **`vite.config.js`**: Vite build configuration
- **`eslint.config.js`**: Code linting rules

---

## 🚀 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run linter
npm run lint
```

---

## 📱 Responsive Design

| Device | Grid Size | Layout |
|--------|-----------|--------|
| Mobile (< 640px) | Smaller cards | 1 column scores |
| Tablet (640-1024px) | Medium cards | 2 columns scores |
| Desktop (> 1024px) | Larger cards | 4 columns scores |

The game automatically scales to fit your screen!

---

## 🎨 Customization

### Change Animals
In `src/App.jsx`, line 10:
```javascript
const ANIMALS = ['🐶', '🐱', '🐭', ...]; // Edit here
```

### Adjust Timer (seconds)
In `src/App.jsx`, search for `setTimeLeft(15)` and change `15` to desired seconds.

### Change Colors
In `tailwind.config.js`:
```javascript
colors: {
  neon: {
    purple: '#a855f7',  // Edit these hex codes
    pink: '#ec4899',
    cyan: '#06b6d4',
  }
}
```

### Turn Off Animations
In `src/index.css`, comment out animation classes or modify keyframes.

---

## 🐛 Troubleshooting

### "Port 5173 is in use"
The dev server will auto-assign port 5174. Check terminal output for the correct URL.

### Game doesn't load
1. Check terminal for errors
2. Hard refresh browser (Cmd+Shift+R on Mac)
3. Clear browser cache
4. Reinstall: `rm -rf node_modules && npm install`

### Cards not flipping
- Ensure browser supports CSS Grid and ES6+
- Update to latest browser version
- Check DevTools console for JavaScript errors

### Scores not updating
- Refresh the page
- Check browser console for errors
- Restart dev server: Press Ctrl+C, then `npm run dev`

---

## 🧪 Testing Checklist

Use this to verify everything works:

### Single Player
- [ ] Start game with 1 player
- [ ] Timer counts down from 15 to 0
- [ ] Can flip cards by clicking
- [ ] Cards show animals
- [ ] Matching cards stay revealed
- [ ] Score increases by 2 per match
- [ ] Game ends after all cards matched
- [ ] Final score displays correctly

### 2-4 Players
- [ ] Each player can enter unique name
- [ ] Turn countdown appears before each turn
- [ ] Turn order cycles correctly
- [ ] Non-matching cards flip back
- [ ] Turn passes after timeout or mismatch
- [ ] All scores update in real-time
- [ ] Winner declared correctly
- [ ] Tie games handled properly

### Visual/UI
- [ ] Landing page looks polished
- [ ] Text readable on mobile
- [ ] Cards scale properly on different screens
- [ ] Hover effects work on desktop
- [ ] Animations are smooth
- [ ] No layout overflow issues
- [ ] Colors look modern and appealing

---

## 📊 Game Statistics

- **Total Cards**: 36 (18 pairs)
- **Players Supported**: 1-4
- **Time per Turn**: 15 seconds
- **Countdown Duration**: 5 seconds
- **Points per Match**: 2
- **Max Score (perfect game)**: 36 points

---

## 🔒 Data Privacy

- **No Storage**: Game data never persists
- **No Accounts**: No login or profiles
- **No Network**: All game logic runs locally
- **No Tracking**: No analytics or telemetry
- **Page Refresh = Reset**: All data cleared

---

## 💡 Pro Tips

1. **Concentrate**: Focus on card positions for the first few turns
2. **Quick Pairs**: Try to match cards quickly to keep your turn
3. **Watch Carefully**: Pay attention to opponent's revealed cards
4. **Memory Chain**: Create mental links between card positions
5. **Speed vs Accuracy**: Fast flipping helps but you need to remember positions

---

## 🎓 How It Works (Technical Overview)

### Game Flow
1. Player selects number of players
2. App initializes board with shuffled cards
3. Display 5-second countdown per player
4. Player flips up to 2 cards
5. Check if match: Yes = +2 points, continue turn; No = flip back, next player
6. Repeat until all cards matched
7. Show winner screen

### Shuffling Algorithm
Uses **Fisher-Yates** shuffle for true randomization:
- Picks random card to swap with current position
- Repeats from end to start of array
- Results in unbiased distribution

### Turn Timer
- Countdown from 15 seconds per turn
- Updates every 1 second
- At 0: Auto-pass turn to next player
- Resets on match or turn change

---

## 🎉 Have Fun!

Matching Genius is ready to play! Gather your friends/family, take turns, and find out who has the best memory. 

**Enjoy the game!** 🧠🎮

---

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review browser console (F12 → Console tab)
3. Verify all dependencies installed: `npm list`
4. Restart dev server and clear browser cache

**Happy playing!**
