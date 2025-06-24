import React from 'react'
import * as THREE from 'three';

interface VenusProps {
  venusRef: React.RefObject<THREE.Mesh>
}

export default function Venus({ venusRef }: VenusProps) {
  return (
    <mesh ref={venusRef} position={[20, 0, 0]}>
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshStandardMaterial color={'yellow'} />
    </mesh>
  )
}
