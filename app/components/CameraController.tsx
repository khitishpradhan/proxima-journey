import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

type Props = {
    shipRef: React.RefObject<THREE.Mesh>
  }
  
export default function CameraController({ shipRef }: Props) {
const camera = useThree((state) => state.camera);

useFrame(() => {
    if (shipRef.current) {
    const shipPos = shipRef.current.position;
    camera.position.set(shipPos.x, shipPos.y + 2, shipPos.z + 5);
    camera.lookAt(shipPos);
    }
});

return null;
}
