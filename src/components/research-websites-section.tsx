"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const HEAT = "#F96816";

const STEPS = [
  "Fetching landing page...",
  "Scanning page content",
  "Extracting insights...",
  "Ready to optimize",
];

const URL = "acme-store.com/pricing";

function useTypewriter(text: string, speed = 26) {
  const [out, setOut] = useState("");
  useEffect(() => {
    setOut("");
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) window.clearInterval(id);
    }, speed);
    return () => window.clearInterval(id);
  }, [text, speed]);
  return out;
}

function setTimeoutOnVisible({
  callback,
  element,
  timeout,
}: {
  callback: () => void;
  element: Element | null;
  timeout: number;
}) {
  if (!element) return;
  let timer = 0;
  const obs = new IntersectionObserver(
    ([entry]) => {
      window.clearTimeout(timer);
      if (entry.isIntersecting) timer = window.setTimeout(callback, timeout);
    },
    { threshold: 0 },
  );
  obs.observe(element);
  return () => {
    window.clearTimeout(timer);
    obs.disconnect();
  };
}

function EyebrowIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 3.125C7.58375 3.125 5.625 5.08375 5.625 7.5C5.625 9.14062 6.5625 10.5625 7.91667 11.25V12.5C7.91667 12.8452 8.19649 13.125 8.54167 13.125H11.4583C11.8035 13.125 12.0833 12.8452 12.0833 12.5V11.25C13.4375 10.5625 14.375 9.14062 14.375 7.5C14.375 5.08375 12.4162 3.125 10 3.125Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.64"
        strokeWidth="1.25"
      />
      <path
        d="M8.125 15.625H11.875M8.75 17.5H11.25"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.64"
        strokeWidth="1.25"
      />
    </svg>
  );
}

function StatusIcon({ finished }: { finished: boolean }) {
  return (
    <span className="relative flex size-20 items-center justify-center">
      <AnimatePresence mode="wait" initial={false}>
        {finished ? (
          <motion.svg
            key="check"
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 24 }}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <circle cx="10" cy="10" r="8" fill={HEAT} />
            <path
              d="M6.5 10.2 9 12.5 13.5 7.5"
              stroke="#fff"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        ) : (
          <motion.span
            key="spinner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, rotate: 360 }}
            exit={{ opacity: 0 }}
            transition={{
              rotate: { duration: 0.7, repeat: Infinity, ease: "linear" },
            }}
            className="block size-14 rounded-full"
            style={{
              border: "2px solid rgba(0,0,0,0.1)",
              borderTopColor: HEAT,
            }}
          />
        )}
      </AnimatePresence>
    </span>
  );
}

function WireframeSvg({ children }: { children: React.ReactNode }) {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      fill="none"
      preserveAspectRatio="xMinYMin slice"
      viewBox="0 0 240 180"
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
}

function GreyWireframe() {
  return (
    <WireframeSvg>
      <circle cx="22" cy="20" r="10" fill="black" fillOpacity="0.04" />
      <rect
        x="38"
        y="11"
        width="70"
        height="8"
        rx="4"
        fill="black"
        fillOpacity="0.05"
      />
      <rect
        x="38"
        y="23"
        width="42"
        height="5"
        rx="2.5"
        fill="black"
        fillOpacity="0.03"
      />
      <rect
        x="114"
        y="11"
        width="28"
        height="8"
        rx="4"
        fill="black"
        fillOpacity="0.03"
      />
      <rect
        x="146"
        y="11"
        width="22"
        height="8"
        rx="4"
        fill="black"
        fillOpacity="0.03"
      />
      <rect
        x="0"
        y="38"
        width="240"
        height="1"
        fill="black"
        fillOpacity="0.05"
      />
      <rect
        x="12"
        y="50"
        width="120"
        height="6"
        rx="3"
        fill="black"
        fillOpacity="0.04"
      />
      <rect
        x="12"
        y="62"
        width="128"
        height="6"
        rx="3"
        fill="black"
        fillOpacity="0.04"
      />
      <rect
        x="12"
        y="74"
        width="110"
        height="6"
        rx="3"
        fill="black"
        fillOpacity="0.04"
      />
      <rect
        x="152"
        y="48"
        width="76"
        height="50"
        rx="4"
        fill="black"
        fillOpacity="0.03"
      />
      <rect
        x="12"
        y="86"
        width="128"
        height="6"
        rx="3"
        fill="black"
        fillOpacity="0.04"
      />
      <rect
        x="12"
        y="106"
        width="200"
        height="6"
        rx="3"
        fill="black"
        fillOpacity="0.04"
      />
      <rect
        x="12"
        y="118"
        width="180"
        height="6"
        rx="3"
        fill="black"
        fillOpacity="0.04"
      />
      <rect
        x="12"
        y="130"
        width="160"
        height="6"
        rx="3"
        fill="black"
        fillOpacity="0.04"
      />
      <rect
        x="12"
        y="142"
        width="190"
        height="6"
        rx="3"
        fill="black"
        fillOpacity="0.04"
      />
      <rect
        x="12"
        y="154"
        width="100"
        height="6"
        rx="3"
        fill="black"
        fillOpacity="0.04"
      />
    </WireframeSvg>
  );
}

