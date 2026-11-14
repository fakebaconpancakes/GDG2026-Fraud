import Link from "next/link";
import {
  Lock,
  ShieldCheck,
  AlertTriangle,
  EyeOff,
  Cpu,
  ArrowLeft,
} from "lucide-react";

export const metadata = {
  title: "About & Privacy | LANTERN",
  description:
    "How LANTERN handles sensitive messages, local OCR, and verification boundaries.",
};

export default function AboutPage() {
  return (
    <div className="py-10 sm:py-14">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-900">
              <Lock className="h-3.5 w-3.5 text-teal-700" />
              <span>Privacy as a Core Feature</span>
            </span>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#161615] sm:text-4xl">
              About LANTERN & Privacy
            </h1>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-full border border-[#d6d3c9] bg-white px-4 py-2 text-xs font-semibold text-[#161615] hover:border-amber-400"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Inspect a Message</span>
          </Link>
        </div>

        <p className="mt-4 text-base leading-relaxed text-[#575652]">
          LANTERN was designed around a straightforward principle: helping
          people understand suspicious messages should never require handing over
          their private conversations or personal identity.
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <div className="lantern-card rounded-3xl p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-teal-100 text-teal-800">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h2 className="mt-4 text-lg font-bold text-[#161615]">
              What LANTERN Can Do
            </h2>
            <ul className="mt-3 space-y-2 text-xs leading-relaxed text-[#575652] sm:text-sm">
              <li>
                • Highlight exact phrases matching known social engineering
                tactics such as countdown pressure, OTP harvesting, payment
                traps, and channel switching.
              </li>
              <li>
                • Visualize how individual clues connect inside a Deception
                Blueprint, separating direct observations from hypotheses.
              </li>
              <li>
                • Provide calm, tailored Safe Exit checklists so you know how to
                verify independently.
              </li>
            </ul>
          </div>

          <div className="lantern-card rounded-3xl p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-100 text-amber-800">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <h2 className="mt-4 text-lg font-bold text-[#161615]">
              What LANTERN Cannot Verify
            </h2>
            <ul className="mt-3 space-y-2 text-xs leading-relaxed text-[#575652] sm:text-sm">
              <li>
                • It cannot confirm the real-world identity of a sender or prove
                that a phone number, email header, or business is genuine.
              </li>
              <li>
                • &ldquo;No obvious warning signs&rdquo; never guarantees a
                message is safe; sophisticated impersonators can write calm,
                ordinary messages.
              </li>
              <li>
                • It never visits, previews, or clicks URLs inside submitted
                messages.
              </li>
            </ul>
          </div>

          <div className="lantern-card rounded-3xl p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-stone-200 text-stone-800">
              <EyeOff className="h-5 w-5" />
            </div>
            <h2 className="mt-4 text-lg font-bold text-[#161615]">
              Zero Persistence & Redaction
            </h2>
            <p className="mt-3 text-xs leading-relaxed text-[#575652] sm:text-sm">
              No account is required. Submitted messages are never saved to a
              database, placed into URL query strings, or logged in analytics.
              When you copy a Safe Exit summary, OTP codes, phone numbers, email
              addresses, account digits, and links are automatically redacted.
            </p>
          </div>

          <div className="lantern-card rounded-3xl p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-100 text-amber-900">
              <Cpu className="h-5 w-5" />
            </div>
            <h2 className="mt-4 text-lg font-bold text-[#161615]">
              Browser-Local OCR & Self-Contained Engine
            </h2>
            <p className="mt-3 text-xs leading-relaxed text-[#575652] sm:text-sm">
              Uploaded screenshots (PNG, JPG, WebP) are read directly inside
              your browser memory using WebAssembly OCR (Tesseract.js). Your
              screenshots are never uploaded to external servers, and LANTERN
              operates without external AI API keys.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
