'use client';
import { useEffect } from 'react';
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
import { SimulationControlsParams } from './SimulationControls';

//CONSTANTS
// This is the actual time the simulation will take reagardless of the travel time
const SIM_DURATION_SECONDS = 30;

// SimulationCanvas component where everything is wrapped inside the Canvas
export default function SimulationCanvas() {
  const shipRef = useRef<THREE.Mesh>(null!); // Shared ref so that we have the latest ref for both the Ship and Camera.
  const animationFrameRef = useRef<number | null>(null); // For canceling animation

  const [isManualControl, setIsManualControl] = useState(false);
  const [simulatedYear, setSimulatedYear] = useState(0);
  const [isJourneyActive, setIsJourneyActive] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timeCompression, setTimeCompression] = useState(0);

  const baseYear = new Date().getFullYear();



  const toggleControlMode = () => {
    setIsManualControl(prev => !prev);
  };

  const handleJourneyStart = ({ destination, speed, travelTime }: SimulationControlsParams) => {
    console.log('Starting journey to', destination, 'at', speed, '% of light');
    console.log('It\'s going to take', travelTime, 'years to reach our destination');

    // Setting Camera Control to Auto
    if (isManualControl) setIsManualControl(false);

    // Simulation logic
    const startTime = performance.now();
    const endTime = startTime + SIM_DURATION_SECONDS * 1000;
    // Calulating for X here (1s = Xyrs), X(years/ms) = travelTime/simDurationInMs 
    const yearsPerMs = travelTime / (SIM_DURATION_SECONDS * 1000);

    // Need to change this to be more accurate or completely remove it
    const compressionFactor = Math.floor(yearsPerMs * 1000); // years per second
    setTimeCompression(compressionFactor);
    console.log(`travelTime: ${travelTime}, yearsPerMs: ${yearsPerMs}, compressionFactor: ${compressionFactor}`);

  
    setIsJourneyActive(true);
    setElapsedTime(0); // Reset Elapsed/Animation time
    setSimulatedYear(0); // Reset year at start
  
    const animate = (now: number) => {
      if (now >= endTime) {
        setSimulatedYear(travelTime);
        setElapsedTime(SIM_DURATION_SECONDS);
        setIsJourneyActive(false);
        animationFrameRef.current = null;
        return;
      }
  
      const elapsed = now - startTime;
      const currentYear = parseFloat((elapsed * yearsPerMs).toFixed(2));
      setSimulatedYear(currentYear);
      setElapsedTime(Math.floor(elapsed / 1000));
  
      animationFrameRef.current = requestAnimationFrame(animate);
    };
  
    animationFrameRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (

    <>
      {/* Toggle Button */}
      <button
        className='absolute top-5 right-5 z-10 p-4 bg-gray-900/85 hover:bg-gray-700 rounded cursor-pointer'
        onClick={toggleControlMode}
      >
        {isManualControl ? 'Auto Camera' : 'Manual Camera'}
      </button>


      <SimulationControls
        onStartJourney={handleJourneyStart}
        simulatedYear={simulatedYear}
        isJourneyActive={isJourneyActive}
        elaspedTime={elapsedTime}
        timeCompression={timeCompression}
        yearInTheShip={baseYear + simulatedYear}
      />
      <Canvas>
        {/* Scene and Lighting Setup */}
        <SceneSetup />
        <LightsSetup />

        {/* Rendering Stars here */}
        <Stars radius={50} depth={20} count={1200} factor={1} fade />
        <Stars radius={100} depth={50} count={4000} factor={3} fade />
        <Stars radius={200} depth={100} count={800} factor={5} fade />

        {/* Moving Parts, Ship & Camera Controls  */}
        <ShipController shipRef={shipRef} isJourneyActive={isJourneyActive}/>
        { !isManualControl && <CameraController shipRef={shipRef}/> }
        <ManualControls shipRef={shipRef} isManualControl={isManualControl} />
      </Canvas>
    </>
  );
}
