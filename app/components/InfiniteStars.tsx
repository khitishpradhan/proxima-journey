import { Stars } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

export default function InfiniteStars() {
  const starsGroup1 = useRef<THREE.Group>(null!);
  const starsGroup2 = useRef<THREE.Group>(null!);
  const starsGroup3 = useRef<THREE.Group>(null!);

  // Keep track of accumulated movement
  const movement = useRef({
    near: 0,
    mid: 0,
    far: 0
  });

  useFrame((_, delta) => {
    if (starsGroup1.current && starsGroup2.current && starsGroup3.current) {
      // Update accumulated movement
      movement.current.near += delta * 2;  // Fastest movement
      movement.current.mid += delta * 1;   // Medium movement
      movement.current.far += delta * 0.5; // Slowest movement

      // Create wrapping effect at different distances
      const wrapDistance = 100;
      
      // Near stars
      starsGroup1.current.position.z = (movement.current.near % wrapDistance) - wrapDistance/2;
      
      // Mid stars
      starsGroup2.current.position.z = (movement.current.mid % (wrapDistance * 2)) - wrapDistance;
      
      // Far stars
      starsGroup3.current.position.z = (movement.current.far % (wrapDistance * 4)) - wrapDistance * 2;
    }
  });

  return (
    <>
      {/* Near stars - smaller radius, more dense */}
      <group ref={starsGroup1}>
        <Stars 
          radius={30} 
          depth={20} 
          count={10} 
          factor={2} 
          fade={true}
        />
      </group>
      
      {/* Mid-range stars */}
      <group ref={starsGroup2}>
        <Stars 
          radius={60} 
          depth={50} 
          count={2000} 
          factor={4} 
          fade={true}
        />
      </group>
      
      {/* Far stars - larger radius, less dense but more dramatic */}
      <group ref={starsGroup3}>
        <Stars 
          radius={100}
          depth={100} 
          count={1000} 
          factor={6} 
          fade={true}
        />
      </group>
    </>
  );
} 