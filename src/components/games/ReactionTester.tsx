import { useState, useRef, useEffect } from "react";
import { Timer, Zap, Play } from "lucide-react";

type GameState = "idle" | "waiting" | "ready" | "result" | "tooEarly";

const ReactionTester = () => {
  const [gameState, setGameState] = useState<GameState>("idle");
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  const startGame = () => {
    setGameState("waiting");
    setReactionTime(null);

    // Random time between 2 to 6 seconds
    const waitTime = Math.floor(Math.random() * 4000) + 2000;

    timeoutRef.current = setTimeout(() => {
      setGameState("ready");
      startTimeRef.current = Date.now();
    }, waitTime);
  };

  const handleClick = () => {
    if (gameState === "idle" || gameState === "result" || gameState === "tooEarly") {
      startGame();
    } else if (gameState === "waiting") {
      // Clicked too early
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setGameState("tooEarly");
    } else if (gameState === "ready") {
      // Successful click
      const endTime = Date.now();
      const finalTime = endTime - startTimeRef.current;
      setReactionTime(finalTime);
      setGameState("result");

      if (!bestTime || finalTime < bestTime) {
        setBestTime(finalTime);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const getBackgroundColor = () => {
    switch (gameState) {
      case "waiting":
        return "bg-red-500/80 hover:bg-red-500 shadow-[0_0_30px_rgba(239,68,68,0.4)]";
      case "ready":
        return "bg-green-500/90 hover:bg-green-500 shadow-[0_0_50px_rgba(34,197,94,0.6)]";
      case "tooEarly":
      case "result":
        return "bg-card/40 hover:bg-card/60 border border-white/10";
      default:
        return "bg-primary/20 hover:bg-primary/30 border border-primary/30";
    }
  };

  const getMessage = () => {
    switch (gameState) {
      case "waiting":
        return (
          <>
            <span className="text-4xl font-display font-bold text-white mb-2">Wait...</span>
            <span className="text-white/70">Wait for green</span>
          </>
        );
      case "ready":
        return (
          <>
            <Zap size={48} className="text-white mb-4 animate-bounce" />
            <span className="text-4xl font-display font-bold text-white tracking-widest uppercase">Click!</span>
          </>
        );
      case "tooEarly":
        return (
          <>
            <span className="text-3xl font-display font-bold text-red-400 mb-2">Too Early!</span>
            <span className="text-white/70">Click to try again</span>
          </>
        );
      case "result":
        return (
          <>
            <span className="text-5xl font-display font-black text-primary mb-2">{reactionTime} <span className="text-2xl text-primary/70">ms</span></span>
            <span className="text-white/70">Click to try again</span>
          </>
        );
      default:
        return (
          <>
            <Play size={48} className="text-primary mb-4" />
            <span className="text-2xl font-display font-bold text-white tracking-wider uppercase mb-2">Start Test</span>
            <span className="text-white/50 text-sm">When the red box turns green, click as quickly as you can.</span>
          </>
        );
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-[500px] mx-auto min-h-[400px]">
      <div className="flex items-center justify-center w-full mb-6 px-2">
        {bestTime && (
          <div className="bg-card/40 border border-white/10 rounded-lg px-6 py-2 flex items-center gap-2">
            <Timer size={18} className="text-primary" />
            <span className="text-white/70 text-sm uppercase tracking-wider font-body">Personal Best: </span>
            <span className="font-display font-bold text-xl text-primary">{bestTime} ms</span>
          </div>
        )}
      </div>

      <button
        onClick={handleClick}
        className={`w-full aspect-video rounded-3xl flex flex-col items-center justify-center transition-all duration-200 backdrop-blur-md p-8 ${getBackgroundColor()}`}
      >
        {getMessage()}
      </button>
    </div>
  );
};

export default ReactionTester;
