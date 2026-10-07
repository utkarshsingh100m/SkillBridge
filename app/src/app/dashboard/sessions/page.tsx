"use client";

import { useState } from "react";
import {
  Calendar,
  Clock,
  Video,
  Sparkles,
  FileText,
  CheckCircle2,
  X,
  Play,
  Share2,
  Mic,
  MicOff,
  VideoOff,
  MessageSquare,
  Code,
  PenTool,
  Save,
} from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import { mentors, currentUser } from "@/lib/data";

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
  const [sessions, setSessions] = useState<Session[]>(initialSessions);
  const [activeCallSession, setActiveCallSession] = useState<Session | null>(null);
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

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-sb-dark">Mentorship Sessions</h1>
          <p className="text-sm text-text-secondary mt-1">
            Track scheduled 1-on-1 calls, access live virtual rooms, and review AI-summarized notes.
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
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-xs text-text-muted">Google Meet + AI Room</span>
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

      {/* Interactive Virtual Room Modal */}
      {activeCallSession && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-sb-dark border border-white/10 rounded-3xl max-w-4xl w-full h-[85vh] flex flex-col overflow-hidden shadow-2xl animate-scale-up text-white">
            {/* Room Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/40">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                <div>
                  <h3 className="text-sm font-bold text-white">
                    Live Session: {activeCallSession.topic}
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
            <div className="flex-1 p-4 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden">
              {/* Video Grid */}
              <div className="grid grid-rows-2 gap-3 h-full">
                {/* Mentor Video Feed */}
                <div className="relative bg-black/60 rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center">
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

              {/* Collaborative Live Notes & Code Scratchpad */}
              <div className="bg-black/40 rounded-2xl border border-white/10 p-4 flex flex-col justify-between">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <PenTool size={14} className="text-sb-light" /> Real-time Collaborative Scratchpad
                  </span>
                  <span className="text-[10px] text-sb-wash bg-white/10 px-2 py-0.5 rounded-full">
                    Auto-Syncing
                  </span>
                </div>

                <textarea
                  value={liveNotes}
                  onChange={(e) => setLiveNotes(e.target.value)}
                  className="w-full flex-1 my-3 p-3 bg-white/5 rounded-xl text-xs text-white/90 font-mono border border-white/10 focus:outline-none focus:border-sb-light resize-none"
                  placeholder="Take live session notes..."
                />

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-white/60">
                    {savedNotesToast ? "Saved to project!" : "Markdown supported"}
                  </span>
                  <button
                    onClick={handleSaveNotes}
                    className="px-3 py-1.5 bg-sb-green hover:bg-sb-mid text-white text-xs font-semibold rounded-lg shadow-sm transition-all flex items-center gap-1.5"
                  >
                    <Save size={13} /> Save Session Notes
                  </button>
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
