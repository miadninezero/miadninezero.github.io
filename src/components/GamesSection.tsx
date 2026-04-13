import { useState } from "react";
import { ScrollReveal } from "@/hooks/use-scroll-animation";
import { Gamepad2, Grid, Timer, Brain, Swords, Type } from "lucide-react";

import TicTacToe from "./games/TicTacToe";
import Minesweeper from "./games/Minesweeper";
import MemoryMatch from "./games/MemoryMatch";
import ReactionTester from "./games/ReactionTester";
import RockPaperScissors from "./games/RockPaperScissors";
import Game2048 from "./games/Game2048";
import WordleClone from "./games/WordleClone";

const GAMES = [
  { id: "tictactoe", name: "Tic Tac Toe", icon: Grid, component: TicTacToe },
  { id: "minesweeper", name: "Minesweeper", icon: Gamepad2, component: Minesweeper },
  { id: "memory", name: "Memory Match", icon: Brain, component: MemoryMatch },
  { id: "reaction", name: "Reaction Test", icon: Timer, component: ReactionTester },
  { id: "rps", name: "RPS vs AI", icon: Swords, component: RockPaperScissors },
  { id: "2048", name: "2048", icon: Grid, component: Game2048 },
  { id: "wordle", name: "Wordly", icon: Type, component: WordleClone },
];

const GamesSection = () => {
  const [activeGameId, setActiveGameId] = useState(GAMES[0].id);

  const ActiveComponent = GAMES.find((g) => g.id === activeGameId)?.component || TicTacToe;

  return (
    <section id="games" className="relative py-24 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      <div className="absolute top-0 left-0 right-0 cinematic-divider" />

      <div className="relative z-10 px-6 md:px-16 max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="mb-12 text-center md:text-left">
            <span className="font-body text-xs uppercase tracking-[0.3em] text-primary/60 block mb-4">
              Take a Break
            </span>
            <h2
              className="font-display font-black uppercase text-foreground"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 3.5rem)",
                lineHeight: "0.95",
                letterSpacing: "-0.01em",
              }}
            >
              Interactive Hub
            </h2>
            <p className="mt-4 font-body text-muted-foreground text-lg max-w-xl mx-auto md:mx-0">
              A collection of mini-games built with logic and styling. Tap one below to play.
            </p>
          </div>
        </ScrollReveal>

        <div className="flex flex-col items-center justify-center w-full">
          <ScrollReveal delay={0.1}>
            {/* Game Selector Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8 max-w-4xl mx-auto">
              {GAMES.map((game) => {
                const Icon = game.icon;
                const isActive = activeGameId === game.id;
                return (
                  <button
                    key={game.id}
                    onClick={() => setActiveGameId(game.id)}
                    className={`flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-full border transition-all duration-300 ${
                      isActive
                        ? "bg-primary text-black border-primary font-bold shadow-[0_0_15px_rgba(var(--primary),0.3)]"
                        : "bg-card/40 text-muted-foreground border-white/10 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Icon size={16} />
                    <span className="font-body text-xs sm:text-sm uppercase tracking-wider whitespace-nowrap">
                      {game.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="w-full">
            <div className="glass-card glow-hover rounded-2xl p-6 sm:p-10 w-full flex flex-col items-center border border-white/10 relative overflow-hidden min-h-[500px]">
              <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
              
              <div key={activeGameId} className="relative z-10 w-full h-full animate-fade-in-up">
                <ActiveComponent />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default GamesSection;
