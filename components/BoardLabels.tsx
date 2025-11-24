import React, { memo } from 'react';
import { Text } from '@react-three/drei';
import { SQUARE_SIZE, CHESS_FILES } from '../constants';

interface BoardLabelsProps {
  rowIndex: number;
  colIndex: number;
  x: number;
  z: number;
}

const BoardLabelsComponent: React.FC<BoardLabelsProps> = ({ rowIndex, colIndex, x, z }) => {
  const rank = 8 - rowIndex;

  return (
    <>
      {rowIndex === 7 && (
        <Text
          position={[x, 0.1, z + SQUARE_SIZE / 1.8]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.4}
          color="#64748b"
        >
          {CHESS_FILES[colIndex]}
        </Text>
      )}
      {colIndex === 0 && (
        <Text
          position={[x - SQUARE_SIZE / 1.8, 0.1, z]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.4}
          color="#64748b"
        >
          {rank}
        </Text>
      )}
    </>
  );
};

export const BoardLabels = memo(BoardLabelsComponent);
