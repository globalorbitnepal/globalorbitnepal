"use client";

import { useEffect, useMemo, useRef } from "react";
import { DEMO_SITES } from "@/components/orbit/demo-sites";
import { bindOrbitScroll, isOrbitTouch } from "@/lib/orbit/scroll-performance";
import { EARTH_FLOATER_SLOTS, isLand, projectOrbitCard } from "@/lib/work-earth-mosaic";
import type { WorkConfig } from "@/lib/work-config";

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function smoothStep(t: number) {
  const x = clamp(t, 0, 1);
  return x * x * (3 - 2 * x);
}

function madeLabelProgress(raw: number) {
  if (raw < 0.14) return 0;
  if (raw < 0.36) return smoothStep((raw - 0.14) / 0.22);
  if (raw < 0.88) return 1;
  return 1 - smoothStep((raw - 0.88) / 0.1);
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(src));
    img.src = src;
  });
}

function paintMosaic(images: HTMLImageElement[], width: number, height: number) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { alpha: false });
  if (!ctx) return canvas;

  const ocean = ctx.createLinearGradient(0, 0, 0, height);
  ocean.addColorStop(0, "#133a62");
  ocean.addColorStop(0.18, "#0c4a78");
  ocean.addColorStop(0.5, "#0a3d68");
  ocean.addColorStop(0.82, "#082a4c");
  ocean.addColorStop(1, "#071a32");
  ctx.fillStyle = ocean;
  ctx.fillRect(0, 0, width, height);

  ctx.globalAlpha = 0.28;
  for (let i = 0; i < 28; i++) {
    const gx = ((i * 137) % width);
    const gy = ((i * 89) % height);
    const rad = 40 + ((i * 47) % 90);
    const g = ctx.createRadialGradient(gx, gy, 0, gx, gy, rad);
    g.addColorStop(0, "rgba(64, 160, 210, 0.45)");
    g.addColorStop(1, "rgba(64, 160, 210, 0)");
    ctx.fillStyle = g;
    ctx.fillRect(gx - rad, gy - rad, rad * 2, rad * 2);
  }
  ctx.globalAlpha = 1;

  const ice = ctx.createLinearGradient(0, 0, 0, height);
  ice.addColorStop(0, "rgba(226, 236, 248, 0.92)");
  ice.addColorStop(0.08, "rgba(226, 236, 248, 0)");
  ice.addColorStop(0.92, "rgba(226, 236, 248, 0)");
  ice.addColorStop(1, "rgba(210, 224, 240, 0.88)");
  ctx.fillStyle = ice;
  ctx.fillRect(0, 0, width, height);

  const cols = 72;
  const rows = 36;
  const tw = width / cols;
  const th = height / rows;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const lng = (x / cols) * 360 - 180;
      const lat = 90 - ((y + 0.5) / rows) * 180;
      if (!isLand(lat, lng)) continue;
      const img = images[(x * 7 + y * 13) % images.length];
      const dx = x * tw;
      const dy = y * th;
      const inset = Math.max(0.6, tw * 0.04);
      ctx.drawImage(img, dx + inset, dy + inset, tw - inset * 2, th - inset * 2);
      ctx.strokeStyle = "rgba(240, 196, 58, 0.38)";
      ctx.lineWidth = Math.max(0.45, tw * 0.025);
      ctx.strokeRect(dx + inset * 0.5, dy + inset * 0.5, tw - inset, th - inset);
    }
  }

  ctx.globalAlpha = 0.22;
  ctx.fillStyle = "#f4d56a";
  for (let i = 0; i < 160; i++) {
    const px = ((i * 97) % width) + 3;
    const py = ((i * 53) % height) + 3;
    const lng = (px / width) * 360 - 180;
    const lat = 90 - (py / height) * 180;
    if (!isLand(lat, lng)) continue;
    ctx.beginPath();
    ctx.arc(px, py, 1.15, 0, Math.PI * 2);
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
  float f = 2.18;
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
  vec3 light = normalize(vec3(-0.55, 0.42, 0.72));
  vec3 view = normalize(vec3(0.0, 0.08, 2.45) - vP);
  float ndl = max(dot(n, light), 0.0);
  float rim = pow(1.0 - max(dot(n, view), 0.0), 2.2);
  float spec = pow(max(dot(reflect(-light, n), view), 0.0), 32.0);
  float luma = dot(col, vec3(0.28, 0.5, 0.22));
  float ocean = smoothstep(0.24, 0.09, luma);
  col *= 0.38 + ndl * 0.82;
  col += vec3(0.75, 0.88, 1.0) * spec * (0.12 + ocean * 0.55);
  col += vec3(0.95, 0.78, 0.38) * spec * 0.18;
  col += vec3(0.45, 0.72, 1.0) * rim * 0.28;
  col += vec3(0.95, 0.78, 0.32) * rim * 0.16;
  float night = smoothstep(0.18, -0.05, ndl);
  col += vec3(0.95, 0.72, 0.28) * night * ocean * 0.08;
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
  const madeRef = useRef<HTMLParagraphElement>(null);
  const yawRef = useRef(0);
  const frameRef = useRef(0);
  const drawRef = useRef<((yaw: number) => void) | null>(null);

  const floaters = useMemo(() => {
    const touch = typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;
    const slots = touch ? EARTH_FLOATER_SLOTS.slice(0, 5) : EARTH_FLOATER_SLOTS;
    return slots.map((pos, index) => ({
      pos,
      site: DEMO_SITES[index % DEMO_SITES.length],
      index,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const track = trackRef.current;
    if (!canvas || !track) return;

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

    const mesh = createSphere(36, 64);
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
    gl.uniform1f(uTilt, 0.28);
    gl.uniform1f(uCam, 2.48);

    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 1, 1, 0, gl.RGB, gl.UNSIGNED_BYTE, new Uint8Array([10, 48, 92]));

    let alive = true;
    const uniqueSrc = [...new Set(DEMO_SITES.map((s) => s.image))];
    void Promise.all(uniqueSrc.map((src) => loadImage(src).catch(() => null))).then((loaded) => {
      if (!alive) return;
      const imgs = loaded.filter((img): img is HTMLImageElement => img != null);
      if (!imgs.length) return;
      const mobile = window.matchMedia("(max-width: 767px)").matches;
      const mosaic = paintMosaic(imgs, mobile ? 1536 : 2048, mobile ? 768 : 1024);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, mosaic);
      drawRef.current?.(yawRef.current);
    });

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const size = Math.min(parent.clientWidth, parent.clientHeight);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const px = Math.max(320, Math.floor(size * dpr));
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
    draw(0);

    return () => {
      alive = false;
      drawRef.current = null;
    };
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!track) return;
    const touch = isOrbitTouch();

    const placeCards = (spin: number) => {
      const root = cardsRef.current;
      if (!root) return;
      const nodes = root.querySelectorAll<HTMLElement>("[data-lat]");
      nodes.forEach((el) => {
        const lat = Number(el.dataset.lat);
        const lng = Number(el.dataset.lng);
        const p = projectOrbitCard(lat, lng, spin);
        el.style.setProperty("--card-x", `${(p.x * 38).toFixed(2)}%`);
        el.style.setProperty("--card-y", `${(p.y * 38).toFixed(2)}%`);
        el.style.setProperty("--card-s", p.scale.toFixed(3));
        el.style.zIndex = String(Math.round(20 + p.depth * 40));
        el.style.opacity = p.depth < -0.55 ? "0.22" : p.depth < -0.15 ? "0.7" : "1";
      });
    };

    const apply = () => {
      const travel = Math.max(track.offsetHeight - window.innerHeight, 1);
      const raw = clamp(-track.getBoundingClientRect().top / travel, 0, 1);
      track.classList.toggle("is-work-scrolling", raw > 0.02 && raw < 0.98);

      const spin = reduce ? 22 : raw * (touch ? 160 : 240);
      const scale = reduce ? 1 : touch ? 0.88 + raw * 0.2 : 0.82 + raw * 0.28;
      yawRef.current = spin;

      const stage = stageRef.current;
      if (stage) {
        stage.style.setProperty("--earth-spin", `${spin.toFixed(2)}deg`);
        stage.style.setProperty("--earth-scale", scale.toFixed(4));
      }
      drawRef.current?.(spin);
      placeCards(spin);

      if (madeRef.current) {
        const m = reduce ? 1 : madeLabelProgress(raw);
        madeRef.current.style.opacity = m.toFixed(3);
      }
    };

    placeCards(0);
    return bindOrbitScroll(track, apply, frameRef);
  }, []);

  return (
    <section
      ref={trackRef}
      className="orbit-work-track orbit-work-earth-track"
      aria-labelledby="what-we-do-heading"
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

            <div className="orbit-work-earth-globe">
              <canvas ref={canvasRef} className="orbit-work-earth-canvas" aria-hidden="true" />
            </div>

            <ul ref={cardsRef} className="orbit-work-earth-floats">
              {floaters.map(({ pos, site, index }) => (
                <li
                  key={site.id}
                  className="orbit-work-earth-card"
                  data-lat={pos.lat}
                  data-lng={pos.lng}
                  style={{ zIndex: 24 + index }}
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
                    <img src={site.image} alt="" className="orbit-work-earth-card-shot" />
                  </article>
                </li>
              ))}
            </ul>
          </div>

          <p ref={madeRef} className="orbit-work-made orbit-work-made-earth">
            {config.madeLabel}
          </p>
        </div>
      </div>
    </section>
  );
}
