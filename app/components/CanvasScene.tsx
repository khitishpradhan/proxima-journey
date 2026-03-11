"use client";
import { Canvas } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer, SelectiveBloom } from '@react-three/postprocessing';
import SceneSetup from './SceneSetup';
import LightSetup from './LightSetup';
import StarBackground from './StarBackground';
import SolarSystem from '../solarSystem/SolarSystem';
import ShipSim from './ShipSim';
import SolarOrbitControls from '../solarSystem/SolarOrbitControls';
import FocusUI from '../solarSystem/components/FocusUI';
import { useShipSimStore } from './ShipSim/ShipSimStore';
import { Perf } from 'r3f-perf';

interface Props {
  simulationMode: boolean;
}

export default function CanvasScene({ simulationMode }: Props) {
  const sunRef = useRef<THREE.Mesh>(null!);
  const earthRef = useRef<THREE.Mesh>(null!);
  const isFreeLook = useShipSimStore((s) => s.isFreeLook);

  return (
    <>
      {/* Focus UI overlay */}
      <FocusUI />
      
      <Canvas camera={{ position: [0, 200, 600], near: 0.1, far: 60000 }}>
        <Perf position="top-left" />
        {/* static scene helpers */}
        <SceneSetup />
        <LightSetup />
        <StarBackground />

        {/* Solar system is always present */}
        <SolarSystem earthRef={earthRef} sunRef={sunRef}/>

        {/* Ship simulation overlay */}
        {simulationMode && <ShipSim earthRef={earthRef} />}

        {/* Scene orbit controls only when simulation inactive */}
        <SolarOrbitControls enabled={!simulationMode || isFreeLook} />

        {/* Postprocessing glow/bloom for bright emissive objects like the sun */}
        <EffectComposer multisampling={0}>
        {sunRef.current && (
          <SelectiveBloom
            selection={[sunRef.current]}
            intensity={1.6}
            luminanceThreshold={0}
            luminanceSmoothing={0.85}
            radius={0.7}
          />
        )}
        </EffectComposer>
      </Canvas>
    </>
  );
} 