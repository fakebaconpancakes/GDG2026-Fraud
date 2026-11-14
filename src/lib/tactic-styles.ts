import { TacticCategory } from "./types";

export interface TacticVisualStyle {
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  highlightBg: string;
  highlightBorder: string;
  highlightActiveBg: string;
  dotColor: string;
  shortTag: string;
}

export const TACTIC_STYLES: Record<TacticCategory, TacticVisualStyle> = {
  sensitive_request: {
    badgeBg: "bg-rose-50",
    badgeText: "text-rose-800",
    badgeBorder: "border-rose-200",
    highlightBg: "bg-rose-100/80 text-rose-950",
    highlightBorder: "border-rose-400",
    highlightActiveBg: "bg-rose-200 text-rose-950 ring-2 ring-rose-400/60",
    dotColor: "bg-rose-500",
    shortTag: "Credential / OTP",
  },
  suspicious_link: {
    badgeBg: "bg-orange-50",
    badgeText: "text-orange-800",
    badgeBorder: "border-orange-200",
    highlightBg: "bg-orange-100/85 text-orange-950",
    highlightBorder: "border-orange-400",
    highlightActiveBg: "bg-orange-200 text-orange-950 ring-2 ring-orange-400/60",
    dotColor: "bg-orange-500",
    shortTag: "Unverified Link",
  },
  fear_threat: {
    badgeBg: "bg-red-50",
    badgeText: "text-red-800",
    badgeBorder: "border-red-200",
    highlightBg: "bg-red-100/75 text-red-950",
    highlightBorder: "border-red-400",
    highlightActiveBg: "bg-red-200 text-red-950 ring-2 ring-red-400/60",
    dotColor: "bg-red-500",
    shortTag: "Threat / Fear",
  },
  urgency_pressure: {
    badgeBg: "bg-amber-50",
    badgeText: "text-amber-900",
    badgeBorder: "border-amber-200",
    highlightBg: "bg-amber-100/85 text-amber-950",
    highlightBorder: "border-amber-400",
    highlightActiveBg: "bg-amber-200 text-amber-950 ring-2 ring-amber-500/60",
    dotColor: "bg-amber-500",
    shortTag: "Urgency",
  },
  authority_claim: {
    badgeBg: "bg-stone-100",
    badgeText: "text-stone-800",
    badgeBorder: "border-stone-300",
    highlightBg: "bg-stone-200/80 text-stone-900",
    highlightBorder: "border-stone-400",
    highlightActiveBg: "bg-stone-300/90 text-stone-950 ring-2 ring-stone-500/50",
    dotColor: "bg-stone-600",
    shortTag: "Authority Claim",
  },
  platform_migration: {
    badgeBg: "bg-amber-50",
    badgeText: "text-amber-900",
    badgeBorder: "border-amber-300",
    highlightBg: "bg-amber-100/80 text-amber-950",
    highlightBorder: "border-amber-500",
    highlightActiveBg: "bg-amber-200 text-amber-950 ring-2 ring-amber-500/60",
    dotColor: "bg-amber-600",
    shortTag: "Channel Switch",
  },
  advance_payment: {
    badgeBg: "bg-rose-50",
    badgeText: "text-rose-800",
    badgeBorder: "border-rose-200",
    highlightBg: "bg-rose-100/80 text-rose-950",
    highlightBorder: "border-rose-400",
    highlightActiveBg: "bg-rose-200 text-rose-950 ring-2 ring-rose-400/60",
    dotColor: "bg-rose-600",
    shortTag: "Payment Trap",
  },
  unsafe_attachment: {
    badgeBg: "bg-red-50",
    badgeText: "text-red-800",
    badgeBorder: "border-red-300",
    highlightBg: "bg-red-100/85 text-red-950",
    highlightBorder: "border-red-500",
    highlightActiveBg: "bg-red-200 text-red-950 ring-2 ring-red-500/60",
    dotColor: "bg-red-600",
    shortTag: "Remote Access",
  },
};
