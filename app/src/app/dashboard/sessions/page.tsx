"use client";

import { useState } from "react";
import {
  Calendar,
  Clock,
  Video,
  Sparkles,
  FileText,
  X,
  Mic,
  MicOff,
  VideoOff,
  PenTool,
  Save,
  Zap,
  RefreshCw,
  Globe,
  ExternalLink,
  GitCommit,
  AlertCircle,
  CheckCircle2,
  Copy,
  Check,
  Cpu,
  Layers,
} from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import { mentors, currentUser } from "@/lib/data";
import { defaultSkillBridgeBriefing, TinyFishBriefing } from "@/lib/integrations/tinyfish";

interface Session {
  id: string;
  mentor: (typeof mentors)[0];
  topic: string;
  date: string;
  time: string;
  duration: string;
  status: "Upcoming" | "Completed";
  notes?: string;
  meetLink: string;
  repoUrl?: string;
}

const initialSessions: Session[] = [
  {
    id: "s1",
    mentor: mentors[0], // Rahul Sharma
    topic: "RAG Pipeline Latency Optimization & Hackathon Pitch Review",
    date: "Today",
    time: "2:00 PM - 2:30 PM",
    duration: "30 mins",
    status: "Upcoming",
    meetLink: "https://meet.google.com/sb-hack-2026",
    repoUrl: "https://github.com/utkarshsingh100m/SkillBridge",
  },
  {
    id: "s2",
    mentor: mentors[1], // Dr. Elena Rostova
    topic: "Medical NLP Dataset Validation & Benchmark Metrics",
    date: "Tomorrow",
    time: "11:00 AM - 11:30 AM",
    duration: "30 mins",
    status: "Upcoming",
    meetLink: "https://meet.google.com/sb-elena-9921",
    repoUrl: "https://github.com/utkarshsingh100m/SkillBridge",
  },
  {
    id: "s3",
    mentor: mentors[2], // Aman Verma
    topic: "User Journey & Value Proposition for Bharat 4.0 Demo",
    date: "Yesterday",
    time: "4:00 PM - 4:30 PM",
    duration: "30 mins",
    status: "Completed",
    notes:
      "Aman suggested focusing the demo first on patient pain points before showing the vector embeddings. Recommended simplifying the UI onboarding step.",
    meetLink: "https://meet.google.com/sb-aman-5512",
  },
];

