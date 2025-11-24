import React, { useMemo } from 'react';
import { ThreeEvent } from '@react-three/fiber';
import { PieceType, PieceColor } from '../types';
import { THEME } from '../constants';

interface PieceProps {
  type: PieceType;
  color: PieceColor;
  position: [number, number, number];
  onClick?: (e: ThreeEvent<MouseEvent>) => void;
  selected?: boolean;
}

interface MaterialProps {
  color: string;
  roughness: number;
  metalness: number;
  emissive?: string;
  emissiveIntensity?: number;
}

const PieceBase: React.FC<{ materialProps: MaterialProps }> = ({ materialProps }) => (
  <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
    <cylinderGeometry args={[0.6, 0.7, 0.2, 32]} />
    <meshStandardMaterial {...materialProps} />
  </mesh>
);

export const Piece3D: React.FC<PieceProps> = ({ type, color, position, onClick, selected }) => {
  const materialProps = useMemo<MaterialProps>(() => {
    if (selected) {
      return {
        color: THEME.highlight,
        emissive: THEME.highlight,
        emissiveIntensity: 0.5,
        roughness: 0.1,
        metalness: 0.2,
      };
    }
    return color === 'w'
      ? { color: THEME.whitePiece, roughness: 0.1, metalness: 0.2 }
      : { color: THEME.blackPiece, roughness: 0.3, metalness: 0.5 };
  }, [color, selected]);

  const offsetPosition: [number, number, number] = useMemo(
    () => [position[0], position[1] + 0.1, position[2]],
    [position]
  );

  const geometry = useMemo(() => {
    const scale = 0.6;

    switch (type) {
      case 'p':
        return (
          <group scale={scale}>
            <PieceBase materialProps={materialProps} />
            <mesh position={[0, 0.6, 0]} castShadow>
              <coneGeometry args={[0.4, 0.8, 16]} />
              <meshStandardMaterial {...materialProps} />
            </mesh>
            <mesh position={[0, 1.1, 0]} castShadow>
              <sphereGeometry args={[0.3, 16, 16]} />
              <meshStandardMaterial {...materialProps} />
            </mesh>
          </group>
        );
      case 'r':
        return (
          <group scale={scale}>
            <PieceBase materialProps={materialProps} />
            <mesh position={[0, 0.8, 0]} castShadow>
              <cylinderGeometry args={[0.5, 0.5, 1.2, 16]} />
              <meshStandardMaterial {...materialProps} />
            </mesh>
            <mesh position={[0, 1.5, 0]} castShadow>
              <boxGeometry args={[0.9, 0.3, 0.9]} />
              <meshStandardMaterial {...materialProps} />
            </mesh>
          </group>
        );
      case 'n':
        return (
          <group scale={scale}>
            <PieceBase materialProps={materialProps} />
            <mesh position={[0, 0.6, 0]} castShadow>
              <cylinderGeometry args={[0.4, 0.5, 0.8, 16]} />
              <meshStandardMaterial {...materialProps} />
            </mesh>
            <mesh position={[0, 1.2, 0.1]} rotation={[-0.2, 0, 0]} castShadow>
              <boxGeometry args={[0.4, 0.8, 0.6]} />
              <meshStandardMaterial {...materialProps} />
            </mesh>
            <mesh position={[0, 1.4, 0.4]} rotation={[-0.2, 0, 0]} castShadow>
              <boxGeometry args={[0.3, 0.3, 0.4]} />
              <meshStandardMaterial {...materialProps} />
            </mesh>
          </group>
        );
      case 'b':
        return (
          <group scale={scale}>
            <PieceBase materialProps={materialProps} />
            <mesh position={[0, 0.9, 0]} castShadow>
              <cylinderGeometry args={[0.3, 0.4, 1.4, 16]} />
              <meshStandardMaterial {...materialProps} />
            </mesh>
            <mesh position={[0, 1.7, 0]} castShadow>
              <capsuleGeometry args={[0.3, 0.6, 4, 8]} />
              <meshStandardMaterial {...materialProps} />
            </mesh>
          </group>
        );
      case 'q':
        return (
          <group scale={scale}>
            <PieceBase materialProps={materialProps} />
            <mesh position={[0, 1.0, 0]} castShadow>
              <cylinderGeometry args={[0.3, 0.5, 1.8, 16]} />
              <meshStandardMaterial {...materialProps} />
            </mesh>
            <mesh position={[0, 2.0, 0]} castShadow>
              <dodecahedronGeometry args={[0.45]} />
              <meshStandardMaterial {...materialProps} />
            </mesh>
            <mesh position={[0, 2.4, 0]} castShadow>
              <sphereGeometry args={[0.15]} />
              <meshStandardMaterial {...materialProps} />
            </mesh>
          </group>
        );
      case 'k':
        return (
          <group scale={scale}>
            <PieceBase materialProps={materialProps} />
            <mesh position={[0, 1.1, 0]} castShadow>
              <cylinderGeometry args={[0.4, 0.55, 2.0, 16]} />
              <meshStandardMaterial {...materialProps} />
            </mesh>
            <mesh position={[0, 2.2, 0]} castShadow>
              <boxGeometry args={[0.6, 0.6, 0.6]} />
              <meshStandardMaterial {...materialProps} />
            </mesh>
            <mesh position={[0, 2.6, 0]} castShadow>
              <boxGeometry args={[0.15, 0.5, 0.15]} />
              <meshStandardMaterial {...materialProps} />
            </mesh>
            <mesh position={[0, 2.6, 0]} castShadow>
              <boxGeometry args={[0.4, 0.15, 0.15]} />
              <meshStandardMaterial {...materialProps} />
            </mesh>
          </group>
        );
      default:
        return null;
    }
  }, [type, materialProps]);

  return (
    <group position={offsetPosition} onClick={onClick}>
      {geometry}
    </group>
  );
};
