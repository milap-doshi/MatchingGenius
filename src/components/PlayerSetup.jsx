import { useState } from 'react';

const PLAYER_ANIMALS = ['🐶', '🐱', '🦁', '🐻', '🐼', '🐸', '🐭', '🐷', '🦊', '🐢'];

export default function PlayerSetup({ onPlayersReady }) {
  const [numPlayers, setNumPlayers] = useState(2);
  const [playerNames, setPlayerNames] = useState(['Player 1', 'Player 2']);
  const [playerAnimals, setPlayerAnimals] = useState(['🐶', '🐱']);
  const [errors, setErrors] = useState({});

  const handlePlayerCountChange = (count) => {
    setNumPlayers(count);
    const newNames = Array(count)
      .fill(null)
      .map((_, i) => playerNames[i] || `Player ${i + 1}`);
    const newAnimals = Array(count)
      .fill(null)
      .map((_, i) => playerAnimals[i] || PLAYER_ANIMALS[i % PLAYER_ANIMALS.length]);
    setPlayerNames(newNames);
    setPlayerAnimals(newAnimals);
    setErrors({});
  };

  const handleNameChange = (index, name) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
    const newErrors = { ...errors };
    delete newErrors[index];
    setErrors(newErrors);
  };

  const handleAnimalChange = (index, animal) => {
    const newAnimals = [...playerAnimals];
    newAnimals[index] = animal;
    setPlayerAnimals(newAnimals);
  };

  const validateAndStart = () => {
    const newErrors = {};
    playerNames.forEach((name, index) => {
      if (!name.trim()) {
        newErrors[index] = 'Name cannot be empty';
      }
      if (name.trim().length > 20) {
        newErrors[index] = 'Name must be 20 characters or less';
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const players = playerNames.map((name, index) => ({
      id: index,
      name: name.trim(),
      animal: playerAnimals[index],
      score: 0,
    }));

    onPlayersReady(players);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-4 py-8">
      <div className="w-full max-w-2xl slide-in">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent text-center">
          Player Setup
        </h2>
        <p className="text-center text-gray-400 mb-8">
          Configure your game and choose player animals
        </p>

        {/* Player Count Selection */}
        <div className="bg-gray-800 bg-opacity-40 backdrop-blur-md rounded-lg p-6 mb-6 border border-purple-500 border-opacity-30">
          <label className="block text-lg font-semibold mb-4 text-gray-100">
            Number of Players
          </label>
          <div className="flex gap-2 mb-4">
            {[1, 2, 3, 4].map((count) => (
              <button
                key={count}
                onClick={() => handlePlayerCountChange(count)}
                className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all duration-200 ${
                  numPlayers === count
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                }`}
              >
                {count}
              </button>
            ))}
          </div>
        </div>

        {/* Player Names and Animals Input */}
        <div className="bg-gray-800 bg-opacity-40 backdrop-blur-md rounded-lg p-6 border border-purple-500 border-opacity-30 max-h-96 overflow-y-auto">
          <label className="block text-lg font-semibold mb-4 text-gray-100">
            Player Names & Animals
          </label>
          <div className="space-y-4">
            {Array(numPlayers)
              .fill(null)
              .map((_, index) => (
                <div key={index}>
                  <div className="flex gap-2 items-start">
                    {/* Name Input */}
                    <div className="flex-1">
                      <input
                        type="text"
                        value={playerNames[index]}
                        onChange={(e) => handleNameChange(index, e.target.value)}
                        placeholder={`Player ${index + 1} name`}
                        maxLength="20"
                        className={`w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 ${
                          errors[index]
                            ? 'focus:ring-red-500 border border-red-500'
                            : 'focus:ring-purple-500'
                        } transition-all duration-200`}
                      />
                      {errors[index] && (
                        <p className="text-red-400 text-sm mt-1">{errors[index]}</p>
                      )}
                    </div>

                    {/* Animal Dropdown */}
                    <select
                      value={playerAnimals[index]}
                      onChange={(e) => handleAnimalChange(index, e.target.value)}
                      className="px-3 py-2 rounded-lg bg-gray-700 text-white text-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
                    >
                      {PLAYER_ANIMALS.map((animal) => (
                        <option key={animal} value={animal}>
                          {animal}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={validateAndStart}
          className="w-full mt-8 px-6 py-3 text-lg font-bold text-white rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
        >
          Start Game
        </button>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-purple-500 rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-pink-500 rounded-full opacity-10 blur-3xl"></div>
    </div>
  );
}
