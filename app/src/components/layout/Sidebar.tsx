"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Search,
  Users,
  FolderKanban,
  UsersRound,
  MessageSquare,
  Calendar,
  User,
  Trophy,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Find Mentors", href: "/dashboard/find-mentors", icon: Search },
  { label: "Find Teammates", href: "/dashboard/find-teammates", icon: Users },
  { label: "Hackathons", href: "/dashboard/hackathons", icon: Trophy },
  { label: "My Projects", href: "/dashboard/projects", icon: FolderKanban },
  { label: "My Team", href: "/dashboard/team", icon: UsersRound },
  { label: "Messages", href: "/dashboard/messages", icon: MessageSquare },
  { label: "Sessions", href: "/dashboard/sessions", icon: Calendar },
  { label: "Profile", href: "/dashboard/profile", icon: User },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 bg-white border-r border-border flex flex-col h-screen sticky top-0 shrink-0">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 px-5 py-5 border-b border-border">
        <img
          src="/logo.png"
          alt="SkillBridge Logo"
          className="w-8 h-8 rounded-lg object-contain shadow-xs"
        />
        <span className="font-bold text-lg text-sb-dark tracking-tight">SkillBridge</span>
      </Link>

      {/* Nav */}
      <nav className="flex-1 py-3 px-3 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? "bg-sb-bg text-sb-dark"
                  : "text-text-secondary hover:bg-surface-hover hover:text-sb-dark"
              }`}
            >
              <Icon
                size={18}
                className={`shrink-0 transition-colors ${
                  isActive ? "text-sb-green" : "text-text-muted group-hover:text-sb-mid"
                }`}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="p-4 border-t border-border">
        <div className="text-xs text-text-muted">
          © 2026 SkillBridge
          <br />
          Build With Bharat 4.0
        </div>
      </div>
    </aside>
  );
}
