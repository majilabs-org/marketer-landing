"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import {
  CheckIcon,
  Link2Icon,
  LoaderIcon,
  SparklesIcon,
  UserPlusIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import LogoIcon from "@/src/components/logo-icon";
import metaLogo from "@/src/assets/connect/meta.svg";
import googleLogo from "@/src/assets/connect/google.svg";
import slackLogo from "@/src/assets/connect/slack.svg";
import snapchatLogo from "@/src/assets/connect/snapchat.svg";
import chatgptLogo from "@/src/assets/connect/chatgpt.svg";

const PILL_SHADOW =
  "0px 0px 0px 1px rgba(9,9,11,0.05),0px 1px 2px 0px rgba(9,9,11,0.05)";
const EASE = [0.22, 1, 0.36, 1] as const;

function SignUpVisual({ play }: { play: boolean }) {
  return (
    <div className="relative flex h-12 items-center justify-center gap-2.5 overflow-hidden rounded-full bg-[#fafafa] border border-[#fff] px-6 text-[15px] font-medium text-[#18181b] shadow-[0px_0px_0px_1px_rgba(9,9,11,0.08),0px_1px_2px_-1px_rgba(9,9,11,0.08),0px_2px_4px_0px_rgba(9,9,11,0.04)]">
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-[0px_0px_0px_1px_rgba(9,9,11,0.06)]">
        <img
          src={googleLogo.src}
          alt=""
          className="h-3.5 w-3.5 object-contain"
        />
      </span>
      Sign in with google
      {play && (
        <motion.span
          className="pointer-events-none absolute inset-y-0 w-16 skew-x-[-20deg] bg-white/50"
          initial={{ left: "-40%" }}
          animate={{ left: "140%" }}
          transition={{
            duration: 1.1,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 2.6,
          }}
        />
      )}
    </div>
  );
}

const PLATFORMS = [
  { name: "Meta", src: metaLogo.src },
  { name: "Google", src: googleLogo.src },
  { name: "Slack", src: slackLogo.src },
  { name: "Snapchat", src: snapchatLogo.src },
  { name: "ChatGPT Ads", src: chatgptLogo.src },
];

