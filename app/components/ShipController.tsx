import { useFrame} from '@react-three/fiber';
import * as THREE from 'three';


type Props = {
    shipRef: React.RefObject<THREE.Mesh>
  }
  
export default function ShipController({ shipRef }: Props) {
useFrame((_, delta) => {
    if (shipRef.current) {
    shipRef.current.position.z -= 1 * delta;
    }
});

return (
    <mesh ref={shipRef}>
    <sphereGeometry args={[0.1, 32, 32]} />
    <meshBasicMaterial color="cyan" />
    </mesh>
);
}
  