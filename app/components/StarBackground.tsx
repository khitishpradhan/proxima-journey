import { Stars } from '@react-three/drei';

export default function StarBackground() {
  return (
    <>
      {/* Three concentric star layers for parallax depth */}
      <Stars radius={8000} depth={2000} count={5000} factor={1} fade />
      <Stars radius={12000} depth={3000} count={8000} factor={2} fade />
      <Stars radius={16000} depth={4000} count={10000} factor={3} fade />
    </>
  );
} 