"use client";

import React from "react";
import { BrainCircuit, Play, PlusCircle, Database, ShieldAlert, Sparkles } from "lucide-react";

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
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40 px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand & Tagline */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <BrainCircuit className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent tracking-tight">
                MemoryOps AI
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Hindsight Inside
              </span>
            </div>
            <p className="text-xs text-slate-400">
              "The AI SRE That Never Forgets" — Persistent Organizational Memory
            </p>
          </div>
        </div>

        {/* Memory Vault Status & Quick Action Buttons */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Status Badge */}
          <div className="bg-slate-800/80 border border-slate-700/60 rounded-lg px-3 py-1.5 flex items-center gap-2 text-xs">
            <Database className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-300">Memory Vault:</span>
            <span className="font-semibold text-emerald-400 font-mono">
              {activeMode === "EMPTY" ? "0 Nodes (Empty)" : `${memoryCount} Incidents`}
            </span>
          </div>

          {/* Ingest Post-Mortem Button */}
          <button
            onClick={onOpenIngest}
            className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-all shadow-sm"
          >
            <PlusCircle className="w-4 h-4 text-emerald-400" />
            Ingest Post-Mortem
          </button>

          {/* 60s Demo Button */}
          <button
            onClick={onOpenDemo}
            className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-md shadow-indigo-600/30 ring-1 ring-white/20 animate-pulse"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            60s Pitch Demo Mode
          </button>
        </div>
      </div>
    </header>
  );
};
