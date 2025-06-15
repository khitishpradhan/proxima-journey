"use client";
import { useRef, useState } from 'react';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import ShipController from './ShipController';
import CameraController from './CameraController';
import ManualControls from './ManualControls';
import SimulationUI from './SimulationUI';

interface Props {
  earthRef: React.RefObject<THREE.Mesh>;
}

const SIM_DURATION_SECONDS = 30; // real-time duration for any journey

export default function ShipSim({ earthRef }: Props) {
  const shipRef = useRef<THREE.Mesh>(null!);
  const [isManualControl, setIsManualControl] = useState(false);
  const [simulatedYear, setSimulatedYear] = useState(0);
  const [isJourneyActive, setIsJourneyActive] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timeCompression, setTimeCompression] = useState(0);

  const baseYear = new Date().getFullYear();

  const handleJourneyStart = ({ destination, speed, travelTime }: any) => {
    // Reset camera to auto for the cinematic shot
    if (isManualControl) setIsManualControl(false);

    const startTime = performance.now();
    const endTime = startTime + SIM_DURATION_SECONDS * 1000;
    const yearsPerMs = travelTime / (SIM_DURATION_SECONDS * 1000);
    setTimeCompression(Math.floor(yearsPerMs * 1000));

    setIsJourneyActive(true);
    setElapsedTime(0);
    setSimulatedYear(0);

    const animate = (now: number) => {
      if (now >= endTime) {
        setSimulatedYear(travelTime);
        setElapsedTime(SIM_DURATION_SECONDS);
        setIsJourneyActive(false);
        return;
      }

      const elapsed = now - startTime;
      setSimulatedYear(parseFloat((elapsed * yearsPerMs).toFixed(2)));
      setElapsedTime(Math.floor(elapsed / 1000));

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  };

  return (
    <>
      {/* Screen-space HUD fixed to viewport */}
      <Html fullscreen>
        <SimulationUI
          isManualControl={isManualControl}
          onToggleManualControl={() => setIsManualControl((v) => !v)}
          simulatedYear={simulatedYear}
          isJourneyActive={isJourneyActive}
          elapsedTime={elapsedTime}
          timeCompression={timeCompression}
          yearInTheShip={baseYear + simulatedYear}
          onStartJourney={handleJourneyStart}
        />
      </Html>

      {/* Ship & camera logic */}
      <ShipController shipRef={shipRef} isJourneyActive={isJourneyActive} earthRef={earthRef} />
      {!isManualControl && <CameraController shipRef={shipRef} />}      
      <ManualControls shipRef={shipRef} isManualControl={isManualControl} />
    </>
  );
} 