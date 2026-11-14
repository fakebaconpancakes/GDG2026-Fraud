export interface SimulatorSegment {
  id: string;
  text: string;
  isSuspicious: boolean;
  tactic?: string;
  explanation?: string;
}

export interface SimulatorScenario {
  id: string;
  category: string;
  title: string;
  channel: "SMS" | "WhatsApp" | "Support Chat" | "Email";
  senderName: string;
  senderSubtext: string;
  timestamp: string;
  segments: SimulatorSegment[];
  safeTakeaway: string;
}

export const SIMULATOR_SCENARIOS: SimulatorScenario[] = [
  {
    id: "sim-support",
    category: "Fake Customer Support",
    title: "The Helpful Support Agent",
    channel: "Support Chat",
    senderName: "PayShield Official Helpdesk",
    senderSubtext: "Direct Message (Unverified Handle)",
    timestamp: "10:14 AM",
    segments: [
      {
        id: "s1-1",
        text: "Hello! ",
        isSuspicious: false,
      },
      {
        id: "s1-2",
        text: "I am from the official PayShield Support Team",
        isSuspicious: true,
        tactic: "Unverified Authority Claim",
        explanation:
          "Impersonators routinely copy brand names and 'Official Support' titles in DMs after seeing users post public questions.",
      },
      {
        id: "s1-3",
        text: " following up on your refund ticket. To release your stuck balance before ",
        isSuspicious: false,
      },
      {
        id: "s1-4",
        text: "your wallet is frozen in 20 minutes",
        isSuspicious: true,
        tactic: "Artificial Urgency & Fear",
        explanation:
          "Creating a 20-minute freeze countdown pressures you into acting before checking your real PayShield app.",
      },
      {
        id: "s1-5",
        text: ", please ",
        isSuspicious: false,
      },
      {
        id: "s1-6",
        text: "install AnyDesk so our technician can verify your screen",
        isSuspicious: true,
        tactic: "Remote Access Request",
        explanation:
          "Real customer support will never ask to view your phone or computer screen while you open financial apps.",
      },
      {
        id: "s1-7",
        text: ".",
        isSuspicious: false,
      },
    ],
    safeTakeaway:
      "Always initiate customer support inside the company's official app or verified help center, never through incoming DMs or screen-sharing tools.",
  },
  {
    id: "sim-parcel",
    category: "Parcel Delivery Scam",
    title: "The Held Package Notice",
    channel: "SMS",
    senderName: "+1 (555) 019-8372",
    senderSubtext: "Unknown Mobile Sender",
    timestamp: "1:42 PM",
    segments: [
      {
        id: "s2-1",
        text: "MetroCourier Alert: Your parcel #MC8821 could not be delivered due to an unreadable zip code. ",
        isSuspicious: false,
      },
      {
        id: "s2-2",
        text: "Package will be returned to sender within 6 hours",
        isSuspicious: true,
        tactic: "Time Pressure",
        explanation:
          "Couriers hold undelivered packages for days with official pickup slips rather than 6-hour SMS ultimatums from random mobile numbers.",
      },
      {
        id: "s2-3",
        text: ". Please ",
        isSuspicious: false,
      },
      {
        id: "s2-4",
        text: "pay a $1.49 redelivery fee",
        isSuspicious: true,
        tactic: "Small Fee Card Trap",
        explanation:
          "A tiny fee lowers your guard, but the payment form is designed to harvest your full credit card number and CVV.",
      },
      {
        id: "s2-5",
        text: " at ",
        isSuspicious: false,
      },
      {
        id: "s2-6",
        text: "https://metrocourier-rebook-fee.example.com",
        isSuspicious: true,
        tactic: "Lookalike External Link",
        explanation:
          "Hyphenated domains combining a courier's name with words like 'rebook-fee' are classic phishing domains.",
      },
    ],
    safeTakeaway:
      "Check tracking numbers only inside the retailer app where you placed an order or by typing the courier's real website yourself.",
  },
  {
    id: "sim-bank-otp",
    category: "Banking OTP Request",
    title: "The Fraud Reversal Trap",
    channel: "SMS",
    senderName: "CrestBank-Verify",
    senderSubtext: "Text Thread",
    timestamp: "4:08 PM",
    segments: [
      {
        id: "s3-1",
        text: "CrestBank Security: ",
        isSuspicious: false,
      },
      {
        id: "s3-2",
        text: "An unauthorized purchase of $920.00 at TechMart was just attempted",
        isSuspicious: true,
        tactic: "Alarm Trigger",
        explanation:
          "Scammers invent high-value charges to provoke immediate panic so you want to cancel the transaction at any cost.",
      },
      {
        id: "s3-3",
        text: ". If this was not you, ",
        isSuspicious: false,
      },
      {
        id: "s3-4",
        text: "reply with the 6-digit OTP just sent to your mobile",
        isSuspicious: true,
        tactic: "OTP Harvesting",
        explanation:
          "Banks never ask you to reply with an OTP to cancel fraud. In reality, the scammer is triggering a real payment and needs your OTP to approve it.",
      },
      {
        id: "s3-5",
        text: " to block the charge ",
        isSuspicious: false,
      },
      {
        id: "s3-6",
        text: "within 5 minutes",
        isSuspicious: true,
        tactic: "Countdown Pressure",
        explanation:
          "OTPs expire quickly, so attackers rush you to hand over the code before it times out.",
      },
      {
        id: "s3-7",
        text: ".",
        isSuspicious: false,
      },
    ],
    safeTakeaway:
      "An OTP authorizes action; it never cancels fraud. Close the text, open your official banking app, or call the number on the back of your card.",
  },
  {
    id: "sim-job",
    category: "Job Recruitment Scam",
    title: "The Instant Remote Offer",
    channel: "WhatsApp",
    senderName: "Elena (Global Talent Partners)",
    senderSubtext: "+65 8000 0149 (Not in contacts)",
    timestamp: "11:29 AM",
    segments: [
      {
        id: "s4-1",
        text: "Good morning! Your profile was shortlisted for a flexible app-review role ",
        isSuspicious: false,
      },
      {
        id: "s4-2",
        text: "earning $300/day for 45 minutes of work",
        isSuspicious: true,
        tactic: "Unrealistic Reward Lure",
        explanation:
          "Disproportionately high daily payouts for trivial tasks are a hallmark of 'task optimization' recruitment scams.",
      },
      {
        id: "s4-3",
        text: ". No interview needed. ",
        isSuspicious: false,
      },
      {
        id: "s4-4",
        text: "Message our hiring manager on Telegram @VIPWorkDesk_Example",
        isSuspicious: true,
        tactic: "Off-Platform Migration",
        explanation:
          "Steering candidates from email or job boards onto private Telegram handles avoids employer verification.",
      },
      {
        id: "s4-5",
        text: " and ",
        isSuspicious: false,
      },
      {
        id: "s4-6",
        text: "complete a $40 USDT account activation deposit",
        isSuspicious: true,
        tactic: "Advance Fee Demand",
        explanation:
          "Legitimate employers pay you; they never ask workers to deposit money or crypto to unlock tasks.",
      },
      {
        id: "s4-7",
        text: " to start today.",
        isSuspicious: false,
      },
    ],
    safeTakeaway:
      "Verify open positions on the company's official careers domain and walk away from any job asking for deposits or crypto top-ups.",
  },
  {
    id: "sim-family",
    category: "Friend or Relative Impersonation",
    title: "The Broken Phone Emergency",
    channel: "WhatsApp",
    senderName: "Unknown Number",
    senderSubtext: "+61 491 570 156",
    timestamp: "8:51 PM",
    segments: [
      {
        id: "s5-1",
        text: "Hey Mom, ",
        isSuspicious: false,
      },
      {
        id: "s5-2",
        text: "I dropped my phone in water and this is my temporary new number",
        isSuspicious: true,
        tactic: "Identity Pretext",
        explanation:
          "Explaining away an unfamiliar phone number and broken device discourages you from calling their real number to check.",
      },
      {
        id: "s5-3",
        text: ". My banking app is locked for 24 hours on this handset and ",
        isSuspicious: false,
      },
      {
        id: "s5-4",
        text: "I have an urgent bill due tonight before late penalties hit",
        isSuspicious: true,
        tactic: "Emotional Urgency",
        explanation:
          "Combining parental concern with a tonight-only deadline bypasses normal skepticism.",
      },
      {
        id: "s5-5",
        text: ". Can you ",
        isSuspicious: false,
      },
      {
        id: "s5-6",
        text: "transfer $680 to my friend's account right now",
        isSuspicious: true,
        tactic: "Third-Party Money Transfer",
        explanation:
          "Asking you to wire funds to an unfamiliar recipient name hides the attacker's mule account behind an excuse.",
      },
      {
        id: "s5-7",
        text: "? I will pay you back tomorrow morning!",
        isSuspicious: false,
      },
    ],
    safeTakeaway:
      "Before sending money to a 'new number', always call your relative's original saved phone number or verify by voice with another family member.",
  },
];

