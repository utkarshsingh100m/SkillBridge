"use client";

import { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Star,
  Sparkles,
  Calendar,
  Clock,
  CheckCircle2,
  X,
  MessageSquare,
  ShieldCheck,
  Send,
  Video,
} from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import MatchCircle from "@/components/ui/MatchCircle";
import { mentors, currentUser } from "@/lib/data";
import { UserProfile } from "@/lib/types";

// Extended mentor match metadata
const mentorMatches: Record<string, { matchScore: number; matchReasons: string[] }> = {
  m1: {
    matchScore: 98,
    matchReasons: [
      "Expertise in GenAI & RAG matches HealthAI requirements",
      "5+ years industry experience at Google",
      "Available during your hackathon timeline",
    ],
  },
  m2: {
    matchScore: 92,
    matchReasons: [
      "Published 15+ papers in Healthcare & Medical AI",
      "Specializes in Computer Vision & TensorFlow",
      "Strong background in research validation",
    ],
  },
  m3: {
    matchScore: 86,
    matchReasons: [
      "Former Microsoft PM with pitch deck expertise",
      "Helps refine go-to-market & user story",
      "High student satisfaction rating (4.7/5)",
    ],
  },
};

export default function FindMentorsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("All");
  const [selectedMentor, setSelectedMentor] = useState<UserProfile | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{ day: string; time: string } | null>(null);
  const [sessionTopic, setSessionTopic] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const domains = ["All", "AI / ML", "Healthcare Tech", "Product & Pitch", "Web Dev"];

  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch =
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (mentor.headline || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    if (selectedDomain === "All") return matchesSearch;
    if (selectedDomain === "AI / ML") {
      return (
        matchesSearch &&
        mentor.skills.some((s) => ["Machine Learning", "GenAI", "Python", "LLM"].includes(s))
      );
    }
    if (selectedDomain === "Healthcare Tech") {
      return (
        matchesSearch &&
        (mentor.interests.includes("Healthcare AI") || mentor.interests.includes("Medical AI"))
      );
    }
    if (selectedDomain === "Product & Pitch") {
      return (
        matchesSearch &&
        mentor.skills.some((s) => ["Product Strategy", "Pitch Decks", "UX"].includes(s))
      );
    }
    if (selectedDomain === "Web Dev") {
      return matchesSearch && mentor.skills.some((s) => ["FastAPI", "Python"].includes(s));
    }
    return matchesSearch;
  });

  const handleOpenBooking = (mentor: UserProfile) => {
    setSelectedMentor(mentor);
    setSelectedSlot(null);
    setSessionTopic(`1-on-1 Guidance on HealthAI Architecture & Demo`);
    setBookingConfirmed(false);
    setBookingModalOpen(true);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) return;
    setBookingConfirmed(true);
    setTimeout(() => {
      setBookingModalOpen(false);
      setBookingConfirmed(false);
    }, 2200);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-sb-dark via-sb-green to-sb-mid rounded-3xl p-8 text-white relative overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider text-sb-wash mb-3">
            <Sparkles size={14} className="text-sb-gold" /> AI-Powered Mentor Match
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Connect with Industry Mentors</h1>
          <p className="text-white/80 text-sm mt-2 leading-relaxed">
            SkillBridge calculates semantic compatibility between your hackathon project
            (&ldquo;HealthAI Assistant&rdquo;) and verified senior engineering and product leaders.
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-border shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search by mentor name, skill (e.g., GenAI, RAG, Pitch), or domain..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-surface rounded-xl text-sm border border-border focus:outline-none focus:ring-2 focus:ring-sb-green/20 focus:border-sb-green transition-all"
          />
        </div>

        {/* Domain Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <span className="text-xs text-text-muted font-medium mr-1 flex items-center gap-1 shrink-0">
            <SlidersHorizontal size={14} /> Filters:
          </span>
          {domains.map((domain) => (
            <button
              key={domain}
              onClick={() => setSelectedDomain(domain)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 ${
                selectedDomain === domain
                  ? "bg-sb-dark text-white shadow-sm"
                  : "bg-surface text-text-secondary hover:bg-surface-hover hover:text-sb-dark"
              }`}
            >
              {domain}
            </button>
          ))}
        </div>
      </div>

      {/* Mentor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMentors.map((mentor) => {
          const match = mentorMatches[mentor.id] || {
            matchScore: 85,
            matchReasons: ["Relevant domain skills", "High response rate"],
          };

          return (
            <div
              key={mentor.id}
              className="bg-white rounded-2xl border border-border hover:border-sb-light hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden group"
            >
              {/* Card Header with Match Badge */}
              <div className="p-6 flex-1 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="relative">
                    <Avatar
                      src={mentor.avatar}
                      name={mentor.name}
                      size="xl"
                      verified={mentor.verified}
                    />
                    <span className="absolute -bottom-1 -right-1 bg-white p-0.5 rounded-full shadow-sm">
                      <ShieldCheck size={16} className="text-sb-green" />
                    </span>
                  </div>
                  <MatchCircle score={match.matchScore} size="sm" />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-sb-dark group-hover:text-sb-green transition-colors">
                      {mentor.name}
                    </h3>
                  </div>
                  <p className="text-xs font-medium text-sb-mid mt-0.5">{mentor.headline}</p>
                  <p className="text-xs text-text-muted mt-0.5">{mentor.location}</p>
                </div>

                <p className="text-xs text-text-secondary line-clamp-3 leading-relaxed">
                  {mentor.bio}
                </p>

                {/* AI Match Reasons */}
                <div className="bg-sb-bg/50 border border-sb-wash/60 rounded-xl p-3 space-y-1">
                  <p className="text-[11px] font-semibold text-sb-dark flex items-center gap-1">
                    <Sparkles size={12} className="text-sb-gold" /> Why this match:
                  </p>
                  <p className="text-[11px] text-text-secondary leading-snug">
                    {match.matchReasons[0]}
                  </p>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {mentor.skills.slice(0, 4).map((skill) => (
                    <Badge key={skill} variant="neutral" size="sm">
                      {skill}
                    </Badge>
                  ))}
                  {mentor.skills.length > 4 && (
                    <span className="text-[11px] text-text-muted self-center font-medium">
                      +{mentor.skills.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-4 bg-surface border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-xs font-bold text-sb-dark">
                    <Star size={14} className="text-amber-500 fill-amber-500" />
                    <span>{mentor.rating}</span>
                  </div>
                  <span className="text-text-muted text-xs">•</span>
                  <span className="text-xs text-text-secondary font-medium">
                    {mentor.mentorshipsCount} sessions
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenBooking(mentor)}
                    className="px-3.5 py-1.5 bg-sb-dark hover:bg-sb-green text-white text-xs font-semibold rounded-lg shadow-sm transition-all duration-200 flex items-center gap-1.5"
                  >
                    <Calendar size={13} /> Book Session
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Booking Modal */}
      {bookingModalOpen && selectedMentor && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-border shadow-2xl overflow-hidden animate-scale-up">
            <div className="p-6 border-b border-border flex items-center justify-between bg-surface">
              <div className="flex items-center gap-3">
                <Avatar src={selectedMentor.avatar} name={selectedMentor.name} size="md" />
                <div>
                  <h3 className="text-base font-bold text-sb-dark">
                    Book Mentorship with {selectedMentor.name}
                  </h3>
                  <p className="text-xs text-text-muted">{selectedMentor.headline}</p>
                </div>
              </div>
              <button
                onClick={() => setBookingModalOpen(false)}
                className="text-text-muted hover:text-sb-dark p-1 rounded-lg hover:bg-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {bookingConfirmed ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-sb-bg text-sb-green rounded-full flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle2 size={36} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-sb-dark">Session Confirmed!</h4>
                  <p className="text-xs text-text-secondary mt-1">
                    Your 30-minute session with {selectedMentor.name} on{" "}
                    <strong>
                      {selectedSlot?.day} at {selectedSlot?.time}
                    </strong>{" "}
                    is scheduled. A calendar invite and Google Meet link have been sent.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleConfirmBooking} className="p-6 space-y-5">
                <div>
                  <label className="block text-xs font-bold text-sb-dark uppercase tracking-wider mb-2">
                    1. Select Available Time Slot (30 Mins)
                  </label>
                  <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                    {selectedMentor.availability?.map((slot) =>
                      slot.times.map((time) => {
                        const isSelected =
                          selectedSlot?.day === slot.day && selectedSlot?.time === time;
                        return (
                          <button
                            type="button"
                            key={`${slot.day}-${time}`}
                            onClick={() => setSelectedSlot({ day: slot.day, time })}
                            className={`p-2.5 rounded-xl text-left border transition-all flex items-center justify-between ${
                              isSelected
                                ? "border-sb-green bg-sb-bg text-sb-dark font-semibold shadow-sm"
                                : "border-border hover:border-sb-mid text-text-secondary hover:bg-surface"
                            }`}
                          >
                            <span className="text-xs flex items-center gap-1.5">
                              <Clock size={13} className="text-sb-green" /> {slot.day}, {time}
                            </span>
                            {isSelected && <CheckCircle2 size={14} className="text-sb-green" />}
                          </button>
                        );
                      })
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-sb-dark uppercase tracking-wider mb-2">
                    2. Discussion Topic / Questions
                  </label>
                  <textarea
                    rows={3}
                    value={sessionTopic}
                    onChange={(e) => setSessionTopic(e.target.value)}
                    placeholder="Describe what you want help with (e.g. RAG architecture, pitch feedback)..."
                    className="w-full p-3 bg-surface rounded-xl text-xs border border-border focus:outline-none focus:ring-2 focus:ring-sb-green/20 focus:border-sb-green"
                    required
                  />
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2 text-xs text-amber-800">
                  <Video size={16} className="text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    Sessions include live screen sharing, AI whiteboard, and auto-generated summary
                    notes.
                  </span>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setBookingModalOpen(false)}
                    className="px-4 py-2 text-xs font-medium text-text-secondary hover:text-sb-dark"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!selectedSlot}
                    className="px-5 py-2.5 bg-sb-dark hover:bg-sb-green text-white text-xs font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-md transition-all flex items-center gap-2"
                  >
                    <Send size={13} /> Confirm Booking
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
