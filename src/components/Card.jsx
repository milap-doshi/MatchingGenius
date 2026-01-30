export default function Card({ card, onClick, isDisabled }) {
  return (
    <div
      onClick={() => !isDisabled && onClick(card.id)}
      className={`
        aspect-square rounded-lg cursor-pointer transition-all duration-300 flex items-center justify-center text-4xl md:text-6xl font-bold
        ${isDisabled ? 'cursor-not-allowed opacity-75' : 'hover:scale-105'}
        ${
          card.flipped || card.matched
            ? 'bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50'
            : 'bg-gradient-to-br from-blue-600 to-blue-800 hover:shadow-lg hover:shadow-blue-500/50'
        }
        ${card.matched ? 'ring-2 ring-green-400' : ''}
        transform transition-transform
      `}
    >
      {(card.flipped || card.matched) && card.emoji}
      {!card.flipped && !card.matched && '?'}
    </div>
  );
}
