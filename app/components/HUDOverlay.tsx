"use client";
import SimulationUI from './SimulationUI';
import { useShipSimStore } from './ShipSim/ShipSimStore';

export default function HUDOverlay() {
  const {
    isFreeLook,
    toggleFreeLook,
    simulatedYear,
    isJourneyActive,
    elapsedTime,
    timeCompression,
    yearInTheShip,
    onStartJourney,
  } = useShipSimStore();

  if (!onStartJourney) return null; // not initialised yet

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      <SimulationUI
        isFreeLook={isFreeLook}
        onToggleFreeLook={toggleFreeLook}
        simulatedYear={simulatedYear}
        isJourneyActive={isJourneyActive}
        elapsedTime={elapsedTime}
        timeCompression={timeCompression}
        yearInTheShip={yearInTheShip}
        onStartJourney={onStartJourney}
      />
    </div>
  );
} 