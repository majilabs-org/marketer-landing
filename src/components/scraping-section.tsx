"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const SLOTS = [
  { y: 0, scale: 1 },
  { y: -16, scale: 0.95 },
  { y: -30, scale: 0.9 },
  { y: -42, scale: 0.855 },
];

const CARD_W = 348;
const CARD_H = 220;

const SHEEN = "inset 0px 0px 0px .5px rgba(255,255,255,0.85)";
const SHADOWS = [
  `0px 24px 32px -12px rgba(0,0,0,0.05), 0px 12px 20px -8px rgba(0,0,0,0.04), 0px 0px 0px .5px rgba(0,0,0,0.10), ${SHEEN}`,
  `0px 16px 26px -12px rgba(0,0,0,0.04), 0px 8px 16px -8px rgba(0,0,0,0.03), 0px 0px 0px .5px rgba(0,0,0,0.08), ${SHEEN}`,
  `0px 10px 20px -12px rgba(0,0,0,0.03), 0px 6px 12px -8px rgba(0,0,0,0.025), 0px 0px 0px .5px rgba(0,0,0,0.07), ${SHEEN}`,
  `0px 6px 14px -10px rgba(0,0,0,0.025), 0px 4px 8px -6px rgba(0,0,0,0.02), 0px 0px 0px .5px rgba(0,0,0,0.06), ${SHEEN}`,
];

const TRANSITION = { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const };

const SLUGS = [
  "/pricing",
  "/docs/guide",
  "/blog/launch",
  "/about",
  "/careers",
  "/products/api",
  "/changelog",
  "/use-cases",
  "/templates",
  "/customers",
];
const randomSlug = () => SLUGS[Math.floor(Math.random() * SLUGS.length)];

const DONE = "rgba(24,24,27,0.22)";
const DEPTHS = {
  strong: "rgba(0,0,0,0.12)",
  base: "rgba(0,0,0,0.06)",
  faint: "rgba(0,0,0,0.05)",
} as const;

type Depth = keyof typeof DEPTHS;

