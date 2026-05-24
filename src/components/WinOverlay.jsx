import { useEffect, useState } from 'react';

const MESSAGES_WIN = [
  'CLEAN BOWLED!',
  'MATCH WON!',
  'CHAMPION!',
  'UNSTOPPABLE!',
  'HAT-TRICK HEROES!',
];

const MESSAGES_DRAW = [
  'SUPER OVER!',
  'MATCH TIED!',
  'DEAD HEAT!',
  'EQUAL CONTEST!',
];

function ConfettiPiece({ color, delay, left, size }) {
  return (
    <div
      className="fixed pointer-events-none rounded-sm"
      style={{
        width: size,
        height: size * 1.5,
        background: color,
        left: `${left}%`,
        top: '-20px',
        animation: `confettiFall ${2 + Math.random()}s ${delay}s linear infinite`,
        opacity: 0.85,
        transform: `rotate(${Math.random() * 360}deg)`,
      }}
    />
  );
}

export default function WinOverlay({ result, teams, onPlayAgain, onChangeTeams }) {
  const [confetti, setConfetti] = useState([]);
  const [visible, setVisible] = useState(false);

  const isDraw = result?.winner === 'draw';
  const winnerTeam = isDraw ? null : result?.winner === 'X' ? teams.X : teams.O;
  const loserTeam = isDraw ? null : result?.winner === 'X' ? teams.O : teams.X;

  const headline = isDraw
    ? MESSAGES_DRAW[Math.floor(Math.random() * MESSAGES_DRAW.length)]
    : MESSAGES_WIN[Math.floor(Math.random() * MESSAGES_WIN.length)];

  useEffect(() => {
    if (!result) return;
    setTimeout(() => setVisible(true), 50);

    const pieces = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      color: isDraw
        ? [teams.X.primary, teams.O.primary][i % 2]
        : i % 3 === 0
        ? winnerTeam.secondary
        : winnerTeam.primary,
      delay: (i * 0.06),
      left: Math.random() * 100,
      size: 6 + Math.random() * 8,
    }));
    setConfetti(pieces);
  }, [result]);

  if (!result) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center transition-all duration-500"
      style={{
        background: 'rgba(5, 12, 8, 0.92)',
        backdropFilter: 'blur(8px)',
        opacity: visible ? 1 : 0,
      }}
    >
      {/* Confetti */}
      {confetti.map((p) => (
        <ConfettiPiece key={p.id} {...p} />
      ))}

      {/* Card */}
      <div
        className="relative z-10 text-center px-8 py-10 rounded-2xl max-w-sm w-full mx-4"
        style={{
          background: '#0a1a10',
          border: `2px solid ${isDraw ? '#ffffff22' : winnerTeam.primary}`,
          boxShadow: isDraw
            ? 'none'
            : `0 0 60px ${winnerTeam.primary}33`,
          transform: visible ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(20px)',
          transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        {isDraw ? (
          <>
            <div className="flex justify-center gap-4 mb-4">
              <span className="text-5xl">{teams.X.emoji}</span>
              <span className="text-5xl">{teams.O.emoji}</span>
            </div>
            <p className="text-white/40 text-xs tracking-widest uppercase mb-1">It's a</p>
            <h2 className="font-display text-5xl text-white tracking-widest">{headline}</h2>
            <p className="text-white/30 text-sm mt-2">Neither side blinked. Pure cricket.</p>
          </>
        ) : (
          <>
            <div className="text-6xl mb-3">{winnerTeam.emoji}</div>
            <p className="text-xs tracking-widest uppercase mb-1" style={{ color: winnerTeam.primary, opacity: 0.7 }}>
              {winnerTeam.name}
            </p>
            <h2
              className="font-display text-6xl tracking-widest"
              style={{ color: winnerTeam.primary }}
            >
              {headline}
            </h2>
            <p className="text-white/30 text-sm mt-2 italic">"{winnerTeam.tagline}"</p>

            {loserTeam && (
              <p className="text-white/20 text-xs mt-3">
                {loserTeam.short} fought hard. Better luck next match.
              </p>
            )}
          </>
        )}

        {/* Action buttons */}
        <div className="flex gap-3 mt-8">
          <button
            onClick={onPlayAgain}
            className="flex-1 py-3 rounded-xl font-display text-xl tracking-widest transition-all hover:scale-105"
            style={{
              background: isDraw ? '#1a3028' : winnerTeam.primary,
              color: isDraw ? '#fff' : winnerTeam.darkText ? '#000' : '#fff',
            }}
          >
            REMATCH
          </button>
          <button
            onClick={onChangeTeams}
            className="px-4 py-3 rounded-xl text-sm text-white/40 border border-white/10 hover:border-white/30 transition-all"
          >
            Change Teams
          </button>
        </div>
      </div>
    </div>
  );
}