"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { HashIcon } from "lucide-react";
import slackLogo from "@/src/assets/connect/slack.svg";
import LogoIcon from "@/src/components/logo-icon";

type Phase = "blank" | "question" | "typing" | "answer";

const SCRIPT: { phase: Phase; hold: number }[] = [
  { phase: "blank", hold: 700 },
  { phase: "question", hold: 1300 },
  { phase: "typing", hold: 1100 },
  { phase: "answer", hold: 4600 },
  { phase: "blank", hold: 900 },
];

const METRICS: { dot: string; text: React.ReactNode }[] = [
  {
    dot: "#22c55e",
    text: (
      <>
        Spend <b className="font-semibold text-[#18181b]">$82.4k/day</b> ·
        blended ROAS <b className="font-semibold text-[#18181b]">3.8x</b> —
        ahead of the 3.2x target
      </>
    ),
  },
  {
    dot: "#3b82f6",
    text: (
      <>
        Moved <b className="font-semibold text-[#18181b]">$4.2k</b> into 3
        winning Google campaigns overnight
      </>
    ),
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const BADGE_SHADOW =
  "0px 0px 0px 1px rgba(9,9,11,0.08),0px 1px 2px -1px rgba(9,9,11,0.08),0px 2px 4px 0px rgba(9,9,11,0.04)";

function usePhaseLoop() {
  const [phase, setPhase] = useState<Phase>("blank");

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    let i = 0;

    const step = () => {
      if (cancelled) return;
      const { phase: p, hold } = SCRIPT[i];
      setPhase(p);
      i = (i + 1) % SCRIPT.length;
      timer = setTimeout(step, hold);
    };
    step();

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  return phase;
}

function Avatar({ kind }: { kind: "user" | "app" }) {
  if (kind === "user")
    return (
      <div
        className="size-8 shrink-0 rounded-[7px] bg-[#fafafa] flex items-center justify-center text-[11px] font-semibold text-[#52525b]"
        style={{ boxShadow: BADGE_SHADOW }}
      >
        EM
      </div>
    );
  return (
    <div className="size-8 shrink-0 rounded-[7px] bg-gradient-to-br from-[#2f6f4f] to-[#11271F] flex items-center justify-center shadow-[0_1px_2px_rgba(17,39,31,0.35)]">
      <LogoIcon className="w-[17px] h-auto text-white" />
    </div>
  );
}

function Message({
  kind,
  name,
  time,
  app,
  children,
}: {
  kind: "user" | "app";
  name: string;
  time: string;
  app?: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="flex gap-2.5 px-4"
      initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, filter: "blur(4px)" }}
      transition={{ duration: 0.4, ease: EASE }}
    >
      <Avatar kind={kind} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5 leading-none">
          <span className="text-[13.5px] font-semibold text-[#18181b]">
            {name}
          </span>
          {app && (
            <span className="rounded-[3px] bg-[#e4e4e7] px-1 py-px text-[9px] font-semibold leading-[13px] tracking-wide text-[#52525b]">
              APP
            </span>
          )}
          <span className="text-[11px] text-[#a1a1aa]">{time}</span>
        </div>
        <div className="mt-1 text-[13.5px] leading-[1.5] text-[#3f3f46]">
          {children}
        </div>
      </div>
    </motion.div>
  );
}

function InlineDots() {
  return (
    <motion.div
      className="flex h-5 items-center gap-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="size-1.5 rounded-full bg-[#a1a1aa]"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
          transition={{
            duration: 0.9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.15,
          }}
        />
      ))}
    </motion.div>
  );
}

function AnswerBody() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div>Here&rsquo;s how the account&rsquo;s tracking right now:</div>
      <motion.ul
        className="mt-2 flex flex-col gap-1.5"
        initial="hidden"
        animate="show"
        variants={{
          show: { transition: { staggerChildren: 0.14, delayChildren: 0.08 } },
        }}
      >
        {METRICS.map((m, i) => (
          <motion.li
            key={i}
            className="flex items-start gap-2"
            variants={{
              hidden: { opacity: 0, y: 6, filter: "blur(4px)" },
              show: { opacity: 1, y: 0, filter: "blur(0px)" },
            }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <span
              className="mt-[6px] size-1.5 shrink-0 rounded-full"
              style={{ background: m.dot }}
            />
            <span className="text-[13px] leading-[1.5] text-[#52525b]">
              {m.text}
            </span>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}

function Conversation({ phase }: { phase: Phase }) {
  const showQuestion = phase !== "blank";
  const showAssistant = phase === "typing" || phase === "answer";

  return (
    <div className="flex h-[240px] flex-col gap-4 py-4">
      <AnimatePresence>
        {showQuestion && (
          <Message key="q" kind="user" name="Emil" time="9:41 AM">
            How are we operating?
          </Message>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAssistant && (
          <Message key="a" kind="app" name="Marketer" time="9:41 AM" app>
            <AnimatePresence mode="wait">
              {phase === "typing" ? (
                <InlineDots key="dots" />
              ) : (
                <AnswerBody key="body" />
              )}
            </AnimatePresence>
          </Message>
        )}
      </AnimatePresence>
    </div>
  );
}

function SlackWindow() {
  const phase = usePhaseLoop();
  return (
    <div className="w-full max-w-[420px] overflow-hidden rounded-[12px] bg-white shadow-[0_0_0_1px_rgba(9,9,11,0.07),0_12px_28px_-32px_rgba(9,9,11,0.18),0_4px_10px_-6px_rgba(9,9,11,0.08)]">
      <div className="flex h-9 items-center gap-3 border-b border-[#ededf0] bg-[#f7f7f8] px-3.5">
        <div className="flex gap-[6px]">
          <span className="size-[9px] rounded-full bg-[#e5e5e8]" />
          <span className="size-[9px] rounded-full bg-[#e5e5e8]" />
          <span className="size-[9px] rounded-full bg-[#e5e5e8]" />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="flex items-center gap-1.5 rounded-[6px] bg-white px-2.5 py-1 shadow-[0_0_0_1px_rgba(9,9,11,0.05)]">
            <img src={slackLogo.src} alt="" className="size-3" />
            <span className="text-[11px] font-medium text-[#71717a]">
              Marketer HQ
            </span>
          </div>
        </div>
        <div className="w-9" />
      </div>

      <div className="flex h-9 items-center gap-1.5 border-b border-[#f0f0f2] px-4">
        <HashIcon className="size-3.5 text-[#a1a1aa]" strokeWidth={2.25} />
        <span className="text-[13px] font-semibold text-[#18181b]">
          marketing-ops
        </span>
      </div>

      <Conversation phase={phase} />
    </div>
  );
}

export default function AskOnSlackSection() {
  return (
    <div className="w-full min-w-0">
      <div className="flex h-[340px] items-center justify-center overflow-hidden px-6">
        <SlackWindow />
      </div>
      <div className="flex flex-col gap-1 p-6">
        <div className="flex items-center gap-1">
          <img src={slackLogo.src} alt="" className="size-4" />
          <div className="text-[14px] font-medium">Ask on Slack</div>
        </div>
        <div className="text-[13px] leading-[1.35] text-[#52525b]">
          Ask how the account is doing right where you already work. Your agents
          answer in Slack with the numbers that matter — spend, ROAS, and what
          changed overnight.
        </div>
      </div>
    </div>
  );
}
