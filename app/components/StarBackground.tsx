import { Stars } from '@react-three/drei';

export default function StarBackground() {
  return (
    <>
      {/* Three concentric star layers for parallax depth */}
      <Stars radius={50} depth={20} count={1200} factor={1} fade />
      <Stars radius={100} depth={50} count={4000} factor={3} fade />
      <Stars radius={200} depth={100} count={800} factor={5} fade />
    </>
  );
} 