import { OrbitControls } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

type ManualControlsProps = {
  shipRef: React.RefObject<THREE.Mesh>;
  isManualControl: boolean;
};

export default function ManualControls({ shipRef, isManualControl }: ManualControlsProps) {
  const controlsRef = useRef<any>(null);
  const { camera } = useThree();

  useEffect(() => {
    if (isManualControl && shipRef.current && controlsRef.current) {
      controlsRef.current.target.copy(shipRef.current.position);
      controlsRef.current.update();
    }
  }, [isManualControl, shipRef]);

  return (
    <OrbitControls
      ref={controlsRef}
      enabled={isManualControl}
      enableZoom={true}
    />
  );
}