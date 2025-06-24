import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import Sun from './celestials/Sun';
import Earth from './planets/Earth';
import Mercury from './planets/Mercury';
import Venus from './planets/Venus';
import Mars from './planets/Mars';
import Jupiter from './planets/Jupiter';
import Saturn from './planets/Saturn';
import Uranus from './planets/Uranus';
import Neptune from './planets/Neptune';

interface Props {
  earthRef: React.RefObject<THREE.Mesh>;
}

export default function SolarSystem({ earthRef }: Props) {
  const sunRef = useRef<THREE.Mesh>(null!);
  const mercuryRef = useRef<THREE.Mesh>(null!);
  const venusRef = useRef<THREE.Mesh>(null!);
  const marsRef = useRef<THREE.Mesh>(null!);
  const jupiterRef = useRef<THREE.Mesh>(null!);
  const saturnRef = useRef<THREE.Mesh>(null!);
  const uranusRef = useRef<THREE.Mesh>(null!);
  const neptuneRef = useRef<THREE.Mesh>(null!);
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

      {/* Mercury */}
      <Mercury mercuryRef={mercuryRef} />

      {/* Venus */}
      <Venus venusRef={venusRef} />

      {/* Earth */}
      <Earth earthRef={earthRef} />

      {/* Mars */}
      <Mars marsRef={marsRef} />

      {/* Jupiter */}
      <Jupiter jupiterRef={jupiterRef} />

      {/* Saturn */}
      <Saturn saturnRef={saturnRef} />

      {/* Uranus */}
      <Uranus uranusRef={uranusRef} />

      {/* Neptune */}
      <Neptune neptuneRef={neptuneRef} />
    </>
  );
} 