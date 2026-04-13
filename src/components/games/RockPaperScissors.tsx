import { useState } from "react";
import { Hand, HandMetal, Scissors } from "lucide-react";

type Choice = "Rock" | "Paper" | "Scissors" | null;
type Result = "Win" | "Lose" | "Draw" | null;

const CHOICES: { name: Choice; icon: any }[] = [
  { name: "Rock", icon: Hand },
  { name: "Paper", icon: HandMetal }, // Using HandMetal as a proxy for paper/flat hand if standard hand isn't perfect
  { name: "Scissors", icon: Scissors },
];

const RockPaperScissors = () => {
  const [playerChoice, setPlayerChoice] = useState<Choice>(null);
  const [computerChoice, setComputerChoice] = useState<Choice>(null);
  const [result, setResult] = useState<Result>(null);
  const [score, setScore] = useState({ player: 0, computer: 0 });
  const [isAnimating, setIsAnimating] = useState(false);

  const determineWinner = (player: Choice, computer: Choice): Result => {
    if (player === computer) return "Draw";
    if (
      (player === "Rock" && computer === "Scissors") ||
      (player === "Paper" && computer === "Rock") ||
      (player === "Scissors" && computer === "Paper")
    ) {
      return "Win";
    }
    return "Lose";
  };

  const playGame = (choice: Choice) => {
    if (isAnimating) return;

    setPlayerChoice(choice);
    setComputerChoice(null);
    setResult(null);
    setIsAnimating(true);

    // Simulate "thinking" or "shaking" animation delay
    setTimeout(() => {
      const randomChoice = CHOICES[Math.floor(Math.random() * CHOICES.length)].name;
      setComputerChoice(randomChoice);
      
      const gameResult = determineWinner(choice, randomChoice);
      setResult(gameResult);
      
      if (gameResult === "Win") {
        setScore((prev) => ({ ...prev, player: prev.player + 1 }));
      } else if (gameResult === "Lose") {
        setScore((prev) => ({ ...prev, computer: prev.computer + 1 }));
      }
      
      setIsAnimating(false);
    }, 1000);
  };

  const renderChoiceIcon = (choice: Choice, className: string = "") => {
    const choiceObj = CHOICES.find((c) => c.name === choice);
    if (!choiceObj) return null;
    const Icon = choiceObj.icon;
    return <Icon size={48} className={className} />;
  };

  return (
    <div className="flex flex-col items-center w-full max-w-[500px] mx-auto min-h-[400px]">
      {/* Scoreboard */}
      <div className="flex items-center justify-between w-full mb-10 px-4">
        <div className="flex flex-col items-center">
          <span className="font-body text-xs text-muted-foreground uppercase tracking-widest mb-1">You</span>
          <span className="font-display text-4xl font-bold text-white">{score.player}</span>
        </div>
        <div className="px-4 py-1 rounded-full border border-white/10 bg-white/5 font-display text-sm tracking-widest text-white/50">
          VS
        </div>
        <div className="flex flex-col items-center">
          <span className="font-body text-xs text-muted-foreground uppercase tracking-widest mb-1">AI</span>
          <span className="font-display text-4xl font-bold text-white">{score.computer}</span>
        </div>
      </div>

      {/* Battle Arena */}
      <div className="flex items-center justify-center w-full gap-8 mb-12 h-[120px]">
        {/* Player Side */}
        <div className={`w-28 h-28 flex flex-col items-center justify-center rounded-2xl border-2 transition-all duration-300 ${playerChoice ? 'border-primary bg-primary/10 shadow-[0_0_20px_rgba(var(--primary),0.2)]' : 'border-dashed border-white/20 bg-transparent'}`}>
          {playerChoice ? (
            <div className={`text-primary ${isAnimating ? 'animate-bounce' : ''}`}>
              {renderChoiceIcon(playerChoice)}
            </div>
          ) : (
            <span className="text-white/20 font-display text-sm uppercase">Select</span>
          )}
        </div>

        {/* Status Text inside Battle Arena */}
        <div className="w-24 text-center">
          {isAnimating ? (
             <span className="font-display text-xl text-primary animate-pulse tracking-widest">...</span>
          ) : result ? (
             <span className={`font-display font-bold text-2xl uppercase tracking-wider ${result === 'Win' ? 'text-primary' : result === 'Lose' ? 'text-destructive' : 'text-yellow-400'}`}>
               {result}
             </span>
          ) : null}
        </div>

        {/* AI Side */}
        <div className={`w-28 h-28 flex flex-col items-center justify-center rounded-2xl border-2 transition-all duration-300 ${computerChoice ? 'border-destructive bg-destructive/10 shadow-[0_0_20px_rgba(var(--destructive),0.2)]' : 'border-dashed border-white/20 bg-transparent'}`}>
           {isAnimating ? (
             <div className="text-white/50 animate-bounce">
                {renderChoiceIcon("Rock")}
             </div>
           ) : computerChoice ? (
            <div className="text-destructive">
              {renderChoiceIcon(computerChoice)}
            </div>
          ) : (
            <span className="text-white/20 font-display text-sm uppercase">Waiting</span>
          )}
        </div>
      </div>

      {/* Choice Buttons */}
      <div className="flex items-center gap-4">
        {CHOICES.map((choice) => (
          <button
            key={choice.name}
            onClick={() => playGame(choice.name)}
            disabled={isAnimating}
            className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex flex-col items-center justify-center transition-all duration-200 border ${
              playerChoice === choice.name && isAnimating
                ? 'bg-primary border-primary text-black'
                : 'bg-card/40 border-white/10 text-white hover:bg-card/80 hover:border-white/30'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {renderChoiceIcon(choice.name, "mb-2 !w-8 !h-8 sm:!w-10 sm:!h-10")}
            <span className="font-body text-xs uppercase tracking-wider">{choice.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RockPaperScissors;
