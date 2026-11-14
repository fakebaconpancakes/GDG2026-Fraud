"use client";

import { useRef, useState } from "react";
import { ImagePlus, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

interface ScreenshotOcrUploaderProps {
  onTextExtracted: (extracted: string) => void;
}

const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/webp"];
const MAX_BYTES = 8 * 1024 * 1024;

export function ScreenshotOcrUploader({
  onTextExtracted,
}: ScreenshotOcrUploaderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusNote, setStatusNote] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setError(null);
    setStatusNote(null);

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError("Please upload a PNG, JPG, or WebP screenshot.");
      return;
    }

    if (file.size > MAX_BYTES) {
      setError("Screenshot must be under 8 MB.");
      return;
    }

    try {
      setIsProcessing(true);
      setProgress(10);

      const Tesseract = await import("tesseract.js");
      const result = await Tesseract.recognize(file, "eng", {
        logger: (info) => {
          if (info.status === "recognizing text" && typeof info.progress === "number") {
            setProgress(Math.max(15, Math.round(info.progress * 100)));
          }
        },
      });

      const cleaned = (result.data.text || "")
        .replace(/\n{3,}/g, "\n\n")
        .trim();

      if (!cleaned) {
        setError(
          "No readable text was found in that image. Try cropping closer to the message bubble or paste the text directly."
        );
      } else {
        onTextExtracted(cleaned);
        setStatusNote(
          "Extracted locally in your browser. Review or edit the text above before inspecting."
        );
      }
    } catch {
      setError(
        "Could not extract text from this image. You can still type or paste the message manually."
      );
    } finally {
      setIsProcessing(false);
      setProgress(0);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-3">
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={(e) => handleFile(e.target.files?.[0])}
          className="hidden"
          id="screenshot-ocr-input"
        />

        <button
          type="button"
          disabled={isProcessing}
          onClick={() => inputRef.current?.click()}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#d6d3c9] bg-white px-3.5 py-2 text-xs font-semibold text-[#161615] transition-all hover:border-amber-400 hover:bg-amber-50/40 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin text-amber-600" />
              <span>Scanning screenshot locally ({progress}%)...</span>
            </>
          ) : (
            <>
              <ImagePlus className="h-3.5 w-3.5 text-amber-600" />
              <span>Upload Screenshot (PNG, JPG, WebP)</span>
            </>
          )}
        </button>

        <span className="text-[11px] text-[#6b6963]">
          Processed 100% in your browser via OCR. Images never leave your device.
        </span>
      </div>

      {statusNote && (
        <div className="flex items-center gap-2 rounded-xl border border-teal-200 bg-teal-50/60 px-3 py-2 text-xs text-teal-900">
          <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-teal-600" />
          <span>{statusNote}</span>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50/70 px-3 py-2 text-xs text-rose-900">
          <AlertCircle className="h-3.5 w-3.5 shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
