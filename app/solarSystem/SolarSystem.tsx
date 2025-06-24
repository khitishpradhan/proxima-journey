import { useRef, useEffect } from 'react';
import * as THREE from 'three';

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
      <mesh ref={sunRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color={'orange'} />
      </mesh>

      {/* Earth */}
      <mesh ref={earthRef} position={[5, 0, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color={'skyblue'} />
      </mesh>
    </>
  );
} 