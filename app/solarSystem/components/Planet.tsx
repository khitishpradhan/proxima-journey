import React from 'react';
import * as THREE from 'three';
import { JourneyParams } from '@/store/ShipSim/ShipSimStore';

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
  const { radius, distance, color = 'white', offset = [0, 0] } = data;

  return (
    <mesh ref={meshRef} position={[distance, offset[0], offset[1]]}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
} 