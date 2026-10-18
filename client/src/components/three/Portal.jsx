import { Suspense, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { usePointer } from "../../hooks/usePointer";
import { useScene } from "./SceneContext";
import {
  createGlowTexture,
  createScanTexture,
  useDisposable,
} from "./textures";

// Square crop of home-photo.jpg, small enough to keep GPU memory low.
const PHOTO_URL = "/home-photo-3d.jpg";

function PortalPhoto({ onReady }) {
  const { reduced } = useScene();
  const photo = useTexture(PHOTO_URL, (tex) => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
  });
  const scan = useDisposable(createScanTexture);
  const scanMaterial = useRef(null);

  useEffect(() => {
    onReady?.();
  }, [onReady]);

  useFrame((_, delta) => {
    if (!reduced && scanMaterial.current?.map)
      scanMaterial.current.map.offset.y -= delta * 0.05;
  });

  return (
    <group>
      <mesh>
        <circleGeometry args={[1.9, 96]} />
        <meshBasicMaterial map={photo} toneMapped={false} />
      </mesh>
      {/* holographic scanlines */}
      <mesh position={[0, 0, 0.02]}>
        <circleGeometry args={[1.9, 96]} />
        <meshBasicMaterial
          ref={scanMaterial}
          map={scan}
          color="#22e5ff"
          transparent
          opacity={0.16}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function Ring({
  radius,
  tube = 0.03,
  arc = Math.PI * 2,
  color,
  speed = 0.2,
  tilt = [0, 0, 0],
}) {
  const { reduced } = useScene();
  const ref = useRef(null);
  useFrame((_, delta) => {
    if (!reduced && ref.current) ref.current.rotation.z += delta * speed;
  });
  return (
    <group rotation={tilt}>
      <mesh ref={ref}>
        <torusGeometry args={[radius, tube, 12, 160, arc]} />
        <meshBasicMaterial
          color={color}
          toneMapped={false}
          transparent
          opacity={0.95}
        />
      </mesh>
    </group>
  );
}

function OrbitDots() {
  const { reduced } = useScene();
  const group = useRef(null);
  useFrame((_, delta) => {
    if (!reduced && group.current) group.current.rotation.z -= delta * 0.6;
  });
  const dots = [
    { a: 0, r: 3.35, s: 0.07, c: "#22e5ff" },
    { a: 2.1, r: 3.35, s: 0.05, c: "#8b5cf6" },
    { a: 4.2, r: 3.35, s: 0.06, c: "#3b82f6" },
  ];
  return (
    <group ref={group}>
      {dots.map((d) => (
        <mesh
          key={d.a}
          position={[Math.cos(d.a) * d.r, Math.sin(d.a) * d.r, 0]}
        >
          <sphereGeometry args={[d.s, 16, 16]} />
          <meshBasicMaterial color={d.c} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

export default function Portal({ onReady }) {
  const { reduced } = useScene();
  const pointer = usePointer();
  const tilt = useRef(null);
  const glow = useDisposable(() => createGlowTexture(256));

  useFrame((state, delta) => {
    if (reduced || !tilt.current) return;
    const g = tilt.current;
    g.rotation.y = THREE.MathUtils.damp(
      g.rotation.y,
      pointer.x * 0.32,
      3,
      delta,
    );
    g.rotation.x = THREE.MathUtils.damp(
      g.rotation.x,
      -pointer.y * 0.2,
      3,
      delta,
    );
    g.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.12;
  });

  return (
    <group ref={tilt}>
      {/* halos: cheap stand-in for bloom */}
      <sprite scale={[11, 11, 1]} position={[0, 0, -0.9]}>
        <spriteMaterial
          map={glow}
          color="#22e5ff"
          transparent
          opacity={0.5}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
          fog={false}
        />
      </sprite>
      <sprite scale={[8, 8, 1]} position={[0.8, -0.5, -1.1]}>
        <spriteMaterial
          map={glow}
          color="#8b5cf6"
          transparent
          opacity={0.42}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
          fog={false}
        />
      </sprite>

      <Suspense fallback={null}>
        <PortalPhoto onReady={onReady} />
      </Suspense>

      <Ring radius={1.98} tube={0.035} color="#22e5ff" speed={0.05} />
      <Ring radius={2.5} tube={0.022} color="#3b82f6" speed={0.18} />
      <Ring
        radius={2.85}
        tube={0.03}
        arc={Math.PI * 1.15}
        color="#22e5ff"
        speed={-0.3}
        tilt={[0.18, 0.05, 0]}
      />
      <Ring
        radius={3.2}
        tube={0.022}
        arc={Math.PI * 0.8}
        color="#8b5cf6"
        speed={0.42}
        tilt={[-0.14, 0.1, 0.6]}
      />
      <OrbitDots />
    </group>
  );
}
