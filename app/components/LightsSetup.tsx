import { forwardRef } from "react";
import * as THREE from "three";

const LightsSetup = forwardRef<THREE.PointLight>(function LightsSetup(_, ref) {
  return (
    <>
      {/* Very faint ambient light */}
      <ambientLight intensity={0.05} />

      {/* Sun light source */}
      <pointLight
        ref={ref}
        position={[0, 0, 0]}
        color={0xfff4c2}
        intensity={50000}
        decay={2}
        distance={0}
      />
    </>
  );
});

export default LightsSetup;