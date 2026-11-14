"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Search,
} from "lucide-react";
import { DetectedClue } from "@/lib/types";
import { TACTIC_STYLES } from "@/lib/tactic-styles";
import { cn } from "@/lib/utils";

interface MessageXRayProps {
  originalMessage: string;
  clues: DetectedClue[];
  selectedClueId: string | null;
  onSelectClue: (id: string) => void;
}

interface TextSlice {
  key: string;
  text: string;
  clue?: DetectedClue;
}

export function MessageXRay({
  originalMessage,
  clues,
  selectedClueId,
  onSelectClue,
}: MessageXRayProps) {
  const [hoveredClueId, setHoveredClueId] = useState<string | null>(null);

  const slices = useMemo<TextSlice[]>(() => {
    if (clues.length === 0) {
      return [{ key: "plain-0", text: originalMessage }];
    }

    const result: TextSlice[] = [];
    let cursor = 0;

    for (const clue of clues) {
      if (clue.startIndex > cursor) {
        result.push({
          key: `plain-${cursor}`,
          text: originalMessage.slice(cursor, clue.startIndex),
        });
      }

      // Guard exact substring match
      const actualSlice = originalMessage.slice(clue.startIndex, clue.endIndex);
      result.push({
        key: clue.id,
        text: actualSlice,
        clue,
      });

      cursor = clue.endIndex;
    }

    if (cursor < originalMessage.length) {
      result.push({
        key: `plain-${cursor}`,
        text: originalMessage.slice(cursor),
      });
    }

    return result;
  }, [originalMessage, clues]);

  const activeId = hoveredClueId || selectedClueId || clues[0]?.id || null;
  const activeClue = clues.find((c) => c.id === activeId) || null;
  const activeIndex = activeClue
    ? clues.findIndex((c) => c.id === activeClue.id)
    : -1;

  const stepClue = (delta: number) => {
    if (clues.length === 0) return;
    const nextIdx = (activeIndex + delta + clues.length) % clues.length;
    onSelectClue(clues[nextIdx].id);
  };

  return (
    <div className="lantern-card overflow-hidden rounded-3xl p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#eceae3] pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
            <Search className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#161615]">
              Stage 2: Message X-Ray
            </h3>
            <p className="text-xs text-[#6b6963]">
              {clues.length > 0
                ? `${clues.length} highlighted ${
                    clues.length === 1 ? "phrase" : "phrases"
                  } matched directly inside your message. Click or hover any clue.`
                : "Inspected entire message text. No high-pressure phrases matched."}
            </p>
          </div>
        </div>

        {clues.length > 1 && (
          <div className="flex items-center gap-1 rounded-full border border-[#e5e3dc] bg-[#faf9f6] px-2 py-1">
            <button
              type="button"
              onClick={() => stepClue(-1)}
              aria-label="Previous clue"
              className="cursor-pointer rounded-full p-1 text-[#575652] hover:bg-white hover:text-[#161615]"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <span className="px-1.5 font-mono text-[11px] font-medium text-[#161615]">
              {activeIndex + 1} / {clues.length}
            </span>
            <button
              type="button"
              onClick={() => stepClue(1)}
              aria-label="Next clue"
              className="cursor-pointer rounded-full p-1 text-[#575652] hover:bg-white hover:text-[#161615]"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Original Message Viewer with Scanning Pass */}
      <div className="relative mt-4 overflow-hidden rounded-2xl border border-[#e5e3dc] bg-[#faf9f6] p-4 sm:p-5">
        <motion.div
          initial={{ x: "-100%", opacity: 0.75 }}
          animate={{ x: "120%", opacity: 0 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="pointer-events-none absolute inset-y-0 w-28 bg-gradient-to-r from-transparent via-amber-300/35 to-transparent"
        />

        <div className="whitespace-pre-wrap break-words text-[15px] leading-8 text-[#1e1e1c]">
          {slices.map((slice) => {
            if (!slice.clue) {
              return <span key={slice.key}>{slice.text}</span>;
            }

            const clue = slice.clue;
            const style = TACTIC_STYLES[clue.category];
            const isSelected = clue.id === activeClue?.id;

            return (
              <motion.button
                key={slice.key}
                type="button"
                initial={{ backgroundColor: "rgba(253, 230, 138, 0)" }}
                animate={{ backgroundColor: "rgba(253, 230, 138, 0)" }}
                onClick={() => onSelectClue(clue.id)}
                onMouseEnter={() => setHoveredClueId(clue.id)}
                onMouseLeave={() => setHoveredClueId(null)}
                className={cn(
                  "mx-0.5 inline cursor-pointer rounded-md border-b-2 px-1.5 py-0.5 text-left font-medium transition-all focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none",
                  style.highlightBorder,
                  isSelected ? style.highlightActiveBg : style.highlightBg
                )}
              >
                {slice.text}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Interactive Clue Explanation Card */}
      <div className="mt-5">
        <AnimatePresence mode="wait">
          {activeClue ? (
            <motion.div
              key={activeClue.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="rounded-2xl border border-[#e5e3dc] bg-white p-4 shadow-2xs sm:p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold",
                      TACTIC_STYLES[activeClue.category].badgeBg,
                      TACTIC_STYLES[activeClue.category].badgeText,
                      TACTIC_STYLES[activeClue.category].badgeBorder
                    )}
                  >
                    <span
                      className={cn(
                        "h-2 w-2 rounded-full",
                        TACTIC_STYLES[activeClue.category].dotColor
                      )}
                    />
                    {activeClue.tacticLabel}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#6b6963]">
                    {activeClue.severity === "strong"
                      ? "Strong warning sign"
                      : "Caution signal"}
                  </span>
                </div>
              </div>

              <div className="mt-3 rounded-xl bg-[#faf9f6] px-3.5 py-2.5 font-mono text-xs text-[#262624]">
                <span className="text-[#6b6963]">Exact supporting text: </span>
                <span className="font-semibold">
                  &ldquo;{activeClue.exactText}&rdquo;
                </span>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#575652]">
                    <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                    <span>Why this tactic matters</span>
                  </div>
                  <p className="text-sm leading-relaxed text-[#262624]">
                    {activeClue.whyItMatters}
                  </p>
                </div>

                <div className="space-y-1 rounded-xl border border-teal-200/80 bg-teal-50/40 p-3">
                  <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-teal-900">
                    <ShieldCheck className="h-3.5 w-3.5 text-teal-700" />
                    <span>What you should do instead</span>
                  </div>
                  <p className="text-sm leading-relaxed text-teal-950">
                    {activeClue.whatToDoInstead}
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="no-clues-card"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-start gap-3 rounded-2xl border border-[#e5e3dc] bg-white p-4"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />
              <div className="space-y-1 text-sm">
                <p className="font-semibold text-[#161615]">
                  No specific warning phrases highlighted
                </p>
                <p className="text-xs leading-relaxed text-[#575652]">
                  The supplied text did not trigger urgency, link, fee, or
                  credential rules. Still, never assume an unexpected sender is
                  verified based solely on polite wording.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
