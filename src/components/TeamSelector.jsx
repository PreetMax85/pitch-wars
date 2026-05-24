import { useState } from 'react';
import { TEAMS } from '../data/teams';

export default function TeamSelector({ onStart }) {
  const [homeTeam, setHomeTeam] = useState(null);
  const [awayTeam, setAwayTeam] = useState(null);
  const [step, setStep] = useState(1);

  const handlePick = (team) => {
    if (step === 1) { setHomeTeam(team); setAwayTeam(null); setStep(2); }
    else { if (team.id !== homeTeam?.id) setAwayTeam(team); }
  };

  const reset = () => { setHomeTeam(null); setAwayTeam(null); setStep(1); };

  return (
    /* Scrollable full-screen container */
    <div style={{
      minHeight: '100vh', overflowY: 'auto',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: '28px 20px',
    }}>

      {/* Header */}
      <div style={{ position: 'relative', textAlign: 'center', marginBottom: '20px' }}>
        <div style={{
          position: 'absolute', inset: '-16px -60px', zIndex: 0,
          background: 'radial-gradient(ellipse at center, rgba(253,185,19,0.13) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <p style={{ fontSize: 'clamp(13px, 2.5vw, 18px)', letterSpacing: '8px', color: 'rgba(253,185,19,0.85)', textTransform: 'uppercase', marginBottom: '6px', position: 'relative', zIndex: 1, textShadow: '0 0 20px rgba(253,185,19,0.2)' }}>
          IPL Edition 2026
        </p>
        <h1 className="font-display" style={{ fontSize: 'clamp(44px, 9vw, 80px)', lineHeight: 1, letterSpacing: '4px', color: '#fff', position: 'relative', zIndex: 1 }}>
          PITCH <span style={{ color: '#FDB913' }}>WARS</span>
        </h1>
        <p style={{ fontSize: 'clamp(13px, 2.5vw, 20px)', letterSpacing: '10px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginTop: '6px', position: 'relative', zIndex: 1 }}>
          TIC TAC TOE
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '10px', position: 'relative', zIndex: 1 }}>
          <div style={{ height: '1px', width: '48px', background: 'linear-gradient(to right, transparent, rgba(253,185,19,0.35))' }} />
          <span style={{ color: '#FDB913', fontSize: '14px' }}>🏆</span>
          <div style={{ height: '1px', width: '48px', background: 'linear-gradient(to left, transparent, rgba(253,185,19,0.35))' }} />
        </div>
      </div>

      {/* Step pills */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
        {[
          { label: homeTeam ? `${homeTeam.short} ✓` : 'Home', active: step === 1, done: !!homeTeam },
          { label: awayTeam ? `${awayTeam.short} ✓` : 'Away', active: step === 2, done: !!awayTeam },
        ].map((pill, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {i > 0 && <div style={{ width: '28px', height: '1px', background: 'rgba(255,255,255,0.12)' }} />}
            <div style={{
              padding: '4px 14px', borderRadius: '999px', fontSize: '11px',
              fontFamily: "'Barlow Condensed'", letterSpacing: '3px', textTransform: 'uppercase',
              background: pill.done ? 'rgba(74,222,128,0.1)' : pill.active ? 'rgba(253,185,19,0.12)' : 'transparent',
              border: `1px solid ${pill.done ? '#4ade80' : pill.active ? '#FDB913' : 'rgba(255,255,255,0.1)'}`,
              color: pill.done ? '#4ade80' : pill.active ? '#FDB913' : 'rgba(255,255,255,0.25)',
            }}>
              {pill.label}
            </div>
          </div>
        ))}
      </div>

      <p style={{ fontFamily: "'Barlow Condensed'", fontSize: '13px', color: 'rgba(255,255,255,0.35)', marginBottom: '16px', letterSpacing: '0.5px' }}>
        {step === 1 ? 'Pick HOME team (plays as ✕)' :
          awayTeam ? 'Both teams locked in! Ready to battle.' :
          `Pick AWAY team vs ${homeTeam?.short} (plays as ○)`}
      </p>

      {/* 10-team grid: 5 cols × 2 rows */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '14px',
        width: '100%',
        maxWidth: '820px',
        marginBottom: '20px',
      }}>
        {TEAMS.map((team) => {
          const isHome = homeTeam?.id === team.id;
          const isAway = awayTeam?.id === team.id;
          const isSelected = isHome || isAway;
          const isDisabled = step === 2 && isHome;

          return (
            <button key={team.id} onClick={() => !isDisabled && handlePick(team)} style={{
              position: 'relative',
              padding: '20px 14px 18px',
              borderRadius: '14px', textAlign: 'center',
              cursor: isDisabled ? 'not-allowed' : 'pointer',
              border: `2px solid ${isSelected ? team.primary : 'rgba(255,255,255,0.07)'}`,
              background: isSelected
                ? `linear-gradient(160deg,${team.primary}22 0%,${team.primary}08 100%)`
                : '#0c1f14',
              boxShadow: isSelected ? `0 0 24px ${team.primary}30` : 'none',
              opacity: isDisabled ? 0.3 : 1,
              transform: isSelected ? 'translateY(-3px)' : 'none',
              transition: 'all 0.2s ease', outline: 'none',
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', borderRadius: '13px 13px 0 0', background: team.primary }} />

              {isSelected && (
                <div style={{
                  position: 'absolute', top: '6px', right: '6px',
                  fontSize: '9px', padding: '2px 7px', borderRadius: '4px',
                  fontFamily: "'Barlow Condensed'", fontWeight: 700, letterSpacing: '1px',
                  background: team.primary, color: team.darkText ? '#000' : '#fff',
                }}>
                  {isHome ? 'HOME' : 'AWAY'}
                </div>
              )}

              <div style={{
                width: 'clamp(56px, 8vw, 76px)',
                height: 'clamp(56px, 8vw, 76px)',
                margin: '0 auto 8px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(0,0,0,0.3)', borderRadius: '10px',
              }}>
                <img src={team.logo} alt={team.short}
                  onError={e => { e.target.style.display='none'; e.target.parentElement.style.background='none'; e.target.nextSibling.style.display='block'; }}
                  style={{ width: 'clamp(48px, 7vw, 66px)', height: 'clamp(48px, 7vw, 66px)', objectFit: 'contain', display: 'block' }}
                />
                <span style={{ display: 'none', fontSize: '32px' }}>{team.emoji}</span>
              </div>

              <div className="font-display" style={{ fontSize: 'clamp(22px, 3.5vw, 30px)', letterSpacing: '2px', color: isSelected ? team.primary : '#fff', lineHeight: 1 }}>
                {team.short}
              </div>
              <div style={{ fontSize: 'clamp(12px, 1.8vw, 16px)', color: 'rgba(255,255,255,0.4)', marginTop: '3px', lineHeight: 1.2 }}>
                {team.name}
              </div>
            </button>
          );
        })}
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {(homeTeam || awayTeam) && (
          <button onClick={reset} style={{
            padding: '11px 18px', borderRadius: '9px', fontSize: '12px',
            fontFamily: "'Barlow Condensed'", letterSpacing: '2px', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.35)', background: 'transparent',
            border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer',
          }}>
            Reset
          </button>
        )}
        {homeTeam && awayTeam && (
          <button onClick={() => onStart({ X: homeTeam, O: awayTeam })} style={{
            padding: '12px 36px', borderRadius: '9px', cursor: 'pointer',
            fontFamily: "'Bebas Neue'", fontSize: '22px', letterSpacing: '4px',
            background: `linear-gradient(135deg,${homeTeam.primary},${awayTeam.primary})`,
            color: '#000', border: 'none',
            boxShadow: `0 4px 20px ${homeTeam.primary}44`,
            transition: 'transform 0.15s',
          }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            START MATCH
          </button>
        )}
      </div>

      {/* VS preview */}
      {homeTeam && awayTeam && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '20px', animation: 'fadeSlideUp 0.4s ease' }}>
          <div style={{ textAlign: 'center' }}>
            <img src={homeTeam.logo} alt="" onError={e => e.target.style.display='none'} style={{ width: '28px', height: '28px', objectFit: 'contain', margin: '0 auto 3px' }} />
            <div className="font-display" style={{ fontSize: '16px', color: homeTeam.primary, letterSpacing: '2px' }}>{homeTeam.short}</div>
          </div>
          <div className="font-display" style={{ fontSize: '22px', color: 'rgba(255,255,255,0.18)', letterSpacing: '4px' }}>VS</div>
          <div style={{ textAlign: 'center' }}>
            <img src={awayTeam.logo} alt="" onError={e => e.target.style.display='none'} style={{ width: '28px', height: '28px', objectFit: 'contain', margin: '0 auto 3px' }} />
            <div className="font-display" style={{ fontSize: '16px', color: awayTeam.primary, letterSpacing: '2px' }}>{awayTeam.short}</div>
          </div>
        </div>
      )}
    </div>
  );
}