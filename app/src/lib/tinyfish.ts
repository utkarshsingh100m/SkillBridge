export interface TinyFishBriefing {
  projectId: string;
  projectTitle: string;
  repoUrl: string;
  demoUrl?: string;
  lastCrawledAt: string;
  crawlerFleet: string;
  latencyMs: number;
  sourceStatus: "TinyFish Live Web Verified" | "Chromium Fleet Crawled";
  summary: string;
  techStackVerified: { name: string; category: string; badge: string }[];
  sprintBlockers: {
    issue: string;
    severity: "High" | "Medium" | "Low";
    component: string;
  }[];
  recentCommits: {
    hash: string;
    message: string;
    author: string;
    timestamp: string;
  }[];
  recommendedMentorPrompts: string[];
}

export const defaultSkillBridgeBriefing: TinyFishBriefing = {
  projectId: "p1",
  projectTitle: "SkillBridge — Build with Bharat 4.0",
  repoUrl: "https://github.com/utkarshsingh100m/SkillBridge",
  demoUrl: "https://skillbridge-bharat.vercel.app",
  lastCrawledAt: "Just now",
  crawlerFleet: "TinyFish US-East Chromium Node #04",
  latencyMs: 138,
  sourceStatus: "TinyFish Live Web Verified",
  summary:
    "SkillBridge is an AI-orchestrated hackathon teaming and real-time mentorship platform. The repository contains a Next.js 16 App Router application with Turbopack, Tailwind CSS v4 design tokens, and modular mentorship session rooms.",
  techStackVerified: [
    { name: "Next.js 16 (App Router)", category: "Frontend", badge: "Live" },
    { name: "Turbopack Bundler", category: "Build", badge: "Verified" },
    { name: "Tailwind CSS v4", category: "Styling", badge: "Verified" },
    { name: "FastAPI / Python", category: "Backend RAG", badge: "Detected" },
    { name: "ChromaDB Vector Store", category: "AI / Search", badge: "Detected" },
    { name: "TypeScript 5 (Strict)", category: "Language", badge: "Verified" },
  ],
  sprintBlockers: [
    {
      issue: "RAG retrieval latency spikes to >850ms on cold-start student queries",
      severity: "High",
      component: "Vector Store / Embeddings",
    },
    {
      issue: "Sparse BM25 fallback missing when student query has zero semantic match",
      severity: "Medium",
      component: "Search Pipeline",
    },
    {
      issue: "Demo pitch deck slides 4-6 need refinement on Indian EdTech TAM & mentor incentives",
      severity: "Medium",
      component: "Pitch & Presentation",
    },
  ],
  recentCommits: [
    {
      hash: "8f2a10",
      message: "feat: integrate TinyFish web perception for mentor intelligence briefings",
      author: "Utkarsh",
      timestamp: "12m ago",
    },
    {
      hash: "3c914d",
      message: "perf: optimize Turbopack static route prerendering across 17 routes",
      author: "Utkarsh",
      timestamp: "1h ago",
    },
    {
      hash: "a4e81b",
      message: "fix: collaborative notes scratchpad auto-syncing during live calls",
      author: "Praveen",
      timestamp: "3h ago",
    },
  ],
  recommendedMentorPrompts: [
    "Recommend HyDE (Hypothetical Document Embeddings) to reduce cold-start latency",
    "Advise implementing hybrid Reciprocal Rank Fusion (RRF) for BM25 + Vector Search",
    "Review 3-minute hackathon pitch flow: hook with student problem before showing tech architecture",
  ],
};
