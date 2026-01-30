export default function GameOverScreen({ players, onPlayAgain }) {
  // Find winner(s)
  const maxScore = Math.max(...players.map(p => p.score));
  const winners = players.filter(p => p.score === maxScore);
  const isTie = winners.length > 1;

  // Sort players by score
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm px-4 py-8">
      <div className="w-full max-w-2xl slide-in">
        <div className="bg-gray-800 bg-opacity-60 backdrop-blur-md rounded-2xl p-8 md:p-12 border-2 border-purple-500 border-opacity-50">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-2 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Game Over!
          </h1>

          {/* Winner announcement */}
          <div className="text-center mb-8">
            {isTie ? (
              <div>
                <p className="text-gray-300 text-lg mb-3">It's a Tie!</p>
                <p className="text-2xl md:text-3xl font-bold text-cyan-400">
                  {winners.map(w => `${w.animal} ${w.name}`).join(' & ')}
                </p>
                <p className="text-gray-400 mt-2">Both won with {maxScore} points!</p>
              </div>
            ) : (
              <div>
                <p className="text-gray-300 text-lg mb-3">🎉 Congratulations! 🎉</p>
                <p className="text-3xl md:text-4xl font-bold text-yellow-300">
                  {winners[0].animal} {winners[0].name}
                </p>
                <p className="text-gray-400 mt-2">Winner with {maxScore} points!</p>
              </div>
            )}
          </div>

          {/* Final Scores */}
          <div className="mb-8">
            <h2 className="text-lg md:text-xl font-bold text-gray-100 mb-4 text-center">
              Final Scores
            </h2>
            <div className="space-y-3">
              {sortedPlayers.map((player, index) => (
                <div
                  key={player.id}
                  className={`
                    flex items-center justify-between p-4 rounded-lg transition-all
                    ${
                      player.score === maxScore
                        ? 'bg-gradient-to-r from-yellow-600 to-yellow-500 ring-2 ring-yellow-300'
                        : index === 1
                          ? 'bg-gradient-to-r from-gray-500 to-gray-600'
                          : index === 2
                            ? 'bg-gradient-to-r from-orange-700 to-orange-600'
                            : 'bg-gray-700'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl md:text-3xl font-bold">
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`}
                    </span>
                    <p className="text-lg md:text-xl font-semibold text-white">
                      {player.animal} {player.name}
                    </p>
                  </div>
                  <p className="text-2xl md:text-3xl font-bold text-white">
                    {player.score}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Play Again Button */}
          <button
            onClick={onPlayAgain}
            className="w-full px-6 py-3 md:py-4 text-lg md:text-xl font-bold text-white rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
}
