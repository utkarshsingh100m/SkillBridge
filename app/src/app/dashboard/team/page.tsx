"use client";

import { useState } from "react";
import {
  UsersRound,
  Plus,
  Sparkles,
  CheckCircle2,
  Clock,
  ExternalLink,
  Code2,
  Mail,
  Share2,
  Copy,
  Layers,
  BarChart3,
  Shield,
  Video,
} from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import { projects, currentUser } from "@/lib/data";

interface Task {
  id: string;
  title: string;
  assignee: string;
  status: "todo" | "in_progress" | "done";
  tag: string;
}

const initialTasks: Task[] = [
  { id: "t1", title: "Setup Next.js 15 & Tailwind design tokens", assignee: "Praveen", status: "done", tag: "Frontend" },
  { id: "t2", title: "Build FastAPI RAG retrieval endpoint", assignee: "Utkarsh", status: "done", tag: "Backend" },
  { id: "t3", title: "Vector embeddings indexing with ChromaDB", assignee: "Ashmit", status: "done", tag: "Database" },
  { id: "t4", title: "Integrate Stitch screen components into web app", assignee: "Praveen", status: "in_progress", tag: "Frontend" },
  { id: "t5", title: "Prepare pitch deck slides & demo video script", assignee: "Shaurya", status: "in_progress", tag: "Research" },
  { id: "t6", title: "Schedule final review with Mentor Rahul Sharma", assignee: "Praveen", status: "todo", tag: "Mentorship" },
  { id: "t7", title: "Conduct end-to-end stress test with mock patients", assignee: "Team", status: "todo", tag: "QA" },
];

