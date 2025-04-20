import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import * as THREE from 'three';

export default function LightsSetup() {
  const { scene } = useThree();

  useEffect(() => {
    const ambient = new THREE.AmbientLight(0xffffff, 1);
    const dir = new THREE.DirectionalLight(0xffffff, 0.5);
    dir.position.set(5, 5, 5);

    scene.add(ambient, dir);

    return () => {
      scene.remove(ambient, dir);
    };
  }, [scene]);

  return null;
}
