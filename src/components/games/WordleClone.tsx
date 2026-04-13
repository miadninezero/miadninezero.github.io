import { useState, useEffect, useCallback } from "react";
import { Delete, RotateCcw } from "lucide-react";

const WORDS = [
  "REACT",
  "CODE",
  "BUILD",
  "NINJA",
  "VITE",
  "HTML",
  "GAMES",
  "WORLD",
  "LOGIC",
  "FRONT",
];

const ROWS = 6;
const COLS = 5;

type LetterState = "correct" | "present" | "absent" | "empty";

const WordleClone = () => {
  const [targetWord, setTargetWord] = useState("");
  const [guesses, setGuesses] = useState<string[]>(Array(ROWS).fill(""));
  const [currentRow, setCurrentRow] = useState(0);
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">("playing");

  const initializeGame = useCallback(() => {
    let word = WORDS[Math.floor(Math.random() * WORDS.length)];
    // Fallback padding if word isn't 5 letters exactly, though list is curated
    while (word.length < 5) word += "A";
    if (word.length > 5) word = word.substring(0, 5);
    
    setTargetWord(word.toUpperCase());
    setGuesses(Array(ROWS).fill(""));
    setCurrentRow(0);
    setGameStatus("playing");
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const onKeyPress = useCallback(
    (key: string) => {
      if (gameStatus !== "playing") return;

      if (key === "BACKSPACE" || key === "DELETE") {
        setGuesses((prev) => {
          const newGuesses = [...prev];
          newGuesses[currentRow] = newGuesses[currentRow].slice(0, -1);
          return newGuesses;
        });
      } else if (key === "ENTER") {
        if (guesses[currentRow].length === COLS) {
          if (guesses[currentRow] === targetWord) {
            setGameStatus("won");
          } else if (currentRow === ROWS - 1) {
            setGameStatus("lost");
          } else {
            setCurrentRow((prev) => prev + 1);
          }
        }
      } else if (/^[A-Z]$/.test(key)) {
        setGuesses((prev) => {
          const newGuesses = [...prev];
          if (newGuesses[currentRow].length < COLS) {
            newGuesses[currentRow] += key;
          }
          return newGuesses;
        });
      }
    },
    [targetWord, currentRow, gameStatus, guesses]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      onKeyPress(e.key.toUpperCase());
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onKeyPress]);

  const getLetterState = (guessIndex: number, letterIndex: number): LetterState => {
    if (guessIndex >= currentRow && gameStatus === "playing") return "empty";
    
    // Quick evaluate for past rows or won state
    const guess = guesses[guessIndex];
    if (!guess) return "empty";

    const letter = guess[letterIndex];
    const targetLetter = targetWord[letterIndex];

    if (letter === targetLetter) return "correct";
    if (targetWord.includes(letter)) return "present";
    return "absent";
  };

  const getBoxColor = (state: LetterState) => {
    switch (state) {
      case "correct":
        return "bg-primary text-black border-primary font-bold";
      case "present":
        return "bg-yellow-500 text-black border-yellow-500 font-bold";
      case "absent":
        return "bg-card border-white/10 text-white/40";
      default:
        return "bg-transparent border-white/20 text-white";
    }
  };

  const Keyboard = () => {
    const keys = [
      ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
      ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
      ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "DELETE"],
    ];

    const getKeyClass = (key: string) => {
       // Simple styling logic for keyboard
       return "bg-card/60 hover:bg-white/20 border border-white/5 rounded min-w-[30px] sm:min-w-[40px] h-[45px] flex items-center justify-center font-display font-bold text-xs sm:text-sm transition-colors text-white";
    };

    return (
      <div className="flex flex-col gap-2 mt-8 w-full max-w-[450px]">
        {keys.map((row, i) => (
          <div key={i} className="flex justify-center gap-1 sm:gap-2">
            {row.map((key) => (
              <button
                key={key}
                onClick={() => onKeyPress(key)}
                className={`${getKeyClass(key)} ${key === "ENTER" || key === "DELETE" ? "px-2 sm:px-4" : "flex-1"}`}
              >
                {key === "DELETE" ? <Delete size={20} /> : key}
              </button>
            ))}
          </div>
        ))}
      </div>
    );
  };

  if (!targetWord) return null;

  return (
    <div className="flex flex-col items-center w-full max-w-[500px] mx-auto">
      <div className="flex items-center justify-between w-full mb-6 max-w-[300px]">
        <div className="h-10" /> {/* Spacer */}
        {gameStatus !== "playing" && (
          <div className="animate-fade-in-up bg-background/80 py-1 px-4 rounded-full border border-white/10 backdrop-blur-md">
            <p className={`font-display font-bold uppercase tracking-widest ${gameStatus === "won" ? 'text-primary' : 'text-red-400'}`}>
              {gameStatus === "won" ? "Genius!" : targetWord}
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

      <div className="grid grid-rows-6 gap-2 w-full max-w-[300px]">
        {guesses.map((guess, i) => (
          <div key={i} className="grid grid-cols-5 gap-2 h-12 sm:h-14">
            {Array(COLS)
              .fill("")
              .map((_, j) => {
                const letter = guess[j] || "";
                const state = getLetterState(i, j);
                const isCurrentRow = i === currentRow;
                const isPopulated = letter !== "";

                return (
                  <div
                    key={j}
                    className={`flex items-center justify-center font-display text-2xl font-bold uppercase border-2 rounded-md transition-all duration-300 ${
                       getBoxColor(state)
                    } ${isCurrentRow && isPopulated ? 'border-white/50 scale-[1.02]' : ''}`}
                  >
                    {letter}
                  </div>
                );
              })}
          </div>
        ))}
      </div>

      <Keyboard />
    </div>
  );
};

export default WordleClone;
