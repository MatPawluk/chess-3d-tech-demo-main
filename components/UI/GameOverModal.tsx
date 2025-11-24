import React, { memo } from 'react';
import { Trophy } from 'lucide-react';

interface GameOverModalProps {
  status: string;
  onReset: () => void;
}

const GameOverModalComponent: React.FC<GameOverModalProps> = ({ status, onReset }) => {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-slate-900 p-8 rounded-2xl border border-blue-500/30 shadow-[0_0_50px_rgba(59,130,246,0.2)] text-center animate-in fade-in zoom-in duration-300">
        <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-4xl font-bold text-white mb-2">Game Over!</h2>
        <p className="text-xl text-blue-300 mb-8">{status}</p>
        <button
          onClick={onReset}
          className="bg-white text-slate-900 hover:bg-slate-200 font-bold py-3 px-8 rounded-full transition-transform hover:scale-105 active:scale-95"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export const GameOverModal = memo(GameOverModalComponent);
