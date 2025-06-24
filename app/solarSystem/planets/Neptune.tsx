import React from 'react'
import * as THREE from 'three';

interface NeptuneProps {
    neptuneRef: React.RefObject<THREE.Mesh>
}

export default function Neptune({ neptuneRef }: NeptuneProps) {
  return (
    <mesh ref={neptuneRef} position={[80, 0, 0]}>
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshStandardMaterial color={'blue'} />
    </mesh>
  )
}