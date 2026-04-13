import { useState, useEffect, useCallback } from "react";
import { RotateCcw } from "lucide-react";

type Grid = number[][];

const GRID_SIZE = 4;

const Game2048 = () => {
  const [grid, setGrid] = useState<Grid>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const getEmptyCoordinates = (currentGrid: Grid) => {
    const emptyCoords: { r: number; c: number }[] = [];
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (currentGrid[r][c] === 0) {
          emptyCoords.push({ r, c });
        }
      }
    }
    return emptyCoords;
  };

  const addRandomTile = (currentGrid: Grid) => {
    const emptyCoords = getEmptyCoordinates(currentGrid);
    if (emptyCoords.length === 0) return currentGrid;

    const { r, c } = emptyCoords[Math.floor(Math.random() * emptyCoords.length)];
    const newGrid = [...currentGrid.map((row) => [...row])];
    newGrid[r][c] = Math.random() < 0.9 ? 2 : 4;
    return newGrid;
  };

  const initializeGame = useCallback(() => {
    let newGrid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(0));
    newGrid = addRandomTile(newGrid);
    newGrid = addRandomTile(newGrid);
    setGrid(newGrid);
    setScore(0);
    setGameOver(false);
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const checkGameOver = (currentGrid: Grid) => {
    if (getEmptyCoordinates(currentGrid).length > 0) return false;

    // Check adjacent pairs
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (
          (r < GRID_SIZE - 1 && currentGrid[r][c] === currentGrid[r + 1][c]) ||
          (c < GRID_SIZE - 1 && currentGrid[r][c] === currentGrid[r][c + 1])
        ) {
          return false;
        }
      }
    }
    return true;
  };

  const slideAndMerge = (row: number[]) => {
    let newRow = row.filter((val) => val !== 0);
    let points = 0;

    for (let i = 0; i < newRow.length - 1; i++) {
      if (newRow[i] !== 0 && newRow[i] === newRow[i + 1]) {
        newRow[i] *= 2;
        points += newRow[i];
        newRow.splice(i + 1, 1);
      }
    }

    while (newRow.length < GRID_SIZE) {
      newRow.push(0);
    }

    return { row: newRow, points };
  };

  const move = useCallback(
    (direction: "UP" | "DOWN" | "LEFT" | "RIGHT") => {
      if (gameOver) return;

      let newGrid = [...grid.map((row) => [...row])];
      let pointsEarned = 0;
      let moved = false;

      // Extract columns if moving up or down
      const getColumn = (c: number) => newGrid.map((row) => row[c]);
      const setColumn = (c: number, newCol: number[]) => {
        for (let r = 0; r < GRID_SIZE; r++) {
          newGrid[r][c] = newCol[r];
        }
      };

      for (let i = 0; i < GRID_SIZE; i++) {
        let currentLine = direction === "LEFT" || direction === "RIGHT" ? newGrid[i] : getColumn(i);
        
        if (direction === "RIGHT" || direction === "DOWN") {
          currentLine.reverse();
        }

        const { row: newLine, points } = slideAndMerge(currentLine);
        
        if (direction === "RIGHT" || direction === "DOWN") {
          newLine.reverse();
        }

        pointsEarned += points;

        if (direction === "LEFT" || direction === "RIGHT") {
          if (newGrid[i].join(",") !== newLine.join(",")) moved = true;
          newGrid[i] = newLine;
        } else {
          if (getColumn(i).join(",") !== newLine.join(",")) moved = true;
          setColumn(i, newLine);
        }
      }

      if (moved) {
        newGrid = addRandomTile(newGrid);
        setGrid(newGrid);
        setScore((s) => s + pointsEarned);
        
        if (checkGameOver(newGrid)) {
          setGameOver(true);
        }
      }
    },
    [grid, gameOver]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default scrolling for arrow keys
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
      }

      switch (e.key) {
        case "ArrowUp":
          move("UP");
          break;
        case "ArrowDown":
          move("DOWN");
          break;
        case "ArrowLeft":
          move("LEFT");
          break;
        case "ArrowRight":
          move("RIGHT");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [move]);

  const tileColors: Record<number, string> = {
    0: "bg-black/20",
    2: "bg-white/10 text-white",
    4: "bg-white/20 text-white",
    8: "bg-primary/40 text-white",
    16: "bg-primary/60 text-white",
    32: "bg-primary/80 text-black font-bold",
    64: "bg-primary text-black font-bold outline outline-2 outline-offset-2 outline-primary/50",
    128: "bg-blue-400 text-black font-bold",
    256: "bg-blue-500 text-black font-bold shadow-[0_0_10px_rgba(59,130,246,0.5)]",
    512: "bg-purple-500 text-white font-bold shadow-[0_0_15px_rgba(168,85,247,0.5)]",
    1024: "bg-pink-500 text-white font-bold shadow-[0_0_20px_rgba(236,72,153,0.6)]",
    2048: "bg-yellow-400 text-black font-black shadow-[0_0_30px_rgba(250,204,21,0.8)]",
  };

  if (!grid.length) return null;

  return (
    <div className="flex flex-col items-center w-full max-w-[400px] mx-auto select-none outline-none" tabIndex={0}>
      <div className="flex items-center justify-between w-full mb-6">
        <div className="bg-card/40 border border-white/10 rounded-lg px-6 py-2 flex flex-col items-center">
          <span className="font-body text-[10px] text-muted-foreground uppercase tracking-widest leading-none mb-1">Score</span>
          <span className="font-display font-bold text-2xl text-white leading-none">{score}</span>
        </div>
        
        <button
          onClick={initializeGame}
          className="bg-card/40 border border-white/10 rounded-lg px-4 py-3 hover:bg-white/10 transition-colors text-white flex items-center gap-2"
        >
          <RotateCcw size={18} />
          <span className="font-body text-xs uppercase tracking-wider">New</span>
        </button>
      </div>

      <div className="relative p-3 bg-card/60 backdrop-blur-md rounded-2xl border border-white/10 w-full aspect-square">
        {gameOver && (
          <div className="absolute inset-0 z-10 bg-background/80 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center animate-fade-in-up">
            <span className="font-display font-black text-4xl text-white uppercase tracking-widest mb-4">Game Over</span>
            <button
               onClick={initializeGame}
               className="bg-primary text-black font-body font-bold uppercase tracking-wider px-6 py-3 rounded-full hover:bg-primary/90 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        <div className="grid grid-cols-4 gap-2 sm:gap-3 w-full h-full">
          {grid.map((row, r) =>
            row.map((val, c) => (
              <div
                key={`${r}-${c}`}
                className={`flex items-center justify-center rounded-xl font-display text-2xl sm:text-3xl transition-all duration-150 ${tileColors[val > 2048 ? 2048 : val] || tileColors[2048]}`}
              >
                {val > 0 ? val : ""}
              </div>
            ))
          )}
        </div>
      </div>
      
      <p className="mt-6 text-xs font-body text-muted-foreground uppercase opacity-60">Use Arrow Keys to Move</p>
    </div>
  );
};

export default Game2048;
