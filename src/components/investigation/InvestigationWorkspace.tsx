"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  RotateCcw,
  Trash2,
  FileText,
  Eye,
  GitBranch,
  Compass,
  Loader2,
} from "lucide-react";
import { EXAMPLE_MESSAGES } from "@/lib/data/examples";
import { analyzeMessageDeterministically } from "@/lib/analyzer/deterministic";
import { InvestigationResult } from "@/lib/types";
import { ScreenshotOcrUploader } from "./ScreenshotOcrUploader";
import { MessageXRay } from "./MessageXRay";
import { SafetyAssessmentPanel } from "./SafetyAssessmentPanel";
import { DeceptionBlueprint } from "./DeceptionBlueprint";
import { SafeExitRoute } from "./SafeExitRoute";
import { cn } from "@/lib/utils";

interface InvestigationWorkspaceProps {
  messageInput: string;
  onMessageInputChange: (val: string) => void;
  result: InvestigationResult | null;
  onResultChange: (res: InvestigationResult | null) => void;
}

export function InvestigationWorkspace({
  messageInput,
  onMessageInputChange,
  result,
  onResultChange,
}: InvestigationWorkspaceProps) {
  const [selectedClueId, setSelectedClueId] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [activeExampleId, setActiveExampleId] = useState<string | null>(null);

  const runInspection = async (textToInspect?: string) => {
    const target = (textToInspect ?? messageInput).trim();
    setValidationError(null);

    if (target.length < 3) {
      setValidationError(
        "Paste at least a few words or load an example message to start the inspection."
      );
      return;
    }

    if (target.length > 6000) {
      setValidationError(
        "Please trim the message under 6,000 characters before inspecting."
      );
      return;
    }

    setIsAnalyzing(true);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: target }),
      });

      if (res.ok) {
        const data: InvestigationResult = await res.json();
        onResultChange(data);
        setSelectedClueId(data.clues[0]?.id ?? null);
      } else {
        // Instant deterministic client fallback if offline
        const fallback = analyzeMessageDeterministically(target);
        onResultChange(fallback);
        setSelectedClueId(fallback.clues[0]?.id ?? null);
      }
    } catch {
      const fallback = analyzeMessageDeterministically(target);
      onResultChange(fallback);
      setSelectedClueId(fallback.clues[0]?.id ?? null);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleLoadExample = (exampleId: string, autoInspect = false) => {
    const found = EXAMPLE_MESSAGES.find((ex) => ex.id === exampleId);
    if (!found) return;
    setActiveExampleId(found.id);
    setValidationError(null);
    onMessageInputChange(found.message);
    if (autoInspect) {
      runInspection(found.message);
    }
  };

  const handleClearInvestigation = () => {
    onMessageInputChange("");
    onResultChange(null);
    setSelectedClueId(null);
    setValidationError(null);
    setActiveExampleId(null);
  };

  const stages = [
    { num: 1, label: "Inspect", icon: FileText, active: true },
    { num: 2, label: "Reveal", icon: Eye, active: Boolean(result) },
    { num: 3, label: "Understand", icon: GitBranch, active: Boolean(result) },
    { num: 4, label: "Act Safely", icon: Compass, active: Boolean(result) },
  ];

  return (
    <section
      id="investigation-studio"
      className="scroll-mt-20 py-6 sm:py-10"
      aria-label="Message Investigation Studio"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* 4-Stage Journey Progress Bar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#e5e3dc] bg-white/90 px-4 py-3 shadow-2xs">
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            {stages.map((st, idx) => {
              const Icon = st.icon;
              return (
                <div key={st.num} className="flex items-center gap-2 sm:gap-3">
                  <div
                    className={cn(
                      "flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-colors",
                      st.active
                        ? "bg-[#161615] text-white"
                        : "bg-[#f3f1ec] text-[#6b6963]"
                    )}
                  >
                    <Icon className="h-3.5 w-3.5 text-amber-400" />
                    <span>
                      {st.num}. {st.label}
                    </span>
                  </div>
                  {idx < stages.length - 1 && (
                    <span className="hidden h-px w-4 bg-[#d6d3c9] sm:inline-block" />
                  )}
                </div>
              );
            })}
          </div>

          {(messageInput.length > 0 || result) && (
            <button
              type="button"
              onClick={handleClearInvestigation}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-[#e5e3dc] bg-[#faf9f6] px-3 py-1 text-xs font-medium text-[#575652] transition-colors hover:border-rose-300 hover:bg-rose-50 hover:text-rose-900"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Clear investigation</span>
            </button>
          )}
        </div>

        {/* Stage 1: Input & Example Composer */}
        <div className="lantern-card rounded-3xl p-5 sm:p-7">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-[#161615] sm:text-2xl">
                Stage 1: Inspect a Suspicious Message
              </h2>
              <p className="mt-1 text-xs text-[#575652] sm:text-sm">
                Paste an SMS, WhatsApp, Telegram, email, or support chat below,
                upload a screenshot, or test a realistic scenario.
              </p>
            </div>
          </div>

          {/* Predefined Example Pills */}
          <div className="mt-4">
            <p className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#6b6963]">
              Instant Demo Scenarios:
            </p>
            <div className="flex flex-wrap gap-2">
              {EXAMPLE_MESSAGES.map((ex) => {
                const selected = activeExampleId === ex.id;
                return (
                  <button
                    key={ex.id}
                    type="button"
                    onClick={() => handleLoadExample(ex.id, true)}
                    className={cn(
                      "cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all",
                      selected
                        ? "border-amber-500 bg-amber-50 text-amber-950 shadow-2xs"
                        : "border-[#e5e3dc] bg-[#faf9f6] text-[#3f3e3a] hover:border-amber-300 hover:bg-white"
                    )}
                  >
                    <span className="font-semibold">{ex.tag}</span>
                    <span className="ml-1.5 text-[#6b6963]">• {ex.channel}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Large Message Input */}
          <div className="mt-4">
            <label htmlFor="message-inspector-textarea" className="sr-only">
              Suspicious message text
            </label>
            <textarea
              id="message-inspector-textarea"
              rows={5}
              value={messageInput}
              onChange={(e) => {
                onMessageInputChange(e.target.value);
                if (validationError) setValidationError(null);
              }}
              placeholder="Paste the message you received here... For example: 'Hello, I am from the official support team. Your account will be suspended in 15 minutes unless you share your 6-digit OTP...'"
              className="w-full resize-y rounded-2xl border border-[#d6d3c9] bg-[#faf9f6] p-4 text-[15px] leading-relaxed text-[#161615] placeholder:text-[#8c8981] focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-400/30 focus:outline-none"
            />
          </div>

          {validationError && (
            <p className="mt-2 text-xs font-medium text-rose-700">
              {validationError}
            </p>
          )}

          {/* Bottom Controls: OCR + Primary CTA */}
          <div className="mt-4 flex flex-col justify-between gap-4 border-t border-[#eceae3] pt-4 lg:flex-row lg:items-center">
            <ScreenshotOcrUploader
              onTextExtracted={(text) => {
                onMessageInputChange(text);
                setActiveExampleId(null);
              }}
            />

            <div className="flex items-center gap-3 self-end lg:self-auto">
              <span className="font-mono text-[11px] text-[#6b6963]">
                {messageInput.length}/6000
              </span>

              <button
                type="button"
                disabled={isAnalyzing}
                onClick={() => runInspection()}
                className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#161615] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#2b2b28] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-amber-400" />
                    <span>Illuminating Clues...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 text-amber-400" />
                    <span>Inspect Message</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Stages 2, 3 & 4 Investigation Output */}
        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              key={result.analyzedAt + result.originalMessage.slice(0, 24)}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.32 }}
              className="mt-8 space-y-6"
            >
              {/* Two-column desktop Investigation Workspace */}
              <div className="grid items-start gap-6 lg:grid-cols-12">
                {/* Left Column: Message X-Ray & Deception Blueprint */}
                <div className="space-y-6 lg:col-span-7">
                  <MessageXRay
                    originalMessage={result.originalMessage}
                    clues={result.clues}
                    selectedClueId={selectedClueId}
                    onSelectClue={setSelectedClueId}
                  />

                  <DeceptionBlueprint
                    summary={result.blueprint.summary}
                    nodes={result.blueprint.nodes}
                    edges={result.blueprint.edges}
                  />
                </div>

                {/* Right Column: Safety Assessment & Safe Exit Route */}
                <div className="space-y-6 lg:col-span-5">
                  <SafetyAssessmentPanel result={result} />
                  <SafeExitRoute result={result} />

                  <div className="flex items-center justify-between rounded-2xl border border-[#e5e3dc] bg-white p-4">
                    <div>
                      <p className="text-xs font-semibold text-[#161615]">
                        Have another message to check?
                      </p>
                      <p className="text-[11px] text-[#6b6963]">
                        Reset the workspace cleanly with one click.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleClearInvestigation}
                      className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-[#d6d3c9] bg-[#faf9f6] px-3.5 py-2 text-xs font-semibold text-[#161615] hover:border-amber-400 hover:bg-amber-50/40"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      <span>Inspect another</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
