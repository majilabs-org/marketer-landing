"use client";

import { SparklesIcon } from "lucide-react";
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const ACTIVE = "rgba(24,24,27,0.22)";
const BORDER = "#e4e4e7";

const TONES = {
  strong: "rgba(0,0,0,0.09)",
  base: "rgba(0,0,0,0.06)",
  faint: "rgba(0,0,0,0.04)",
} as const;
type Tone = keyof typeof TONES;

const TARGETS = ["header-title", "sidebar", "footer-primary"] as const;
type TargetId = (typeof TARGETS)[number];

const SPRING = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  mass: 1,
} as const;

function Block({
  active,
  blockRef,
  tone = "base",
  className,
}: {
  active?: boolean;
  blockRef?: (el: HTMLDivElement | null) => void;
  tone?: Tone;
  className?: string;
}) {
  return (
    <div
      ref={blockRef}
      aria-hidden
      className={`relative z-0 rounded-[2px] transition-colors duration-150 ${className ?? ""}`}
      style={{ backgroundColor: active ? ACTIVE : TONES[tone] }}
    />
  );
}

function Skeleton({
  activeId,
  register,
}: {
  activeId: TargetId | null;
  register: (id: TargetId) => (el: HTMLDivElement | null) => void;
}) {
  return (
    <div className="relative z-0 flex h-full flex-col gap-3">
      <div className="flex items-center gap-2.5">
        <Block tone="strong" className="size-[22px] shrink-0 rounded-[6px]" />
        <Block
          active={activeId === "header-title"}
          blockRef={register("header-title")}
          tone="strong"
          className="h-[11px] flex-1 rounded-full"
        />
        <Block tone="base" className="size-[22px] shrink-0 rounded-full" />
      </div>

      <div className="flex min-h-0 flex-1 gap-3">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <Block tone="base" className="w-full flex-1 rounded-[6px]" />
          <div className="flex items-center gap-2">
            <Block tone="base" className="h-[6px] flex-1" />
            <Block tone="faint" className="h-[6px] w-1/3" />
          </div>
        </div>
        <div className="flex w-[96px] shrink-0 flex-col gap-2">
          <Block
            active={activeId === "sidebar"}
            blockRef={register("sidebar")}
            tone="strong"
            className="h-[46px] w-full rounded-[6px]"
          />
          <Block tone="base" className="h-[6px] w-full" />
          <Block tone="faint" className="h-[6px] w-2/3" />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Block
          active={activeId === "footer-primary"}
          blockRef={register("footer-primary")}
          tone="base"
          className="h-[22px] w-[66px] rounded-[6px]"
        />
        <Block tone="faint" className="h-[22px] w-[46px] rounded-[6px]" />
        <div className="flex-1" />
        <Block tone="faint" className="h-[22px] w-[30px] rounded-[6px]" />
      </div>
    </div>
  );
}

function Cursor({ x, y }: { x: MotionValue<number>; y: MotionValue<number> }) {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute left-0 top-0 z-[90]"
      style={{ x, y }}
    >
      <svg
        width="19"
        height="24"
        viewBox="0 0 15 19"
        fill="none"
        className="drop-shadow-sm"
      >
        <path
          d="M1 1L1 16L5.5 12L12 12L1 1Z"
          fill="#262626"
          stroke="white"
          strokeWidth="1.35"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}

function AgentTag({
  x,
  y,
}: {
  x: MotionValue<number>;
  y: MotionValue<number>;
}) {
  const left = useTransform(x, (v) => v + 18);
  const top = useTransform(y, (v) => v + 20);
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute left-0 top-0 z-[100] flex items-center rounded-[8px] px-2 py-[5px] whitespace-nowrap"
      style={{
        x: left,
        y: top,
        background: "#262626",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      }}
    >
      <span className="text-[9px] font-medium leading-none text-white">
        Ox Agent
      </span>
    </motion.div>
  );
}

