"use client";
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import ShipController from './ShipController';
import CameraController from './CameraController';
import { useShipSimStore } from './ShipSim/ShipSimStore';

interface Props {
  earthRef: React.RefObject<THREE.Mesh>;
}

const SIM_DURATION_SECONDS = 30; // real-time duration for any journey

export default function ShipSim({ earthRef }: Props) {
  const shipRef = useRef<THREE.Mesh>(null!);
  const [simulatedYear, setSimulatedYear] = useState(0);
  const [isJourneyActive, setIsJourneyActive] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timeCompression, setTimeCompression] = useState(0);
  const hudStore = useShipSimStore();
  const { toggleFreeLook, isFreeLook } = hudStore;

  const baseYear = new Date().getFullYear();

  const handleJourneyStart = ({ destination, speed, travelTime }: any) => {
    // Ensure free look off when journey starts
    if (isFreeLook) toggleFreeLook();

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

  // Sync local state to global HUD store on each change
  useEffect(() => {
    hudStore.setHUD({
      simulatedYear,
      isJourneyActive,
      elapsedTime,
      timeCompression,
      yearInTheShip: baseYear + simulatedYear,
      onStartJourney: handleJourneyStart,
      isFreeLook,
    });
  }, [simulatedYear, isJourneyActive, elapsedTime, timeCompression, isFreeLook]);

  return (
    <>
      {/* Ship & camera logic */}
      <ShipController shipRef={shipRef} isJourneyActive={isJourneyActive} earthRef={earthRef} />
      {/* follow camera active when not freeLook */}
      {!isFreeLook && <CameraController shipRef={shipRef} />}
    </>
  );
} 