import { Float } from "@react-three/drei";
import { useScene } from "./SceneContext";

const COLORS = { cyan: "#22e5ff", purple: "#8b5cf6", blue: "#3b82f6" };

const OBJECTS = [
  { shape: "ico", pos: [-4.6, 2.9, -2], size: 0.5, color: "cyan", speed: 1.1 },
  {
    shape: "octa",
    pos: [4.9, 2.4, -1.2],
    size: 0.6,
    color: "purple",
    speed: 0.9,
  },
  {
    shape: "tetra",
    pos: [5.2, -2.2, 0.4],
    size: 0.45,
    color: "blue",
    speed: 1.3,
  },
  {
    shape: "ico",
    pos: [-3.9, -3, -1],
    size: 0.38,
    color: "purple",
    speed: 1.0,
  },
  {
    shape: "octa",
    pos: [1.2, 3.9, -2.5],
    size: 0.35,
    color: "cyan",
    speed: 1.4,
  },
  {
    shape: "tetra",
    pos: [-1.5, -3.9, -2.8],
    size: 0.5,
    color: "blue",
    speed: 0.8,
  },
  {
    shape: "ico",
    pos: [3.2, -3.8, -3.5],
    size: 0.7,
    color: "purple",
    speed: 0.7,
  },
  { shape: "octa", pos: [-6.5, 0.2, -4], size: 0.8, color: "cyan", speed: 0.6 },
  {
    shape: "tetra",
    pos: [6.4, 0.2, -3.2],
    size: 0.55,
    color: "cyan",
    speed: 1.0,
  },
];

function Geometry({ shape }) {
  if (shape === "octa") return <octahedronGeometry args={[1, 0]} />;
  if (shape === "tetra") return <tetrahedronGeometry args={[1, 0]} />;
  return <icosahedronGeometry args={[1, 0]} />;
}

export default function FloatingObjects({ count = OBJECTS.length }) {
  const { reduced } = useScene();

  return (
    <>
      {OBJECTS.slice(0, count).map((o, i) => (
        <Float
          key={i}
          speed={reduced ? 0 : o.speed}
          rotationIntensity={1.2}
          floatIntensity={1.6}
          floatingRange={[-0.25, 0.25]}
          position={o.pos}
        >
          <group scale={o.size}>
            {/* glass-like crystal */}
            <mesh>
              <Geometry shape={o.shape} />
              <meshPhysicalMaterial
                color={COLORS[o.color]}
                emissive={COLORS[o.color]}
                emissiveIntensity={0.22}
                metalness={0.25}
                roughness={0.12}
                clearcoat={1}
                clearcoatRoughness={0.1}
                transparent
                opacity={0.78}
                flatShading
              />
            </mesh>
            {/* holographic wire edge */}
            <mesh scale={1.015}>
              <Geometry shape={o.shape} />
              <meshBasicMaterial
                color={COLORS[o.color]}
                wireframe
                transparent
                opacity={0.4}
                toneMapped={false}
              />
            </mesh>
          </group>
        </Float>
      ))}
    </>
  );
}
