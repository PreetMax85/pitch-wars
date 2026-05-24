// Slim horizontal score bar — fits in ~72px
export default function ScoreTracker({ teams, scores }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      width: '100%', padding: '12px 20px',
      background: 'rgba(255,255,255,0.03)', borderRadius: '12px',
      border: '1px solid rgba(255,255,255,0.07)',
      marginBottom: '12px',
    }}>
      {/* Home */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img src={teams.X.logo} alt={teams.X.short}
          onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'inline'; }}
          style={{ width: '34px', height: '34px', objectFit: 'contain' }}
        />
        <span style={{ display: 'none', fontSize: '20px' }}>{teams.X.emoji}</span>
        <div>
          <div className="font-display" style={{ fontSize: '17px', letterSpacing: '2px', color: teams.X.primary, lineHeight: 1 }}>
            {teams.X.short}
          </div>
          <div style={{ fontSize: '10px', letterSpacing: '2px', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase' }}>
            Home
          </div>
        </div>
        <div className="font-display" style={{ fontSize: '40px', lineHeight: 1, color: teams.X.primary, marginLeft: '8px' }}>
          {scores.X}
        </div>
      </div>

      {/* Center */}
      <div className="font-display" style={{ fontSize: '16px', color: 'rgba(255,255,255,0.15)', letterSpacing: '4px' }}>
        VS
      </div>

      {/* Away */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexDirection: 'row-reverse' }}>
        <img src={teams.O.logo} alt={teams.O.short}
          onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'inline'; }}
          style={{ width: '34px', height: '34px', objectFit: 'contain' }}
        />
        <span style={{ display: 'none', fontSize: '20px' }}>{teams.O.emoji}</span>
        <div style={{ textAlign: 'right' }}>
          <div className="font-display" style={{ fontSize: '17px', letterSpacing: '2px', color: teams.O.primary, lineHeight: 1 }}>
            {teams.O.short}
          </div>
          <div style={{ fontSize: '10px', letterSpacing: '2px', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase' }}>
            Away
          </div>
        </div>
        <div className="font-display" style={{ fontSize: '40px', lineHeight: 1, color: teams.O.primary, marginRight: '8px' }}>
          {scores.O}
        </div>
      </div>
    </div>
  );
}