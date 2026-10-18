import { Environment, Lightformer } from "@react-three/drei";

// Procedural reflections (no HDR download). Baked once (frames=1) so it costs nothing per frame.
export default function StudioEnv() {
  return (
    <Environment resolution={64} frames={1}>
      <Lightformer
        intensity={2.2}
        color="#22e5ff"
        position={[-5, 2, -1]}
        scale={[7, 2, 1]}
      />
      <Lightformer
        intensity={2.2}
        color="#8b5cf6"
        position={[5, -2, -1]}
        scale={[7, 2, 1]}
      />
      <Lightformer
        intensity={1.2}
        color="#ffffff"
        position={[0, 6, 2]}
        scale={[9, 1, 1]}
      />
    </Environment>
  );
}
