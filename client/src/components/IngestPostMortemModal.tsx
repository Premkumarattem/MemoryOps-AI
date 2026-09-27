"use client";

import React, { useState } from "react";
import { X, PlusCircle, Database, CheckCircle2 } from "lucide-react";
import { Incident } from "../lib/data";

interface IngestPostMortemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddIncident: (newInc: Incident) => void;
}

export const IngestPostMortemModal: React.FC<IngestPostMortemModalProps> = ({
  isOpen,
  onClose,
  onAddIncident,
}) => {
  const [title, setTitle] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [rootCause, setRootCause] = useState("");
  const [resolution, setResolution] = useState("");
  const [severity, setSeverity] = useState<"CRITICAL" | "HIGH" | "MEDIUM" | "LOW">("HIGH");
  const [recoveryTime, setRecoveryTime] = useState(30);
  const [team, setTeam] = useState("Core Platform");
  const [tags, setTags] = useState("database, latency");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !symptoms.trim() || !rootCause.trim()) return;

    const newInc: Incident = {
      id: `INC-${Math.floor(100 + Math.random() * 900)}`,
      title,
      date: new Date().toISOString().split("T")[0],
      severity,
      team,
      services_affected: ["custom-service"],
      symptoms,
      root_cause: rootCause,
      resolution,
      recovery_time_minutes: Number(recoveryTime),
      tags: tags.split(",").map((t) => t.trim()),
      preventive_checks: ["Enforce telemetry alerts", "Verify load capacity"],
    };

    onAddIncident(newInc);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 space-y-5 shadow-2xl relative">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Database className="w-4 h-4 text-emerald-400" /> Ingest Post-Mortem into Vault
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="text-slate-300 font-semibold block mb-1">Incident Title:</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. PostgreSQL Connection Pool Exhaustion under Peak Traffic"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Severity:</label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
              >
                <option value="CRITICAL">CRITICAL</option>
                <option value="HIGH">HIGH</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="LOW">LOW</option>
              </select>
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Recovery Time (Mins):</label>
              <input
                type="number"
                required
                value={recoveryTime}
                onChange={(e) => setRecoveryTime(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">Symptoms Reported:</label>
            <textarea
              required
              rows={2}
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="e.g. API response latency increased by 400%, HTTP 504 Gateway Timeouts..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">Identified Root Cause:</label>
            <textarea
              required
              rows={2}
              value={rootCause}
              onChange={(e) => setRootCause(e.target.value)}
              placeholder="e.g. Max connections in PgBouncer pooler were capped at 100..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">Resolution Steps Taken:</label>
            <textarea
              required
              rows={2}
              value={resolution}
              onChange={(e) => setResolution(e.target.value)}
              placeholder="e.g. Increased PgBouncer pool limit to 500 and restarted service..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Team Involved:</label>
              <input
                type="text"
                value={team}
                onChange={(e) => setTeam(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Tags (Comma-separated):</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-md"
            >
              <CheckCircle2 className="w-4 h-4" /> Save to Organizational Memory
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
