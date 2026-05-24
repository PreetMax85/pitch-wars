import { useState } from 'react';
import TeamSelector from './components/TeamSelector';
import GameBoard from './components/GameBoard';
import { useGameLogic } from './hooks/useGameLogic';

export default function App() {
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
    <div style={{ minHeight: '100vh', background: '#050e08', position: 'relative', overflow: 'hidden' }}>
      {/* Global ambient glow — always present */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(ellipse 90% 50% at 50% 0%, rgba(253,185,19,0.07) 0%, transparent 65%)',
      }} />
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: 'radial-gradient(rgba(74,222,128,0.04) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }} />

      <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
        {teams ? (
          <GameBoard teams={teams} game={game} onChangeTeams={handleChangeTeams} />
        ) : (
          <TeamSelector onStart={handleStart} />
        )}
      </div>
    </div>
  );
}