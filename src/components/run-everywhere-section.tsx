"use client";

import { useEffect, useRef, useState } from "react";

const CDN = "https://hypercal.lue.studio/build";
const BG = `${CDN}/q-8840ef3b.png`;
const BG_MOBILE = `${CDN}/q-a7df314a.png`;
const GRID = `${CDN}/q-30b66ec0.png`;
const OCTOPUS_POSTER = `${CDN}/q-f3daf06a.png`;
const OCTOPUS_VIDEO = `${CDN}/q-2adc9825.webm`;

const CSS = `
.smart-sync.card{background:#00031a;border-radius:20px;position:relative;display:flex;flex-direction:column;justify-content:flex-end;padding-bottom:32px;padding-left:40px;padding-right:40px;isolation:isolate;overflow:hidden}
.smart-sync.card:before{background:linear-gradient(180deg,rgba(0,3,26,0) 0%,rgba(255,255,255,.08) 100%),linear-gradient(0deg,rgba(255,255,255,.05),rgba(255,255,255,.05));border-radius:inherit;content:"";inset:0;-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;mask-composite:exclude;padding:1px;pointer-events:none;position:absolute;z-index:2}
.smart-sync .card-text{position:relative;z-index:3}
.smart-sync .card-description{color:#b5bcd9;font-size:16px;line-height:24px;font-feature-settings:"ss01" on,"cv10" on,"calt" off,"liga" off}
.smart-sync-background{object-fit:cover;pointer-events:none}
.smart-sync-octopus{pointer-events:none}
.smart-sync-octopus video{width:100%;height:auto;display:block}
.smart-sync-grid{overflow:hidden;pointer-events:none;-webkit-mask-image:var(--background-image);mask-image:var(--background-image);-webkit-mask-size:cover;mask-size:cover;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat}
.smart-sync-lines{pointer-events:none}
.smart-sync .card-title{font-feature-settings:inherit;font-family:Inter V Display,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif}.smart-sync .card-title{font-size:32px;line-height:40px;font-weight:500}.smart-sync{padding-left:48px!important;padding-bottom:48px!important;height:652px}.smart-sync .card-text{max-width:375px}.smart-sync .card-title{background:linear-gradient(180deg,rgba(255,255,255,.7) 0%,#FFF 100%);-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent;margin-bottom:16px}.smart-sync-background{width:100%;height:100%;position:absolute;top:0;left:0}.smart-sync-lines{width:504px;height:396px;top:-.5px;left:50%;transform:translate(-50%);position:absolute;-webkit-mask-image:radial-gradient(50% 59.93% at 50% 40.07%,rgba(217,217,217,0) 27.22%,#D9D9D9 31.98%,#D9D9D9 56.05%,#D9D9D9 91.65%,rgba(217,217,217,0) 100%);mask-image:radial-gradient(50% 59.93% at 50% 40.07%,rgba(217,217,217,0) 27.22%,#D9D9D9 31.98%,#D9D9D9 56.05%,#D9D9D9 91.65%,rgba(217,217,217,0) 100%);-webkit-mask-size:100% 267px;mask-size:100% 267px;-webkit-mask-position:0 137px;mask-position:0 137px;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat}.smart-sync-lines div{position:absolute;box-shadow:0 0 12px #a578ffa6}.smart-sync-lines div:nth-child(1){transition-delay:50ms}.smart-sync-lines div:nth-child(2){transition-delay:.1s}.smart-sync-lines div:nth-child(3){transition-delay:.15s}.smart-sync-lines div:nth-child(4){transition-delay:.2s}.smart-sync-lines div:nth-child(5){transition-delay:.25s}.smart-sync-lines div:nth-child(6){transition-delay:.3s}.smart-sync-lines div:nth-child(7){transition-delay:.35s}.smart-sync-lines div:nth-child(8){transition-delay:.4s}.smart-sync-lines div:nth-child(9){transition-delay:.45s}.smart-sync-lines div:nth-child(-n+6){height:1px}.smart-sync-lines div:nth-child(-n+3){background:linear-gradient(to left,transparent 0%,#A578FF 2.15%,transparent 88.34%)}.smart-sync-lines div:nth-child(4),.smart-sync-lines div:nth-child(5),.smart-sync-lines div:nth-child(6){background:linear-gradient(to right,transparent 0%,#A578FF 2.15%,transparent 88.34%)}.smart-sync-lines div:nth-child(1),.smart-sync-lines div:nth-child(4){width:72px;top:208px}.smart-sync-lines div:nth-child(1){left:-80px}.smart-sync-lines div:nth-child(4){right:-80px}.smart-sync-lines div:nth-child(2),.smart-sync-lines div:nth-child(5){width:108px;top:244px}.smart-sync-lines div:nth-child(2){left:-124px}.smart-sync-lines div:nth-child(5){right:-124px}.smart-sync-lines div:nth-child(3),.smart-sync-lines div:nth-child(6){width:72px;top:280px}.smart-sync-lines div:nth-child(3){left:-108px}.smart-sync-lines div:nth-child(6){right:-108px}.smart-sync-lines div:nth-child(n+7){width:1px;background:linear-gradient(to bottom,transparent 0%,#A578FF 2.15%,transparent 88.34%)}.smart-sync-lines div:nth-child(7){top:440px;left:207px;height:60px}.smart-sync-lines div:nth-child(8){top:427px;left:243px;height:36px}.smart-sync-lines div:nth-child(9){top:458px;left:279px;height:36px}.smart-sync-octopus{width:96px;height:96px;top:194px;left:195px;position:absolute;z-index:1}.smart-sync-grid{width:361px;height:239.5px;top:63.5px;left:62.5px;position:absolute}.smart-sync-grid div{transform:translateY(340px);width:100%;height:100px;background:linear-gradient(to top,transparent,#A578FF)}.smart-sync-step-2 .smart-sync-lines div:nth-child(1),.smart-sync-step-2 .smart-sync-lines div:nth-child(2),.smart-sync-step-2 .smart-sync-lines div:nth-child(3),.smart-sync-step-2 .smart-sync-lines div:nth-child(4),.smart-sync-step-2 .smart-sync-lines div:nth-child(6),.smart-sync-step-2 .smart-sync-lines div:nth-child(8),.smart-sync-step-2 .smart-sync-lines div:nth-child(9){transition:1s cubic-bezier(.6,.6,0,1) transform}.smart-sync-step-2 .smart-sync-lines div:nth-child(2){transform:translate(310px)}.smart-sync-step-2 .smart-sync-lines div:nth-child(3){transform:translate(320px)}.smart-sync-step-2 .smart-sync-lines div:nth-child(4){transform:translate(-290px)}.smart-sync-step-2 .smart-sync-lines div:nth-child(6){transform:translate(-320px)}.smart-sync-step-2 .smart-sync-lines div:nth-child(8){transform:translateY(-220px)}.smart-sync-step-2 .smart-sync-lines div:nth-child(9){transform:translateY(-240px)}.smart-sync-step-3 .smart-sync-lines div:nth-child(1),.smart-sync-step-3 .smart-sync-lines div:nth-child(5),.smart-sync-step-3 .smart-sync-lines div:nth-child(7){transition:1s cubic-bezier(.6,.6,0,1) transform}.smart-sync-step-3 .smart-sync-lines div:nth-child(1){transform:translate(290px)}.smart-sync-step-3 .smart-sync-lines div:nth-child(5){transform:translate(-310px)}.smart-sync-step-3 .smart-sync-lines div:nth-child(7){transform:translateY(-230px)}.smart-sync-step-last .smart-sync-grid div{transform:translateY(-200px);transition:3s cubic-bezier(.6,.6,0,1) transform}@media (max-width: 486px){.smart-sync{padding-left:32px!important;padding-bottom:32px!important;height:574px}.smart-sync-octopus{width:72px;height:72px;left:139px;top:163px}.smart-sync-grid{width:270.75px;height:179.63px;left:39.62px;top:65.62px}.smart-sync-lines{width:378px;height:297px;-webkit-mask-size:99% 261.25px;mask-size:99% 261.25px;-webkit-mask-position:0 266%;mask-position:0 266%}.smart-sync-lines div:nth-child(1),.smart-sync-lines div:nth-child(4){top:174px}.smart-sync-lines div:nth-child(1){left:-132px}.smart-sync-lines div:nth-child(4){right:-132px}.smart-sync-lines div:nth-child(2),.smart-sync-lines div:nth-child(5){top:201px}.smart-sync-lines div:nth-child(2){left:-180px}.smart-sync-lines div:nth-child(5){right:-180px}.smart-sync-lines div:nth-child(3),.smart-sync-lines div:nth-child(6){top:228px}.smart-sync-lines div:nth-child(3){left:-170px}.smart-sync-lines div:nth-child(6){right:-170px}.smart-sync-lines div:nth-child(7){top:410px;left:161px}.smart-sync-lines div:nth-child(8){left:188.5px}.smart-sync-lines div:nth-child(9){top:428px;left:215.5px}}
`;

