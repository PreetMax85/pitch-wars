import { useState } from 'react';
import TeamSelector from './components/TeamSelector';
import GameBoard from './components/GameBoard';
import { useGameLogic } from './hooks/useGameLogic';

function App() {
  const [teams, setTeams] = useState(null);
  const game = useGameLogic();

  const handleStart = (selectedTeams) => {
    game.resetAll();
    setTeams(selectedTeams);
  };

  const handleChangeTeams = () => {
    game.resetAll();
    setTeams(null);
  };

  return (
    <div className="relative min-h-screen bg-[#050e08] overflow-hidden">
      {/* Stadium atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(253,185,19,0.06) 0%, transparent 70%)',
        }} />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(45,106,79,0.08) 0%, transparent 70%)',
        }} />
        {/* Subtle dot grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(#4ade80 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />
      </div>

      <div className="relative z-10">
        {teams ? (
          <GameBoard teams={teams} game={game} onChangeTeams={handleChangeTeams} />
        ) : (
          <TeamSelector onStart={handleStart} />
        )}
      </div>
    </div>
  );
}

export default App;