"use client";
import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useCamTarget } from './cameraStore';

interface Props {
  enabled: boolean;
}

export default function SolarOrbitControls({ enabled }: Props) {
  const controlsRef = useRef<any>(null);
  const target = useCamTarget((s:any) => s.target);
  const { camera } = useThree();

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.target.copy(target);
      controlsRef.current.update();
    }
  }, [target]);

  return (
    <OrbitControls
      ref={controlsRef}
      enabled={enabled}
      enableZoom={true}
      maxDistance={20000}
      minDistance={1}
    />
  );
} 