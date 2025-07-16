import { create } from 'zustand';
import * as THREE from 'three';

interface CamState {
  target: THREE.Vector3;
  setTarget: (v: THREE.Vector3) => void;
}

export const useCamTarget = create<CamState>((set) => ({
  target: new THREE.Vector3(0, 0, 0),
  setTarget: (v) => set({ target: v.clone() }),
})); 