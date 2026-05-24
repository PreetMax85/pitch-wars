import { useEffect, useState } from 'react';

export default function Cell({ value, index, onClick, teams, isWinCell, isLastMove }) {
  const [popped, setPopped] = useState(false);

  useEffect(() => {
    if (value) {
      setPopped(false);
      requestAnimationFrame(() => setPopped(true));
    }
  }, [value]);

  const team = value === 'X' ? teams.X : value === 'O' ? teams.O : null;

  return (
    <button
      onClick={() => !value && onClick(index)}
      style={{
        position: 'relative',
        aspectRatio: '1 / 1',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px',
        borderRadius: '10px',
        border: `2px solid ${isWinCell ? team?.primary : isLastMove ? `${team?.primary}60` : 'rgba(255,255,255,0.08)'}`,
        background: isWinCell
          ? `${team?.primary}22`
          : 'rgba(0,0,0,0.35)',
        boxShadow: isWinCell ? `0 0 28px ${team?.primary}50, inset 0 0 20px ${team?.primary}12` : 'none',
        cursor: value ? 'default' : 'pointer',
        backdropFilter: 'blur(4px)',
        animation: isWinCell ? 'winPulse 0.8s ease-in-out infinite' : 'none',
        transition: 'border-color 0.2s, background 0.2s',
        outline: 'none',
      }}
      onMouseEnter={e => { if (!value) e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
      onMouseLeave={e => { if (!value) e.currentTarget.style.background = 'rgba(0,0,0,0.35)'; }}
    >
      {team && (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px',
          animation: popped ? 'cellPop 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards' : 'none',
          opacity: popped ? 1 : 0,
        }}>
          <img
            src={team.logo}
            alt={team.short}
            onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
            style={{ width: '42px', height: '42px', objectFit: 'contain' }}
          />
          <span style={{ display: 'none', fontSize: '32px' }}>{team.emoji}</span>
          <span className="font-display" style={{ fontSize: '13px', letterSpacing: '2px', color: team.primary, lineHeight: 1 }}>
            {team.short}
          </span>
        </div>
      )}

      {!value && (
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: 0, transition: 'opacity 0.15s',
          pointerEvents: 'none',
        }} className="hover-hint">
          <div style={{ width: '28px', height: '28px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.2)' }} />
        </div>
      )}
    </button>
  );
}