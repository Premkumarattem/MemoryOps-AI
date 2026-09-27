"use client";

import React from "react";
import { Cpu, ShieldAlert, Clock, AlertTriangle, Layers, ArrowUpRight, CheckCircle2, Server } from "lucide-react";
import { PATTERNS } from "../lib/data";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export const ScreenPatternIntelligence: React.FC = () => {
  const pieData = PATTERNS.map((p) => ({
    name: p.pattern_name,
    value: p.occurrences,
  }));

  const COLORS = ["#818cf8", "#c084fc", "#f43f5e", "#fbbf24"];

  return (
    <div className="space-y-6">
      {/* Screen 4 Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-purple-400 text-xs font-semibold uppercase tracking-wider">
            <Cpu className="w-4 h-4 text-purple-400" /> Pattern Intelligence Engine
          </div>
          <span className="text-xs px-2.5 py-1 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20 font-mono">
            Automated Structural Discovery
          </span>
        </div>
        <h2 className="text-xl font-bold text-white">
          Discover Recurring Operational Weaknesses Across the Organization
        </h2>
        <p className="text-xs text-slate-400">
          MemoryOps clusters past post-mortems to surface systemically repeated failures before they cause total outages.
        </p>
      </div>

      {/* Top Recurring Patterns Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Pattern Cards */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Top Recurring System Weaknesses
          </h3>

          {PATTERNS.map((pattern, idx) => (
            <div
              key={pattern.id}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-5 space-y-4 transition-all shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center font-mono font-bold text-purple-400 text-xs">
                    #{idx + 1}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{pattern.pattern_name}</h4>
                    <span className="text-[11px] text-slate-400 font-mono">{pattern.id}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20 text-xs font-mono font-bold">
                    {pattern.occurrences} Incidents
                  </span>
                  <span className="px-2.5 py-1 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-mono font-bold">
                    {pattern.total_downtime_minutes}m Total Downtime
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <p className="text-slate-300">
                  <strong className="text-purple-300">Primary Root Cause: </strong>
                  {pattern.primary_cause}
                </p>

                <div>
                  <span className="text-slate-400 font-semibold block mb-1">Affected Systems:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {pattern.affected_systems.map((sys, sIdx) => (
                      <span key={sIdx} className="px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800 text-[10px] font-mono flex items-center gap-1">
                        <Server className="w-3 h-3 text-indigo-400" /> {sys}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-emerald-400 font-semibold block mb-1">Structural Resolution Playbook:</span>
                  <ul className="space-y-1 font-mono text-[11px] text-slate-300">
                    {pattern.resolution_playbook.map((item, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Col: Distribution & Impact Chart */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Pattern Distribution
            </h3>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={75}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "8px", fontSize: "12px" }}
                  />
                  <Legend wrapperStyle={{ fontSize: "11px" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 text-xs">
            <h3 className="font-bold text-white">ROI & Operational Impact</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Total Downtime Logged</span>
                <span className="font-mono font-bold text-rose-400">675 minutes</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Est. Engineering Hours Saved</span>
                <span className="font-mono font-bold text-emerald-400">320 Hours</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Recurring Outages Prevented</span>
                <span className="font-mono font-bold text-indigo-400">15 Outages</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
