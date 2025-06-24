import React from 'react'
import * as THREE from 'three';

interface MarsProps {
  marsRef: React.RefObject<THREE.Mesh>
}

export default function Mars({ marsRef }: MarsProps) {
  return (
    <mesh ref={marsRef} position={[40, 0, 0]}>
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshStandardMaterial color={'red'} />
    </mesh>
  )
}
