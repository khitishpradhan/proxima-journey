import React from 'react'
import * as THREE from 'three';

interface MercuryProps {
    mercuryRef: React.RefObject<THREE.Mesh>
}

export default function Mercury({ mercuryRef }: MercuryProps) {
    return (
      <mesh ref={mercuryRef} position={[10, 0, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color={'gray'} />
      </mesh>
    )
}
