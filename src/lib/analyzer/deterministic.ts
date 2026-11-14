import { redactSensitiveText } from "../redact";
import {
  AssessmentLevel,
  BlueprintEdge,
  BlueprintNode,
  DetectedClue,
  InvestigationResult,
  SafeExitStep,
  ScenarioContext,
  TacticCategory,
} from "../types";

interface RuleDefinition {
  id: string;
  category: TacticCategory;
  tacticLabel: string;
  severity: "strong" | "moderate";
  patterns: RegExp[];
  observation: string;
  hypothesis: string;
  whyItMatters: string;
  whatToDoInstead: string;
}

const RULES: RuleDefinition[] = [
  {
    id: "sensitive_otp_credentials",
    category: "sensitive_request",
    tacticLabel: "Sensitive Information Request",
    severity: "strong",
    patterns: [
      /\b(?:please\s+)?(?:provide|share|send|reply\s+with|enter|confirm|give(?:\s+us|\s+me)?)\s+(?:your\s+|the\s+)?(?:\d[-\s]?digit\s+)?(?:otp|one[-\s]?time\s+(?:password|passcode|code)|verification\s+code|security\s+code|auth(?:entication)?\s+code|pin(?:\s+number)?|password|passcode|cvv|card\s+details|banking\s+credentials|login\s+credentials|seed\s+phrase)\b/gi,
      /\b(?:otp|one[-\s]?time\s+password|verification\s+code|6[-\s]?digit\s+code)\s+(?:sent\s+to\s+your\s+phone|to\s+cancel|to\s+verify|immediately|now)\b/gi,
      /\bread\s+(?:back|out)\s+the\s+(?:code|otp|numbers?)\b/gi,
    ],
    observation: "Directly asks you to hand over a secret verification code, password, or credential.",
    hypothesis: "May be attempting real-time account takeover or unauthorized payment approval.",
    whyItMatters:
      "Legitimate support teams, banks, and platforms never ask you to read back or type an OTP or password into a chat. Sharing an OTP can authorize a login or money transfer instantly.",
    whatToDoInstead:
      "Never share codes or passwords. Close the conversation and inspect your account directly inside the official app.",
  },
  {
    id: "urgency_countdown",
    category: "urgency_pressure",
    tacticLabel: "Artificial Urgency",
    severity: "moderate",
    patterns: [
      /\b(?:within|in(?:\s+the\s+next)?)\s+\d+\s*(?:minutes?|mins?|hours?|hrs?)\b/gi,
      /\b(?:immediate(?:ly)?\s+action\s+required|urgent\s+action\s+required|act\s+immediately|respond\s+immediately|verify\s+immediately|final\s+warning|final\s+notice|expires\s+today|before\s+midnight|right\s+away\s+to\s+avoid)\b/gi,
    ],
    observation: "Uses a tight deadline or countdown to rush your decision.",
    hypothesis: "Designed to compress your thinking time so you act before verifying independently.",
    whyItMatters:
      "Scammers manufacture time pressure because careful verification is their biggest obstacle. Real institutions give clear, verifiable channels rather than 10-minute chat ultimatums.",
    whatToDoInstead:
      "Pause intentionally. Treat any countdown timer in an unexpected message as a cue to slow down and verify elsewhere.",
  },
  {
    id: "fear_account_threat",
    category: "fear_threat",
    tacticLabel: "Fear or Consequence Threat",
    severity: "strong",
    patterns: [
      /\b(?:your\s+)?(?:account|card|profile|access|wallet|online\s+banking)\s+(?:will\s+be|has\s+been|is\s+being)\s+(?:permanently\s+|temporarily\s+)?(?:suspended|locked|frozen|closed|terminated|deactivated|restricted|blocked)\b/gi,
      /\b(?:unauthorized\s+(?:transaction|wire\s+transfer|login|withdrawal|purchase)|suspicious\s+login\s+attempt|legal\s+action\s+will\s+be\s+taken|police\s+report|parcel\s+will\s+be\s+returned|package\s+held\s+at\s+customs)\b/gi,
    ],
    observation: "Threatens account loss, frozen funds, unauthorized charges, or lost deliveries.",
    hypothesis: "Aims to trigger alarm so you prioritize stopping the threat over checking who sent the message.",
    whyItMatters:
      "Fear narrows attention. Mentioning a frightening event like a large transfer or imminent suspension pushes people into following instructions without checking their real account first.",
    whatToDoInstead:
      "Open your official banking or service app separately to see if any real alert or transaction appears there.",
  },
  {
    id: "suspicious_link_prompt",
    category: "suspicious_link",
    tacticLabel: "Unverified Link or Action Prompt",
    severity: "strong",
    patterns: [
      /\b(?:click|tap|visit|open|follow)\s+(?:this\s+link|the\s+link\s+below|here)\s+(?:to\s+(?:verify|confirm|unlock|cancel|pay|claim|restore|update))?/gi,
      /https?:\/\/[^\s<>()]+/gi,
      /\bwww\.[a-z0-9.-]+\.[a-z]{2,}[^\s<>()]*/gi,
      /\b[a-z0-9-]+-(?:verify|secure|support|auth|help|alert|pay|track)[a-z0-9-]*\.[a-z]{2,}(?:\/[^\s<>()]*)?/gi,
    ],
    observation: "Directs you to an external web address or asks you to click an embedded link.",
    hypothesis: "Could route you to a lookalike login page or payment form controlled by an impersonator.",
    whyItMatters:
      "Display text and lookalike domain names (such as adding words like 'secure' or 'verify' with hyphens) are easy to register and often mimic real brands pixel-for-pixel.",
    whatToDoInstead:
      "Do not open links inside unexpected messages. Navigate to the service using a saved bookmark or the official mobile app.",
  },
  {
    id: "authority_impersonation",
    category: "authority_claim",
    tacticLabel: "Unverified Authority Claim",
    severity: "moderate",
    patterns: [
      /\b(?:i\s+am|this\s+is|contacting\s+you)\s+from\s+(?:the\s+)?(?:official\s+)?(?:[a-z0-9]+\s+){0,2}(?:support\s+team|fraud\s+(?:prevention\s+|security\s+)?(?:team|department|unit)|security\s+(?:team|desk|department)|customer\s+(?:care|protection|support)|compliance\s+office|customs\s+clearance|hr\s+recruitment)\b/gi,
      /\b(?:official\s+(?:support|security|fraud|verification)\s+(?:agent|team|representative|notice|alert))\b/gi,
      /\b(?:hey\s+(?:mom|dad|mum)|it'?s\s+me\s+i\s+(?:lost|broke|changed)\s+my\s+phone|this\s+is\s+my\s+new\s+(?:temporary\s+)?number)\b/gi,
    ],
    observation: "Claims to represent an official security team, support desk, recruiter, or trusted contact.",
    hypothesis: "Attempts to borrow institutional or personal trust before you verify the sender's identity.",
    whyItMatters:
      "Anyone can type an official-sounding title, department name, or familiar greeting in a text message. Sender text alone does not prove identity.",
    whatToDoInstead:
      "Treat self-declared authority as unverified until confirmed through a phone number or portal you looked up yourself.",
  },
  {
    id: "platform_migration_request",
    category: "platform_migration",
    tacticLabel: "Off-Platform Channel Switch",
    severity: "strong",
    patterns: [
      /\b(?:message|contact|reach|add|reply\s+to|text)\s+(?:me|us|our\s+(?:manager|specialist|coordinator|agent|hr))\s+(?:on|via|through)\s+(?:whatsapp|telegram|signal|wechat|private\s+chat)\b/gi,
      /\b(?:whatsapp|telegram)\s*(?:number|id|handle|link|at)?\s*[:@-]?\s*[+@a-z0-9][\w\s.-]{3,18}\b/gi,
      /\b(?:save\s+this\s+new\s+number|text\s+me\s+on\s+this\s+number\s+only)\b/gi,
    ],
    observation: "Asks you to continue the conversation on WhatsApp, Telegram, or an unfamiliar private number.",
    hypothesis: "May be moving you away from monitored official channels where fraud filters can intervene.",
    whyItMatters:
      "Verified employers, banks, and customer support desks use official portals and corporate ticketing systems rather than personal chat handles.",
    whatToDoInstead:
      "Decline requests to switch to private messaging apps. Verify any job offer or support case on the company's primary website.",
  },
  {
    id: "advance_fee_payment",
    category: "advance_payment",
    tacticLabel: "Upfront Payment or Fee Request",
    severity: "strong",
    patterns: [
      /\b(?:pay|settle|clear|complete|send|transfer)\s+(?:a\s+)?(?:small\s+|nominal\s+|refundable\s+|pending\s+)?(?:redelivery\s+fee|customs\s+(?:fee|charge|duty)|processing\s+fee|service\s+charge|handling\s+fee|activation\s+fee|training\s+deposit|security\s+deposit|gift\s+cards?|crypto|usdt)\b/gi,
      /\b(?:fee|charge|payment)\s+of\s+(?:[$€£]|rm\s?|usd\s?|sgd\s?)\d+(?:\.\d{1,2})?\b/gi,
      /\b(?:help\s+me\s+(?:pay|transfer|send)\s+(?:[$€£]|rm\s?|usd\s?)?\d+|urgent\s+bill\s+due\s+today|buy\s+(?:apple|steam|google\s+play)\s+gift\s+cards?)\b/gi,
    ],
    observation: "Requests a fee, deposit, transfer, crypto payment, or gift card to unlock a service or help urgently.",
    hypothesis: "May be seeking either direct financial transfer or capturing full payment card details via a small fee.",
    whyItMatters:
      "Even a tiny $1 or RM2 fee form can capture your full card number and security code, or initiate an unauthorized recurring charge.",
    whatToDoInstead:
      "Never pay fees via message links or unverified transfers. Check parcel status or billing directly on the official provider site.",
  },
  {
    id: "unsafe_software_attachment",
    category: "unsafe_attachment",
    tacticLabel: "Software Install or Remote Access",
    severity: "strong",
    patterns: [
      /\b(?:download|install|open|run)\s+(?:the\s+)?(?:attached\s+file|anydesk|teamviewer|rustdesk|ultraviewer|remote\s+support\s+app|security\s+update\s+apk|[a-z0-9_-]+\.(?:apk|exe|zip|scr|dmg))\b/gi,
      /\b(?:share\s+your\s+screen|grant\s+remote\s+access)\b/gi,
    ],
    observation: "Instructs you to install software, open an executable file, or allow screen sharing.",
    hypothesis: "Could give an outside party full visibility and control over your phone or computer.",
    whyItMatters:
      "Remote desktop tools and unofficial APK/EXE downloads allow attackers to view banking apps, read incoming OTPs, and initiate transfers from your own device.",
    whatToDoInstead:
      "Never install apps or screen-sharing tools at the request of an unsolicited caller or message.",
  },
];

function detectContext(text: string): {
  context: ScenarioContext;
  label: string;
} {
  const lower = text.toLowerCase();

  if (
    /\b(bank|card|wire\s+transfer|debit|credit|fraud\s+prevention|otp|online\s+banking|wallet|unauthorized\s+transaction)\b/.test(
      lower
    )
  ) {
    return { context: "banking", label: "Banking or Financial Account Claim" };
  }

  if (
    /\b(parcel|package|delivery|courier|shipment|tracking|customs|redelivery|post\s+office|warehouse)\b/.test(
      lower
    )
  ) {
    return { context: "delivery", label: "Parcel or Delivery Notification" };
  }

  if (
    /\b(recruiter|recruitment|job\s+offer|part-time|remote\s+role|daily\s+commission|hiring|hr\s+team|resume|applicant|earn\s+[$€£]|usdt\s+per\s+day)\b/.test(
      lower
    )
  ) {
    return { context: "recruitment", label: "Job or Recruitment Outreach" };
  }

  if (
    /\b(hey\s+mom|hey\s+dad|hey\s+mum|lost\s+my\s+phone|dropped\s+my\s+phone|new\s+number|pay\s+an\s+urgent\s+bill|hospital|stranded)\b/.test(
      lower
    )
  ) {
    return {
      context: "impersonation",
      label: "Friend or Family Impersonation",
    };
  }

  if (
    /\b(support|ticket|helpdesk|account|subscription|workspace|security\s+team|verification|profile)\b/.test(
      lower
    )
  ) {
    return { context: "customer_support", label: "Customer or Account Support" };
  }

  return { context: "general", label: "General Incoming Message" };
}

function resolveOverlaps(candidates: DetectedClue[]): DetectedClue[] {
  const sorted = [...candidates].sort((a, b) => {
    if (a.startIndex !== b.startIndex) return a.startIndex - b.startIndex;
    if (a.severity !== b.severity) return a.severity === "strong" ? -1 : 1;
    return b.endIndex - b.startIndex - (a.endIndex - a.startIndex);
  });

  const accepted: DetectedClue[] = [];

  for (const item of sorted) {
    const prev = accepted[accepted.length - 1];
    if (!prev) {
      accepted.push(item);
      continue;
    }

    if (item.startIndex >= prev.endIndex) {
      accepted.push(item);
      continue;
    }

    // Overlap exists: keep stronger severity, or longer span if equal severity
    const prevLen = prev.endIndex - prev.startIndex;
    const itemLen = item.endIndex - item.startIndex;
    const shouldReplace =
      (item.severity === "strong" && prev.severity !== "strong") ||
      (item.severity === prev.severity && itemLen > prevLen);

    if (shouldReplace) {
      accepted[accepted.length - 1] = item;
    }
  }

  return accepted;
}

const BLUEPRINT_ORDER: TacticCategory[] = [
  "authority_claim",
  "urgency_pressure",
  "fear_threat",
  "platform_migration",
  "suspicious_link",
  "unsafe_attachment",
  "sensitive_request",
  "advance_payment",
];

function buildBlueprint(
  clues: DetectedClue[],
  context: ScenarioContext
): {
  summary: string;
  nodes: BlueprintNode[];
  edges: BlueprintEdge[];
} {
  if (clues.length === 0) {
    return {
      summary:
        "No obvious manipulation chain was detected in the supplied text. Remember that calm phrasing alone does not confirm who sent the message.",
      nodes: [
        {
          id: "node-neutral-obs",
          stepOrder: 1,
          kind: "observation",
          label: "No Pressure Triggers Found",
          subtitle: "Observable text check",
          meaning:
            "The supplied text does not contain common urgency countdowns, credential requests, payment traps, or external click demands.",
          intendedAction:
            "Appears informational, though sender identity outside the text remains unverified.",
          safeResponse:
            "If the message relates to an important account or transaction, verify independently via the official app or website.",
        },
      ],
      edges: [],
    };
  }

  // Group clues by category in logical persuasion order
  const byCategory = new Map<TacticCategory, DetectedClue>();
  for (const cat of BLUEPRINT_ORDER) {
    const found = clues.find((c) => c.category === cat);
    if (found) byCategory.set(cat, found);
  }

  const nodes: BlueprintNode[] = [];
  let order = 1;

  for (const [cat, clue] of byCategory.entries()) {
    nodes.push({
      id: `obs-${cat}`,
      stepOrder: order++,
      kind: "observation",
      category: cat,
      label: clue.tacticLabel,
      subtitle: "Observable clue in message",
      supportingQuote: clue.exactText,
      meaning: clue.observation,
      intendedAction: clue.hypothesis,
      safeResponse: clue.whatToDoInstead,
    });
  }

  // Add clear hypothesis outcome node explaining the end goal of the persuasion chain
  const hasCredentialGoal = byCategory.has("sensitive_request");
  const hasFinancialGoal = byCategory.has("advance_payment");
  const hasDeviceGoal = byCategory.has("unsafe_attachment");
  const hasLinkGoal = byCategory.has("suspicious_link");
  const hasMigrationGoal = byCategory.has("platform_migration");

  let outcomeLabel = "Bypass Independent Verification";
  let outcomeMeaning =
    "Based on the detected cues, the sender may be trying to steer you into acting inside this conversation before you verify through an official channel.";
  let outcomeAction =
    "Encourage a hasty reply or compliance without checking the real organization.";
  const outcomeSafe =
    "Step out of the message thread completely and check through a trusted official channel you open yourself.";

  if (hasDeviceGoal) {
    outcomeLabel = "Possible Device Takeover Attempt";
    outcomeMeaning =
      "Hypothesis: Combining message prompts with software or remote-access requests often aims to gain direct control over a victim's device and accounts.";
    outcomeAction = "Persuade you to grant remote screen or app permissions.";
  } else if (hasCredentialGoal && context === "banking") {
    outcomeLabel = "Possible Account or Transfer Compromise";
    outcomeMeaning =
      "Hypothesis: Pairing bank-related warnings with an OTP or credential request is a classic pattern used to authorize a login or money transfer.";
    outcomeAction = "Obtain live authentication codes or banking credentials.";
  } else if (hasCredentialGoal) {
    outcomeLabel = "Possible Credential Harvesting";
    outcomeMeaning =
      "Hypothesis: The signals point toward collecting private login details or one-time verification codes to access your account.";
    outcomeAction = "Collect confidential login or verification data.";
  } else if (hasFinancialGoal) {
    outcomeLabel = "Possible Payment or Card Capture Trap";
    outcomeMeaning =
      "Hypothesis: Requesting an upfront fee, deposit, or urgent transfer is commonly used to extract funds or capture full payment card details.";
    outcomeAction = "Trigger an irreversible transfer or card submission.";
  } else if (hasLinkGoal) {
    outcomeLabel = "Possible Phishing Redirection";
    outcomeMeaning =
      "Hypothesis: Guiding you toward an unverified link often leads to an imitation portal designed to collect logins or payments.";
    outcomeAction = "Get you to open and trust an external webpage.";
  } else if (hasMigrationGoal) {
    outcomeLabel = "Possible Off-Platform Social Engineering";
    outcomeMeaning =
      "Hypothesis: Moving the chat to WhatsApp or Telegram isolates the conversation away from official platform safety checks.";
    outcomeAction = "Continue coaching you in an unmonitored private chat.";
  }

  nodes.push({
    id: "hyp-outcome",
    stepOrder: order,
    kind: "hypothesis",
    label: outcomeLabel,
    subtitle: "Interpreted goal (hypothesis)",
    meaning: outcomeMeaning,
    intendedAction: outcomeAction,
    safeResponse: outcomeSafe,
  });

  const edges: BlueprintEdge[] = [];
  for (let i = 0; i < nodes.length - 1; i++) {
    const current = nodes[i];
    const next = nodes[i + 1];
    edges.push({
      id: `edge-${current.id}-${next.id}`,
      from: current.id,
      to: next.id,
      relationship:
        next.kind === "hypothesis" ? "May lead toward" : "Reinforces",
    });
  }

  const summary =
    byCategory.size === 1
      ? "One distinct warning signal was observed in the text, paired below with the possible outcome it could be nudging you toward."
      : `LANTERN mapped ${byCategory.size} observable tactics showing how the message builds pressure toward a high-risk action.`;

  return { summary, nodes, edges };
}

function buildSafeExitSteps(
  context: ScenarioContext,
  clues: DetectedClue[],
  level: AssessmentLevel
): SafeExitStep[] {
  const hasLink = clues.some((c) => c.category === "suspicious_link");
  const hasSensitive = clues.some((c) => c.category === "sensitive_request");
  const hasPayment = clues.some((c) => c.category === "advance_payment");
  const hasAttachment = clues.some((c) => c.category === "unsafe_attachment");

  if (level === "no_obvious_signs") {
    return [
      {
        id: "step-verify-sender",
        title: "Confirm the sender channel independently if action is needed",
        description:
          "Even when a message looks routine, verify unexpected account changes by logging in through your own bookmark or official mobile app.",
        priority: "recommended",
      },
      {
        id: "step-avoid-sharing",
        title: "Keep passwords and verification codes private",
        description:
          "If a follow-up reply suddenly asks for an OTP, payment, or private chat switch, re-inspect the conversation immediately.",
        priority: "recommended",
      },
      {
        id: "step-keep-records",
        title: "Compare reference numbers inside your official account",
        description:
          "Check ticket numbers, order IDs, or appointment details directly inside the service portal rather than replying with personal info.",
        priority: "recommended",
      },
    ];
  }

  const steps: SafeExitStep[] = [];

  steps.push({
    id: "step-do-not-reply",
    title: "Do not reply to the sender to test if they are real",
    description:
      "Replying confirms your number or address is active and invites tailored follow-up manipulation. Verify silently outside this thread.",
    priority: "critical",
  });

  if (hasLink) {
    steps.push({
      id: "step-no-click",
      title: "Do not tap, copy, or preview the link in the message",
      description:
        "Leave embedded URLs untouched. Lookalike domains frequently imitate real support portals.",
      priority: "critical",
    });
  }

  if (hasSensitive) {
    steps.push({
      id: "step-no-otp",
      title: "Do not share any OTP, PIN, password, or card security code",
      description:
        "Official staff do not need your one-time passcode to block fraud or verify your identity.",
      priority: "critical",
    });
  }

  if (hasPayment) {
    steps.push({
      id: "step-no-payment",
      title: "Hold off on paying any fee, deposit, or gift card request",
      description:
        "Do not enter card details or send transfers until the charge is confirmed on an official platform you opened yourself.",
      priority: "critical",
    });
  }

  if (hasAttachment) {
    steps.push({
      id: "step-no-install",
      title: "Do not download attachments or remote-access tools",
      description:
        "Refuse requests to install AnyDesk, TeamViewer, or APK files sent over chat.",
      priority: "critical",
    });
  }

  switch (context) {
    case "banking":
      steps.push(
        {
          id: "step-bank-app",
          title: "Open your official banking app independently",
          description:
            "Launch your bank app from your home screen to check your real transaction history and security notifications.",
          priority: "critical",
        },
        {
          id: "step-bank-card-number",
          title: "Call the number printed on the back of your bank card",
          description:
            "Never call phone numbers supplied inside a suspicious SMS. Use the official helpline on your physical card or verified bank site.",
          priority: "recommended",
        },
        {
          id: "step-bank-report",
          title: "Report the message via your bank's official phishing channel",
          description:
            "Forward or report the scam attempt through your bank's official fraud reporting page and block the sender.",
          priority: "recommended",
        }
      );
      break;

    case "delivery":
      steps.push(
        {
          id: "step-delivery-official",
          title: "Check your order inside the retailer or courier app you used",
          description:
            "Open the shopping app where you placed an order or type the courier's known official web address directly into your browser.",
          priority: "critical",
        },
        {
          id: "step-delivery-tracking",
          title: "Verify whether you are genuinely expecting a parcel",
          description:
            "Mass parcel scams rely on coincidence. Real customs or address issues appear in your official tracking dashboard.",
          priority: "recommended",
        }
      );
      break;

    case "recruitment":
      steps.push(
        {
          id: "step-job-careers",
          title: "Look up the company's official careers page independently",
          description:
            "Check open roles and recruiter email domains directly on the company's verified corporate website.",
          priority: "critical",
        },
        {
          id: "step-job-no-fees",
          title: "Reject roles requiring deposits, task top-ups, or chat-only interviews",
          description:
            "Legitimate employers pay employees and do not charge onboarding, equipment, or task unlocking fees.",
          priority: "recommended",
        }
      );
      break;

    case "impersonation":
      steps.push(
        {
          id: "step-friend-call",
          title: "Call the person on their previously saved phone number",
          description:
            "Reach out using the contact number or video call channel you already had saved before this message arrived.",
          priority: "critical",
        },
        {
          id: "step-friend-verify-voice",
          title: "Confirm through a mutual family member or known voice check",
          description:
            "If their old line goes to voicemail, check with another trusted relative before sending any money.",
          priority: "recommended",
        }
      );
      break;

    default:
      steps.push(
        {
          id: "step-support-independent",
          title: "Start a fresh support session through the official website or app",
          description:
            "Navigate to the company's official help center yourself and open a new support chat or ticket to ask if they contacted you.",
          priority: "critical",
        },
        {
          id: "step-report-block",
          title: "Use your messaging app's built-in Report and Block tools",
          description:
            "Flag the sender inside SMS, WhatsApp, email, or Telegram after saving any reference details you need.",
          priority: "recommended",
        }
      );
      break;
  }

  return steps;
}

export function analyzeMessageDeterministically(
  rawMessage: string
): InvestigationResult {
  const originalMessage = rawMessage.trim();
  const rawClues: DetectedClue[] = [];

  for (const rule of RULES) {
    for (const pattern of rule.patterns) {
      const regex = new RegExp(pattern.source, pattern.flags);
      let match: RegExpExecArray | null;

      while ((match = regex.exec(originalMessage)) !== null) {
        const exactText = match[0];
        const startIndex = match.index;
        const endIndex = startIndex + exactText.length;

        // Enforce strict substring integrity
        if (
          exactText.length > 0 &&
          originalMessage.slice(startIndex, endIndex) === exactText
        ) {
          rawClues.push({
            id: `${rule.id}-${startIndex}-${endIndex}`,
            category: rule.category,
            tacticLabel: rule.tacticLabel,
            exactText,
            startIndex,
            endIndex,
            severity: rule.severity,
            observation: rule.observation,
            hypothesis: rule.hypothesis,
            whyItMatters: rule.whyItMatters,
            whatToDoInstead: rule.whatToDoInstead,
          });
        }

        if (match.index === regex.lastIndex) {
          regex.lastIndex++;
        }
      }
    }
  }

  const clues = resolveOverlaps(rawClues);
  const { context, label: contextLabel } = detectContext(originalMessage);

  const strongCount = clues.filter((c) => c.severity === "strong").length;
  const uniqueCategories = new Set(clues.map((c) => c.category)).size;

  let assessmentLevel: AssessmentLevel = "no_obvious_signs";
  let assessmentHeadline = "No obvious warning signs";
  let assessmentSummary =
    "No strong manipulation indicators were found in the text you provided, though authenticity is not confirmed. Always verify independently if a message asks you to act on an important account.";

  if (strongCount >= 2 || (strongCount >= 1 && uniqueCategories >= 2)) {
    assessmentLevel = "high_concern";
    assessmentHeadline = "High concern";
    const tacticNames = Array.from(
      new Set(clues.map((c) => c.tacticLabel.toLowerCase()))
    ).slice(0, 3);
    assessmentSummary = `Strong warning signs were detected in this message, combining ${tacticNames.join(
      ", "
    )}. Pause before taking any action inside this thread and verify independently.`;
  } else if (clues.length >= 1) {
    assessmentLevel = "verify_carefully";
    assessmentHeadline = "Verify carefully";
    assessmentSummary = `This message includes ${
      clues.length === 1 ? "a suspicious or uncertain signal" : "suspicious signals"
    } (${clues[0].tacticLabel.toLowerCase()}) that warrants independent verification before you trust the sender.`;
  }

  const blueprint = buildBlueprint(clues, context);
  const safeExitSteps = buildSafeExitSteps(context, clues, assessmentLevel);

  return {
    analyzedAt: new Date().toISOString(),
    originalMessage,
    redactedMessage: redactSensitiveText(originalMessage),
    assessmentLevel,
    assessmentHeadline,
    assessmentSummary,
    detectedContext: context,
    contextLabel,
    clues,
    blueprint,
    safeExitSteps,
    limitationsNote:
      "LANTERN inspects patterns in the supplied message text only. It cannot independently verify the real-world identity of a sender or confirm the legitimacy of a business.",
  };
}
