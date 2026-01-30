import { useEffect, useState } from 'react';

export default function TurnCountdown({ playerName, onCountdownComplete }) {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (countdown <= 0) {
      onCountdownComplete();
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, onCountdownComplete]);

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="text-center slide-in">
        {/* Player name */}
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-100">
          {playerName}
        </h2>

        {/* Message */}
        <p className="text-2xl md:text-3xl text-gray-300 mb-8">
          Get Ready!
        </p>

        {/* Countdown circle */}
        <div className="relative w-32 h-32 md:w-48 md:h-48 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 animate-pulse"></div>
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950 flex items-center justify-center">
            <span className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent pulse-glow">
              {countdown}
            </span>
          </div>
        </div>

        {/* Info text */}
        <p className="text-gray-400 text-sm md:text-base">
          The game will start in {countdown} seconds
        </p>
      </div>
    </div>
  );
}
