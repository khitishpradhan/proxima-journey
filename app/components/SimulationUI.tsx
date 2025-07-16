import SimulationControls from './SimulationControls';

interface Props {
  isFreeLook: boolean;
  onToggleFreeLook: () => void;
  simulatedYear: number;
  isJourneyActive: boolean;
  elapsedTime: number;
  timeCompression: number;
  yearInTheShip: number;
  onStartJourney: (params: any) => void;
}

export default function SimulationUI({
  isFreeLook,
  onToggleFreeLook,
  simulatedYear,
  isJourneyActive,
  elapsedTime,
  timeCompression,
  yearInTheShip,
  onStartJourney,
}: Props) {
  return (
    <>
      {/* Camera mode buttons */}
      <div className="absolute top-5 right-40 z-50 flex flex-col gap-2 pointer-events-auto">
        <button
          className="p-2 bg-gray-900/85 hover:bg-gray-700 rounded cursor-pointer"
          onClick={onToggleFreeLook}
        >
          {isFreeLook ? 'Return to Ship' : 'Free Look'}
        </button>
      </div>

      {/* Simulation Controls Panel */}
      <div className="pointer-events-auto">
        <SimulationControls
          onStartJourney={onStartJourney}
          simulatedYear={simulatedYear}
          isJourneyActive={isJourneyActive}
          elapsedTime={elapsedTime}
          timeCompression={timeCompression}
          yearInTheShip={yearInTheShip}
        />
      </div>
    </>
  );
} 