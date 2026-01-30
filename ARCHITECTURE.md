# Matching Genius - Architecture & Code Explanation

## 🏗️ System Architecture

```
┌─────────────────────────────────────┐
│           Browser (Vite)            │
├─────────────────────────────────────┤
│         React Application           │
├─────────────────────────────────────┤
│  App Component (State Management)   │
│  ├─ gameState (string)              │
│  ├─ players (array)                 │
│  ├─ board (array of cards)          │
│  ├─ currentPlayerIndex (number)     │
│  ├─ timeLeft (number)               │
│  └─ more...                         │
├─────────────────────────────────────┤
│  Child Components (UI Rendering)    │
│  ├─ LandingPage                     │
│  ├─ PlayerSetup                     │
│  ├─ TurnCountdown                   │
│  ├─ GameBoard > Card                │
│  ├─ ScoreBoard                      │
│  └─ GameOverScreen                  │
├─────────────────────────────────────┤
│    Styling (Tailwind + CSS)         │
└─────────────────────────────────────┘
```

---

## 📊 Data Model

### Game State Flow
```
'landing' 
  ↓ (Start Game)
'setup' 
  ↓ (Players Ready)
'countdown' 
  ↓ (Countdown Complete)
'playing' 
  ↓ (All Cards Matched)
'gameover'
```

### Player Object
```javascript
{
  id: 0,              // Unique identifier
  name: "Alice",      // Player name
  score: 4            // Total matched pairs × 2
}
```

### Card Object
```javascript
{
  id: 0,              // Unique position identifier
  emoji: "🐶",        // Animal symbol
  matched: false,     // Permanently revealed?
  flipped: false      // Currently face-up?
}
```

### Game State Structure
```javascript
{
  gameState: 'playing',           // Current screen
  players: [...],                 // All players
  currentPlayerIndex: 0,          // Active player
  board: [...],                   // 36 card objects
  selectedCards: [...],           // Cards flipped this turn
  timeLeft: 12,                   // Seconds remaining
  isAnimating: false,             // Prevent clicks during animation
  matchedCount: 10,               // Total matched pairs
  showCountdown: true             // Display countdown screen
}
```

---

## 🧠 Core Game Logic

### 1. Card Shuffling (Fisher-Yates Algorithm)

```javascript
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
```

**Why this works:**
- Ensures each shuffle is truly random
- Every card has equal chance of being in any position
- Different layout every game

### 2. Board Initialization

```javascript
const initializeBoard = () => {
  const cards = [];
  // Create 2 of each animal
  ANIMALS.forEach((animal) => {
    cards.push({ id: cards.length, emoji: animal, matched: false, flipped: false });
    cards.push({ id: cards.length, emoji: animal, matched: false, flipped: false });
  });
  // Shuffle the array
  return shuffleArray(cards);
};
```

**Result:** 36 cards with 18 unique pairs in random order

### 3. Turn Management

```javascript
// When turn ends (timeout or mismatch)
const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
setCurrentPlayerIndex(nextPlayerIndex);
```

**Example with 3 players:**
- Player 0 → (0+1) % 3 = 1
- Player 1 → (1+1) % 3 = 2
- Player 2 → (2+1) % 3 = 0 (back to Player 0)

### 4. Match Detection

```javascript
const [card1, card2] = selectedCards;
const isMatch = card1.emoji === card2.emoji;

if (isMatch) {
  // Keep cards revealed, +2 points, continue turn
  setMatchedCount(prev => prev + 2);
  updatedPlayers[currentPlayerIndex].score += 2;
  setTimeLeft(15); // Reset timer
} else {
  // Flip back after 1 second, pass turn
  setTimeout(() => {
    // Flip cards back
    // Pass turn to next player
  }, 1000);
}
```

### 5. Timer Mechanism

```javascript
useEffect(() => {
  if (gameState !== 'playing') return;
  
  const timer = setInterval(() => {
    setTimeLeft(prev => {
      if (prev <= 1) {
        handleTimeExpired();  // Auto-end turn
        return 15;            // Reset
      }
      return prev - 1;
    });
  }, 1000);
  
  return () => clearInterval(timer);
}, [gameState, currentPlayerIndex]);
```

**Flow:**
- Every 1000ms (1 second), decrement timeLeft
- When timeLeft reaches 0, pass turn to next player
- Reset to 15 for new turn

---

## 🔄 Component Lifecycle

### 1. Initial Render
```
App mounts
  ↓
Initialize state (landing)
  ↓
Render LandingPage
```

### 2. Game Setup
```
User clicks "Start Game"
  ↓
setGameState('setup')
  ↓
Render PlayerSetup
  ↓
User enters player data
  ↓
onPlayersReady()
  ↓
Initialize board, set gameState to 'countdown'
```

### 3. Gameplay Loop
```
User clicks card
  ↓
handleCardClick()
  ↓
Flip card (setBoard)
  ↓
Check if 2 cards selected
  ↓
If match:
  - Mark matched
  - Add points
  - Reset timer
  - Continue turn
Else (mismatch):
  - Wait 1 second
  - Flip back
  - Pass turn
  - Show countdown
```

### 4. Game End
```
matchedCount === 36
  ↓
setGameState('gameover')
  ↓
Render GameOverScreen
  ↓
Calculate rankings
  ↓
Display winner
```

---

## 📁 File Responsibilities

### `App.jsx` (Parent Component)
**Responsibilities:**
- ✅ Manage all global game state
- ✅ Implement game logic (matching, scoring)
- ✅ Control state transitions
- ✅ Handle timer countdown
- ✅ Process card clicks
- ✅ Determine game over

