export default function LandingPage({ onStart }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-4">
      <div className="text-center slide-in">
        {/* Title */}
        <h1 className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
          Matching Genius
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light">
          Test Your Memory. Master The Game.
        </p>

        {/* Description */}
        {/* <div className="bg-gray-800 bg-opacity-40 backdrop-blur-md rounded-lg p-6 md:p-8 mb-8 max-w-md border border-purple-500 border-opacity-30">
          <p className="text-gray-200 text-sm md:text-base mb-4">
            Challenge your memory in this exciting local multiplayer game!
          </p>
          <ul className="text-left text-sm md:text-base text-gray-300 space-y-2">
            <li>✨ 6×6 Grid of Hidden Cards</li>
            <li>🎮 Up to 4 Players</li>
            <li>⏱️ Timed Turns (15 seconds)</li>
            <li>🏆 Compete for the Highest Score</li>
          </ul>
        </div> */}

        {/* Start Button */}
        <button
          onClick={onStart}
          className="relative px-8 md:px-12 py-3 md:py-4 text-lg md:text-xl font-bold text-white rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
        >
          Start New Game
          <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 hover:opacity-20 transition-opacity"></span>
        </button>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-purple-500 rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-pink-500 rounded-full opacity-10 blur-3xl"></div>
    </div>
  );
}
