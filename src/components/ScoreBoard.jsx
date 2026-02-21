export default function ScoreBoard({ players, currentPlayerIndex }) {
  return (
    <div className="w-full bg-gray-800 bg-opacity-40 backdrop-blur-md border-b border-purple-500 border-opacity-30 px-1 py-1 flex-shrink-0">
      <div className="max-w-full mx-auto">
        {/* Current Player */}
        <p className="text-xs text-gray-400 mb-0.5 px-1">
          <span className="font-bold text-purple-300">
            {players[currentPlayerIndex]?.animal} {players[currentPlayerIndex]?.name}
          </span>
        </p>

        {/* Scores Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 px-1">
          {players.map((player, index) => (
            <div
              key={player.id}
              className={`
                p-1 rounded text-center transition-all duration-200
                ${
                  index === currentPlayerIndex
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/30'
                    : 'bg-gray-700 bg-opacity-50'
                }
              `}
            >
              <p className="text-xs text-gray-300 truncate">
                {player.animal}
              </p>
              <p className="text-xs font-bold text-white">
                {player.score}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
