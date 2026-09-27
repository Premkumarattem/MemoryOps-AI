"use client";

import React, { useState } from "react";
import { History, Calendar, Filter, Clock, AlertTriangle, ShieldCheck, ChevronRight, X, Tag } from "lucide-react";
import { Incident, TIMELINE_EVENTS } from "../lib/data";

interface ScreenMemoryTimelineProps {
  incidents: Incident[];
}

export const ScreenMemoryTimeline: React.FC<ScreenMemoryTimelineProps> = ({ incidents }) => {
  const [selectedSeverity, setSelectedSeverity] = useState<string>("ALL");
  const [activeModalIncident, setActiveModalIncident] = useState<Incident | null>(null);

  const filteredIncidents = incidents.filter((inc) => {
    if (selectedSeverity === "ALL") return true;
    return inc.severity === selectedSeverity;
  });

  return (
    <div className="space-y-6">
      {/* Screen 3 Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            <History className="w-4 h-4" /> Operational Memory Timeline
          </div>
          <h2 className="text-xl font-bold text-white mt-1">
            Chronological History of Ingested Post-Mortems & Pattern Milestones
          </h2>
          <p className="text-xs text-slate-400">
            Every outage ingested builds organizational memory. Click any node to inspect symptoms and resolutions.
          </p>
        </div>

        {/* Severity Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs text-slate-400">Filter Severity:</span>
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
          >
            <option value="ALL">All Severities</option>
            <option value="CRITICAL">Critical</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
        </div>
      </div>

      {/* Timeline Milestones Graphic Bar */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
          2026 Operational Memory Evolution
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {TIMELINE_EVENTS.map((evt, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl border text-xs flex flex-col justify-between space-y-2 transition-all ${
                evt.type === "PATTERN_DETECTED"
                  ? "bg-purple-950/40 border-purple-500/30 text-purple-200"
                  : evt.type === "PREVENTED"
                  ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-200"
                  : "bg-slate-950/80 border-slate-800 text-slate-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase text-slate-400 font-bold">{evt.month}</span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                  evt.type === "PATTERN_DETECTED" ? "bg-purple-500/20 text-purple-300" : evt.type === "PREVENTED" ? "bg-emerald-500/20 text-emerald-300" : "bg-slate-800 text-slate-400"
                }`}>
                  {evt.category}
                </span>
              </div>
              <p className="font-semibold text-xs leading-snug line-clamp-2">{evt.title}</p>
              <span className="text-[10px] font-mono text-slate-400">{evt.impact}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Timeline List */}
      <div className="relative border-l-2 border-slate-800 ml-4 pl-6 space-y-6">
        {filteredIncidents.map((inc) => (
          <div key={inc.id} className="relative group">
            {/* Timeline Dot */}
            <div className={`absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 ${
              inc.severity === "CRITICAL" ? "bg-rose-500 border-rose-950" : inc.severity === "HIGH" ? "bg-amber-500 border-amber-950" : "bg-indigo-500 border-indigo-950"
            }`} />

            <div
              onClick={() => setActiveModalIncident(inc)}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 cursor-pointer transition-all space-y-3 shadow-sm hover:shadow-md"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-xs text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                    {inc.id}
                  </span>
                  <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" /> {inc.date}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono ${
                    inc.severity === "CRITICAL" ? "bg-rose-500/10 text-rose-400 border border-rose-500/20" : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                  }`}>
                    {inc.severity}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Recovery: <strong className="text-emerald-400 font-mono">{inc.recovery_time_minutes}m</strong></span>
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {inc.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  <strong className="text-slate-300">Symptoms: </strong>{inc.symptoms}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {inc.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800 font-mono">
                      #{tag}
                    </span>
                  ))}
                </div>
                <span className="text-xs text-indigo-400 font-semibold flex items-center gap-1">
                  Inspect Memory Node <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Incident Post-Mortem Detail Modal */}
      {activeModalIncident && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveModalIncident(null)}
              className="absolute right-5 top-5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs text-indigo-400 font-mono font-bold">
              <span>{activeModalIncident.id}</span> • <span>{activeModalIncident.date}</span>
            </div>

            <h2 className="text-xl font-bold text-white leading-tight">
              {activeModalIncident.title}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500">Severity</span>
                <p className="font-bold text-rose-400 mt-0.5">{activeModalIncident.severity}</p>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500">Team</span>
                <p className="font-bold text-slate-200 mt-0.5">{activeModalIncident.team}</p>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500">Recovery Time</span>
                <p className="font-bold text-emerald-400 mt-0.5">{activeModalIncident.recovery_time_minutes} minutes</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <h4 className="font-semibold text-slate-300 mb-1">Symptoms Reported:</h4>
                <p className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-slate-300 leading-relaxed font-mono">
                  {activeModalIncident.symptoms}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-rose-400 mb-1">Identified Root Cause:</h4>
                <p className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-slate-300 leading-relaxed font-mono">
                  {activeModalIncident.root_cause}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-emerald-400 mb-1">Executed Resolution Steps:</h4>
                <p className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-slate-300 leading-relaxed font-mono">
                  {activeModalIncident.resolution}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setActiveModalIncident(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
              >
                Close Memory Inspection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
