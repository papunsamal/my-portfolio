import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { usePointer } from "../../hooks/usePointer";
import { SceneContext, useScene } from "./SceneContext";
import StudioEnv from "./StudioEnv";

// A small developer-themed object: wireframe shell, glossy core and orbiting "packets".
function DevCore() {
  const { reduced } = useScene();
  const pointer = usePointer();
  const tilt = useRef(null);
  const spin = useRef(null);
  const orbit = useRef(null);

  useFrame((_, delta) => {
    if (reduced) return;
    if (tilt.current) {
      tilt.current.rotation.y = THREE.MathUtils.damp(
        tilt.current.rotation.y,
        pointer.x * 0.7,
        3,
        delta,
      );
      tilt.current.rotation.x = THREE.MathUtils.damp(
        tilt.current.rotation.x,
        -pointer.y * 0.5,
        3,
        delta,
      );
    }
    if (spin.current) {
      spin.current.rotation.y += delta * 0.35;
      spin.current.rotation.x += delta * 0.12;
    }
    if (orbit.current) orbit.current.rotation.z += delta * 0.7;
  });

  return (
    <group ref={tilt}>
      <Float
        speed={reduced ? 0 : 1.2}
        rotationIntensity={0.3}
        floatIntensity={0.8}
      >
        <group ref={spin}>
          <mesh>
            <icosahedronGeometry args={[1.5, 1]} />
            <meshBasicMaterial
              color="#22e5ff"
              wireframe
              transparent
              opacity={0.45}
              toneMapped={false}
            />
          </mesh>
          <mesh>
            <dodecahedronGeometry args={[0.85, 0]} />
            <meshPhysicalMaterial
              color="#8b5cf6"
              emissive="#8b5cf6"
              emissiveIntensity={0.35}
              metalness={0.3}
              roughness={0.2}
              clearcoat={1}
              flatShading
            />
          </mesh>
        </group>

        <group ref={orbit} rotation={[1.1, 0.2, 0]}>
          <mesh>
            <torusGeometry args={[1.95, 0.012, 12, 120]} />
            <meshBasicMaterial
              color="#3b82f6"
              transparent
              opacity={0.7}
              toneMapped={false}
            />
          </mesh>
          {[0, 2.1, 4.2].map((a) => (
            <mesh
              key={a}
              position={[Math.cos(a) * 1.95, Math.sin(a) * 1.95, 0]}
            >
              <boxGeometry args={[0.16, 0.16, 0.16]} />
              <meshBasicMaterial color="#22e5ff" toneMapped={false} />
            </mesh>
          ))}
        </group>
      </Float>
    </group>
  );
}

export default function DevCoreScene({ active, reduced }) {
  const ctx = useMemo(() => ({ reduced, mobile: false }), [reduced]);

  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop={active && !reduced ? "always" : "demand"}
      camera={{ position: [0, 0, 5.4], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
    >
      <SceneContext.Provider value={ctx}>
        <ambientLight intensity={0.5} />
        <pointLight position={[-3, 2, 3]} intensity={30} color="#22e5ff" />
        <pointLight position={[3, -2, 2]} intensity={30} color="#8b5cf6" />
        <StudioEnv />
        <DevCore />
      </SceneContext.Provider>
    </Canvas>
  );
}
