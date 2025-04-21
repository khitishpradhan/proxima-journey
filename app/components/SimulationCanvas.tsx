'use client';

import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import SceneSetup from './SceneSetup';
import LightsSetup from './LightSetup';
import ShipController from './ShipController';
import CameraController from './CameraController';
import ManualControls from './ManualControls';
import SimulationControls from './SimulationControls';

// SimulationCanvas component where everything is wrapped inside the Canvas
export default function SimulationCanvas() {
  const shipRef = useRef<THREE.Mesh>(null!); // Shared ref so that we have the latest ref for both the Ship and Camera.
  const [isManualControl, setIsManualControl] = useState(false);

  const toggleControlMode = () => {
    setIsManualControl(prev => !prev);
  };

  const handleJourneyStart = ({ destination, speed }: { destination: string, speed: number }) => {
    console.log('Starting journey to', destination, 'at', speed, '% of light');
    // simulation logic here later
  };

  return (

    <>
      {/* Toggle Button */}
      <button
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          zIndex: 10,
          padding: '0.5rem 1rem',
          backgroundColor: '#222',
          color: 'white',
          border: 'none',
          borderRadius: '0.25rem',
          cursor: 'pointer'
        }}
        onClick={toggleControlMode}
      >
        {isManualControl ? 'Auto Camera' : 'Manual Camera'}
      </button>


      <SimulationControls onStartJourney={handleJourneyStart}/>
      <Canvas>
        {/* Scene and Lighting Setup */}
        <SceneSetup />
        <LightsSetup />

        {/* Rendering Stars here */}
        <Stars radius={50} depth={20} count={1200} factor={1} fade />
        <Stars radius={100} depth={50} count={4000} factor={3} fade />
        <Stars radius={200} depth={100} count={800} factor={5} fade />

        {/* Moving Parts, Ship & Camera Controls  */}
        <ShipController shipRef={shipRef}/>
        { !isManualControl && <CameraController shipRef={shipRef}/> }
        <ManualControls shipRef={shipRef} isManualControl={isManualControl} />
      </Canvas>
    </>
  );
}
