import React, { useMemo } from 'react';
import { BufferGeometry, Float32BufferAttribute, Line, LineBasicMaterial } from 'three';

interface OrbitProps {
  radius: number;
  color?: string;
  segments?: number;
}

export default function OrbitPath({ radius, color = '#888', segments = 256 }: OrbitProps) {
  const line = useMemo(() => {
    const positions: number[] = [];
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      positions.push(Math.cos(theta) * radius, 0, Math.sin(theta) * radius);
    }
    const geom = new BufferGeometry();
    geom.setAttribute('position', new Float32BufferAttribute(positions, 3));
    const material = new LineBasicMaterial({ color });
    return new Line(geom, material);
  }, [radius, color, segments]);

  // rotate to XZ already default for y=0
  return <primitive object={line} />;
} 