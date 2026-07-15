"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BellRingIcon } from "lucide-react";
import slackLogo from "@/src/assets/connect/slack.svg";
import LogoIcon from "@/src/components/logo-icon";

type Status = "hidden" | "in" | "ongoing" | "done";

const EASE = [0.6, 0.6, 0, 1] as const;
const ORANGE = "#F96816";

const TASKS: { keyword: string; rest: React.ReactNode }[] = [
  { keyword: "If", rest: <>&nbsp;&ldquo;Monday, 8 AM&rdquo;</> },
  {
    keyword: "And",
    rest: <>&nbsp;&ldquo;Blended ROAS&rdquo; &gt; 3.0x</>,
  },
  { keyword: "Then", rest: <>&nbsp;&ldquo;Send Slack brief&rdquo;</> },
];

const INDENT = [74, 102, 130];

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.9987 1.33203C4.3168 1.33203 1.33203 4.3168 1.33203 7.9987C1.33203 11.6806 4.3168 14.6654 7.9987 14.6654C11.6806 14.6654 14.6654 11.6806 14.6654 7.9987C14.6654 4.3168 11.6806 1.33203 7.9987 1.33203ZM10.5147 6.75421C10.7478 6.46925 10.7058 6.04923 10.4209 5.81608C10.1359 5.58293 9.71588 5.62493 9.48273 5.90989L6.94921 9.00642L6.13677 8.19398C5.87642 7.93363 5.45431 7.93363 5.19396 8.19398C4.93361 8.45433 4.93361 8.87644 5.19396 9.13679L6.52729 10.4701C6.66048 10.6033 6.84379 10.6739 7.03191 10.6646C7.22003 10.6552 7.3954 10.5667 7.51467 10.4209L10.5147 6.75421Z"
        fill={ORANGE}
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.17" stroke={ORANGE} strokeWidth="1.5" />
      <motion.g
        style={{ transformOrigin: "8px 8px" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
      >
        <path
          d="M8 5.16V8"
          stroke={ORANGE}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </motion.g>
      <path
        d="M6 8H8"
        stroke={ORANGE}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TaskItem({
  keyword,
  rest,
  status,
  indent,
}: {
  keyword: string;
  rest: React.ReactNode;
  status: Status;
  indent: number;
}) {
  const shown = status !== "hidden";
  return (
    <motion.div
      className="mb-1 flex w-max items-center rounded-[6px] bg-[#fafafa] py-px pl-2 pr-1.5 font-mono text-[13px] leading-[24px] text-[#3f3f46] shadow-[0_0_0_1px_rgba(9,9,11,0.05)]"
      style={{ marginLeft: indent }}
      initial={false}
      animate={{
        opacity: shown ? 1 : 0,
        x: shown ? 0 : -10,
      }}
      transition={{ duration: 0.45, ease: EASE }}
    >
      <span style={{ color: ORANGE }}>{keyword}</span>
      <span>{rest}</span>
      <span className="relative ml-1 inline-flex size-4 items-center justify-center">
        <AnimatePresence mode="wait">
          {status === "ongoing" && (
            <motion.span
              key="clock"
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(4px)" }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <ClockIcon />
            </motion.span>
          )}
          {status === "done" && (
            <motion.span
              key="check"
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <CheckIcon />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </motion.div>
  );
}

function Paths({ drawn }: { drawn: boolean[] }) {
  const D = [
    "M1.5 1.5L19.4853 19.4853C21.7357 21.7357 24.788 23 27.9706 23H55",
    "M1 1L47.4853 47.4853C49.7357 49.7357 52.788 51 55.9706 51H83",
    "M1 1L75.4853 75.4853C77.7357 77.7357 80.788 79 83.9706 79H111",
  ];
  return (
    <svg
      className="absolute left-1 top-0.5"
      width="111"
      height="80"
      viewBox="0 0 111 80"
      fill="none"
    >
      {D.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke="#e4e4e7"
          strokeWidth={1}
          initial={false}
          animate={{ pathLength: drawn[i] ? 1 : 0 }}
          transition={{ duration: 1, ease: EASE }}
        />
      ))}
    </svg>
  );
}

function SlackCard() {
  return (
    <div className="flex gap-3 rounded-[12px] bg-white/85 p-3 pb-4 shadow-[0_1px_2px_rgba(9,9,11,0.06),0_4px_6px_rgba(9,9,11,0.04),0_24px_40px_-16px_rgba(9,9,11,0.10)] backdrop-blur">
      <div className="size-8 shrink-0 rounded-[7px] bg-gradient-to-br from-[#2f6f4f] to-[#11271F] flex items-center justify-center shadow-[0_1px_2px_rgba(17,39,31,0.35)]">
        <LogoIcon className="w-[17px] h-auto text-white" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-1.5 leading-none">
          <span className="text-[13.5px] font-semibold text-[#18181b]">
            Marketer
          </span>
          <span className="rounded-[3px] bg-[#e4e4e7] px-1 py-px text-[9px] font-semibold leading-[13px] tracking-wide text-[#52525b]">
            APP
          </span>
          <span className="text-[11px] text-[#a1a1aa]">8:01 AM</span>
        </div>
        <div className="text-[13.5px] leading-[1.45] text-[#3f3f46]">
          Your weekly brief is in. Blended ROAS crossed{" "}
          <b className="font-semibold text-[#18181b]">3.0x</b> — up 14% from
          last week. 6 losing adsets paused, budget moved to winners. 🚀
        </div>
      </div>
      <img src={slackLogo.src} alt="" className="size-5 shrink-0 opacity-90" />
    </div>
  );
}

function useSequence() {
  const [task, setTask] = useState(false);
  const [paths, setPaths] = useState([false, false, false]);
  const [items, setItems] = useState<Status[]>(["hidden", "hidden", "hidden"]);
  const [slack, setSlack] = useState(false);
  const [shift, setShift] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    let cancelled = false;
    const sleep = (ms: number) =>
      new Promise<void>((res) => {
        timers.current.push(setTimeout(res, ms));
      });
    const path = (i: number) =>
      setPaths((p) => p.map((v, k) => (k === i ? true : v)));
    const item = (i: number, s: Status) =>
      setItems((p) => p.map((v, k) => (k === i ? s : v)));
    const reset = () => {
      setTask(false);
      setPaths([false, false, false]);
      setItems(["hidden", "hidden", "hidden"]);
      setSlack(false);
      setShift(false);
    };

    async function loop() {
      while (!cancelled) {
        reset();
        await sleep(450);
        if (cancelled) return;
        setTask(true);
        await sleep(450);

        path(0);
        await sleep(450);
        item(0, "in");
        await sleep(450);
        item(0, "ongoing");
        await sleep(1500);
        item(0, "done");

        path(1);
        await sleep(450);
        item(1, "in");
        await sleep(450);
        item(1, "done");

        path(2);
        await sleep(450);
        item(2, "in");
        await sleep(450);

        setShift(true);
        setSlack(true);
        await sleep(2400);
      }
    }
    loop();

    return () => {
      cancelled = true;
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, []);

  return { task, paths, items, slack, shift };
}

function RuleBuilder() {
  const { task, paths, items, slack, shift } = useSequence();

  return (
    <div
      className="relative w-full max-w-[420px] overflow-hidden"
      style={{
        WebkitMaskImage:
          "linear-gradient(180deg, rgba(0,0,0,0) 0%, #000 22%, #000 100%)",
        maskImage:
          "linear-gradient(180deg, rgba(0,0,0,0) 0%, #000 22%, #000 100%)",
      }}
    >
      <motion.div
        className="px-2 pt-12"
        animate={{ y: shift ? -92 : 0 }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        <motion.div
          className="relative h-[108px] w-full rounded-[12px] bg-white/85 px-3 pt-3 shadow-[0_1px_2px_rgba(9,9,11,0.06),0_4px_6px_rgba(9,9,11,0.04),0_24px_40px_-16px_rgba(9,9,11,0.10)] backdrop-blur"
          initial={false}
          animate={{
            opacity: task ? 1 : 0,
            y: task ? 0 : 10,
            scale: task ? 1 : 0.9,
            filter: task ? "blur(0px)" : "blur(10px)",
          }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          <Paths drawn={paths} />
          <div className="relative">
            {TASKS.map((t, i) => (
              <TaskItem
                key={i}
                keyword={t.keyword}
                rest={t.rest}
                status={items[i]}
                indent={INDENT[i]}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-2"
          initial={false}
          animate={{
            opacity: slack ? 1 : 0,
            y: slack ? 0 : 10,
            scale: slack ? 1 : 0.9,
            filter: slack ? "blur(0px)" : "blur(10px)",
          }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          <SlackCard />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function RobustAlertingCard() {
  return (
    <div className="w-full min-w-0">
      <div className="flex h-[340px] items-center justify-center overflow-hidden px-6">
        <RuleBuilder />
      </div>
      <div className="flex flex-col gap-1 p-6">
        <div className="flex items-center gap-1">
          <BellRingIcon
            className="h-4.5 w-4.5 text-[#737373]"
            strokeWidth={1.5}
          />
          <div className="text-[14px] font-medium">Robust alerting</div>
        </div>
        <div className="text-[13px] leading-[1.35] text-[#52525b]">
          Whether you need recurring briefs or advanced conditions on spend and
          ROAS, build the rule once and your agents deliver it straight to
          Slack.
        </div>
      </div>
    </div>
  );
}
