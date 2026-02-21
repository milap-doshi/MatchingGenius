import Card from './Card';
import Timer from './Timer';
import ScoreBoard from './ScoreBoard';

export default function GameBoard({
  board,
  onCardClick,
  currentPlayer,
  allPlayers,
  timeLeft,
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

  return (
    <div className="w-screen h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950 overflow-hidden">
      {/* Header with scores */}
      <ScoreBoard players={allPlayers} currentPlayerIndex={currentPlayerIndex} />

      {/* Main game area - takes all remaining space */}
      <div className="flex-1 flex flex-col items-center justify-center gap-1 p-1 overflow-hidden">
        {/* Timer and Player Info - minimal space */}
        <div className="flex flex-col items-center gap-0.5">
          <div className="relative w-12 h-12">
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
                className={`text-sm font-bold ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-purple-400'}`}
              >
                {timeLeft}s
              </span>
            </div>
          </div>
          <p className="text-sm font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent text-center leading-tight px-1">
            {currentPlayer?.animal} {currentPlayer?.name}
          </p>
        </div>

        {/* Game board - takes maximum space */}
        <div className="flex-1 w-full overflow-hidden flex items-center justify-center">
          <div className="w-full h-full p-1">
            <div className={`grid ${gridColsClass} auto-rows-fr gap-0.5 w-full h-full`}>
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
        </div>

        {/* Instructions - minimal */}
        <p className="text-center text-gray-400 text-xs flex-shrink-0">20 sec/turn</p>
      </div>
    </div>
  );
}
