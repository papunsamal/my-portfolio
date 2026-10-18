import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

// Thin neon bar at the very top that fills as the page scrolls (GSAP scrub).
export default function ScrollProgress() {
  const bar = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        bar.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <span ref={bar}></span>
    </div>
  );
}
