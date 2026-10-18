import { lazy, Suspense, useRef, useState } from "react";
import { useInView } from "../hooks/useInView";
import { useIsMobile, usePrefersReducedMotion } from "../hooks/useMediaQuery";
import { hasWebGL } from "../lib/webgl";
import SceneBoundary from "./three/SceneBoundary";
import { ORBIT_TECH } from "./three/orbitTech";

// The whole three.js bundle is a separate chunk, loaded only when the hero mounts.
const Scene3D = lazy(() => import("./three/Scene3D"));

// The original 2D photo with rings. It is the fallback (no WebGL, error, still loading).
function PhotoRings() {
  return (
    <div className="photo-wrap">
      <div className="ring ring-1"></div>
      <div className="ring ring-2"></div>
      <div className="orbit">
        <span className="orbit-dot"></span>
      </div>
      <img src="/home-photo.jpg" alt="Papun Samal" width="320" height="320" />
    </div>
  );
}

export default function Hero3D({ progressRef }) {
  const [stageRef, inView] = useInView();
  const reduced = usePrefersReducedMotion();
  const mobile = useIsMobile();
  const [ready, setReady] = useState(false);
  const chipRefs = useRef([]);
  const webgl = hasWebGL();

  return (
    <div className="hero-stage" ref={stageRef}>
      <div className={`stage-fallback ${ready ? "is-hidden" : ""}`}>
        <PhotoRings />
      </div>

      {webgl && (
        <div
          className={`stage-canvas-wrap ${ready ? "is-ready" : ""}`}
          aria-hidden="true"
        >
          <SceneBoundary>
            <Suspense fallback={null}>
              <Scene3D
                mobile={mobile}
                reduced={reduced}
                active={inView}
                progressRef={progressRef}
                chipRefs={chipRefs}
                onReady={() => setReady(true)}
              />
            </Suspense>
          </SceneBoundary>

          {/* technology chips: positioned every frame by TechOrbit */}
          <div className="tech-layer">
            {ORBIT_TECH.map(({ name, Icon, color }, i) => (
              <div
                key={name}
                className={`tech-panel ${mobile ? "compact" : ""}`}
                ref={(el) => {
                  chipRefs.current[i] = el;
                }}
              >
                <Icon style={{ color }} />
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
