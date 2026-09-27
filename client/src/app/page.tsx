"use client";

import React, { useState } from "react";
import { Header } from "../components/Header";
import { NavigationTabs, ScreenTab } from "../components/NavigationTabs";
import { ScreenExecutiveOverview } from "../components/ScreenExecutiveOverview";
import { ScreenLiveIncidentAssistant } from "../components/ScreenLiveIncidentAssistant";
import { ScreenMemoryTimeline } from "../components/ScreenMemoryTimeline";
import { ScreenPatternIntelligence } from "../components/ScreenPatternIntelligence";
import { DemoStoryModal } from "../components/DemoStoryModal";
import { IngestPostMortemModal } from "../components/IngestPostMortemModal";
import { INITIAL_INCIDENTS, Incident } from "../lib/data";

export default function Home() {
  const [activeTab, setActiveTab] = useState<ScreenTab>("OVERVIEW");
  const [incidents, setIncidents] = useState<Incident[]>(INITIAL_INCIDENTS);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isIngestOpen, setIsIngestOpen] = useState(false);
  const [activeMemoryMode, setActiveMemoryMode] = useState<"EMPTY" | "FULL">("FULL");

  const handleAddIncident = (newInc: Incident) => {
    setIncidents((prev) => [newInc, ...prev]);
  };

  const handleSetDemoState = (mode: "EMPTY" | "FULL") => {
    setActiveMemoryMode(mode);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Header Bar */}
      <Header
        memoryCount={activeMemoryMode === "EMPTY" ? 0 : incidents.length}
        onOpenDemo={() => setIsDemoOpen(true)}
        onOpenIngest={() => setIsIngestOpen(true)}
        activeMode={activeMemoryMode}
      />

      {/* Navigation Screen Switcher */}
      <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main View Container */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === "OVERVIEW" && (
          <ScreenExecutiveOverview
            onNavigateToAssistant={() => setActiveTab("ASSISTANT")}
            incidentsCount={activeMemoryMode === "EMPTY" ? 0 : incidents.length}
          />
        )}

        {activeTab === "ASSISTANT" && (
          <ScreenLiveIncidentAssistant
            onIngestNew={() => setIsIngestOpen(true)}
            incidentsDataset={incidents}
            activeMemoryMode={activeMemoryMode}
          />
        )}

        {activeTab === "TIMELINE" && (
          <ScreenMemoryTimeline incidents={incidents} />
        )}

        {activeTab === "PATTERNS" && (
          <ScreenPatternIntelligence />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500 space-y-1">
        <p>MemoryOps AI — "The AI SRE That Never Forgets"</p>
        <p className="font-mono text-[11px] text-slate-600">
          Powered by Hindsight Persistent Memory • Next.js • FastAPI • Groq LLM • PostgreSQL
        </p>
      </footer>

      {/* 60-Second Hackathon Demo Modal */}
      <DemoStoryModal
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
        onSetDemoState={handleSetDemoState}
      />

      {/* Ingest Post-Mortem Modal */}
      <IngestPostMortemModal
        isOpen={isIngestOpen}
        onClose={() => setIsIngestOpen(false)}
        onAddIncident={handleAddIncident}
      />
    </div>
  );
}
