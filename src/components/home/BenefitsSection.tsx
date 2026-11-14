import Link from "next/link";
import { Eye, GitBranch, ShieldCheck, ArrowRight } from "lucide-react";

const PILLARS = [
  {
    step: "01 • Detect",
    title: "Spot exact warning phrases",
    description:
      "Message X-Ray illuminates urgency timers, OTP traps, off-platform switches, and lookalike links directly inside the text you received.",
    icon: Eye,
    accent: "bg-amber-100 text-amber-800",
  },
  {
    step: "02 • Understand",
    title: "See the persuasion blueprint",
    description:
      "Our interactive Deception Blueprint connects observable message cues to the action the sender may be trying to rush you into taking.",
    icon: GitBranch,
    accent: "bg-rose-100 text-rose-800",
  },
  {
    step: "03 • Verify",
    title: "Take a safe exit route",
    description:
      "Follow a calm, tailored verification checklist so you can confirm claims through official channels without replying to the sender.",
    icon: ShieldCheck,
    accent: "bg-teal-100 text-teal-800",
  },
];

export function BenefitsSection() {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-amber-700">
            Clarity Through Investigation
          </span>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#161615] sm:text-3xl">
            Built to sharpen judgment, not trigger panic.
          </h2>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.step}
                className="lantern-card flex flex-col justify-between rounded-3xl p-6"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-[#6b6963]">
                      {pillar.step}
                    </span>
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-xl ${pillar.accent}`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-[#161615]">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#575652]">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Callout to Scam Simulator */}
        <div className="mt-10 flex flex-col items-start justify-between gap-6 rounded-3xl border border-[#e5e3dc] bg-[#161615] p-6 text-white sm:flex-row sm:items-center sm:p-8">
          <div className="max-w-xl space-y-1.5">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-amber-400">
              Interactive Practice Mode
            </span>
            <h3 className="text-xl font-bold tracking-tight">
              Train your eye with &ldquo;Spot the Trap&rdquo;
            </h3>
            <p className="text-sm text-stone-300">
              Practice spotting manipulation clues across five realistic SMS,
              WhatsApp, and support chat scenarios in two minutes.
            </p>
          </div>

          <Link
            href="/learn"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-amber-400 px-5 py-3 text-sm font-bold text-[#161615] transition-transform hover:-translate-y-0.5 hover:bg-amber-300"
          >
            <span>Launch Simulator</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
