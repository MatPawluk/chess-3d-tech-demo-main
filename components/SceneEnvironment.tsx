import React, { memo } from 'react';
import { Stars, Environment, ContactShadows } from '@react-three/drei';
import { LIGHTING_CONFIG, SHADOW_CONFIG, STARS_CONFIG } from '../constants';

const SceneEnvironmentComponent: React.FC = () => {
  return (
    <>
      <ambientLight intensity={LIGHTING_CONFIG.ambient.intensity} />
      <spotLight
        position={LIGHTING_CONFIG.spotlight.position}
        angle={LIGHTING_CONFIG.spotlight.angle}
        penumbra={LIGHTING_CONFIG.spotlight.penumbra}
        intensity={LIGHTING_CONFIG.spotlight.intensity}
        castShadow
        shadow-mapSize-width={SHADOW_CONFIG.mapSize}
        shadow-mapSize-height={SHADOW_CONFIG.mapSize}
        shadow-bias={SHADOW_CONFIG.bias}
      />
      <pointLight
        position={LIGHTING_CONFIG.pointLight.position}
        intensity={LIGHTING_CONFIG.pointLight.intensity}
        color={LIGHTING_CONFIG.pointLight.color}
      />
      <Stars {...STARS_CONFIG} />
      <Environment preset="city" />
      <ContactShadows position={[0, -0.1, 0]} opacity={0.5} scale={20} blur={2} far={1} />
    </>
  );
};

export const SceneEnvironment = memo(SceneEnvironmentComponent);