function OrangeWireframe() {
  return (
    <WireframeSvg>
      <rect
        x="12"
        y="14"
        width="120"
        height="8"
        rx="4"
        fill={HEAT}
        fillOpacity="0.1"
      />
      <rect
        x="12"
        y="34"
        width="210"
        height="6"
        rx="3"
        fill={HEAT}
        fillOpacity="0.07"
      />
      <rect
        x="12"
        y="48"
        width="195"
        height="6"
        rx="3"
        fill={HEAT}
        fillOpacity="0.07"
      />
      <rect
        x="12"
        y="62"
        width="216"
        height="6"
        rx="3"
        fill={HEAT}
        fillOpacity="0.07"
      />
      <rect
        x="12"
        y="76"
        width="180"
        height="6"
        rx="3"
        fill={HEAT}
        fillOpacity="0.07"
      />
      <rect
        x="12"
        y="90"
        width="205"
        height="6"
        rx="3"
        fill={HEAT}
        fillOpacity="0.07"
      />
      <rect
        x="12"
        y="104"
        width="140"
        height="6"
        rx="3"
        fill={HEAT}
        fillOpacity="0.07"
      />
      <rect
        x="0"
        y="120"
        width="240"
        height="1"
        fill={HEAT}
        fillOpacity="0.05"
      />
      <rect
        x="12"
        y="130"
        width="50"
        height="5"
        rx="2.5"
        fill={HEAT}
        fillOpacity="0.12"
      />
      <rect
        x="68"
        y="130"
        width="72"
        height="5"
        rx="2.5"
        fill={HEAT}
        fillOpacity="0.08"
      />
      <rect
        x="12"
        y="143"
        width="40"
        height="5"
        rx="2.5"
        fill={HEAT}
        fillOpacity="0.12"
      />
      <rect
        x="58"
        y="143"
        width="54"
        height="5"
        rx="2.5"
        fill={HEAT}
        fillOpacity="0.08"
      />
      <rect
        x="12"
        y="156"
        width="44"
        height="5"
        rx="2.5"
        fill={HEAT}
        fillOpacity="0.08"
      />
      <rect
        x="62"
        y="156"
        width="64"
        height="5"
        rx="2.5"
        fill={HEAT}
        fillOpacity="0.08"
      />
    </WireframeSvg>
  );
}

function StatusPill({
  step,
  setStep,
  sectionRef,
}: {
  step: number;
  setStep: (n: number) => void;
  sectionRef: React.RefObject<HTMLDivElement | null>;
}) {
  const text = useTypewriter(STEPS[step]);
  const last = step === STEPS.length - 1;

  useEffect(() => {
    const cleanup = setTimeoutOnVisible({
      callback: () => setStep(last ? 0 : step + 1),
      element: sectionRef.current,
      timeout: last ? 3000 : 2000,
    });
    return () => cleanup?.();
  }, [step, last, setStep, sectionRef]);

  return (
    <motion.div
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="relative flex w-max items-center gap-1.5 rounded-full bg-[#fdfdfd] p-1.5 pr-3"
      style={{
        boxShadow: "0px 0px 0px 8px #fdfdfd, 0 0 0 1px rgba(0,0,0,0.04)",
      }}
    >
      <StatusIcon finished={step >= 3} />
      <span className="block min-w-0 flex-1 font-mono text-[13px] leading-none text-[#18181b]">
        {text}
        <span className="ml-px inline-block h-[13px] w-px translate-y-0.5 animate-pulse bg-[#18181b]/40" />
      </span>
    </motion.div>
  );
}

