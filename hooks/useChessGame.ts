import { useState, useCallback } from 'react';
import { Chess, Square, Move } from 'chess.js';

interface UseChessGameReturn {
  game: Chess;
  selectedSquare: Square | null;
  validMoves: Square[];
  lastMove: Move | null;
  handleSquareClick: (clickedSquare: Square) => void;
  setGame: React.Dispatch<React.SetStateAction<Chess>>;
  onMoveMade: () => void;
}

export const useChessGame = (
  game: Chess,
  setGame: React.Dispatch<React.SetStateAction<Chess>>,
  onMoveMade: () => void
): UseChessGameReturn => {
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [validMoves, setValidMoves] = useState<Square[]>([]);
  const [lastMove, setLastMove] = useState<Move | null>(null);

  const handleSquareClick = useCallback(
    (clickedSquare: Square) => {
      if (selectedSquare) {
        if (selectedSquare === clickedSquare) {
          setSelectedSquare(null);
          setValidMoves([]);
          return;
        }

        try {
          const move = game.move({
            from: selectedSquare,
            to: clickedSquare,
            promotion: 'q',
          });

          if (move) {
            setGame(new Chess(game.fen()));
            setLastMove(move);
            setSelectedSquare(null);
            setValidMoves([]);
            onMoveMade();
            return;
          }
        } catch (error) {
          if (process.env.NODE_ENV === 'development') {
            console.warn('Invalid move attempted:', {
              from: selectedSquare,
              to: clickedSquare,
              error,
            });
          }
        }
      }

      const piece = game.get(clickedSquare);
      if (piece && piece.color === game.turn()) {
        setSelectedSquare(clickedSquare);
        const moves = game.moves({ square: clickedSquare, verbose: true });
        setValidMoves(moves.map((m) => m.to));
      } else {
        setSelectedSquare(null);
        setValidMoves([]);
      }
    },
    [game, selectedSquare, setGame, onMoveMade]
  );

  return {
    game,
    selectedSquare,
    validMoves,
    lastMove,
    handleSquareClick,
    setGame,
    onMoveMade,
  };
};
