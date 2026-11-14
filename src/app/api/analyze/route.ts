import { NextRequest, NextResponse } from "next/server";
import { analyzeMessageDeterministically } from "@/lib/analyzer/deterministic";
import { AnalyzeRequestSchema } from "@/lib/schemas";

const rateWindowMs = 60_000;
const maxRequestsPerWindow = 40;
const requestHits = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = requestHits.get(ip);
  if (!entry || now > entry.resetAt) {
    requestHits.set(ip, { count: 1, resetAt: now + rateWindowMs });
    return true;
  }
  if (entry.count >= maxRequestsPerWindow) {
    return false;
  }
  entry.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          error:
            "Too many inspections in a short period. Please wait a moment and try again.",
        },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    const parsed = AnalyzeRequestSchema.safeParse(body);

    if (!parsed.success) {
      const firstIssue =
        parsed.error.issues[0]?.message ||
        "Please provide a valid message to inspect.";
      return NextResponse.json({ error: firstIssue }, { status: 400 });
    }

    const result = analyzeMessageDeterministically(parsed.data.message);
    return NextResponse.json(result, {
      status: 200,
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch {
    return NextResponse.json(
      {
        error:
          "Unable to process the inspection right now. Please try again shortly.",
      },
      { status: 500 }
    );
  }
}
