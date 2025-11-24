import { useState, useCallback, useEffect } from 'react';
import { Chess } from 'chess.js';
import { PieceColor } from '../types';

interface GameStatus {
  turn: PieceColor;
  status: string;
  gameOver: boolean;
}

export const useGameStatus = (game: Chess) => {
  const [turn, setTurn] = useState<PieceColor>('w');
  const [status, setStatus] = useState<string>("White's Turn");
  const [gameOver, setGameOver] = useState(false);

  const updateStatus = useCallback(() => {
    const isTurnWhite = game.turn() === 'w';
    setTurn(game.turn());

    if (game.isCheckmate()) {
      setStatus(isTurnWhite ? 'Checkmate! Black Wins' : 'Checkmate! White Wins');
      setGameOver(true);
    } else if (game.isDraw()) {
      setStatus('Draw!');
      setGameOver(true);
    } else if (game.isCheck()) {
      setStatus(isTurnWhite ? "Check! White's Turn" : "Check! Black's Turn");
      setGameOver(false);
    } else {
      setStatus(isTurnWhite ? "White's Turn" : "Black's Turn");
      setGameOver(false);
    }
  }, [game]);

  useEffect(() => {
    updateStatus();
  }, [updateStatus]);

  return { turn, status, gameOver, updateStatus };
};
