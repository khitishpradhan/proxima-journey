import React from 'react'
import * as THREE from 'three';

interface UranusProps {
    uranusRef: React.RefObject<THREE.Mesh>
}

export default function Uranus({ uranusRef }: UranusProps) {
  return (
    <mesh ref={uranusRef} position={[70, 0, 0]}>
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshStandardMaterial color={'green'} />
    </mesh>
  )
}