// Minimal astronomy helpers used by the solar system rendering
// - Keeps runtime ephemeris logic out of component files
// - Central place to document scale and coordinate mapping

import { HelioVector, Body, AstroTime } from 'astronomy-engine';

// Scene scale: how many world units represent 1 Astronomical Unit (AU)
// Match existing visuals used in the app (≈150 units per AU keeps spacing readable)
export const AU_TO_SCENE = 150;

// Coordinate mapping note:
// astronomy-engine returns a right-handed ecliptic frame with x,y in the plane and z out of plane.
// Our scene is y-up. To keep the ecliptic near y=0, we map:
//   sceneX = +x, sceneY = +z, sceneZ = +y
export function getPlanetPosition(body: Body, date: Date = new Date()): [number, number, number] {
  const time = new AstroTime(date);
  const vec = HelioVector(body, time); // AU
  return [
    vec.x * AU_TO_SCENE,
    vec.z * AU_TO_SCENE,
    vec.y * AU_TO_SCENE,
  ];
}
