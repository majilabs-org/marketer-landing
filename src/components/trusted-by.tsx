"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue } from "motion/react";

type Testimonial = { text: string; author: string; role: string };

const testimonials: Testimonial[] = [
  {
    text: "The AI ad creatives are mind-blowing! We have seen a notable increase in our ROAS. Would strongly recommend!",
    author: "Bhavya Joshi",
    role: "Marketing Executive - Stories",
  },
  {
    text: "I think AI is going to be the most important marketing decision. Any company can make and picking a company is essential… I like these guys a lot. It’s going to be a really good mood for us.",
    author: "Len",
    role: "Jing Soda",
  },
  {
    text: "Smooth onboarding and quality software. Their team is receptive to feedback and works efficiently. Coming from someone who couldn’t deliver results with my own ads, I’ve seen an improvement the first few weeks.",
    author: "Jordan Stuart",
    role: "CEO of Totem Serveware",
  },
  {
    text: "Easy onboarding, helpful employees, and innovative products. Jacob from onboarding joined late calls with us to make sure we were set up properly and successful - Great customer support!",
    author: "Leo Cole",
    role: "US",
  },
  {
    text: "As a marketing professional, results matter to me, and I can confidently say that without their support, our sales would not be where they are today. They don’t just work for you; they work with you.",
    author: "Chet Pelletier",
    role: "US",
  },
  {
    text: "We plugged in our Meta and Google accounts and within a week the campaigns were outperforming what our agency ran for months. It’s a no-brainer.",
    author: "Marcus Reyes",
    role: "Founder of Drift Supply",
  },
  {
    text: "The reporting alone saved us hours every week. I finally understand what’s actually driving sales instead of guessing.",
    author: "Hannah Whitfield",
    role: "Head of Growth at Bloomwell",
  },
  {
    text: "I was skeptical about handing ads to AI, but every decision is transparent and I can jump in whenever I want. It earned my trust fast.",
    author: "Diego Fernández",
    role: "CMO of Cadence Athletics",
  },
  {
    text: "Our ROAS climbed 40% in the first month and it keeps compounding. Genuinely the best tool in our whole stack right now.",
    author: "Aisha Rahman",
    role: "Marketing Lead at Nova Goods",
  },
  {
    text: "Setup was painless and the team actually cares. It feels like adding a full performance marketing hire overnight.",
    author: "Tobias Klein",
    role: "CEO of Verge Outdoors",
  },
  {
    text: "Fresh creatives every week without briefing a designer. The volume and quality would’ve been impossible for a team our size.",
    author: "Priya Menon",
    role: "Founder of Lumen Skincare",
  },
  {
    text: "It just runs. I check in once a week, tweak a guardrail or two, and the results keep getting better on their own.",
    author: "Sam Whitaker",
    role: "Owner of Harbor & Hearth",
  },
];

const carouselQuotes: Testimonial[] = testimonials;
const leftColumn: Testimonial[] = testimonials.filter((_, i) => i % 2 === 0);
const rightColumn: Testimonial[] = testimonials.filter((_, i) => i % 2 === 1);

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
}

function Avatar({ name }: { name: string }) {
  return (
    <div className="size-8 shrink-0 rounded-xl [corner-shape:squircle] flex items-center justify-center text-xs font-semibold text-[#52525b] bg-gradient-to-b from-[#fdfdfd] to-[#e8e8eb] ring-1 ring-inset ring-black/8">
      {initials(name)}
    </div>
  );
}

const activeState = {
  opacity: 1,
  maskPosition: ["0px 0px", "-1200px 0px"],
  filter: ["blur(4px)", "blur(0px)"],
  scale: [0.98, 1],
  skewY: [1, 0],
  rotate: [-1, 0],
};

const inactiveState = {
  opacity: 1,
  maskPosition: ["-3200px 0px", "-4600px 0px"],
  filter: "blur(4px)",
  scale: 1.02,
  skewY: -1,
  rotate: 1,
};

