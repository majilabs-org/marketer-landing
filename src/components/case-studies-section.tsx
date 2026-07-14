"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import client1Img from "@/src/assets/clients/client-1.svg";
import client2Img from "@/src/assets/clients/client-2.svg";
import client3Img from "@/src/assets/clients/client-3.svg";

const EASE = [0.22, 1, 0.36, 1] as const;

const SWITCH_MS = 160;
const REVEAL_MS = 320;
const REVEAL_MS_MOBILE = 280;

const EXPAND = { duration: 0.36, ease: EASE } as const;

const SLIDE: Variants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir >= 0 ? 28 : -28,
    filter: "blur(4px)",
  }),
  center: { opacity: 1, x: 0, filter: "blur(0px)" },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir >= 0 ? -28 : 28,
    filter: "blur(4px)",
  }),
};

const NOISE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>`.replace(
      "%23n",
      "#n",
    ),
  );

type CaseStudy = {
  logo: { src: string };
  company: string;
  author: string;
  quote: string;
};

const caseStudies: CaseStudy[] = [
  {
    logo: client1Img,
    company: "Mitsubishi Motors",
    author: "Bob Kinney, VP Growth",
    quote:
      "The agents pause our losing campaigns before we'd even notice them — we've cut wasted spend by 34% in a quarter.",
  },
  {
    logo: client2Img,
    company: "Eight Sleep",
    author: "Ana Ruiz, Head of Performance",
    quote:
      "It scaled our best-performing Meta ads overnight and doubled ROAS while we slept.",
  },
  {
    logo: client3Img,
    company: "Spar",
    author: "Kenji Sato, Marketing Director",
    quote:
      "Running Google, Meta, and Snapchat used to take a team of five. Now the agents handle it 24/7.",
  },
];

function useAccordion(revealMs: number) {
  const [active, setActive] = useState(0);
  const [showContent, setShowContent] = useState(true);
  const [direction, setDirection] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const list = timers.current;
    return () => list.forEach(clearTimeout);
  }, []);

  const select = (i: number) => {
    if (i === active) return;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setShowContent(false);
    setDirection(i > active ? 1 : -1);
    setPrevious(active);
    timers.current.push(
      setTimeout(() => setActive(i), SWITCH_MS),
      setTimeout(() => {
        setShowContent(true);
        setPrevious(null);
      }, revealMs),
    );
  };

  return { active, showContent, direction, previous, select };
}

function QuoteMark() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_ii_3879_1051)">
        <path
          d="M12.465 24C12.465 25.6569 11.1219 27 9.46504 27H3C1.34315 27 0 25.6569 0 24L0 16.7835C0 15.7859 0.287483 14.8095 0.828037 13.971L6.42026 5.29723C6.53971 5.11195 6.74508 5 6.96554 5L10.7794 5C11.2778 5 11.5901 5.5387 11.3424 5.97122L6.26224 14.8413L9.46504 14.8413C11.1219 14.8413 12.465 16.1844 12.465 17.8413V24ZM29.5 24C29.5 25.6569 28.1569 27 26.5 27H20.035C18.3781 27 17.035 25.6569 17.035 24L17.035 16.7835C17.035 15.7859 17.3224 14.8095 17.863 13.971L23.4552 5.29723C23.5747 5.11195 23.78 5 24.0005 5L27.8143 5C28.3128 5 28.625 5.5387 28.3773 5.97122L23.2972 14.8413H26.5C28.1569 14.8413 29.5 16.1844 29.5 17.8413L29.5 24Z"
          fill="#F3F3F4"
          fillOpacity="0.9"
        />
      </g>
      <defs>
        <filter
          id="filter0_ii_3879_1051"
          x="0"
          y="5"
          width="29.5"
          height="23"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="1.5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0745098 0 0 0 0 0.0745098 0 0 0 0 0.0862745 0 0 0 0.18 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_3879_1051"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="-1" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_innerShadow_3879_1051"
            result="effect2_innerShadow_3879_1051"
          />
        </filter>
      </defs>
    </svg>
  );
}

function CardSurface({ active }: { active: boolean }) {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 rounded-lg opacity-[0.05] transition-opacity duration-250 group-hover:opacity-[0.09]"
        style={{
          backgroundImage: `url("${NOISE}")`,
          backgroundSize: "140px 140px",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-lg opacity-80 transition-opacity duration-250"
        style={{
          background:
            "radial-gradient(120% 100% at 50% 0%, rgba(255,255,255,0.62) 0%, rgba(255,255,255,0) 58%), linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(0,0,0,0.03) 100%)",
          opacity: active ? 0 : undefined,
        }}
      />
    </>
  );
}

function Watermark({ logo }: { logo: { src: string } }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
      <img
        src={logo.src}
        alt=""
        aria-hidden="true"
        className="h-full w-full scale-[1.65] object-contain opacity-[0.04]"
      />
    </div>
  );
}

function TestimonialRows({ study }: { study: CaseStudy }) {
  return (
    <div className="relative z-[2] flex min-h-0 flex-1 flex-col justify-between gap-y-6">
      <div className="flex shrink-0 justify-center">
        <QuoteMark />
      </div>

      <div className="flex min-h-0 flex-1 flex-col items-center justify-center text-center">
        <p className="mb-2 text-[15px] font-medium text-[#71717a]">
          {study.author}
        </p>
        <h3 className="max-w-[745px] text-[28px] font-medium leading-[1.1] tracking-[-0.64px] text-[#18181b]">
          {study.quote}
        </h3>
      </div>

      <div className="flex w-full shrink-0 justify-center">
        <div className="relative flex items-center gap-4">
          <img
            src={study.logo.src}
            alt={`${study.company} logo`}
            width={40}
            height={40}
            className="h-10 w-auto max-w-[120px] shrink-0 object-contain"
          />
          <div className="h-10 w-px shrink-0 bg-[#e4e4e7]" aria-hidden="true" />
          <div className="text-left">
            <p className="text-[15px] font-medium leading-none tracking-[-0.02em] text-[#18181b]">
              {study.company}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExpandedContent({
  study,
  direction,
}: {
  study: CaseStudy;
  direction: number;
}) {
  return (
    <motion.div
      custom={direction}
      variants={SLIDE}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.72, ease: EASE }}
      className="absolute inset-0 z-[1] flex flex-col px-16 py-8"
    >
      <TestimonialRows study={study} />
    </motion.div>
  );
}

function CollapsedContent({
  study,
  hidden,
}: {
  study: CaseStudy;
  hidden: boolean;
}) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.2, ease: EASE }}
      className="absolute inset-0 z-[1] flex flex-col items-center justify-between p-8"
    >
      <div className="[writing-mode:vertical-rl] [text-orientation:mixed] flex flex-col text-left">
        <p className="text-[15px] font-medium text-[#18181b]">
          {study.company}
        </p>
      </div>
      <img
        src={study.logo.src}
        alt={`${study.company} logo`}
        width={40}
        height={40}
        className="relative z-[2] mt-auto h-8 w-auto max-w-[80px] shrink-0 object-contain opacity-70"
      />
    </motion.div>
  );
}

function DesktopAccordion() {
  const { active, showContent, direction, previous, select } =
    useAccordion(REVEAL_MS);

  return (
    <div className="hidden h-[472px] gap-2 lg:flex">
      {caseStudies.map((study, i) => {
        const isActive = i === active;
        return (
          <motion.button
            key={study.company}
            type="button"
            initial={false}
            animate={{ flexGrow: isActive ? 11 : 1 }}
            transition={EXPAND}
            onClick={() => select(i)}
            aria-label={`${study.company} case study`}
            className={`group relative basis-0 overflow-hidden rounded-lg bg-white text-left  ${
              isActive ? "" : "cursor-pointer"
            }`}
            style={{
              boxShadow:
                "rgba(0,0,0,0) 0px 0px 0px 0px,rgba(0,0,0,0) 0px 0px 0px 0px,rgba(0,0,0,0.12) 0px 1px 2px 0px,rgba(0,0,0,0.08) 0px 0px 0px 1px",
            }}
          >
            <CardSurface active={isActive} />

            {isActive && <Watermark logo={study.logo} />}

            <AnimatePresence custom={direction} initial={false} mode="wait">
              {isActive && showContent && (
                <ExpandedContent
                  key={study.company}
                  study={study}
                  direction={direction}
                />
              )}
            </AnimatePresence>

            {!isActive && (
              <CollapsedContent
                study={study}
                hidden={i === previous && i !== active}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}

function MobileStack() {
  const { active, showContent, select } = useAccordion(REVEAL_MS_MOBILE);

  return (
    <div className="flex flex-col gap-2 lg:hidden">
      {caseStudies.map((study, i) => {
        const isActive = i === active;
        return (
          <button
            key={study.company}
            type="button"
            onClick={() => select(i)}
            aria-label={`${study.company} case study`}
            className="group relative w-full overflow-hidden rounded-lg border border-[#e6e6ef] bg-white text-left shadow-[0_0_0_1px_rgba(9,9,11,0.03),0_1px_2px_-1px_rgba(9,9,11,0.08)]"
          >
            <CardSurface active={isActive} />
            {isActive ? (
              <div className="relative min-h-[420px] px-8 py-8">
                <Watermark logo={study.logo} />
                <AnimatePresence initial={false} mode="wait">
                  {showContent && (
                    <motion.div
                      key={study.company}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 7 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="absolute inset-0 px-8 py-8"
                    >
                      <TestimonialRows study={study} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="relative z-[1] flex h-[96px] w-full items-center gap-4 px-6">
                <img
                  src={study.logo.src}
                  alt={`${study.company} logo`}
                  width={40}
                  height={40}
                  className="relative z-[2] h-9 w-auto max-w-[100px] shrink-0 object-contain opacity-70"
                />
                <p className="relative z-[2] text-[15px] font-medium text-[#18181b]">
                  {study.company}
                </p>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default function CaseStudiesSection() {
  return (
    <div>
      <div className="border-t border-[#e4e4e7] h-[2px] bg-white" />
      <div className="w-full flex-1 max-w-[1200px] mx-auto relative border-l border-r border-[#e4e4e7]">
        <div className="flex flex-col gap-3 px-2 py-2">
          <DesktopAccordion />
          <MobileStack />
        </div>
      </div>
    </div>
  );
}
