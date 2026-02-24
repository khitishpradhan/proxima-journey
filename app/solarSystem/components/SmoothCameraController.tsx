import React from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { useCamTarget } from '../cameraStore';
import * as THREE from 'three';

export default function SmoothCameraController() {
  const { camera } = useThree();
  const transition = useCamTarget((s) => s.transition);
  const clearTransition = useCamTarget((s) => s.clearTransition);
  const setTargetPosition = useCamTarget((s) => s.setTargetPosition);
  const orbitControlsResetFunction = useCamTarget((s) => s.orbitControlsResetFunction);
  const updateTransition = useCamTarget((s) => s.updateTransition);

  useFrame(() => {
    if (!transition.isTransitioning) return;

    const now = Date.now();
    const elapsed = now - transition.startTime;
    const duration = transition.duration || 1;
    const rawProgress = Math.min(Math.max(elapsed / duration, 0), 1);

    // Smooth ease-in-out
    const easedProgress =
      rawProgress < 0.5
        ? 2 * rawProgress * rawProgress
        : 1 - Math.pow(-2 * rawProgress + 2, 2) / 2;

    const newPosition = new THREE.Vector3().lerpVectors(
      transition.startPosition,
      transition.endPosition,
      easedProgress
    );

    const newTarget = new THREE.Vector3().lerpVectors(
      transition.startTarget,
      transition.endTarget,
      easedProgress
    );

    camera.position.copy(newPosition);
    camera.lookAt(newTarget);

    // Keep UI in sync
    updateTransition(rawProgress);

    if (rawProgress >= 1) {
      clearTransition();
      setTargetPosition(newTarget);
      if (orbitControlsResetFunction) {
        orbitControlsResetFunction(camera, newTarget);
      }
    }
  });

  return null;
}

