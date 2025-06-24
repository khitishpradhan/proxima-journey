import React from 'react';
import * as THREE from 'three';

interface OrbitProps {
  radius: number; // distance of planet from sun (scene units)
  color?: string;
}

// Simple flat ring to visualise orbital path
export default function OrbitPath({ radius, color = '#555' }: OrbitProps) {
  // small thickness proportional to radius
  const thickness = Math.max(1, radius * 0.01);         // 1 % thickness, min 1u
  const inner = radius - thickness/2;
  const outer = radius + thickness/2;

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}> {/* rotate to lie on XZ plane */}
      <ringGeometry args={[inner, outer, 128]} />
      <meshBasicMaterial color={color} side={THREE.DoubleSide} transparent opacity={0.8} />
    </mesh>
  );
} 