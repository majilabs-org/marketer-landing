"use client";

import { useEffect, useRef } from "react";
import { TrendingUpIcon } from "lucide-react";

const HEIGHT = 240;
const WIN = 11000; // visible time window in ms — older data scrolls off the left
const PAD_R = 18; // right inset so the live dot + glow have room
const PAD_Y = 30; // vertical inset
const RISE_MIN = 22; // climb rate during a "rise" phase (units/sec)
const RISE_MAX = 36; // flat phases use slope 0 — so it steps up, then plateaus
const Y_TIP = 44; // the newest point is pinned here — a fixed anchor, no wobble
const SCALE = 0.95; // px per value unit; a constant scale keeps the tail steady

const LINE = "#1E9E5A";
const GLOW = "rgba(34,165,94,0.5)";

function RisingChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    const resize = () => {
      width = canvas.clientWidth;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(HEIGHT * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    type P = { t: number; v: number };
    const points: P[] = [];
    let value = 0;
    let slope = 0;
    let targetSlope = 0;
    let rising = false;
    let nextChange = 0;
    let tipV = 0;
    let last = 0;
    let raf = 0;
    let running = false;

    const xOf = (t: number, now: number) =>
      width - PAD_R - ((now - t) * width) / WIN;
    // The newest value is pinned at Y_TIP and every other point is measured
    // downward from it at a fixed scale — so a steady value maps to a steady y
    // (no auto-scaling "breathing", the tail stays put).
    const yOf = (v: number) => Y_TIP + (tipV - v) * SCALE;

    const tracePath = (now: number) => {
      ctx.beginPath();
      for (let i = 0; i < points.length; i++) {
        const x = xOf(points[i].t, now);
        const y = yOf(points[i].v);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
    };

    const render = (now: number) => {
      ctx.clearRect(0, 0, width, HEIGHT);
      if (points.length < 2) return;
      const first = points[0];
      const tip = points[points.length - 1];

      tracePath(now);
      ctx.lineTo(xOf(tip.t, now), HEIGHT);
      ctx.lineTo(xOf(first.t, now), HEIGHT);
      ctx.closePath();
      const grad = ctx.createLinearGradient(0, PAD_Y, 0, HEIGHT);
      grad.addColorStop(0, "rgba(63,181,116,0.30)");
      grad.addColorStop(1, "rgba(63,181,116,0)");
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.save();
      ctx.shadowColor = "rgba(34,165,94,0.35)";
      ctx.shadowBlur = 8;
      tracePath(now);
      ctx.strokeStyle = LINE;
      ctx.lineWidth = 2.5;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.stroke();
      ctx.restore();

      const dx = xOf(tip.t, now);
      const dy = yOf(tip.v);
      const halo = ctx.createRadialGradient(dx, dy, 0, dx, dy, 18);
      halo.addColorStop(0, GLOW);
      halo.addColorStop(1, "rgba(34,165,94,0)");
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(dx, dy, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(dx, dy, 4, 0, Math.PI * 2);
      ctx.fillStyle = LINE;
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgba(255,255,255,0.9)";
      ctx.stroke();
    };

    // Alternate between a rising phase and a flat plateau. The slope eases
    // toward its target so corners round off, and during a flat it snaps to
    // exactly 0 once close — giving genuinely horizontal plateaus. The slope
    // never goes negative, so the line only ever holds or climbs.
    const advance = (nowT: number, dt: number) => {
      if (nowT >= nextChange) {
        rising = !rising;
        targetSlope = rising ? rand(RISE_MIN, RISE_MAX) : 0;
        nextChange = nowT + (rising ? rand(700, 1300) : rand(900, 1600));
      }
      const k = (dt / 16.7) * (rising ? 0.06 : 0.16);
      slope += (targetSlope - slope) * k;
      if (!rising && slope < 0.25) slope = 0;
      value += (slope * dt) / 1000;
    };

    const step = (now: number) => {
      if (!last) last = now;
      const dt = Math.min(now - last, 50);
      last = now;

      advance(now, dt);
      points.push({ t: now, v: value });
      tipV = value;
      while (points.length > 2 && points[0].t < now - WIN - 200) points.shift();

      render(now);
      raf = requestAnimationFrame(step);
    };

    const start = () => {
      if (running || reduced) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(step);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    // Seed a full window of history (using the same phase machine) so the
    // up/flat pattern is already visible on first paint.
    const t0 = performance.now();
    nextChange = t0 - WIN;
    for (let vt = t0 - WIN; vt <= t0; vt += 25) {
      advance(vt, 25);
      points.push({ t: vt, v: value });
    }
    tipV = value;
    render(t0);

    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? start() : stop()),
      { threshold: 0 },
    );
    io.observe(canvas);
    window.addEventListener("resize", resize);

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full max-w-[440px] [mask-image:linear-gradient(to_right,transparent,#000_10%)]"
      style={{ height: HEIGHT }}
      aria-hidden="true"
    />
  );
}

export default function AlwaysOptimisingSection() {
  return (
    <div className="w-full min-w-0">
      <div className="h-[340px] flex items-center justify-center">
        <RisingChart />
      </div>
      <div className="p-6 flex flex-col gap-1">
        <div className="flex items-center gap-1">
          <TrendingUpIcon
            className="w-4.5 h-4.5 text-[#737373]"
            strokeWidth={1.5}
          />
          <div className="font-medium text-[14px]">Always optimising</div>
        </div>
        <div className="text-[#52525b] text-[13px] leading-[1.35]">
          Your agents never sit still — testing creatives, shifting budget, and
          refining bids around the clock to push every campaign toward its best
          possible outcome.
        </div>
      </div>
    </div>
  );
}
