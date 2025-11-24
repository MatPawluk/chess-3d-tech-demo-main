import React, { memo } from 'react';
import { ThreeEvent } from '@react-three/fiber';
import { SQUARE_SIZE, THEME } from '../constants';

interface BoardSquareProps {
  x: number;
  z: number;
  isBlack: boolean;
  isValidMove: boolean;
  isLastMove: boolean;
  isSelected: boolean;
  onClick: () => void;
}

const BoardSquareComponent: React.FC<BoardSquareProps> = ({
  x,
  z,
  isBlack,
  isValidMove,
  isLastMove,
  isSelected,
  onClick,
}) => {
  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    onClick();
  };

  const color = isSelected
    ? THEME.highlight
    : isValidMove
    ? THEME.validMove
    : isLastMove
    ? THEME.lastMove
    : isBlack
    ? THEME.blackSquare
    : THEME.whiteSquare;

  return (
    <mesh position={[x, -0.1, z]} receiveShadow onClick={handleClick}>
      <boxGeometry args={[SQUARE_SIZE, 0.2, SQUARE_SIZE]} />
      <meshStandardMaterial color={color} roughness={0.5} metalness={0.1} />
    </mesh>
  );
};

export const BoardSquare = memo(BoardSquareComponent);
