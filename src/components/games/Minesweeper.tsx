import { useState, useEffect, useCallback } from "react";
import { Flag, Bomb, RotateCcw } from "lucide-react";

type Cell = {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  adjacentMines: number;
};

const ROWS = 8;
const COLS = 8;
const MINES_COUNT = 10;

const Minesweeper = () => {
  const [board, setBoard] = useState<Cell[][]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [minesLeft, setMinesLeft] = useState(MINES_COUNT);

  const initializeBoard = useCallback(() => {
    // 1. Create empty board
    let newBoard: Cell[][] = Array(ROWS)
      .fill(null)
      .map(() =>
        Array(COLS).fill(null).map(() => ({
          isMine: false,
          isRevealed: false,
          isFlagged: false,
          adjacentMines: 0,
        }))
      );

    // 2. Place mines randomly
    let minesPlaced = 0;
    while (minesPlaced < MINES_COUNT) {
      const r = Math.floor(Math.random() * ROWS);
      const c = Math.floor(Math.random() * COLS);
      if (!newBoard[r][c].isMine) {
        newBoard[r][c].isMine = true;
        minesPlaced++;
      }
    }

    // 3. Calculate adjacent numbers
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (newBoard[r][c].isMine) continue;
        let count = 0;
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (r + i >= 0 && r + i < ROWS && c + j >= 0 && c + j < COLS) {
              if (newBoard[r + i][c + j].isMine) count++;
            }
          }
        }
        newBoard[r][c].adjacentMines = count;
      }
    }

    setBoard(newBoard);
    setGameOver(false);
    setIsWin(false);
    setMinesLeft(MINES_COUNT);
  }, []);

  useEffect(() => {
    initializeBoard();
  }, [initializeBoard]);

  const revealCell = (r: number, c: number) => {
    if (gameOver || isWin || board[r][c].isRevealed || board[r][c].isFlagged) return;

    let newBoard = [...board.map((row) => [...row])];

    if (newBoard[r][c].isMine) {
      // Game Over
      newBoard.forEach((row) =>
        row.forEach((cell) => {
          if (cell.isMine) cell.isRevealed = true;
        })
      );
      setBoard(newBoard);
      setGameOver(true);
      return;
    }

    // Flood fill to reveal connected empty cells
    const queue = [[r, c]];
    while (queue.length > 0) {
      const [currR, currC] = queue.shift()!;
      if (!newBoard[currR][currC].isRevealed && !newBoard[currR][currC].isFlagged) {
        newBoard[currR][currC].isRevealed = true;
        if (newBoard[currR][currC].adjacentMines === 0) {
          for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
              const nextR = currR + i;
              const nextC = currC + j;
              if (
                nextR >= 0 &&
                nextR < ROWS &&
                nextC >= 0 &&
                nextC < COLS &&
                !newBoard[nextR][nextC].isRevealed
              ) {
                queue.push([nextR, nextC]);
              }
            }
          }
        }
      }
    }

    setBoard(newBoard);
    checkWinProcess(newBoard);
  };

  const toggleFlag = (e: React.MouseEvent, r: number, c: number) => {
    e.preventDefault();
    if (gameOver || isWin || board[r][c].isRevealed) return;

    let newBoard = [...board.map((row) => [...row])];
    const cell = newBoard[r][c];

    if (!cell.isFlagged && minesLeft > 0) {
      cell.isFlagged = true;
      setMinesLeft((prev) => prev - 1);
    } else if (cell.isFlagged) {
      cell.isFlagged = false;
      setMinesLeft((prev) => prev + 1);
    }
    
    setBoard(newBoard);
    checkWinProcess(newBoard);
  };

  const checkWinProcess = (currentBoard: Cell[][]) => {
    let unrevealedSafeCells = 0;
    currentBoard.forEach((row) => {
      row.forEach((cell) => {
        if (!cell.isMine && !cell.isRevealed) {
          unrevealedSafeCells++;
        }
      });
    });

    if (unrevealedSafeCells === 0) {
      setIsWin(true);
    }
  };

  const getColor = (num: number) => {
    const colors = ["", "text-blue-400", "text-primary", "text-red-400", "text-purple-400", "text-yellow-400", "text-cyan-400", "text-black", "text-gray-400"];
    return colors[num] || "text-white";
  };

  if (!board.length) return null;

  return (
    <div className="flex flex-col items-center w-full max-w-[400px] mx-auto">
      <div className="flex items-center justify-between w-full mb-4 px-2">
        <div className="bg-card/40 border border-white/10 rounded-lg px-4 py-2 flex items-center gap-2">
          <Flag size={18} className="text-primary" />
          <span className="font-display font-bold text-xl text-white">{minesLeft}</span>
        </div>
        {(gameOver || isWin) && (
          <div className="animate-fade-in-up">
            <p className={`font-display text-xl uppercase tracking-wider ${isWin ? 'text-primary' : 'text-destructive'}`}>
              {isWin ? "You Win!" : "Game Over"}
            </p>
          </div>
        )}
        <button
          onClick={initializeBoard}
          className="bg-card/40 border border-white/10 rounded-lg p-2 hover:bg-white/10 transition-colors text-white"
          aria-label="Restart game"
        >
          <RotateCcw size={20} />
        </button>
      </div>

      <div className="grid grid-cols-8 gap-1 p-2 bg-black/20 rounded-xl border border-white/5 backdrop-blur-sm w-full aspect-square">
        {board.map((row, rIndex) =>
          row.map((cell, cIndex) => (
            <button
              key={`${rIndex}-${cIndex}`}
              onClick={() => revealCell(rIndex, cIndex)}
              onContextMenu={(e) => toggleFlag(e, rIndex, cIndex)}
              className={`flex items-center justify-center rounded-sm transition-colors text-sm font-bold ${
                cell.isRevealed
                  ? cell.isMine
                    ? "bg-destructive/80"
                    : "bg-card/20"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              {cell.isRevealed ? (
                cell.isMine ? (
                  <Bomb size={16} className="text-black" />
                ) : cell.adjacentMines > 0 ? (
                  <span className={getColor(cell.adjacentMines)}>
                    {cell.adjacentMines}
                  </span>
                ) : null
              ) : cell.isFlagged ? (
                <Flag size={14} className="text-primary" />
              ) : null}
            </button>
          ))
        )}
      </div>
      
      {!gameOver && !isWin && (
         <p className="mt-4 text-xs font-body text-muted-foreground uppercase opacity-60">Right click to flag</p>
      )}
    </div>
  );
};

export default Minesweeper;
