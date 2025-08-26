"use client";
import { useEffect, useRef, useMemo } from 'react';
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

  // Calculate dynamic minDistance based on actual target object size
  const minDistance = useMemo(() => {
    if (!target.radius) {
      // Fallback if no radius data
      return 10;
    }
    
    // Use actual object radius with appropriate multiplier
    const baseRadius = target.radius;
    
    switch (target.type) {
      case 'sun':
        return baseRadius * 8; // 8x radius for comfortable viewing
      case 'planet':
        return baseRadius * 4; // 4x radius to prevent zooming into surface
      case 'ship':
        return baseRadius * 2; // 2x radius for ships
      default:
        return baseRadius * 1; // default 1x radius
    }
  }, [target]);

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.target.copy(target.position);
      controlsRef.current.update();
    }
  }, [target.position]);

  return (
    <OrbitControls
      ref={controlsRef}
      enabled={enabled}
      enableZoom={true}
      maxDistance={20000}
      minDistance={minDistance}
    />
  );
} 