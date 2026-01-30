export default function DifficultyScreen({ onSelectDifficulty }) {
  const difficulties = [
    {
      size: 4,
      label: 'Easy',
      cards: 16,
      pairs: 8,
      description: '4×4 board',
      icon: '🟢',
    },
    {
      size: 6,
      label: 'Normal',
      cards: 36,
      pairs: 18,
      description: '6×6 board',
      icon: '🟡',
    },
    {
      size: 8,
      label: 'Hard',
      cards: 64,
      pairs: 32,
      description: '8×8 board',
      icon: '🔴',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
          Select Difficulty
        </h1>
        <p className="text-gray-300 text-lg">Choose your board size</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
        {difficulties.map((difficulty) => (
          <button
            key={difficulty.size}
            onClick={() => onSelectDifficulty(difficulty.size)}
            className="group relative bg-gradient-to-b from-slate-700 to-slate-800 border-2 border-purple-500/30 hover:border-purple-400 rounded-lg p-8 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 hover:-translate-y-1"
          >
            <div className="text-5xl mb-4 text-center group-hover:scale-110 transition-transform">
              {difficulty.icon}
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
              {difficulty.label}
            </h3>
            <p className="text-cyan-400 text-sm mb-3 font-mono">
              {difficulty.description}
            </p>
            <div className="space-y-1 text-gray-300 text-sm">
              <p>{difficulty.cards} cards total</p>
              <p>{difficulty.pairs} pairs to match</p>
            </div>
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" />
          </button>
        ))}
      </div>

      <button
        onClick={() => onSelectDifficulty(null)}
        className="mt-12 px-6 py-3 text-gray-400 hover:text-gray-200 border border-gray-600 hover:border-gray-400 rounded-lg transition-colors"
      >
        ← Back
      </button>
    </div>
  );
}
