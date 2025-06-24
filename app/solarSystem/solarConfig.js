// 1 AU = 10 scene units (distance between planets)
const AU = 10;

// Planet radius scaled down: 1 unit = 3000 km
const SIZE_SCALE = 1 / 3000;

export const solarSystem = {
  sun: {
    name: "Sun",
    radius: 696340 * SIZE_SCALE, // ~232.11 units
    distance: 0,
    color: 'orange',
  },
  planets: [
    {
      name: "Mercury",
      radius: 2439.7 * SIZE_SCALE,         // ~0.813 units
      distance: 0.39 * AU,                 // ~3.9 units
      orbitPeriod: 88,                     // days
      color: '#b1b1b1',
    },
    {
      name: "Venus",
      radius: 6051.8 * SIZE_SCALE,         // ~2.017 units
      distance: 0.72 * AU,                 // ~7.2 units
      orbitPeriod: 225,
      color: '#e7c39b',
    },
    {
      name: "Earth",
      radius: 6371 * SIZE_SCALE,           // ~2.124 units
      distance: 1.0 * AU,                  // 10 units
      orbitPeriod: 365,
      color: 'skyblue',
      moons: [
        {
          name: "Moon",
          radius: 1737.4 * SIZE_SCALE,     // ~0.579 units
          distance: 0.00257 * AU,          // ~0.0257 units from Earth
          orbitPeriod: 27.3,
        }
      ]
    },
    {
      name: "Mars",
      radius: 3389.5 * SIZE_SCALE,         // ~1.13 units
      distance: 1.52 * AU,                 // ~15.2 units
      orbitPeriod: 687,
      color: '#c1440e',
    },
    {
      name: "Jupiter",
      radius: 69911 * SIZE_SCALE,          // ~23.3 units
      distance: 5.2 * AU,                  // ~52 units
      orbitPeriod: 4331,
      color: '#d2b48c',
    },
    {
      name: "Saturn",
      radius: 58232 * SIZE_SCALE,          // ~19.4 units
      distance: 9.58 * AU,                 // ~95.8 units
      orbitPeriod: 10747,
      color: '#eed8a6',
    },
    {
      name: "Uranus",
      radius: 25362 * SIZE_SCALE,          // ~8.45 units
      distance: 19.2 * AU,                 // ~192 units
      orbitPeriod: 30589,
      color: '#7ad0e6',
    },
    {
      name: "Neptune",
      radius: 24622 * SIZE_SCALE,          // ~8.2 units
      distance: 30.05 * AU,                // ~300.5 units
      orbitPeriod: 59800,
      color: '#4063ff',
    },
  ]
};
