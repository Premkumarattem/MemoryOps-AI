"use client";

import React from "react";
import { BrainCircuit, Play, PlusCircle, Database, Sparkles, ShieldCheck } from "lucide-react";

interface HeaderProps {
  memoryCount: number;
  onOpenDemo: () => void;
  onOpenIngest: () => void;
  activeMode: string;
}

export const Header: React.FC<HeaderProps> = ({
  memoryCount,
  onOpenDemo,
  onOpenIngest,
  activeMode,
}) => {
  return (
    <header className="bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 sticky top-0 z-50 px-4 sm:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand & Tagline */}
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-600 to-cyan-400 p-[1px] shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[15px] flex items-center justify-center">
              <BrainCircuit className="w-6 h-6 text-indigo-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl font-black tracking-tight text-white">
                MemoryOps <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">AI</span>
              </h1>
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 flex items-center gap-1 shadow-sm">
                <Sparkles className="w-3 h-3 text-cyan-400" /> Hindsight Powered
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              "The AI SRE That Never Forgets" — Persistent Organizational Memory
            </p>
          </div>
        </div>

        {/* Memory Vault Status & Action Controls */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Memory Node Pill */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl px-3.5 py-1.5 flex items-center gap-2.5 text-xs shadow-inner">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-400 font-medium">Memory Vault:</span>
            <span className="font-mono font-bold text-emerald-400">
              {activeMode === "EMPTY" ? "0 Nodes (Baseline)" : `${memoryCount} Post-Mortems`}
            </span>
          </div>

          {/* Ingest Post-Mortem Button */}
          <button
            onClick={onOpenIngest}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-200 text-xs font-semibold flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm"
          >
            <PlusCircle className="w-4 h-4 text-emerald-400" />
            <span>Ingest Post-Mortem</span>
          </button>

          {/* 60s Demo Button */}
          <button
            onClick={onOpenDemo}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-indigo-600/30 ring-1 ring-white/20"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Interactive Memory Demo</span>
          </button>
        </div>
      </div>
    </header>
  );
};
