"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import img1 from "@/src/assets/img-3.webp";
import img2 from "@/src/assets/image-4.webp";
import img3 from "@/src/assets/image-5.webp";
import campaigns from "@/src/assets/campaigns.png";
import analytics from "@/src/assets/analytics.png";
import creatives from "@/src/assets/creatives.png";

const DITHER_TILE =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAu0lEQVQ4T6WSMQqFMBBEE2wDXiVgG8gtglilCuIpcoogVqlEPIVgK3gVIa2Qzw9YbIpttlqGgbcMM5wxlr33LMbI/nccx3I/PQwD0LXPj+OgAaSUBWCtLZ+2bSv308uyAF37/HkeGkAIASL0fQ8yT9MEdO3z67poAKUUiDDPM8i87zvQtc/f96UBmqZBazTG4Ds4z5MG6LoOrTGEgO8gpUQDtG2L1uicw3dw3zcNoLVGa1zXFd9BzpkE+AFp94/4eKx9+AAAAABJRU5ErkJggg==";

function DitheredImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="rounded-lg overflow-hidden absolute inset-0 border border-[#e6e6ef]">
      <div
        className="absolute inset-0 opacity-75"
        style={{ filter: "grayscale(1) brightness(1) blur(0px) contrast(120)" }}
      >
        <img
          src={src}
          alt=""
          aria-hidden="true"
          className="absolute top-0 right-0 w-full h-full object-cover opacity-50"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            imageRendering: "pixelated",
            backgroundImage: `url("${DITHER_TILE}")`,
            backgroundPosition: "0 0",
            backgroundRepeat: "repeat",
            backgroundSize: "16px 16px",
            mixBlendMode: "screen",
            zIndex: 1,
          }}
        />
      </div>
      <img
        src={src}
        alt={alt}
        className="absolute top-0 right-0 w-full h-full object-cover opacity-75"
      />
    </div>
  );
}

type Slide = {
  bgImage: string;
  image: string;
  title: string;
  description: string;
};

const slides: Slide[] = [
  {
    bgImage: img1.src,
    image: campaigns.src,
    title: "Every campaign in one place",
    description:
      "Manage campaigns, ad sets, and ads across Meta, Google, TikTok, and Snapchat — spend, revenue, and budget side by side.",
  },
  {
    bgImage: img2.src,
    image: analytics.src,
    title: "Analytics that update in real time",
    description:
      "ROAS, CAC, impressions, and CTR across every channel, refreshed as your agents work so you always know what's driving revenue.",
  },
  {
    bgImage: img3.src,
    image: creatives.src,
    title: "Creatives ranked by performance",
    description:
      "See every creative with ROAS, spend, and revenue attached, so your best-performing ads rise to the top automatically.",
  },
];

const SLIDE_W = 460;
const GAP = 17;
const STRIDE = SLIDE_W + GAP;

