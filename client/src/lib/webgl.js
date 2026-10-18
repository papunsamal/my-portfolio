let cached;

// True when the browser can create a WebGL context. Result is cached.
export function hasWebGL() {
  if (cached !== undefined) return cached;
  try {
    const canvas = document.createElement("canvas");
    cached = !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    cached = false;
  }
  return cached;
}
