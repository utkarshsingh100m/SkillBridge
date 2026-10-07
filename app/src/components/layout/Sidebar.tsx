"use client";

import { useState, useEffect } from "react";
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
  X,
} from "lucide-react";

export const navItems = [
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
  const [mobileOpen, setMobileOpen] = useState(false);

  // Listen to open/close mobile sidebar events from TopBar or other components
  useEffect(() => {
    const handleOpen = () => setMobileOpen(true);
    const handleClose = () => setMobileOpen(false);

    window.addEventListener("open_mobile_sidebar", handleOpen);
    window.addEventListener("close_mobile_sidebar", handleClose);

    return () => {
      window.removeEventListener("open_mobile_sidebar", handleOpen);
      window.removeEventListener("close_mobile_sidebar", handleClose);
    };
  }, []);

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navContent = (
    <>
      {/* Logo */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-border">
        <Link href="/" className="flex items-center gap-2.5">
          <img
            src="/logo.png"
            alt="SkillBridge Logo"
            className="w-8 h-8 rounded-lg object-contain shadow-xs"
          />
          <span className="font-bold text-lg text-sb-dark tracking-tight">SkillBridge</span>
        </Link>
        {mobileOpen && (
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation menu"
            className="p-1.5 rounded-lg text-text-muted hover:text-sb-dark hover:bg-surface transition-colors md:hidden"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Nav links */}
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
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? "bg-sb-bg text-sb-dark font-semibold shadow-2xs"
                  : "text-text-secondary hover:bg-surface-hover hover:text-sb-dark"
              }`}
            >
              <Icon
                size={18}
                className={`shrink-0 transition-colors ${
                  isActive ? "text-sb-green" : "text-text-muted group-hover:text-sb-mid"
                }`}
              />
              <span>{item.label}</span>
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
    </>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden md:flex w-60 bg-white border-r border-border flex-col h-screen sticky top-0 shrink-0 z-20">
        {navContent}
      </aside>

      {/* Mobile Slide-out Drawer & Backdrop */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer content */}
          <aside className="relative w-72 max-w-[85vw] bg-white h-full flex flex-col shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            {navContent}
          </aside>
        </div>
      )}
    </>
  );
}
