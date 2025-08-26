import React from 'react';
import * as THREE from 'three';
import { PLANET_VISUAL_SCALE } from '@/solarSystem/solarConfig';
import { useCamTarget } from '@/solarSystem/cameraStore';
import { Html } from '@react-three/drei';
import { useThree, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader, LinearFilter } from 'three';

export interface PlanetData {
  name: string;
  radius: number;
  distance: number;
  color?: string;
  offset?: [number, number];
  maps?: {
    color?: string;      // base colour/albedo
    bump?: string;
    normal?: string;
    emissive?: string;   // night lights
    cloud?: string;      // separate transparent layer
  };
}

interface PlanetProps {
  data: PlanetData;
  meshRef?: React.RefObject<THREE.Mesh>;
  overridePosition?: [number, number, number];
}

export default function Planet({ data, meshRef, overridePosition }: PlanetProps) {
  const { radius, distance, color = 'white' } = data;
  const visRadius = Math.max(radius * PLANET_VISUAL_SCALE, 0.3);
  const setTarget = useCamTarget((s) => s.setTarget);
  const { camera } = useThree();
  const [showMarker, setShowMarker] = React.useState(true);

  const handleClick = (e: any) => {
    e.stopPropagation();
    // Focus the camera target at the planet's current position
    if (overridePosition) {
      const [x, y, z] = overridePosition;
      setTarget(new THREE.Vector3(x, y, z));
    } else {
      setTarget(new THREE.Vector3(distance, 0, 0));
    }
  };
  // show/hide marker based on camera distance to the planet and overall zoom band
  useFrame(() => {
    // Use actual scene position if provided, otherwise fallback to circular orbit distance
    const px = overridePosition ? overridePosition[0] : distance;
    const py = overridePosition ? overridePosition[1] : 0;
    const pz = overridePosition ? overridePosition[2] : 0;

    // distance from Sun (origin) for visibility band
    const planetRadiusFromSun = Math.sqrt(px * px + py * py + pz * pz);
    const distFromSunCam = camera.position.length();

    // compute camera-to-planet distance in world space
    const camToPlanet = camera.position.distanceTo(new THREE.Vector3(px, py, pz));

    // tweakable thresholds
    // - nearMultiplier: hide marker when closer than this many visual radii
    // - farBandLower/Upper: optional band relative to planet's solar radius
    const nearMultiplier = 100; // increase to hide only when even closer
    const farBandLower = 0.2; // keep marker hidden when very zoomed-in near Sun
    const farBandUpper = 4;   // hide marker when very far from the planet's orbit

    const nearThreshold = visRadius * nearMultiplier;
    const withinFarBand =
      distFromSunCam > planetRadiusFromSun * farBandLower &&
      distFromSunCam < planetRadiusFromSun * farBandUpper;

    const show = camToPlanet > nearThreshold && withinFarBand;

    setShowMarker(show);
  });

  // ----- dynamic texture loading based on config -----
  const colourMap   = data.maps?.color   ? useLoader(TextureLoader, data.maps.color)   : undefined;
  const bumpMap     = data.maps?.bump    ? useLoader(TextureLoader, data.maps.bump)    : undefined;
  const normalMap   = data.maps?.normal  ? useLoader(TextureLoader, data.maps.normal)  : undefined;
  const emissiveMap = data.maps?.emissive? useLoader(TextureLoader, data.maps.emissive): undefined;
  const cloudMapTex = data.maps?.cloud   ? useLoader(TextureLoader, data.maps.cloud)   : undefined;

  return (
    <mesh ref={meshRef} position={overridePosition ?? [distance, 0, 0]}>
      <sphereGeometry args={[visRadius, 64, 64]} />
      <meshStandardMaterial
        // color={color}
        map={colourMap}
        bumpMap={bumpMap} 
        normalMap={normalMap}
        emissiveMap={emissiveMap}
      />

      {/* cloud layer */}
      {/* {cloudMapTex && (
        <mesh>
          <sphereGeometry args={[visRadius * 1.02, 64, 64]} />
          <meshStandardMaterial
            map={cloudMapTex}
            transparent
            opacity={0.6}
            depthWrite={false}
          />
        </mesh>
      )} */}

      {/* Marker & label rendered as fixed-size HTML */}
      {showMarker && (
        <Html
          center
          position={[0, 0, 0]}
          occlude={false}
          transform={false}
          style={{ pointerEvents: 'auto', cursor: 'pointer' }}
        >
          <div
            onClick={handleClick}
            style={{ position: 'relative', width: 18, height: 18 }}
          >
            <div
              style={{
                width: 18,
                height: 18,
                border: `2px solid ${color}`,
                borderRadius: '50%',
              }}
            />
            <span
              style={{
                position: 'absolute',
                left: 24,
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: 16,
                color: '#ffffff',
                textShadow: '0 0 2px #000',
                userSelect: 'none',
              }}
            >
              {data.name}
            </span>
          </div>
        </Html>
      )}
    </mesh>
  );
} 