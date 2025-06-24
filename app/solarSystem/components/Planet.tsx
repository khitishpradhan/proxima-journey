import React from 'react';
import * as THREE from 'three';
import { JourneyParams } from '@/components/ShipSim/ShipSimStore';
import { PLANET_VISUAL_SCALE } from '@/solarSystem/solarConfig';
import { useCamTarget } from '@/solarSystem/cameraStore';

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
  const setTarget = useCamTarget((s) => s.setTarget);

  const handleClick = (e: any) => {
    e.stopPropagation();
    if (meshRef && meshRef.current) {
      const world = new THREE.Vector3();
      meshRef.current.getWorldPosition(world);
      setTarget(world);
    } else {
      // fallback using event object
      const world = e.object.getWorldPosition(new THREE.Vector3());
      setTarget(world);
    }
  };

  return (
    <mesh ref={meshRef} position={[distance, 0, 0]} onPointerDown={handleClick}>
      <sphereGeometry args={[visRadius, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
} 