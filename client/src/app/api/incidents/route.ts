import { NextResponse } from "next/server";
import { INITIAL_INCIDENTS } from "@/lib/data";

let memoryVault = [...INITIAL_INCIDENTS];

export async function GET() {
  return NextResponse.json({
    incidents: memoryVault,
    count: memoryVault.length,
    status: "ONLINE",
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newInc = {
      id: `INC-${Math.floor(100 + Math.random() * 900)}`,
      title: body.title || "Untitled Post-Mortem",
      date: body.date || new Date().toISOString().split("T")[0],
      severity: body.severity || "HIGH",
      team: body.team || "SRE Team",
      services_affected: body.services_affected || ["core-api"],
      symptoms: body.symptoms || "",
      root_cause: body.root_cause || "",
      resolution: body.resolution || "",
      recovery_time_minutes: Number(body.recovery_time_minutes) || 30,
      tags: body.tags || ["operational"],
      preventive_checks: body.preventive_checks || ["Enforce telemetry alerts"],
    };

    memoryVault.unshift(newInc);

    return NextResponse.json({
      status: "SUCCESS",
      incident: newInc,
      total_memory_count: memoryVault.length,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to ingest post-mortem", details: error.message },
      { status: 400 }
    );
  }
}
