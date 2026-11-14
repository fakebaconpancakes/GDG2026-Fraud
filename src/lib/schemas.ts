import { z } from "zod";

export const AnalyzeRequestSchema = z.object({
  message: z
    .string()
    .trim()
    .min(3, "Please enter at least 3 characters to inspect.")
    .max(6000, "Messages are limited to 6,000 characters for safe inspection."),
});

export const AssessmentLevelSchema = z.enum([
  "high_concern",
  "verify_carefully",
  "no_obvious_signs",
]);

export const TacticCategorySchema = z.enum([
  "authority_claim",
  "urgency_pressure",
  "fear_threat",
  "sensitive_request",
  "suspicious_link",
  "platform_migration",
  "advance_payment",
  "unsafe_attachment",
]);

export const DetectedClueSchema = z.object({
  id: z.string(),
  category: TacticCategorySchema,
  tacticLabel: z.string(),
  exactText: z.string(),
  startIndex: z.number().int().nonnegative(),
  endIndex: z.number().int().positive(),
  severity: z.enum(["strong", "moderate"]),
  observation: z.string(),
  hypothesis: z.string(),
  whyItMatters: z.string(),
  whatToDoInstead: z.string(),
});