export default function TeamPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskAssignee, setNewTaskAssignee] = useState("Praveen");
  const [newTaskTag, setNewTaskTag] = useState("Frontend");
  const [showTaskInput, setShowTaskInput] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const teamMembers = [
    {
      id: "u1",
      name: "Praveen Mishra",
      role: "Lead Developer & Frontend",
      skills: ["React", "Next.js", "TypeScript", "TailwindCSS"],
      avatar: "/avatars/praveen.jpg",
      github: "praveenmishra",
      status: "Active Now",
    },
    {
      id: "t2",
      name: "Utkarsh",
      role: "Backend & Systems",
      skills: ["Python", "FastAPI", "Docker", "PostgreSQL"],
      avatar: "/avatars/aman.jpg",
      github: "utkarsh-dev",
      status: "Active Now",
    },
    {
      id: "t2b",
      name: "Ashmit",
      role: "Database & Vector Store",
      skills: ["MongoDB", "ChromaDB", "Redis", "Cloud"],
      avatar: "/avatars/rahul.jpg",
      github: "ashmit-db",
      status: "Idle (1h ago)",
    },
    {
      id: "t3",
      name: "Shaurya",
      role: "AI Research & Pitch",
      skills: ["NLP", "Medical Datasets", "Presentation"],
      avatar: "/avatars/elena.jpg",
      github: "shaurya-ai",
      status: "Active Now",
    },
  ];

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const newTask: Task = {
      id: `task_${Date.now()}`,
      title: newTaskTitle,
      assignee: newTaskAssignee,
      status: "todo",
      tag: newTaskTag,
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
    setShowTaskInput(false);
  };

  const moveTask = (taskId: string, newStatus: Task["status"]) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
  };

  const copyTeamCode = () => {
    navigator.clipboard?.writeText("BWB-SKILLBRIDGE-2026-X9");
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-sb-dark">Team Management</h1>
            <Badge variant="green" size="sm">Team Alpha</Badge>
          </div>
          <p className="text-sm text-text-secondary mt-1">
            Collaborate with your squad on &ldquo;{projects[0].title}&rdquo; for Build With Bharat 4.0.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={copyTeamCode}
            className="px-3.5 py-2 bg-surface hover:bg-surface-hover border border-border text-sb-dark text-xs font-semibold rounded-xl transition-all flex items-center gap-2"
          >
            <Share2 size={14} />
            <span>Team Code: BWB-2026</span>
            {copiedCode ? (
              <span className="text-sb-green text-[10px] font-bold">Copied!</span>
            ) : (
              <Copy size={12} className="text-text-muted" />
            )}
          </button>

          <a
            href="https://meet.google.com"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 bg-sb-dark hover:bg-sb-green text-white text-xs font-semibold rounded-xl shadow-sm transition-all flex items-center gap-2"
          >
            <Video size={14} /> Instant Team Sync
          </a>
        </div>
      </div>

      {/* Team Members Roster */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-2xl border border-border p-5 space-y-3 hover:border-sb-light hover:shadow-sm transition-all"
          >
            <div className="flex items-start justify-between">
              <Avatar src={member.avatar} name={member.name} size="lg" />
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-sb-green bg-sb-bg px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-sb-green" />
                {member.status}
              </span>
            </div>

            <div>
              <h4 className="text-sm font-bold text-sb-dark">{member.name}</h4>
              <p className="text-xs font-medium text-sb-mid mt-0.5">{member.role}</p>
            </div>

            <div className="flex flex-wrap gap-1">
              {member.skills.slice(0, 3).map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-0.5 bg-surface text-text-secondary text-[10px] font-medium rounded-md"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="pt-2 border-t border-border flex items-center justify-between text-xs text-text-muted">
              <span className="flex items-center gap-1">
                <Code2 size={12} /> @{member.github}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Team Skill Matrix */}
      <div className="bg-white rounded-2xl border border-border p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 size={18} className="text-sb-green" />
            <h3 className="text-base font-bold text-sb-dark">Team Skill Coverage &amp; Gap Matrix</h3>
          </div>
          <span className="text-xs text-text-muted">Target: 100% Hackathon Readiness</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-2">
          {[
            { skill: "Frontend & UI", score: 100, status: "Fully Covered", color: "bg-sb-green" },
            { skill: "Backend & API", score: 100, status: "Fully Covered", color: "bg-sb-green" },
            { skill: "Vector Database", score: 100, status: "Fully Covered", color: "bg-sb-green" },
            { skill: "AI/ML Mentor", score: 85, status: "Mentor Requested", color: "bg-amber-500" },
            { skill: "Pitch Mentor", score: 60, status: "Needs Booking", color: "bg-amber-500" },
          ].map((item) => (
            <div key={item.skill} className="bg-surface rounded-xl p-3 space-y-1.5 border border-border">
              <div className="flex justify-between text-xs font-bold text-sb-dark">
                <span>{item.skill}</span>
                <span>{item.score}%</span>
              </div>
              <div className="w-full bg-border rounded-full h-1.5 overflow-hidden">
                <div className={`${item.color} h-full rounded-full`} style={{ width: `${item.score}%` }} />
              </div>
              <p className="text-[10px] text-text-muted">{item.status}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Kanban Task Board */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-sb-dark flex items-center gap-2">
            <Layers size={18} className="text-sb-green" /> Sprint Task Board
          </h3>
          <button
            onClick={() => setShowTaskInput(true)}
            className="px-3 py-1.5 bg-sb-dark hover:bg-sb-green text-white text-xs font-semibold rounded-lg shadow-sm transition-all flex items-center gap-1.5"
          >
            <Plus size={14} /> Add Sprint Task
          </button>
        </div>

        {showTaskInput && (
          <form
            onSubmit={handleAddTask}
            className="bg-white p-4 rounded-2xl border border-sb-green shadow-md flex flex-col md:flex-row gap-3 items-center animate-fade-in"
          >
            <input
              type="text"
              placeholder="Task title (e.g. Implement real-time notifications)..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="flex-1 p-2.5 bg-surface rounded-xl text-xs border border-border focus:outline-none focus:border-sb-green"
              required
            />
            <select
              value={newTaskAssignee}
              onChange={(e) => setNewTaskAssignee(e.target.value)}
              className="p-2.5 bg-surface rounded-xl text-xs border border-border focus:outline-none"
            >
              <option value="Praveen">Praveen</option>
              <option value="Utkarsh">Utkarsh</option>
              <option value="Ashmit">Ashmit</option>
              <option value="Shaurya">Shaurya</option>
            </select>
            <select
              value={newTaskTag}
              onChange={(e) => setNewTaskTag(e.target.value)}
              className="p-2.5 bg-surface rounded-xl text-xs border border-border focus:outline-none"
            >
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Database">Database</option>
              <option value="Research">Research</option>
              <option value="Mentorship">Mentorship</option>
            </select>
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-sb-green text-white text-xs font-semibold rounded-xl shadow-sm hover:bg-sb-dark transition-all"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setShowTaskInput(false)}
                className="px-3 py-2 text-xs text-text-secondary hover:text-sb-dark"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* To Do Column */}
          <div className="bg-surface rounded-2xl p-4 border border-border space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <span className="text-xs font-bold text-sb-dark uppercase tracking-wider">
                To Do ({tasks.filter((t) => t.status === "todo").length})
              </span>
            </div>
            <div className="space-y-2.5">
              {tasks
                .filter((t) => t.status === "todo")
                .map((task) => (
                  <div
                    key={task.id}
                    className="bg-white p-3.5 rounded-xl border border-border shadow-xs space-y-2 hover:shadow-sm transition-all"
                  >
                    <p className="text-xs font-medium text-sb-dark leading-snug">{task.title}</p>
                    <div className="flex items-center justify-between pt-1 text-[11px]">
                      <Badge variant="outline" size="sm">{task.tag}</Badge>
                      <span className="text-text-muted font-medium">@{task.assignee}</span>
                    </div>
                    <button
                      onClick={() => moveTask(task.id, "in_progress")}
                      className="w-full mt-1 py-1 text-[11px] text-sb-green font-semibold bg-sb-bg rounded-lg hover:bg-sb-wash/60 transition-all text-center"
                    >
                      Start Task →
                    </button>
                  </div>
                ))}
            </div>
          </div>

          {/* In Progress Column */}
          <div className="bg-surface rounded-2xl p-4 border border-border space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <span className="text-xs font-bold text-sb-dark uppercase tracking-wider">
                In Progress ({tasks.filter((t) => t.status === "in_progress").length})
              </span>
            </div>
            <div className="space-y-2.5">
              {tasks
                .filter((t) => t.status === "in_progress")
                .map((task) => (
                  <div
                    key={task.id}
                    className="bg-white p-3.5 rounded-xl border border-amber-200 shadow-xs space-y-2 hover:shadow-sm transition-all"
                  >
                    <p className="text-xs font-medium text-sb-dark leading-snug">{task.title}</p>
                    <div className="flex items-center justify-between pt-1 text-[11px]">
                      <Badge variant="outline" size="sm">{task.tag}</Badge>
                      <span className="text-text-muted font-medium">@{task.assignee}</span>
                    </div>
                    <button
                      onClick={() => moveTask(task.id, "done")}
                      className="w-full mt-1 py-1 text-[11px] text-white font-semibold bg-sb-green rounded-lg hover:bg-sb-dark transition-all text-center"
                    >
                      Mark Complete
                    </button>
                  </div>
                ))}
            </div>
          </div>

          {/* Done Column */}
          <div className="bg-surface rounded-2xl p-4 border border-border space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <span className="text-xs font-bold text-sb-dark uppercase tracking-wider">
                Completed ({tasks.filter((t) => t.status === "done").length})
              </span>
            </div>
            <div className="space-y-2.5">
              {tasks
                .filter((t) => t.status === "done")
                .map((task) => (
                  <div
                    key={task.id}
                    className="bg-white p-3.5 rounded-xl border border-sb-wash bg-sb-bg/30 space-y-2"
                  >
                    <p className="text-xs font-medium text-text-secondary line-through leading-snug">
                      {task.title}
                    </p>
                    <div className="flex items-center justify-between pt-1 text-[11px]">
                      <Badge variant="green" size="sm">Done</Badge>
                      <span className="text-text-muted font-medium">@{task.assignee}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
