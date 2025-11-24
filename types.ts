import { ThreeElements } from '@react-three/fiber';

export type PieceColor = 'w' | 'b';
export type PieceType = 'p' | 'n' | 'b' | 'r' | 'q' | 'k';

export interface BoardSquare {
  square: string;
  type: PieceType;
  color: PieceColor;
}

export interface GameState {
  fen: string;
  turn: PieceColor;
  isCheck: boolean;
  isCheckmate: boolean;
  isDraw: boolean;
  history: string[];
}

export type Vector3Array = [number, number, number];

export interface ThemeColors {
  whiteSquare: string;
  blackSquare: string;
  highlight: string;
  validMove: string;
  lastMove: string;
  whitePiece: string;
  blackPiece: string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}