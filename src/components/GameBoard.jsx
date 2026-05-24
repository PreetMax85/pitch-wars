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
      const t = setTimeout(() => setCommentaryVisible(false), 2600);
      return () => clearTimeout(t);
    }
  }, [commentary]);

  const currentTeam = currentPlayer === 'X' ? teams.X : teams.O;
  const handleChangeTeams = () => { resetAll(); onChangeTeams(); };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      overflowY: 'auto',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '380px',          /* narrower = smaller cells = fits viewport */
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',                /* unified gap between all sections */
      }}>

        {/* Header — compact */}
        <div style={{ textAlign: 'center', paddingBottom: '2px' }}>
          <p style={{ fontSize: '11px', letterSpacing: '6px', color: 'rgba(253,185,19,0.7)', textTransform: 'uppercase', marginBottom: '2px' }}>
            IPL Edition 2026
          </p>
          <h1 className="font-display" style={{ fontSize: '32px', letterSpacing: '4px', color: '#fff', lineHeight: 1 }}>
            PITCH WARS
          </h1>
        </div>

        {/* Score — slim horizontal bar */}
        <ScoreTracker teams={teams} scores={scores} />

        {/* Turn indicator */}
        {!result && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '8px 18px', borderRadius: '999px',
            background: `${currentTeam.primary}14`,
            border: `1px solid ${currentTeam.primary}40`,
            alignSelf: 'center',
          }}>
            <img src={currentTeam.logo} alt=""
              onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='inline'; }}
              style={{ width: '20px', height: '20px', objectFit: 'contain' }}
            />
            <span style={{ display: 'none', fontSize: '16px' }}>{currentTeam.emoji}</span>
            <span className="font-display" style={{ fontSize: '17px', letterSpacing: '3px', color: currentTeam.primary }}>
              {currentTeam.short}
            </span>
            <span style={{ fontSize: '11px', letterSpacing: '2px', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>
              IT'S YOUR MOVE
            </span>
          </div>
        )}

        {/* Board */}
        <div style={{ position: 'relative', width: '100%', borderRadius: '16px', overflow: 'hidden', flexShrink: 0 }}>
          {/* Pitch image */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'url(/pitch.png)',
            backgroundSize: 'cover', backgroundPosition: 'center',
            filter: 'saturate(0.7)',
          }} />
          {/* Overlay */}
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(4,14,8,0.55)' }} />
          {/* CSS fallback */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: -1,
            background: 'linear-gradient(160deg,#0b2014,#0f2819 50%,#091a10)',
          }} />

          {/* 3×3 grid */}
          <div style={{
            position: 'relative', zIndex: 1,
            display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
            gap: '8px', padding: '12px',
          }}>
            {board.map((cell, i) => (
              <Cell
                key={i} value={cell} index={i}
                onClick={idx => makeMove(idx, COMMENTARY)}
                teams={teams}
                isWinCell={result?.combo?.includes(i) && result.winner !== 'draw'}
                isLastMove={i === lastMove && !result}
              />
            ))}
          </div>
        </div>

        {/* Commentary */}
        <div style={{ height: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{
            fontSize: '15px', fontStyle: 'italic', color: 'rgba(255,255,255,0.7)',
            textAlign: 'center', letterSpacing: '0.3px',
            opacity: commentaryVisible ? 1 : 0,
            transform: commentaryVisible ? 'translateY(0)' : 'translateY(5px)',
            transition: 'all 0.35s ease',
          }}>
            {commentary}
          </p>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={resetGame} style={{
            padding: '10px 24px', borderRadius: '9px', cursor: 'pointer',
            fontFamily: "'Bebas Neue'", fontSize: '18px', letterSpacing: '3px',
            color: 'rgba(255,255,255,0.7)', background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.12)', transition: 'all 0.15s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
          >
            NEW GAME
          </button>
          <button onClick={handleChangeTeams} style={{
            padding: '10px 16px', borderRadius: '9px', cursor: 'pointer',
            fontFamily: "'Barlow Condensed'", fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.3)', background: 'transparent',
            border: '1px solid rgba(255,255,255,0.08)', transition: 'all 0.15s',
          }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
          >
            Change Teams
          </button>
        </div>

      </div>

      <WinOverlay result={result} teams={teams} onPlayAgain={resetGame} onChangeTeams={handleChangeTeams} />
    </div>
  );
}