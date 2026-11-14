import Link from "next/link";
import { ShieldAlert, Lock } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-[#e5e3dc] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-md space-y-2">
            <div className="flex items-center gap-2 font-bold tracking-tight text-[#161615]">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-amber-500" />
              <span>LANTERN</span>
              <span className="font-normal text-[#6b6963]">
                | See through the scam.
              </span>
            </div>
            <p className="text-xs leading-relaxed text-[#575652]">
              Clarity through investigation. LANTERN highlights manipulation
              patterns in supplied messages and helps you verify claims safely
              outside suspicious threads.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-[#575652]">
            <Link href="/" className="hover:text-[#161615]">
              Message X-Ray
            </Link>
            <Link href="/learn" className="hover:text-[#161615]">
              Spot the Trap Simulator
            </Link>
            <Link href="/about" className="hover:text-[#161615]">
              Privacy & Limitations
            </Link>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-[#eceae3] bg-[#faf9f6] p-4 text-xs text-[#575652] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-2">
            <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
            <span>
              LANTERN inspects supplied content only and cannot confirm the
              real-world identity of a sender or business.
            </span>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#6b6963]">
            <Lock className="h-3.5 w-3.5 text-teal-600" />
            <span>Local OCR • No accounts • No stored messages</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
