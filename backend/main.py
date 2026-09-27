"""
FastAPI Backend for MemoryOps AI - 'The AI SRE That Never Forgets'
Exposes REST endpoints for Hindsight Memory Search, Pattern Intelligence, Incident Vault, and Pre-deployment Checks.
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any

from memory_engine import HindsightMemoryEngine
from groq_service import generate_sre_response

app = FastAPI(
    title="MemoryOps AI API",
    description="The AI SRE That Never Forgets - Persistent Organizational Memory",
    version="1.0.0"
)

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

engine = HindsightMemoryEngine()

class SearchQuery(BaseModel):
    query: str
    top_k: Optional[int] = 3

class IncidentPayload(BaseModel):
    title: str
    symptoms: str
    root_cause: str
    resolution: str
    severity: Optional[str] = "HIGH"
    team: Optional[str] = "SRE Team"
    services_affected: Optional[List[str]] = ["core-api"]
    recovery_time_minutes: Optional[int] = 30
    tags: Optional[List[str]] = ["operational"]
    preventive_checks: Optional[List[str]] = []

class PreDeployQuery(BaseModel):
    deployment_summary: str

class DemoModeQuery(BaseModel):
    mode: str  # "EMPTY", "PARTIAL", "FULL"

@app.get("/")
def read_root():
    return {
        "status": "ONLINE",
        "app": "MemoryOps AI",
        "tagline": "Every outage teaches a lesson. MemoryOps ensures your organization never learns the same lesson twice.",
        "ingested_incidents": engine.total_memory_ingested,
        "memory_mode": engine.active_mode
    }

@app.get("/api/incidents")
def get_incidents():
    """Retrieve all operational incidents stored in Hindsight Memory Vault."""
    if engine.active_mode == "EMPTY":
        return {"incidents": [], "count": 0}
    elif engine.active_mode == "PARTIAL":
        return {"incidents": engine.incidents[:3], "count": 3}
    return {"incidents": engine.incidents, "count": len(engine.incidents)}

@app.post("/api/incidents")
def create_incident(payload: IncidentPayload):
    """Ingest a new post-mortem into persistent organizational memory."""
    result = engine.add_new_incident(payload.dict())
    return result

@app.post("/api/search")
def search_memory(payload: SearchQuery):
    """
    Search Hindsight Memory Vault for similar past outages, root causes, and resolutions.
    """
    hindsight_result = engine.search_similar_incidents(payload.query, top_k=payload.top_k)
    groq_output = generate_sre_response(payload.query, hindsight_result)
    
    return {
        "query": payload.query,
        "hindsight_match": hindsight_result,
        "ai_sre_synthesis": groq_output["ai_response"],
        "model_used": groq_output["used_model"]
    }

@app.get("/api/patterns")
def get_patterns():
    """Retrieve pattern intelligence and recurring operational weaknesses."""
    return {
        "patterns": engine.patterns,
        "total_patterns_detected": len(engine.patterns),
        "total_downtime_prevented_est_hours": 11.2,
        "memory_growth_index": f"{engine.total_memory_ingested} incidents indexed"
    }

@app.post("/api/pre-deploy-check")
def pre_deploy_check(payload: PreDeployQuery):
    """Run pre-deployment risk analysis against historical outage memory."""
    result = engine.analyze_pre_deployment(payload.deployment_summary)
    return result

@app.post("/api/demo/mode")
def set_demo_mode(payload: DemoModeQuery):
    """Toggle demo memory mode (EMPTY, PARTIAL, FULL) for 60s hackathon presentation."""
    engine.set_memory_mode(payload.mode.upper())
    return {
        "status": "UPDATED",
        "active_mode": engine.active_mode,
        "ingested_incidents_count": engine.total_memory_ingested
    }

@app.post("/api/demo/reset")
def reset_demo():
    """Reset memory engine to full 20 historical post-mortems."""
    engine.set_memory_mode("FULL")
    return {"status": "RESET", "total_memory_count": len(engine.incidents)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
