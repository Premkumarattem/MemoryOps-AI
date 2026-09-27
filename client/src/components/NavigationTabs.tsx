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
      label: "Executive Overview",
      icon: LayoutDashboard,
      badge: "KPIs & MTTR",
    },
    {
      id: "ASSISTANT" as ScreenTab,
      label: "Live Incident Assistant",
      icon: MessageSquareText,
      badge: "Hindsight Recall",
    },
    {
      id: "TIMELINE" as ScreenTab,
      label: "Memory Timeline",
      icon: History,
      badge: "Chronological",
    },
    {
      id: "PATTERNS" as ScreenTab,
      label: "Pattern Intelligence",
      icon: Cpu,
      badge: "Auto Discovery",
    },
  ];

  return (
    <div className="bg-slate-950/90 border-b border-slate-800/80 px-4 sm:px-8 py-2.5 sticky top-[69px] z-40 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar">
        <div className="bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 flex items-center gap-1.5 w-full sm:w-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/25 scale-[1.02]"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? "text-white" : "text-slate-400"
                  }`}
                />
                <span>{tab.label}</span>
                <span
                  className={`text-[9px] px-2 py-0.5 rounded-md font-mono ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-slate-800 text-slate-400 border border-slate-700/50"
                  }`}
                >
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
