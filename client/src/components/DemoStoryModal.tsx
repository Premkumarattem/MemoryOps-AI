"use client";

import React, { useState } from "react";
import { Play, CheckCircle2, Sparkles, X, Brain, Database, ArrowRight, ShieldCheck, RefreshCw, Zap } from "lucide-react";

interface DemoStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSetDemoState: (mode: "EMPTY" | "FULL") => void;
}

export const DemoStoryModal: React.FC<DemoStoryModalProps> = ({
  isOpen,
  onClose,
  onSetDemoState,
}) => {
  const [activeScene, setActiveScene] = useState<number>(1);
  const [isIngesting, setIsIngesting] = useState(false);

  if (!isOpen) return null;

  const handleNextScene = () => {
    if (activeScene === 1) {
      // Transition from Scene 1 to Scene 2
      setIsIngesting(true);
      setTimeout(() => {
        setIsIngesting(false);
        onSetDemoState("FULL");
        setActiveScene(2);
      }, 1000);
    } else if (activeScene < 4) {
      setActiveScene(activeScene + 1);
    }
  };

  const handleResetDemo = () => {
    setActiveScene(1);
    onSetDemoState("EMPTY");
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-3xl w-full p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
              <Play className="w-5 h-5 fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">Interactive Memory Engine Demo</h2>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono">
                  Operational Walkthrough
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Experience MemoryOps AI transforming operational memory in under 60 seconds.
              </p>
            </div>
          </div>

          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Indicator */}
        <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono">
          {[
            { step: 1, title: "Scene 1: Empty Memory" },
            { step: 2, title: "Scene 3: Memory Ingest" },
            { step: 3, title: "Scene 3: Hindsight Recall" },
            { step: 4, title: "Scene 4: Operational Impact" },
          ].map((s) => (
            <div
              key={s.step}
              className={`p-2 rounded-lg border transition-all ${
                activeScene === s.step
                  ? "bg-indigo-600/20 border-indigo-500 text-indigo-300 font-bold"
                  : activeScene > s.step
                  ? "bg-slate-800/80 border-slate-700 text-emerald-400"
                  : "bg-slate-950 border-slate-800 text-slate-500"
              }`}
            >
              {s.title}
            </div>
          ))}
        </div>

        {/* Scene Content Containers */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 min-h-[300px] flex flex-col justify-between space-y-4">
          {/* SCENE 1: Empty Memory */}
          {activeScene === 1 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>SCENE 1: LIVE INCIDENT REPORTED (BEFORE HINDSIGHT MEMORY)</span>
                <span className="text-rose-400">Memory Vault: 0 Nodes</span>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs font-mono">
                <span className="text-slate-400 font-bold">Engineer Query:</span>
                <p className="text-amber-300 mt-1">"Database latency spike on checkout API..."</p>
              </div>

              <div className="bg-slate-900/60 border border-amber-500/30 rounded-xl p-4 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-400">MemoryOps AI Response:</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">
                    12% Confidence (Generic Advice)
                  </span>
                </div>
                <p className="text-slate-300 text-xs italic">
                  "No historical incidents found in Memory Vault. Generic recommendation: Check server CPU/memory, inspect cloud provider status page, restart services."
                </p>
              </div>
            </div>
          )}

          {/* SCENE 2: Memory Ingestion */}
          {activeScene === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>SCENE 2: INGESTING HISTORICAL OPERATIONAL MEMORY</span>
                <span className="text-emerald-400 font-bold">Memory Vault: Ingesting 20 Post-Mortems</span>
              </div>

              {isIngesting ? (
                <div className="py-12 flex flex-col items-center justify-center space-y-3">
                  <RefreshCw className="w-8 h-8 text-indigo-400 animate-spin" />
                  <p className="text-xs text-slate-300 font-mono">
                    Vectorizing 20 post-mortems, root causes & resolutions into Hindsight Memory Store...
                  </p>
                </div>
              ) : (
                <div className="space-y-3 text-xs">
                  <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-4 flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                    <div>
                      <p className="font-bold text-white">20 Operational Post-Mortems Ingested</p>
                      <p className="text-slate-400">
                        PgBouncer connection pool limits, Redis cache storms, Kafka OOM memory leaks vectorized!
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-indigo-400 font-bold font-mono">Memory Node Graph Loaded:</span>
                    <div className="flex flex-wrap gap-2 text-[11px] font-mono text-slate-300">
                      <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800">#INC-017 PgBouncer Pool</span>
                      <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800">#INC-027 Redis Cache Storm</span>
                      <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800">#INC-045 Kafka Buffer Leak</span>
                      <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800">#PAT-001 Connection Pool Weakness</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SCENE 3: Hindsight Recall */}
          {activeScene === 3 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>SCENE 3: RE-QUERY NEW LIVE INCIDENT (AFTER HINDSIGHT MEMORY)</span>
                <span className="text-emerald-400 font-bold">Memory Vault: Active</span>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs font-mono">
                <span className="text-slate-400 font-bold">Engineer Query:</span>
                <p className="text-indigo-300 font-semibold mt-1">"API timeout and latency increased by 400% after database migration"</p>
              </div>

              <div className="bg-gradient-to-r from-slate-900 to-indigo-950/60 border border-indigo-500/40 rounded-xl p-4 text-xs space-y-3 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-emerald-400">
                    <Sparkles className="w-4 h-4" /> Recalled Incident #17 Matches (94.2% Confidence)
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold">
                    INSTANT RECALL
                  </span>
                </div>

                <div className="space-y-1 font-mono text-slate-200">
                  <p><strong className="text-rose-400">Likely Root Cause:</strong> Connection Pool Exhaustion (PgBouncer max connections capped at 100 while web pods scaled to 50).</p>
                  <p><strong className="text-emerald-400">Proven Resolution:</strong> Increase PgBouncer pool limit to 500, set statement_timeout=5000ms, and restart core-api.</p>
                  <p><strong className="text-cyan-400">Previous Recovery Time:</strong> 42 minutes</p>
                </div>
              </div>
            </div>
          )}

          {/* SCENE 4: Value Proof */}
          {activeScene === 4 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>SCENE 4: OPERATIONAL VALUE & PRODUCT PROOF</span>
                <span className="text-purple-400 font-bold">The Memory IS The Product</span>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                  <span className="text-slate-400 text-xs">Memory Learned</span>
                  <p className="text-2xl font-extrabold text-white font-mono mt-1">20 Incidents</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                  <span className="text-slate-400 text-xs">Pattern Accuracy</span>
                  <p className="text-2xl font-extrabold text-emerald-400 font-mono mt-1">15% → 94%</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                  <span className="text-slate-400 text-xs">MTTR Reduction</span>
                  <p className="text-2xl font-extrabold text-purple-300 font-mono mt-1">83% Faster</p>
                </div>
              </div>

              <div className="bg-indigo-950/40 border border-indigo-500/30 rounded-xl p-4 text-xs space-y-2 text-center">
                <p className="text-slate-200 font-bold">
                  "Without Hindsight: Search Slack → Search Confluence → Ask Senior SRE → 2 hours lost."
                </p>
                <p className="text-emerald-400 font-bold">
                  "With Hindsight: Type symptom → Instant match → Resolved in minutes."
                </p>
              </div>
            </div>
          )}

          {/* Bottom Action Footer */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={handleResetDemo}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-mono"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reset Walkthrough
            </button>

            {activeScene < 4 ? (
              <button
                onClick={handleNextScene}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30"
              >
                <span>{activeScene === 1 ? "Upload 20 Historical Incidents →" : "Continue Walkthrough →"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg"
              >
                <CheckCircle2 className="w-4 h-4" /> Complete Walkthrough & Return to App
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