function BrowserBody() {
  const [step, setStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const scanning = step === 2;
  const done = step >= 3;

  return (
    <div ref={sectionRef} className="absolute inset-1.5">
      <motion.div
        className="relative h-full w-full overflow-hidden rounded-2xl transition-all duration-300"
        animate={{
          boxShadow: scanning
            ? `0px 0px 0px 1.5px ${HEAT}, 0px 0px 12px 0px rgba(250,93,25,0.1)`
            : "0px 40px 48px -20px rgba(0,0,0,0.02), 0px 32px 32px -20px rgba(0,0,0,0.03), 0px 16px 24px -12px rgba(0,0,0,0.03), 0px 0px 0px 1px rgba(0,0,0,0.03)",
        }}
        style={{ background: "rgba(255,255,255,0.72)" }}
      >
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: done ? 0 : 1 }}
          transition={{ duration: 0.35 }}
        >
          <GreyWireframe />
          {step === 0 && (
            <motion.div
              className="pointer-events-none absolute inset-0"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 1.2, ease: "linear", repeat: Infinity }}
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.03) 40%, rgba(0,0,0,0.06) 50%, rgba(0,0,0,0.03) 60%, transparent 100%)",
              }}
            />
          )}
        </motion.div>

        <AnimatePresence>
          {scanning && (
            <motion.div
              className="pointer-events-none absolute left-0 z-[1] h-10 w-full"
              initial={{ top: "-20%" }}
              animate={{ top: "100%" }}
              exit={{ opacity: 0 }}
              transition={{
                top: { duration: 0.8, ease: "linear", repeat: Infinity },
                opacity: { duration: 0.2 },
              }}
              style={{
                opacity: 0.12,
                background: `linear-gradient(to bottom, transparent, ${HEAT} 50%, transparent)`,
              }}
            />
          )}
        </AnimatePresence>

        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: done ? 1 : 0 }}
          transition={{ duration: 0.35 }}
        >
          <OrangeWireframe />
        </motion.div>

        <div className="absolute bottom-4 z-[2] flex w-full justify-center">
          <StatusPill step={step} setStep={setStep} sectionRef={sectionRef} />
        </div>
      </motion.div>
    </div>
  );
}

export default function ResearchWebsitesSection() {
  return (
    <div>
      <div className="border-t border-[#e4e4e7] h-[2px] bg-white" />
      <div className="w-full flex-1 max-w-[1200px] mx-auto relative border-l border-r border-[#e4e4e7]">
        <div className="w-full border-b border-[#e4e4e7] p-8 lg:pt-16 lg:pb-16">
          <div className="mb-4 flex items-center gap-2 text-sm font-medium text-black/64 lg:justify-center">
            <span className="text-[#18181b]">
              <EyebrowIcon />
            </span>
            Research that runs itself
          </div>
          <div className="text-lg text-black/64 lg:mx-auto lg:max-w-[420px] lg:text-center">
            <span className="font-medium text-[#18181b]">
              Your agent reads every page,
            </span>{" "}
            from your own site to your competitors, to sharpen every campaign.
          </div>
        </div>

        <div className="relative z-[3] mx-auto max-w-[420px] px-8 py-12 lg:px-0">
          <div className="relative flex h-9 overflow-hidden rounded-t-xl border border-b-0 border-[#e4e4e7]">
            <div className="flex h-full items-center gap-2.5 border-r border-[#e4e4e7] px-[15px]">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="size-3 rounded-full"
                  style={{ boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.12)" }}
                />
              ))}
            </div>
            <div className="flex h-full items-center px-3">
              <span className="text-sm text-black/32">{URL}</span>
            </div>
          </div>

          <div className="relative h-[220px] overflow-hidden rounded-b-xl border border-[#e4e4e7]">
            <BrowserBody />
          </div>
        </div>
      </div>
    </div>
  );
}
