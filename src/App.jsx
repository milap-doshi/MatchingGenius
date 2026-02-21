import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import DifficultyScreen from './components/DifficultyScreen';
import PlayerSetup from './components/PlayerSetup';
import TurnCountdown from './components/TurnCountdown';
import GameBoard from './components/GameBoard';
import GameOverScreen from './components/GameOverScreen';
import './App.css';

// Animal emojis for cards (32 unique animals for 8×8 board)
const ANIMALS = [
  '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼',
  '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔',
  '🐧', '🐘', '🦓', '🦒', '🦘', '🐘', '🦏', '🦛',
  '🦜', '🦅', '🦆', '🦉', '🦚', '🦋', '🐝', '🐞',
];

// Shuffle function using Fisher-Yates algorithm
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Initialize game board with shuffled cards based on board size
const initializeBoard = (boardSize) => {
  const pairsNeeded = (boardSize * boardSize) / 2;
  const selectedAnimals = ANIMALS.slice(0, pairsNeeded);
  const cards = [];
  selectedAnimals.forEach((animal) => {
    cards.push({ id: cards.length, emoji: animal, matched: false, flipped: false });
    cards.push({ id: cards.length, emoji: animal, matched: false, flipped: false });
  });
  return shuffleArray(cards);
};

function App() {
  const [gameState, setGameState] = useState('landing'); // landing, difficulty, setup, playing, gameover
  const [boardSize, setBoardSize] = useState(6); // 4, 6, or 8
  const [players, setPlayers] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [board, setBoard] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [timeLeft, setTimeLeft] = useState(20);
  const [isAnimating, setIsAnimating] = useState(false);
  const [matchedCount, setMatchedCount] = useState(0);

  // Start new game
  const handleStartNewGame = () => {
    setGameState('difficulty');
  };

  // Handle difficulty selection
  const handleSelectDifficulty = (size) => {
    if (size) {
      setBoardSize(size);
      setGameState('setup');
    } else {
      setGameState('landing');
    }
  };

  // Handle player setup completion
  const handlePlayersReady = (playerList) => {
    setPlayers(playerList);
    setBoard(initializeBoard(boardSize));
    setCurrentPlayerIndex(0);
    setSelectedCards([]);
    setTimeLeft(20);
    setMatchedCount(0);
    setGameState('playing');
  };

  // Timer effect for game play
  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          return 20; // Reset timer, handleTimeExpired will be called via GameBoard prop
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  // Handle card click
  const handleCardClick = (cardId) => {
    // Prevent actions during animation, countdown, or if game not active
    if (isAnimating || gameState !== 'playing' || selectedCards.length >= 2) {
      return;
    }

    const card = board.find((c) => c.id === cardId);

    // Prevent clicking already matched or already selected cards
    if (card.matched || selectedCards.some((c) => c.id === cardId)) {
      return;
    }

    const newSelectedCards = [...selectedCards, { ...card }];
    setSelectedCards(newSelectedCards);

    // Flip card (update board state)
    setBoard(
      board.map((c) =>
        c.id === cardId ? { ...c, flipped: true } : c
      )
    );

    // Check for match after 2 cards are flipped
    if (newSelectedCards.length === 2) {
      setIsAnimating(true);

      setTimeout(() => {
        const [card1, card2] = newSelectedCards;
        const isMatch = card1.emoji === card2.emoji;

        if (isMatch) {
          // Match found - cards stay flipped
          setBoard(prevBoard =>
            prevBoard.map((c) =>
              c.id === card1.id || c.id === card2.id ? { ...c, matched: true } : c
            )
          );
          setMatchedCount(prev => prev + 2);

          // Update player score
          const updatedPlayers = [...players];
          updatedPlayers[currentPlayerIndex].score += 2;
          setPlayers(updatedPlayers);

          setSelectedCards([]);
          setTimeLeft(20); // Reset timer for next turn
        } else {
          // Mismatch - flip cards back after delay
          setTimeout(() => {
            setBoard(prevBoard =>
              prevBoard.map((c) =>
                c.id === card1.id || c.id === card2.id ? { ...c, flipped: false } : c
              )
            );
            setSelectedCards([]);

            // Pass turn to next player
            const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
            setCurrentPlayerIndex(nextPlayerIndex);
            setTimeLeft(20);
          }, 1000);
        }

        setIsAnimating(false);
      }, 600);
    }
  };

  // Handle timer expiration
  const handleTimeExpired = () => {
    if (gameState === 'playing' && !isAnimating) {
      // Flip cards back if any are selected
      if (selectedCards.length > 0) {
        setBoard(prevBoard =>
          prevBoard.map((c) =>
            selectedCards.some((sc) => sc.id === c.id) ? { ...c, flipped: false } : c
          )
        );
        setSelectedCards([]);
      }

      // Pass turn to next player
      const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
      setCurrentPlayerIndex(nextPlayerIndex);
      setTimeLeft(20); // Reset timer for next player's turn
    }
  };

  // Check game over
  useEffect(() => {
    const totalCards = boardSize * boardSize;
    if (matchedCount === totalCards && gameState === 'playing') {
      setGameState('gameover');
    }
  }, [matchedCount, gameState, boardSize]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950 flex items-center justify-center">
      {gameState === 'landing' && <LandingPage onStart={handleStartNewGame} />}
      {gameState === 'difficulty' && <DifficultyScreen onSelectDifficulty={handleSelectDifficulty} />}
      {gameState === 'setup' && <PlayerSetup onPlayersReady={handlePlayersReady} />}
      {gameState === 'playing' && (
        <div className="w-full h-screen flex flex-col">
          <GameBoard
            board={board}
            onCardClick={handleCardClick}
            currentPlayer={players[currentPlayerIndex]}
            allPlayers={players}
            timeLeft={timeLeft}
            onTimeExpired={handleTimeExpired}
            isAnimating={isAnimating}
            boardSize={boardSize}
          />
        </div>
      )}
      {gameState === 'gameover' && (
        <GameOverScreen players={players} onPlayAgain={handleStartNewGame} />
      )}
    </div>
  );
}

export default App;
