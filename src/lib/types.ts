export type AssessmentLevel =
  | "high_concern"
  | "verify_carefully"
  | "no_obvious_signs";

export type TacticCategory =
  | "authority_claim"
  | "urgency_pressure"
  | "fear_threat"
  | "sensitive_request"
  | "suspicious_link"
  | "platform_migration"
  | "advance_payment"
  | "unsafe_attachment";

export type ScenarioContext =
  | "banking"
  | "delivery"
  | "customer_support"
  | "recruitment"
  | "impersonation"
  | "general";

export interface DetectedClue {
  id: string;
  category: TacticCategory;
  tacticLabel: string;
  exactText: string;
  startIndex: number;
  endIndex: number;
  severity: "strong" | "moderate";
  observation: string;
  hypothesis: string;
  whyItMatters: string;
  whatToDoInstead: string;
}

export interface BlueprintNode {
  id: string;
  stepOrder: number;
  kind: "observation" | "hypothesis";
  label: string;
  subtitle: string;
  category?: TacticCategory;
  supportingQuote?: string;
  meaning: string;
  intendedAction: string;
  safeResponse: string;
}

export interface BlueprintEdge {
  id: string;
  from: string;
  to: string;
  relationship: string;
}

export interface SafeExitStep {
  id: string;
  title: string;
  description: string;
  priority: "critical" | "recommended";
}

export interface InvestigationResult {
  analyzedAt: string;
  originalMessage: string;
  redactedMessage: string;
  assessmentLevel: AssessmentLevel;
  assessmentHeadline: string;
  assessmentSummary: string;
  detectedContext: ScenarioContext;
  contextLabel: string;
  clues: DetectedClue[];
  blueprint: {
    summary: string;
    nodes: BlueprintNode[];
    edges: BlueprintEdge[];
  };
  safeExitSteps: SafeExitStep[];
  limitationsNote: string;
}

export interface ExampleMessage {
  id: string;
  title: string;
  channel: "SMS" | "WhatsApp" | "Email" | "Telegram" | "Support Chat";
  senderDisplay: string;
  tag: string;
  message: string;
}
