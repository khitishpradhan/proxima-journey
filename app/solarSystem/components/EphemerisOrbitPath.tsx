import React, { useMemo } from 'react';
import { BufferGeometry, Float32BufferAttribute, LineBasicMaterial, LineLoop } from 'three';
import { Body } from 'astronomy-engine';
import { getPlanetPosition } from '../../../lib/astronomy';

interface EphemerisOrbitPathProps {
  body: Body;
  color?: string;
  samples?: number;       // number of vertices along the path
  periodDays?: number;    // orbital period in days (sample exactly one period)
}

export default function EphemerisOrbitPath({
  body,
  color = '#aaaaaa',
  samples = 720,
  periodDays = 365,
}: EphemerisOrbitPathProps) {
  const line = useMemo(() => {
    const positions: number[] = [];
    const now = Date.now();
    const spanMs = periodDays * 24 * 60 * 60 * 1000;
    let first: [number, number, number] | null = null;
    for (let i = 0; i < samples; i++) { // note: strictly less than samples
      const tMs = now + (spanMs * i) / samples; // sample one full period forward from now
      const [x, y, z] = getPlanetPosition(body, new Date(tMs));
      if (!first) first = [x, y, z];
      positions.push(x, y, z);
    }
    if (first) positions.push(first[0], first[1], first[2]); // close the loop
    const geom = new BufferGeometry();
    geom.setAttribute('position', new Float32BufferAttribute(positions, 3));
    const material = new LineBasicMaterial({ color }); // opaque, depth-tested
    const l = new LineLoop(geom, material); // closed loop for a single crisp path
    l.frustumCulled = false;
    return l;
  }, [body, color, samples, periodDays]);

  return <primitive object={line} />;
}
