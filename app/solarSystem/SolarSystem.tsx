import { useRef, useEffect, useMemo, useState } from 'react';
import * as THREE from 'three';
import { solarSystem, PLANET_VISUAL_SCALE } from './solarConfig';
import Planet from './components/Planet';
import OrbitPath from './components/OrbitPath';
import EphemerisOrbitPath from './components/EphemerisOrbitPath';
import React, { Suspense } from 'react';
import { useCamTarget } from './cameraStore';
import Sun from './celestials/Sun';
import SmoothCameraController from './components/SmoothCameraController';
// astronomy-engine: real-time heliocentric positions
import { Body } from 'astronomy-engine';
import { getPlanetPosition } from '../../lib/astronomy';
// Map config names (UPPERCASE) to astronomy-engine Body enum keys (TitleCase)
const NAME_TO_BODY: Record<string, Body> = {
  MERCURY: Body.Mercury,
  VENUS: Body.Venus,
  EARTH: Body.Earth,
  MARS: Body.Mars,
  JUPITER: Body.Jupiter,
  SATURN: Body.Saturn,
  URANUS: Body.Uranus,
  NEPTUNE: Body.Neptune,
};

interface Props {
  earthRef: React.RefObject<THREE.Mesh>;
}

export default function SolarSystem({ earthRef }: Props) {
  const sunRef = useRef<THREE.Mesh>(null!);
  const setTarget = useCamTarget((s)=>s.setTarget);

  // Bodies we render using astronomy-engine
  const bodies = useMemo(() => [
    Body.Mercury,
    Body.Venus,
    Body.Earth,
    Body.Mars,
    Body.Jupiter,
    Body.Saturn,
    Body.Uranus,
    Body.Neptune,
  ], []);

  // Keep current heliocentric positions (in scene units) for each body
  const [positions, setPositions] = useState<Record<string, [number, number, number]>>({});

  useEffect(() => {
    let cancelled = false;

    const updatePositions = () => {
      const next: Record<string, [number, number, number]> = {};
      for (const b of bodies) {
        // Pull current heliocentric position (converted to scene units)
        next[Body[b].toUpperCase()] = getPlanetPosition(b);
      }
      if (!cancelled) setPositions(next);
    };

    updatePositions();
    const id = setInterval(updatePositions, 1000000); // update ~every 100 seconds
    return () => { cancelled = true; clearInterval(id); };
  }, [bodies]);

  return (
    <Suspense fallback={null}>
      <group>
        {/* Camera transition controller */}
        <SmoothCameraController />
        
        {/* Sun */}
        <Sun sunRef={sunRef} setTarget={setTarget} />

        {/* Orbits & Planets */}
        {solarSystem.planets.map((planet) => {
          const pos = positions[planet.name];
          // Map display name to astronomy-engine Body
          const bodyEnum = NAME_TO_BODY[planet.name];
          console.log(bodyEnum);
          return (
            <React.Fragment key={planet.name}>
              {bodyEnum !== undefined && (
                <EphemerisOrbitPath
                  body={bodyEnum}
                  color={planet.color}
                  periodDays={planet.orbitPeriod}
                  samples={720}
                />
              )}

              
              <Planet
                data={planet as any}
                meshRef={planet.name === 'EARTH' ? earthRef : undefined}
                // Heliocentric positions in scene units; fallback to original static distance if not yet loaded
                overridePosition={pos ?? [planet.distance, 0, 0]}
              />
            </React.Fragment>
          );
        })}
      </group>
    </Suspense>
  );
} 