export default function SessionsPage() {
  const [sessions] = useState<Session[]>(initialSessions);
  const [activeCallSession, setActiveCallSession] = useState<Session | null>(null);
  const [viewingBriefingSession, setViewingBriefingSession] = useState<Session | null>(null);
  const [activeRoomTab, setActiveRoomTab] = useState<"briefing" | "scratchpad">("briefing");

  // TinyFish State
  const [briefing, setBriefing] = useState<TinyFishBriefing>(defaultSkillBridgeBriefing);
  const [repoInput, setRepoInput] = useState(defaultSkillBridgeBriefing.repoUrl);
  const [isCrawling, setIsCrawling] = useState(false);
  const [copiedPromptIndex, setCopiedPromptIndex] = useState<number | null>(null);
  const [promptInsertedToast, setPromptInsertedToast] = useState<string | null>(null);

  // Call simulation state
  const [micActive, setMicActive] = useState(true);
  const [cameraActive, setCameraActive] = useState(true);
  const [liveNotes, setLiveNotes] = useState(
    "- Key Action Item: Implement HyDE for RAG query expansion\n- Add fallback for sparse BM25 keyword search\n- Practice 3-minute hackathon pitch with live demo"
  );
  const [savedNotesToast, setSavedNotesToast] = useState(false);

  const handleSaveNotes = () => {
    setSavedNotesToast(true);
    setTimeout(() => setSavedNotesToast(false), 2000);
  };

  // Re-crawl via TinyFish Agent API
  const handleTriggerTinyFishCrawl = async (urlToCrawl?: string) => {
    const target = urlToCrawl || repoInput;
    setIsCrawling(true);
    try {
      const res = await fetch("/api/tinyfish/mentor-briefing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoUrl: target }),
      });
      const data = await res.json();
      if (data.success && data.briefing) {
        setBriefing(data.briefing);
      }
    } catch (err) {
      console.warn("Failed to trigger TinyFish crawl:", err);
    } finally {
      setTimeout(() => {
        setIsCrawling(false);
      }, 700);
    }
  };

  // Insert mentor recommendation into scratchpad
  const handleInsertPromptIntoNotes = (prompt: string, idx: number) => {
    setLiveNotes((prev) => `${prev.trim()}\n- [TinyFish Action Item] ${prompt}`);
    setCopiedPromptIndex(idx);
    setPromptInsertedToast(`Action item added to scratchpad!`);
    setTimeout(() => {
      setCopiedPromptIndex(null);
      setPromptInsertedToast(null);
    }, 2200);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold text-sb-dark">Mentorship Sessions</h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <Zap size={12} className="text-emerald-600 fill-emerald-600" />
              TinyFish Perception Active
            </span>
          </div>
          <p className="text-sm text-text-secondary">
            Track scheduled 1-on-1 calls, access live virtual rooms with autonomous TinyFish pre-session briefings, and review AI notes.
          </p>
        </div>
      </div>

      {/* Upcoming Sessions List */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-sb-dark flex items-center gap-2">
          <Calendar size={18} className="text-sb-green" /> Upcoming Sessions
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sessions
            .filter((s) => s.status === "Upcoming")
            .map((session) => (
              <div
                key={session.id}
                className="bg-white rounded-2xl border border-border p-6 space-y-5 shadow-sm hover:border-sb-light transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={session.mentor.avatar}
                        name={session.mentor.name}
                        size="lg"
                        verified={session.mentor.verified}
                      />
                      <div>
                        <h4 className="text-sm font-bold text-sb-dark">{session.mentor.name}</h4>
                        <p className="text-xs text-text-muted">{session.mentor.headline}</p>
                      </div>
                    </div>
                    <Badge variant="green" size="sm">Confirmed</Badge>
                  </div>

                  <div>
                    <h5 className="text-sm font-bold text-sb-dark">{session.topic}</h5>
                    <div className="flex items-center gap-3 text-xs text-text-secondary mt-2">
                      <span className="flex items-center gap-1 font-semibold text-sb-green">
                        <Clock size={13} /> {session.date}, {session.time}
                      </span>
                      <span>•</span>
                      <span>{session.duration}</span>
                    </div>
                  </div>

                  {/* TinyFish Pre-Call Dossier Badge */}
                  <div className="p-3 bg-surface-secondary rounded-xl border border-border/80 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-text-secondary">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="font-medium text-sb-dark">TinyFish Dossier:</span>
                      <span className="text-[11px] text-text-muted">Repo parsed (138ms)</span>
                    </div>
                    <button
                      onClick={() => setViewingBriefingSession(session)}
                      className="text-xs font-semibold text-sb-green hover:text-sb-dark flex items-center gap-1 transition-colors"
                    >
                      <Zap size={12} /> View Briefing
                    </button>
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex flex-wrap items-center justify-between gap-2">
                  <button
                    onClick={() => setViewingBriefingSession(session)}
                    className="px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-xl border border-emerald-200 transition-all flex items-center gap-1.5"
                  >
                    <Zap size={13} className="text-emerald-600 fill-emerald-600" /> Pre-Session Briefing
                  </button>
                  <button
                    onClick={() => setActiveCallSession(session)}
                    className="px-4 py-2 bg-sb-dark hover:bg-sb-green text-white text-xs font-semibold rounded-xl shadow-sm transition-all flex items-center gap-2"
                  >
                    <Video size={14} /> Join Virtual Room
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Past Sessions & AI Notes */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-sb-dark flex items-center gap-2">
          <FileText size={18} className="text-sb-green" /> Completed Sessions &amp; Action Notes
        </h3>

        <div className="space-y-4">
          {sessions
            .filter((s) => s.status === "Completed")
            .map((session) => (
              <div
                key={session.id}
                className="bg-white rounded-2xl border border-border p-6 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar src={session.mentor.avatar} name={session.mentor.name} size="md" />
                    <div>
                      <h4 className="text-sm font-bold text-sb-dark">{session.mentor.name}</h4>
                      <p className="text-xs text-text-muted">{session.topic}</p>
                    </div>
                  </div>
                  <Badge variant="neutral" size="sm">Completed</Badge>
                </div>

                {session.notes && (
                  <div className="bg-surface rounded-xl p-4 border border-border space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-sb-dark">
                      <Sparkles size={14} className="text-sb-gold" /> AI Meeting Summary &amp; Feedback:
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed">{session.notes}</p>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>

      {/* Standalone Pre-Session Briefing Modal */}
      {viewingBriefingSession && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-3xl w-full border border-border shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-scale-up">
            {/* Header */}
            <div className="p-5 border-b border-border bg-surface-secondary flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shadow-sm">
                  <Zap size={20} className="fill-emerald-600 text-emerald-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-sb-dark">TinyFish Mentor Intelligence Briefing</h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                      Live Chromium Fleet
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary">
                    Prepared for {viewingBriefingSession.mentor.name} • {viewingBriefingSession.topic}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setViewingBriefingSession(null)}
                className="text-text-muted hover:text-text-primary p-2 rounded-xl hover:bg-border/40 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Target Repo Banner */}
              <div className="p-4 rounded-2xl bg-surface-secondary border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 truncate">
                  <Globe size={16} className="text-sb-green shrink-0" />
                  <span className="font-semibold text-sb-dark">Target Repository:</span>
                  <a
                    href={briefing.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sb-green hover:underline truncate font-mono text-[11px]"
                  >
                    {briefing.repoUrl}
                  </a>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[11px] text-text-muted flex items-center gap-1">
                    <Cpu size={12} /> {briefing.latencyMs}ms latency
                  </span>
                  <button
                    onClick={() => handleTriggerTinyFishCrawl()}
                    disabled={isCrawling}
                    className="px-2.5 py-1 bg-white border border-border hover:border-sb-green rounded-lg font-medium text-sb-dark text-xs flex items-center gap-1 transition-all"
                  >
                    <RefreshCw size={11} className={isCrawling ? "animate-spin text-sb-green" : ""} />
                    {isCrawling ? "Crawling..." : "Re-crawl"}
                  </button>
                </div>
              </div>

              {/* Architecture & Verified Stack */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted flex items-center gap-1.5">
                  <Layers size={14} className="text-sb-green" /> Verified Architecture &amp; Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {briefing.techStackVerified.map((tech) => (
                    <span
                      key={tech.name}
                      className="px-3 py-1.5 rounded-xl bg-surface-secondary border border-border text-xs font-medium text-sb-dark flex items-center gap-1.5"
                    >
                      <CheckCircle2 size={13} className="text-emerald-600" />
                      {tech.name}
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-white text-text-secondary border border-border font-mono">
                        {tech.category}
                      </span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Sprint Blockers */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted flex items-center gap-1.5">
                  <AlertCircle size={14} className="text-amber-500" /> Current Sprint Blockers (What the team is stuck on)
                </h4>
                <div className="space-y-2">
                  {briefing.sprintBlockers.map((blocker, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-amber-50/50 border border-amber-200/80 text-xs flex items-start justify-between gap-3"
                    >
                      <div>
                        <div className="font-semibold text-amber-950">{blocker.issue}</div>
                        <span className="text-[11px] text-amber-800/80 font-mono">
                          Component: {blocker.component}
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-200/60 text-amber-900 uppercase">
                        {blocker.severity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Mentor Prompts */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted flex items-center gap-1.5">
                  <Sparkles size={14} className="text-sb-gold" /> AI Recommended Discussion Prompts
                </h4>
                <div className="space-y-2">
                  {briefing.recommendedMentorPrompts.map((prompt, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-surface-secondary border border-border text-xs flex items-center justify-between gap-3 hover:border-sb-light transition-all"
                    >
                      <span className="text-sb-dark font-medium leading-relaxed">
                        &quot;{prompt}&quot;
                      </span>
                      <button
                        onClick={() => handleInsertPromptIntoNotes(prompt, idx)}
                        className="px-2.5 py-1 bg-white hover:bg-sb-green hover:text-white border border-border rounded-lg text-[11px] font-semibold text-sb-dark transition-all shrink-0 flex items-center gap-1"
                      >
                        {copiedPromptIndex === idx ? (
                          <>
                            <Check size={11} className="text-emerald-500" /> Added
                          </>
                        ) : (
                          <>
                            <Copy size={11} /> Copy to Notes
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Commits */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted flex items-center gap-1.5">
                  <GitCommit size={14} className="text-sb-green" /> Latest Repository Commits (Crawled by TinyFish)
                </h4>
                <div className="space-y-1.5 bg-surface-secondary rounded-xl p-3 border border-border">
                  {briefing.recentCommits.map((commit) => (
                    <div key={commit.hash} className="flex items-center justify-between text-xs py-1 border-b border-border/50 last:border-none">
                      <div className="flex items-center gap-2 truncate">
                        <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-white border border-border text-text-secondary">
                          {commit.hash}
                        </span>
                        <span className="text-sb-dark truncate font-medium">{commit.message}</span>
                      </div>
                      <span className="text-[11px] text-text-muted shrink-0 ml-2">{commit.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border bg-surface-secondary flex items-center justify-between">
              <span className="text-xs text-text-secondary flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500" /> Node: {briefing.crawlerFleet}
              </span>
              <button
                onClick={() => {
                  setActiveCallSession(viewingBriefingSession);
                  setViewingBriefingSession(null);
                }}
                className="px-4 py-2 bg-sb-dark hover:bg-sb-green text-white text-xs font-semibold rounded-xl shadow-sm transition-all flex items-center gap-2"
              >
                <Video size={14} /> Proceed to Live Room
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Virtual Room Modal with TinyFish Copilot */}
      {activeCallSession && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-sb-dark border border-white/10 rounded-3xl max-w-5xl w-full h-[88vh] flex flex-col overflow-hidden shadow-2xl animate-scale-up text-white">
            {/* Room Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/40">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    Live Session: {activeCallSession.topic}
                    <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      <Zap size={10} className="fill-emerald-400 text-emerald-400" />
                      TinyFish Live
                    </span>
                  </h3>
                  <p className="text-[11px] text-white/60">
                    With {activeCallSession.mentor.name} • Hackathon Sprint Mentorship
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveCallSession(null)}
                className="text-white/60 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Room Grid */}
            <div className="flex-1 p-4 grid grid-cols-1 lg:grid-cols-12 gap-4 overflow-hidden">
              {/* Left Column: Video Grid (5 cols on lg) */}
              <div className="lg:col-span-5 grid grid-rows-2 gap-3 h-full">
                {/* Mentor Video Feed */}
                <div className="relative bg-black/60 rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={activeCallSession.mentor.avatar}
                    alt={activeCallSession.mentor.name}
                    className="w-full h-full object-cover opacity-85"
                  />
                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-semibold text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-sb-green" />
                    {activeCallSession.mentor.name} (Mentor)
                  </div>
                </div>

                {/* Praveen Video Feed */}
                <div className="relative bg-black/60 rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center">
                  {cameraActive ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-full h-full object-cover opacity-85"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-xl font-bold">
                      {currentUser.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-semibold text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-sb-green" />
                    {currentUser.name} (You)
                  </div>
                </div>
              </div>

              {/* Right Column: Tabbed TinyFish Dossier + Collaborative Scratchpad (7 cols on lg) */}
              <div className="lg:col-span-7 bg-black/40 rounded-2xl border border-white/10 p-4 flex flex-col justify-between overflow-hidden">
                {/* Top Tabs */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10 shrink-0">
                  <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
                    <button
                      onClick={() => setActiveRoomTab("briefing")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                        activeRoomTab === "briefing"
                          ? "bg-sb-green text-white shadow-sm"
                          : "text-white/70 hover:text-white"
                      }`}
                    >
                      <Zap size={13} className="text-emerald-300 fill-emerald-300" />
                      TinyFish Briefing
                    </button>
                    <button
                      onClick={() => setActiveRoomTab("scratchpad")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                        activeRoomTab === "scratchpad"
                          ? "bg-sb-green text-white shadow-sm"
                          : "text-white/70 hover:text-white"
                      }`}
                    >
                      <PenTool size={13} />
                      Scratchpad &amp; Notes
                    </button>
                  </div>

                  <span className="text-[10px] text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Chromium Fleet Active
                  </span>
                </div>

                {/* Tab 1: TinyFish Intelligence Briefing */}
                {activeRoomTab === "briefing" && (
                  <div className="flex-1 my-3 overflow-y-auto pr-1 space-y-4">
                    {/* Live URL & Crawl Bar */}
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2 w-full sm:w-auto truncate">
                        <Globe size={14} className="text-emerald-400 shrink-0" />
                        <input
                          type="text"
                          value={repoInput}
                          onChange={(e) => setRepoInput(e.target.value)}
                          placeholder="GitHub or Deployed URL..."
                          className="bg-transparent text-white font-mono text-[11px] focus:outline-none w-full truncate border-b border-white/10 focus:border-emerald-400 pb-0.5"
                        />
                      </div>
                      <button
                        onClick={() => handleTriggerTinyFishCrawl()}
                        disabled={isCrawling}
                        className="px-2.5 py-1 bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 rounded-lg text-xs font-medium shrink-0 flex items-center gap-1 transition-all"
                      >
                        <RefreshCw size={11} className={isCrawling ? "animate-spin" : ""} />
                        {isCrawling ? "Scanning..." : "Re-scan via TinyFish"}
                      </button>
                    </div>

                    {/* Toast Alert when Prompt Inserted */}
                    {promptInsertedToast && (
                      <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-fade-in">
                        <CheckCircle2 size={14} />
                        <span>{promptInsertedToast}</span>
                      </div>
                    )}

                    {/* Detected Architecture */}
                    <div className="space-y-1.5">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-white/50 flex items-center gap-1">
                        <Layers size={12} className="text-emerald-400" /> Live Extracted Stack
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {briefing.techStackVerified.map((tech) => (
                          <span
                            key={tech.name}
                            className="px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-medium text-white/90 flex items-center gap-1"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            {tech.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Blockers */}
                    <div className="space-y-1.5">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400/80 flex items-center gap-1">
                        <AlertCircle size={12} /> Active Blockers for Rahul to Solve
                      </div>
                      <div className="space-y-1.5">
                        {briefing.sprintBlockers.map((b, i) => (
                          <div
                            key={i}
                            className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200 flex items-center justify-between"
                          >
                            <span>{b.issue}</span>
                            <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-amber-500/20 font-bold ml-2">
                              {b.severity}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 1-Click Action Prompts */}
                    <div className="space-y-1.5">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-sb-pale flex items-center gap-1">
                        <Sparkles size={12} /> Clickable Mentor Prompts (Paste into Notes)
                      </div>
                      <div className="space-y-1.5">
                        {briefing.recommendedMentorPrompts.map((p, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleInsertPromptIntoNotes(p, idx)}
                            className="w-full text-left p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-400/50 text-[11px] text-white/80 transition-all flex items-center justify-between group"
                          >
                            <span className="group-hover:text-white leading-relaxed">&ldquo;{p}&rdquo;</span>
                            <span className="shrink-0 ml-2 text-[10px] text-emerald-400 font-semibold flex items-center gap-1 opacity-80 group-hover:opacity-100">
                              {copiedPromptIndex === idx ? (
                                <>
                                  <Check size={11} /> Copied
                                </>
                              ) : (
                                <>
                                  <Copy size={11} /> Insert
                                </>
                              )}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 2: Collaborative Scratchpad */}
                {activeRoomTab === "scratchpad" && (
                  <div className="flex-1 my-3 flex flex-col justify-between">
                    <textarea
                      value={liveNotes}
                      onChange={(e) => setLiveNotes(e.target.value)}
                      className="w-full h-full p-3 bg-white/5 rounded-xl text-xs text-white/90 font-mono border border-white/10 focus:outline-none focus:border-sb-light resize-none leading-relaxed"
                      placeholder="Take live session notes..."
                    />
                  </div>
                )}

                {/* Bottom Bar inside Right Panel */}
                <div className="flex items-center justify-between pt-2 border-t border-white/10 shrink-0">
                  <span className="text-[11px] text-white/60">
                    {savedNotesToast
                      ? "Saved to project!"
                      : activeRoomTab === "briefing"
                      ? "Briefing synced via TinyFish"
                      : "Markdown supported"}
                  </span>
                  <div className="flex items-center gap-2">
                    {activeRoomTab === "briefing" && (
                      <button
                        onClick={() => setActiveRoomTab("scratchpad")}
                        className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg transition-all"
                      >
                        Open Scratchpad
                      </button>
                    )}
                    <button
                      onClick={handleSaveNotes}
                      className="px-3 py-1.5 bg-sb-green hover:bg-sb-mid text-white text-xs font-semibold rounded-lg shadow-sm transition-all flex items-center gap-1.5"
                    >
                      <Save size={13} /> Save Session Notes
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Room Controls Bottom Bar */}
            <div className="p-4 border-t border-white/10 bg-black/60 flex items-center justify-center gap-4">
              <button
                onClick={() => setMicActive(!micActive)}
                className={`p-3 rounded-full transition-all ${
                  micActive ? "bg-white/10 hover:bg-white/20 text-white" : "bg-red-500 text-white"
                }`}
              >
                {micActive ? <Mic size={18} /> : <MicOff size={18} />}
              </button>

              <button
                onClick={() => setCameraActive(!cameraActive)}
                className={`p-3 rounded-full transition-all ${
                  cameraActive ? "bg-white/10 hover:bg-white/20 text-white" : "bg-red-500 text-white"
                }`}
              >
                {cameraActive ? <Video size={18} /> : <VideoOff size={18} />}
              </button>

              <button
                onClick={() => setActiveCallSession(null)}
                className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-full transition-all shadow-lg"
              >
                End Call
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
