import { useState } from 'react';
import { Chess } from 'chess.js';
import { Canvas } from '@react-three/fiber';
import { Loader } from '@react-three/drei';
import { RotateCcw, Trophy } from 'lucide-react';

import { ChessScene } from './components/ChessScene';
import { TurnIndicator } from './components/UI/TurnIndicator';
import { GameOverModal } from './components/UI/GameOverModal';
import { useGameStatus } from './hooks/useGameStatus';
import { CAMERA_CONFIG } from './constants';

function App() {
  const [game, setGame] = useState(new Chess());
  const { turn, status, gameOver, updateStatus } = useGameStatus(game);

  const handleReset = () => {
    const newGame = new Chess();
    setGame(newGame);
  };

  return (
    <div className="relative w-full h-full bg-slate-900 text-white">
      <div className="absolute inset-0 z-0">
        <Canvas shadows camera={{ position: CAMERA_CONFIG.position, fov: CAMERA_CONFIG.fov }}>
          <ChessScene game={game} setGame={setGame} onMoveMade={updateStatus} />
        </Canvas>
        <Loader />
      </div>

      <div className="absolute top-0 left-0 p-6 pointer-events-none z-10 w-full flex justify-between items-start bg-gradient-to-b from-black/50 to-transparent">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-blue-400 drop-shadow-md flex items-center gap-2">
            <Trophy className="w-8 h-8" />
            3D Chess{' '}
            <span className="text-xs text-slate-400 font-normal border border-slate-600 px-2 py-0.5 rounded-full">
              Tech Demo
            </span>
          </h1>
          <p className="text-slate-300 text-sm mt-1 max-w-md">
            Rotate camera with left click. Pan with right click. Click pieces to see moves.
          </p>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-md p-4 rounded-xl border border-slate-700 shadow-xl pointer-events-auto">
          <TurnIndicator turn={turn} />

          <div className="h-px w-full bg-slate-700 mb-4" />

          <div className="text-center mb-4">
            <p
              className={`text-lg font-mono font-bold ${
                game.isCheck() ? 'text-red-400 animate-pulse' : 'text-emerald-400'
              }`}
            >
              {status}
            </p>
          </div>

          <button
            onClick={handleReset}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg transition-all active:scale-95 shadow-lg shadow-blue-900/20"
          >
            <RotateCcw className="w-4 h-4" />
            Reset Game
          </button>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 pointer-events-none text-slate-500 text-xs">
        Rendering: React Three Fiber • Logic: chess.js
      </div>

      {gameOver && <GameOverModal status={status} onReset={handleReset} />}
    </div>
  );
}

export default App;