function AgentCanvas() {
  const surfaceRef = useRef<HTMLDivElement>(null);
  const blockRefs = useRef<Map<TargetId, HTMLDivElement>>(new Map());
  const positions = useRef<{ x: number; y: number }[]>([]);
  const settled = useRef<TargetId>(TARGETS[0]);
  const moving = useRef<TargetId | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [activeId, setActiveId] = useState<TargetId | null>(TARGETS[0]);
  const [ready, setReady] = useState(false);

  const register = (id: TargetId) => (el: HTMLDivElement | null) => {
    if (el) blockRefs.current.set(id, el);
    else blockRefs.current.delete(id);
  };

  const computeActive = () => {
    const surface = surfaceRef.current;
    if (!surface) return;
    const rect = surface.getBoundingClientRect();
    const cx = rect.left + x.get();
    const cy = rect.top + y.get();
    const isOver = (id: TargetId | null) => {
      if (!id) return false;
      const el = blockRefs.current.get(id);
      if (!el) return false;
      const o = el.getBoundingClientRect();
      return cx >= o.left && cx <= o.right && cy >= o.top && cy <= o.bottom;
    };
    const m = moving.current;
    if (m) {
      setActiveId(
        isOver(m) ? m : isOver(settled.current) ? settled.current : null,
      );
    } else {
      setActiveId(settled.current);
    }
  };

  useMotionValueEvent(x, "change", computeActive);
  useMotionValueEvent(y, "change", computeActive);

  useLayoutEffect(() => {
    const measure = () => {
      const surface = surfaceRef.current;
      if (!surface) return;
      const rect = surface.getBoundingClientRect();
      positions.current = TARGETS.map((id) => {
        const el = blockRefs.current.get(id);
        if (!el) return { x: 0, y: 0 };
        const r = el.getBoundingClientRect();
        return {
          x: r.left + r.width / 2 - rect.left,
          y: r.top + r.height / 2 - rect.top,
        };
      });
    };
    measure();
    const first = positions.current[0] ?? { x: 0, y: 0 };
    x.set(first.x);
    y.set(first.y);
    settled.current = TARGETS[0];
    setActiveId(TARGETS[0]);
    setReady(true);

    const ro = new ResizeObserver(measure);
    if (surfaceRef.current) ro.observe(surfaceRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!ready) return;
    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const wait = (ms: number) =>
      new Promise<void>((res) => {
        const id = setTimeout(() => {
          if (!cancelled) res();
        }, ms);
        timeouts.push(id);
      });
    const moveTo = async (id: TargetId, pos: { x: number; y: number }) => {
      moving.current = id;
      computeActive();
      await Promise.all([animate(x, pos.x, SPRING), animate(y, pos.y, SPRING)]);
      moving.current = null;
      settled.current = id;
      computeActive();
    };

    (async () => {
      let t = 0;
      while (!cancelled) {
        settled.current = TARGETS[t];
        computeActive();
        await wait(820);
        if (cancelled) return;
        const next = (t + 1) % TARGETS.length;
        await moveTo(TARGETS[next], positions.current[next] ?? { x: 0, y: 0 });
        if (cancelled) return;
        t = next;
      }
    })();

    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, [ready]);

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-visible px-6 py-5">
      <div className="relative flex w-full max-w-[380px] flex-col overflow-visible">
        <div
          className="overflow-visible rounded-[14px] border bg-[#f7f7f8] p-2.5"
          style={{ borderColor: BORDER }}
        >
          <div
            ref={surfaceRef}
            className="relative isolate h-[208px] overflow-visible rounded-[10px] border bg-white p-3.5"
            style={{ borderColor: BORDER }}
          >
            <Skeleton activeId={activeId} register={register} />
            <Cursor x={x} y={y} />
            <AgentTag x={x} y={y} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AgentRunsAccountSection() {
  return (
    <div className="w-full min-w-0">
      <div className="h-[340px]">
        <AgentCanvas />
      </div>

      <div className="p-6 flex flex-col gap-1">
        <div className="flex items-center gap-1">
          <SparklesIcon
            className="w-4.5 h-4.5 text-[#737373]"
            strokeWidth={1.5}
          />
          <div className="font-medium text-[14px]">Runs in your account</div>
        </div>
        <div className="text-[#52525b] text-[13px] leading-[1.35]">
          Your agent works inside your account, clicking through every campaign
          like a human would.
        </div>
      </div>
    </div>
  );
}