function QuoteCarousel({ quotes }: { quotes: Testimonial[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % quotes.length);
    }, 7000);
    return () => clearInterval(id);
  }, [quotes.length]);

  return (
    <div className="flex w-full max-w-[344px] flex-col gap-3 select-none">
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

      <div className="grid">
        {quotes.map((q, i) => (
          <motion.div
            key={q.author}
            className="space-y-3 [grid-area:1/1] [mask-image:linear-gradient(-40deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0)_13.5%,rgba(0,0,0,0.99)_27%,rgba(0,0,0,0.99)_72%,rgba(0,0,0,0)_77.4%,rgba(0,0,0,0)_100%)] [mask-size:4000px_304px] [mask-repeat:revert] [mask-origin:border-box] [mask-clip:border-box]"
            initial={false}
            animate={active === i ? activeState : inactiveState}
            transition={{ duration: 1.5, type: "spring", bounce: 0 }}
          >
            <p className="text-[15px] leading-5 text-[#18181b]">{q.text}</p>
            <div className="flex items-center gap-3">
              <Avatar name={q.author} />
              <div className="flex flex-col">
                <p className="text-sm leading-5 font-medium text-[#18181b]">
                  {q.author}
                </p>
                <p className="text-xs leading-[1.125rem] text-[#71717a]">
                  {q.role}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Card({ text, author, role }: Testimonial) {
  return (
    <div className="cursor-pointer rounded-[12px] p-5 bg-[#f7f7f8] hover:bg-white transition-[box-shadow,background-color] duration-200 shadow-[0_0_0_.5px_#0000001a,0px_2px_10px_-4px_#0000000f,0px_8px_12px_-4px_#0000000f,inset_0px_0px_0px_.5px_#fffc,inset_0px_0px_24px_6px_#fff] hover:shadow-[0px_0px_0px_.5px_#13131626,0px_5px_12px_-6px_#0000001f,0px_12px_16px_-8px_#0000001f,inset_0px_0px_0px_.5px_#fffc,inset_0px_0px_24px_2px_#fff]">
      <p className="text-[15px] leading-[1.5] text-[#18181b]">{text}</p>
      <div className="mt-5 flex items-center gap-3">
        <Avatar name={author} />
        <div className="flex flex-col">
          <span className="text-sm font-medium text-[#18181b]">{author}</span>
          <span className="text-[13px] text-[#71717a]">{role}</span>
        </div>
      </div>
    </div>
  );
}

const TICKER_SPEED = 40; // px per second

function wrap(min: number, max: number, v: number) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

function Ticker({
  items,
  direction,
}: {
  items: Testimonial[];
  direction: "up" | "down";
}) {
  const doubled = [...items, ...items];
  const y = useMotionValue(0);
  const listRef = useRef<HTMLDivElement>(null);
  const periodRef = useRef(0);
  const hovered = useRef(false);

  // Measure the height of one full set (incl. gap) so the loop wraps seamlessly.
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const measure = () => {
      const children = el.children;
      if (children.length > items.length) {
        const first = children[0] as HTMLElement;
        const clone = children[items.length] as HTMLElement;
        periodRef.current = clone.offsetTop - first.offsetTop;
        if (direction === "down") y.set(-periodRef.current);
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [items.length, direction, y]);

  useAnimationFrame((_, delta) => {
    if (hovered.current) return;
    const period = periodRef.current;
    if (!period) return;
    const dir = direction === "up" ? -1 : 1;
    y.set(wrap(-period, 0, y.get() + dir * TICKER_SPEED * (delta / 1000)));
  });

  return (
    <motion.div
      ref={listRef}
      style={{ y }}
      className="flex flex-col gap-6"
      onPointerEnter={() => (hovered.current = true)}
      onPointerLeave={() => (hovered.current = false)}
    >
      {doubled.map((item, i) => (
        <Card key={`${item.author}-${i}`} {...item} />
      ))}
    </motion.div>
  );
}

export default function TrustedBy() {
  return (
    <div>
      <div className="border-t border-[#e4e4e7] h-[2px] bg-white" />
      <div className="w-full max-w-[1200px] mx-auto border-l border-r border-[#e4e4e7] px-12 py-16">
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-8 items-start">
          <div className="flex flex-col">
            <h2 className="font-medium text-[40px] leading-[1.05] tracking-[-1.5px] text-[#18181b]">
              Trusted by
            </h2>
            <p className="mt-4 text-[#52525b]">
              Join the customers and brands running their marketing on autopilot
              with Marketer.
            </p>
            <div className="mt-8 flex">
              <div className="h-[38px] flex items-center justify-center px-4 cursor-pointer transition-all bg-[#fafafa] border border-[#fff] rounded-[6px] transition-shadow shadow-[0px_0px_0px_1px_rgba(9,9,11,0.08),0px_1px_2px_-1px_rgba(9,9,11,0.08),0px_2px_4px_0px_rgba(9,9,11,0.04)] hover:shadow-[0px_0px_0px_1px_rgba(9,9,11,0.08),0px_1px_2px_-1px_rgba(9,9,11,0.08),0px_2px_8px_0px_rgba(9,9,11,0.1)]">
                <div className="text-[#18181b] font-medium">Get started</div>
              </div>
            </div>

            <div className="mt-16 border-t border-[#e4e4e7] border-dashed pt-16">
              <QuoteCarousel quotes={carouselQuotes} />
            </div>
          </div>

          <div className="lg:col-span-2 relative h-[560px] px-4 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
              <Ticker items={leftColumn} direction="up" />
              <div className="max-sm:hidden">
                <Ticker items={rightColumn} direction="down" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