export const TACTICS_GUIDE = [
  {
    title: "Unverified Authority Claims",
    badge: "Trust Borrowing",
    summary:
      "Senders introduce themselves as the 'Fraud Prevention Unit', 'Official Support', or a familiar relative to gain instant credibility.",
    safeHabit:
      "Treat titles in incoming messages as unverified claims until you reach the organization via a trusted channel.",
  },
  {
    title: "Artificial Urgency",
    badge: "Time Compression",
    summary:
      "Countdowns such as 'in 15 minutes' or 'final notice today' are designed to keep you inside the message rather than double-checking.",
    safeHabit:
      "Whenever a message demands speed, deliberately pause for 60 seconds and open the official app independently.",
  },
  {
    title: "Fear & Consequence Framing",
    badge: "Emotional Hijack",
    summary:
      "Warnings of unauthorized wire transfers, suspended accounts, or returned parcels create anxiety that narrows critical thinking.",
    safeHabit:
      "Check whether the claimed problem actually exists inside your real account dashboard.",
  },
  {
    title: "Credential & OTP Harvesting",
    badge: "Account Takeover",
    summary:
      "Asking you to share a 6-digit code, PIN, or password lets an attacker approve a login or transfer you did not initiate.",
    safeHabit:
      "Never read out or type an OTP for anyone contacting you, even if they claim to be blocking fraud.",
  },
  {
    title: "Lookalike Links & Redirection",
    badge: "Phishing Surface",
    summary:
      "Attackers register domains like brand-secure-verify.com to mimic real login or redelivery fee pages.",
    safeHabit:
      "Never navigate to sensitive accounts from a message link; use bookmarks or official app store apps.",
  },
  {
    title: "Off-Platform Migration",
    badge: "Isolation",
    summary:
      "Moving conversations to personal WhatsApp or Telegram accounts pulls victims away from platform fraud detection.",
    safeHabit:
      "Keep customer service and job applications strictly on verified corporate domains.",
  },
];
