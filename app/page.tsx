"use client";

import { motion } from "motion/react";
import starImg from "@/src/assets/star.png";
import img1 from "@/src/assets/img-1.png";
import img2 from "@/src/assets/img-2.png";
import img3 from "@/src/assets/img-3.webp";
import Logo from "@/src/components/logo";
import BrandSections from "@/src/components/brands-sections";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col">
      <div className="h-[60px] border-b border-[#e4e4e7] flex items-center">
        <div className="max-w-[1200px] mx-auto w-full px-8">
          <Logo />
        </div>
      </div>
      <div className="pt-[80px] w-full flex-1 lg:px-16 max-w-[1200px] mx-auto relative border-l border-r border-[#e4e4e7]">
        <div className="flex justify-center">
          <div className="cursor-pointer transition-all h-7 px-2.5 relative flex items-center font-medium text-sm bg-[#fafafa] border border-[#fff] rounded-full transition-shadow shadow-[0px_0px_0px_1px_rgba(9,9,11,0.08),0px_1px_2px_-1px_rgba(9,9,11,0.08),0px_2px_4px_0px_rgba(9,9,11,0.04)] hover:shadow-[0px_0px_0px_1px_rgba(9,9,11,0.08),0px_1px_2px_-1px_rgba(9,9,11,0.08),0px_2px_8px_0px_rgba(9,9,11,0.1)]">
            <motion.div
              className="absolute left-0 top-[-2px]"
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: [0, 1, 1, 0], x: [0, 80] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
            >
              <motion.div
                className="absolute top-[1px] right-0 flex items-center justify-center"
                initial={{ scale: 0.9, opacity: 0.75 }}
                animate={{
                  rotate: [0, 360],
                  opacity: [0.75, 1, 0.75, 1, 0.75, 1],
                  scale: [0.9, 1.1, 0.9],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <img
                  className="absolute shrink-0 w-4 h-4 min-w-4 min-h-4"
                  src={starImg.src}
                  alt="star"
                  width={16}
                  height={16}
                />
              </motion.div>
              <svg
                width="60"
                height="2"
                viewBox="0 0 60 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  y="0.683594"
                  width="59.6201"
                  height="1"
                  rx="0.5"
                  fill="url(#paint0_linear_13259_339377)"
                ></rect>
                <defs>
                  <linearGradient
                    id="paint0_linear_13259_339377"
                    x1="0"
                    y1="1.18359"
                    x2="59.6201"
                    y2="1.18359"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#F96816" stopOpacity="0"></stop>
                    <stop
                      offset="1"
                      stopColor="#F96816"
                      stopOpacity="0.3"
                    ></stop>
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
            Marketing is now software
          </div>
        </div>

        <div className="leading-[100%] tracking-[-1.6px] text-[64px] font-medium text-center pt-[24px] pb-[12px] mx-auto max-w-[900px]">
          AI agents trained to run your marketing on autopilot
        </div>
        <div className="text-[#52525b] font-medium leading-[150%] text-[18px] max-w-[600px] text-center mx-auto">
          AI agents that run your ad campaigns across Meta, Google, and Snapchat
          24/7 — pausing losers and scaling winners automatically.
        </div>

        <div className="pt-[40px] relative">
          <div className="relative flex justify-center gap-3">
            <div className="h-[38px] flex items-center justify-center px-4 cursor-pointer transition-all bg-[#fafafa] border border-[#fff] rounded-[6px] transition-shadow shadow-[0px_0px_0px_1px_rgba(9,9,11,0.08),0px_1px_2px_-1px_rgba(9,9,11,0.08),0px_2px_4px_0px_rgba(9,9,11,0.04)] hover:shadow-[0px_0px_0px_1px_rgba(9,9,11,0.08),0px_1px_2px_-1px_rgba(9,9,11,0.08),0px_2px_8px_0px_rgba(9,9,11,0.1)]">
              <div className="text-[#18181b] font-medium">Talk to sales</div>
            </div>
            <div
              className="h-[38px] flex items-center justify-center px-4 cursor-pointer transition-all bg-[#27272a] hover:bg-[#3f3f46] rounded-[6px]"
              style={{
                boxShadow:
                  "0px 0.75px 0px 0px rgba(255,255,255,0.2) inset,0px 1px 2px 0px rgba(0,0,0,0.4),0px 0px 0px 1px rgba(24,24,27,1)",
              }}
            >
              <div className="text-white/88 font-medium">Get started</div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="w-full flex-1 p-1.5 max-w-[1200px] mx-auto relative border-l border-r border-[#e4e4e7] pt-[50px]">
          <div className="w-full h-[550px] relative overflow-hidden">
            <div className="rounded-md overflow-hidden absolute inset-0 border border-[#e6e6ef]">
              <div
                className="absolute inset-0 opacity-75"
                style={{
                  filter: "grayscale(1) brightness(1) blur(0px) contrast(120)",
                }}
              >
                <img
                  src={img3.src}
                  className="absolute top-0 right-0 w-full h-full object-cover opacity-50"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    imageRendering: "pixelated",
                    backgroundImage:
                      'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAu0lEQVQ4T6WSMQqFMBBEE2wDXiVgG8gtglilCuIpcoogVqlEPIVgK3gVIa2Qzw9YbIpttlqGgbcMM5wxlr33LMbI/nccx3I/PQwD0LXPj+OgAaSUBWCtLZ+2bSv308uyAF37/HkeGkAIASL0fQ8yT9MEdO3z67poAKUUiDDPM8i87zvQtc/f96UBmqZBazTG4Ds4z5MG6LoOrTGEgO8gpUQDtG2L1uicw3dw3zcNoLVGa1zXFd9BzpkE+AFp94/4eKx9+AAAAABJRU5ErkJggg==")',
                    backgroundPosition: "0 0",
                    backgroundRepeat: "repeat",
                    backgroundSize: "16px 16px",
                    mixBlendMode: "screen",
                    zIndex: 1,
                  }}
                />
              </div>
              <img
                src={img3.src}
                className="absolute top-0 right-0 w-full h-full object-cover opacity-75"
              />
            </div>
            <div className="px-[56px] pt-[56px] z-10 relative">
              <img
                src={img2.src}
                className="w-full h-full object-fit rounded-lg"
                style={{
                  boxShadow:
                    "0 0 0 1px rgba(0,0,0,0.08),0 781px 219px 0 rgba(0,0,0,0.00),0 500px 200px 0 rgba(0,0,0,0.01),0 281px 169px 0 rgba(0,0,0,0.05),0 125px 125px 0 rgba(0,0,0,0.09),0 31px 69px 0 rgba(0,0,0,0.10)",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <BrandSections />
      <div>
        <div className="border-t border-[#e4e4e7] h-[2px] bg-white" />
        <div className="pt-[80px] w-full flex-1 px-6 max-w-[1200px] mx-auto relative border-l border-r border-[#e4e4e7]">
          <div className="mx-auto w-min relative p-3 pb-0 rounded-t-[21px] overflow-hidden border border-b-0 bg-[#18181B]/2 border-[#e4e4e7]">
            <div className="flex justify-center pt-[1px] relative w-[1100px]">
              <div className="!absolute left-0 top-0 right-0 h-[calc(100%+10px)] rounded-t-[9px]">
                <div
                  className="absolute inset-0 rounded-[9px]"
                  style={{ boxShadow: "inset 0 0 0 1px #18181B10" }}
                />
              </div>
              <div
                className="w-[1100px] h-[410px] w-full pt-[1px] px-[1px] bg-white rounded-t-[9px]"
                style={{
                  boxShadow:
                    "0 143px 40px 0 rgba(0,0,0,0),0 91px 37px 0 rgba(0,0,0,.01),0 51px 31px 0 rgba(0,0,0,.05),0 23px 23px 0 rgba(0,0,0,.09),0 6px 13px 0 rgba(0,0,0,.1)",
                }}
              >
                <img
                  src={img1.src}
                  className="rounded-t-[8px] max-w-full h-[688px] w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="border-t border-[#e4e4e7] h-[2px] bg-white" />
        <div className="pt-[80px] w-full flex-1 p-2 max-w-[1200px] mx-auto relative border-l border-r border-[#e4e4e7]"></div>
      </div>
    </div>
  );
}
