"use client";

import React, { useState } from "react";
import {
  Search,
  Brain,
  CheckCircle2,
  Clock,
  Sparkles,
  AlertCircle,
  ArrowRight,
  ShieldAlert,
  Database,
  Terminal,
  Layers,
  ChevronRight,
} from "lucide-react";
import { Incident } from "../lib/data";

interface ScreenLiveIncidentAssistantProps {
  onIngestNew: () => void;
  incidentsDataset: Incident[];
  activeMemoryMode: string;
}

export const ScreenLiveIncidentAssistant: React.FC<ScreenLiveIncidentAssistantProps> = ({
  onIngestNew,
  incidentsDataset,
  activeMemoryMode,
}) => {
  const [query, setQuery] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [searchResult, setSearchResult] = useState<any>(null);

  const samplePrompts = [
    "API latency increased by 400% after database migration",
    "Redis cache miss rate hit 98% with 100% DB CPU",
    "Kafka consumer lag exceeding 1.5M messages with OOMKilled crashes",
    "gRPC UNAVAILABLE connection resets every 60 seconds",
    "Stripe webhook double charging subscriptions during retry",
  ];

  const handleRunSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    setQuery(searchQuery);
    setIsAnalyzing(true);
    setSearchResult(null);

    setTimeout(() => {
      if (activeMemoryMode === "EMPTY") {
        setSearchResult({
          matched: false,
          confidence_score: 12,
          mode: "GENERIC_FALLBACK",
          message: "No similar historical incidents found in Memory Vault.",
          likely_root_cause: "Unknown. Generic advice: Inspect basic system metrics, check server CPU/memory, and review cloud logs.",
          suggested_fixes: [
            "Check server CPU and memory usage",
            "Inspect recent application deployment logs",
            "Consider restarting web service pods",
            "Verify cloud network gateway health"
          ],
          matched_incidents: [],
          avg_recovery_time_mins: null,
          preventive_checks: ["Ingest post-mortems into MemoryOps to build memory recall."]
        });
      } else {
        // Hindsight vector match simulation against dataset
        const isPg = searchQuery.toLowerCase().includes("latency") || searchQuery.toLowerCase().includes("database") || searchQuery.toLowerCase().includes("migration") || searchQuery.toLowerCase().includes("400%");
        const isRedis = searchQuery.toLowerCase().includes("redis") || searchQuery.toLowerCase().includes("cache");
        const isKafka = searchQuery.toLowerCase().includes("kafka") || searchQuery.toLowerCase().includes("oom") || searchQuery.toLowerCase().includes("lag");
        
        let matchInc = incidentsDataset[0]; // INC-017 default
        let confidence = 94.2;

        if (isRedis) {
          matchInc = incidentsDataset.find(i => i.id === "INC-027") || incidentsDataset[1];
          confidence = 91.8;
        } else if (isKafka) {
          matchInc = incidentsDataset.find(i => i.id === "INC-045") || incidentsDataset[2];
          confidence = 95.6;
        }

        setSearchResult({
          matched: true,
          confidence_score: confidence,
          mode: "HINDSIGHT_RECALL",
          message: `Found exact match in Hindsight Memory Vault (#${matchInc.id}).`,
          likely_root_cause: matchInc.root_cause,
          suggested_fixes: [matchInc.resolution, ...matchInc.preventive_checks],
          matched_incidents: [matchInc],
          avg_recovery_time_mins: matchInc.recovery_time_minutes,
          preventive_checks: matchInc.preventive_checks,
        });
      }
      setIsAnalyzing(false);
    }, 500);
  };

  return (
    <div className="space-y-6">
      {/* Screen 2 Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
              <Brain className="w-4 h-4" /> Live Incident Assistant
            </div>
            <h2 className="text-xl font-bold text-white mt-1">
              Describe the outage symptoms to consult organizational memory
            </h2>
            <p className="text-xs text-slate-400">
              Instead of searching Slack, Confluence, and Jira, MemoryOps recalls past root causes instantly.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs px-3 py-1.5 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-mono">
              Mode: {activeMemoryMode === "EMPTY" ? "0 Memory (Generic Advice)" : "Full Operational Memory (Hindsight Active)"}
            </span>
          </div>
        </div>

        {/* Search Input Box */}
        <div className="relative">
          <div className="flex items-center bg-slate-950 border border-slate-700/70 rounded-xl p-2 focus-within:border-indigo-500 shadow-inner">
            <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleRunSearch(query)}
              placeholder="Describe symptoms (e.g. API latency increased by 400%, DB connection pool saturated...)"
              className="w-full bg-transparent px-3 py-2 text-sm text-slate-100 focus:outline-none placeholder:text-slate-500"
            />
            <button
              onClick={() => handleRunSearch(query)}
              disabled={isAnalyzing}
              className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-2 transition-all shadow-md shrink-0"
            >
              {isAnalyzing ? (
                <Clock className="w-4 h-4 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              {isAnalyzing ? "Recalling..." : "Recall Past Incidents"}
            </button>
          </div>
        </div>

        {/* Quick Sample Prompts */}
        <div className="space-y-2">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Sample Live Outage Scenarios:
          </span>
          <div className="flex flex-wrap gap-2">
            {samplePrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleRunSearch(prompt)}
                className="text-xs px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 text-slate-300 transition-all flex items-center gap-1.5"
              >
                <span>{prompt}</span>
                <ArrowRight className="w-3 h-3 text-slate-500" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Section */}
      {isAnalyzing && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-12 flex flex-col items-center justify-center space-y-4 text-center">
          <div className="w-12 h-12 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 animate-pulse">
            <Brain className="w-6 h-6 animate-spin" />
          </div>
          <p className="text-sm font-semibold text-slate-200">
            Traversing Hindsight Vector Graph & Searching Historical Incidents...
          </p>
          <p className="text-xs text-slate-500">
            Comparing symptoms against 20 post-mortems and root cause embeddings
          </p>
        </div>
      )}

      {searchResult && !isAnalyzing && (
        <div className="space-y-6">
          {/* Status Header */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400">Match Status</span>
                <p className="text-sm font-bold text-white mt-0.5">
                  {searchResult.matched ? "Similar Incidents Found" : "No Similar Incident"}
                </p>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded font-mono font-bold ${
                searchResult.matched ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
              }`}>
                {searchResult.matched ? "MATCHED" : "GENERIC"}
              </span>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400">Hindsight Confidence Score</span>
                <p className="text-sm font-bold text-white mt-0.5">
                  {searchResult.confidence_score}% Match Confidence
                </p>
              </div>
              <span className="text-xs px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono font-bold">
                {searchResult.confidence_score}%
              </span>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400">Estimated Recovery Time</span>
                <p className="text-sm font-bold text-emerald-400 mt-0.5">
                  {searchResult.avg_recovery_time_mins ? `${searchResult.avg_recovery_time_mins} minutes` : "Unknown"}
                </p>
              </div>
              <Clock className="w-5 h-5 text-emerald-400" />
            </div>
          </div>

          {/* Root Cause & Fixes Breakdown Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main AI SRE Diagnosis */}
            <div className="lg:col-span-2 space-y-6">
              {/* Likely Root Cause Box */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
                <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
                  <AlertCircle className="w-4 h-4" /> Identified Root Cause
                </div>
                <h3 className="text-base font-bold text-white leading-snug">
                  {searchResult.likely_root_cause}
                </h3>
              </div>

              {/* Proven Resolution Steps */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4" /> Proven Resolution Playbook
                  </div>
                  <span className="text-xs text-slate-400">Recalled from past incidents</span>
                </div>

                <div className="space-y-3">
                  {searchResult.suggested_fixes.map((fix: string, idx: number) => (
                    <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed font-mono">
                        {fix}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action: Ingest back to memory */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-300">
                  Did this fix resolve the incident? Ingest updated post-mortem to strengthen memory.
                </div>
                <button
                  onClick={onIngestNew}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-2 transition-all shadow-md shrink-0"
                >
                  <Database className="w-4 h-4" /> Save Post-Mortem to Vault
                </button>
              </div>
            </div>

            {/* Side Panel: Matched Incidents Detail */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-400" /> Historical Recalled Incidents
              </h3>

              {searchResult.matched_incidents.length > 0 ? (
                searchResult.matched_incidents.map((inc: Incident) => (
                  <div key={inc.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono font-bold text-indigo-400">{inc.id}</span>
                      <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 font-mono font-semibold">
                        {inc.severity}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white">{inc.title}</h4>
                    <p className="text-xs text-slate-400 line-clamp-3">{inc.symptoms}</p>

                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Team: {inc.team}</span>
                      <span className="text-emerald-400 font-mono">Resolved in {inc.recovery_time_minutes}m</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center text-xs text-slate-500 space-y-2">
                  <Database className="w-8 h-8 mx-auto text-slate-600" />
                  <p>No historical memory nodes retrieved for this query.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
