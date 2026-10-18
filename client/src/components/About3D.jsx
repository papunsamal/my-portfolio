import { lazy, Suspense } from "react";
import { useInView } from "../hooks/useInView";
import { useIsMobile, usePrefersReducedMotion } from "../hooks/useMediaQuery";
import { hasWebGL } from "../lib/webgl";
import SceneBoundary from "./three/SceneBoundary";

const DevCoreScene = lazy(() => import("./three/DevCoreScene"));

// Decorative only: skipped on phones and when WebGL is missing, so the About text never depends on it.
export default function About3D() {
  const [ref, inView] = useInView();
  const reduced = usePrefersReducedMotion();
  const mobile = useIsMobile();

  if (mobile || !hasWebGL()) return null;

  return (
    <div className="about-3d" ref={ref} aria-hidden="true">
      <SceneBoundary>
        <Suspense fallback={null}>
          <DevCoreScene active={inView} reduced={reduced} />
        </Suspense>
      </SceneBoundary>
    </div>
  );
}
