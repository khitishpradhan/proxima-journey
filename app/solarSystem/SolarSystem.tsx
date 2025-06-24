import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { solarSystem, PLANET_VISUAL_SCALE } from './solarConfig';
import Planet from './components/Planet';
import OrbitPath from './components/OrbitPath';
import React from 'react';
import { useCamTarget } from './cameraStore';
import { Html, Billboard } from '@react-three/drei';

interface Props {
  earthRef: React.RefObject<THREE.Mesh>;
}

export default function SolarSystem({ earthRef }: Props) {
  const sunRef = useRef<THREE.Mesh>(null!);
  const setTarget = useCamTarget((s)=>s.setTarget);

  // Rotate sun slowly
  // useEffect(() => {
  //   if (!sunRef.current) return;
  //   const sun = sunRef.current;
  //   let frame: number;
  //   const rot = () => {
  //     sun.rotation.y += 0.001;
  //     frame = requestAnimationFrame(rot);
  //   };
  //   frame = requestAnimationFrame(rot);
  //   return () => cancelAnimationFrame(frame);
  // }, []);

  return (
    <group>
      {/* Sun */}
      <mesh ref={sunRef} position={[0, 0, 0]}>
        <sphereGeometry args={[solarSystem.sun.radius * PLANET_VISUAL_SCALE, 32, 32]} />
        <meshBasicMaterial color={solarSystem.sun.color ?? 'orange'} />

        <Billboard follow>
          <Html center distanceFactor={150} style={{ pointerEvents: 'auto', cursor:'pointer' }}>
            <span onClick={()=>setTarget(new THREE.Vector3(0,0,0))} style={{ fontSize: 16, color: 'white', textShadow: '0 0 2px #000', cursor:'pointer' }}>Sun</span>
          </Html>
        </Billboard>
      </mesh>

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