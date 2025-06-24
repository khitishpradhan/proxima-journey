import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import Sun from './celestials/Sun';
import Earth from './planets/Earth';
interface Props {
  earthRef: React.RefObject<THREE.Mesh>;
}

export default function SolarSystem({ earthRef }: Props) {
  const sunRef = useRef<THREE.Mesh>(null!);

  // Spin sun slowly
  useEffect(() => {
    if (!sunRef.current) return;
    const sun = sunRef.current;
    let frame: number;
    const animate = () => {
      sun.rotation.y += 0.001;
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <>
      {/* Sun */}
      <Sun sunRef={sunRef} />

      {/* Earth */}
      <Earth earthRef={earthRef} />
    </>
  );
} 