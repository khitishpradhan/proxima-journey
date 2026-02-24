"use client";
import { useEffect, useRef, useMemo, useCallback } from 'react';
import { useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useCamTarget } from './cameraStore';

interface Props {
  enabled: boolean;
  onCameraTransitionEnd?: (camera: THREE.Camera, targetPosition: THREE.Vector3) => void;
}

export default function SolarOrbitControls({ enabled, onCameraTransitionEnd }: Props) {
  const controlsRef = useRef<any>(null);
  const target = useCamTarget((s:any) => s.target);
  const transition = useCamTarget((s:any) => s.transition);
  const setOrbitControlsResetFunction = useCamTarget((s) => s.setOrbitControlsResetFunction);
  const { camera, gl } = useThree(); // Get gl for dispose/reinit

  // Calculate dynamic minDistance based on actual target object size
  const minDistance = useMemo(() => {
    if (!target.radius) {
      // Fallback if no radius data
      return 5;
    }
    
    // Use actual object radius with appropriate multiplier
    const baseRadius = target.radius;
    
    switch (target.type) {
      case 'sun':
        return baseRadius * 3; // 3x radius for comfortable viewing
      case 'planet':
        return baseRadius * 1.5; // 1.5x radius to allow closer zooming
      case 'ship':
        return baseRadius * 1.2; // 1.2x radius for ships
      default:
        return baseRadius * 1; // default 1x radius
    }
  }, [target]);

  // Expose a function to directly reset controls after a custom camera animation
  const resetFunc = useCallback((cam: THREE.Camera | null, targetPos: THREE.Vector3 | null) => {
    const controls: any = controlsRef.current;
    if (!controls) return;

    if (cam === null || targetPos === null) {
      // AGGRESSIVE: Dispose controls when camera/target are null (transition starting)
      if (controls.enabled) {
        controls.enabled = false;
        // Only dispose if it's truly an OrbitControls instance
        if (typeof controls.dispose === 'function') {
          controls.dispose(); // Fully dispose the controls
          console.log('OrbitControls: Disposed for transition');
        } else {
          console.warn('OrbitControls: Attempted dispose but dispose method not found.', controls);
        }
      }
      return;
    }

    // AGGRESSIVE: Re-initialize controls when camera/target are provided (transition ending)
    if (!controls.enabled) {
      controls.enabled = true;
      console.log('OrbitControls: Re-enabled after transition');
    }

    controls.target.set(targetPos.x, targetPos.y, targetPos.z);
    const offset = cam.position.clone().sub(controls.target);

    const spherical = controls._spherical || controls.spherical;
    if (spherical && typeof spherical.setFromVector3 === 'function') {
      spherical.setFromVector3(offset);
    }

    // Zero internal deltas to prevent any follow-up pull
    if (controls.sphericalDelta?.set) controls.sphericalDelta.set(0, 0, 0);
    if (typeof controls.zoomDelta === 'number') controls.zoomDelta = 0;
    if (controls.panOffset?.set) controls.panOffset.set(0, 0, 0);
    if (typeof controls.zoomChanged === 'boolean') controls.zoomChanged = false;

    // Temporarily disable damping to force immediate update
    const prevDamping = controls.enableDamping;
    controls.enableDamping = false;
    controls.update();
    controls.enableDamping = prevDamping;

    controls.enabled = enabled; // Restore initial enabled state (might be false if simulationMode)
  }, [enabled, camera]); // Dependencies for useCallback

  useEffect(() => {
    setOrbitControlsResetFunction(resetFunc);

    return () => {
      setOrbitControlsResetFunction(null); // Clean up on unmount
    };
  }, [setOrbitControlsResetFunction, resetFunc]); // Dependencies for useEffect

  // Keep controls' target in sync during normal operation (skip while transitioning)
  useEffect(() => {
    if (transition.isTransitioning) return;
    if (controlsRef.current) {
      controlsRef.current.target.set(target.position.x, target.position.y, target.position.z);
      controlsRef.current.update();
    }
  }, [
    target.position.x,
    target.position.y,
    target.position.z,
    transition.isTransitioning,
  ]);

  // When a transition finishes, ensure controls are properly configured
  useEffect(() => {
    const controls: any = controlsRef.current;
    if (!controls) return;

    if (!transition.isTransitioning) {
      // This block now mainly ensures controls are enabled after transition
      controls.enabled = enabled; 
    } else {
      // While transitioning, keep controls disabled to avoid competing motion
      controls.enabled = false;
    }
  }, [
    transition.isTransitioning,
    enabled,
  ]);

  const controlsEnabled = enabled && !transition.isTransitioning;

  return (
    <OrbitControls
      ref={controlsRef}
      enabled={controlsEnabled}
      enableDamping={controlsEnabled}
      zoomSpeed={2}
      enableZoom={true}
      maxDistance={20000}
      minDistance={minDistance}
    />
  );
} 