function Block({
  complete,
  depth = "base",
  className,
}: {
  complete: boolean;
  depth?: Depth;
  className?: string;
}) {
  return (
    <motion.div
      className={`rounded-[2px] ${className ?? ""}`}
      animate={{ backgroundColor: complete ? DONE : DEPTHS[depth] }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    />
  );
}

function Variant({
  variant,
  complete,
}: {
  variant: number;
  complete: boolean;
}) {
  if (variant === 0) {
    return (
      <div className="flex flex-col gap-3 h-full">
        <div className="flex items-center justify-between">
          <Block
            complete={complete}
            depth="strong"
            className="h-[7px] w-1/3 rounded-full"
          />
          <Block
            complete={complete}
            depth="faint"
            className="h-[12px] w-[38px] rounded-full"
          />
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="flex flex-col gap-1.5">
              <Block
                complete={complete}
                depth="faint"
                className="h-[4px] w-2/3"
              />
              <Block
                complete={complete}
                depth="strong"
                className="h-[8px] w-1/2"
              />
            </div>
          ))}
        </div>
        <Block
          complete={complete}
          depth="base"
          className="flex-1 w-full rounded-[6px]"
        />
        <div className="flex gap-2.5">
          <Block
            complete={complete}
            depth="faint"
            className="h-[4px] w-[44px]"
          />
          <Block
            complete={complete}
            depth="faint"
            className="h-[4px] w-[56px]"
          />
          <Block
            complete={complete}
            depth="faint"
            className="h-[4px] w-[32px]"
          />
        </div>
      </div>
    );
  }
  if (variant === 1) {
    return (
      <div className="flex flex-col gap-2.5 h-full">
        <div className="flex items-center justify-between">
          <Block
            complete={complete}
            depth="strong"
            className="h-[7px] w-2/5 rounded-full"
          />
          <Block
            complete={complete}
            depth="faint"
            className="h-[12px] w-[40px] rounded-full"
          />
        </div>
        <Block complete={complete} depth="faint" className="h-px w-full" />
        <div className="flex-1 flex flex-col justify-between py-0.5">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Block
                complete={complete}
                depth="strong"
                className="size-[10px] rounded-full shrink-0"
              />
              <Block
                complete={complete}
                depth="base"
                className="h-[5px] flex-1"
              />
              <Block
                complete={complete}
                depth="faint"
                className="h-[5px] w-[52px]"
              />
              <Block
                complete={complete}
                depth="strong"
                className="h-[5px] w-[26px]"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="flex items-center justify-between">
        <Block
          complete={complete}
          depth="strong"
          className="h-[7px] w-1/3 rounded-full"
        />
        <Block
          complete={complete}
          depth="faint"
          className="h-[12px] w-[38px] rounded-full"
        />
      </div>
      <div className="grid grid-cols-3 gap-2.5 flex-1">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <Block
              complete={complete}
              depth="strong"
              className="h-[6px] w-2/3"
            />
            <Block
              complete={complete}
              depth="base"
              className="flex-1 w-full rounded-[6px]"
            />
            <Block
              complete={complete}
              depth="faint"
              className="h-[5px] w-1/2"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function CardInner({
  slug,
  variant,
  complete,
}: {
  slug: string;
  variant: number;
  complete: boolean;
}) {
  return (
    <>
      <div
        className="flex items-center border-b border-[rgba(0,0,0,0.06)]"
        style={{ height: 40 }}
      >
        <div className="px-3.5 flex gap-[7px] border-r border-[rgba(0,0,0,0.06)] items-center h-full">
          {Array.from({ length: 3 }, (_, i) => (
            <span
              key={i}
              className="size-2.5 rounded-full border border-[rgba(0,0,0,0.12)]"
            />
          ))}
        </div>
        <div className="px-3.5 flex items-center gap-2 h-full flex-1 min-w-0">
          <div className="size-4 rounded-[4px] bg-[rgba(0,0,0,0.05)] shrink-0" />
          <span className="font-mono text-[12px] leading-none text-[rgba(0,0,0,0.32)] truncate">
            https://example.com{slug}
          </span>
        </div>
      </div>
      <div className="relative p-4" style={{ height: 180 }}>
        <Variant variant={variant} complete={complete} />
      </div>
    </>
  );
}

function Card({
  level,
  slug,
  variant,
}: {
  level: number;
  slug: string;
  variant: number;
}) {
  const slot = SLOTS[Math.min(level, SLOTS.length - 1)];
  const shadow = SHADOWS[Math.min(level, SHADOWS.length - 1)];
  const [complete, setComplete] = useState(() => level > 0);

  useEffect(() => {
    if (complete || level !== 0) return;
    const t = setTimeout(() => setComplete(true), 650);
    return () => clearTimeout(t);
  }, [complete, level]);

  return (
    <motion.div
      className="absolute rounded-[12px] bg-white overflow-hidden"
      style={{
        width: CARD_W,
        height: CARD_H,
        left: "50%",
        top: "50%",
        marginLeft: -CARD_W / 2,
        marginTop: -CARD_H / 2,
        zIndex: 40 - level,
      }}
      initial={{ y: 26, scale: 0.965, opacity: 0, boxShadow: shadow }}
      animate={{ y: slot.y, scale: slot.scale, opacity: 1, boxShadow: shadow }}
      exit={{
        opacity: 0,
        y: -56,
        scale: 0.82,
        transition: { duration: 0.5, ease: "easeIn" },
      }}
      transition={TRANSITION}
    >
      <CardInner slug={slug} variant={variant} complete={complete} />
    </motion.div>
  );
}

type Item = { id: number; level: number; slug: string; variant: number };

function Deck() {
  const [items, setItems] = useState<Item[]>(() =>
    Array.from({ length: 4 }, (_, t) => ({
      id: t,
      level: 3 - t,
      slug: randomSlug(),
      variant: t % 3,
    })),
  );
  const nextId = useRef(4);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;
    const tick = () => {
      setItems((prev) => {
        const shifted = prev
          .map((it) => ({ ...it, level: it.level + 1 }))
          .filter((it) => it.level <= 3);
        const id = nextId.current++;
        return [
          { id, level: 0, slug: randomSlug(), variant: id % 3 },
          ...shifted,
        ];
      });
    };
    const start = () => {
      if (!timer && !document.hidden) timer = setInterval(tick, 1700);
    };
    const stop = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence>
        {items.map((it) => (
          <Card
            key={it.id}
            level={it.level}
            slug={it.slug}
            variant={it.variant}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

function EyebrowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"
        stroke="currentColor"
        strokeOpacity="0.64"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ScrapingSection() {
  return (
    <div>
      <div className="border-t border-[#e4e4e7] h-[2px] bg-white" />
      <div className="w-full flex-1 max-w-[1200px] mx-auto relative border-l border-r border-[#e4e4e7]">
        <div className="w-full border-b border-[#e4e4e7] p-8 lg:pt-16 lg:pb-16">
          <div className="mb-4 flex items-center gap-2 text-sm font-medium text-black/64 lg:justify-center">
            <span className="text-[#18181b]">
              <EyebrowIcon />
            </span>
            Scrape at scale
          </div>
          <div className="text-lg text-black/64 lg:mx-auto lg:max-w-[420px] lg:text-center">
            <span className="font-medium text-[#18181b]">
              Every page, turned into clean data
            </span>{" "}
            — your agent scrapes any site and structures it in seconds.
          </div>
        </div>

        <div className="relative flex justify-center px-8 py-14">
          <div className="relative h-[380px] w-full max-w-[500px]">
            <Deck />
          </div>
        </div>
      </div>
    </div>
  );
}
