import { useState, useEffect } from "react";
import { Zap, Cpu, Code, Database, Brain, Globe, Laptop, Terminal, RotateCcw } from "lucide-react";

const ICONS = [Zap, Cpu, Code, Database, Brain, Globe, Laptop, Terminal];

type Card = {
  id: number;
  iconIndex: number;
  isFlipped: boolean;
  isMatched: boolean;
};

const MemoryMatch = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isWin, setIsWin] = useState(false);

  const initializeGame = () => {
    // 8 pairs of icons
    const shuffledCards = [...ICONS, ...ICONS]
      .map((_, index) => ({
        id: index,
        iconIndex: index % 8,
        isFlipped: false,
        isMatched: false,
      }))
      .sort(() => Math.random() - 0.5); // shuffle

    setCards(shuffledCards);
    setFlippedIndices([]);
    setMoves(0);
    setIsWin(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (index: number) => {
    if (cards[index].isFlipped || cards[index].isMatched || flippedIndices.length === 2) {
      return;
    }

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    if (newFlippedIndices.length === 2) {
      setMoves((m) => m + 1);
      const [firstIndex, secondIndex] = newFlippedIndices;

      if (cards[firstIndex].iconIndex === cards[secondIndex].iconIndex) {
        // Match found
        setTimeout(() => {
          setCards((prev) => {
            const matchedCards = [...prev];
            matchedCards[firstIndex].isMatched = true;
            matchedCards[secondIndex].isMatched = true;
            
            if (matchedCards.every((c) => c.isMatched)) {
              setIsWin(true);
            }
            return matchedCards;
          });
          setFlippedIndices([]);
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          setCards((prev) => {
            const resetCards = [...prev];
            resetCards[firstIndex].isFlipped = false;
            resetCards[secondIndex].isFlipped = false;
            return resetCards;
          });
          setFlippedIndices([]);
        }, 1000);
      }
    }
  };

  const renderIcon = (iconIndex: number) => {
    const IconComponent = ICONS[iconIndex];
    return <IconComponent size={24} className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />;
  };

  if (cards.length === 0) return null;

  return (
    <div className="flex flex-col items-center w-full max-w-[400px] mx-auto">
      <div className="flex items-center justify-between w-full mb-4 px-2">
        <div className="bg-card/40 border border-white/10 rounded-lg px-4 py-2">
          <span className="font-display font-bold text-lg text-white">Moves: {moves}</span>
        </div>
        {isWin && (
          <div className="animate-fade-in-up">
            <p className="font-display text-xl uppercase tracking-wider text-primary">
              You Win!
            </p>
          </div>
        )}
        <button
          onClick={initializeGame}
          className="bg-card/40 border border-white/10 rounded-lg p-2 hover:bg-white/10 transition-colors text-white"
          aria-label="Restart game"
        >
          <RotateCcw size={20} />
        </button>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-3 w-full aspect-square relative perspective-[1000px]">
        {cards.map((card, index) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(index)}
            className={`relative w-full h-full rounded-xl transition-all duration-500 transform-style-3d ${
              card.isFlipped ? "rotate-y-180" : ""
            } ${card.isMatched ? "opacity-60 scale-95" : "hover:scale-105"}`}
            disabled={card.isMatched}
          >
            {/* Card Back (Hidden when flipped) */}
            <div className="absolute inset-0 backface-hidden flex items-center justify-center bg-card/60 border border-white/10 rounded-xl backdrop-blur-sm">
              <div className="w-1/2 h-1/2 bg-primary/20 rounded-full blur-xl absolute" />
            </div>

            {/* Card Front (Visible when flipped) */}
            <div className="absolute inset-0 backface-hidden rotate-y-180 flex items-center justify-center bg-primary/80 border border-primary text-black rounded-xl shadow-[0_0_15px_rgba(var(--primary),0.5)]">
              {renderIcon(card.iconIndex)}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MemoryMatch;