function ArrowIcon({ flip }: { flip?: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="none"
      className={`pointer-events-none size-full ${flip ? "scale-x-[-1]" : ""}`}
    >
      <path
        d="M7.09127 3.57515C6.85695 3.34084 6.47662 3.34084 6.24231 3.57515L2.76064 7.05682C2.23994 7.57751 2.23994 8.42173 2.76064 8.94243L6.24231 12.4241C6.47662 12.6584 6.85695 12.6584 7.09127 12.4241C7.32558 12.1898 7.32558 11.8095 7.09127 11.5751L4.11601 8.59989H13.3335C13.6648 8.59989 13.9337 8.331 13.9337 7.99963C13.9337 7.66826 13.6648 7.39937 13.3335 7.39937H4.11601L7.09127 4.42411C7.32558 4.18979 7.32558 3.80946 7.09127 3.57515Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CarouselControls({
  count,
  index,
  onSelect,
  onPrev,
  onNext,
  canPrev,
  canNext,
}: {
  count: number;
  index: number;
  onSelect: (i: number) => void;
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
}) {
  return (
    <div className="inline-flex items-center justify-center gap-4 rounded-[5rem] bg-[#fafafa] p-2 lg:p-1 shadow-[inset_0_0_0_0.5px_#FFF,0_0_0_0.5px_rgba(0,0,0,0.10)]">
      <button
        type="button"
        onClick={onPrev}
        disabled={!canPrev}
        aria-label="Previous feature"
        className="cursor-pointer flex size-4 items-center justify-center text-[#71717a] transition-colors hover:text-black disabled:opacity-40 disabled:pointer-events-none"
      >
        <ArrowIcon />
      </button>

      <div className="flex h-fit w-[8.75rem] items-center gap-1.5 lg:w-[13.5rem] lg:gap-2">
        {Array.from({ length: count }).map((_, i) => {
          const active = i === index;
          return (
            <motion.button
              key={i}
              type="button"
              initial={false}
              animate={{ flexGrow: active ? 5 : 1 }}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 18,
                mass: 1,
              }}
              onClick={() => onSelect(i)}
              aria-label={`Go to feature ${i + 1}`}
              className={`h-4 basis-0 cursor-pointer ${
                active ? "text-black" : "text-[#e4e4e7] hover:text-black"
              }`}
            >
              <div className="h-0.5 w-full rounded-lg bg-current transition-colors" />
            </motion.button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={onNext}
        disabled={!canNext}
        aria-label="Next feature"
        className="cursor-pointer flex size-4 items-center justify-center text-[#71717a] transition-colors hover:text-black disabled:opacity-40 disabled:pointer-events-none"
      >
        <ArrowIcon flip />
      </button>
    </div>
  );
}

export default function CarouselSection() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [viewportW, setViewportW] = useState(0);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const update = () => setViewportW(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const lastIndex = slides.length - 1;
  const totalW = slides.length * SLIDE_W + (slides.length - 1) * GAP;
  const maxScroll = Math.max(0, totalW - viewportW);
  const x = -Math.min(index * STRIDE, maxScroll);

  const canPrev = index > 0;
  const canNext = index < lastIndex;

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(lastIndex, i + 1));

  return (
    <div>
      <div className="border-t border-[#e4e4e7] h-[2px] bg-white" />
      <div className="w-full flex-1 max-w-[1200px] mx-auto relative border-l border-r border-[#e4e4e7]">
        <div className="grid grid-cols-1 lg:grid-cols-2 px-12 py-12 gap-16 pb-10">
          <h2 className="max-w-[380px] text-[40px] leading-[1.05] tracking-[-1.5px] font-medium text-[#18181b]">
            Everything your agents need to run marketing
          </h2>
          <div className="flex flex-col justify-end gap-8">
            <div className="flex items-center justify-end gap-2">
              <CarouselControls
                count={slides.length}
                index={index}
                onSelect={setIndex}
                onPrev={prev}
                onNext={next}
                canPrev={canPrev}
                canNext={canNext}
              />
            </div>
          </div>
        </div>

        <div
          ref={viewportRef}
          className="overflow-hidden pb-10"
          role="region"
          aria-roledescription="carousel"
          aria-label="Product features"
        >
          <motion.div
            className="flex w-max p-2"
            style={{ gap: `${GAP}px` }}
            animate={{ x }}
            transition={{ type: "spring", stiffness: 260, damping: 34 }}
          >
            {slides.map((slide, i) => (
              <article
                key={slide.title}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${slides.length}`}
                className="shrink-0 flex flex-col"
                style={{ width: `${SLIDE_W}px` }}
              >
                <div className="relative rounded-lg border border-[#e6e6ef] w-full aspect-[544/490] max-h-[490px] overflow-hidden bg-white">
                  <DitheredImage src={slide.bgImage} alt={slide.title} />
                  <div className="absolute inset-0 pl-[24px] pt-[30px] z-10 -right-[20px]">
                    <div
                      className="w-full h-full rounded-t-lg bg-white overflow-hidden"
                      style={{
                        boxShadow:
                          "0 0 0 1px rgba(0,0,0,0.08),0 31px 69px 0 rgba(0,0,0,0.10),0 125px 125px 0 rgba(0,0,0,0.09)",
                      }}
                    >
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover object-left-top"
                      />
                    </div>
                  </div>
                </div>
                <div className="px-2 pt-4">
                  <p className="text-[#18181b] text-[16px] font-medium leading-[150%]">
                    {slide.title}
                  </p>
                  <p className="mt-0.5 text-[#52525b] text-[14px] font-normal leading-[145%]">
                    {slide.description}
                  </p>
                </div>
              </article>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
