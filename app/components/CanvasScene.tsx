"use client";

import { Canvas } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import { EffectComposer, SelectiveBloom } from '@react-three/postprocessing';
import SceneSetup from './SceneSetup';
import LightsSetup from './LightsSetup';
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
  const earthRef = useRef<THREE.Mesh>(null!);
  const sunLightRef = useRef<THREE.PointLight>(null!);
  const sunMeshRef = useRef<THREE.Mesh>(null!)
  const isFreeLook = useShipSimStore((s) => s.isFreeLook);
  const [bloomSelection, setBloomSelection] = useState<THREE.Object3D[]>([])

  return (
    <>
      <FocusUI />

      <Canvas camera={{ position: [0, 200, 600], near: 0.1, far: 60000 }} gl={{ antialias: true }}>
        <Perf position="top-left" />

        {/* Static scene setup */}
        <SceneSetup />

        {/* Sun light */}
        <LightsSetup ref={sunLightRef} />

        {/* Starfield */}
        <StarBackground />

        {/* Solar system */}
        <SolarSystem earthRef={earthRef} sunRef={sunMeshRef} setBloomSelection={setBloomSelection}/>

        {/* Ship */}
        {simulationMode && <ShipSim earthRef={earthRef} />}

        {/* Camera controls */}
        <SolarOrbitControls enabled={!simulationMode || isFreeLook} />


        {/* Postprocessing */}
        <EffectComposer multisampling={0}>
          <SelectiveBloom
            selection={bloomSelection}
            lights={[sunLightRef]}
            intensity={1.7}
            luminanceThreshold={0.65}
            luminanceSmoothing={0.85}
            radius={0.7}
          />
        </EffectComposer>
      </Canvas>
    </>
  );
}