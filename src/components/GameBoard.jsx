import Card from './Card';
import Timer from './Timer';
import ScoreBoard from './ScoreBoard';
import { useEffect } from 'react';

export default function GameBoard({
  board,
  onCardClick,
  currentPlayer,
  allPlayers,
  timeLeft,
  onTimeExpired,
  isAnimating,
  boardSize,
}) {
  const currentPlayerIndex = allPlayers.findIndex(p => p.id === currentPlayer.id);
  
  // Determine grid column class based on board size
  const gridColsClass = {
    4: 'grid-cols-4',
    6: 'grid-cols-6',
    8: 'grid-cols-8',
  }[boardSize] || 'grid-cols-6';

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeExpired();
    }
  }, [timeLeft, onTimeExpired]);

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header with scores */}
      <ScoreBoard players={allPlayers} currentPlayerIndex={currentPlayerIndex} />

      {/* Game area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-6 overflow-auto">
        <div className="w-full flex flex-col items-center gap-6">
          {/* Timer and Info */}
          <div className="flex flex-col items-center gap-2">
            <div className="relative w-20 h-20 md:w-24 md:h-24">
              {/* Background circle */}
              <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  fill="none"
                  stroke="rgba(100, 116, 139, 0.3)"
                  strokeWidth="4"
                />
                {/* Progress circle */}
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  fill="none"
                  stroke={timeLeft <= 5 ? '#ef4444' : '#a855f7'}
                  strokeWidth="4"
                  strokeDasharray={`${(timeLeft / 20) * 2 * Math.PI * 45} ${2 * Math.PI * 45}`}
                  strokeLinecap="round"
                  className="transition-all duration-300"
                />
              </svg>

              {/* Time display */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className={`text-2xl md:text-3xl font-bold ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-purple-400'}`}
                >
                  {timeLeft}s
                </span>
              </div>
            </div>
            <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              {currentPlayer?.animal} {currentPlayer?.name}'s turn
            </p>
          </div>

          {/* Game board */}
          <div className="w-full max-w-4xl mx-auto">
            <div className={`grid ${gridColsClass} gap-2 md:gap-3 auto-rows-fr aspect-square`}>
              {board.map((card) => (
                <Card
                  key={card.id}
                  card={card}
                  onClick={onCardClick}
                  isDisabled={isAnimating}
                />
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="text-center text-gray-400 text-sm md:text-base mt-4">
            <p>Find matching pairs • You have 20 seconds per turn</p>
          </div>
        </div>
      </div>
    </div>
  );
}
