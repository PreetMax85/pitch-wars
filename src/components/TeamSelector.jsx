import { useState } from 'react';
import { TEAMS } from '../data/teams';

export default function TeamSelector({ onStart }) {
  const [homeTeam, setHomeTeam] = useState(null);
  const [awayTeam, setAwayTeam] = useState(null);
  const [step, setStep] = useState(1); // 1 = pick home, 2 = pick away

  const handlePick = (team) => {
    if (step === 1) {
      setHomeTeam(team);
      setStep(2);
    } else {
      if (team.id === homeTeam?.id) return;
      setAwayTeam(team);
    }
  };

  const handleStart = () => {
    if (homeTeam && awayTeam) {
      onStart({ X: homeTeam, O: awayTeam });
    }
  };

  const resetPick = () => {
    setHomeTeam(null);
    setAwayTeam(null);
    setStep(1);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
      {/* Header */}
      <div className="text-center mb-2">
        <p className="text-xs tracking-[0.4em] text-yellow-400/70 uppercase mb-2">IPL Edition</p>
        <h1 className="font-display text-6xl md:text-8xl text-white leading-none tracking-wider">
          PITCH
          <span className="text-yellow-400"> WARS</span>
        </h1>
        <p className="text-sm text-white/40 tracking-widest uppercase mt-2">Tic Tac Toe</p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-3 mb-8 mt-6">
        <div
          className="px-4 py-1 rounded-full text-xs tracking-widest uppercase transition-all duration-300"
          style={{
            background: step === 1 ? '#FDB913' : homeTeam ? '#1a3d2a' : 'transparent',
            color: step === 1 ? '#000' : homeTeam ? '#4ade80' : '#ffffff40',
            border: `1px solid ${step === 1 ? '#FDB913' : homeTeam ? '#4ade80' : '#ffffff20'}`,
          }}
        >
          {homeTeam ? `${homeTeam.short} ✓` : 'Home Team'}
        </div>
        <div className="w-8 h-px bg-white/20" />
        <div
          className="px-4 py-1 rounded-full text-xs tracking-widest uppercase transition-all duration-300"
          style={{
            background: step === 2 && !awayTeam ? '#FDB913' : awayTeam ? '#1a3d2a' : 'transparent',
            color: step === 2 && !awayTeam ? '#000' : awayTeam ? '#4ade80' : '#ffffff40',
            border: `1px solid ${step === 2 && !awayTeam ? '#FDB913' : awayTeam ? '#4ade80' : '#ffffff20'}`,
          }}
        >
          {awayTeam ? `${awayTeam.short} ✓` : 'Away Team'}
        </div>
      </div>

      <p className="text-white/50 text-sm mb-6 tracking-wide">
        {step === 1
          ? 'Select HOME team (plays as ✕)'
          : awayTeam
          ? 'Both teams locked in!'
          : `Select AWAY team vs ${homeTeam?.short} (plays as ○)`}
      </p>

      {/* Team grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full max-w-xl mb-8">
        {TEAMS.map((team) => {
          const isHome = homeTeam?.id === team.id;
          const isAway = awayTeam?.id === team.id;
          const isSelected = isHome || isAway;
          const isDisabled = step === 2 && isHome;

          return (
            <button
              key={team.id}
              onClick={() => handlePick(team)}
              disabled={isDisabled}
              className="relative rounded-xl p-4 text-left transition-all duration-200 cursor-pointer group overflow-hidden"
              style={{
                background: isSelected
                  ? `linear-gradient(135deg, ${team.primary}22, ${team.primary}11)`
                  : '#0f1f18',
                border: `2px solid ${isSelected ? team.primary : '#1a3030'}`,
                opacity: isDisabled ? 0.4 : 1,
                transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                boxShadow: isSelected ? `0 0 20px ${team.primary}33` : 'none',
              }}
            >
              {/* Top color bar */}
              <div
                className="absolute top-0 left-0 right-0 h-1 rounded-t-xl"
                style={{ background: team.primary }}
              />

              {/* Selected badge */}
              {isSelected && (
                <div
                  className="absolute top-2 right-2 text-xs px-1.5 py-0.5 rounded font-bold"
                  style={{
                    background: team.primary,
                    color: team.darkText ? '#000' : '#fff',
                  }}
                >
                  {isHome ? 'HOME' : 'AWAY'}
                </div>
              )}

              <div className="text-3xl mb-2">{team.emoji}</div>
              <div
                className="font-display text-2xl tracking-wider"
                style={{ color: isSelected ? team.primary : '#fff' }}
              >
                {team.short}
              </div>
              <div className="text-xs text-white/40 mt-0.5 leading-tight">{team.name}</div>
              <div className="text-xs mt-2 text-white/30 italic">"{team.tagline}"</div>
            </button>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        {(homeTeam || awayTeam) && (
          <button
            onClick={resetPick}
            className="px-5 py-2.5 rounded-lg text-sm text-white/50 border border-white/10 hover:border-white/30 transition-all"
          >
            Reset
          </button>
        )}
        {homeTeam && awayTeam && (
          <button
            onClick={handleStart}
            className="px-8 py-3 rounded-lg font-display text-xl tracking-widest transition-all duration-200 hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${homeTeam.primary}, ${awayTeam.primary})`,
              color: '#000',
            }}
          >
            START MATCH
          </button>
        )}
      </div>

      {/* VS preview */}
      {homeTeam && awayTeam && (
        <div className="mt-6 flex items-center gap-4 text-center animate-pulse-once">
          <div>
            <div className="text-3xl">{homeTeam.emoji}</div>
            <div className="font-display text-lg" style={{ color: homeTeam.primary }}>
              {homeTeam.short}
            </div>
          </div>
          <div className="font-display text-3xl text-white/30">VS</div>
          <div>
            <div className="text-3xl">{awayTeam.emoji}</div>
            <div className="font-display text-lg" style={{ color: awayTeam.primary }}>
              {awayTeam.short}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}