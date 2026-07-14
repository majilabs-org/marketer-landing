"use client";

import { useEffect, useRef } from "react";
import metaLogo from "@/src/assets/connect/meta.svg";
import googleLogo from "@/src/assets/connect/google.svg";
import chatgptLogo from "@/src/assets/connect/chatgpt.svg";
import snapchatLogo from "@/src/assets/connect/snapchat.svg";
import shopifyLogo from "@/src/assets/connect/shopify.svg";
import wayflyerLogo from "@/src/assets/connect/wayflyer.svg";
import klaviyoLogo from "@/src/assets/connect/klaviyo.svg";

const LOGO_SRCS = [
  metaLogo,
  googleLogo,
  chatgptLogo,
  snapchatLogo,
  shopifyLogo,
  wayflyerLogo,
  klaviyoLogo,
].map((img) => img.src);

const BADGE_D = 68;
const ICON_BOX = BADGE_D * 0.38;
const DOT_R = 2;
const SPEED = 55;

const BADGE_SHADOW =
  "0 0 0 1px #0e3f7e0a,0 1px 1px -.5px #2a33450a,0 3px 3px -1.5px #2a33460a,0 6px 6px -3px #2a33460a,0 12px 12px -6px #0e3f7e0a,0 24px 24px -12px #0e3f7e0a";
const PILL_SHADOW = "0 0 0 1px rgba(9,9,11,.08)";

const LOGO_VB = { w: 26, h: 18 };
const LOGO_PATHS = [
  "M3.54801 10.8789C1.58245 10.8789 0 12.4628 0 14.4302C0 16.3976 1.5991 17.9815 3.54801 17.9815C5.49692 17.9815 7.09603 16.381 7.09603 14.4302C7.09603 12.4795 5.49692 10.8789 3.54801 10.8789Z",
  "M18.8894 0.0253906L15.1914 8.31179H15.2081C15.2081 8.29511 18.6229 15.9813 18.6229 15.9813C19.3724 17.6819 21.3713 18.4656 23.0537 17.7153C24.7528 16.965 25.5356 14.9643 24.7861 13.2803L18.8894 0.0253906Z",
  "M11.1745 2.02146C10.4249 0.304159 8.42606 -0.462791 6.74367 0.287486C5.04462 1.03776 4.26172 3.0385 5.0113 4.72246L10.908 17.9774L14.6059 9.69097H14.5892C14.5892 9.70764 11.1745 2.02146 11.1745 2.02146Z",
];

const INFINITY_PATH =
  "M361.927 190.175C324.884 227.275 264.826 227.275 227.782 190.175C190.739 153.075 190.739 92.9247 227.782 55.8249C264.826 18.725 324.884 18.725 361.927 55.8249L439 133L496.073 190.175C533.116 227.275 593.175 227.275 630.218 190.175C667.261 153.075 667.261 92.9247 630.218 55.8249C593.175 18.7251 533.116 18.7251 496.073 55.8249L361.927 190.175Z";

