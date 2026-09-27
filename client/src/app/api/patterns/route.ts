import { NextResponse } from "next/server";
import { PATTERNS } from "@/lib/data";

export async function GET() {
  return NextResponse.json({
    patterns: PATTERNS,
    total_patterns_detected: PATTERNS.length,
    total_downtime_prevented_est_hours: 11.2,
    memory_growth_index: "20 incidents indexed",
  });
}
