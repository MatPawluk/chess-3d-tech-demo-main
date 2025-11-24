import React, { useCallback, useMemo } from 'react';
import { OrbitControls } from '@react-three/drei';
import { Chess } from 'chess.js';
import { ThreeEvent } from '@react-three/fiber';

import { CAMERA_CONFIG } from '../constants';
import { BoardSquare } from './BoardSquare';
import { BoardLabels } from './BoardLabels';
import { SceneEnvironment } from './SceneEnvironment';
import { Piece3D } from './Pieces';
import { useChessGame } from '../hooks/useChessGame';
import { getSquarePosition, getSquareName, isBlackSquare } from '../utils/chessUtils';

interface ChessSceneProps {
  game: Chess;
  setGame: React.Dispatch<React.SetStateAction<Chess>>;
  onMoveMade: () => void;
}

export const ChessScene: React.FC<ChessSceneProps> = ({ game, setGame, onMoveMade }) => {
  const { selectedSquare, validMoves, lastMove, handleSquareClick } = useChessGame(
    game,
    setGame,
    onMoveMade
  );

  const board = useMemo(() => game.board(), [game]);

  const handlePieceClick = useCallback(
    (e: ThreeEvent<MouseEvent>, squareName: string) => {
      e.stopPropagation();
      handleSquareClick(squareName as any);
    },
    [handleSquareClick]
  );

  return (
    <>
      <SceneEnvironment />

      <group>
        {board.map((row, rowIndex) =>
          row.map((piece, colIndex) => {
            const [x, , z] = getSquarePosition(rowIndex, colIndex);
            const squareName = getSquareName(rowIndex, colIndex);

            const isBlack = isBlackSquare(rowIndex, colIndex);
            const isSelected = selectedSquare === squareName;
            const isValidMove = validMoves.includes(squareName);
            const isLastMoveSq = lastMove
              ? lastMove.from === squareName || lastMove.to === squareName
              : false;

            return (
              <group key={squareName}>
                <BoardSquare
                  x={x}
                  z={z}
                  isBlack={isBlack}
                  isSelected={isSelected}
                  isValidMove={isValidMove}
                  isLastMove={isLastMoveSq}
                  onClick={() => handleSquareClick(squareName)}
                />
                {piece && (
                  <Piece3D
                    type={piece.type}
                    color={piece.color}
                    position={[x, 0, z]}
                    selected={isSelected}
                    onClick={(e) => handlePieceClick(e, squareName)}
                  />
                )}
                <BoardLabels rowIndex={rowIndex} colIndex={colIndex} x={x} z={z} />
              </group>
            );
          })
        )}
      </group>

      <OrbitControls
        makeDefault
        minPolarAngle={CAMERA_CONFIG.minPolarAngle}
        maxPolarAngle={CAMERA_CONFIG.maxPolarAngle}
        minDistance={CAMERA_CONFIG.minDistance}
        maxDistance={CAMERA_CONFIG.maxDistance}
      />
    </>
  );
};
