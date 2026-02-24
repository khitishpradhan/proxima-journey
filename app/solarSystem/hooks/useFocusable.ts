import { useCallback, useRef } from 'react';
import { useCamTarget } from '../cameraStore';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';

interface UseFocusableOptions {
  position: THREE.Vector3 | [number, number, number];
  radius?: number;
  type?: string;
  name?: string;
  id?: string;
  smooth?: boolean;
}

export function useFocusable(options: UseFocusableOptions) {
  const { focusObject } = useCamTarget();
  const { camera } = useThree();
  const lastTriggerRef = useRef<number>(0);
  
  const handleFocus = useCallback(() => {
    const now = Date.now();
    if (now - lastTriggerRef.current < 300) return; // debounce
    lastTriggerRef.current = now;

    const target = {
      position: Array.isArray(options.position) 
        ? new THREE.Vector3(...options.position)
        : options.position.clone(),
      radius: options.radius,
      type: options.type || 'object',
      name: options.name,
      id: options.id
    };
    
    focusObject(target, options.smooth !== false, camera);
  }, [options, focusObject, camera]);
  
  return { handleFocus };
}

// Convenience hook for common object types
export function usePlanetFocusable(
  position: THREE.Vector3 | [number, number, number],
  radius: number,
  name: string,
  id?: string
) {
  return useFocusable({
    position,
    radius,
    type: 'planet',
    name,
    id,
    smooth: true
  });
}

export function useSunFocusable(
  position: THREE.Vector3 | [number, number, number],
  radius: number,
  name: string = 'Sun',
  id: string = 'sun'
) {
  return useFocusable({
    position,
    radius,
    type: 'sun',
    name,
    id,
    smooth: true
  });
}

export function useShipFocusable(
  position: THREE.Vector3 | [number, number, number],
  radius: number,
  name: string,
  id?: string
) {
  return useFocusable({
    position,
    radius,
    type: 'ship',
    name,
    id,
    smooth: true
  });
}

