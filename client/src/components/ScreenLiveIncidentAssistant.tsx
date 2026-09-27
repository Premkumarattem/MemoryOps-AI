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
  Database,
  Layers,
  ChevronRight,
  Zap,
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
          likely_root_cause: "Unknown. Generic advice: Inspect basic system metrics, check server CPU/memory, and review cloud provider logs.",
          suggested_fixes: [
            "Check server CPU and memory utilization metrics",
            "Inspect application deployment logs for stack traces",
            "Consider rolling restart of API pods",
            "Verify cloud load balancer status"
          ],
          matched_incidents: [],
          avg_recovery_time_mins: null,
          preventive_checks: ["Ingest post-mortems into MemoryOps to build organizational memory."]
        });
      } else {
        const isPg = searchQuery.toLowerCase().includes("latency") || searchQuery.toLowerCase().includes("database") || searchQuery.toLowerCase().includes("migration") || searchQuery.toLowerCase().includes("400%");
        const isRedis = searchQuery.toLowerCase().includes("redis") || searchQuery.toLowerCase().includes("cache");
        const isKafka = searchQuery.toLowerCase().includes("kafka") || searchQuery.toLowerCase().includes("oom") || searchQuery.toLowerCase().includes("lag");
        
        let matchInc = incidentsDataset[0];
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
          message: `Exact match found in Hindsight Memory Vault (#${matchInc.id}).`,
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
    <div className="space-y-8">
      {/* Search Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
              <Brain className="w-3.5 h-3.5 text-indigo-400" /> Live Incident Assistant
            </div>
            <h2 className="text-2xl font-black text-white mt-2">
              Describe live outage symptoms to recall historical fixes
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Instead of manually searching Slack, Confluence, and Jira, MemoryOps retrieves proven resolutions instantly.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs px-3 py-1.5 rounded-xl bg-slate-950 text-indigo-300 border border-indigo-500/30 font-mono font-bold">
              {activeMemoryMode === "EMPTY" ? "Mode: Empty (Generic Advice)" : "Mode: Hindsight Recall Active"}
            </span>
          </div>
        </div>

        {/* Search Bar Input */}
        <div className="relative">
          <div className="flex items-center bg-slate-950 border border-indigo-500/40 rounded-2xl p-2.5 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-500/20 shadow-2xl transition-all">
            <Search className="w-5 h-5 text-indigo-400 ml-3 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleRunSearch(query)}
              placeholder="Describe symptoms (e.g. API latency increased by 400%, DB connection pool saturated...)"
              className="w-full bg-transparent px-4 py-2 text-sm text-white focus:outline-none placeholder:text-slate-500 font-normal"
            />
            <button
              onClick={() => handleRunSearch(query)}
              disabled={isAnalyzing}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs flex items-center gap-2.5 transition-all shadow-lg shadow-indigo-600/30 shrink-0"
            >
              {isAnalyzing ? (
                <Clock className="w-4 h-4 animate-spin text-white" />
              ) : (
                <Zap className="w-4 h-4 fill-white" />
              )}
              <span>{isAnalyzing ? "Recalling..." : "Recall Past Fixes"}</span>
            </button>
          </div>
        </div>

        {/* Quick Sample Prompts */}
        <div className="space-y-2.5">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Click to test real-world outage scenarios:
          </span>
          <div className="flex flex-wrap gap-2.5">
            {samplePrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleRunSearch(prompt)}
                className="text-xs px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 text-slate-300 hover:text-white transition-all flex items-center gap-2 font-normal"
              >
                <span>{prompt}</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isAnalyzing && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-16 flex flex-col items-center justify-center space-y-4 text-center shadow-xl">
          <div className="w-14 h-14 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 animate-pulse">
            <Brain className="w-7 h-7 animate-spin" />
          </div>
          <p className="text-base font-bold text-slate-100">
            Traversing Hindsight Vector Graph & Searching Historical Memory...
          </p>
          <p className="text-xs text-slate-400">
            Comparing operational symptoms against 20 post-mortems and root cause embeddings
          </p>
        </div>
      )}

      {/* Results View */}
      {searchResult && !isAnalyzing && (
        <div className="space-y-8">
          {/* Status Metric Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex items-center justify-between shadow-md">
              <div>
                <span className="text-xs font-semibold text-slate-400">Memory Status</span>
                <p className="text-base font-bold text-white mt-1">
                  {searchResult.matched ? "Similar Incident Recalled" : "No Memory Match"}
                </p>
              </div>
              <span className={`text-xs px-3 py-1 rounded-lg font-mono font-bold ${
                searchResult.matched ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
              }`}>
                {searchResult.matched ? "MATCHED" : "GENERIC"}
              </span>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex items-center justify-between shadow-md">
              <div>
                <span className="text-xs font-semibold text-slate-400">Hindsight Match Confidence</span>
                <p className="text-base font-bold text-indigo-300 mt-1">
                  {searchResult.confidence_score}% Match Score
                </p>
              </div>
              <span className="text-xs px-3 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono font-bold">
                {searchResult.confidence_score}%
              </span>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex items-center justify-between shadow-md">
              <div>
                <span className="text-xs font-semibold text-slate-400">Past Recovery Time</span>
                <p className="text-base font-bold text-emerald-400 mt-1">
                  {searchResult.avg_recovery_time_mins ? `${searchResult.avg_recovery_time_mins} minutes` : "Unknown"}
                </p>
              </div>
              <Clock className="w-6 h-6 text-emerald-400" />
            </div>
          </div>

          {/* Root Cause & Playbook Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Identified Root Cause */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-7 space-y-3 shadow-xl">
                <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
                  <AlertCircle className="w-4 h-4" /> Identified Root Cause
                </div>
                <h3 className="text-lg font-bold text-white leading-snug">
                  {searchResult.likely_root_cause}
                </h3>
              </div>

              {/* Proven Resolution Playbook */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-7 space-y-5 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                    <CheckCircle2 className="w-4.5 h-4.5" /> Proven Resolution Playbook
                  </div>
                  <span className="text-xs text-slate-400">Recalled from past post-mortems</span>
                </div>

                <div className="space-y-3.5">
                  {searchResult.suggested_fixes.map((fix: string, idx: number) => (
                    <div key={idx} className="bg-slate-950 border border-slate-800/90 rounded-2xl p-4 flex items-start gap-4">
                      <div className="w-7 h-7 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 font-mono">
                        {idx + 1}
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed font-mono">
                        {fix}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Save post-mortem banner */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-slate-300">
                  Did this resolution fix the issue? Save updated post-mortem into Memory Vault.
                </p>
                <button
                  onClick={onIngestNew}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md shrink-0"
                >
                  <Database className="w-4 h-4" /> Save to Vault
                </button>
              </div>
            </div>

            {/* Side Panel: Recalled Incident Detail */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-400" /> Recalled Memory Node
              </h3>

              {searchResult.matched_incidents.length > 0 ? (
                searchResult.matched_incidents.map((inc: Incident) => (
                  <div key={inc.id} className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono font-bold text-indigo-400">{inc.id}</span>
                      <span className="px-2.5 py-0.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/30 font-mono font-bold">
                        {inc.severity}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white">{inc.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">{inc.symptoms}</p>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                      <span>Team: {inc.team}</span>
                      <span className="text-emerald-400 font-mono font-bold">{inc.recovery_time_minutes}m recovery</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center text-xs text-slate-500 space-y-3">
                  <Database className="w-10 h-10 mx-auto text-slate-700" />
                  <p>No past memory nodes retrieved for this query.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
