// Quick layout test helper — verifies board arrays for 4x4, 6x6, 8x8
const ANIMALS = [
  '🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼',
  '🐨','🐯','🦁','🐮','🐷','🐸','🐵','🐔',
  '🐧','🐘','🦓','🦒','🦘','🦏','🦛','🦜',
  '🦅','🦆','🦉','🦚','🦋','🐝','🐞','🦄',
];

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const initializeBoard = (boardSize) => {
  const pairsNeeded = (boardSize * boardSize) / 2;
  const selectedAnimals = ANIMALS.slice(0, pairsNeeded);
  const cards = [];
  selectedAnimals.forEach((animal) => {
    cards.push({ id: cards.length, emoji: animal, matched: false, flipped: false });
    cards.push({ id: cards.length, emoji: animal, matched: false, flipped: false });
  });
  return shuffleArray(cards);
};

[4,6,8].forEach((size) => {
  const board = initializeBoard(size);
  const total = size * size;
  const pairsNeeded = total / 2;
  const counts = board.reduce((acc, c) => {
    acc[c.emoji] = (acc[c.emoji] || 0) + 1;
    return acc;
  }, {});

  const correctPairs = Object.values(counts).every(v => v === 2);

  console.log(`\nBoard size: ${size}x${size}`);
  console.log(`Expected cards: ${total}, board length: ${board.length}`);
  console.log(`Expected pairs: ${pairsNeeded}, unique emojis: ${Object.keys(counts).length}`);
  console.log(`Each emoji appears twice: ${correctPairs ? 'YES' : 'NO'}`);
});
