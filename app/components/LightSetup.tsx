import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import * as THREE from 'three';

export default function LightsSetup() {
  const { scene } = useThree();

  useEffect(() => {
    // Ambient light for general scene illumination (minimal)
    const ambient = new THREE.AmbientLight(0xffffff, 0.1);
    
    // Sun point light with much higher intensity
    const sunLight = new THREE.PointLight(0xffd700, 1000, 1000000000000, 1);
    sunLight.position.set(0, 0, 0); // At Sun's position (origin)
    
    // Add shadow capabilities
    // sunLight.castShadow = true;
    // sunLight.shadow.bias = -0.001;
    // sunLight.shadow.mapSize.width = 2048;
    // sunLight.shadow.mapSize.height = 2048;

    scene.add(ambient);
    scene.add(sunLight);

    return () => {
      scene.remove(ambient);
      scene.remove(sunLight);
    };
  }, [scene]);

  return null;
}
