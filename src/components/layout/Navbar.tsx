"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, ShieldCheck, Sparkles, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Inspect", icon: Sparkles },
    { href: "/learn", label: "Spot the Trap", icon: Compass },
    { href: "/about", label: "About & Privacy", icon: Lock },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#e5e3dc] bg-[#faf9f6]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-[#161615] text-amber-400 shadow-sm transition-transform group-hover:scale-105">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path
                d="M9 4h6l1.5 3h-9L9 4Z"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinejoin="round"
              />
              <rect
                x="7.5"
                y="7"
                width="9"
                height="11"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.75"
              />
              <circle cx="12" cy="12.5" r="2.2" fill="#f59e0b" />
              <path
                d="M9 20h6"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            </svg>
            <span className="pointer-events-none absolute -inset-1 rounded-xl bg-amber-400/15 opacity-0 blur-sm transition-opacity group-hover:opacity-100" />
          </div>
          <div className="flex flex-col">
            <span className="font-sans text-base font-bold tracking-tight text-[#161615]">
              LANTERN
            </span>
            <span className="hidden text-[11px] font-medium text-[#6b6963] sm:block">
              See through the scam.
            </span>
          </div>
        </Link>

        <nav
          aria-label="Main navigation"
          className="flex items-center gap-1 sm:gap-2"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all sm:px-4 sm:text-sm",
                  active
                    ? "bg-[#161615] text-white shadow-xs"
                    : "text-[#575652] hover:bg-[#efede7] hover:text-[#161615]"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-1.5 rounded-full border border-[#e5e3dc] bg-white px-3 py-1 text-xs font-medium text-[#575652] lg:flex">
          <ShieldCheck className="h-3.5 w-3.5 text-teal-600" />
          <span>Zero message storage</span>
        </div>
      </div>
    </header>
  );
}
