import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScene } from "./SceneContext";
import { ORBIT_TECH } from "./orbitTech";

// Wide in x, shallow in z: panels keep a steady size instead of swelling when they pass the camera.
const RADIUS_X = 3.6;
const RADIUS_Z = 1.5;
const REFERENCE_DISTANCE = 9;

// Four glass panels orbiting the portal. The panels are plain DOM chips (rendered by Hero3D, aria-hidden);
// this component only moves them: every frame it projects each orbit anchor to screen space and writes
// the transform straight onto the chip, so React never re-renders while they move.
export default function TechOrbit({ chipRefs }) {
  const { reduced } = useScene();
  const group = useRef(null);
  const anchors = useRef([]);
  const world = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ camera, size }, delta) => {
    if (!reduced && group.current) group.current.rotation.y += delta * 0.22;

    // chips scale with the canvas height (scene is in world units, chips are in CSS px)
    const base = Math.min(1, Math.max(0.65, size.height / 880));

    anchors.current.forEach((anchor, i) => {
      const chip = chipRefs?.current?.[i];
      if (!anchor || !chip) return;

      anchor.getWorldPosition(world);
      const distance = camera.position.distanceTo(world);
      world.project(camera);

      const x = (world.x * 0.5 + 0.5) * size.width;
      const y = (-world.y * 0.5 + 0.5) * size.height;
      const scale = base * 1.15 * (REFERENCE_DISTANCE / distance);

      chip.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`;
      chip.style.zIndex = String(Math.round(1000 - distance * 10));
      chip.style.opacity = "1";
    });
  });

  return (
    <group ref={group} rotation={[0.22, 0, 0]}>
      {ORBIT_TECH.map(({ name }, i) => {
        const angle = (i / ORBIT_TECH.length) * Math.PI * 2 + Math.PI / 4;
        return (
          <group
            key={name}
            ref={(el) => {
              anchors.current[i] = el;
            }}
            position={[
              Math.cos(angle) * RADIUS_X,
              i % 2 ? -0.7 : 0.7,
              Math.sin(angle) * RADIUS_Z,
            ]}
          />
        );
      })}
    </group>
  );
}