export default function RunEverywhereSection() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(1);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    let interval = 0;
    const start = () => {
      clearInterval(interval);
      interval = window.setInterval(() => {
        setStep((s) => (s + 1 === 5 ? 1 : s + 1));
      }, 1300);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start();
        else clearInterval(interval);
      },
      { threshold: 0.1 },
    );
    observer.observe(el);

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  const cardClass = [
    "card",
    "smart-sync",
    `smart-sync-step-${step}`,
    step >= 4 ? "smart-sync-step-last" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div>
      <div className="border-t border-[#e4e4e7] h-[2px] bg-white" />
      <div className="w-full flex-1 max-w-[1200px] mx-auto relative border-l border-r border-[#e4e4e7]">
        <style>{CSS}</style>
        <div className="flex justify-center px-6 py-14">
          <div
            ref={cardRef}
            className={cardClass}
            style={{ width: "min(486px, 100%)" }}
          >
            <picture>
              <source media="(max-width: 486px)" srcSet={BG_MOBILE} />
              <img
                className="smart-sync-background"
                src={BG}
                alt=""
                aria-hidden="true"
              />
            </picture>

            <div className="smart-sync-octopus">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="none"
                poster={OCTOPUS_POSTER}
                src={OCTOPUS_VIDEO}
              />
            </div>

            <div
              className="smart-sync-grid"
              style={
                {
                  "--background-image": `url('${GRID}')`,
                } as React.CSSProperties
              }
            >
              <div />
            </div>

            <div className="smart-sync-lines">
              {Array.from({ length: 9 }, (_, i) => (
                <div key={i} />
              ))}
            </div>

            <div className="card-text">
              <div className="card-title">Run everywhere, all at once</div>
              <div className="card-description">
                One agent brain reaches across Meta, Google, and Snapchat —
                pulling every signal in and pushing every optimization back out,
                24/7.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
