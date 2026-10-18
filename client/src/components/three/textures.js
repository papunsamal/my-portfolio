import { useEffect, useState } from "react";
import * as THREE from "three";

// Soft radial glow (used for stars and the portal halo). Drawn on a canvas, no network.
export function createGlowTexture(size = 128) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d");
  const g = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2,
  );
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.28, "rgba(255,255,255,0.4)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// Thin horizontal lines that scroll over the profile photo for a holographic feel.
export function createScanTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 4;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, 4, 64);
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.fillRect(0, 0, 4, 3);
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1, 18);
  return tex;
}

// Creates a disposable resource once and frees GPU memory on unmount.
export function useDisposable(factory) {
  const [resource] = useState(factory);
  useEffect(() => () => resource.dispose(), [resource]);
  return resource;
}
