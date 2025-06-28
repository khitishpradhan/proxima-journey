import React, { useEffect } from 'react'
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { PLANET_VISUAL_SCALE, solarSystem } from '../solarConfig';

interface SunProps {
    sunRef: React.RefObject<THREE.Mesh>,
    setTarget: (target: THREE.Vector3) => void
}

export default function Sun({ sunRef, setTarget }: SunProps) {
  const { camera } = useThree();
  const [showMarker, setShowMarker] = React.useState(true);

  const visRadius = solarSystem.sun.radius * PLANET_VISUAL_SCALE;

  useFrame(() => {
    const sunPos = new THREE.Vector3(0, 0, 0);
    const dist = camera.position.distanceTo(sunPos);
    // Hide marker when extremely close (< 10×) or too far (> 1000×) sun radius
    setShowMarker(dist > visRadius * 10 && dist < visRadius * 1000);
  });

  // Rotate sun slowly
  useEffect(() => {
    if (!sunRef.current) return;
    const sun = sunRef.current;
    let frame: number;
    const rot = () => {
      sun.rotation.y += 0.001;
      frame = requestAnimationFrame(rot);
    };
    frame = requestAnimationFrame(rot);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <mesh ref={sunRef} position={[0, 0, 0]}>
      <sphereGeometry args={[visRadius, 32, 32]} />
      <meshBasicMaterial color={solarSystem.sun.color ?? 'orange'} />

      {showMarker && (
        <Html
          center
          position={[0, 0, 0]}
          occlude={false}
          transform={false}
          style={{ pointerEvents: 'auto', cursor: 'pointer' }}
        >
          <div
            onClick={() => setTarget(new THREE.Vector3(0, 0, 0))}
            style={{ position: 'relative', width: 20, height: 20 }}
          >
            <span
              style={{
                position: 'absolute',
                left: 26,
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: 18,
                color: '#ffffff',
                textShadow: '0 0 2px #000',
                userSelect: 'none',
              }}
            >
              {solarSystem.sun.name}
            </span>
          </div>
        </Html>
      )}
    </mesh>
  )
}
