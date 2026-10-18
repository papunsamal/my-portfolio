import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../hooks/useMediaQuery";

// Perspective tilt that follows the pointer. Tilt and glare are driven by CSS variables
// (--rx --ry --mx --my) so React never re-renders while the mouse moves.
function TiltCard({ children, className = "", max = 9, ...rest }) {
  const ref = useRef(null);
  const frame = useRef(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const onMove = (e) => {
    if (reduced || e.pointerType === "touch") return;
    const el = ref.current;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.setProperty("--rx", `${((0.5 - py) * max).toFixed(2)}deg`);
      el.style.setProperty("--ry", `${((px - 0.5) * max).toFixed(2)}deg`);
      el.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
      el.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
    });
  };

  const onLeave = () => {
    cancelAnimationFrame(frame.current);
    const el = ref.current;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <div
      ref={ref}
      className={`tilt ${className}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      {...rest}
    >
      {children}
    </div>
  );
}

export default TiltCard;
