import { ThemeColors } from './types';

export const THEME: ThemeColors = {
  whiteSquare: '#e2e8f0',
  blackSquare: '#475569',
  highlight: '#3b82f6',
  validMove: '#10b981',
  lastMove: '#f59e0b',
  whitePiece: '#f8fafc',
  blackPiece: '#1e293b',
};

export const BOARD_SIZE = 8;
export const SQUARE_SIZE = 1.5;

export const CHESS_FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] as const;

export const CAMERA_CONFIG = {
  position: [0, 8, 12] as const,
  fov: 45,
  minPolarAngle: 0,
  maxPolarAngle: Math.PI / 2.2,
  minDistance: 5,
  maxDistance: 20,
} as const;

export const SHADOW_CONFIG = {
  mapSize: 2048,
  bias: -0.0001,
} as const;

export const LIGHTING_CONFIG = {
  ambient: {
    intensity: 0.4,
  },
  spotlight: {
    position: [10, 15, 10] as const,
    angle: 0.3,
    penumbra: 1,
    intensity: 1.5,
  },
  pointLight: {
    position: [-10, 10, -10] as const,
    intensity: 0.5,
    color: '#4169e1',
  },
} as const;

export const STARS_CONFIG = {
  radius: 100,
  depth: 50,
  count: 5000,
  factor: 4,
  saturation: 0,
  fade: true,
  speed: 1,
} as const;
