"use client";
import { OrbitControls } from '@react-three/drei';

interface Props {
  enabled: boolean;
}

export default function SolarOrbitControls({ enabled }: Props) {
  return (
    <OrbitControls
      enabled={enabled}
      enableZoom={true}
      maxDistance={800}
      minDistance={2}
    />
  );
} 