export default function ScoreTracker({ teams, scores }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      width: '100%', marginBottom: '28px', padding: '20px 24px',
      background: 'rgba(255,255,255,0.03)', borderRadius: '16px',
      border: '1px solid rgba(255,255,255,0.07)',
    }}>
      {/* Home */}
      <div style={{ textAlign: 'center', flex: 1 }}>
        <img src={teams.X.logo} alt={teams.X.short}
          onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display='block'; }}
          style={{ width: '40px', height: '40px', objectFit: 'contain', margin: '0 auto 6px' }}
        />
        <span style={{ display: 'none', fontSize: '28px' }}>{teams.X.emoji}</span>
        <div className="font-display" style={{ fontSize: '22px', letterSpacing: '3px', color: teams.X.primary, lineHeight: 1 }}>
          {teams.X.short}
        </div>
        <div style={{ fontSize: '11px', letterSpacing: '3px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', margin: '2px 0 10px' }}>
          Home
        </div>
        <div className="font-display" style={{ fontSize: '56px', lineHeight: 1, color: teams.X.primary }}>
          {scores.X}
        </div>
      </div>

      {/* Center */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', padding: '0 16px' }}>
        <div className="font-display" style={{ fontSize: '22px', color: 'rgba(255,255,255,0.15)', letterSpacing: '4px' }}>VS</div>
        <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.08)' }} />
        <div style={{ fontSize: '10px', letterSpacing: '3px', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase' }}>Wins</div>
      </div>

      {/* Away */}
      <div style={{ textAlign: 'center', flex: 1 }}>
        <img src={teams.O.logo} alt={teams.O.short}
          onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display='block'; }}
          style={{ width: '40px', height: '40px', objectFit: 'contain', margin: '0 auto 6px' }}
        />
        <span style={{ display: 'none', fontSize: '28px' }}>{teams.O.emoji}</span>
        <div className="font-display" style={{ fontSize: '22px', letterSpacing: '3px', color: teams.O.primary, lineHeight: 1 }}>
          {teams.O.short}
        </div>
        <div style={{ fontSize: '11px', letterSpacing: '3px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', margin: '2px 0 10px' }}>
          Away
        </div>
        <div className="font-display" style={{ fontSize: '56px', lineHeight: 1, color: teams.O.primary }}>
          {scores.O}
        </div>
      </div>
    </div>
  );
}