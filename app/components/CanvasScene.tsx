"use client";
import { Canvas } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import SceneSetup from './SceneSetup';
import LightSetup from './LightSetup';
import StarBackground from './StarBackground';
import SolarSystem from '../solarSystem/SolarSystem';
import ShipSim from './ShipSim';
import SolarOrbitControls from '../solarSystem/SolarOrbitControls';
import { useShipSimStore } from './ShipSim/ShipSimStore';

interface Props {
  simulationMode: boolean;
}

export default function CanvasScene({ simulationMode }: Props) {
  const earthRef = useRef<THREE.Mesh>(null!);
  const isFreeLook = useShipSimStore((s) => s.isFreeLook);

  return (
    <Canvas camera={{ position: [0, 200, 600], near: 0.1, far: 60000 }}>
      {/* static scene helpers */}
      <SceneSetup />
      <LightSetup />
      <StarBackground />

      {/* Solar system is always present */}
      <SolarSystem earthRef={earthRef} />

      {/* Ship simulation overlay */}
      {simulationMode && <ShipSim earthRef={earthRef} />}

      {/* Scene orbit controls only when simulation inactive */}
      <SolarOrbitControls enabled={!simulationMode || isFreeLook} />
    </Canvas>
  );
} 