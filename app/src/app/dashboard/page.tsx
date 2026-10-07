"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Zap,
  Clock,
  Plus,
  ArrowRight,
  Search,
  MoreVertical,
  Users,
  FolderKanban,
  MessageSquare,
  Calendar,
  Bot,
  Mic,
  AlertCircle,
} from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import { currentUser, projects, skillGaps } from "@/lib/data";

function useCountdown(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(targetDate).getTime();
    const tick = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      setTimeLeft({
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}

export default function DashboardPage() {
  const project = projects[0];
  const countdown = useCountdown(project.hackathonDeadline || "");
  const filledRoles = project.roles.filter((r) => r.filled).length;
  const totalRoles = project.roles.length;
  const progress = Math.round((filledRoles / totalRoles) * 100);

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
      {/* Greeting */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-sb-dark">
            Good afternoon, {currentUser.name.split(" ")[0]}
          </h1>
          <p className="text-sm text-text-secondary mt-0.5">
            Let&apos;s make progress on your project.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full text-xs font-medium text-amber-700">
            <Zap size={12} /> Hackathon Mode
          </span>
        </div>
      </div>

      {/* Active Project Card */}
      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="green" size="sm">▲ Active Project</Badge>
              </div>
              <h2 className="text-xl font-bold text-sb-dark">{project.title}</h2>
              <p className="text-sm text-text-secondary mt-1 max-w-lg">
                {project.description}
              </p>
              <div className="flex gap-2 mt-3">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="outline" size="sm">{tag}</Badge>
                ))}
              </div>
            </div>

            {/* Countdown */}
            <div className="text-right shrink-0 ml-6">
              <p className="text-xs text-text-muted mb-2">Hackathon ends in</p>
              <div className="flex gap-2">
                {[
                  { val: countdown.hours, label: "Hours" },
                  { val: countdown.minutes, label: "Minutes" },
                  { val: countdown.seconds, label: "Seconds" },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <div className="w-14 h-14 bg-sb-dark rounded-xl flex items-center justify-center">
                      <span className="text-2xl font-bold text-white font-mono">
                        {String(item.val).padStart(2, "0")}
                      </span>
                    </div>
                    <span className="text-[10px] text-text-muted mt-1 block">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-text-secondary">
                Team Members ({filledRoles}/{totalRoles})
              </span>
              <span className="text-xs font-medium text-sb-green">{progress}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-sb-green to-sb-light rounded-full transition-all duration-1000"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Missing roles */}
          <div className="mt-4 flex items-center gap-2">
            <span className="text-xs text-text-muted">Missing Roles:</span>
            {project.roles
              .filter((r) => !r.filled)
              .map((role) => (
                <Badge key={role.title} variant="amber" size="sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5 inline-block" />
                  {role.title}
                </Badge>
              ))}
          </div>

          {/* Team Members */}
          <div className="mt-6 flex items-center justify-between">
            <div className="flex -space-x-2">
              {project.teamMembers.map((member) => (
                <Avatar
                  key={member.id}
                  src={member.avatar}
                  name={member.name}
                  size="md"
                />
              ))}
              <button className="w-10 h-10 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-sb-pale hover:bg-sb-bg transition-colors">
                <Plus size={16} className="text-text-muted" />
              </button>
            </div>

            <Link
              href="/dashboard/find-mentors"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-sb-dark text-white text-sm font-medium rounded-lg hover:bg-sb-green transition-all"
            >
              Find a Mentor <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* Two Column Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Skill Gaps */}
        <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
          <h3 className="font-semibold text-sb-dark mb-4">Team Skill Gaps</h3>
          <div className="space-y-3">
            {skillGaps.map((gap) => (
              <div
                key={gap.role}
                className="flex items-center justify-between p-3 rounded-xl bg-amber-50/50 border border-amber-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-100/80 text-amber-800 flex items-center justify-center font-medium text-xs shrink-0">
                    {gap.role.includes("AI") ? <Bot size={18} /> : <Mic size={18} />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-sb-dark">{gap.role}</p>
                    <p className="text-xs text-text-muted">{gap.description}</p>
                  </div>
                </div>
                <button className="p-1.5 hover:bg-amber-100 rounded-lg transition-colors">
                  <MoreVertical size={14} className="text-text-muted" />
                </button>
              </div>
            ))}
          </div>
          <Link
            href="/dashboard/find-mentors"
            className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-sb-dark text-white text-sm font-medium rounded-xl hover:bg-sb-green transition-all"
          >
            <Search size={14} /> Find Mentor
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
          <h3 className="font-semibold text-sb-dark mb-4">Quick Actions</h3>
          <div className="space-y-3">
            {[
              { label: "Find Teammates", desc: "Search for students with matching skills", href: "/dashboard/find-teammates", icon: Users },
              { label: "Browse Projects", desc: "Discover open projects looking for team members", href: "/dashboard/projects", icon: FolderKanban },
              { label: "View Messages", desc: "Check your conversations", href: "/dashboard/messages", icon: MessageSquare },
              { label: "Schedule Session", desc: "Book a mentoring session", href: "/dashboard/sessions", icon: Calendar },
            ].map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-sb-pale hover:bg-surface-hover transition-all group"
                >
                  <div className="w-9 h-9 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-sb-dark flex items-center justify-center shrink-0 group-hover:bg-sb-green/10 group-hover:text-sb-green transition-colors">
                    <Icon size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-sb-dark group-hover:text-sb-green transition-colors">
                      {action.label}
                    </p>
                    <p className="text-xs text-text-muted">{action.desc}</p>
                  </div>
                  <ArrowRight size={14} className="text-text-muted group-hover:text-sb-green transition-colors" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
        <h3 className="font-semibold text-sb-dark mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { time: "2 hours ago", text: "Rahul Sharma accepted your mentorship request", type: "success" },
            { time: "5 hours ago", text: "New team member Ashmit joined as Database lead", type: "info" },
            { time: "1 day ago", text: "Project 'AI Healthcare Assistant' milestone updated", type: "info" },
          ].map((activity, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                activity.type === "success" ? "bg-green-500" : "bg-blue-500"
              }`} />
              <div>
                <p className="text-sm text-text-primary">{activity.text}</p>
                <p className="text-xs text-text-muted flex items-center gap-1 mt-0.5">
                  <Clock size={10} /> {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
