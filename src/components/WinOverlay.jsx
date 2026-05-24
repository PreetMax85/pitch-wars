import { useEffect, useState, useRef } from 'react';

const WIN_MSGS = ['CLEAN BOWLED!', 'MATCH WON!', 'CHAMPION!', 'UNSTOPPABLE!', 'SIX & OUT!'];
const DRAW_MSGS = ['SUPER OVER!', 'MATCH TIED!', 'DEAD HEAT!', 'EQUAL CONTEST!'];

function Confetti({ colors }) {
  const pieces = Array.from({ length: 48 }, (_, i) => ({
    id: i,
    color: colors[i % colors.length],
    delay: i * 0.05,
    left: Math.random() * 100,
    size: 7 + Math.random() * 7,
    duration: 2.2 + Math.random() * 1.2,
  }));

  return (
    <>
      {pieces.map(p => (
        <div key={p.id} style={{
          position: 'fixed', width: p.size, height: p.size * 1.6,
          background: p.color, left: `${p.left}%`, top: '-20px',
          borderRadius: '2px', pointerEvents: 'none', zIndex: 60,
          animation: `confettiFall ${p.duration}s ${p.delay}s linear infinite`,
          opacity: 0.9, transform: `rotate(${Math.random() * 180}deg)`,
        }} />
      ))}
    </>
  );
}

export default function WinOverlay({ result, teams, onPlayAgain, onChangeTeams }) {
  const [visible, setVisible] = useState(false);
  const msgRef = useRef('');

  const isDraw = result?.winner === 'draw';
  const winnerTeam = isDraw ? null : result?.winner === 'X' ? teams.X : teams.O;
  const loserTeam = isDraw ? null : result?.winner === 'X' ? teams.O : teams.X;

  useEffect(() => {
    if (!result) { setVisible(false); return; }
    msgRef.current = isDraw
      ? DRAW_MSGS[Math.floor(Math.random() * DRAW_MSGS.length)]
      : WIN_MSGS[Math.floor(Math.random() * WIN_MSGS.length)];
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, [result]);

  if (!result) return null;

  const confettiColors = isDraw
    ? [teams.X.primary, teams.O.primary, '#ffffff40']
    : [winnerTeam.primary, winnerTeam.secondary, '#ffffff40'];

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 50,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(3, 9, 5, 0.9)', backdropFilter: 'blur(10px)',
      opacity: visible ? 1 : 0, transition: 'opacity 0.4s ease',
    }}>
      <Confetti colors={confettiColors} />

      <div style={{
        position: 'relative', zIndex: 10, textAlign: 'center',
        padding: '48px 40px 32px', borderRadius: '24px',
        maxWidth: '420px', width: '100%', margin: '0 20px',
        background: '#060f09',
        border: `2px solid ${isDraw ? 'rgba(255,255,255,0.12)' : winnerTeam.primary}`,
        boxShadow: isDraw ? 'none' : `0 0 80px ${winnerTeam.primary}30`,
        transform: visible ? 'scale(1) translateY(0)' : 'scale(0.88) translateY(24px)',
        transition: 'transform 0.45s cubic-bezier(0.34,1.56,0.64,1)',
      }}>

        {isDraw ? (
          <>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '16px' }}>
              <img src={teams.X.logo} alt="" onError={e=>e.target.style.display='none'} style={{ width: 'clamp(72px, 12vw, 96px)', height: 'clamp(72px, 12vw, 96px)', objectFit: 'contain' }} />
              <img src={teams.O.logo} alt="" onError={e=>e.target.style.display='none'} style={{ width: 'clamp(72px, 12vw, 96px)', height: 'clamp(72px, 12vw, 96px)', objectFit: 'contain' }} />
            </div>
            <p style={{ fontSize: '14px', letterSpacing: '6px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: '8px' }}>It's a</p>
            <h2 className="font-display" style={{ fontSize: '52px', color: '#fff', letterSpacing: '4px', lineHeight: 1 }}>{msgRef.current}</h2>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)', marginTop: '10px', fontStyle: 'italic' }}>Neither side blinked. Pure cricket.</p>
          </>
        ) : (
          <>
            <img src={winnerTeam.logo} alt="" onError={e=>e.target.style.display='none'} style={{ width: 'clamp(88px, 14vw, 112px)', height: 'clamp(88px, 14vw, 112px)', objectFit: 'contain', margin: '0 auto 12px' }} />
            <p style={{ fontSize: 'clamp(18px, 3vw, 24px)', letterSpacing: '6px', textTransform: 'uppercase', marginBottom: '6px', color: winnerTeam.primary }}>
              {winnerTeam.name}
            </p>
            <h2 className="font-display" style={{ fontSize: '54px', color: winnerTeam.primary, letterSpacing: '3px', lineHeight: 1 }}>
              {msgRef.current}
            </h2>
            <p style={{ fontSize: 'clamp(18px, 3vw, 24px)', color: 'rgba(255,255,255,0.7)', marginTop: '10px', fontStyle: 'italic' }}>
              "{winnerTeam.tagline}"
            </p>
            {loserTeam && (
              <p style={{ fontSize: 'clamp(16px, 2.5vw, 20px)', color: 'rgba(255,255,255,0.55)', marginTop: '14px' }}>
                {loserTeam.short} fought hard. Better luck next time.
              </p>
            )}
          </>
        )}

        <div style={{ display: 'flex', gap: '12px', marginTop: '36px' }}>
          <button onClick={onPlayAgain} style={{
            flex: 1, padding: '14px 0', borderRadius: '12px', cursor: 'pointer',
            fontFamily: "'Bebas Neue'", fontSize: '22px', letterSpacing: '3px',
            background: isDraw ? 'rgba(255,255,255,0.1)' : winnerTeam.primary,
            color: isDraw ? '#fff' : winnerTeam.darkText ? '#000' : '#fff',
            border: 'none', transition: 'transform 0.15s',
          }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            REMATCH
          </button>
          <button onClick={onChangeTeams} style={{
            padding: '14px 18px', borderRadius: '12px', cursor: 'pointer',
            fontFamily: "'Barlow Condensed'", fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.4)', background: 'transparent',
            border: '1px solid rgba(255,255,255,0.12)', transition: 'all 0.15s',
          }}
            onMouseEnter={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
          >
            Change Teams
          </button>
        </div>
      </div>
    </div>
  );
}