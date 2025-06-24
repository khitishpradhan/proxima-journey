import React from 'react'
import * as THREE from 'three';

interface SunProps {
    sunRef: React.RefObject<THREE.Mesh>
}

export default function Sun({ sunRef }: SunProps) {
  return (
    <mesh ref={sunRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color={'orange'} />
    </mesh>
  )
}
