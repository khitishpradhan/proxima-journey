import { create } from 'zustand';
import * as THREE from 'three';

interface TargetObject {
  position: THREE.Vector3;
  radius?: number;  // visual radius in scene units
  type?: string;    // 'sun', 'planet', 'ship', etc.
  name?: string;    // human-readable name for UI
  id?: string;      // unique identifier
}

interface FocusTransition {
  isTransitioning: boolean;
  startPosition: THREE.Vector3;
  startTarget: THREE.Vector3;
  endPosition: THREE.Vector3;
  endTarget: THREE.Vector3;
  progress: number;
  duration: number;
  startTime: number;
}

interface CamState {
  target: TargetObject;
  focusHistory: TargetObject[];
  transition: FocusTransition;
  setTarget: (target: TargetObject) => void;
  setTargetPosition: (position: THREE.Vector3) => void; // convenience method for just position
  focusObject: (target: TargetObject, smooth?: boolean, currentCamera?: THREE.Camera) => void;
  focusPrevious: (currentCamera?: THREE.Camera) => void;
  startTransition: (startPos: THREE.Vector3, startTarget: THREE.Vector3, endPos: THREE.Vector3, endTarget: THREE.Vector3, duration?: number) => void;
  updateTransition: (progress: number) => void;
  clearTransition: () => void;
  setOrbitControlsResetFunction: (func: ((camera: THREE.Camera, targetPosition: THREE.Vector3) => void) | null) => void;
  orbitControlsResetFunction: ((camera: THREE.Camera, targetPosition: THREE.Vector3) => void) | null;
}

export const useCamTarget = create<CamState>((set, get) => ({
  target: { 
    position: new THREE.Vector3(0, 0, 0), 
    radius: 69634 * (1/1000000) * 50, 
    type: 'sun',
    name: 'Sun',
    id: 'sun'
  },
  focusHistory: [],
  transition: {
    isTransitioning: false,
    startPosition: new THREE.Vector3(),
    startTarget: new THREE.Vector3(),
    endPosition: new THREE.Vector3(),
    endTarget: new THREE.Vector3(),
    progress: 0,
    duration: 1000,
    startTime: 0
  },
  orbitControlsResetFunction: null,
  
  setTarget: (target) => set((state) => {
    const newHistory = [...state.focusHistory, state.target].slice(-10); // Keep last 10
    return { 
      target: { ...target, position: target.position.clone() },
      focusHistory: newHistory
    };
  }),
  
  setTargetPosition: (position) => set((state) => ({ 
    target: { ...state.target, position: position.clone() } 
  })),
  
  focusObject: (target, smooth = true, currentCamera?: THREE.Camera) => {
    const state = get();
    if (smooth && state.transition.isTransitioning) {
      // Don't start new transition if one is already running
      console.log('Transition already in progress, skipping new focus request');
      return;
    }
    
    // Always update the target immediately for UI consistency
    get().setTarget(target);
    
    if (smooth && currentCamera) {
      // Capture current camera state for smooth transitions
      const startPos = currentCamera.position.clone();
      const startTarget = currentCamera.getWorldDirection(new THREE.Vector3()).multiplyScalar(100).add(currentCamera.position);
      const endPos = calculateOptimalCameraPosition(target);
      const endTarget = target.position.clone();
      
      console.log('Starting smooth transition to:', target.name, 'from:', startPos, 'to:', endPos);
      get().startTransition(startPos, startTarget, endPos, endTarget, 1500);
    } else if (smooth && !currentCamera) {
      // Smooth transition requested but no camera - fall back to instant focus
      console.warn('Smooth transition requested but no camera provided, falling back to instant focus');
    }
    // If not smooth, target is already set above
  },
  
  focusPrevious: (currentCamera?: THREE.Camera) => {
    const state = get();
    if (state.focusHistory.length > 0) {
      const previous = state.focusHistory[state.focusHistory.length - 1];
      if (currentCamera) {
        get().focusObject(previous, true, currentCamera);
      } else {
        // If no camera provided, just set the target without smooth transition
        get().focusObject(previous, false);
      }
    }
  },
  
  startTransition: (startPos, startTarget, endPos, endTarget, duration = 1000) => set((state) => {
    // Prevent starting a transition if one is already in progress
    if (state.transition.isTransitioning) {
      console.log('Store: Transition already in progress, ignoring startTransition call');
      console.log('Store: Current transition state:', state.transition);
      return state;
    }
    
    console.log('Store: Starting new transition', { startPos, endPos, duration });
    return {
      ...state,
      transition: {
        isTransitioning: true,
        startPosition: startPos.clone(),
        startTarget: startTarget.clone(),
        endPosition: endPos.clone(),
        endTarget: endTarget.clone(),
        progress: 0,
        duration: duration,
        // Anchor the transition to an absolute wall-clock start time
        startTime: Date.now()
      }
    };
  }),
  
  updateTransition: (progress) => set((state) => ({
    transition: {
      ...state.transition,
      progress: Math.min(progress, 1)
    }
  })),
  
  clearTransition: () => set((state) => {
    if (!state.transition.isTransitioning) {
      console.log('Store: No transition in progress, ignoring clearTransition call');
      return state;
    }
    
    console.log('Store: Clearing transition');
    return {
      ...state,
      transition: {
        ...state.transition,
        isTransitioning: false,
        progress: 0
      }
    };
  }),

  setOrbitControlsResetFunction: (func) => set(() => ({ orbitControlsResetFunction: func })),
}));

// Helper function to calculate optimal camera position for a target
function calculateOptimalCameraPosition(target: TargetObject): THREE.Vector3 {
  if (!target.radius) {
    // Fallback: position camera at a reasonable distance
    return target.position.clone().add(new THREE.Vector3(0, 0, 100));
  }
  
  // Calculate optimal viewing distance based on object type
  let distanceMultiplier: number;
  switch (target.type) {
    case 'sun':
      distanceMultiplier = 6;
      break;
    case 'planet':
      distanceMultiplier = 3;
      break;
    case 'ship':
      distanceMultiplier = 2;
      break;
    default:
      distanceMultiplier = 2.5;
  }
  
  const optimalDistance = target.radius * distanceMultiplier;
  
  // Create a more cinematic angle - slightly elevated and offset
  // This ensures we see the "face" of the planet rather than just the top
  const angle = Math.PI / 6; // 30 degrees elevation
  const direction = new THREE.Vector3(
    Math.cos(angle), 
    Math.sin(angle), 
    Math.sin(angle) * 0.5
  ).normalize();
  
  return target.position.clone().add(direction.multiplyScalar(optimalDistance));
} 