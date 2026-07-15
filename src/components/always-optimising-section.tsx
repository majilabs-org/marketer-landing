"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { TrendingUpIcon } from "lucide-react";
import type { LivelinePoint } from "liveline";

// Canvas-rendered and touches `window` only inside effects, but render it
// client-only anyway so SSR stays clean.
const Liveline = dynamic(() => import("liveline").then((m) => m.Liveline), {
  ssr: false,
});

const WINDOW = 32; // visible seconds
const TICK_MS = 1000; // how often a new point arrives

// A random walk with an upward drift: a small positive bias (DRIFT) plus a
// larger swing (VOL) that can go negative — so it trends up overall but dips,
// flattens, and fluctuates on the way.
const DRIFT = 3;
const VOL = 11;
const nextStep = () => DRIFT + (Math.random() * 2 - 1) * VOL;

function seedSeries(): LivelinePoint[] {
  const now = Date.now() / 1000;
  const pts: LivelinePoint[] = [];
  let v = 120;
  for (let i = WINDOW; i >= 0; i--) {
    v = Math.max(10, v + nextStep());
    pts.push({ time: now - i, value: v });
  }
  return pts;
}

function LiveChart() {
  const [seed] = useState(seedSeries);
  const [data, setData] = useState<LivelinePoint[]>(seed);
  const [value, setValue] = useState(seed[seed.length - 1].value);

  useEffect(() => {
    let current = seed[seed.length - 1].value;
    const id = window.setInterval(() => {
      current = Math.max(10, current + nextStep()); // upward drift + fluctuations
      setValue(current);
      setData((prev) => {
        const next = [...prev, { time: Date.now() / 1000, value: current }];
        return next.length > WINDOW * 3
          ? next.slice(next.length - WINDOW * 3)
          : next;
      });
    }, TICK_MS);
    return () => window.clearInterval(id);
  }, [seed]);

  return (
    <Liveline
      data={data}
      value={value}
      theme="light"
      color="#60c686"
      // color="#22c55f"
      window={WINDOW}
      grid={true}
      badge={true}
      scrub={true}
      momentum={true}
      fill
      lineWidth={2}
      style={{ width: "100%", height: "100%" }}
    />
  );
}

export default function AlwaysOptimisingSection() {
  return (
    <div className="w-full min-w-0">
      <div className="h-[340px] flex items-center justify-center">
        <div className="h-[240px] w-full max-w-[440px]">
          <LiveChart />
        </div>
      </div>
      <div className="p-6 flex flex-col gap-1">
        <div className="flex items-center gap-1">
          <TrendingUpIcon
            className="w-4.5 h-4.5 text-[#737373]"
            strokeWidth={1.5}
          />
          <div className="font-medium text-[14px]">Always optimising</div>
        </div>
        <div className="text-[#52525b] text-[13px] leading-[1.35]">
          Your agents never sit still — testing creatives, shifting budget, and
          refining bids around the clock to push every campaign toward its best
          possible outcome.
        </div>
      </div>
    </div>
  );
}
