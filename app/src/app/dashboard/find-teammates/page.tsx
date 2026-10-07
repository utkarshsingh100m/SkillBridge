"use client";

import { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Sparkles,
  Users,
  Send,
  CheckCircle2,
  X,
  Code2,
  Calendar,
  Layers,
  Award,
} from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import MatchCircle from "@/components/ui/MatchCircle";
import { teammates, teammateMatches, projects, currentUser } from "@/lib/data";
import { UserProfile } from "@/lib/types";

export default function FindTeammatesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedTeammate, setSelectedTeammate] = useState<UserProfile | null>(null);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [inviteRole, setInviteRole] = useState("Research & ML");
  const [inviteMessage, setInviteMessage] = useState("");
  const [inviteSent, setInviteSent] = useState(false);

  const roles = ["All", "Frontend", "Backend", "AI / ML", "UI / UX"];

  const filteredTeammates = teammates.filter((mate) => {
    const matchesSearch =
      mate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (mate.headline || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      mate.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    if (selectedRole === "All") return matchesSearch;
    if (selectedRole === "Frontend") {
      return matchesSearch && mate.skills.some((s) => ["React", "TypeScript", "TailwindCSS"].includes(s));
    }
    if (selectedRole === "Backend") {
      return matchesSearch && mate.skills.some((s) => ["Python", "FastAPI", "PostgreSQL", "Node.js"].includes(s));
    }
    if (selectedRole === "AI / ML") {
      return matchesSearch && mate.skills.some((s) => ["TensorFlow", "NLP", "Python", "Data Analysis"].includes(s));
    }
    if (selectedRole === "UI / UX") {
      return matchesSearch && mate.skills.some((s) => ["Figma", "UI/UX"].includes(s));
    }
    return matchesSearch;
  });

  const handleOpenInvite = (mate: UserProfile) => {
    setSelectedTeammate(mate);
    setInviteRole("Research & ML");
    setInviteMessage(
      `Hey ${mate.name.split(" ")[0]}, we loved your profile! We're building the AI Healthcare Assistant for Build with Bharat 4.0 and need someone with your skills to complete our team.`
    );
    setInviteSent(false);
    setInviteModalOpen(true);
  };

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    setInviteSent(true);
    setTimeout(() => {
      setInviteModalOpen(false);
      setInviteSent(false);
    }, 2200);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-sb-dark via-sb-green to-sb-mid rounded-3xl p-8 text-white relative overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider text-sb-wash mb-3">
            <Sparkles size={14} className="text-sb-gold" /> AI Skill-Gap Complementary Engine
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Find Complementary Teammates</h1>
          <p className="text-white/80 text-sm mt-2 leading-relaxed">
            SkillBridge analyzes your project&apos;s missing competencies and matches you with verified
            students whose skills and availability complement your hackathon squad.
          </p>
        </div>
      </div>

      {/* Project Needs Bar */}
      <div className="bg-sb-bg/80 border border-sb-wash rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sb-dark text-white flex items-center justify-center shrink-0">
            <Layers size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-sb-dark">
              Active Project: {projects[0].title}
            </h4>
            <p className="text-xs text-text-secondary">
              Currently seeking: <strong className="text-sb-dark">ML Engineer / NLP Specialist</strong> &amp; <strong className="text-sb-dark">UI/UX Designer</strong>
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-sb-wash rounded-full text-xs font-semibold text-sb-green">
          <CheckCircle2 size={13} /> 3 of 5 Roles Filled
        </span>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-border shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search teammates by name, skill (e.g. React, Python, TensorFlow)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-surface rounded-xl text-sm border border-border focus:outline-none focus:ring-2 focus:ring-sb-green/20 focus:border-sb-green transition-all"
          />
        </div>

        {/* Role Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <span className="text-xs text-text-muted font-medium mr-1 flex items-center gap-1 shrink-0">
            <SlidersHorizontal size={14} /> Roles:
          </span>
          {roles.map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 ${
                selectedRole === role
                  ? "bg-sb-dark text-white shadow-sm"
                  : "bg-surface text-text-secondary hover:bg-surface-hover hover:text-sb-dark"
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Teammates Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeammates.map((mate) => {
          const match = teammateMatches.find((m) => m.userId === mate.id) || {
            overallScore: 84,
            reasons: ["Complementary skill set", "Shared domain interest"],
            breakdown: { skillsMatch: 85, projectRelevance: 80, availability: 85, experience: 85 },
          };

          return (
            <div
              key={mate.id}
              className="bg-white rounded-2xl border border-border hover:border-sb-light hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden group"
            >
              {/* Card Body */}
              <div className="p-6 flex-1 space-y-4">
                <div className="flex items-start justify-between">
                  <Avatar
                    src={mate.avatar}
                    name={mate.name}
                    size="xl"
                  />
                  <MatchCircle score={match.overallScore} size="sm" />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-sb-dark group-hover:text-sb-green transition-colors">
                    {mate.name}
                  </h3>
                  <p className="text-xs font-medium text-sb-mid mt-0.5">{mate.headline}</p>
                  <p className="text-xs text-text-muted mt-0.5 flex items-center gap-1">
                    <Calendar size={12} /> Available: {mate.availabilityLabel}
                  </p>
                </div>

                {/* AI Synergy Reasons */}
                <div className="bg-sb-bg/50 border border-sb-wash/60 rounded-xl p-3 space-y-1">
                  <p className="text-[11px] font-semibold text-sb-dark flex items-center gap-1">
                    <Sparkles size={12} className="text-sb-gold" /> AI Synergy:
                  </p>
                  <p className="text-[11px] text-text-secondary leading-snug">
                    {match.reasons[0]}
                  </p>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {mate.skills.map((skill) => (
                    <Badge key={skill} variant="neutral" size="sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-4 bg-surface border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-text-secondary">
                  <Award size={14} className="text-sb-green" />
                  <span>Verified Student</span>
                </div>

                <button
                  onClick={() => handleOpenInvite(mate)}
                  className="px-3.5 py-1.5 bg-sb-dark hover:bg-sb-green text-white text-xs font-semibold rounded-lg shadow-sm transition-all duration-200 flex items-center gap-1.5"
                >
                  <Send size={13} /> Invite to Team
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Invite Modal */}
      {inviteModalOpen && selectedTeammate && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-border shadow-2xl overflow-hidden animate-scale-up">
            <div className="p-6 border-b border-border flex items-center justify-between bg-surface">
              <div className="flex items-center gap-3">
                <Avatar src={selectedTeammate.avatar} name={selectedTeammate.name} size="md" />
                <div>
                  <h3 className="text-base font-bold text-sb-dark">
                    Invite {selectedTeammate.name}
                  </h3>
                  <p className="text-xs text-text-muted">To {projects[0].title}</p>
                </div>
              </div>
              <button
                onClick={() => setInviteModalOpen(false)}
                className="text-text-muted hover:text-sb-dark p-1 rounded-lg hover:bg-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {inviteSent ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-sb-bg text-sb-green rounded-full flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle2 size={36} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-sb-dark">Invitation Sent!</h4>
                  <p className="text-xs text-text-secondary mt-1">
                    {selectedTeammate.name} has been invited to join{" "}
                    <strong>{projects[0].title}</strong>. They will receive a notification and can
                    accept via their dashboard.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSendInvite} className="p-6 space-y-5">
                <div>
                  <label className="block text-xs font-bold text-sb-dark uppercase tracking-wider mb-2">
                    Assigned Role
                  </label>
                  <select
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value)}
                    className="w-full p-2.5 bg-surface rounded-xl text-xs border border-border focus:outline-none focus:ring-2 focus:ring-sb-green/20 focus:border-sb-green"
                  >
                    <option value="Research & ML">Research &amp; ML Engineer</option>
                    <option value="UI/UX Designer">UI/UX Designer &amp; Prototyper</option>
                    <option value="Backend Developer">Backend &amp; API Developer</option>
                    <option value="Frontend Developer">Frontend Developer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-sb-dark uppercase tracking-wider mb-2">
                    Personalized Message
                  </label>
                  <textarea
                    rows={4}
                    value={inviteMessage}
                    onChange={(e) => setInviteMessage(e.target.value)}
                    className="w-full p-3 bg-surface rounded-xl text-xs border border-border focus:outline-none focus:ring-2 focus:ring-sb-green/20 focus:border-sb-green"
                    required
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setInviteModalOpen(false)}
                    className="px-4 py-2 text-xs font-medium text-text-secondary hover:text-sb-dark"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-sb-dark hover:bg-sb-green text-white text-xs font-semibold rounded-xl shadow-md transition-all flex items-center gap-2"
                  >
                    <Send size={13} /> Send Invitation
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
