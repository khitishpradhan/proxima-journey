import React from 'react';
import * as THREE from 'three';
import { JourneyParams } from '@/store/ShipSim/ShipSimStore';
import { PLANET_VISUAL_SCALE } from '@/solarSystem/solarConfig';

export interface PlanetData {
  name: string;
  radius: number;
  distance: number;
  color?: string;
  offset?: [number, number];
}

interface PlanetProps {
  data: PlanetData;
  meshRef?: React.RefObject<THREE.Mesh>;
}

export default function Planet({ data, meshRef }: PlanetProps) {
  const { radius, distance, color = 'white' } = data;
  const visRadius = Math.max(radius * PLANET_VISUAL_SCALE, 0.3);

  return (
    <mesh ref={meshRef} position={[distance, 0, 0]}>
      <sphereGeometry args={[visRadius, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
} 