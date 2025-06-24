import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import * as THREE from 'three';

export default function SceneSetup() {
  const { scene } = useThree();
  useEffect(() => {
    // background
    scene.background = new THREE.Color('black');
    // fog
    // scene.fog = new THREE.Fog('black', 5000, 60000);
  }, [scene]);
  return null;
}
