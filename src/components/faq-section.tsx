"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const faqs: { q: string; a: string }[] = [
  {
    q: "What does Marketer actually do?",
    a: "Marketer creates your ads, runs your campaigns, and reports on what's working — across Meta and Google. One platform doing the execution work a marketing team plus a creative agency would do, at software speed and software economics.",
  },
  {
    q: "How much does Marketer cost?",
    a: "Pricing scales with your ad spend and team size. The most common starting point fits brands spending $20k–$200k/month on ads. See the full breakdown on the pricing page.",
  },
  {
    q: "How quickly will I see results?",
    a: "Your first campaigns are live within days of onboarding. Most brands see a clear performance signal in 2–4 weeks. The platform compounds — more data in, sharper decisions out.",
  },
  {
    q: "Do I lose control of my campaigns?",
    a: "No. Marketer runs autonomously by default, but every action is visible and editable. You set the guardrails — budget caps, brand voice, audiences off-limits — and the platform respects them.",
  },
  {
    q: "Does Marketer replace my marketing team?",
    a: "It replaces the execution work — creative production, campaign management, daily optimization — so your team focuses on strategy, brand, and what's next. Most customers grow their team after adopting Marketer, not shrink it.",
  },
  {
    q: "How does onboarding work?",
    a: "After signing up, you'll connect your sales channels and ad accounts. From there, the platform analyzes your data and starts building campaigns tailored to your brand within days.",
  },
  {
    q: "Is my data secure with Marketer?",
    a: "Yes. We use enterprise-grade encryption and strict access controls. Your data is never shared with third parties and is only used to optimize your campaigns.",
  },
];

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

function Chevron({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 256 256"
      className={className}
    >
      <path d="M216.49,104.49l-80,80a12,12,0,0,1-17,0l-80-80a12,12,0,0,1,17-17L128,159l71.51-71.52a12,12,0,0,1,17,17Z" />
    </svg>
  );
}

export default function FaqSection() {
  const [open, setOpen] = useState(0);

  return (
    <div>
      <div className="border-t border-[#e4e4e7] h-[2px] bg-white" />
      <div className="w-full max-w-[1200px] mx-auto border-l border-r border-[#e4e4e7]">
        <div className="grid md:grid-cols-5">
          {/* Left column */}
          <div className="md:col-span-2 py-6 px-6 md:p-10 lg:p-12">
            <h2 className="font-medium text-5xl tracking-[-1.5px] text-[#18181b]">
              FAQ
            </h2>
            <p className="mt-6 text-balance text-[#52525b] max-md:hidden">
              Read some of the most asked questions around Marketer. If you
              cannot find your answer, reach out to us using the chat in the
              bottom-right corner!
            </p>
          </div>

          {/* Right column — accordion */}
          <div className="md:col-span-3 pt-6 px-6 md:px-4 md:pt-10 md:pb-4 lg:pt-12">
            <div className="-space-y-1">
              {faqs.map((faq, i) => {
                const isOpen = open === i;
                const isLast = i === faqs.length - 1;
                return (
                  <div
                    key={faq.q}
                    className={cn(
                      "rounded-xl px-6 py-1 transition-shadow",
                      isOpen && "bg-white shadow ring-1 ring-black/5",
                    )}
                  >
                    <h3 className="flex">
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setOpen(isOpen ? -1 : i)}
                        className={cn(
                          "group flex flex-1 items-start justify-between gap-4 py-4 text-left font-medium text-base text-[#18181b] outline-none cursor-pointer border-b",
                          isOpen || isLast
                            ? "border-transparent"
                            : "border-[#e4e4e7]",
                        )}
                      >
                        {faq.q}
                        <Chevron
                          className={cn(
                            "pointer-events-none size-4 shrink-0 translate-y-0.5 text-[#71717a] transition-transform duration-200 group-hover:translate-y-1",
                            isOpen && "rotate-180 group-hover:translate-y-0.5",
                          )}
                        />
                      </button>
                    </h3>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <p className="pt-0 pb-4 text-sm text-[#52525b]">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile note */}
          <div className="md:hidden">
            <p className="p-6 text-[#52525b]">
              Read some of the most asked questions around Marketer. If you
              cannot find your answer, reach out to us using the chat in the
              bottom-right corner!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
