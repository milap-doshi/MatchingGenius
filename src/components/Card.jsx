export default function Card({ card, onClick, isDisabled }) {
  return (
    <div
      onClick={() => !isDisabled && onClick(card.id)}
      className={
        `w-full h-full p-0.5 rounded-sm cursor-pointer transition-all duration-200 flex items-center justify-center
        ${isDisabled ? 'cursor-not-allowed opacity-75' : 'hover:scale-105'}
        ${
          card.flipped || card.matched
            ? 'bg-gradient-to-br from-purple-500 to-pink-500 shadow-sm shadow-purple-500/30'
            : 'bg-gradient-to-br from-blue-600 to-blue-800 hover:shadow-sm hover:shadow-blue-500/20'
        }
        ${card.matched ? 'ring-1 ring-green-400' : ''}
        transform`
      }
    >
      <div className="w-full h-full flex items-center justify-center">
        <span className={`block text-base sm:text-xl md:text-2xl lg:text-3xl`}>{(card.flipped || card.matched) ? card.emoji : '?'}</span>
      </div>
    </div>
  );
}
