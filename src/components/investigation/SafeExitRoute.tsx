"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Circle,
  Copy,
  Check,
  Compass,
  ShieldCheck,
} from "lucide-react";
import { InvestigationResult } from "@/lib/types";
import { cn } from "@/lib/utils";

interface SafeExitRouteProps {
  result: InvestigationResult;
}

export function SafeExitRoute({ result }: SafeExitRouteProps) {
  const [completedIds, setCompletedIds] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);

  const steps = result.safeExitSteps;
  const completedCount = steps.filter((s) => completedIds[s.id]).length;
  const progressPercent =
    steps.length > 0 ? Math.round((completedCount / steps.length) * 100) : 0;

  const toggleStep = (id: string) => {
    setCompletedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const buildRedactedSummary = () => {
    const lines = [
      "LANTERN Safe Investigation Summary (Sensitive Details Redacted)",
      `Assessment: ${result.assessmentHeadline} (${result.contextLabel})`,
      `Summary: ${result.assessmentSummary}`,
      "",
      "Redacted Message Excerpt:",
      `"${result.redactedMessage}"`,
      "",
      "Detected Warning Clues:",
      ...(result.clues.length > 0
        ? result.clues.map((c) => `- ${c.tacticLabel}: ${c.observation}`)
        : ["- No obvious manipulation phrases triggered in supplied text."]),
      "",
      "Safe Verification Checklist:",
      ...steps.map(
        (s) => `[${completedIds[s.id] ? "x" : " "}] ${s.title}`
      ),
      "",
      "Note: Generated locally with LANTERN. Sender identity is not independently verified.",
    ];
    return lines.join("\n");
  };

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(buildRedactedSummary());
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // Fallback ignore if clipboard permission blocked
    }
  };

  return (
    <div className="lantern-card rounded-3xl p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#eceae3] pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-100 text-teal-800">
            <Compass className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#161615]">
              Stage 4: Safe Exit Route
            </h3>
            <p className="text-xs text-[#6b6963]">
              Personalized steps to verify safely without engaging the sender.
            </p>
          </div>
        </div>

        <span className="rounded-full bg-teal-50 px-3 py-1 font-mono text-xs font-semibold text-teal-900">
          {completedCount}/{steps.length} verified
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-[#efede7]">
        <div
          className="h-full rounded-full bg-teal-600 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Interactive Checklist */}
      <div className="mt-4 space-y-2.5">
        {steps.map((step) => {
          const checked = Boolean(completedIds[step.id]);
          return (
            <button
              key={step.id}
              type="button"
              onClick={() => toggleStep(step.id)}
              className={cn(
                "flex w-full cursor-pointer items-start gap-3 rounded-2xl border p-3.5 text-left transition-all focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:outline-none",
                checked
                  ? "border-teal-300 bg-teal-50/50"
                  : "border-[#e5e3dc] bg-white hover:border-teal-300/80"
              )}
            >
              {checked ? (
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />
              ) : (
                <Circle className="mt-0.5 h-5 w-5 shrink-0 text-[#a8a59e]" />
              )}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      "text-sm font-semibold transition-colors",
                      checked ? "text-teal-950 line-through" : "text-[#161615]"
                    )}
                  >
                    {step.title}
                  </span>
                  {step.priority === "critical" && !checked && (
                    <span className="rounded-full bg-amber-100 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase text-amber-900">
                      Essential
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs leading-relaxed text-[#575652]">
                  {step.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Redacted Summary Export */}
      <div className="mt-5 rounded-2xl border border-[#eceae3] bg-[#faf9f6] p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-start gap-2">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-teal-700" />
            <div>
              <p className="text-xs font-semibold text-[#161615]">
                Shareable Redacted Summary
              </p>
              <p className="text-[11px] text-[#6b6963]">
                OTPs, links, emails, and phone numbers are automatically masked
                before copying.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCopySummary}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-[#d6d3c9] bg-white px-3.5 py-2 text-xs font-semibold text-[#161615] shadow-2xs transition-all hover:border-teal-500 hover:bg-teal-50/40"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-teal-600" />
                <span>Copied Redacted Report</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-[#575652]" />
                <span>Copy Safe Summary</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
