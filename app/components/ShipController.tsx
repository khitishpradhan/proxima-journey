import { useFrame} from '@react-three/fiber';
import * as THREE from 'three';
import React from 'react';

type Props = {
    shipRef: React.RefObject<THREE.Mesh>
    isJourneyActive?: boolean
    earthRef?: React.RefObject<THREE.Mesh>
}
  
export default function ShipController({ shipRef, isJourneyActive = false, earthRef }: Props) {
  useFrame((_, delta) => {
    if (shipRef.current && isJourneyActive) {
      shipRef.current.position.z -= 1 * delta;
    }
  });

  // On mount, place ship slightly offset from Earth if ref provided
  React.useEffect(() => {
    if (earthRef?.current && shipRef.current) {
      const p = earthRef.current.position;
      shipRef.current.position.set(p.x + 0.8, p.y, p.z);
    }
  }, [earthRef]);

  return (
    <mesh ref={shipRef}>
      <sphereGeometry args={[0.1, 32, 32]} />
      <meshBasicMaterial color="cyan" />
    </mesh>
  );
}
  