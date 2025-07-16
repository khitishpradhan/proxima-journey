// === Scene scaling ===
// 1 scene-unit  = 1,000,000 km  (1e6 km)
// 1 AU (≈149.6 M km) ≈ 149.6 scene-units

export const UNIT_KM = 1000000;
export const AU = 149_600_000 / UNIT_KM; // 149.6 scene-units

// Planet radius scale: km → scene units
const SIZE_SCALE = 1 / UNIT_KM;

// currently we keep all planets on the ecliptic plane (no random offset)
const randOffset = () => 0; // returns 0 so offset is neutral

// exaggerate planet sizes for visibility (multiplier)
export const PLANET_VISUAL_SCALE = 50;

export const solarSystem = {
  sun: {
    name: "SUN",
    radius: 69634 * SIZE_SCALE, // ~232.11 units
    distance: 0,
    color: 'orange',
    texture: '/textures/sun/sun.jpg',
  },
  planets: [
    // {
    //   name: "DWARF PLANET",
    //   radius: 88887.3 * SIZE_SCALE,        // ~0.391 units
    //   distance: 0.29 * AU,                // ~590 units
    //   orbitPeriod: 90560,                 // days
    //   color: '#b1b1b1',
    // },
    {
      name: "MERCURY",
      radius: 2439.7 * SIZE_SCALE,         // ~0.813 units
      distance: 0.39 * AU,                 // ~58 units
      orbitPeriod: 88,                     // days
      color: '#b1b1b1',
      maps: {
        color: '/textures/mercury/mercury_color.jpg',
      },
    },
    {
      name: "VENUS",
      radius: 6051.8 * SIZE_SCALE,         // ~2.017 units
      distance: 0.72 * AU,                 // ~108 units
      orbitPeriod: 225,
      color: '#e7c39b',
      maps: {
        color: '/textures/venus/venus_color.jpg',
        bump: '/textures/venus/venus_bump.jpg',
      },
    },
    {
      name: "EARTH",
      radius: 6371 * SIZE_SCALE,           // ~2.124 units
      distance: 1.0 * AU,                  // 150 units
      orbitPeriod: 365,
      color: 'skyblue',
      moons: [
        {
          name: "Moon",
          radius: 1737.4 * SIZE_SCALE,     // ~0.579 units
          distance: 0.00257 * AU,          // ~0.0257 units from Earth
          orbitPeriod: 27.3,
        }
      ],
      maps: {
        color: '/textures/earth/earth_color.jpg',
        bump: '/textures/earth/earth_bump.jpg',
        emissive: '/textures/earth/earth_citylights.jpg',
        cloud: '/textures/earth/earth_clouds.jpg',
      },
    },
    {
      name: "MARS",
      radius: 3389.5 * SIZE_SCALE,         // ~1.13 units
      distance: 1.52 * AU,                 // ~227 units
      orbitPeriod: 687,
      color: '#c1440e',
      maps: {
        color: '/textures/mars/mars_color.jpg',
        bump: '/textures/mars/mars_bump.jpg',
        normal: '/textures/mars/mars_normal.jpg',
      },
    },
    {
      name: "JUPITER",
      radius: 69911 * SIZE_SCALE,          // ~23.3 units
      distance: 5.2 * AU,                  // ~778 units
      orbitPeriod: 4331,
      color: '#d2b48c',
      maps: {
        color: '/textures/jupiter/jupiter_color.jpg',
      },
    },
    {
      name: "SATURN",
      radius: 58232 * SIZE_SCALE,          // ~19.4 units
      distance: 9.58 * AU,                 // ~1 431 units
      orbitPeriod: 10747,
      color: '#eed8a6',
      maps: {
        color: '/textures/saturn/saturn_color.jpg',
      },
    },
    {
      name: "URANUS",
      radius: 25362 * SIZE_SCALE,          // ~8.45 units
      distance: 19.2 * AU,                 // ~2 873 units
      orbitPeriod: 30589,
      color: '#7ad0e6',
      maps: {
        color: '/textures/uranus/uranus_color.jpg',
      },
    },
    {
      name: "NEPTUNE",
      radius: 24622 * SIZE_SCALE,          // ~8.2 units
      distance: 30.05 * AU,                // ~4 494 units
      orbitPeriod: 59800,
      color: '#4063ff',
      maps: {
        color: '/textures/neptune/neptune_color.jpg',
      },
    },
  ]
};
