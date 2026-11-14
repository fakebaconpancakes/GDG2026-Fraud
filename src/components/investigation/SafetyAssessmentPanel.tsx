"use client";

import { AlertTriangle, ShieldAlert, Info, HelpCircle } from "lucide-react";
import { InvestigationResult } from "@/lib/types";
import { cn } from "@/lib/utils";

interface SafetyAssessmentPanelProps {
  result: InvestigationResult;
}

export function SafetyAssessmentPanel({ result }: SafetyAssessmentPanelProps) {
  const config = {
    high_concern: {
      badge: "High concern",
      subtitle: "Strong warning signs detected",
      border: "border-rose-200",
      bg: "bg-gradient-to-br from-rose-50/90 via-white to-amber-50/40",
      pill: "bg-rose-600 text-white",
      icon: ShieldAlert,
      iconColor: "text-rose-600",
    },
    verify_carefully: {
      badge: "Verify carefully",
      subtitle: "Some suspicious or uncertain elements require verification",
      border: "border-amber-300/80",
      bg: "bg-gradient-to-br from-amber-50/90 via-white to-stone-50",
      pill: "bg-amber-600 text-white",
      icon: AlertTriangle,
      iconColor: "text-amber-600",
    },
    no_obvious_signs: {
      badge: "No obvious warning signs",
      subtitle:
        "No strong indicators found in the provided text, though authenticity is not confirmed",
      border: "border-stone-300",
      bg: "bg-gradient-to-br from-teal-50/50 via-white to-stone-50",
      pill: "bg-teal-700 text-white",
      icon: HelpCircle,
      iconColor: "text-teal-700",
    },
  }[result.assessmentLevel];

  const Icon = config.icon;

  return (
    <div
      className={cn(
        "rounded-3xl border p-5 shadow-xs sm:p-6",
        config.border,
        config.bg
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-2xs ring-1 ring-black/5">
            <Icon className={cn("h-5 w-5", config.iconColor)} />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  "rounded-full px-3 py-0.5 text-xs font-bold tracking-wide",
                  config.pill
                )}
              >
                {config.badge}
              </span>
              <span className="rounded-full border border-[#e5e3dc] bg-white/90 px-2.5 py-0.5 font-mono text-[11px] text-[#575652]">
                {result.contextLabel}
              </span>
            </div>
            <p className="mt-1 text-xs font-medium text-[#575652]">
              {config.subtitle}
            </p>
          </div>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-[#1e1e1c]">
        {result.assessmentSummary}
      </p>

      {result.clues.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {result.clues.map((clue) => (
            <span
              key={clue.id}
              className="rounded-lg border border-[#e5e3dc] bg-white px-2.5 py-1 text-xs text-[#3f3e3a]"
            >
              <strong className="font-semibold">{clue.tacticLabel}:</strong>{" "}
              &ldquo;
              {clue.exactText.length > 34
                ? clue.exactText.slice(0, 34) + "..."
                : clue.exactText}
              &rdquo;
            </span>
          ))}
        </div>
      )}

      <div className="mt-4 flex items-start gap-2.5 rounded-2xl border border-[#e5e3dc] bg-white/85 p-3.5 text-xs leading-relaxed text-[#575652]">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
        <span>{result.limitationsNote}</span>
      </div>
    </div>
  );
}
