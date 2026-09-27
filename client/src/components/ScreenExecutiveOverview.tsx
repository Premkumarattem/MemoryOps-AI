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
  Search,
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
  const [deployNote, setDeployNote] = useState(
    "Upgrading PgBouncer pool limit to 500 & clearing Redis catalog session keys"
  );
  const [preDeployResult, setPreDeployResult] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleRunPreDeployCheck = () => {
    setIsScanning(true);
    setTimeout(() => {
      setPreDeployResult({
        risk_level: "HIGH",
        matching_past_outages_count: 2,
        recalled: [
          "INC-017: Connection Pool Saturation (March)",
          "INC-027: Redis Cache Storm (April)",
        ],
        checks: [
          "Verify PgBouncer pool limit dynamically matches maximum pod replica bounds",
          "Prohibit global FLUSHALL / FLUSHDB in migration scripts",
          "Ensure client statement_timeout = 5000ms is enabled",
        ],
      });
      setIsScanning(false);
    }, 600);
  };

  return (
    <div className="space-y-8">
      {/* Hero Executive Value Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950/70 to-slate-900 border border-indigo-500/30 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Executive Operational Dashboard
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              Every outage teaches a lesson. MemoryOps ensures your organization never learns it twice.
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              Transforming post-mortems, Slack threads, and Jira tickets into{" "}
              <strong className="text-indigo-300">persistent organizational memory</strong> powered by Hindsight.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onNavigateToAssistant}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs flex items-center gap-2.5 shadow-xl shadow-indigo-600/30 transition-all hover:scale-[1.02]"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>Ask Live SRE Assistant</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Executive KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Total Incidents */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Indexed Memory Vault
            </span>
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Database className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-white font-mono">{incidentsCount}</span>
            <span className="text-xs text-emerald-400 font-semibold flex items-center">
              <ArrowUpRight className="w-4 h-4 mr-0.5" /> 100% Indexed
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Historical post-mortems stored in vector memory
          </p>
        </div>

        {/* Card 2: Memory Vault Size */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Memory Vault Size
            </span>
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Brain className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-white font-mono">1.4 MB</span>
            <span className="text-xs text-cyan-400 font-semibold">Hindsight Store</span>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Symptoms, root causes & resolution graphs
          </p>
        </div>

        {/* Card 3: Recurring Patterns */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Recurring Patterns
            </span>
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-purple-300 font-mono">4</span>
            <span className="text-xs text-purple-400 font-semibold">Auto-Identified</span>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Structural operational weaknesses mapped
          </p>
        </div>

        {/* Card 4: MTTR Reduction */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Avg Recovery Time (MTTR)
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">18m</span>
            <span className="text-xs text-emerald-400 font-bold flex items-center">
              <TrendingDown className="w-4 h-4 mr-0.5" /> -83%
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Down from 110m prior to memory retrieval
          </p>
        </div>
      </div>

      {/* Analytics Visual Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Learning Curve Chart */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Brain className="w-5 h-5 text-indigo-400" /> Learning Curve & Prediction Accuracy
              </h3>
              <p className="text-xs text-slate-400">
                Demonstrating how AI recommendation confidence improves as memory grows
              </p>
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
              94% Accuracy
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={LEARNING_CURVE_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="label" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} unit="%" domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#090d16", borderColor: "#334155", borderRadius: "12px", fontSize: "12px" }}
                  itemStyle={{ color: "#818cf8" }}
                />
                <Line
                  type="monotone"
                  dataKey="accuracy"
                  name="Pattern Accuracy (%)"
                  stroke="#818cf8"
                  strokeWidth={3.5}
                  dot={{ r: 6, fill: "#6366f1" }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* MTTR Drop Chart */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-emerald-400" /> MTTR Reduction Comparison
              </h3>
              <p className="text-xs text-slate-400">
                Recovery time comparison: Manual Search vs MemoryOps AI Recall
              </p>
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
              Saved ~92 mins/outage
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MTTR_TREND_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} unit="m" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#090d16", borderColor: "#334155", borderRadius: "12px", fontSize: "12px" }}
                />
                <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
                <Bar dataKey="mttrNoOps" name="Without MemoryOps (Manual Search)" fill="#334155" radius={[6, 6, 0, 0]} />
                <Bar dataKey="mttrWithMemoryOps" name="With MemoryOps AI (Instant Recall)" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Feature 5: Pre-Deployment Guardrail Check */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2.5">
              <AlertTriangle className="w-5 h-5 text-amber-400" /> Feature 5: Pre-Deployment Outage Risk Scanner
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Scans PR descriptions and migration scripts against historical post-mortems before deploying to production.
            </p>
          </div>
          <span className="text-xs px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-300 border border-amber-500/30 font-mono font-bold shrink-0">
            Preventative Guardrails
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            <label className="text-xs text-slate-300 font-semibold block">Planned Release / PR Description:</label>
            <textarea
              value={deployNote}
              onChange={(e) => setDeployNote(e.target.value)}
              rows={3}
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-mono leading-relaxed"
            />
            <button
              onClick={handleRunPreDeployCheck}
              disabled={isScanning}
              className="px-5 py-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center gap-2.5 transition-all shadow-sm"
            >
              {isScanning ? <Clock className="w-4 h-4 animate-spin text-amber-400" /> : <ShieldCheck className="w-4 h-4 text-amber-400" />}
              <span>{isScanning ? "Scanning Memory Vault..." : "Run Pre-Deployment Risk Analysis"}</span>
            </button>
          </div>

          <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
            {preDeployResult ? (
              <div className="space-y-4 text-xs">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-slate-400 font-medium">Risk Status:</span>
                  <span className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30 font-mono font-bold">
                    HIGH RISK
                  </span>
                </div>

                <div>
                  <p className="text-slate-300 font-bold mb-1.5">Matching Past Outages:</p>
                  <ul className="space-y-1.5 text-amber-300 font-mono text-[11px]">
                    {preDeployResult.recalled.map((r: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-amber-400 font-bold">•</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-slate-300 font-bold mb-1.5">Required Pre-flight Checklist:</p>
                  <ul className="space-y-1.5 text-emerald-400 font-mono text-[11px]">
                    {preDeployResult.checks.map((c: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center py-6 space-y-3 text-slate-500">
                <ShieldCheck className="w-10 h-10 text-slate-700" />
                <p className="text-xs">Click scan button to evaluate deployment risks against organizational memory</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