function DotMatrixLogo({ size = 104 }: { size?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(size * dpr);
    canvas.height = Math.round(size * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const inner = size * 0.56;
    const scale = inner / LOGO_VB.w;
    const logoW = LOGO_VB.w * scale;
    const logoH = LOGO_VB.h * scale;

    const SS = 2;
    const off = document.createElement("canvas");
    off.width = Math.max(1, Math.ceil(logoW * SS));
    off.height = Math.max(1, Math.ceil(logoH * SS));
    const octx = off.getContext("2d");
    if (!octx) return;
    octx.scale(SS * scale, SS * scale);
    octx.fillStyle = "#000";
    for (const d of LOGO_PATHS) octx.fill(new Path2D(d));
    const px = octx.getImageData(0, 0, off.width, off.height).data;

    const GRID = 3.6;
    const offX = (size - logoW) / 2;
    const offY = (size - logoH) / 2;
    const dots: { x: number; y: number; d: number }[] = [];
    for (let y = GRID / 2; y < logoH; y += GRID) {
      for (let x = GRID / 2; x < logoW; x += GRID) {
        const sx = Math.min(off.width - 1, Math.floor(x * SS));
        const sy = Math.min(off.height - 1, Math.floor(y * SS));
        if (px[(sy * off.width + sx) * 4 + 3] > 128) {
          dots.push({ x: offX + x, y: offY + y, d: x + y });
        }
      }
    }
    if (!dots.length) return;

    const xs = dots.map((p) => p.x);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);

    const EDGE = 7;
    const FILL = 1600;
    const HOLD = 650;
    const FADE = 500;
    const CYCLE = FILL + HOLD + FADE;
    const GREEN = [96, 198, 134];

    const paint = (litOf: (p: { x: number; y: number }) => number) => {
      ctx.clearRect(0, 0, size, size);
      for (const p of dots) {
        const e = litOf(p);
        const r = 1.5;
        const cr = Math.round(24 + (GREEN[0] - 24) * e);
        const cg = Math.round(24 + (GREEN[1] - 24) * e);
        const cb = Math.round(27 + (GREEN[2] - 27) * e);
        ctx.beginPath();
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${0.16 + 0.84 * e})`;
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      paint(() => 1);
      return;
    }

    let raf = 0;
    const frame = (t: number) => {
      const tc = t % CYCLE;
      let litOf: (p: { x: number }) => number;
      if (tc < FILL) {
        const front = minX - EDGE + ((maxX - minX + EDGE * 2) * tc) / FILL;
        litOf = (p) => Math.max(0, Math.min(1, (front - p.x) / EDGE));
      } else if (tc < FILL + HOLD) {
        litOf = () => 1;
      } else {
        const fp = (tc - FILL - HOLD) / FADE;
        litOf = () => 1 - fp;
      }
      paint(litOf);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [size]);

  return (
    <canvas
      ref={ref}
      style={{ width: size, height: size }}
      aria-hidden="true"
    />
  );
}

export default function ConnectYourAccounts() {
  const pathRef = useRef<SVGPathElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    const canvas = canvasRef.current;
    if (!path || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const logos = LOGO_SRCS.map((src) => {
      const im = new Image();
      im.src = src;
      return im;
    });

    const total = path.getTotalLength();
    const cache = new Map<number, DOMPoint>();
    const at = (t: number) => {
      const k = Math.floor(t);
      let p = cache.get(k);
      if (!p) {
        p = path.getPointAtLength(t);
        cache.set(k, p);
      }
      return p;
    };

    const n = logos.length;
    const step = total / n;
    const logoPos = logos.map((_, i) => i * step);
    const dotPos = logos.map((_, i) => (i + 0.5) * step);

    // The canvas is inset by 16px on each side (see the wrapper), so path
    // points (in SVG space) are shifted by +16 to land in canvas space.
    const drawBadge = (img: HTMLImageElement, pos: number) => {
      const p = at(pos);
      const cx = p.x + 16;
      const cy = p.y + 16;
      const r = BADGE_D / 2;

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
      ctx.restore();

      ctx.beginPath();
      ctx.arc(cx, cy, r - 0.5, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(9,9,11,0.08)";
      ctx.lineWidth = 1;
      ctx.stroke();

      if (img.complete && img.naturalWidth) {
        const scale = Math.min(
          ICON_BOX / img.naturalWidth,
          ICON_BOX / img.naturalHeight,
        );
        const iw = img.naturalWidth * scale;
        const ih = img.naturalHeight * scale;
        ctx.drawImage(img, cx - iw / 2, cy - ih / 2, iw, ih);
      }
    };

    const drawDot = (pos: number) => {
      const p = at(pos);
      ctx.beginPath();
      ctx.arc(p.x + 16, p.y + 16, DOT_R, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(9,9,11,0.18)";
      ctx.fill();
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      for (let i = 0; i < n; i++) {
        drawDot(dotPos[i]);
        drawBadge(logos[i], logoPos[i]);
      }
    };

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let raf = 0;
    let last = 0;
    let running = false;

    const frame = (now: number) => {
      if (!last) last = now;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      for (let i = 0; i < n; i++) {
        logoPos[i] = (logoPos[i] + SPEED * dt) % total;
        dotPos[i] = (dotPos[i] + SPEED * dt) % total;
      }
      render();
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running || reduced) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    render();
    logos.forEach((img) => {
      img.addEventListener("load", render, { once: true });
    });

    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 },
    );
    observer.observe(canvas);

    window.addEventListener("resize", resize);

    return () => {
      stop();
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="relative mx-auto w-[calc(100%-20px)] max-w-[960px] max-[900px]:overflow-hidden">
      <div className="relative mx-auto h-[246px] w-[857px] max-w-full">
        <div className="absolute left-0 top-1/2 h-[200px] w-[200px] -translate-y-1/2 rounded-full border border-[rgba(9,9,11,0.08)] [mask-image:linear-gradient(to_right,transparent,#000_65%)] [-webkit-mask-image:linear-gradient(to_right,transparent,#000_65%)]" />
        <div className="absolute right-0 top-1/2 h-[200px] w-[200px] -translate-y-1/2 rounded-full border border-[rgba(9,9,11,0.08)] [mask-image:linear-gradient(to_left,transparent,#000_65%)] [-webkit-mask-image:linear-gradient(to_left,transparent,#000_65%)]" />

        <div className="absolute left-1/2 top-0 h-[246px] w-[858px] -translate-x-1/2">
          <svg
            width="858"
            height="246"
            viewBox="0 0 858 246"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="block"
          >
            <path
              ref={pathRef}
              d={INFINITY_PATH}
              className="stroke-[rgba(9,9,11,0.08)]"
            />
          </svg>
          <canvas
            ref={canvasRef}
            className="absolute left-[-16px] top-[-16px] h-[calc(100%+32px)] w-[calc(100%+32px)]"
            aria-hidden="true"
          />
        </div>

        <div
          className="absolute left-1/2 top-1/2 z-10 flex h-[104px] w-[104px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/72 text-[#18181b] backdrop-blur-[10px]"
          style={{ boxShadow: BADGE_SHADOW }}
        >
          <DotMatrixLogo size={104} />
        </div>
      </div>

      <div className="relative mt-13 text-center">
        <div className="mb-2 text-[20px] font-medium leading-[24px] text-[#18181b]">
          Connect all your accounts
        </div>
        <div className="mx-auto max-w-[472px] text-[16px] leading-[22px] text-[#52525b]">
          Link every ad platform once — Meta, Google, TikTok, and more — and let
          your agents run them from a single place, 24/7.
        </div>
      </div>
    </div>
  );
}
