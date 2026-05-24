export default function ScoreTracker({ teams, scores }) {
  return (
    <div className="flex items-center justify-between w-full max-w-sm mx-auto mb-6">
      {/* Home team */}
      <div className="flex flex-col items-center gap-1">
        <span className="text-2xl">{teams.X.emoji}</span>
        <span
          className="font-display text-lg tracking-wider leading-none"
          style={{ color: teams.X.primary }}
        >
          {teams.X.short}
        </span>
        <span className="text-xs text-white/30 uppercase tracking-widest">Home</span>
        <span
          className="font-display text-5xl leading-none"
          style={{ color: teams.X.primary }}
        >
          {scores.X}
        </span>
      </div>

      {/* Center divider */}
      <div className="flex flex-col items-center gap-1 px-4">
        <span className="font-display text-3xl text-white/20">VS</span>
        <div className="w-px h-8 bg-white/10" />
        <span className="text-xs text-white/20 tracking-widest">MATCHES</span>
      </div>

      {/* Away team */}
      <div className="flex flex-col items-center gap-1">
        <span className="text-2xl">{teams.O.emoji}</span>
        <span
          className="font-display text-lg tracking-wider leading-none"
          style={{ color: teams.O.primary }}
        >
          {teams.O.short}
        </span>
        <span className="text-xs text-white/30 uppercase tracking-widest">Away</span>
        <span
          className="font-display text-5xl leading-none"
          style={{ color: teams.O.primary }}
        >
          {scores.O}
        </span>
      </div>
    </div>
  );
}