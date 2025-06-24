import React from 'react'
import * as THREE from 'three';

interface SaturnProps {
    saturnRef: React.RefObject<THREE.Mesh>
}

export default function Saturn({ saturnRef }: SaturnProps) {
  return (
    <mesh ref={saturnRef} position={[60, 0, 0]}>
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshStandardMaterial color={'yellow'} />
    </mesh>
  )
}