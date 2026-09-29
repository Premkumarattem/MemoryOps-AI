# 🧠 MemoryOps AI - "The AI SRE That Never Forgets"

> **Tagline:** Every outage teaches a lesson. MemoryOps ensures your organization never learns the same lesson twice.

---

## 📌 Problem Statement
Modern engineering teams generate hundreds of incident reports and post-mortems every year. While incidents are documented, operational knowledge is rarely reused:
- Engineers leave and knowledge fragments across Slack, Jira, and Confluence.
- Similar outages occur repeatedly under peak traffic.
- Root causes are rediscovered from scratch, costing thousands of engineering hours.

---

## 💡 Our Solution
**MemoryOps AI** transforms every incident, post-mortem, root cause analysis, and resolution into persistent organizational memory powered by **Hindsight**.

Instead of manually searching scattered docs during an active incident, engineers consult an AI SRE that remembers the organization's entire operational history.

---

## 🚀 Key Features

1. **Incident Memory Vault**
   - Stores incident titles, symptoms, root causes, severity, resolution steps, recovery times, and affected services.

2. **Similar Incident Detection (Hindsight Recall)**
   - Query symptoms (e.g., *"API latency increased by 400% after DB migration"*).
   - Recalls matching past incidents (#17), confidence score (94%), root cause analysis, and resolution playbook.

3. **Pattern Intelligence**
   - Automated discovery of top recurring operational weaknesses (e.g., Connection Pool Exhaustion, Cache Invalidation Storms, Unbounded Memory Buffers).

4. **Learning Timeline & MTTR Drop**
   - Visualizes how recommendation confidence improves from 15% (generic advice) to 94% (exact root cause prediction). Reduces MTTR by **83%**.

5. **Pre-Deployment Outage Prevention**
   - Scans planned deployment PR notes against historical post-mortems to warn engineers before deploying code that caused past outages.

6. **60-Second Winning Pitch Demo Mode**
   - Interactive guided hackathon presentation mode demonstrating empty memory vs instant recall.

---

## 🛠️ Tech Stack
- **Frontend:** Next.js 16 (App Router), Tailwind CSS, Recharts, Lucide Icons, Framer Motion
- **Backend:** FastAPI, Python 3.13
- **AI & Memory Layer:** Groq (Llama 3 / Qwen), Hindsight Memory Store
- **Database:** PostgreSQL / Vector Embeddings

---

## ⚡ Quick Start

### Frontend (Next.js)
```bash
cd client
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### Backend (FastAPI)
```bash
cd backend
pip install -r requirements.txt
python main.py
```
Open API docs at [http://localhost:8000/docs](http://localhost:8000/docs)
