import { Square } from 'chess.js';
import { CHESS_FILES, SQUARE_SIZE } from '../constants';

export const getSquarePosition = (rowIndex: number, colIndex: number): [number, number, number] => {
  const x = (colIndex - 3.5) * SQUARE_SIZE;
  const z = (rowIndex - 3.5) * SQUARE_SIZE;
  return [x, 0, z];
};

export const getSquareName = (rowIndex: number, colIndex: number): Square => {
  const file = CHESS_FILES[colIndex];
  const rank = 8 - rowIndex;
  return `${file}${rank}` as Square;
};

export const isBlackSquare = (rowIndex: number, colIndex: number): boolean => {
  return (rowIndex + colIndex) % 2 === 1;
};
