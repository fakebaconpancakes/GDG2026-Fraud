"use client";

import { useState } from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { InvestigationWorkspace } from "@/components/investigation/InvestigationWorkspace";
import { BenefitsSection } from "@/components/home/BenefitsSection";
import { EXAMPLE_MESSAGES } from "@/lib/data/examples";
import { analyzeMessageDeterministically } from "@/lib/analyzer/deterministic";
import { InvestigationResult } from "@/lib/types";

export default function HomePage() {
  const [messageInput, setMessageInput] = useState("");
  const [result, setResult] = useState<InvestigationResult | null>(null);

  const scrollToStudio = () => {
    const el = document.getElementById("investigation-studio");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setTimeout(() => {
      const textarea = document.getElementById("message-inspector-textarea");
      textarea?.focus();
    }, 350);
  };

  const handleTryLiveExample = () => {
    const demo = EXAMPLE_MESSAGES[0];
    setMessageInput(demo.message);
    const analyzed = analyzeMessageDeterministically(demo.message);
    setResult(analyzed);

    const el = document.getElementById("investigation-studio");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div>
      <HeroSection
        onStartInspect={scrollToStudio}
        onTryLiveExample={handleTryLiveExample}
      />
      <InvestigationWorkspace
        messageInput={messageInput}
        onMessageInputChange={setMessageInput}
        result={result}
        onResultChange={setResult}
      />
      <BenefitsSection />
    </div>
  );
}
