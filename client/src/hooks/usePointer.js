import { useEffect } from "react";

// One shared, normalised pointer (-1..1) for every 3D scene. A single window
// listener is registered while at least one scene is mounted.
const pointer = { x: 0, y: 0 };
let subscribers = 0;

function onMove(e) {
  pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
}

export function usePointer() {
  useEffect(() => {
    if (subscribers++ === 0)
      window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      if (--subscribers === 0)
        window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return pointer;
}
