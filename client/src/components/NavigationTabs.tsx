"use client";

import React from "react";
import { LayoutDashboard, MessageSquareText, History, Cpu } from "lucide-react";

export type ScreenTab = "OVERVIEW" | "ASSISTANT" | "TIMELINE" | "PATTERNS";

interface NavigationTabsProps {
  activeTab: ScreenTab;
  setActiveTab: (tab: ScreenTab) => void;
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const tabs = [
    {
      id: "OVERVIEW" as ScreenTab,
      label: "Screen 1: Executive Overview",
      shortLabel: "Executive Overview",
      icon: LayoutDashboard,
      badge: "KPIs & MTTR",
    },
    {
      id: "ASSISTANT" as ScreenTab,
      label: "Screen 2: Live Incident Assistant",
      shortLabel: "Incident Assistant",
      icon: MessageSquareText,
      badge: "Hindsight Recall",
    },
    {
      id: "TIMELINE" as ScreenTab,
      label: "Screen 3: Memory Timeline",
      shortLabel: "Memory Timeline",
      icon: History,
      badge: "Chronological",
    },
    {
      id: "PATTERNS" as ScreenTab,
      label: "Screen 4: Pattern Intelligence",
      shortLabel: "Pattern Intelligence",
      icon: Cpu,
      badge: "Auto Discovery",
    },
  ];

  return (
    <div className="bg-slate-900/90 border-b border-slate-800 px-6 py-2 sticky top-[73px] z-30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap border ${
                isActive
                  ? "bg-indigo-600/15 border-indigo-500/40 text-indigo-300 shadow-sm"
                  : "bg-slate-800/40 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              }`}
            >
              <Icon
                className={`w-4 h-4 ${
                  isActive ? "text-indigo-400" : "text-slate-500"
                }`}
              />
              <span>{tab.shortLabel}</span>
              <span
                className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                  isActive
                    ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                    : "bg-slate-800 text-slate-500 border border-slate-700/50"
                }`}
              >
                {tab.badge}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
