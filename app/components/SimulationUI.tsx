import SimulationControls from './SimulationControls';

interface Props {
  isManualControl: boolean;
  onToggleManualControl: () => void;
  simulatedYear: number;
  isJourneyActive: boolean;
  elapsedTime: number;
  timeCompression: number;
  yearInTheShip: number;
  onStartJourney: (params: any) => void;
}

export default function SimulationUI({
  isManualControl,
  onToggleManualControl,
  simulatedYear,
  isJourneyActive,
  elapsedTime,
  timeCompression,
  yearInTheShip,
  onStartJourney,
}: Props) {
  return (
    <>
      {/* Manual vs Auto Camera Button */}
      <div className="absolute top-5 right-40 z-50 pointer-events-auto">
        <button
          className="p-4 bg-gray-900/85 hover:bg-gray-700 rounded cursor-pointer"
          onClick={onToggleManualControl}
        >
          {isManualControl ? 'Auto Camera' : 'Manual Camera'}
        </button>
      </div>

      {/* Simulation Controls Panel */}
      <SimulationControls
        onStartJourney={onStartJourney}
        simulatedYear={simulatedYear}
        isJourneyActive={isJourneyActive}
        elapsedTime={elapsedTime}
        timeCompression={timeCompression}
        yearInTheShip={yearInTheShip}
      />
    </>
  );
} 