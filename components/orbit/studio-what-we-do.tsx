"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { DEMO_SITES } from "@/components/orbit/demo-sites";
import { bindOrbitScroll, isOrbitTouch } from "@/lib/orbit/scroll-performance";
import { EARTH_ORBIT_SITES, EARTH_SIDE_LAYOUT } from "@/lib/work-earth-mosaic";
import type { WorkConfig } from "@/lib/work-config";

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function EarthHeadline({ text }: { text: string }) {
  const match = text.match(/^(.*?)(\s*we\s+ship\.?\s*)$/i);
  if (!match) return text;
  return (
    <>
      {match[1]}
      <span className="orbit-work-earth-headline-gold">{match[2].trim()}</span>
    </>
  );
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

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(src));
    img.src = src;
  });
}

function drawHeroTile(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  dx: number,
  dy: number,
  tw: number,
  th: number,
) {
  const gap = Math.max(0.6, tw * 0.012);
  const x = dx + gap;
  const y = dy + gap;
  const w = tw - gap * 2;
  const h = th - gap * 2;
  const chrome = Math.max(5, h * 0.11);
  ctx.fillStyle = "#12141c";
  ctx.fillRect(x, y, w, chrome);
  const dot = Math.max(1.6, chrome * 0.22);
  const dyDot = y + chrome * 0.5 - dot / 2;
  ctx.fillStyle = "#f87171";
  ctx.beginPath();
  ctx.arc(x + chrome * 0.45, dyDot + dot / 2, dot / 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#fbbf24";
  ctx.beginPath();
  ctx.arc(x + chrome * 0.85, dyDot + dot / 2, dot / 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#4ade80";
  ctx.beginPath();
  ctx.arc(x + chrome * 1.25, dyDot + dot / 2, dot / 2, 0, Math.PI * 2);
  ctx.fill();

  const iw = img.naturalWidth || img.width;
  const ih = img.naturalHeight || img.height;
  const destH = h - chrome;
  const destW = w;
  const srcRatio = destW / destH;
  let sw = iw;
  let sh = iw / srcRatio;
  if (sh > ih) {
    sh = ih;
    sw = ih * srcRatio;
  }
  const sx = (iw - sw) / 2;
  const sy = 0;
  ctx.drawImage(img, sx, sy, sw, sh, x, y + chrome, destW, destH);
  ctx.strokeStyle = "rgba(240, 196, 58, 0.42)";
  ctx.lineWidth = Math.max(0.8, tw * 0.018);
  ctx.strokeRect(x + 0.4, y + 0.4, w - 0.8, h - 0.8);
}

function paintMosaic(images: HTMLImageElement[], width: number, height: number) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { alpha: false });
  if (!ctx) return canvas;

  ctx.fillStyle = "#0a0c12";
  ctx.fillRect(0, 0, width, height);

  const cols = 36;
  const rows = 18;
  const tw = width / cols;
  const th = height / rows;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const img = images[(x * 7 + y * 13) % images.length];
      drawHeroTile(ctx, img, x * tw, y * th, tw, th);
    }
  }

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
  float rim = pow(1.0 - max(dot(n, view), 0.0), 2.6);
  float spec = pow(max(dot(reflect(-light, n), view), 0.0), 36.0);
  col *= 0.82 + ndl * 0.28;
  col += vec3(0.85, 0.92, 1.0) * spec * 0.08;
  col += vec3(0.55, 0.78, 1.0) * rim * 0.1;
  col += vec3(0.95, 0.8, 0.35) * rim * 0.08;
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
  const yawRef = useRef(12);
  const frameRef = useRef(0);
  const drawRef = useRef<((yaw: number) => void) | null>(null);
  const [globeReady, setGlobeReady] = useState(false);
  const [mobileLayout, setMobileLayout] = useState(false);

  const floaters = (mobileLayout ? EARTH_ORBIT_SITES.slice(0, 6) : EARTH_ORBIT_SITES).map((site, index) => ({
    site,
    layout: EARTH_SIDE_LAYOUT[index] ?? EARTH_SIDE_LAYOUT[0],
    index,
  }));

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setMobileLayout(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setGlobeReady(true);
          io.disconnect();
        }
      },
      { rootMargin: "180px 0px", threshold: 0.01 },
    );
    io.observe(track);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!globeReady) return;
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

    const mesh = createSphere(24, 40);
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
    gl.uniform1f(uTilt, 0.22);
    gl.uniform1f(uCam, 2.22);

    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 1, 1, 0, gl.RGB, gl.UNSIGNED_BYTE, new Uint8Array([12, 14, 20]));

    let alive = true;
    const uniqueSrc = [
      ...new Set([...EARTH_ORBIT_SITES.map((s) => s.image), ...DEMO_SITES.map((s) => s.image)]),
    ];
    const buildTexture = () => {
      void Promise.all(uniqueSrc.map((src) => loadImage(src).catch(() => null))).then((loaded) => {
        if (!alive) return;
        const imgs = loaded.filter((img): img is HTMLImageElement => img != null);
        if (!imgs.length) return;
        const mobile = window.matchMedia("(max-width: 767px)").matches;
        const w = mobile ? 1024 : 2048;
        const mosaic = paintMosaic(imgs, w, Math.floor(w / 2));
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, mosaic);
        drawRef.current?.(yawRef.current);
      });
    };
    if (typeof requestIdleCallback !== "undefined") {
      requestIdleCallback(buildTexture, { timeout: 1200 });
    } else {
      window.setTimeout(buildTexture, 40);
    }

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const size = Math.min(parent.clientWidth, parent.clientHeight);
      const mobile = window.matchMedia("(max-width: 767px)").matches;
      const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1 : 1.5);
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
      alive = false;
      drawRef.current = null;
    };
  }, [globeReady]);

  useEffect(() => {
    const track = trackRef.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!track) return;
    const touch = isOrbitTouch();

    const placeCards = (spin: number, driftPhase = 0) => {
      const root = cardsRef.current;
      if (!root) return;
      const nodes = root.querySelectorAll<HTMLElement>("[data-side-i]");
      nodes.forEach((el) => {
        const i = Number(el.dataset.sideI);
        const layout = EARTH_SIDE_LAYOUT[i];
        if (!layout) return;
        const wobbleX = Math.sin(((spin + i * 28) * Math.PI) / 180) * 0.8;
        const wobbleY = Math.cos(((spin + i * 22) * Math.PI) / 180) * 0.5;
        const isLeft = layout.left < 50;
        const orbitDrift = Math.sin(driftPhase + i * 0.72) * (isLeft ? -2.4 : 2.4);
        const orbitLift = Math.cos(driftPhase * 0.85 + i * 0.5) * 0.9;
        el.style.setProperty("--card-left", `${(layout.left + wobbleX + orbitDrift).toFixed(2)}%`);
        el.style.setProperty("--card-top", `${(layout.top + wobbleY + orbitLift).toFixed(2)}%`);
        el.style.setProperty("--card-s", "1");
        el.style.zIndex = String(40 + i);
        el.style.opacity = "1";
      });
    };

    const apply = (driftPhase = 0) => {
      const travel = Math.max(track.offsetHeight - window.innerHeight, 1);
      const raw = clamp(-track.getBoundingClientRect().top / travel, 0, 1);
      track.classList.toggle("is-work-scrolling", raw > 0.02 && raw < 0.98);

      const spin = reduce ? 16 : 10 + raw * (touch ? 38 : 52);
      yawRef.current = spin;

      const stage = stageRef.current;
      if (stage) {
        stage.style.setProperty("--earth-spin", `${spin.toFixed(2)}deg`);
      }
      drawRef.current?.(spin);
      placeCards(spin, driftPhase);

      if (madeRef.current) {
        const m = reduce ? 1 : madeLabelProgress(raw);
        madeRef.current.style.opacity = m.toFixed(3);
      }
    };

    placeCards(10, 0);

    const unbindScroll = bindOrbitScroll(track, () => apply(performance.now() / 2400), frameRef);

    let driftFrame = 0;
    const driftLoop = () => {
      driftFrame = window.requestAnimationFrame(driftLoop);
      if (reduce) return;
      const rect = track.getBoundingClientRect();
      if (rect.bottom < -80 || rect.top > window.innerHeight + 80) return;
      placeCards(yawRef.current, performance.now() / 2400);
    };
    if (!reduce) driftFrame = window.requestAnimationFrame(driftLoop);

    return () => {
      unbindScroll();
      if (driftFrame) window.cancelAnimationFrame(driftFrame);
    };
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
            <EarthHeadline text={config.headline} />
          </h2>
          <p className="orbit-work-earth-lede">
            Turning ideas into high-performing websites for hotels, spas, travel, and modern businesses.
          </p>
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

            <svg className="orbit-work-earth-connectors" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              {EARTH_SIDE_LAYOUT.map((layout, i) =>
                mobileLayout && i >= 6 ? null : (
                  <line
                    key={`line-${i}`}
                    x1={layout.left}
                    y1={layout.top}
                    x2={layout.anchorX}
                    y2={layout.anchorY}
                  />
                ),
              )}
              <circle cx="50" cy="50" r="0.55" className="orbit-work-earth-hub-dot" />
            </svg>

            <ul ref={cardsRef} className="orbit-work-earth-floats">
              {floaters.map(({ site, layout, index }) => (
                <li
                  key={site.id}
                  className="orbit-work-earth-card"
                  data-side-i={index}
                  style={
                    {
                      zIndex: 40 + index,
                      "--card-left": `${layout.left}%`,
                      "--card-top": `${layout.top}%`,
                    } as CSSProperties
                  }
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
                      alt=""
                      className="orbit-work-earth-card-shot"
                      loading="lazy"
                      decoding="async"
                    />
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
