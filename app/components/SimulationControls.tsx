import { useState, ChangeEvent, useEffect  } from 'react';

export type SimulationControlsParams = {
  destination: string;
  speed: number;
  travelTime: number;

};

type SimulationControlsProps = {
  onStartJourney: (params: SimulationControlsParams) => void;
  simulatedYear: number;
  isJourneyActive: boolean;
  elaspedTime: number;
  yearInTheShip: number;
  timeCompression: number; 
}


const destinations = [
  { name: 'Proxima Centauri', distance: 4.243 }, // Light years
  // Will Add more later, maybe after I add some actual planets, expected destinations like Gaia BH1
];

export default function SimulationControls({ 
  onStartJourney, 
  simulatedYear,
  isJourneyActive,
  elaspedTime,
  yearInTheShip,
  timeCompression
 }: SimulationControlsProps) {
  const [selectedDestination, setSelectedDestination] = useState(destinations[0]);
  const [speed, setSpeed] = useState(10); // % of speed of light
  const [travelTime, setTravelTime] = useState(0) // in Years

  const handleStart = () => {
    onStartJourney({ destination: selectedDestination.name, speed, travelTime });
  };

  // Using ChangeEvent type for the first time, typescript strict pushes to learn new things. lol
  const handleDestinationChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = event.target.value
    const selectedObject = destinations[parseInt(selectedIndex, 10)]
    // Setting the Object Rather than name
    // This will help me extend the object if I wanted to in future and use the same state object
    // seems overkill for now though
    setSelectedDestination(selectedObject)
  }

  useEffect(() => {
    // We divide speed by 100 taking while C = 1 light-year/year, since our speed here is in % of C and 100% = 1C(speed of light).
    // TODO: Need actual numbers for doing physics in near future.
    const time = parseFloat((selectedDestination.distance / (speed / 100)).toFixed(2));
    setTravelTime(time)
  }, [selectedDestination, speed])

  return (
    <div className="absolute top-5 left-5 bg-black bg-opacity-100 rounded-lg text-white space-y-4 z-50">
      {/* Destination Dropdown */}
      <div>
        <label className="block mb-1">Destination</label>
        <select
          value={selectedDestination.name}
          onChange={handleDestinationChange}
          className="w-full bg-gray-800 p-2 rounded"
        >
          {destinations.map((dest, index) => (
            <option key={index} value={index}>
              {dest.name}
            </option>
          ))}
        </select>
      </div>

      {/* Speed Slider */}
      <div>
        <label className="block mb-1">Speed (% of light): {speed.toFixed(1)}%</label>
        <input
          type="range"
          min="1"
          max="99.9"
          step="0.1"
          value={speed}
          onChange={(e) => setSpeed(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>
      {/* Display Travel Time */}
      <p>Journey Duration (years): {travelTime}</p><br/>

      {/* Simulated Year passed */}
      <p>Years Passed (Simulated): {simulatedYear}</p>

      {/* Current Year in Ship (Earth year as we travel) */}
      <p>Ship's Calendar Year: {Math.floor(yearInTheShip)}</p>

      {/* Elapsed real time */}
      <p>Time Elapsed (real seconds): {elaspedTime}s</p>

      {/* Time Compression */}
      {isJourneyActive && timeCompression > 0 && (
        <p>Time Compression: x{timeCompression.toLocaleString()}</p>
      )}


      {/* Start Journey Button */}
      <button
        onClick={handleStart}
        className="w-full bg-gray-800/85 hover:bg-gray-700 p-2 rounded font-semibold"
      >
        Start Journey
      </button>
    </div>
  );
}
