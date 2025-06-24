import React from 'react';
import * as THREE from 'three';
import { JourneyParams } from '@/components/ShipSim/ShipSimStore';
import { PLANET_VISUAL_SCALE } from '@/solarSystem/solarConfig';
import { useCamTarget } from '@/solarSystem/cameraStore';
import { Html, Billboard } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber';

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
  const { camera } = useThree();
  const [showLabel, setShowLabel] = React.useState(true);

  const handleClick = (e: any) => {
    e.stopPropagation();
    // planet sits at y=0, z=0
    setTarget(new THREE.Vector3(distance, 0, 0));
  };

  // hide label when camera very close to planet
  useFrame(() => {
    const planetPos = new THREE.Vector3(distance,0,0);
    const dist = camera.position.distanceTo(planetPos);
    setShowLabel(dist > visRadius * 8);
  });

  return (
    <mesh ref={meshRef} position={[distance, 0, 0]}>
      <sphereGeometry args={[visRadius, 32, 32]} />
      <meshStandardMaterial color={color} />

      {/* Billboard selector */}
      <Billboard follow>
        <mesh
          scale={[visRadius * 4, visRadius * 4, 1]}
          onPointerDown={handleClick}
        >
          <ringGeometry args={[0.45, 0.5, 64]} />
          <meshBasicMaterial color={color} transparent opacity={0.7} />
        </mesh>
        {showLabel && (
          <Html
            position={[visRadius * 2.5, 0, 0]}
            transform
            occlude={false}
            distanceFactor={150}
            style={{ pointerEvents: 'auto', cursor: 'pointer' }}
          >
            <span onClick={handleClick} style={{ fontSize: 18, color: 'white', textShadow: '0 0 2px #000' }}>
              {data.name}
            </span>
          </Html>
        )}
      </Billboard>
    </mesh>
  );
} 