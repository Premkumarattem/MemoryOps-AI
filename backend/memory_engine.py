"""
Memory Engine implementing the Hindsight operational memory model for MemoryOps AI.
Provides similarity search, pattern discovery, memory growth tracking, and preventive checks.
"""

from typing import List, Dict, Any
import re
from sample_incidents import HISTORICAL_INCIDENTS, RECURRING_PATTERNS

class HindsightMemoryEngine:
    def __init__(self):
        self.incidents: List[Dict[str, Any]] = list(HISTORICAL_INCIDENTS)
        self.patterns: List[Dict[str, Any]] = list(RECURRING_PATTERNS)
        self.total_memory_ingested: int = len(self.incidents)
        self.active_mode: str = "FULL"  # "EMPTY", "PARTIAL", "FULL"

    def set_memory_mode(self, mode: str):
        """Used for live demo mode (EMPTY, PARTIAL, FULL)."""
        self.active_mode = mode
        if mode == "EMPTY":
            self.total_memory_ingested = 0
        elif mode == "PARTIAL":
            self.total_memory_ingested = 3
        else:
            self.total_memory_ingested = len(self.incidents)

    def search_similar_incidents(self, query: str, top_k: int = 3) -> Dict[str, Any]:
        """
        Retrieves similar past incidents based on operational symptoms and log signals.
        """
        if self.total_memory_ingested == 0 or self.active_mode == "EMPTY":
            return {
                "matched": False,
                "confidence_score": 0.12,
                "mode": "GENERIC_FALLBACK",
                "message": "No historical incidents found in Memory Vault. Providing generic troubleshooting advice.",
                "similar_incidents": [],
                "likely_root_cause": "Unknown. Generic advice: Check system metrics, CPU/memory usage, and restart application services.",
                "suggested_fixes": [
                    "Check server CPU and memory usage",
                    "Inspect recent application logs for errors",
                    "Consider restarting web service pods",
                    "Verify cloud network connection"
                ],
                "avg_recovery_time_mins": None,
                "preventive_checklist": [
                    "Establish post-mortem ingestion process into MemoryOps"
                ]
            }

        # Tokenize query
        query_words = set(re.findall(r'\w+', query.lower()))
        available_dataset = self.incidents[:self.total_memory_ingested]

        scored_incidents = []
        for inc in available_dataset:
            # Construct document corpus
            corpus = f"{inc['title']} {inc['symptoms']} {inc['root_cause']} {' '.join(inc['tags'])} {inc['team']}".lower()
            corpus_words = set(re.findall(r'\w+', corpus))

            overlap = query_words.intersection(corpus_words)
            if not query_words:
                score = 0.0
            else:
                score = len(overlap) / len(query_words)

            # Extra weight for specific key terms
            for tag in inc.get("tags", []):
                if tag.lower() in query.lower():
                    score += 0.25

            if "latency" in query.lower() and "latency" in corpus:
                score += 0.2
            if "database" in query.lower() and "postgresql" in corpus:
                score += 0.2
            if "timeout" in query.lower() and "timeout" in corpus:
                score += 0.2

            score = min(score, 0.98)
            scored_incidents.append((score, inc))

        scored_incidents.sort(key=lambda x: x[0], reverse=True)
        top_matches = [inc for score, inc in scored_incidents if score > 0.15][:top_k]

        if not top_matches:
            top_matches = [scored_incidents[0][1]] if scored_incidents else []
            confidence = round(scored_incidents[0][0] * 100, 1) if scored_incidents else 25.0
        else:
            confidence = round(scored_incidents[0][0] * 100, 1)

        # Cap confidence realistically
        confidence = min(max(confidence, 45.0), 96.5)

        primary_match = top_matches[0] if top_matches else None

        likely_root_cause = primary_match["root_cause"] if primary_match else "Potential resource saturation or deadlock."
        suggested_fixes = [primary_match["resolution"]] if primary_match else ["Investigate recent code changes."]
        
        # Add secondary resolution steps
        if primary_match:
            suggested_fixes.extend(primary_match.get("preventive_checks", [])[:2])

        avg_recovery = round(sum(m["recovery_time_minutes"] for m in top_matches) / len(top_matches)) if top_matches else 45

        return {
            "matched": True,
            "confidence_score": confidence,
            "mode": "HINDSIGHT_RECALL",
            "message": f"Found {len(top_matches)} similar historical incidents in Hindsight Memory.",
            "similar_incidents": top_matches,
            "likely_root_cause": likely_root_cause,
            "suggested_fixes": suggested_fixes,
            "avg_recovery_time_mins": avg_recovery,
            "preventive_checklist": primary_match.get("preventive_checks", []) if primary_match else []
        }

    def analyze_pre_deployment(self, deployment_summary: str) -> Dict[str, Any]:
        """
        Scans operational memory before a deployment to alert engineers about historical outage risks.
        """
        query_words = set(re.findall(r'\w+', deployment_summary.lower()))
        matched_risks = []

        for inc in self.incidents:
            tags = inc.get("tags", [])
            matches = [t for t in tags if t in deployment_summary.lower()]
            if matches or any(w in deployment_summary.lower() for w in ["connection", "pool", "migration", "redis", "cache", "kafka"]):
                matched_risks.append(inc)

        risk_level = "HIGH" if len(matched_risks) >= 2 else ("MEDIUM" if matched_risks else "LOW")

        suggested_checks = []
        for r in matched_risks[:3]:
            suggested_checks.extend(r.get("preventive_checks", []))

        # Deduplicate checks
        suggested_checks = list(dict.fromkeys(suggested_checks))

        return {
            "risk_level": risk_level,
            "matching_past_outages_count": len(matched_risks),
            "historical_incidents_recalled": [r["id"] + ": " + r["title"] for r in matched_risks[:3]],
            "recommended_preflight_checks": suggested_checks or [
                "Verify database migration rollback plan",
                "Check connection pool limits under load",
                "Ensure cache invalidation is scoped"
            ]
        }

    def add_new_incident(self, incident_data: Dict[str, Any]) -> Dict[str, Any]:
        """Ingests a new post-mortem into Hindsight Memory Vault."""
        incident_id = f"INC-{len(self.incidents) + 1:03d}"
        new_inc = {
            "id": incident_id,
            "title": incident_data.get("title", "Untitled Incident"),
            "date": incident_data.get("date", "2026-09-27"),
            "severity": incident_data.get("severity", "HIGH"),
            "team": incident_data.get("team", "SRE Team"),
            "services_affected": incident_data.get("services_affected", ["unknown-service"]),
            "symptoms": incident_data.get("symptoms", ""),
            "root_cause": incident_data.get("root_cause", ""),
            "resolution": incident_data.get("resolution", ""),
            "recovery_time_minutes": int(incident_data.get("recovery_time_minutes", 30)),
            "tags": incident_data.get("tags", ["operational"]),
            "preventive_checks": incident_data.get("preventive_checks", ["Review telemetry thresholds"])
        }
        self.incidents.insert(0, new_inc)
        self.total_memory_ingested += 1
        return {"status": "SUCCESS", "incident_id": incident_id, "total_memory_count": len(self.incidents)}
