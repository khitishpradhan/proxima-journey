'use client';

import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import ShipController from './ShipController';
import CameraController from './CameraController';
import ManualControls from './ManualControls';

// SimulationCanvas component where everything is wrapped inside the Canvas
export default function SimulationCanvas() {
  const shipRef = useRef<THREE.Mesh>(null!); // Shared ref so that we have the latest ref for both the Ship and Camera.
  const [isManualControl, setIsManualControl] = useState(false);

  const toggleControlMode = () => {
    setIsManualControl(prev => !prev);
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



      <Canvas>
        <color attach="background" args={['black']} />
        <ambientLight />
        <Stars radius={100} depth={50} count={5000} factor={4} fade />
        <ShipController shipRef={shipRef}/>
        { !isManualControl && <CameraController shipRef={shipRef}/> }
        <ManualControls shipRef={shipRef} isManual={isManualControl} />
      </Canvas>
    </>
  );
}
