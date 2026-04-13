import { useState } from "react";
import { X, Circle, RotateCcw } from "lucide-react";

type Player = "X" | "O" | null;

const TicTacToe = () => {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [winner, setWinner] = useState<Player | "Draw">(null);

  const checkWinner = (squares: Player[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    if (squares.every((square) => square !== null)) {
      return "Draw";
    }
    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
    setWinner(checkWinner(newBoard));
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const renderSquare = (index: number) => {
    const value = board[index];
    return (
      <button
        onClick={() => handleClick(index)}
        disabled={!!value || !!winner}
        className="h-20 w-20 sm:h-24 sm:w-24 bg-card/40 hover:bg-card/60 border border-white/5 rounded-xl flex flex-col items-center justify-center transition-all duration-300 backdrop-blur-sm group"
        aria-label={`Square ${index}`}
      >
        <span
          className={`transform transition-all duration-300 ${
            value ? "scale-100 opacity-100" : "scale-0 opacity-0"
          }`}
        >
          {value === "X" && <X size={40} className="text-primary" />}
          {value === "O" && <Circle size={40} className="text-blue-500" />}
        </span>
      </button>
    );
  };

  return (
    <div className="flex flex-col items-center w-full max-w-[400px] mx-auto">
      <div className="mb-6 flex flex-col items-center justify-center w-full">
        {winner ? (
          <div className="flex flex-col items-center animate-fade-in-up">
            <p className="font-display text-2xl uppercase tracking-wider text-white mb-4">
              {winner === "Draw" ? "It's a draw!" : `Player ${winner} Wins!`}
            </p>
            <button
              onClick={resetGame}
              className="flex items-center gap-2 bg-primary/20 text-primary font-body text-sm uppercase tracking-widest px-6 py-2 rounded-full border border-primary/30 hover:bg-primary hover:text-black transition-all duration-300"
            >
              <RotateCcw size={16} /> Play Again
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between w-full px-4 mb-4">
            <div
              className={`font-display text-xl font-bold uppercase transition-colors ${
                isXNext ? "text-primary scale-110" : "text-muted-foreground"
              }`}
            >
              Player X
            </div>
            <div
              className={`font-display text-xl font-bold uppercase transition-colors ${
                !isXNext ? "text-blue-500 scale-110" : "text-muted-foreground"
              }`}
            >
              Player O
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6 relative">
        {board.map((_, index) => renderSquare(index))}
      </div>

      {!winner && (
        <button
          onClick={resetGame}
          className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors mt-auto"
        >
          <RotateCcw size={16} /> Restart Loop
        </button>
      )}
    </div>
  );
};

export default TicTacToe;
