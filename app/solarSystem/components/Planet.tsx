import React from 'react';
import * as THREE from 'three';
import { PLANET_VISUAL_SCALE } from '@/solarSystem/solarConfig';
import { useCamTarget } from '@/solarSystem/cameraStore';
import { Html } from '@react-three/drei';
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
  const [showMarker, setShowMarker] = React.useState(true);

  const handleClick = (e: any) => {
    e.stopPropagation();
    // planet sits at y=0, z=0
    setTarget(new THREE.Vector3(distance, 0, 0));
  };

  // show/hide marker based on distance from the Sun
  useFrame(() => {
    // Distance from camera to the Sun (origin)
    const distFromSun = camera.position.length();

    // ------- visibility rules --------
    // 1.  Too close?  hide when within lowerFactor × planetOrbit
    // 2.  Too far?    hide when beyond upperFactor × planetOrbit
    // These factors create a band so inner planets vanish first as we zoom out.
    const lowerFactor = 0.2;
    const upperFactor = 4;

    const show =
      distFromSun > distance * lowerFactor &&
      distFromSun < distance * upperFactor;

    setShowMarker(show);
  });

  return (
    <mesh ref={meshRef} position={[distance, 0, 0]}>
      <sphereGeometry args={[visRadius, 32, 32]} />
      <meshStandardMaterial color={color} />

      {/* Marker & label rendered as fixed-size HTML */}
      {showMarker && (
        <Html
          center
          position={[0, 0, 0]}
          occlude={false}
          transform={false}
          style={{ pointerEvents: 'auto', cursor: 'pointer' }}
        >
          <div
            onClick={handleClick}
            style={{ position: 'relative', width: 18, height: 18 }}
          >
            <div
              style={{
                width: 18,
                height: 18,
                border: `2px solid ${color}`,
                borderRadius: '50%',
              }}
            />
            <span
              style={{
                position: 'absolute',
                left: 24,
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: 16,
                color: '#ffffff',
                textShadow: '0 0 2px #000',
                userSelect: 'none',
              }}
            >
              {data.name}
            </span>
          </div>
        </Html>
      )}
    </mesh>
  );
} 