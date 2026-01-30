import { useEffect, useState } from 'react';

export default function Timer({ initialTime, onTimeExpired, isActive }) {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    setTime(initialTime);
  }, [initialTime]);

  useEffect(() => {
    if (!isActive || time <= 0) return;

    const timer = setTimeout(() => {
      setTime(time - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [time, isActive]);

  useEffect(() => {
    if (time <= 0 && isActive) {
      onTimeExpired();
    }
  }, [time, isActive, onTimeExpired]);

  const percentage = (time / initialTime) * 100;
  const isWarning = time <= 5;

  return (
    <div className="flex flex-col items-center justify-center gap-2">
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
            stroke={isWarning ? '#ef4444' : '#a855f7'}
            strokeWidth="4"
            strokeDasharray={`${(percentage / 100) * 2 * Math.PI * 45} ${2 * Math.PI * 45}`}
            strokeLinecap="round"
            className="transition-all duration-300"
          />
        </svg>

        {/* Time display */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className={`text-2xl md:text-3xl font-bold ${isWarning ? 'text-red-500 animate-pulse' : 'text-purple-400'}`}
          >
            {time}s
          </span>
        </div>
      </div>
      <p className="text-xs md:text-sm text-gray-400">Time Left</p>
    </div>
  );
}
