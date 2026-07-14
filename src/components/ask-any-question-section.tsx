"use client";

import { MessageSquareMoreIcon } from "lucide-react";

const ROWS: string[][] = [
  [
    "Compare ROAS this week vs last week by channel",
    "Which Meta campaigns are burning budget with no conversions?",
    "Break down CAC by channel for the last 30 days",
    "Pause every ad set below 1.5x ROAS automatically",
    "Which creatives are fatiguing on Meta right now?",
  ],
  [
    "Scale winning Google campaigns by 20% overnight",
    "Attribute revenue growth to new vs returning customers",
    "Find my top three audiences by conversion rate",
    "Shift budget from Snapchat to Meta where ROAS is higher",
    "Draft three new ad variations from my best performer",
  ],
  [
    "Why did spend spike on Google yesterday?",
    "Forecast next week's revenue at current spend",
    "Which products have the lowest cost per purchase?",
    "Send a morning brief to Slack every day at 8am",
    "Flag any campaign that doubled its CPC overnight",
  ],
  [
    "Rebalance budget across Meta, Google, and Snapchat",
    "Test a new lookalike from my recent purchasers",
    "Show the creatives with the highest thumb-stop rate",
    "Cut spend on keywords with zero return",
    "Summarize everything that changed in my account this week",
  ],
];

const DURATIONS = [110, 130, 100, 120];

const CARD_SHADOW =
  "rgba(0,0,0,0.06) 0px 1px 2px 0px,rgba(0,0,0,0.05) 0px 0px 0px 1px";

const KEYFRAMES = `
@keyframes ask-ltr{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@keyframes ask-rtl{from{transform:translateX(-50%)}to{transform:translateX(0)}}
@media (prefers-reduced-motion:reduce){.ask-track{animation-name:none!important}}
`;

function Row({
  items,
  duration,
  index,
}: {
  items: string[];
  duration: number;
  index: number;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="group overflow-hidden">
      <div
        className="ask-track flex w-max gap-3 px-3 py-1.5 will-change-transform [animation-timing-function:linear] [animation-iteration-count:infinite] group-hover:[animation-play-state:paused]"
        style={{
          animationName: index % 2 === 0 ? "ask-ltr" : "ask-rtl",
          animationDuration: `${duration}s`,
        }}
      >
        {doubled.map((q, i) => (
          <div
            key={i}
            aria-hidden={i >= items.length ? true : undefined}
            className="cursor-pointer h-8 px-2.5 flex items-center font-medium text-sm whitespace-nowrap bg-white rounded-full text-[#18181b]"
            style={{ boxShadow: CARD_SHADOW }}
          >
            {q}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AskAnyQuestionSection() {
  return (
    <div className="w-full min-w-0 border-r border-[#e4e4e7]">
      <style>{KEYFRAMES}</style>
      <div className="h-[340px] flex items-center">
        <div className="relative w-full min-w-0 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#fafafa] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#fafafa] to-transparent" />

          <div className="flex flex-col">
            {ROWS.map((items, i) => (
              <Row key={i} items={items} duration={DURATIONS[i]} index={i} />
            ))}
          </div>
        </div>
      </div>
      <div className="p-6 flex flex-col gap-1">
        <div className="flex items-center gap-1">
          <MessageSquareMoreIcon
            className="w-4.5 h-4.5 text-[#737373]"
            strokeWidth={1.5}
          />
          <div className="font-medium text-[14px]">Ask any questions</div>
        </div>
        <div className="text-[#52525b] text-[13px] leading-[1.35]">
          Ask about spend, ROAS, or performance in plain English — and get an
          answer back in seconds.
        </div>
      </div>
    </div>
  );
}
