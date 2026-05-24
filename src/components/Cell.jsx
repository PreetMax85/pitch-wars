import { useEffect, useState } from 'react';

export default function Cell({ value, index, onClick, teams, isWinCell, isLastMove }) {
  const [popped, setPopped] = useState(false);

  useEffect(() => {
    if (value) setPopped(true);
  }, [value]);

  const team = value === 'X' ? teams.X : value === 'O' ? teams.O : null;

  const handleClick = () => {
    if (!value) onClick(index);
  };

  return (
    <button
      onClick={handleClick}
      className="relative flex items-center justify-center aspect-square rounded-lg transition-all duration-200 group select-none"
      style={{
        background: isWinCell
          ? `${team?.primary}22`
          : value
          ? '#0f2018'
          : '#0d1a14',
        border: isWinCell
          ? `2px solid ${team?.primary}`
          : isLastMove
          ? `2px solid ${team?.primary}66`
          : '2px solid #1a3028',
        boxShadow: isWinCell
          ? `0 0 24px ${team?.primary}55, inset 0 0 24px ${team?.primary}11`
          : 'none',
        cursor: value ? 'default' : 'pointer',
        animation: isWinCell ? 'winPulse 0.8s ease-in-out infinite' : 'none',
      }}
      onMouseEnter={(e) => {
        if (!value) {
          e.currentTarget.style.background = '#162b1e';
          e.currentTarget.style.borderColor = '#2a4a38';
        }
      }}
      onMouseLeave={(e) => {
        if (!value) {
          e.currentTarget.style.background = '#0d1a14';
          e.currentTarget.style.borderColor = '#1a3028';
        }
      }}
    >
      {/* Pitch texture lines */}
      {!value && (
        <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden rounded-lg">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 8px, #4ade8022 8px, #4ade8022 9px)',
          }} />
        </div>
      )}

      {/* Team marker */}
      {team && (
        <div
          className="flex flex-col items-center justify-center gap-0.5"
          style={{
            animation: popped ? 'cellPop 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards' : 'none',
            opacity: popped ? 1 : 0,
          }}
        >
          <span className="text-3xl md:text-4xl leading-none">{team.emoji}</span>
          <span
            className="font-display text-xs tracking-widest leading-none"
            style={{ color: team.primary }}
          >
            {team.short}
          </span>
        </div>
      )}

      {/* Hover ghost indicator */}
      {!value && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none">
          <div className="w-8 h-8 rounded-full border-2 border-white" />
        </div>
      )}
    </button>
  );
}