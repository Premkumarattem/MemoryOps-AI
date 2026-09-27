import { NextResponse } from "next/server";
import { INITIAL_INCIDENTS } from "@/lib/data";

export async function POST(request: Request) {
  try {
    const { query, top_k = 3 } = await request.json();

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    const queryLower = query.toLowerCase();
    
    // Hindsight vector scoring simulation
    const scoredIncidents = INITIAL_INCIDENTS.map((inc) => {
      let score = 0.2;
      const corpus = `${inc.title} ${inc.symptoms} ${inc.root_cause} ${inc.tags.join(" ")}`.toLowerCase();

      const words = queryLower.split(/\s+/);
      let matches = 0;
      words.forEach((w: string) => {
        if (w.length > 2 && corpus.includes(w)) {
          matches++;
        }
      });

      score += (matches / Math.max(words.length, 1)) * 0.5;

      if (queryLower.includes("latency") || queryLower.includes("400%") || queryLower.includes("database")) {
        if (inc.id === "INC-017") score += 0.4;
      }
      if (queryLower.includes("redis") || queryLower.includes("cache")) {
        if (inc.id === "INC-027") score += 0.4;
      }
      if (queryLower.includes("kafka") || queryLower.includes("oom")) {
        if (inc.id === "INC-045") score += 0.4;
      }

      return { inc, score: Math.min(score, 0.96) };
    });

    scoredIncidents.sort((a, b) => b.score - a.score);

    const bestMatch = scoredIncidents[0].inc;
    const confidenceScore = Math.round(scoredIncidents[0].score * 1000) / 10;

    // Optional Groq API call if GROQ_API_KEY is present
    const groqKey = process.env.GROQ_API_KEY;
    let aiSynthesis = `Hindsight Memory recalled matched pattern from ${bestMatch.id}: ${bestMatch.title}.`;

    if (groqKey) {
      try {
        const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${groqKey}`,
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [
              {
                role: "system",
                content: "You are MemoryOps AI - 'The AI SRE That Never Forgets'.",
              },
              {
                role: "user",
                content: `Query: ${query}\nRecalled Incident: ${bestMatch.title}\nRoot Cause: ${bestMatch.root_cause}\nResolution: ${bestMatch.resolution}`,
              },
            ],
            max_tokens: 300,
          }),
        });

        const groqData = await res.json();
        if (groqData.choices?.[0]?.message?.content) {
          aiSynthesis = groqData.choices[0].message.content;
        }
      } catch (e) {
        // Fallback to local synthesis
      }
    }

    return NextResponse.json({
      query,
      hindsight_match: {
        matched: true,
        confidence_score: confidenceScore,
        mode: "HINDSIGHT_RECALL",
        likely_root_cause: bestMatch.root_cause,
        suggested_fixes: [bestMatch.resolution, ...bestMatch.preventive_checks],
        matched_incidents: [bestMatch],
        avg_recovery_time_mins: bestMatch.recovery_time_minutes,
        preventive_checklist: bestMatch.preventive_checks,
      },
      ai_sre_synthesis: aiSynthesis,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
