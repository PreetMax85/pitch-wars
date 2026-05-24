import { useEffect, useState } from 'react';
import Cell from './Cell';
import ScoreTracker from './ScoreTracker';
import WinOverlay from './WinOverlay';
import { COMMENTARY } from '../data/teams';

export default function GameBoard({ teams, game, onChangeTeams }) {
  const { board, currentPlayer, result, scores, lastMove, commentary, makeMove, resetGame, resetAll } = game;
  const [commentaryVisible, setCommentaryVisible] = useState(false);

  useEffect(() => {
    if (commentary) {
      setCommentaryVisible(true);
      const t = setTimeout(() => setCommentaryVisible(false), 2800);
      return () => clearTimeout(t);
    }
  }, [commentary]);

  const currentTeam = currentPlayer === 'X' ? teams.X : teams.O;

  const handleChangeTeams = () => { resetAll(); onChangeTeams(); };

  return (
    /* Full screen centering wrapper */
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px 20px',
    }}>
      {/* Content column — fixed width, centered */}
      <div style={{
        width: '100%',
        maxWidth: '420px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <p style={{ fontSize: '10px', letterSpacing: '5px', color: 'rgba(253,185,19,0.5)', textTransform: 'uppercase', marginBottom: '4px' }}>
            IPL Edition
          </p>
          <h1 className="font-display" style={{ fontSize: '40px', letterSpacing: '4px', color: '#fff', lineHeight: 1 }}>
            PITCH WARS
          </h1>
        </div>

        {/* Score */}
        <ScoreTracker teams={teams} scores={scores} />

        {/* Turn indicator */}
        {!result && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '10px 20px', borderRadius: '999px', marginBottom: '20px',
            background: `${currentTeam.primary}14`,
            border: `1px solid ${currentTeam.primary}40`,
            animation: 'fadeSlideUp 0.3s ease',
          }}>
            <img
              src={currentTeam.logo} alt={currentTeam.short}
              onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }}
              style={{ width: '24px', height: '24px', objectFit: 'contain' }}
            />
            <span style={{ display: 'none', fontSize: '20px' }}>{currentTeam.emoji}</span>
            <span className="font-display" style={{ fontSize: '20px', letterSpacing: '3px', color: currentTeam.primary }}>
              {currentTeam.short}
            </span>
            <span style={{ fontSize: '12px', letterSpacing: '3px', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>
              IT'S YOUR MOVE
            </span>
          </div>
        )}

        {/* ── BOARD with cricket pitch background ── */}
        <div style={{ position: 'relative', width: '100%', borderRadius: '18px', overflow: 'hidden' }}>
          {/* Cricket pitch image */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'url(/pitch.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'saturate(0.7)',
          }} />
          {/* Dark overlay so pieces are visible */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(4, 14, 8, 0.72)',
          }} />
          {/* Fallback gradient if no image */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(160deg, #0b2014 0%, #0f2819 50%, #091a10 100%)',
            zIndex: -1,
          }} />

          {/* 3×3 grid */}
          <div style={{
            position: 'relative', zIndex: 1,
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '10px', padding: '16px',
          }}>
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
        <div style={{ height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '12px' }}>
          <p style={{
            fontSize: '14px', fontStyle: 'italic', color: 'rgba(255,255,255,0.55)',
            letterSpacing: '0.5px', textAlign: 'center',
            opacity: commentaryVisible ? 1 : 0,
            transform: commentaryVisible ? 'translateY(0)' : 'translateY(6px)',
            transition: 'all 0.4s ease',
          }}>
            {commentary}
          </p>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
          <button
            onClick={resetGame}
            style={{
              padding: '12px 28px', borderRadius: '10px', cursor: 'pointer',
              fontFamily: "'Bebas Neue'", fontSize: '20px', letterSpacing: '3px',
              color: 'rgba(255,255,255,0.75)', background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.12)', transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'rgba(255,255,255,0.75)'; }}
          >
            NEW GAME
          </button>
          <button
            onClick={handleChangeTeams}
            style={{
              padding: '12px 20px', borderRadius: '10px', cursor: 'pointer',
              fontFamily: "'Barlow Condensed'", fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.3)', background: 'transparent',
              border: '1px solid rgba(255,255,255,0.08)', transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.3)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
          >
            Change Teams
          </button>
        </div>

      </div>

      {/* Win overlay */}
      <WinOverlay result={result} teams={teams} onPlayAgain={resetGame} onChangeTeams={handleChangeTeams} />
    </div>
  );
}