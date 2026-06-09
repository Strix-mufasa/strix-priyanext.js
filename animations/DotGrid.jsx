"use client"
'use client';
import { useRef, useEffect, useCallback, useMemo } from 'react';
import { gsap } from 'gsap';
import { InertiaPlugin } from 'gsap/InertiaPlugin';

import '@/app/style/DotDrid.css';

gsap.registerPlugin(InertiaPlugin);

const throttle = (func, limit) => {
  let lastCall = 0;
  return function (...args) {
    const now = performance.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      func.apply(this, args);
    }
  };
};

function hexToRgb(hex) {
  const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!m) return { r: 0, g: 0, b: 0 };
  return {
    r: parseInt(m[1], 16),
    g: parseInt(m[2], 16),
    b: parseInt(m[3], 16)
  };
}

const DotGrid = ({
  dotSize = 16,
  gap = 32,
  baseColor = '#ffffff14',
  activeColor = '#5227FF',
  proximity = 150,
  speedTrigger = 100,
  shockRadius = 250,
  shockStrength = 5,
  maxSpeed = 5000,
  resistance = 750,
  returnDuration = 1.5,
  className = '',
  style
}) => {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const dotsRef = useRef([]);
  const pointerRef = useRef({
    x: -9999, y: -9999,
    vx: 0, vy: 0,
    speed: 0,
    lastTime: 0, lastX: 0, lastY: 0
  });
  const isVisibleRef = useRef(true);
  const needsDrawRef = useRef(true);
  const activeTweensRef = useRef(0);
  const rafIdRef = useRef(null);

  const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor]);
  const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor]);

  const circlePath = useMemo(() => {
    if (typeof window === 'undefined' || !window.Path2D) return null;
    const p = new window.Path2D();
    p.arc(0, 0, dotSize / 2, 0, Math.PI * 2);
    return p;
  }, [dotSize]);

  const buildGrid = useCallback(() => {
    const wrap = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const { width, height } = wrap.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(dpr, dpr);

    const cols = Math.floor((width + gap) / (dotSize + gap));
    const rows = Math.floor((height + gap) / (dotSize + gap));
    const cell = dotSize + gap;

    const gridW = cell * cols - gap;
    const gridH = cell * rows - gap;

    const startX = (width - gridW) / 2 + dotSize / 2;
    const startY = (height - gridH) / 2 + dotSize / 2;

    const dots = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        dots.push({
          cx: startX + x * cell,
          cy: startY + y * cell,
          xOffset: 0,
          yOffset: 0,
          _inertiaApplied: false
        });
      }
    }
    dotsRef.current = dots;
    needsDrawRef.current = true;
  }, [dotSize, gap]);

  // ── Visibility observer: stop rendering when offscreen ──
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          needsDrawRef.current = true;
        }
      },
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // ── Optimised draw loop: only redraws when needed ──
  useEffect(() => {
    if (!circlePath) return;

    const proxSq = proximity * proximity;
    const radius = dotSize / 2;

    const draw = () => {
      rafIdRef.current = requestAnimationFrame(draw);

      // Skip rendering if not visible or nothing changed
      if (!isVisibleRef.current) return;
      if (!needsDrawRef.current && activeTweensRef.current === 0) return;

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const { x: px, y: py } = pointerRef.current;
      const dots = dotsRef.current;
      const len = dots.length;

      // Batch by colour: collect base-coloured dots, draw once
      ctx.fillStyle = baseColor;
      ctx.beginPath();

      for (let i = 0; i < len; i++) {
        const dot = dots[i];
        const ox = dot.cx + dot.xOffset;
        const oy = dot.cy + dot.yOffset;
        const dx = dot.cx - px;
        const dy = dot.cy - py;
        const dsq = dx * dx + dy * dy;

        if (dsq <= proxSq) {
          // Active dot — draw individually with blended colour
          const dist = Math.sqrt(dsq);
          const t = 1 - dist / proximity;
          const r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * t);
          const g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * t);
          const b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * t);
          ctx.fill(); // flush batch
          ctx.beginPath();
          ctx.fillStyle = `rgb(${r},${g},${b})`;
          ctx.arc(ox, oy, radius, 0, Math.PI * 2);
          ctx.fill();
          // Reset batch
          ctx.beginPath();
          ctx.fillStyle = baseColor;
        } else {
          // Base dot — add to batch path
          ctx.moveTo(ox + radius, oy);
          ctx.arc(ox, oy, radius, 0, Math.PI * 2);
        }
      }
      // Flush remaining base dots
      ctx.fill();

      needsDrawRef.current = false;
    };

    rafIdRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafIdRef.current);
  }, [proximity, baseColor, activeRgb, baseRgb, circlePath, dotSize]);

  // ── Resize handling ──
  useEffect(() => {
    buildGrid();
    let ro = null;
    if ('ResizeObserver' in window) {
      ro = new ResizeObserver(buildGrid);
      wrapperRef.current && ro.observe(wrapperRef.current);
    } else {
      window.addEventListener('resize', buildGrid);
    }
    return () => {
      if (ro) ro.disconnect();
      else window.removeEventListener('resize', buildGrid);
    };
  }, [buildGrid]);

  // ── Mouse / click interaction ──
  useEffect(() => {
    const onMove = (e) => {
      const canvas = canvasRef.current;
      if (!canvas || !isVisibleRef.current) return;

      const now = performance.now();
      const pr = pointerRef.current;
      const dt = pr.lastTime ? now - pr.lastTime : 16;
      const dx = e.clientX - pr.lastX;
      const dy = e.clientY - pr.lastY;
      let vx = (dx / dt) * 1000;
      let vy = (dy / dt) * 1000;
      let speed = Math.hypot(vx, vy);
      if (speed > maxSpeed) {
        const scale = maxSpeed / speed;
        vx *= scale;
        vy *= scale;
        speed = maxSpeed;
      }
      pr.lastTime = now;
      pr.lastX = e.clientX;
      pr.lastY = e.clientY;
      pr.vx = vx;
      pr.vy = vy;
      pr.speed = speed;

      const rect = canvas.getBoundingClientRect();
      pr.x = e.clientX - rect.left;
      pr.y = e.clientY - rect.top;

      needsDrawRef.current = true;

      if (speed <= speedTrigger) return;

      const dots = dotsRef.current;
      const proxSq = proximity * proximity;
      for (let i = 0, len = dots.length; i < len; i++) {
        const dot = dots[i];
        if (dot._inertiaApplied) continue;
        const ddx = dot.cx - pr.x;
        const ddy = dot.cy - pr.y;
        if (ddx * ddx + ddy * ddy >= proxSq) continue;

        dot._inertiaApplied = true;
        activeTweensRef.current++;
        gsap.killTweensOf(dot);
        const pushX = ddx + vx * 0.005;
        const pushY = ddy + vy * 0.005;
        gsap.to(dot, {
          inertia: { xOffset: pushX, yOffset: pushY, resistance },
          onUpdate: () => { needsDrawRef.current = true; },
          onComplete: () => {
            gsap.to(dot, {
              xOffset: 0,
              yOffset: 0,
              duration: returnDuration,
              ease: 'elastic.out(1,0.75)',
              onUpdate: () => { needsDrawRef.current = true; },
              onComplete: () => {
                dot._inertiaApplied = false;
                activeTweensRef.current = Math.max(0, activeTweensRef.current - 1);
              }
            });
          }
        });
      }
    };

    const onClick = (e) => {
      const canvas = canvasRef.current;
      if (!canvas || !isVisibleRef.current) return;

      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      const shockSq = shockRadius * shockRadius;

      const dots = dotsRef.current;
      for (let i = 0, len = dots.length; i < len; i++) {
        const dot = dots[i];
        if (dot._inertiaApplied) continue;
        const dx = dot.cx - cx;
        const dy = dot.cy - cy;
        const dsq = dx * dx + dy * dy;
        if (dsq >= shockSq) continue;

        dot._inertiaApplied = true;
        activeTweensRef.current++;
        gsap.killTweensOf(dot);
        const dist = Math.sqrt(dsq);
        const falloff = Math.max(0, 1 - dist / shockRadius);
        const pushX = dx * shockStrength * falloff;
        const pushY = dy * shockStrength * falloff;
        gsap.to(dot, {
          inertia: { xOffset: pushX, yOffset: pushY, resistance },
          onUpdate: () => { needsDrawRef.current = true; },
          onComplete: () => {
            gsap.to(dot, {
              xOffset: 0,
              yOffset: 0,
              duration: returnDuration,
              ease: 'elastic.out(1,0.75)',
              onUpdate: () => { needsDrawRef.current = true; },
              onComplete: () => {
                dot._inertiaApplied = false;
                activeTweensRef.current = Math.max(0, activeTweensRef.current - 1);
              }
            });
          }
        });
      }
    };

    const throttledMove = throttle(onMove, 50);
    window.addEventListener('mousemove', throttledMove, { passive: true });
    window.addEventListener('click', onClick);

    return () => {
      window.removeEventListener('mousemove', throttledMove);
      window.removeEventListener('click', onClick);
    };
  }, [maxSpeed, speedTrigger, proximity, resistance, returnDuration, shockRadius, shockStrength]);

  return (
    <section className={`dot-grid ${className}`} style={style}>
      <div ref={wrapperRef} className="dot-grid__wrap">
        <canvas ref={canvasRef} className="dot-grid__canvas" />
      </div>
    </section>
  );
};

export default DotGrid;
















