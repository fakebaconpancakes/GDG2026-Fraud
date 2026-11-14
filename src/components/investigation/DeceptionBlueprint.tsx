"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  GitBranch,
  ArrowRight,
  ArrowDown,
  Eye,
  Lightbulb,
  ShieldCheck,
} from "lucide-react";
import { BlueprintEdge, BlueprintNode } from "@/lib/types";
import { cn } from "@/lib/utils";

interface DeceptionBlueprintProps {
  summary: string;
  nodes: BlueprintNode[];
  edges: BlueprintEdge[];
}

export function DeceptionBlueprint({
  summary,
  nodes,
  edges,
}: DeceptionBlueprintProps) {
  const [selectedNodeId, setSelectedNodeId] = useState<string>(
    nodes[0]?.id || ""
  );

  const activeNode =
    nodes.find((n) => n.id === selectedNodeId) || nodes[0] || null;

  return (
    <div className="lantern-card rounded-3xl p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#eceae3] pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#161615] text-amber-400">
            <GitBranch className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#161615]">
              Stage 3: The Deception Blueprint
            </h3>
            <p className="text-xs text-[#6b6963]">{summary}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-[11px] font-medium text-[#575652]">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
            Observable clue
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full border border-dashed border-rose-500 bg-rose-100" />
            Hypothesis
          </span>
        </div>
      </div>

      {/* Connected Node Map */}
      <div className="mt-5 rounded-2xl border border-[#eceae3] bg-[#faf9f6] p-4">
        <div className="flex flex-col items-stretch gap-2 md:flex-row md:flex-wrap md:items-center">
          {nodes.map((node, index) => {
            const isSelected = activeNode?.id === node.id;
            const isHypothesis = node.kind === "hypothesis";
            const edgeAfter = edges[index];

            return (
              <div
                key={node.id}
                className="flex flex-col items-stretch md:flex-row md:items-center"
              >
                <motion.button
                  type="button"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: index * 0.06 }}
                  onClick={() => setSelectedNodeId(node.id)}
                  className={cn(
                    "group relative flex min-w-[165px] cursor-pointer flex-col items-start rounded-2xl p-3.5 text-left transition-all focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none",
                    isHypothesis
                      ? "border-2 border-dashed border-rose-300 bg-rose-50/60 hover:border-rose-400"
                      : "border border-[#dcd9d0] bg-white hover:border-amber-400",
                    isSelected &&
                      (isHypothesis
                        ? "border-rose-500 bg-rose-50 shadow-sm ring-2 ring-rose-400/30"
                        : "border-amber-500 bg-amber-50/40 shadow-sm ring-2 ring-amber-400/30")
                  )}
                >
                  <div className="flex w-full items-center justify-between gap-2">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider",
                        isHypothesis
                          ? "bg-rose-100 text-rose-800"
                          : "bg-amber-100 text-amber-900"
                      )}
                    >
                      {isHypothesis ? (
                        <>
                          <Lightbulb className="h-2.5 w-2.5" />
                          <span>Hypothesis</span>
                        </>
                      ) : (
                        <>
                          <Eye className="h-2.5 w-2.5" />
                          <span>Step {node.stepOrder}</span>
                        </>
                      )}
                    </span>
                  </div>

                  <span className="mt-2 text-xs font-bold text-[#161615]">
                    {node.label}
                  </span>
                  <span className="mt-0.5 text-[11px] text-[#6b6963]">
                    {node.subtitle}
                  </span>
                </motion.button>

                {edgeAfter && (
                  <div className="flex items-center justify-center py-1 md:px-2 md:py-0">
                    <div className="flex items-center gap-1 font-mono text-[10px] text-[#6b6963]">
                      <ArrowDown className="h-3.5 w-3.5 text-amber-600 md:hidden" />
                      <span className="md:hidden">{edgeAfter.relationship}</span>
                      <ArrowRight className="hidden h-4 w-4 text-amber-600 md:block" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Node Inspector Drawer */}
      {activeNode && (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeNode.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="mt-4 rounded-2xl border border-[#e5e3dc] bg-white p-4 sm:p-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "rounded-full px-2.5 py-0.5 font-mono text-[11px] font-semibold uppercase",
                    activeNode.kind === "hypothesis"
                      ? "bg-rose-100 text-rose-900"
                      : "bg-amber-100 text-amber-900"
                  )}
                >
                  {activeNode.kind === "hypothesis"
                    ? "Interpretation / Hypothesis"
                    : "Direct Observation"}
                </span>
                <h4 className="text-sm font-bold text-[#161615]">
                  {activeNode.label}
                </h4>
              </div>
            </div>

            {activeNode.supportingQuote && (
              <div className="mt-3 rounded-xl bg-[#faf9f6] px-3 py-2 font-mono text-xs text-[#262624]">
                <span className="text-[#6b6963]">Supporting phrase: </span>
                <span className="font-semibold">
                  &ldquo;{activeNode.supportingQuote}&rdquo;
                </span>
              </div>
            )}

            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-[#faf9f6] p-3">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#6b6963]">
                  What it means
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[#1e1e1c]">
                  {activeNode.meaning}
                </p>
              </div>

              <div className="rounded-xl bg-[#faf9f6] p-3">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#6b6963]">
                  Possible nudge
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[#1e1e1c]">
                  {activeNode.intendedAction}
                </p>
              </div>

              <div className="rounded-xl border border-teal-200/80 bg-teal-50/40 p-3">
                <p className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-teal-900">
                  <ShieldCheck className="h-3.5 w-3.5 text-teal-700" />
                  <span>Safe response</span>
                </p>
                <p className="mt-1 text-xs leading-relaxed text-teal-950">
                  {activeNode.safeResponse}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
