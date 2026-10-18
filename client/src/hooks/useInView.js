import { useEffect, useRef, useState } from "react";

const DEFAULT_OPTIONS = { rootMargin: "120px 0px" };

// Returns [ref, inView]. Used to pause WebGL rendering while a scene is off-screen.
export function useInView(options = DEFAULT_OPTIONS) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      options,
    );
    io.observe(el);
    return () => io.disconnect();
  }, [options]);

  return [ref, inView];
}
