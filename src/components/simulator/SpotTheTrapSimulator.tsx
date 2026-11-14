"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Eye,
  ArrowRight,
  RotateCcw,
  Award,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { SIMULATOR_SCENARIOS } from "@/lib/data/simulator-scenarios";
import { cn } from "@/lib/utils";

export function SpotTheTrapSimulator() {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [selectedIds, setSelectedIds] = useState<Record<string, boolean>>({});
  const [revealed, setRevealed] = useState(false);
  const [completedScores, setCompletedScores] = useState<
    { scenarioTitle: string; found: number; total: number }[]
  >([]);
  const [finishedAll, setFinishedAll] = useState(false);

  const current = SIMULATOR_SCENARIOS[scenarioIdx];
  const suspiciousSegments = current.segments.filter((s) => s.isSuspicious);

  const toggleSegment = (id: string) => {
    if (revealed) return;
    setSelectedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleReveal = () => {
    setRevealed(true);
  };

  const handleNext = () => {
    const foundCount = suspiciousSegments.filter(
      (s) => selectedIds[s.id]
    ).length;

    const nextScores = [
      ...completedScores,
      {
        scenarioTitle: current.category,
        found: foundCount,
        total: suspiciousSegments.length,
      },
    ];
    setCompletedScores(nextScores);

    if (scenarioIdx + 1 >= SIMULATOR_SCENARIOS.length) {
      setFinishedAll(true);
    } else {
      setScenarioIdx((i) => i + 1);
      setSelectedIds({});
      setRevealed(false);
    }
  };

  const handleRestart = () => {
    setScenarioIdx(0);
    setSelectedIds({});
    setRevealed(false);
    setCompletedScores([]);
    setFinishedAll(false);
  };

  if (finishedAll) {
    const totalFound = completedScores.reduce((acc, s) => acc + s.found, 0);
    const totalClues = completedScores.reduce((acc, s) => acc + s.total, 0);

    return (
      <div className="lantern-card rounded-3xl p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-800">
            <Award className="h-6 w-6" />
          </div>
          <div>
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-amber-800">
              Field Training Complete
            </span>
            <h2 className="text-2xl font-bold text-[#161615]">
              You spotted {totalFound} of {totalClues} manipulation clues
            </h2>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {completedScores.map((item) => (
            <div
              key={item.scenarioTitle}
              className="flex items-center justify-between rounded-2xl border border-[#e5e3dc] bg-[#faf9f6] px-4 py-3"
            >
              <span className="text-xs font-semibold text-[#161615]">
                {item.scenarioTitle}
              </span>
              <span className="rounded-full bg-white px-2.5 py-0.5 font-mono text-xs font-semibold text-teal-800">
                {item.found}/{item.total} clues
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-teal-200 bg-teal-50/50 p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-teal-900">
            Core Habit to Keep
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-teal-950">
            Whenever an incoming message combines an authority claim, time
            pressure, and a request for codes, fees, links, or private chats,
            step outside the conversation and check through an official channel
            you open yourself.
          </p>
        </div>

        <button
          type="button"
          onClick={handleRestart}
          className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#161615] px-5 py-3 text-sm font-semibold text-white hover:bg-[#2a2a28]"
        >
          <RotateCcw className="h-4 w-4 text-amber-400" />
          <span>Replay Scenarios</span>
        </button>
      </div>
    );
  }

  const foundInCurrent = suspiciousSegments.filter(
    (s) => selectedIds[s.id]
  ).length;
  const falsePositives = current.segments.filter(
    (s) => !s.isSuspicious && selectedIds[s.id]
  ).length;

  return (
    <div className="lantern-card rounded-3xl p-5 sm:p-8">
      {/* Header & Progress */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#eceae3] pb-4">
        <div>
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-amber-700">
            Scenario {scenarioIdx + 1} of {SIMULATOR_SCENARIOS.length} •{" "}
            {current.category}
          </span>
          <h2 className="mt-1 text-xl font-bold text-[#161615]">
            {current.title}
          </h2>
        </div>

        <div className="flex items-center gap-1.5">
          {SIMULATOR_SCENARIOS.map((sc, idx) => (
            <span
              key={sc.id}
              className={cn(
                "h-2 rounded-full transition-all",
                idx === scenarioIdx
                  ? "w-7 bg-amber-500"
                  : idx < scenarioIdx
                  ? "w-3 bg-teal-600"
                  : "w-3 bg-[#e5e3dc]"
              )}
            />
          ))}
        </div>
      </div>

      <p className="mt-4 text-xs font-medium text-[#575652] sm:text-sm">
        Tap the phrases inside the chat bubble below that look like manipulation
        or warning signs, then click <strong>Reveal Analysis</strong>.
      </p>

      {/* Realistic Chat Interface */}
      <div className="mt-4 rounded-2xl border border-[#e5e3dc] bg-[#faf9f6] p-4 sm:p-6">
        <div className="mb-3 flex items-center justify-between border-b border-[#eceae3] pb-3">
          <div>
            <p className="text-sm font-bold text-[#161615]">
              {current.senderName}
            </p>
            <p className="text-[11px] text-[#6b6963]">
              {current.channel} • {current.senderSubtext}
            </p>
          </div>
          <span className="font-mono text-[11px] text-[#6b6963]">
            {current.timestamp}
          </span>
        </div>

        <div className="max-w-2xl rounded-2xl rounded-tl-sm border border-[#dcd9d0] bg-white p-4 text-[15px] leading-8 text-[#1e1e1c] shadow-2xs">
          {current.segments.map((seg) => {
            const isPicked = Boolean(selectedIds[seg.id]);
            const isInteractive = seg.text.trim().length > 1;

            if (!isInteractive) {
              return <span key={seg.id}>{seg.text}</span>;
            }

            let stateStyle =
              "hover:bg-amber-50 border-b border-dashed border-[#c7c3b8]";
            if (!revealed && isPicked) {
              stateStyle =
                "bg-amber-200/80 text-amber-950 border-b-2 border-amber-500 font-medium";
            } else if (revealed && seg.isSuspicious && isPicked) {
              stateStyle =
                "bg-teal-100 text-teal-950 border-b-2 border-teal-600 font-semibold";
            } else if (revealed && seg.isSuspicious && !isPicked) {
              stateStyle =
                "bg-rose-100 text-rose-950 border-b-2 border-rose-500 font-semibold";
            } else if (revealed && !seg.isSuspicious && isPicked) {
              stateStyle =
                "bg-stone-200 text-stone-700 line-through border-stone-400";
            }

            return (
              <button
                key={seg.id}
                type="button"
                onClick={() => toggleSegment(seg.id)}
                className={cn(
                  "mx-0.5 inline cursor-pointer rounded-md px-1 py-0.5 text-left transition-all",
                  stateStyle
                )}
              >
                {seg.text}
              </button>
            );
          })}
        </div>
      </div>

      {/* Controls or Revealed Breakdown */}
      <div className="mt-5">
        {!revealed ? (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="font-mono text-xs text-[#6b6963]">
              {Object.values(selectedIds).filter(Boolean).length} phrase(s)
              flagged
            </span>

            <button
              type="button"
              onClick={handleReveal}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#161615] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#2a2a28]"
            >
              <Eye className="h-4 w-4 text-amber-400" />
              <span>Reveal Analysis</span>
            </button>
          </div>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-[#e5e3dc] bg-white px-4 py-3">
                <div className="flex items-center gap-2 text-sm font-bold text-[#161615]">
                  <Sparkles className="h-4 w-4 text-amber-600" />
                  <span>
                    You caught {foundInCurrent} of {suspiciousSegments.length}{" "}
                    warning clues
                    {falsePositives > 0
                      ? ` (${falsePositives} neutral phrase selected)`
                      : ""}
                    .
                  </span>
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                {suspiciousSegments.map((seg) => {
                  const caught = Boolean(selectedIds[seg.id]);
                  return (
                    <div
                      key={seg.id}
                      className="rounded-2xl border border-[#e5e3dc] bg-white p-3.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="rounded-full bg-amber-100 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase text-amber-900">
                          {seg.tactic}
                        </span>
                        <span
                          className={cn(
                            "text-[11px] font-semibold",
                            caught ? "text-teal-700" : "text-rose-700"
                          )}
                        >
                          {caught ? "Spotted" : "Missed"}
                        </span>
                      </div>
                      <p className="mt-2 font-mono text-xs font-semibold text-[#161615]">
                        &ldquo;{seg.text.trim()}&rdquo;
                      </p>
                      <p className="mt-1.5 text-xs leading-relaxed text-[#575652]">
                        {seg.explanation}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col justify-between gap-4 rounded-2xl border border-teal-200 bg-teal-50/50 p-4 sm:flex-row sm:items-center">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-teal-700" />
                  <p className="text-xs leading-relaxed text-teal-950">
                    <strong>Safe Habit:</strong> {current.safeTakeaway}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full bg-[#161615] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#2a2a28]"
                >
                  <span>
                    {scenarioIdx + 1 >= SIMULATOR_SCENARIOS.length
                      ? "View Summary"
                      : "Next Scenario"}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-amber-400" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
