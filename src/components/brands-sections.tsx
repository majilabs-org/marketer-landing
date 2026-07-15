"use client";

import { useState } from "react";
import { motion } from "motion/react";
import tripLogo from "@/src/assets/clients-real/trip-v2.png";
import softmocLogo from "@/src/assets/clients-real/softmoc-v2.png";
import hucklebeeLogo from "@/src/assets/clients-real/hucklebee.png";
import frameItAllLogo from "@/src/assets/clients-real/frameitall.png";
import ragingBullLogo from "@/src/assets/clients-real/ragingbull.svg";
import lemmeLogo from "@/src/assets/clients-real/lemme-v2.png";
import clsx from "clsx";

type Brand = {
  logo: { src: string };
  title: string;
  tags: string[];
};

const brands: Brand[] = [
  {
    logo: tripLogo,
    title: "350+ on-brand creatives shipped in six weeks",
    tags: ["Beverage"],
  },
  {
    logo: softmocLogo,
    title: "~9x incremental ROAS across the full catalog",
    tags: ["Footwear"],
  },
  {
    logo: hucklebeeLogo,
    title: "430% YoY revenue growth, from $435K to $1M",
    tags: ["DTC", "AI"],
  },
  {
    logo: frameItAllLogo,
    title: "238% new-customer revenue at 5.04x blended ROAS",
    tags: ["Home & Garden"],
  },
  {
    logo: ragingBullLogo,
    title: "124% YoY Meta revenue while scaling spend 2.9x",
    tags: ["Fashion"],
  },
  {
    logo: lemmeLogo,
    title: "AI-native creative for a fast-scaling wellness brand",
    tags: ["Wellness"],
  },
];

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

function BrandCard({ logo, title, tags }: Brand) {
  const [hovered, setHovered] = useState(false);
  const shouldReveal = !!title;

  return (
    <div
      className={cn(
        "h-[104px] w-full bg-[#fafafa] cursor-pointer",
        shouldReveal && hovered && "bg-[#f4f4f5]",
      )}
      onMouseEnter={() => shouldReveal && setHovered(true)}
      onMouseLeave={() => shouldReveal && setHovered(false)}
      onFocusCapture={() => shouldReveal && setHovered(true)}
      onBlurCapture={(e) => {
        if (shouldReveal && !e.currentTarget.contains(e.relatedTarget))
          setHovered(false);
      }}
    >
      <div className="h-full w-full overflow-hidden">
        <motion.div
          className={cn(
            "flex w-full flex-col",
            shouldReveal ? "h-[208px]" : "h-full",
          )}
          animate={{ y: shouldReveal && hovered ? -104 : 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
        >
          <div className="h-[104px] w-full bg-[#fafafa] p-4 flex items-center justify-center">
            <div className="h-[40px] w-[120px] flex items-center justify-center">
              <img
                src={logo.src}
                alt="logo"
                width={120}
                height={40}
                className="h-full w-full object-contain grayscale opacity-60"
              />
            </div>
          </div>

          {shouldReveal && (
            <div className="h-[104px] w-full bg-[#f4f4f5] flex min-h-0 flex-col items-center justify-center gap-2 px-4 py-1.5">
              {tags.length > 0 && (
                <div className="flex flex-shrink-0 flex-wrap justify-center gap-1">
                  {tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full h-[18px] flex items-center justify-center bg-[rgba(24,24,27,0.4)] px-[6px] text-[11px] font-semibold text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <p className="min-h-[2rem] flex-shrink-0 text-center text-sm font-medium text-[#18181b] leading-[1.6] line-clamp-2">
                {title}
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default function BrandSections() {
  return (
    <div>
      <div className="border-t border-[#e4e4e7] h-[2px] bg-white" />
      <div className="w-full flex-1 max-w-[1200px] mx-auto relative border-[#e4e4e7]">
        <div className="grid grid-cols-3 border-l border-[#e4e4e7]">
          {brands.map((brand, index) => (
            <div
              key={index}
              className={clsx(
                "border-r border-[#e4e4e7]",
                index < 3 && "border-b",
              )}
            >
              <BrandCard {...brand} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
