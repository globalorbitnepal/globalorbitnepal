"use client";

import { useEffect, useMemo, useRef, type CSSProperties } from "react";
import { bindOrbitScroll, isOrbitTouch } from "@/lib/orbit/scroll-performance";
import {
  EARTH_ORBIT_SITES,
  equatorialLng,
  isLand,
  projectOrbitCard,
} from "@/lib/work-earth-mosaic";
import type { WorkConfig } from "@/lib/work-config";

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function smoothStep(t: number) {
  const x = clamp(t, 0, 1);
  return x * x * (3 - 2 * x);
}

function madeLabelProgress(raw: number) {
  if (raw < 0.12) return 0;
  if (raw < 0.32) return smoothStep((raw - 0.12) / 0.2);
  if (raw < 0.9) return 1;
  return 1 - smoothStep((raw - 0.9) / 0.08);
}

/** Procedural Earth map (no site mosaic) — instant load, classic globe look */
function paintEarthTexture(width: number) {
  const height = Math.floor(width / 2);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  const img = ctx.createImageData(width, height);
  const data = img.data;

  for (let y = 0; y < height; y++) {
    const lat = 90 - (y / height) * 180;
    for (let x = 0; x < width; x++) {
      const lng = (x / width) * 360 - 180;
      const land = isLand(lat, lng);
      const i = (y * width + x) * 4;
      const n = ((x * 13 + y * 7) % 17) / 17;

      if (land) {
        data[i] = 28 + n * 22;
        data[i + 1] = 88 + n * 40;
        data[i + 2] = 52 + n * 18;
      } else {
        data[i] = 8 + n * 10;
        data[i + 1] = 28 + n * 24;
        data[i + 2] = 58 + n * 32;
      }
      data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);

  ctx.globalAlpha = 0.14;
  ctx.fillStyle = "#fff";
  for (let c = 0; c < 120; c++) {
    const cx = Math.random() * width;
    const cy = Math.random() * height;
    const r = 4 + Math.random() * 28;
    ctx.beginPath();
    ctx.ellipse(cx, cy, r, r * 0.35, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  return canvas;
}

const VERT = `
attribute vec3 aPos;
attribute vec2 aUv;
uniform float uYaw;
uniform float uTilt;
uniform float uCam;
varying vec2 vUv;
varying vec3 vN;
varying vec3 vP;
void main() {
  float cy = cos(uYaw);
  float sy = sin(uYaw);
  float cx = cos(uTilt);
  float sx = sin(uTilt);
  vec3 p = aPos;
  p = vec3(p.x, p.y * cx - p.z * sx, p.y * sx + p.z * cx);
  p = vec3(p.x * cy + p.z * sy, p.y, -p.x * sy + p.z * cy);
  vN = normalize(p);
  vP = p;
  vUv = aUv;
  float zEye = uCam - p.z;
  float f = 2.28;
  gl_Position = vec4(p.x * f, p.y * f, -p.z * 0.35, zEye);
}
`;

const FRAG = `
precision mediump float;
uniform sampler2D uMap;
varying vec2 vUv;
varying vec3 vN;
varying vec3 vP;
void main() {
  vec3 n = normalize(vN);
  vec3 col = texture2D(uMap, vUv).rgb;
  vec3 light = normalize(vec3(-0.42, 0.38, 0.82));
  vec3 view = normalize(vec3(0.0, 0.06, 2.22) - vP);
  float ndl = max(dot(n, light), 0.0);
  float rim = pow(1.0 - max(dot(n, view), 0.0), 2.4);
  float spec = pow(max(dot(reflect(-light, n), view), 0.0), 48.0);
  col *= 0.82 + ndl * 0.28;
  col += vec3(0.85, 0.92, 1.0) * spec * 0.08;
  col += vec3(0.55, 0.78, 1.0) * rim * 0.1;
  col += vec3(0.95, 0.8, 0.35) * rim * 0.06;
  gl_FragColor = vec4(col, 1.0);
}
`;

function createSphere(latBands: number, lonBands: number) {
  const pos: number[] = [];
  const uv: number[] = [];
  const idx: number[] = [];
  for (let lat = 0; lat <= latBands; lat++) {
    const theta = (lat * Math.PI) / latBands;
    const sinT = Math.sin(theta);
    const cosT = Math.cos(theta);
    for (let lon = 0; lon <= lonBands; lon++) {
      const phi = (lon * 2 * Math.PI) / lonBands;
      pos.push(Math.cos(phi) * sinT, cosT, Math.sin(phi) * sinT);
      uv.push(lon / lonBands + 0.5, lat / latBands);
    }
  }
  for (let lat = 0; lat < latBands; lat++) {
    for (let lon = 0; lon < lonBands; lon++) {
      const a = lat * (lonBands + 1) + lon;
      const b = a + lonBands + 1;
      idx.push(a, b, a + 1, b, b + 1, a + 1);
    }
  }
  return {
    pos: new Float32Array(pos),
    uv: new Float32Array(uv),
    idx: new Uint16Array(idx),
  };
}

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export function OrbitStudioWhatWeDo({ config }: { config: WorkConfig }) {
  const trackRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardsRef = useRef<HTMLUListElement>(null);
  const stepsRef = useRef<HTMLUListElement>(null);
  const frontLabelRef = useRef<HTMLParagraphElement>(null);
  const madeRef = useRef<HTMLParagraphElement>(null);
  const yawRef = useRef(12);
  const frameRef = useRef(0);
  const drawRef = useRef<((yaw: number) => void) | null>(null);

  const floaters = useMemo(() => {
    const touch = typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;
    const sites = touch ? EARTH_ORBIT_SITES.slice(0, 6) : EARTH_ORBIT_SITES;
    return sites.map((site, index) => ({ site, index }));
  }, []);

  useEffect(() => {
    for (const site of EARTH_ORBIT_SITES) {
      const img = new Image();
      img.decoding = "async";
      img.src = site.image;
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: true,
      depth: true,
      premultipliedAlpha: false,
      powerPreference: "high-performance",
    });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const mesh = createSphere(28, 48);
    const aPos = gl.getAttribLocation(prog, "aPos");
    const aUv = gl.getAttribLocation(prog, "aUv");
    const bufPos = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufPos);
    gl.bufferData(gl.ARRAY_BUFFER, mesh.pos, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 0, 0);
    const bufUv = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufUv);
    gl.bufferData(gl.ARRAY_BUFFER, mesh.uv, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(aUv);
    gl.vertexAttribPointer(aUv, 2, gl.FLOAT, false, 0, 0);
    const bufIdx = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bufIdx);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, mesh.idx, gl.STATIC_DRAW);

    const uYaw = gl.getUniformLocation(prog, "uYaw");
    const uTilt = gl.getUniformLocation(prog, "uTilt");
    const uCam = gl.getUniformLocation(prog, "uCam");
    const uMap = gl.getUniformLocation(prog, "uMap");
    gl.uniform1i(uMap, 0);
    gl.uniform1f(uTilt, 0.2);
    gl.uniform1f(uCam, 2.22);

    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    const earthMap = paintEarthTexture(1024);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, earthMap);

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const size = Math.min(parent.clientWidth, parent.clientHeight);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const px = Math.max(360, Math.floor(size * dpr));
      if (canvas.width !== px) {
        canvas.width = px;
        canvas.height = px;
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const draw = (yawDeg: number) => {
      resize();
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.enable(gl.DEPTH_TEST);
      gl.enable(gl.CULL_FACE);
      gl.cullFace(gl.BACK);
      gl.uniform1f(uYaw, (yawDeg * Math.PI) / 180);
      gl.drawElements(gl.TRIANGLES, mesh.idx.length, gl.UNSIGNED_SHORT, 0);
    };
    drawRef.current = draw;
    draw(12);

    return () => {
      drawRef.current = null;
    };
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!track) return;
    const touch = isOrbitTouch();
    const sites = floaters;

    const placePlanets = (spin: number) => {
      const root = cardsRef.current;
      if (!root) return;
      const nodes = root.querySelectorAll<HTMLElement>("[data-side-i]");
      const count = nodes.length || 1;
      let frontI = 0;
      let bestDepth = -Infinity;

      nodes.forEach((el) => {
        const i = Number(el.dataset.sideI);
        const lng = equatorialLng(i, count);
        const p = projectOrbitCard(6, lng, spin, 0.2);
        const left = 50 + p.x * 48;
        const top = 50 + p.y * 48;
        const behind = p.depth < -0.08;

        el.style.setProperty("--card-left", `${left.toFixed(2)}%`);
        el.style.setProperty("--card-top", `${top.toFixed(2)}%`);
        el.style.setProperty("--card-s", p.scale.toFixed(3));
        el.style.zIndex = String(Math.round(32 + p.depth * 28));
        el.style.opacity = behind ? "0.08" : String(clamp(0.42 + (p.depth + 1) * 0.3, 0.35, 1));
        el.classList.toggle("is-behind", behind);

        if (p.depth > bestDepth) {
          bestDepth = p.depth;
          frontI = i;
        }
      });

      nodes.forEach((el) => {
        const i = Number(el.dataset.sideI);
        const front = i === frontI;
        el.classList.toggle("is-front", front);
        el.setAttribute("aria-hidden", front ? "false" : "true");
      });

      const steps = stepsRef.current;
      if (steps) {
        steps.querySelectorAll<HTMLElement>("[data-step-i]").forEach((dot) => {
          const i = Number(dot.dataset.stepI);
          dot.classList.toggle("is-active", i === frontI);
          dot.setAttribute("aria-current", i === frontI ? "step" : "false");
        });
      }

      const label = frontLabelRef.current;
      const site = sites[frontI]?.site;
      if (label && site) {
        label.textContent = site.host;
      }
    };

    const apply = () => {
      const travel = Math.max(track.offsetHeight - window.innerHeight, 1);
      const raw = clamp(-track.getBoundingClientRect().top / travel, 0, 1);
      track.classList.toggle("is-work-scrolling", raw > 0.02 && raw < 0.98);

      const spin = reduce ? 20 : 8 + raw * (touch ? 300 : 420);
      yawRef.current = spin;

      const stage = stageRef.current;
      if (stage) {
        stage.style.setProperty("--earth-spin", `${spin.toFixed(2)}deg`);
        stage.style.setProperty("--earth-orbit-angle", `${spin.toFixed(2)}deg`);
      }
      drawRef.current?.(spin);
      placePlanets(spin);

      if (madeRef.current) {
        const m = reduce ? 1 : madeLabelProgress(raw);
        madeRef.current.style.opacity = m.toFixed(3);
      }
    };

    placePlanets(8);
    return bindOrbitScroll(track, apply, frameRef);
  }, [floaters]);

  const siteCount = floaters.length;

  return (
    <section
      ref={trackRef}
      className="orbit-work-track orbit-work-earth-track orbit-work-solar"
      aria-labelledby="what-we-do-heading"
      style={{ "--earth-scroll-steps": siteCount } as CSSProperties}
    >
      <div className="orbit-work-pin orbit-work-earth-pin-view">
        <div className="orbit-work-earth-bg" aria-hidden="true">
          <div className="orbit-work-earth-stars" />
          <div className="orbit-work-earth-vignette" />
        </div>

        <header className="orbit-work-head orbit-work-earth-head">
          <p className="orbit-work-badge">
            <span className="orbit-work-badge-num">{config.badgeNum}</span>
            {config.badgeLabel}
          </p>
          <h2 id="what-we-do-heading" className="orbit-work-headline orbit-work-earth-headline">
            {config.headline}
          </h2>
        </header>

        <div className="orbit-work-mosaic-main orbit-work-earth-stage">
          <div ref={stageRef} className="orbit-work-earth-arena">
            <div className="orbit-work-earth-halo" aria-hidden="true" />
            <div className="orbit-work-earth-rings" aria-hidden="true">
              <span className="orbit-work-earth-ring is-1" />
              <span className="orbit-work-earth-ring is-2" />
              <span className="orbit-work-earth-ring is-3" />
            </div>
            <div className="orbit-work-earth-orbit-track" aria-hidden="true" />

            <div className="orbit-work-earth-globe">
              <canvas ref={canvasRef} className="orbit-work-earth-canvas" aria-hidden="true" />
            </div>

            <ul ref={cardsRef} className="orbit-work-earth-floats orbit-work-earth-planets" aria-live="polite">
              {floaters.map(({ site, index }) => (
                <li
                  key={site.id}
                  className={`orbit-work-earth-card orbit-work-earth-planet${index === 0 ? " is-front" : ""}`}
                  data-side-i={index}
                  aria-hidden={index === 0 ? "false" : "true"}
                >
                  <article className="orbit-work-earth-float">
                    <div className="orbit-work-earth-browser-chrome">
                      <span className="orbit-work-earth-browser-dots" aria-hidden="true">
                        <i />
                        <i />
                        <i />
                      </span>
                      <span className="orbit-work-earth-browser-url">{site.host}</span>
                    </div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={site.image}
                      alt={`${site.host} website preview`}
                      className="orbit-work-earth-card-shot"
                      decoding="async"
                      loading={index < 2 ? "eager" : "lazy"}
                      fetchPriority={index === 0 ? "high" : "auto"}
                    />
                  </article>
                </li>
              ))}
            </ul>
          </div>

          <p ref={frontLabelRef} className="orbit-work-earth-front-label">
            {floaters[0]?.site.host}
          </p>

          <ul ref={stepsRef} className="orbit-work-earth-steps" aria-label="Portfolio highlights">
            {floaters.map(({ site, index }) => (
              <li
                key={`step-${site.id}`}
                className={`orbit-work-earth-step${index === 0 ? " is-active" : ""}`}
                data-step-i={index}
                aria-current={index === 0 ? "step" : undefined}
              >
                <span className="sr-only">{site.host}</span>
              </li>
            ))}
          </ul>

          <p ref={madeRef} className="orbit-work-made orbit-work-made-earth">
            {config.madeLabel}
          </p>
        </div>
      </div>
    </section>
  );
}
