import { create } from 'zustand';
import * as THREE from 'three';

interface TargetObject {
  position: THREE.Vector3;
  radius?: number;  // visual radius in scene units
  type?: string;    // 'sun', 'planet', 'ship', etc.
}

interface CamState {
  target: TargetObject;
  setTarget: (target: TargetObject) => void;
  setTargetPosition: (position: THREE.Vector3) => void; // convenience method for just position
}

export const useCamTarget = create<CamState>((set) => ({
  target: { position: new THREE.Vector3(0, 0, 0), radius: 69634 * (1/1000000) * 50, type: 'sun' },
  setTarget: (target) => set({ target: { ...target, position: target.position.clone() } }),
  setTargetPosition: (position) => set((state) => ({ 
    target: { ...state.target, position: position.clone() } 
  })),
})); 