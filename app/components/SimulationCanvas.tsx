'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import ShipController from './ShipController';
import CameraController from './CameraController';

// SimulationCanvas component where everything is wrapped inside the Canvas
export default function SimulationCanvas() {
  const shipRef = useRef<THREE.Mesh>(null!); // Shared ref so that we have the latest ref for both the Ship and Camera.

  return (
    <Canvas>
      <color attach="background" args={['black']} />
      <ambientLight />
      <Stars radius={100} depth={50} count={5000} factor={4} fade />
      <ShipController shipRef={shipRef}/>
      <CameraController shipRef={shipRef}/>
      {/* <OrbitControls enableZoom={true} /> */}
    </Canvas>
  );
}
