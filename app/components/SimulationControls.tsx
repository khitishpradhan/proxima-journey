import { useState, ChangeEvent  } from 'react';

const destinations = [
  { name: 'Proxima Centauri', distance: 4.24 }, // Light years
  // Will Add more later, maybe after I add some actual planets, expected destinations like Gaia BH1
];

export default function SimulationControls({ onStartJourney }: { onStartJourney: (params: { destination: string, speed: number }) => void }) {
  const [selectedDestination, setSelectedDestination] = useState(destinations[0]);
  const [speed, setSpeed] = useState(10); // % of speed of light

  const handleStart = () => {
    onStartJourney({ destination: selectedDestination.name, speed });
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
