import React, { useEffect } from 'react'
import * as THREE from 'three';
import { Html, Billboard } from '@react-three/drei';
import { PLANET_VISUAL_SCALE, solarSystem } from '../solarConfig';

interface SunProps {
    sunRef: React.RefObject<THREE.Mesh>,
    setTarget: (target: THREE.Vector3) => void
}

export default function Sun({ sunRef, setTarget }: SunProps) {

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
    <sphereGeometry args={[solarSystem.sun.radius * PLANET_VISUAL_SCALE, 32, 32]} />
    <meshBasicMaterial color={solarSystem.sun.color ?? 'orange'} />

    <Billboard follow>
      <Html center distanceFactor={150} style={{ pointerEvents: 'auto', cursor:'pointer' }}>
        <span onClick={()=>setTarget(new THREE.Vector3(0,0,0))} style={{ fontSize: 16, color: 'white', textShadow: '0 0 2px #000', cursor:'pointer' }}>{solarSystem.sun.name}</span>
      </Html>
    </Billboard>
  </mesh>
  )
}
