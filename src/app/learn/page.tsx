import Link from "next/link";
import { Compass, BookOpen, ArrowLeft } from "lucide-react";
import { SpotTheTrapSimulator } from "@/components/simulator/SpotTheTrapSimulator";
import { TACTICS_GUIDE } from "@/lib/data/simulator-scenarios";

export const metadata = {
  title: "Spot the Trap Simulator | LANTERN",
  description:
    "Interactive scam investigation simulator and field guide to common social engineering tactics.",
};

export default function LearnPage() {
  return (
    <div className="py-10 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/70 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-900">
              <Compass className="h-3.5 w-3.5 text-amber-600" />
              <span>Interactive Practice Mode</span>
            </div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#161615] sm:text-4xl">
              Spot the Trap
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-[#575652] sm:text-base">
              Build calm pattern recognition across five realistic scam
              scenarios before facing them in real life.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-full border border-[#d6d3c9] bg-white px-4 py-2 text-xs font-semibold text-[#161615] hover:border-amber-400"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Message X-Ray</span>
          </Link>
        </div>

        <SpotTheTrapSimulator />

        {/* Field Guide to Social Engineering */}
        <section className="mt-16">
          <div className="flex items-center gap-2.5">
            <BookOpen className="h-5 w-5 text-amber-700" />
            <h2 className="text-2xl font-bold tracking-tight text-[#161615]">
              Field Guide to Manipulation Tactics
            </h2>
          </div>
          <p className="mt-1.5 max-w-2xl text-sm text-[#575652]">
            Most convincing scams combine two or more of these six building
            blocks to discourage independent verification.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TACTICS_GUIDE.map((item) => (
              <div
                key={item.title}
                className="lantern-card flex flex-col justify-between rounded-3xl p-5"
              >
                <div>
                  <span className="inline-block rounded-full bg-amber-100 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-amber-900">
                    {item.badge}
                  </span>
                  <h3 className="mt-3 text-base font-bold text-[#161615]">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#575652]">
                    {item.summary}
                  </p>
                </div>

                <div className="mt-4 rounded-xl border border-teal-200/80 bg-teal-50/40 p-3">
                  <p className="text-[11px] font-semibold text-teal-950">
                    Safe habit: {item.safeHabit}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
