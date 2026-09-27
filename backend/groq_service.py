"""
Groq LLM Integration for MemoryOps AI.
Generates structured SRE analysis using Llama-3 / Qwen models combined with retrieved Hindsight memory context.
"""

import os
from typing import Dict, Any, Optional

GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")

def generate_sre_response(query: str, hindsight_context: Dict[str, Any], model_name: str = "llama-3.3-70b-versatile") -> Dict[str, Any]:
    """
    Combines retrieved memory with LLM reasoning.
    """
    if not GROQ_API_KEY:
        # Fallback to local memory engine formatting
        return {
            "ai_response": hindsight_context.get("message", "Processed by MemoryOps AI"),
            "used_model": "Hindsight-Local-Engine (No GROQ_API_KEY provided)",
            "analysis": {
                "likely_root_cause": hindsight_context.get("likely_root_cause"),
                "suggested_fixes": hindsight_context.get("suggested_fixes"),
                "confidence_score": hindsight_context.get("confidence_score")
            }
        }

    try:
        from groq import Groq
        client = Groq(api_key=GROQ_API_KEY)

        prompt = f"""
You are MemoryOps AI - 'The AI SRE That Never Forgets'.
A site reliability engineer is reporting a live production issue:
USER QUERY: "{query}"

RECALL FROM HINDSIGHT MEMORY VAULT:
Matched Incidents Count: {len(hindsight_context.get('similar_incidents', []))}
Confidence Score: {hindsight_context.get('confidence_score')}%
Likely Root Cause: {hindsight_context.get('likely_root_cause')}
Past Resolutions: {hindsight_context.get('suggested_fixes')}

INSTRUCTIONS:
1. State clearly if this matches a known historical incident pattern or is a novel bug.
2. Detail the exact root cause identified from previous post-mortems.
3. Provide step-by-step resolution commands and preventive actions.
Keep response concise, operational, and directly actionable.
        """

        completion = client.chat.completions.create(
            model=model_name,
            messages=[
                {"role": "system", "content": "You are MemoryOps AI, an expert AI SRE with instant operational memory recall."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.2,
            max_tokens=600
        )

        llm_text = completion.choices[0].message.content

        return {
            "ai_response": llm_text,
            "used_model": model_name,
            "analysis": {
                "likely_root_cause": hindsight_context.get("likely_root_cause"),
                "suggested_fixes": hindsight_context.get("suggested_fixes"),
                "confidence_score": hindsight_context.get("confidence_score")
            }
        }
    except Exception as e:
        return {
            "ai_response": f"Hindsight Memory recalled matched pattern: {hindsight_context.get('likely_root_cause')}. Note: Groq API call fallback ({str(e)})",
            "used_model": "Fallback-Local-Engine",
            "analysis": {
                "likely_root_cause": hindsight_context.get("likely_root_cause"),
                "suggested_fixes": hindsight_context.get("suggested_fixes"),
                "confidence_score": hindsight_context.get("confidence_score")
            }
        }
