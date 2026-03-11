import React, { useEffect } from 'react';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import { PLANET_VISUAL_SCALE, solarSystem } from '../solarConfig';
import { useSunFocusable } from '../hooks/useFocusable';

// Procedural sun surface material (no base texture, animated noise + rim glow)
const SunSurfaceMaterial = shaderMaterial(
  {
    uTime: 0,
    uIntensity: 2.0,
  },
  /* vertex shader */ `
    varying vec3 vNormal;
    varying vec3 vWorldPos;

    void main() {

      vNormal = normalize(normalMatrix * normal);

      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vWorldPos = worldPos.xyz;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  /* fragment shader */ `
    precision highp float;

    uniform float uTime;
    uniform float uIntensity;

    varying vec3 vNormal;
    varying vec3 vWorldPos;

    void main() {

      vec3 nrm = normalize(vNormal);
      vec3 viewDir = normalize(cameraPosition - vWorldPos);

      float facing = max(dot(nrm, viewDir), 0.0);

      float core = pow(facing, 1.2);
      float rim  = pow(1.0 - facing, 2.5);

      rim = clamp(rim, 0.0, 0.8);

      vec3 coreColor = vec3(1.0, 0.75, 0.25);
      vec3 rimColor  = vec3(1.0, 0.9, 0.6);

      vec3 coreLight = coreColor * core * 1.5;
      vec3 rimLight  = rimColor * rim * 2.5;

      vec3 col = (coreLight + rimLight) * uIntensity;

      col = clamp(col, 0.0, 4.0);

      gl_FragColor = vec4(col, 1.0);
    }
  `
);

// Outer corona shell: wispy glow around the sun
const SunCoronaMaterial = shaderMaterial(
  {
    uTime: 0,
    uInnerRadius: 1.0,
    uOuterRadius: 1.2,
    uIntensity: 1.0,
  },
  /* vertex shader */ `
varying vec3 vNormal;
varying vec3 vWorldPos;

void main() {

  vNormal = normalize(normalMatrix * normal);

  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vWorldPos = worldPos.xyz;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
  `,
  /* fragment shader */ `
    precision highp float;

    uniform float uTime;
    uniform float uInnerRadius;
    uniform float uOuterRadius;
    uniform float uIntensity;

    varying vec3 vWorldPos;
    varying vec3 vNormal;

    void main() {
      float distFromCenter = length(vWorldPos);
      float corona = smoothstep(uOuterRadius, uInnerRadius, distFromCenter);

      float alpha = corona;

      vec3 col = vec3(1.0, 0.7, 0.2);
      col *= uIntensity;

      gl_FragColor = vec4(col, alpha);
    }
  `
);

interface SunProps {
  sunRef: React.RefObject<THREE.Mesh>;
  setTarget: (target: { position: THREE.Vector3; radius: number; type: string }) => void;
}

export default function Sun({ sunRef, setTarget }: SunProps) {
  const { camera } = useThree();
  const [showMarker, setShowMarker] = React.useState(true);
  const [highDetail, setHighDetail] = React.useState(true);

  const visRadius = solarSystem.sun.radius * PLANET_VISUAL_SCALE;

  const { handleFocus } = useSunFocusable(
    [0, 0, 0],
    visRadius,
    solarSystem.sun.name,
    'sun'
  );

  const timeRef = React.useRef(0);
  const highDetailRef = React.useRef(highDetail);

  // Instantiate shader materials once and reuse them
  const [surfaceMaterial] = React.useState(
    () => new (SunSurfaceMaterial as any)() as THREE.ShaderMaterial
  );
  const [coronaMaterial] = React.useState(
    () => new (SunCoronaMaterial as any)() as THREE.ShaderMaterial
  );

  const surfaceMatRef = React.useRef<THREE.ShaderMaterial>(surfaceMaterial);
  const coronaMatRef = React.useRef<THREE.ShaderMaterial>(coronaMaterial);

  useFrame((_, delta) => {
    const sunPos = new THREE.Vector3(0, 0, 0);
    const dist = camera.position.distanceTo(sunPos);

    // Marker visibility
    setShowMarker(dist > visRadius * 10 && dist < visRadius * 10000);

    // Distance-based LOD for heavy effects
    const shouldHighDetail = dist < visRadius * 8000;
    if (shouldHighDetail !== highDetailRef.current) {
      highDetailRef.current = shouldHighDetail;
      setHighDetail(shouldHighDetail);
    }

    // Advance time for shaders
    timeRef.current += delta;
    if (surfaceMatRef.current) {
      surfaceMatRef.current.uniforms.uTime.value = timeRef.current
      surfaceMatRef.current.uniforms.uIntensity.value = highDetail ? 2.0 : 1.2
    }
    if (coronaMatRef.current) {
      coronaMatRef.current.uniforms.uTime.value = timeRef.current
      coronaMatRef.current.uniforms.uIntensity.value = highDetail ? 1.5 : 0.8
    }
  });

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
  }, [sunRef]);

  return (
    <group position={[0, 0, 0]}>
      {/* Core sun sphere */}
      <mesh ref={sunRef}>
        <sphereGeometry args={[visRadius, 64, 64]} />
        <primitive object={surfaceMaterial} ref={surfaceMatRef} attach="material" />
      </mesh>

      {/* Outer corona shell (only when in high detail range) */}
      {highDetail && (
        <mesh>
          <sphereGeometry args={[visRadius * 1.18, 64, 64]} />
          <primitive
            object={coronaMaterial}
            ref={coronaMatRef}
            attach="material"
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}

      {/* Clickable label marker near the sun's center */}
      {showMarker && (
        <Html
          center
          position={[0, 0, 0]}
          occlude={false}
          transform={false}
          style={{ pointerEvents: 'auto', cursor: 'pointer' }}
        >
          <div
            onClick={handleFocus}
            style={{ position: 'relative', width: 20, height: 20 }}
          >
            <span
              style={{
                position: 'absolute',
                left: 26,
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: 18,
                color: '#ffffff',
                textShadow: '0 0 2px #000',
                userSelect: 'none',
              }}
            >
              {solarSystem.sun.name}
            </span>
          </div>
        </Html>
      )}
    </group>
  );
}
