import {
  CheckIcon,
  MinusIcon,
  RotateCwIcon,
  TriangleAlertIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  ZapIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Tone = "positive" | "negative" | "caution" | "varies" | "neutral";

type Cell = { text: string; tone: Tone; icon: LucideIcon };

type Row = { criteria: string; cells: [Cell, Cell, Cell, Cell] };
type Group = { title: string; rows: Row[] };

const COLUMNS = [
  "Marketer.com",
  "Marketing agency",
  "Freelancers",
  "DIY with tools",
];

const GROUPS: Group[] = [
  {
    title: "Speed & execution",
    rows: [
      {
        criteria: "Time to launch",
        cells: [
          { text: "Same day", tone: "positive", icon: ZapIcon },
          { text: "2–4 weeks", tone: "negative", icon: TrendingDownIcon },
          { text: "1–2 weeks", tone: "negative", icon: TrendingDownIcon },
          { text: "Days of setup", tone: "neutral", icon: MinusIcon },
        ],
      },
      {
        criteria: "Optimization cadence",
        cells: [
          { text: "Every hour", tone: "positive", icon: ZapIcon },
          { text: "Weekly call", tone: "negative", icon: TrendingDownIcon },
          { text: "When available", tone: "neutral", icon: MinusIcon },
          {
            text: "When you find time",
            tone: "negative",
            icon: TrendingDownIcon,
          },
        ],
      },
      {
        criteria: "Creative supply",
        cells: [
          { text: "On tap", tone: "positive", icon: ZapIcon },
          { text: "Depends on scope", tone: "varies", icon: RotateCwIcon },
          { text: "Not included", tone: "neutral", icon: MinusIcon },
          { text: "Not included", tone: "neutral", icon: MinusIcon },
        ],
      },
    ],
  },
  {
    title: "Visibility & control",
    rows: [
      {
        criteria: "Reporting",
        cells: [
          { text: "Real-time, attributed", tone: "positive", icon: ZapIcon },
          {
            text: "Weekly email, monthly deck",
            tone: "negative",
            icon: TrendingDownIcon,
          },
          { text: "Spreadsheet", tone: "neutral", icon: MinusIcon },
          { text: "Manual exports", tone: "caution", icon: TriangleAlertIcon },
        ],
      },
      {
        criteria: "Transparency",
        cells: [
          { text: "Every action logged", tone: "positive", icon: CheckIcon },
          {
            text: "You see results not the work",
            tone: "neutral",
            icon: MinusIcon,
          },
          { text: "Varies", tone: "varies", icon: RotateCwIcon },
          { text: "Full, but on you", tone: "neutral", icon: MinusIcon },
        ],
      },
      {
        criteria: "Data ownership",
        cells: [
          { text: "Yours, always", tone: "positive", icon: CheckIcon },
          {
            text: "Locked in their tools",
            tone: "caution",
            icon: TriangleAlertIcon,
          },
          { text: "Depends", tone: "varies", icon: RotateCwIcon },
          { text: "Yours, scattered", tone: "neutral", icon: MinusIcon },
        ],
      },
    ],
  },
  {
    title: "Cost & scaling",
    rows: [
      {
        criteria: "Cost structure",
        cells: [
          { text: "Scales with usage", tone: "neutral", icon: MinusIcon },
          {
            text: "$5K+ retainer or % of spend",
            tone: "negative",
            icon: TrendingUpIcon,
          },
          { text: "Flat monthly fee", tone: "neutral", icon: MinusIcon },
          {
            text: "A subscription per tool",
            tone: "caution",
            icon: TriangleAlertIcon,
          },
        ],
      },
      {
        criteria: "Scaling",
        cells: [
          {
            text: "Add spend, not headcount",
            tone: "positive",
            icon: CheckIcon,
          },
          {
            text: "Bigger retainer, new hires",
            tone: "negative",
            icon: TrendingUpIcon,
          },
          {
            text: "One person's capacity",
            tone: "varies",
            icon: RotateCwIcon,
          },
          {
            text: "Capped by your hours",
            tone: "caution",
            icon: TriangleAlertIcon,
          },
        ],
      },
      {
        criteria: "Onboarding",
        cells: [
          { text: "Minutes, self-serve", tone: "positive", icon: ZapIcon },
          {
            text: "Weeks of kickoff",
            tone: "negative",
            icon: TrendingDownIcon,
          },
          { text: "Ramp-up per person", tone: "neutral", icon: MinusIcon },
          { text: "You figure it out", tone: "neutral", icon: MinusIcon },
        ],
      },
    ],
  },
];

const HEADER_TOP = "top-[60px]";
const ROW_BORDER = "border-b border-[#e4e4e7]";
const COL_DIVIDER = "border-l border-dashed border-[#e4e4e7]";
const MARKETER_BG = "bg-[#fff]";

function DataCell({ cell, highlight }: { cell: Cell; highlight?: boolean }) {
  // Not-included cells read as a simple dash rather than the words.
  if (cell.text === "Not included") {
    return <div className="h-px w-4 rounded-full bg-[#bababc]" />;
  }
  return (
    <span className={`text-[14px] leading-[1.3] text-[#212121] text-center`}>
      {cell.text}
    </span>
  );
}

export default function ComparisonSection() {
  return (
    <div>
      <div className="">
        <div className="border-t border-[#e4e4e7] h-[2px] bg-white" />
        <div className="h-[44px] w-full flex-1 max-w-[1200px] mx-auto relative border-l border-r border-[#e4e4e7]" />
      </div>

      <div className="border-t border-[#e4e4e7] h-[2px] bg-white" />
      <div className="w-full flex-1 max-w-[1200px] mx-auto relative border-l border-r border-[#e4e4e7]">
        <div className="px-6 pb-10 pt-14 lg:px-8 mb-6">
          <div className="text-[34px] font-medium leading-[1.05] tracking-[-1px] lg:text-[44px] text-center">
            <span className="text-[#a1a1aa] text-center">
              The honest comparison.
            </span>
            <br />
            <span className="text-[#18181b] text-center">
              Marketer vs. the alternatives.
            </span>
          </div>
        </div>

        <div className="pb-0">
          <div className="grid grid-cols-[1.5fr_repeat(4,1fr)] border-t border-[#e4e4e7] border-dashed">
            <div
              className={`sticky ${HEADER_TOP} z-20 flex h-[56px] border-dashed items-center bg-[#fafafa] pl-4 ${ROW_BORDER}`}
            ></div>
            {COLUMNS.map((col, i) => (
              <div
                key={col}
                className={`sticky ${HEADER_TOP} z-20 flex h-[56px] justify-center items-center px-4 ${ROW_BORDER} ${COL_DIVIDER} ${
                  i === 0 ? `${MARKETER_BG}` : "bg-[#fafafa]"
                }`}
              >
                <span
                  className={`text-[14px] font-semibold text-[#18181b] text-center`}
                >
                  {col}
                </span>
              </div>
            ))}

            {GROUPS.map((group) => (
              <GroupBlock key={group.title} group={group} />
            ))}

            <div className="flex h-[68px] items-center pl-4" />
            <div
              className={`flex h-[68px] items-center justify-center px-4 ${COL_DIVIDER} ${MARKETER_BG}`}
            >
              <button
                className="flex h-[38px] w-full items-center justify-center rounded-[6px] bg-[#27272a] text-[14px] font-medium text-white/88 transition-colors hover:bg-[#3f3f46]"
                style={{
                  boxShadow:
                    "0px 0.75px 0px 0px rgba(255,255,255,0.2) inset,0px 1px 2px 0px rgba(0,0,0,0.4),0px 0px 0px 1px rgba(24,24,27,1)",
                }}
              >
                <div className="text-white/88 font-medium text-[15px]">
                  Get started
                </div>
              </button>
            </div>
            <div className={`h-[68px] ${COL_DIVIDER}`} />
            <div className={`h-[68px] ${COL_DIVIDER}`} />
          </div>
        </div>
      </div>
      <div className="">
        <div className="border-t border-[#e4e4e7] h-[2px] bg-white" />
        <div className="h-[44px] w-full flex-1 max-w-[1200px] mx-auto relative border-l border-r border-[#e4e4e7]" />
      </div>
    </div>
  );
}

function GroupBlock({ group }: { group: Group }) {
  return (
    <>
      <div
        className={`flex h-[40px] items-center bg-[#f6f6f7] pl-4 border-dashed ${ROW_BORDER}`}
      >
        <span className="text-[14px] font-medium text-[#6a6767]">
          {group.title}
        </span>
      </div>
      <div className={`h-[40px] bg-[#fbfbfc10] ${ROW_BORDER} ${COL_DIVIDER}`} />
      <div className={`h-[40px] bg-[#f6f6f7] ${ROW_BORDER} ${COL_DIVIDER}`} />
      <div className={`h-[40px] bg-[#f6f6f7] ${ROW_BORDER} ${COL_DIVIDER}`} />
      <div className={`h-[40px] bg-[#f6f6f7] ${ROW_BORDER} ${COL_DIVIDER}`} />

      {group.rows.map((row) => (
        <RowBlock key={row.criteria} row={row} />
      ))}
    </>
  );
}

function RowBlock({ row }: { row: Row }) {
  return (
    <>
      <div
        className={`flex h-[52px] items-center border-dashed gap-1.5 pl-4 ${ROW_BORDER}`}
      >
        <span className="text-[14px] font-medium text-[#18181b]">
          {row.criteria}
        </span>
      </div>
      {row.cells.map((cell, i) => (
        <div
          key={i}
          className={`flex h-[52px] items-center justify-center px-4 ${ROW_BORDER} ${COL_DIVIDER} ${
            i === 0 ? MARKETER_BG : ""
          }`}
        >
          <DataCell cell={cell} highlight={i === 0} />
        </div>
      ))}
    </>
  );
}
