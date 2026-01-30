export default function ScoreBoard({ players, currentPlayerIndex }) {
  return (
    <div className="w-full bg-gray-800 bg-opacity-40 backdrop-blur-md border-b border-purple-500 border-opacity-30 px-4 py-4">
      <div className="max-w-7xl mx-auto">
        {/* Current Player */}
        <p className="text-sm md:text-base text-gray-400 mb-3">
          Current Turn:
          <span className="ml-2 text-lg md:text-xl font-bold text-purple-400">
            {players[currentPlayerIndex]?.animal} {players[currentPlayerIndex]?.name}
          </span>
        </p>

        {/* Scores Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {players.map((player, index) => (
            <div
              key={player.id}
              className={`
                p-3 rounded-lg transition-all duration-200
                ${
                  index === currentPlayerIndex
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/30 ring-2 ring-purple-400'
                    : 'bg-gray-700 bg-opacity-50'
                }
              `}
            >
              <p className="text-xs md:text-sm text-gray-300 truncate">
                {player.animal} {player.name}
              </p>
              <p className="text-lg md:text-2xl font-bold text-white mt-1">
                {player.score}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
