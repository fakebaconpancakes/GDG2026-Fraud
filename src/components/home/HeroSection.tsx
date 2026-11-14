"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowDownRight, Play, Sparkles, ShieldCheck, Eye } from "lucide-react";

interface HeroSectionProps {
  onStartInspect: () => void;
  onTryLiveExample: () => void;
}

const HERO_DEMO_CLUES = [
  {
    phrase: "official Fraud Prevention Team",
    tag: "Unverified Authority Claim",
    color: "bg-stone-200 text-stone-950 border-stone-400",
    note: "Anyone can type an official department title in an SMS. Sender text never proves identity.",
  },
  {
    phrase: "suspended within 15 minutes",
    tag: "Artificial Urgency",
    color: "bg-amber-200/90 text-amber-950 border-amber-500",
    note: "Tight countdown timers are designed to stop you from opening your real banking app first.",
  },
  {
    phrase: "provide your 6-digit OTP",
    tag: "Sensitive Credential Request",
    color: "bg-rose-200/90 text-rose-950 border-rose-500",
    note: "Real banks never ask you to read back or reply with a one-time passcode.",
  },
];

export function HeroSection({
  onStartInspect,
  onTryLiveExample,
}: HeroSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_DEMO_CLUES.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const currentClue = HERO_DEMO_CLUES[activeIndex];

  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Editorial Copy */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 rounded-full border border-amber-300/70 bg-amber-50/90 px-3.5 py-1 text-xs font-semibold text-amber-900"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-600" />
              <span>Interactive Scam Investigation Studio</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="mt-5 text-4xl font-bold tracking-tight text-[#161615] sm:text-5xl lg:text-[3.35rem] lg:leading-[1.08]"
            >
              Scams are getting smarter.{" "}
              <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 bg-clip-text text-transparent">
                So should your instincts.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="mt-5 max-w-xl text-base leading-relaxed text-[#575652] sm:text-lg"
            >
              LANTERN reveals suspicious clues, explains the tricks behind them,
              and helps you take the safest next step.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15 }}
              className="mt-8 flex flex-wrap items-center gap-3.5"
            >
              <button
                type="button"
                onClick={onStartInspect}
                className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#161615] px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-[#2a2a28] focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none"
              >
                <span>Inspect a message</span>
                <ArrowDownRight className="h-4 w-4 text-amber-400" />
              </button>

              <button
                type="button"
                onClick={onTryLiveExample}
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#d6d3c9] bg-white px-5 py-3.5 text-sm font-semibold text-[#161615] shadow-2xs transition-all hover:-translate-y-0.5 hover:border-amber-400 hover:bg-amber-50/40 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none"
              >
                <Play className="h-3.5 w-3.5 fill-amber-500 text-amber-600" />
                <span>Try a live example</span>
              </button>
            </motion.div>

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#6b6963]">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-teal-600" />
                No sign-up required
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Eye className="h-4 w-4 text-amber-600" />
                Exact-phrase X-Ray evidence
              </span>
              <span className="font-mono text-[11px]">
                Browser-local screenshot OCR
              </span>
            </div>
          </div>

          {/* Animated Live Message X-Ray Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="lg:col-span-5"
          >
            <div className="lantern-card relative overflow-hidden rounded-3xl p-5 sm:p-6">
              <div className="flex items-center justify-between border-b border-[#eceae3] pb-3.5">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-500" />
                  </span>
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#575652]">
                    Live X-Ray Preview
                  </span>
                </div>
                <span className="rounded-full bg-[#f3f1ec] px-2.5 py-0.5 font-mono text-[11px] text-[#575652]">
                  SMS • Unknown Sender
                </span>
              </div>

              <div className="mt-4 rounded-2xl border border-[#eceae3] bg-[#faf9f6] p-4 text-sm leading-7 text-[#262624]">
                &ldquo;Hello, I am from the{" "}
                <button
                  type="button"
                  onClick={() => setActiveIndex(0)}
                  className={`cursor-pointer rounded-md border-b-2 px-1 py-0.5 font-medium transition-all ${
                    activeIndex === 0
                      ? HERO_DEMO_CLUES[0].color + " shadow-xs"
                      : "border-stone-300 bg-stone-100/80"
                  }`}
                >
                  official Fraud Prevention Team
                </button>
                . Your account will be{" "}
                <button
                  type="button"
                  onClick={() => setActiveIndex(1)}
                  className={`cursor-pointer rounded-md border-b-2 px-1 py-0.5 font-medium transition-all ${
                    activeIndex === 1
                      ? HERO_DEMO_CLUES[1].color + " shadow-xs"
                      : "border-amber-300 bg-amber-50"
                  }`}
                >
                  suspended within 15 minutes
                </button>
                . Please{" "}
                <button
                  type="button"
                  onClick={() => setActiveIndex(2)}
                  className={`cursor-pointer rounded-md border-b-2 px-1 py-0.5 font-medium transition-all ${
                    activeIndex === 2
                      ? HERO_DEMO_CLUES[2].color + " shadow-xs"
                      : "border-rose-300 bg-rose-50"
                  }`}
                >
                  provide your 6-digit OTP
                </button>{" "}
                to cancel.&rdquo;
              </div>

              <div className="mt-4 min-h-[108px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentClue.tag}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.22 }}
                    className="rounded-2xl border border-amber-200/80 bg-amber-50/50 p-3.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-amber-900">
                        Clue #{activeIndex + 1}: {currentClue.tag}
                      </span>
                      <div className="flex gap-1">
                        {HERO_DEMO_CLUES.map((_, i) => (
                          <button
                            key={i}
                            type="button"
                            aria-label={`Preview clue ${i + 1}`}
                            onClick={() => setActiveIndex(i)}
                            className={`h-1.5 rounded-full transition-all ${
                              i === activeIndex
                                ? "w-5 bg-amber-600"
                                : "w-1.5 bg-amber-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-[#3f3e3a]">
                      {currentClue.note}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