**Key Functions:**
```javascript
handleStartNewGame()        // → setup state
handlePlayersReady()        // Initialize game
handleCountdownComplete()   // → playing state
handleCardClick()           // Card interaction
handleTimeExpired()         // Timer timeout
```

### `LandingPage.jsx` (Presentation)
**Responsibilities:**
- Display welcome screen
- Show game description
- Render start button
- Add animations

**Props:** `onStart` (callback)

### `PlayerSetup.jsx` (Form Component)
**Responsibilities:**
- Input player count (1-4)
- Collect player names
- Validate inputs
- Handle errors
- Manage local state for inputs

**Props:** `onPlayersReady` (callback with player data)
**Local State:** numPlayers, playerNames, errors

### `TurnCountdown.jsx` (Timer Component)
**Responsibilities:**
- Display 5-second countdown
- Show player name
- Handle countdown complete

**Props:** playerName, onCountdownComplete
**Local State:** countdown (5→0)

### `GameBoard.jsx` (Main Game View)
**Responsibilities:**
- Render 6×6 grid
- Display scoreboard
- Show timer
- Pass clicks to parent

**Props:** board, onCardClick, currentPlayer, allPlayers, timeLeft, isAnimating
**Child Components:** ScoreBoard, Card (×36)

### `Card.jsx` (Card Component)
**Responsibilities:**
- Display single card
- Show flipped or face-down state
- Handle click event
- Visual feedback

**Props:** card, onClick, isDisabled

### `ScoreBoard.jsx` (Score Display)
**Responsibilities:**
- List all players
- Show scores
- Highlight current player

**Props:** players, currentPlayerIndex

### `GameOverScreen.jsx` (Results View)
**Responsibilities:**
- Calculate winner
- Display rankings
- Show medal emoji
- Render play again button

**Props:** players, onPlayAgain

---

## 🎯 State Management Pattern

### Immutable Updates (Correct)
```javascript
// Update specific card
setBoard(board.map(c => 
  c.id === cardId ? { ...c, flipped: true } : c
));

// Update player score
const updatedPlayers = [...players];
updatedPlayers[currentPlayerIndex].score += 2;
setPlayers(updatedPlayers);
```

### Why Immutability?
- React detects changes via reference comparison
- Prevents accidental mutations
- Enables time-travel debugging
- Clear intent of state changes

---

## ⏱️ Timing Coordination

```
Turn Start (gameState = 'countdown')
  ↓
5-second countdown (TurnCountdown)
  ↓
handleCountdownComplete()
  ↓
gameState = 'playing'
  ↓
Timer interval starts (useEffect)
  ↓
Every 1 second: timeLeft--
  ↓
On card click: Check match
  ↓
If match: setTimeLeft(15)
  ↓
If mismatch: Wait 1s → setGameState('countdown')
  ↓
If timeout: timeLeft === 0 → handleTimeExpired()
```

---

## 🚀 Performance Optimizations

1. **Memoization Candidates** (if needed):
   - Card component (doesn't change often)
   - ScoreBoard (updates every match)

2. **Event Delegation**:
   - Cards handled individually (simpler than event delegation)

3. **Animation Blocking**:
   - `isAnimating` flag prevents rapid clicks
   - Reduces state thrashing

4. **Efficient Re-renders**:
   - Only affected components re-render
   - Board re-render optimized to minimal updates

---

## 🧩 Extending the Game

### Add Sound Effects
```javascript
// In handleCardClick after match
const audio = new Audio('/match.mp3');
audio.play();
```

### Add Difficulty Levels
```javascript
// Adjust time per turn
const difficulty = 'hard'; // 10s
const difficulty = 'normal'; // 15s
const difficulty = 'easy'; // 20s
```

### Add Leaderboard
```javascript
// Store scores in localStorage or database
localStorage.setItem('leaderboard', JSON.stringify(scores));
```

### Add More Cards
```javascript
// Change grid from 6×6 to 8×8
// Update ANIMALS to 32 unique animals
// Update CSS grid columns: 8 instead of 6
```

### Add AI Player
```javascript
// Bot makes moves automatically
// Random or intelligent card selection
```

---

## 🧪 Testing Scenarios

### Test Match Detection
```javascript
// Verify emoji comparison
const card1 = { emoji: '🐶' };
const card2 = { emoji: '🐶' };
// Should match: card1.emoji === card2.emoji ✓
```

### Test Turn Cycling
```javascript
// 3 players: 0 → 1 → 2 → 0
for (let i = 0; i < 10; i++) {
  const next = (i % 3);
  console.log(next); // 0, 1, 2, 0, 1, 2, ...
}
```

### Test Shuffle Distribution
```javascript
// Run 1000 shuffles, verify uniform distribution
let positions = {};
for (let i = 0; i < 1000; i++) {
  const board = initializeBoard();
  // Track card positions
}
// Each position should have ~55 appearances
```

---

## 📚 React Hooks Used

| Hook | Purpose | Location |
|------|---------|----------|
| `useState` | Manage component state | Every component |
| `useEffect` | Side effects & timers | App, TurnCountdown |
| `useRef` | (Prepared but unused) | - |

---

## 💾 Code Quality

- ✅ No external dependencies except React & Tailwind
- ✅ Functional components only (no class components)
- ✅ Clean, readable variable names
- ✅ Proper error handling
- ✅ Input validation
- ✅ Responsive design
- ✅ Accessible HTML structure
- ✅ Modern ES6+ syntax

---

## 🎓 Learning Resources

The code demonstrates:
- React state management patterns
- Event handling
- Conditional rendering
- Array manipulation
- Object spread operator
- Modular component design
- CSS animations
- Responsive design with Tailwind

Perfect for learning React fundamentals!

---

**That's the complete architecture! Enjoy building with it.** 🚀
