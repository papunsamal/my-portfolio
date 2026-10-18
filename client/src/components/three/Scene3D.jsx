import { useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import * as THREE from "three";
import { usePointer } from "../../hooks/usePointer";
import { SceneContext, useScene } from "./SceneContext";
import Starfield from "./Starfield";
import Portal from "./Portal";
import FloatingObjects from "./FloatingObjects";
import TechOrbit from "./TechOrbit";
import StudioEnv from "./StudioEnv";

const BASE_Z = 9;

// Mouse parallax for the camera + scroll-linked pull-back (progress comes from GSAP ScrollTrigger).
function CameraRig({ progressRef }) {
  const { reduced } = useScene();
  const pointer = usePointer();

  useFrame(({ camera }, delta) => {
    if (reduced) return;
    const p = progressRef?.current?.value ?? 0;
    camera.position.x = THREE.MathUtils.damp(
      camera.position.x,
      pointer.x * 0.7,
      2.5,
      delta,
    );
    camera.position.y = THREE.MathUtils.damp(
      camera.position.y,
      pointer.y * 0.4,
      2.5,
      delta,
    );
    camera.position.z = THREE.MathUtils.damp(
      camera.position.z,
      BASE_Z + p * 6,
      4,
      delta,
    );
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// Places the scene to the right of the headline on wide screens and centres/scales it on small ones.
function World({ children }) {
  const viewport = useThree((state) => state.viewport);
  const size = useThree((state) => state.size);

  const wide = size.width >= 900;
  const fit = Math.min(1, (wide ? viewport.height : viewport.width) / 8.6);
  const x = wide ? viewport.width * 0.205 : 0;

  return (
    <group position={[x, 0, 0]} scale={fit}>
      {children}
    </group>
  );
}

export default function Scene3D({
  mobile,
  reduced,
  active,
  progressRef,
  chipRefs,
  onReady,
}) {
  const [dpr, setDpr] = useState(mobile ? [1, 1.25] : [1, 1.5]);
  const ctx = useMemo(() => ({ reduced, mobile }), [reduced, mobile]);

  return (
    <Canvas
      className="stage-canvas"
      dpr={dpr}
      frameloop={active && !reduced ? "always" : "demand"}
      camera={{ position: [0, 0, BASE_Z], fov: 45, near: 0.1, far: 80 }}
      gl={{
        antialias: !mobile,
        alpha: true,
        powerPreference: "high-performance",
      }}
    >
      <SceneContext.Provider value={ctx}>
        {/* drops resolution automatically on slow GPUs */}
        <PerformanceMonitor onDecline={() => setDpr(1)} />

        <fog attach="fog" args={["#04070f", 12, 34]} />
        <ambientLight intensity={0.45} />
        <directionalLight
          position={[3, 4, 5]}
          intensity={1.1}
          color="#cfe3ff"
        />
        <pointLight position={[-5, 2, 3]} intensity={45} color="#22e5ff" />
        <pointLight position={[5, -3, 2]} intensity={45} color="#8b5cf6" />
        <StudioEnv />

        <CameraRig progressRef={progressRef} />
        <Starfield count={mobile ? 220 : 650} />

        <World>
          <Portal onReady={onReady} />
          <FloatingObjects count={mobile ? 5 : 9} />
          <TechOrbit chipRefs={chipRefs} />
        </World>
      </SceneContext.Provider>
    </Canvas>
  );
}
