import { useState, useCallback } from 'react';

const WINNING_COMBOS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
  [0, 4, 8], [2, 4, 6],             // diagonals
];

function checkWinner(board) {
  for (const [a, b, c] of WINNING_COMBOS) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], combo: [a, b, c] };
    }
  }
  if (board.every(Boolean)) return { winner: 'draw', combo: [] };
  return null;
}

export function useGameLogic() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [result, setResult] = useState(null);
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [lastMove, setLastMove] = useState(null);
  const [commentary, setCommentary] = useState('');
  const [moveCount, setMoveCount] = useState(0);

  const makeMove = useCallback((index, commentaryList) => {
    if (board[index] || result) return false;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setLastMove(index);
    setMoveCount((c) => c + 1);

    const line = commentaryList[Math.floor(Math.random() * commentaryList.length)];
    setCommentary(line);

    const gameResult = checkWinner(newBoard);
    if (gameResult) {
      setResult(gameResult);
      if (gameResult.winner !== 'draw') {
        setScores((s) => ({ ...s, [gameResult.winner]: s[gameResult.winner] + 1 }));
      }
      return true;
    } else {
      setCurrentPlayer((p) => (p === 'X' ? 'O' : 'X'));
      return false;
    }
  }, [board, currentPlayer, result]);

  const resetGame = useCallback(() => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setResult(null);
    setLastMove(null);
    setCommentary('');
    setMoveCount(0);
  }, []);

  const resetAll = useCallback(() => {
    resetGame();
    setScores({ X: 0, O: 0 });
  }, [resetGame]);

  return {
    board,
    currentPlayer,
    result,
    scores,
    lastMove,
    commentary,
    moveCount,
    makeMove,
    resetGame,
    resetAll,
  };
}