import React from 'react';
import * as THREE from 'three';
import { JourneyParams } from '@/store/ShipSim/ShipSimStore';

export interface PlanetData {
  name: string;
  radius: number;
  distance: number;
  color?: string;
}

interface PlanetProps {
  data: PlanetData;
  meshRef?: React.RefObject<THREE.Mesh>;
}

export default function Planet({ data, meshRef }: PlanetProps) {
  const { radius, distance, color = 'white' } = data;

  return (
    <mesh ref={meshRef} position={[distance, 0, 0]}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
} 