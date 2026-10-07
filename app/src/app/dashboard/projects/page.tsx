"use client";

import { useState } from "react";
import {
  FolderKanban,
  Plus,
  Sparkles,
  CheckCircle2,
  Clock,
  ExternalLink,
  Users,
  Award,
  BarChart3,
  X,
  Target,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import Avatar from "@/components/ui/Avatar";
import { projects, currentUser } from "@/lib/data";

interface Milestone {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
  assignedTo: string;
}

const initialMilestones: Milestone[] = [
  { id: "m1", title: "Problem Definition & Literature Review", dueDate: "Day 1", completed: true, assignedTo: "Utkarsh" },
  { id: "m2", title: "RAG Pipeline & LLM Integration", dueDate: "Day 2", completed: true, assignedTo: "Ashmit" },
  { id: "m3", title: "Frontend Dashboard & Stitch UI Integration", dueDate: "Day 2", completed: true, assignedTo: "Rudraksh" },
  { id: "m4", title: "Mentor Review with Rahul Sharma", dueDate: "Day 3 (Today)", completed: false, assignedTo: "Team" },
  { id: "m5", title: "Final Video Demo & Submission", dueDate: "Day 3 (5 PM)", completed: false, assignedTo: "Shaurya" },
];

export default function ProjectsPage() {
  const [projectList, setProjectList] = useState(projects);
  const [milestones, setMilestones] = useState<Milestone[]>(initialMilestones);
  const [newProjectModalOpen, setNewProjectModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newDomain, setNewDomain] = useState("Healthcare AI");
  const [newTags, setNewTags] = useState("AI/ML, Next.js, FastAPI");

  const toggleMilestone = (id: string) => {
    setMilestones((prev) =>
      prev.map((m) => (m.id === id ? { ...m, completed: !m.completed } : m))
    );
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    const newProj = {
      id: `p${Date.now()}`,
      title: newTitle,
      description: newDesc,
      tags: newTags.split(",").map((t) => t.trim()),
      domain: newDomain,
      timeline: "Build With Bharat 4.0",
      roles: [
        { title: "Lead Developer", skills: ["React", "TypeScript"], filled: true, assignedTo: currentUser.id },
        { title: "ML Specialist", skills: ["Python", "PyTorch"], filled: false },
        { title: "UI/UX Designer", skills: ["Figma"], filled: false },
      ],
      creatorId: currentUser.id,
      teamMembers: [
        { id: currentUser.id, name: currentUser.name, avatar: currentUser.avatar, role: "Lead Developer" },
      ],
      status: "Active" as const,
      hackathonDeadline: new Date(Date.now() + 48 * 3600 * 1000).toISOString(),
    };
    setProjectList([newProj, ...projectList]);
    setNewProjectModalOpen(false);
    setNewTitle("");
    setNewDesc("");
  };

  const completedCount = milestones.filter((m) => m.completed).length;
  const milestoneProgress = Math.round((completedCount / milestones.length) * 100);

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-sb-dark">Project Hub &amp; Hackathons</h1>
          <p className="text-sm text-text-secondary mt-1">
            Manage your submissions, track sprint milestones, and monitor AI code &amp; pitch readiness.
          </p>
        </div>
        <button
          onClick={() => setNewProjectModalOpen(true)}
          className="px-4 py-2.5 bg-sb-dark hover:bg-sb-green text-white text-xs font-semibold rounded-xl shadow-md transition-all flex items-center gap-2 self-start md:self-auto"
        >
          <Plus size={16} /> Create New Project
        </button>
      </div>

      {/* Primary Active Project Showcase */}
      <div className="bg-white rounded-3xl border border-border shadow-sm p-7 space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6 border-b border-border">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="green" size="sm">Active Submission</Badge>
              <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                Build With Bharat 4.0
              </span>
            </div>
            <h2 className="text-2xl font-bold text-sb-dark">{projectList[0].title}</h2>
            <p className="text-sm text-text-secondary mt-1 max-w-2xl leading-relaxed">
              {projectList[0].description}
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {projectList[0].tags.map((tag) => (
                <Badge key={tag} variant="outline" size="sm">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* AI Project Readiness Scores */}
          <div className="bg-surface rounded-2xl p-4 border border-border shrink-0 md:w-64 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-sb-dark flex items-center gap-1">
                <Sparkles size={14} className="text-sb-gold" /> AI Hackathon Score
              </span>
              <span className="text-xs font-bold text-sb-green">91 / 100</span>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <div className="flex justify-between text-text-secondary text-[11px] mb-1">
                  <span>Architecture &amp; Code</span>
                  <span className="font-semibold text-sb-dark">94%</span>
                </div>
                <div className="w-full bg-border rounded-full h-1.5 overflow-hidden">
                  <div className="bg-sb-green h-full rounded-full" style={{ width: "94%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-text-secondary text-[11px] mb-1">
                  <span>Pitch Deck &amp; Story</span>
                  <span className="font-semibold text-sb-dark">85%</span>
                </div>
                <div className="w-full bg-border rounded-full h-1.5 overflow-hidden">
                  <div className="bg-sb-mid h-full rounded-full" style={{ width: "85%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-text-secondary text-[11px] mb-1">
                  <span>Demo Readiness</span>
                  <span className="font-semibold text-sb-dark">92%</span>
                </div>
                <div className="w-full bg-border rounded-full h-1.5 overflow-hidden">
                  <div className="bg-sb-green h-full rounded-full" style={{ width: "92%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Milestone Sprint Tracker */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target size={18} className="text-sb-green" />
              <h3 className="text-base font-bold text-sb-dark">Hackathon Sprint Milestones</h3>
            </div>
            <span className="text-xs font-semibold text-sb-dark">
              {completedCount} of {milestones.length} Completed ({milestoneProgress}%)
            </span>
          </div>

          <div className="w-full bg-surface rounded-full h-2 overflow-hidden border border-border">
            <div
              className="bg-gradient-to-r from-sb-green to-sb-light h-full rounded-full transition-all duration-500"
              style={{ width: `${milestoneProgress}%` }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            {milestones.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleMilestone(item.id)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                  item.completed
                    ? "bg-sb-bg/40 border-sb-wash text-text-secondary line-through"
                    : "bg-surface border-border hover:border-sb-mid text-sb-dark"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                      item.completed
                        ? "bg-sb-green border-sb-green text-white"
                        : "border-border bg-white"
                    }`}
                  >
                    {item.completed && <CheckCircle2 size={14} />}
                  </div>
                  <span className="text-xs font-medium">{item.title}</span>
                </div>
                <span className="text-[11px] text-text-muted font-mono shrink-0 ml-2">
                  {item.dueDate}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Other Projects Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-sb-dark">Community &amp; Past Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectList.slice(1).map((proj) => (
            <div
              key={proj.id}
              className="bg-white rounded-2xl border border-border p-6 space-y-4 hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-base font-bold text-sb-dark">{proj.title}</h4>
                  <p className="text-xs text-text-muted mt-0.5">{proj.domain}</p>
                </div>
                <Badge variant="neutral" size="sm">{proj.status}</Badge>
              </div>
              <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">
                {proj.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {proj.tags.map((t) => (
                  <Badge key={t} variant="outline" size="sm">
                    {t}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-border text-xs text-text-muted">
                <span>{proj.roles.filter((r) => r.filled).length} / {proj.roles.length} Roles Filled</span>
                <span className="text-sb-green font-medium">Timeline: {proj.timeline}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Project Modal */}
      {newProjectModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-border shadow-2xl overflow-hidden animate-scale-up">
            <div className="p-6 border-b border-border flex items-center justify-between bg-surface">
              <h3 className="text-base font-bold text-sb-dark">Create New Hackathon Project</h3>
              <button
                onClick={() => setNewProjectModalOpen(false)}
                className="text-text-muted hover:text-sb-dark p-1 rounded-lg hover:bg-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-sb-dark uppercase tracking-wider mb-1.5">
                  Project Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. AI MedAssist, AgriSense IoT"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2.5 bg-surface rounded-xl text-xs border border-border focus:outline-none focus:ring-2 focus:ring-sb-green/20 focus:border-sb-green"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-sb-dark uppercase tracking-wider mb-1.5">
                  Domain / Category
                </label>
                <select
                  value={newDomain}
                  onChange={(e) => setNewDomain(e.target.value)}
                  className="w-full p-2.5 bg-surface rounded-xl text-xs border border-border focus:outline-none focus:ring-2 focus:ring-sb-green/20 focus:border-sb-green"
                >
                  <option value="Healthcare AI">Healthcare AI</option>
                  <option value="FinTech & Web3">FinTech &amp; Web3</option>
                  <option value="EdTech">EdTech &amp; Learning</option>
                  <option value="AgriTech & Climate">AgriTech &amp; Climate</option>
                  <option value="Smart Cities">Smart Cities &amp; Governance</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-sb-dark uppercase tracking-wider mb-1.5">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="What problem does this solve? What is your architecture?"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full p-3 bg-surface rounded-xl text-xs border border-border focus:outline-none focus:ring-2 focus:ring-sb-green/20 focus:border-sb-green"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-sb-dark uppercase tracking-wider mb-1.5">
                  Tech Stack (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="React, Next.js, FastAPI, PyTorch"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  className="w-full p-2.5 bg-surface rounded-xl text-xs border border-border focus:outline-none focus:ring-2 focus:ring-sb-green/20 focus:border-sb-green"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setNewProjectModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-text-secondary hover:text-sb-dark"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-sb-dark hover:bg-sb-green text-white text-xs font-semibold rounded-xl shadow-md transition-all"
                >
                  Create &amp; Match Teammates
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
