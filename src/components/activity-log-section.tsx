"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ClipboardClockIcon,
  ClipboardIcon,
  SparklesIcon,
  SquareTerminalIcon,
} from "lucide-react";
import metaLogo from "@/src/assets/connect/meta.svg";
import googleLogo from "@/src/assets/connect/google.svg";
import slackLogo from "@/src/assets/connect/slack.svg";

type IconKind = "terminal" | "meta" | "google" | "slack" | "sparkles" | "you";
type Tag = "Auto" | "Slack" | "You";
type Entry = { icon: IconKind; text: string; tag: Tag };

const POOL: Entry[] = [
  { icon: "terminal", text: "Paused 2 fatigued adsets", tag: "Auto" },
  { icon: "meta", text: "Shifted $400 to the winning adset", tag: "Auto" },
  { icon: "google", text: "Cleaned 12 negative keywords on PMax", tag: "Auto" },
  { icon: "slack", text: "Morning brief landed in Slack", tag: "Slack" },
  { icon: "you", text: "You approved one call", tag: "You" },
  {
    icon: "sparkles",
    text: "4 new ads live across Meta and Google",
    tag: "Auto",
  },
  { icon: "meta", text: "Boosted budget on 3 top campaigns", tag: "Auto" },
  { icon: "google", text: "Synced fresh audiences to Google Ads", tag: "Auto" },
  { icon: "slack", text: "Sent the weekly recap to Slack", tag: "Slack" },
  { icon: "sparkles", text: "Launched 2 new creative tests", tag: "Auto" },
];

const VISIBLE = 6;
const TICK_MS = 2800;
const ROW_H = 54;
const START_MIN = 9 * 60 + 14;
const STEP_MIN = 8;
// Keep only enough rows to fill the visible area plus a small buffer for the
// ones fading out under the mask. Fewer clipped rows below the fold also means
// less for browser scroll-anchoring to react to (see [overflow-anchor:none]).
const MAX = 9;

const fmt = (mins: number) => {
  const h = Math.floor(mins / 60) % 24;
  const m = ((mins % 60) + 60) % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
};

type Row = Entry & { id: number; time: string };

function IconMark({ icon }: { icon: IconKind }) {
  const ring =
    "relative z-10 size-6 rounded-full bg-white flex items-center justify-center shrink-0 shadow-[0_0_0_1px_rgba(9,9,11,0.06),0_1px_2px_rgba(9,9,11,0.05)]";
  if (icon === "you")
    return (
      <div className="relative z-10 size-6 rounded-full bg-[#fafafa] flex items-center justify-center shrink-0 text-[8.5px] font-semibold tracking-tight text-[#52525b] shadow-[0px_0px_0px_1px_rgba(9,9,11,0.08),0px_1px_2px_-1px_rgba(9,9,11,0.08),0px_2px_4px_0px_rgba(9,9,11,0.04)]">
        EM
      </div>
    );
  if (icon === "terminal")
    return (
      <div className={ring}>
        <SquareTerminalIcon
          className="w-3.5 h-3.5 text-[#3f3f46]"
          strokeWidth={1.75}
        />
      </div>
    );
  if (icon === "sparkles")
    return (
      <div className={ring}>
        <SparklesIcon
          className="w-3.5 h-3.5 text-[#3f3f46]"
          strokeWidth={1.75}
        />
      </div>
    );
  const src =
    icon === "meta"
      ? metaLogo.src
      : icon === "google"
        ? googleLogo.src
        : slackLogo.src;
  return (
    <div className={ring}>
      <img src={src} alt="" className="w-3.5 h-3.5 object-contain" />
    </div>
  );
}

function Badge({ tag }: { tag: Tag }) {
  if (tag === "You")
    return (
      <span className="rounded-md bg-white px-2.5 py-1 text-[12px] font-medium text-[#3f3f46] shadow-[0_0_0_1px_rgba(9,9,11,0.08)]">
        You
      </span>
    );
  return (
    <span className="rounded-md bg-[#60c686]/15 px-2.5 py-1 text-[12px] font-medium text-[#2f9e5f]">
      {tag}
    </span>
  );
}

function ActivityRow({ row }: { row: Row }) {
  return (
    <div
      className="relative flex items-center gap-3 px-6"
      style={{ height: ROW_H }}
    >
      <div
        className={`w-[42px] shrink-0 text-right font-mono text-[12px] tabular-nums ${
          row.tag === "You" ? "text-[#18181b]" : "text-[#3f8f63]"
        }`}
      >
        {row.time}
      </div>
      <div className="relative flex w-6 shrink-0 self-stretch items-center justify-center">
        <div className="absolute top-0 bottom-0 w-px bg-[#60c686]/25" />
        <IconMark icon={row.icon} />
      </div>
      <div className="min-w-0 flex-1 truncate text-[14px] text-[#18181b]">
        {row.text}
      </div>
      {/* <Badge tag={row.tag} /> */}
    </div>
  );
}

function makeInitial(): Row[] {
  return Array.from({ length: VISIBLE }, (_, i) => ({
    id: -i,
    time: fmt(START_MIN - i * STEP_MIN),
    ...POOL[i % POOL.length],
  }));
}

function Feed() {
  const [rows, setRows] = useState<Row[]>(makeInitial);
  const next = useRef({ idx: VISIBLE, mins: START_MIN + STEP_MIN });

  useEffect(() => {
    const id = window.setInterval(() => {
      setRows((prev) => {
        const { idx, mins } = next.current;
        next.current = { idx: idx + 1, mins: mins + STEP_MIN };
        const row: Row = {
          id: idx,
          time: fmt(mins),
          ...POOL[idx % POOL.length],
        };
        return [row, ...prev].slice(0, MAX);
      });
    }, TICK_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="h-[340px] overflow-hidden pt-4 [overflow-anchor:none] [mask-image:linear-gradient(to_bottom,#000_60%,transparent_96%)]">
      <AnimatePresence initial={false}>
        {rows.map((row) => (
          <motion.div
            key={row.id}
            layout
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <ActivityRow row={row} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default function ActivityLogSection() {
  return (
    <div className="w-full min-w-0 border-r border-[#e4e4e7]">
      <Feed />
      <div className="p-6 flex flex-col gap-1">
        <div className="flex items-center gap-1">
          <ClipboardClockIcon
            className="w-4.5 h-4.5 text-[#737373]"
            strokeWidth={1.5}
          />
          <div className="font-medium text-[14px]">Activity log</div>
        </div>
        <div className="text-[#52525b] text-[13px] leading-[1.35]">
          A live feed of every move your agents make — pausing, reallocating,
          launching, and reporting — so nothing ever happens off the record.
        </div>
      </div>
    </div>
  );
}
