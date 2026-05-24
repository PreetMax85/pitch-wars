import Cell from './Cell';
import ScoreTracker from './ScoreTracker';
import WinOverlay from './WinOverlay';
import { COMMENTARY } from '../data/teams';
import { useEffect, useState } from 'react';

export default function GameBoard({ teams, game, onChangeTeams }) {
  const {
    board, currentPlayer, result, scores,
    lastMove, commentary, makeMove, resetGame, resetAll,
  } = game;

  const [commentaryVisible, setCommentaryVisible] = useState(false);

  useEffect(() => {
    if (commentary) {
      setCommentaryVisible(true);
      const t = setTimeout(() => setCommentaryVisible(false), 2800);
      return () => clearTimeout(t);
    }
  }, [commentary]);

  const currentTeam = currentPlayer === 'X' ? teams.X : teams.O;

  const handleChangeTeams = () => {
    resetAll();
    onChangeTeams();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 w-full max-w-md mx-auto">

      {/* Header */}
      <div className="text-center mb-6">
        <p className="text-xs tracking-[0.4em] text-yellow-400/50 uppercase">IPL Edition</p>
        <h1 className="font-display text-4xl text-white tracking-widest">PITCH WARS</h1>
      </div>

      {/* Score */}
      <ScoreTracker teams={teams} scores={scores} />

      {/* Turn indicator */}
      {!result && (
        <div
          className="flex items-center gap-2 px-5 py-2 rounded-full mb-5 transition-all duration-300"
          style={{
            background: `${currentTeam.primary}15`,
            border: `1px solid ${currentTeam.primary}44`,
          }}
        >
          <span className="text-lg">{currentTeam.emoji}</span>
          <span
            className="font-display text-lg tracking-widest"
            style={{ color: currentTeam.primary }}
          >
            {currentTeam.short}
          </span>
          <span className="text-white/40 text-xs tracking-widest">IT'S YOUR MOVE</span>
        </div>
      )}

      {/* Board */}
      <div className="relative w-full">
        {/* Pitch glow */}
        <div
          className="absolute inset-0 rounded-2xl blur-xl opacity-20 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at center, #2d6a4f, transparent)` }}
        />

        <div
          className="relative grid grid-cols-3 gap-2 p-4 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, #0b1f14, #0f2819)',
            border: '1px solid #1a3028',
          }}
        >
          {/* Pitch stripe texture */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 20px, #4ade80 20px, #4ade80 21px)',
            }} />
          </div>

          {board.map((cell, i) => (
            <Cell
              key={i}
              value={cell}
              index={i}
              onClick={(idx) => makeMove(idx, COMMENTARY)}
              teams={teams}
              isWinCell={result?.combo?.includes(i) && result.winner !== 'draw'}
              isLastMove={i === lastMove && !result}
            />
          ))}
        </div>
      </div>

      {/* Commentary */}
      <div className="h-8 flex items-center justify-center mt-4">
        <p
          className="text-sm text-white/60 italic text-center tracking-wide transition-all duration-500"
          style={{
            opacity: commentaryVisible ? 1 : 0,
            transform: commentaryVisible ? 'translateY(0)' : 'translateY(6px)',
          }}
        >
          {commentary}
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 mt-6">
        <button
          onClick={resetGame}
          className="px-6 py-2.5 rounded-lg font-display text-lg tracking-widest text-white/70 border border-white/10 hover:border-white/30 hover:text-white transition-all"
        >
          NEW GAME
        </button>
        <button
          onClick={handleChangeTeams}
          className="px-6 py-2.5 rounded-lg text-sm text-white/30 border border-white/10 hover:border-white/20 hover:text-white/50 transition-all"
        >
          Change Teams
        </button>
      </div>

      {/* Win overlay */}
      <WinOverlay
        result={result}
        teams={teams}
        onPlayAgain={resetGame}
        onChangeTeams={handleChangeTeams}
      />
    </div>
  );
}