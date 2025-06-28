import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { solarSystem, PLANET_VISUAL_SCALE } from './solarConfig';
import Planet from './components/Planet';
import OrbitPath from './components/OrbitPath';
import React from 'react';
import { useCamTarget } from './cameraStore';
import Sun from './celestials/Sun';

interface Props {
  earthRef: React.RefObject<THREE.Mesh>;
}

export default function SolarSystem({ earthRef }: Props) {
  const sunRef = useRef<THREE.Mesh>(null!);
  const setTarget = useCamTarget((s)=>s.setTarget);

  return (
    <group>
      {/* Sun */}
      <Sun sunRef={sunRef} setTarget={setTarget} />

      {/* Orbits & Planets */}
      {solarSystem.planets.map((planet) => (
        <React.Fragment key={planet.name}>
          <OrbitPath radius={planet.distance} color={planet.color} />
          <Planet
            data={planet as any}
            meshRef={planet.name === 'Earth' ? earthRef : undefined}
          />
        </React.Fragment>
      ))}
    </group>
  );
} 