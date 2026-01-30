# Matching Genius 🧠

A local multiplayer memory game built with React and Tailwind CSS. Challenge your memory in this exciting turn-based card-matching game that supports 1-4 players on a single device.

## 🎮 Features

- **Local Multiplayer**: 1-4 players on the same device (pass-and-play style)
- **6×6 Game Board**: 36 cards with 18 unique animal pairs
- **Turn-Based Gameplay**: 15-second time limit per turn
- **Real-Time Scoring**: Track scores for all players
- **5-Second Turn Countdown**: Prepare players before their turn starts
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Modern Gaming UI**: Dark theme with neon accents and smooth animations

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Card.jsx              # Individual card component with flip animation
│   ├── GameBoard.jsx         # Main game board with 6×6 grid
│   ├── GameOverScreen.jsx    # Results screen with winner announcement
│   ├── LandingPage.jsx       # Welcome screen with start button
│   ├── PlayerSetup.jsx       # Player name and count configuration
│   ├── ScoreBoard.jsx        # Display current scores and active player
│   ├── Timer.jsx             # 15-second countdown timer (unused but available)
│   └── TurnCountdown.jsx     # 5-second pre-turn countdown
├── App.jsx                   # Main application logic and state management
├── App.css                   # App-level styles
├── main.jsx                  # Entry point
└── index.css                 # Global styles with Tailwind and animations
```

## 🎯 Game Rules

1. **Setup**: Configure 1-4 players and enter their names
2. **Turn Countdown**: Before each player's turn, a 5-second countdown appears with "Player Name, get ready!"
3. **Gameplay**: 
   - Each player has 15 seconds to flip two cards
   - If cards match: they stay revealed, player scores +2 points, turn continues
   - If cards don't match: they flip back after 1 second, turn passes to next player
   - Time expires: Cards flip back (if any selected), turn passes to next player
4. **Winning**: Game ends when all 36 cards are matched. Winner is player with highest score

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd MatchingGenius
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to the URL shown in terminal (typically `http://localhost:5173`)

### Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` folder.

## 🎨 Design & Technology

### Tech Stack
- **React 19**: Functional components with Hooks
- **Tailwind CSS**: Responsive utility-first CSS framework
- **Vite**: Fast build tool and development server

### Key Design Decisions

1. **Fisher-Yates Shuffle**: Robust card shuffling algorithm ensures truly random layouts
2. **Centralized State**: All game logic managed in App.jsx for clean data flow
3. **Responsive Grid**: CSS Grid with `aspect-square` ensures perfect scaling on all devices
4. **Animation Classes**: Custom CSS animations for smooth card flips and transitions
5. **Dark Theme with Neon**: Purple/pink/cyan gradient aesthetic for modern gaming feel

### Game Mechanics

- **Card State**: Each card tracks `id`, `emoji`, `matched` status, and `flipped` state
- **Player Tracking**: Active player cycles through array of players
- **Scoring**: +2 points per matched pair
- **Timer Logic**: Countdown timer resets on match or turn change, triggers auto-turn-end on 0
- **Animation Blocking**: `isAnimating` flag prevents clicks during card flip sequences

## 📱 Responsive Breakpoints

- **Mobile**: Full-width layout, single column for player scores
- **Tablet**: 2-column score display, larger touch targets
- **Desktop**: 4-column score display, optimized card sizes

## 🧪 Testing the Game

### Single Player
1. Choose 1 player
2. Verify timer starts and cards respond to clicks
3. Match pairs to increase your score
4. Timer expires and game ends when all cards matched

### Multi-Player
1. Setup 2-4 players with different names
2. Verify countdown appears before each player's turn
3. Verify turn order cycles correctly (Player 1 → 2 → 3 → etc.)
4. Test mismatch: cards flip back, turn passes
5. Test match: player continues, score updates
6. Verify timeout: turn passes after 15 seconds inactivity
7. Verify final scores displayed correctly with winner highlighted

### Mobile Testing
1. Open on mobile device
2. Verify grid scales properly without overflow
3. Verify card tap targets are easily clickable
4. Verify text remains readable
5. Verify animations perform smoothly

## 🚨 Known Limitations & Assumptions

- **Same Device Only**: Not designed for networked play
- **No Persistence**: Game state is lost on page refresh (as intended)
- **No Sound**: Game uses visual feedback only
- **Modern Browsers**: Requires CSS Grid and ES6+ support

## 🎮 Controls

- **Mouse/Touch**: Click/tap cards to flip them
- **Buttons**: Use on-screen buttons to navigate game states

## 🎨 Customization

### Change Card Emojis
Edit the `ANIMALS` array in `src/App.jsx`:
```javascript
const ANIMALS = ['🐶', '🐱', '🐭', '🐹', '🐰', ...]; // Add more emojis
```

### Adjust Timer Duration
Change `15` to desired seconds in:
- `src/App.jsx`: `setTimeLeft(15)`
- `src/components/GameBoard.jsx`: Timer circle calculations

### Modify Colors
Edit Tailwind theme in `tailwind.config.js`:
```javascript
colors: {
  neon: {
    purple: '#a855f7',
    pink: '#ec4899',
    // ...
  }
}
```

## 📦 Build Output

```
dist/
├── index.html
├── assets/
│   ├── index-XXXXX.js
│   └── index-XXXXX.css
```

## 🐛 Debugging

Check browser DevTools console for React warnings or errors. The app uses React's StrictMode during development to catch potential issues.

## 📄 License

This project is open source and available under the MIT License.

## 🎉 Enjoy the Game!

Challenge your friends and family to see who has the best memory. Pass the device around and compete for the highest score!

---

**Created with ❤️ for memory game enthusiasts**
