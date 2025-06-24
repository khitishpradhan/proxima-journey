import React from 'react'
import * as THREE from 'three';

interface EarthProps {
    earthRef: React.RefObject<THREE.Mesh>
}

export default function Earth({ earthRef }: EarthProps) {
  return (
    <mesh ref={earthRef} position={[5, 0, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color={'skyblue'} />
    </mesh>
  )
}
