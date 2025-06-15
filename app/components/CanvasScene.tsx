"use client";
import { Canvas } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import SceneSetup from './SceneSetup';
import LightSetup from './LightSetup';
import StarBackground from './StarBackground';
import SolarSystem from './SolarSystem';
import ShipSim from './ShipSim';

interface Props {
  simulationMode: boolean;
}

export default function CanvasScene({ simulationMode }: Props) {
  const earthRef = useRef<THREE.Mesh>(null!);

  return (
    <Canvas>
      {/* static scene helpers */}
      <SceneSetup />
      <LightSetup />
      <StarBackground />

      {/* Solar system is always present */}
      <SolarSystem earthRef={earthRef} />

      {/* Ship simulation overlay */}
      {simulationMode && <ShipSim earthRef={earthRef} />}
    </Canvas>
  );
} 