import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScene } from "./SceneContext";
import { createGlowTexture, useDisposable } from "./textures";

// Small seeded PRNG: the star field is identical on every render (pure, no Math.random).
function mulberry32(seed) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const PALETTE = ["#22e5ff", "#8b5cf6", "#ffffff", "#3b82f6"].map(
  (c) => new THREE.Color(c),
);

export default function Starfield({ count }) {
  const { reduced } = useScene();
  const ref = useRef(null);
  const sprite = useDisposable(() => createGlowTexture(64));

  const geometry = useMemo(() => {
    const rand = mulberry32(7);
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (rand() - 0.5) * 38;
      positions[i * 3 + 1] = (rand() - 0.5) * 22;
      positions[i * 3 + 2] = -26 + rand() * 30;
      const c = PALETTE[Math.floor(rand() * PALETTE.length)];
      colors.set([c.r, c.g, c.b], i * 3);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return g;
  }, [count]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((_, delta) => {
    if (!reduced && ref.current) ref.current.rotation.y += delta * 0.008;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        map={sprite}
        size={0.24}
        vertexColors
        transparent
        opacity={0.85}
        depthWrite={false}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        fog={false}
      />
    </points>
  );
}
