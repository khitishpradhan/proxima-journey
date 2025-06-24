import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { solarSystem } from './solarConfig';
import Planet from './components/Planet';

interface Props {
  earthRef: React.RefObject<THREE.Mesh>;
}

export default function SolarSystem({ earthRef }: Props) {
  const sunRef = useRef<THREE.Mesh>(null!);

  // Rotate sun slowly
  useEffect(() => {
    if (!sunRef.current) return;
    const sun = sunRef.current;
    let frame: number;
    const rot = () => {
      sun.rotation.y += 0.001;
      frame = requestAnimationFrame(rot);
    };
    frame = requestAnimationFrame(rot);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <group>
      {/* Sun */}
      <mesh ref={sunRef} position={[0, 0, 0]}>
        <sphereGeometry args={[solarSystem.sun.radius, 32, 32]} />
        <meshBasicMaterial color={solarSystem.sun.color ?? 'orange'} />
      </mesh>

      {/* Planets generated from config */}
      {solarSystem.planets.map((planet) => (
        <Planet
          key={planet.name}
          data={planet as any}
          meshRef={planet.name === 'Earth' ? earthRef : undefined}
        />
      ))}
    </group>
  );
} 