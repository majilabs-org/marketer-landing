"use client";

import { useState } from "react";
import { motion } from "motion/react";
import client1Img from "@/src/assets/clients/client-1.svg";
import client2Img from "@/src/assets/clients/client-2.svg";
import client3Img from "@/src/assets/clients/client-3.svg";
import client4Img from "@/src/assets/clients/client-4.svg";
import client5Img from "@/src/assets/clients/client-5.svg";
import client6Img from "@/src/assets/clients/client-6.svg";
import client7Img from "@/src/assets/clients/client-7.svg";
import client8Img from "@/src/assets/clients/client-8.svg";
import clsx from "clsx";

type Brand = {
  logo: { src: string };
  title: string;
  tags: string[];
};

const brands: Brand[] = [
  {
    logo: client1Img,
    title: "Streamlining global fulfillment across 10+ 3PLs",
    tags: ["B2C"],
  },
  {
    logo: client2Img,
    title: "From distributors to end-customer order handling",
    tags: ["B2B"],
  },
  {
    logo: client3Img,
    title: "80% cost savings with AI-powered email to-order flow",
    tags: ["B2B", "AI"],
  },
  {
    logo: client4Img,
    title: "Automating +$4B in digital sales through B2B portal",
    tags: ["B2B"],
  },
  {
    logo: client5Img,
    title: "Personalized after-sales for new car purchases",
    tags: ["B2C"],
  },
  {
    logo: client6Img,
    title: "From idea to go-live in two weeks with AI",
    tags: ["B2B", "AI"],
  },
  {
    logo: client7Img,
    title: "Scaling quick commerce across 500+ store locations",
    tags: ["B2C"],
  },
  {
    logo: client8Img,
    title: "Central Commerce OS for textile designer sales",
    tags: ["B2B"],
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
                className="h-full w-full object-contain"
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
        <div className="grid grid-cols-4 border-l border-[#e4e4e7]">
          {brands.map((brand, index) => (
            <div
              key={index}
              className={clsx(
                "border-r border-[#e4e4e7]",
                index < 4 && "border-b",
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
