import { useState } from 'react';
import { TEAMS } from '../data/teams';

export default function TeamSelector({ onStart }) {
  const [homeTeam, setHomeTeam] = useState(null);
  const [awayTeam, setAwayTeam] = useState(null);
  const [step, setStep] = useState(1);

  const handlePick = (team) => {
    if (step === 1) {
      setHomeTeam(team);
      setAwayTeam(null);
      setStep(2);
    } else {
      if (team.id === homeTeam?.id) return;
      setAwayTeam(team);
    }
  };

  const reset = () => { setHomeTeam(null); setAwayTeam(null); setStep(1); };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>

      {/* ── IPL-style header gradient banner ── */}
      <div style={{ position: 'relative', textAlign: 'center', marginBottom: '36px' }}>
        <div style={{
          position: 'absolute', inset: '-20px -60px', zIndex: 0,
          background: 'radial-gradient(ellipse at center, rgba(253,185,19,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <p style={{ fontFamily: "'Barlow Condensed'", fontSize: '11px', letterSpacing: '6px', color: 'rgba(253,185,19,0.7)', textTransform: 'uppercase', marginBottom: '8px', position: 'relative', zIndex: 1 }}>
          IPL EDITION 2025
        </p>
        <h1 className="font-display" style={{ fontSize: 'clamp(56px, 12vw, 96px)', lineHeight: 1, letterSpacing: '4px', color: '#fff', position: 'relative', zIndex: 1 }}>
          PITCH <span style={{ color: '#FDB913' }}>WARS</span>
        </h1>
        <p style={{ fontFamily: "'Barlow Condensed'", fontSize: '13px', letterSpacing: '8px', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', marginTop: '6px', position: 'relative', zIndex: 1 }}>
          TIC TAC TOE
        </p>
        {/* Decorative line */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginTop: '16px', position: 'relative', zIndex: 1 }}>
          <div style={{ height: '1px', width: '60px', background: 'linear-gradient(to right, transparent, rgba(253,185,19,0.4))' }} />
          <span style={{ color: '#FDB913', fontSize: '16px' }}>🏆</span>
          <div style={{ height: '1px', width: '60px', background: 'linear-gradient(to left, transparent, rgba(253,185,19,0.4))' }} />
        </div>
      </div>

      {/* ── Step pills ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        {[
          { label: homeTeam ? `${homeTeam.short} ✓` : 'Home', active: step === 1, done: !!homeTeam },
          { label: awayTeam ? `${awayTeam.short} ✓` : 'Away', active: step === 2, done: !!awayTeam },
        ].map((pill, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {i > 0 && <div style={{ width: '32px', height: '1px', background: 'rgba(255,255,255,0.15)' }} />}
            <div style={{
              padding: '5px 16px', borderRadius: '999px', fontSize: '12px',
              fontFamily: "'Barlow Condensed'", letterSpacing: '3px', textTransform: 'uppercase',
              background: pill.done ? 'rgba(74,222,128,0.1)' : pill.active ? 'rgba(253,185,19,0.15)' : 'transparent',
              border: `1px solid ${pill.done ? '#4ade80' : pill.active ? '#FDB913' : 'rgba(255,255,255,0.12)'}`,
              color: pill.done ? '#4ade80' : pill.active ? '#FDB913' : 'rgba(255,255,255,0.3)',
            }}>
              {pill.label}
            </div>
          </div>
        ))}
      </div>

      <p style={{ fontFamily: "'Barlow Condensed'", fontSize: '15px', color: 'rgba(255,255,255,0.4)', marginBottom: '24px', letterSpacing: '1px' }}>
        {step === 1 ? 'Pick HOME team (plays as ✕)' :
          awayTeam ? 'Both teams locked in! Ready to battle.' :
          `Pick AWAY team vs ${homeTeam?.short} (plays as ○)`}
      </p>

      {/* ── 10-team grid ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '12px',
        width: '100%',
        maxWidth: '760px',
        marginBottom: '32px',
      }}>
        {TEAMS.map((team) => {
          const isHome = homeTeam?.id === team.id;
          const isAway = awayTeam?.id === team.id;
          const isSelected = isHome || isAway;
          const isDisabled = step === 2 && isHome;

          return (
            <button
              key={team.id}
              onClick={() => !isDisabled && handlePick(team)}
              style={{
                position: 'relative',
                padding: '16px 10px',
                borderRadius: '14px',
                textAlign: 'center',
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                border: `2px solid ${isSelected ? team.primary : 'rgba(255,255,255,0.08)'}`,
                background: isSelected
                  ? `linear-gradient(160deg, ${team.primary}20 0%, ${team.primary}08 100%)`
                  : '#0c1f14',
                boxShadow: isSelected ? `0 0 24px ${team.primary}30, inset 0 0 20px ${team.primary}08` : 'none',
                opacity: isDisabled ? 0.35 : 1,
                transform: isSelected ? 'translateY(-3px)' : 'none',
                transition: 'all 0.2s ease',
                outline: 'none',
              }}
            >
              {/* top color bar */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', borderRadius: '14px 14px 0 0', background: team.primary }} />

              {/* badge */}
              {isSelected && (
                <div style={{
                  position: 'absolute', top: '7px', right: '7px',
                  fontSize: '9px', padding: '2px 6px', borderRadius: '4px',
                  fontFamily: "'Barlow Condensed'", fontWeight: 700, letterSpacing: '1px',
                  background: team.primary, color: team.darkText ? '#000' : '#fff',
                }}>
                  {isHome ? 'HOME' : 'AWAY'}
                </div>
              )}

              {/* logo */}
              <img
                src={team.logo}
                alt={team.short}
                onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
                style={{ width: '44px', height: '44px', objectFit: 'contain', margin: '0 auto 8px' }}
              />
              <span style={{ display: 'none', fontSize: '28px', marginBottom: '8px' }}>{team.emoji}</span>

              <div className="font-display" style={{ fontSize: '20px', letterSpacing: '2px', color: isSelected ? team.primary : '#fff', lineHeight: 1 }}>
                {team.short}
              </div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', marginTop: '3px', lineHeight: 1.2 }}>
                {team.name.split(' ').slice(-2).join(' ')}
              </div>
            </button>
          );
        })}
      </div>

      {/* ── Actions row ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {(homeTeam || awayTeam) && (
          <button onClick={reset} style={{
            padding: '12px 20px', borderRadius: '10px', fontSize: '13px',
            fontFamily: "'Barlow Condensed'", letterSpacing: '2px', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.4)', background: 'transparent',
            border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer',
          }}>
            Reset
          </button>
        )}
        {homeTeam && awayTeam && (
          <button onClick={() => onStart({ X: homeTeam, O: awayTeam })} style={{
            padding: '14px 40px', borderRadius: '10px', cursor: 'pointer',
            fontFamily: "'Bebas Neue'", fontSize: '24px', letterSpacing: '4px',
            background: `linear-gradient(135deg, ${homeTeam.primary}, ${awayTeam.primary})`,
            color: '#000', border: 'none',
            boxShadow: `0 4px 24px ${homeTeam.primary}50`,
            transition: 'transform 0.15s, box-shadow 0.15s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            START MATCH
          </button>
        )}
      </div>

      {/* VS preview */}
      {homeTeam && awayTeam && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginTop: '28px', animation: 'fadeSlideUp 0.4s ease forwards' }}>
          <div style={{ textAlign: 'center' }}>
            <img src={homeTeam.logo} alt={homeTeam.short} onError={e => e.target.style.display='none'} style={{ width: '36px', height: '36px', objectFit: 'contain', margin: '0 auto 4px' }} />
            <div className="font-display" style={{ fontSize: '18px', color: homeTeam.primary, letterSpacing: '2px' }}>{homeTeam.short}</div>
          </div>
          <div className="font-display" style={{ fontSize: '28px', color: 'rgba(255,255,255,0.2)', letterSpacing: '4px' }}>VS</div>
          <div style={{ textAlign: 'center' }}>
            <img src={awayTeam.logo} alt={awayTeam.short} onError={e => e.target.style.display='none'} style={{ width: '36px', height: '36px', objectFit: 'contain', margin: '0 auto 4px' }} />
            <div className="font-display" style={{ fontSize: '18px', color: awayTeam.primary, letterSpacing: '2px' }}>{awayTeam.short}</div>
          </div>
        </div>
      )}
    </div>
  );
}