import {
  Bot,
  LayoutDashboard,
  Telescope,
  Sparkles,
  MessageSquare,
  ScrollText,
  type LucideIcon,
} from "lucide-react";

type Benefit = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const benefits: Benefit[] = [
  {
    icon: Bot,
    title: "Autonomous agents",
    description:
      "Agents read every ad account 24/7 and act on performance signals — pausing, scaling, and reallocating budget on their own.",
  },
  {
    icon: LayoutDashboard,
    title: "Unified dashboard",
    description:
      "Meta, Google, Snapchat, and ChatGPT Ads in one workspace, with real-time ROAS, CAC, and spend across every channel.",
  },
  {
    icon: Telescope,
    title: "Research & insights",
    description:
      "Mines Reddit, search trends, and competitor ads to surface fresh audiences and messaging angles automatically.",
  },
  {
    icon: Sparkles,
    title: "Creative generation",
    description:
      "Ember spins up on-brand ad creative on demand, so campaigns never stall waiting on the next asset.",
  },
  {
    icon: MessageSquare,
    title: "Run ads from Slack",
    description:
      "Launch, pause, and adjust campaigns with plain-language commands, plus a morning brief delivered to your team.",
  },
  {
    icon: ScrollText,
    title: "Audit logs",
    description:
      "Every automated decision is logged, explained, and overridable — a full trail of what changed and why.",
  },
];

export default function BenefitsSection() {
  return (
    <div>
      <div className="border-t border-[#e4e4e7] h-[2px] bg-white" />
      <div className="py-[20px] w-full flex-1 max-w-[1200px] mx-auto relative border-l border-r border-[#e4e4e7] border-dashed">
        <div className="pt-10 pb-8 flex items-center justify-center flex-col">
          <h2 className="mb-3 text-center text-[40px] leading-[1.05] tracking-[-1.5px] font-medium text-[#18181b] max-w-[330px]">
            Agentic marketing runs on Marketer
          </h2>
          <div className="text-center max-w-[350px] mx-auto text-[#52525b]">
            Marketer scales with your team so you don't have to compromise as
            you grow.
          </div>
        </div>

        <div className="border-t border-b border-dashed border-[#e4e4e7] flex justify-center relative">
          <div className="max-w-[800px] mx-auto border-l border-r border-[#e4e4e7] border-dashed p-2 relative z-2">
            <div
              className="grid grid-cols-2 rounded-[16px] bg-white"
              style={{
                boxShadow: "0 0 0 1px #0000001a",
              }}
            >
              {benefits.map(({ icon: Icon, title, description }, i) => {
                const isLeftCol = i % 2 === 0;
                const isLastRow = i >= benefits.length - 2;
                return (
                  <div
                    key={title}
                    className={[
                      "p-6 border-dashed border-[#e4e4e7]",
                      isLeftCol ? "border-r" : "",
                      isLastRow ? "" : "border-b",
                    ].join(" ")}
                  >
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5">
                        <Icon
                          className="w-4.5 h-4.5 text-[#737373]"
                          strokeWidth={1.5}
                        />
                        <div className="font-medium text-[14px]">{title}</div>
                      </div>
                      <div className="text-[#737373] text-[13px] leading-[1.35]">
                        {description}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="z-1 absolute left-0 bottom-[40px] w-[64px] h-[500px] overflow-visible flex flex-col items-start justify-between">
            <div className="h-min flex items-center w-min gap-2 relative">
              <div className="w-[9px] h-px bg-[#e4e4e7]" />
              <div className="text-[#d3d3d3] text-[12px]">$100k</div>
            </div>
            <div className="h-min flex items-center w-min gap-2 relative">
              <div className="w-[9px] h-px bg-[#e4e4e7]" />
            </div>
            <div className="h-min flex items-center w-min gap-2 relative">
              <div className="w-[9px] h-px bg-[#e4e4e7]" />
              <div className="text-[#d3d3d3] text-[12px]">$80k</div>
            </div>
            <div className="h-min flex items-center w-min gap-2 relative">
              <div className="w-[9px] h-px bg-[#e4e4e7]" />
            </div>
            <div className="h-min flex items-center w-min gap-2 relative">
              <div className="w-[9px] h-px bg-[#e4e4e7]" />
              <div className="text-[#d3d3d3] text-[12px]">$60k</div>
            </div>
            <div className="h-min flex items-center w-min gap-2 relative">
              <div className="w-[9px] h-px bg-[#e4e4e7]" />
            </div>
            <div className="h-min flex items-center w-min gap-2 relative">
              <div className="w-[9px] h-px bg-[#e4e4e7]" />
              <div className="text-[#d3d3d3] text-[12px]">$40k</div>
            </div>
            <div className="h-min flex items-center w-min gap-2 relative">
              <div className="w-[9px] h-px bg-[#e4e4e7]" />
            </div>
            <div className="h-min flex items-center w-min gap-2 relative">
              <div className="w-[9px] h-px bg-[#e4e4e7]" />
              <div className="text-[#d3d3d3] text-[12px]">$20k</div>
            </div>
            <div className="h-min flex items-center w-min gap-2 relative">
              <div className="w-[9px] h-px bg-[#e4e4e7]" />
            </div>
          </div>
          <div className="absolute z-1 bottom-0 left-0 -top-[94px] w-full overflow-hidden">
            <svg
              width="1201"
              height="482"
              viewBox="0 0 1201 482"
              fill="none"
              id="svg1318973209_528"
              className="w-full h-full block"
            >
              <path
                d="M0 401C406 401 890.963 401 1201 0"
                stroke="#D6D6D6"
              ></path>
              <path
                d="M1201 0C890.963 400.95 406 400.95 0 400.95V481.5H1201V0Z"
                fill="url(#svg1318973209_528_paint0_linear_3165_46189)"
                fillOpacity="0.1"
              ></path>
              <defs>
                <linearGradient
                  id="svg1318973209_528_paint0_linear_3165_46189"
                  x1="748.5"
                  y1="459.073"
                  x2="740.731"
                  y2="314.067"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F5F5F5"></stop>
                  <stop offset="1" stopColor="#CBCBCB"></stop>
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
