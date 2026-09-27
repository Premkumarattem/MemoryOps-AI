"use client";

import React, { useState } from "react";
import {
  Database,
  Brain,
  TrendingDown,
  Clock,
  ShieldCheck,
  Zap,
  ArrowUpRight,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { LEARNING_CURVE_DATA, MTTR_TREND_DATA } from "../lib/data";

interface ScreenExecutiveOverviewProps {
  onNavigateToAssistant: () => void;
  incidentsCount: number;
}

export const ScreenExecutiveOverview: React.FC<ScreenExecutiveOverviewProps> = ({
  onNavigateToAssistant,
  incidentsCount,
}) => {
  const [deployNote, setDeployNote] = useState("Upgrading PgBouncer pool limits & Redis session cache invalidation");
  const [preDeployResult, setPreDeployResult] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleRunPreDeployCheck = () => {
    setIsScanning(true);
    setTimeout(() => {
      setPreDeployResult({
        risk_level: "HIGH",
        matching_past_outages_count: 2,
        recalled: ["INC-017: Connection Pool Saturation (March)", "INC-027: Redis Cache Storm (April)"],
        checks: [
          "✓ Verify PgBouncer connection pool max limits match web pod autoscale ceiling",
          "✓ Prohibit global FLUSHALL / FLUSHDB in migration scripts",
          "✓ Ensure client statement_timeout = 5000ms is enabled"
        ]
      });
      setIsScanning(false);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Problem & Value Pitch Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-indigo-500/20 rounded-2xl p-6 relative overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-indigo-400" /> Executive Operational Dashboard
            </div>
            <h2 className="text-2xl font-extrabold text-white">
              Every outage teaches a lesson. MemoryOps ensures you never learn it twice.
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Transforming fragmented post-mortems, Slack threads, and Jira root cause analyses into 
              <span className="text-indigo-300 font-semibold"> persistent organizational memory</span> powered by Hindsight.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateToAssistant}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-indigo-500/25 transition-all"
            >
              <Zap className="w-4 h-4 fill-white" />
              Launch Live Incident Assistant
            </button>
          </div>
        </div>
      </div>

      {/* Screen 1 Cards (Executive Overview) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Incidents */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 hover:border-slate-700/80 transition-all shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Total Incidents</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Database className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-mono">{incidentsCount}</span>
            <span className="text-xs text-emerald-400 font-medium flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" /> 100% Indexed
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Historical post-mortems ingested into vector memory
          </p>
        </div>

        {/* Card 2: Memory Stored */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 hover:border-slate-700/80 transition-all shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Memory Vault Size</span>
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Brain className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-mono">1.4 MB</span>
            <span className="text-xs text-cyan-400 font-medium">Hindsight Store</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Symptoms, root causes, logs & resolution graphs
          </p>
        </div>

        {/* Card 3: Recurring Patterns */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 hover:border-slate-700/80 transition-all shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Recurring Patterns</span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-purple-300 font-mono">4</span>
            <span className="text-xs text-purple-400 font-medium">Auto-Identified</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Structural operational weaknesses mapped
          </p>
        </div>

        {/* Card 4: Average Resolution Time */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 hover:border-slate-700/80 transition-all shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Avg Resolution Time (MTTR)</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-400 font-mono">18m</span>
            <span className="text-xs text-emerald-400 font-semibold flex items-center">
              <TrendingDown className="w-3.5 h-3.5 mr-0.5" /> -83%
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Down from 110m prior to memory retrieval
          </p>
        </div>
      </div>

      {/* Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Learning Timeline Curve */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Brain className="w-4 h-4 text-indigo-400" /> Learning Curve & Prediction Accuracy
              </h3>
              <p className="text-xs text-slate-400">
                Demonstrating how AI recommendation confidence improves as memory grows
              </p>
            </div>
            <span className="text-[11px] px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-mono">
              94% Accuracy at 20 Incidents
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={LEARNING_CURVE_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="label" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} unit="%" domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "8px", fontSize: "12px" }}
                  itemStyle={{ color: "#818cf8" }}
                />
                <Line
                  type="monotone"
                  dataKey="accuracy"
                  name="Pattern Accuracy (%)"
                  stroke="#818cf8"
                  strokeWidth={3}
                  dot={{ r: 5, fill: "#6366f1" }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* MTTR Drop Chart */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-emerald-400" /> Mean Time To Resolution (MTTR) Comparison
              </h3>
              <p className="text-xs text-slate-400">
                Comparison of incident recovery time with vs without MemoryOps AI
              </p>
            </div>
            <span className="text-[11px] px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-mono">
              Saved ~92 mins/outage
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MTTR_TREND_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} unit="m" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "8px", fontSize: "12px" }}
                />
                <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
                <Bar dataKey="mttrNoOps" name="Without MemoryOps (Manual Search)" fill="#475569" radius={[4, 4, 0, 0]} />
                <Bar dataKey="mttrWithMemoryOps" name="With MemoryOps AI (Instant Recall)" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Feature 5 Interactive Demo: Preventive Alerting Widget */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" /> Feature 5: Pre-Deployment Outage Prevention Check
            </h3>
            <p className="text-xs text-slate-400">
              Simulate CI/CD deployment check. MemoryOps scans historical outages to warn you before deploying risky code.
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20 font-mono">
            Preventative Guardrails
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-3">
            <label className="text-xs text-slate-300 font-medium block">Planned Deployment Changes / PR Description:</label>
            <textarea
              value={deployNote}
              onChange={(e) => setDeployNote(e.target.value)}
              rows={3}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
            />
            <button
              onClick={handleRunPreDeployCheck}
              disabled={isScanning}
              className="px-4 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold flex items-center gap-2 transition-all"
            >
              {isScanning ? <Clock className="w-4 h-4 animate-spin text-amber-400" /> : <ShieldCheck className="w-4 h-4 text-amber-400" />}
              {isScanning ? "Scanning Memory Vault..." : "Run Pre-Deployment Risk Scan"}
            </button>
          </div>

          <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between">
            {preDeployResult ? (
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-medium">Risk Level:</span>
                  <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30 font-bold font-mono">
                    HIGH RISK
                  </span>
                </div>
                <div>
                  <p className="text-slate-300 font-semibold mb-1">Matching Past Outages:</p>
                  <ul className="space-y-1 text-slate-400 font-mono text-[11px]">
                    {preDeployResult.recalled.map((r: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-1 text-amber-300/90">
                        • {r}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-slate-300 font-semibold mb-1">Required Pre-flight Checks:</p>
                  <ul className="space-y-1 text-emerald-400 font-mono text-[11px]">
                    {preDeployResult.checks.map((c: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 mt-0.5 shrink-0" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center py-4 space-y-2 text-slate-500">
                <ShieldCheck className="w-8 h-8 text-slate-600" />
                <p className="text-xs">Click scan to run pre-deployment incident risk analysis</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
