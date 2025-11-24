import React, { memo } from 'react';
import { PieceColor } from '../../types';

interface TurnIndicatorProps {
  turn: PieceColor;
}

const TurnIndicatorComponent: React.FC<TurnIndicatorProps> = ({ turn }) => {
  return (
    <div className="flex items-center justify-between gap-6 mb-3">
      <div className="flex items-center gap-2">
        <div
          className={`w-3 h-3 rounded-full transition-all ${
            turn === 'w'
              ? 'bg-white shadow-[0_0_10px_white]'
              : 'bg-slate-900 border border-slate-500'
          }`}
        />
        <span className={`font-bold ${turn === 'w' ? 'text-white' : 'text-slate-400'}`}>
          White
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className={`font-bold ${turn === 'b' ? 'text-white' : 'text-slate-400'}`}>
          Black
        </span>
        <div
          className={`w-3 h-3 rounded-full transition-all ${
            turn === 'b'
              ? 'bg-black border border-slate-500 shadow-[0_0_10px_black]'
              : 'bg-slate-900 border border-slate-500'
          }`}
        />
      </div>
    </div>
  );
};

export const TurnIndicator = memo(TurnIndicatorComponent);