function ConnectVisual({ play }: { play: boolean }) {
  const [connected, setConnected] = useState(() =>
    play ? 0 : PLATFORMS.length,
  );

  useEffect(() => {
    if (!play) return;
    let n = 0;
    const id = window.setInterval(() => {
      n = n > PLATFORMS.length + 2 ? 0 : n + 1;
      setConnected(Math.min(n, PLATFORMS.length));
    }, 850);
    return () => window.clearInterval(id);
  }, [play]);

  return (
    <div className="flex w-full max-w-[300px] flex-col gap-2">
      {PLATFORMS.map((p, i) => {
        const isConnected = i < connected;
        return (
          <div
            key={p.name}
            className="flex h-11 items-center gap-3 rounded-xl bg-white px-3.5"
            style={{ boxShadow: PILL_SHADOW }}
          >
            <img
              src={p.src}
              alt=""
              className="h-4.5 w-4.5 shrink-0 object-contain"
            />
            <div className="flex-1 text-[13px] font-medium text-[#18181b]">
              {p.name}
            </div>
            <div className="flex items-center gap-1.5 text-[12px] font-medium">
              <AnimatePresence mode="wait" initial={false}>
                {isConnected ? (
                  <motion.div
                    key="connected"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, ease: EASE }}
                    className="flex items-center gap-1.5 text-[#15803d]"
                  >
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#15803d]/12">
                      <CheckIcon className="h-3 w-3" strokeWidth={2.5} />
                    </span>
                    Connected
                  </motion.div>
                ) : (
                  <motion.div
                    key="connecting"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-1.5 text-[#a1a1aa]"
                  >
                    <LoaderIcon
                      className="h-3.5 w-3.5 animate-spin"
                      strokeWidth={2}
                    />
                    Connecting
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ChatVisual({ play }: { play: boolean }) {
  const [phase, setPhase] = useState(() => (play ? 0 : 3));

  useEffect(() => {
    if (!play) return;
    let timers: number[] = [];
    const schedule = () => {
      timers.push(window.setTimeout(() => setPhase(1), 600));
      timers.push(window.setTimeout(() => setPhase(2), 1600));
      timers.push(window.setTimeout(() => setPhase(3), 2800));
    };
    schedule();
    const loop = window.setInterval(() => {
      timers.forEach(clearTimeout);
      timers = [];
      setPhase(0);
      schedule();
    }, 7200);
    return () => {
      timers.forEach(clearTimeout);
      window.clearInterval(loop);
    };
  }, [play]);

  return (
    <div className="flex h-[232px] w-full max-w-[300px] flex-col justify-center gap-3">
      <div className="flex justify-end">
        <AnimatePresence>
          {phase >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="max-w-[80%] rounded-2xl rounded-br-md bg-[#27272a] px-3.5 py-2 text-[13px] font-medium text-white/92"
            >
              How did we do this weekend?
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative h-[150px]">
        <AnimatePresence>
          {phase === 2 && (
            <motion.div
              key="typing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="absolute left-0 top-0 flex items-center gap-2"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#18181b]">
                <LogoIcon className="h-2.5 w-3.5 text-white" />
              </span>
              <span
                className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-white px-3 py-2.5"
                style={{ boxShadow: PILL_SHADOW }}
              >
                {[0, 1, 2].map((d) => (
                  <motion.span
                    key={d}
                    className="h-1.5 w-1.5 rounded-full bg-[#a1a1aa]"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: d * 0.18,
                    }}
                  />
                ))}
              </span>
            </motion.div>
          )}

          {phase >= 3 && (
            <motion.div
              key="answer"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="absolute inset-x-0 top-0"
            >
              <div className="mb-1.5 flex items-center gap-1.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#18181b]">
                  <LogoIcon className="h-2.5 w-3.5 text-white" />
                </span>
                <span className="text-[13px] font-semibold text-[#18181b]">
                  Marketer
                </span>
                <span className="text-[12px] text-[#a1a1aa]">04:31</span>
              </div>
              <div
                className="rounded-2xl rounded-tl-md bg-white p-3.5"
                style={{ boxShadow: PILL_SHADOW }}
              >
                <div className="text-[13px] leading-[1.5] text-[#18181b]">
                  Revenue <span className="font-semibold">$18.4k</span> at{" "}
                  <span className="font-semibold">3.1x ROAS</span>, up 22% on
                  last weekend.
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <div className="rounded-lg bg-[#18181b] px-2.5 py-1.5 text-[12px] font-medium text-white/90">
                    Increase spend with 15%
                  </div>
                  <div
                    className="rounded-lg bg-white px-3 py-1.5 text-[12px] font-medium text-[#18181b]"
                    style={{ boxShadow: PILL_SHADOW }}
                  >
                    Edit
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

const STEPS = [
  {
    icon: UserPlusIcon,
    title: "Sign up",
    desc: "Google, email, or phone. You're in, in seconds — no credit card, no setup call.",
    Visual: SignUpVisual,
  },
  {
    icon: Link2Icon,
    title: "Connect your accounts",
    desc: "Link Meta, Google, Snapchat, and OpenAI. Add Slack to run it all from the chat.",
    Visual: ConnectVisual,
  },
  {
    icon: SparklesIcon,
    title: "Ask a question or tell it what to do",
    desc: "Type what you want, like “pause my worst ads” — it answers back, or gets to work.",
    Visual: ChatVisual,
  },
] as const;

function StepColumn({
  icon: Icon,
  title,
  desc,
  last,
  play,
  Visual,
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
  last?: boolean;
  play: boolean;
  Visual: (props: { play: boolean }) => React.ReactNode;
}) {
  return (
    <div
      className={`w-full min-w-0 ${last ? "" : "border-r border-[#e4e4e7]"}`}
    >
      <div className="flex h-[340px] items-center justify-center overflow-hidden px-6">
        <Visual key={play ? "play" : "idle"} play={play} />
      </div>
      <div className="flex flex-col gap-1 p-6">
        <div className="flex items-center gap-1">
          <Icon className="h-4.5 w-4.5 text-[#737373]" strokeWidth={1.5} />
          <div className="text-[14px] font-medium">{title}</div>
        </div>
        <div className="text-[13px] leading-[1.35] text-[#52525b]">{desc}</div>
      </div>
    </div>
  );
}

export default function SetUpInMinutesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-15% 0px -15% 0px" });
  const reduced = useReducedMotion();
  const play = inView && !reduced;

  return (
    <div className="overflow-hidden">
      <div className="border-t border-[#e4e4e7] h-[2px] bg-white" />
      <div
        ref={ref}
        className="w-full flex-1 max-w-[1200px] mx-auto relative border-l border-r border-[#e4e4e7]"
      >
        <div className="px-6 pb-11 pt-14 lg:px-8">
          <div className="text-[34px] font-medium leading-[1.05] tracking-[-1px] lg:text-[44px] text-center">
            <span className="text-[#18181b] text-center">
              Set up in minutes.
            </span>
            <br />
            <span className="text-[#737373] text-center">
              Working from day one.
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 border-t border-[#e4e4e7]">
          {STEPS.map((s, i) => (
            <StepColumn
              key={s.title}
              icon={s.icon}
              title={s.title}
              desc={s.desc}
              Visual={s.Visual}
              last={i === STEPS.length - 1}
              play={play}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
