import React from 'react'
import * as THREE from 'three';

interface JupiterProps {
    jupiterRef: React.RefObject<THREE.Mesh>
}

export default function Jupiter({ jupiterRef }: JupiterProps) {
  return (
    <mesh ref={jupiterRef} position={[50, 0, 0]}>
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshStandardMaterial color={'orange'} />
    </mesh>
  )
}