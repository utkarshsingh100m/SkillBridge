"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Bell,
  User,
  Settings,
  LogOut,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Menu,
} from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import { currentUser as defaultUser } from "@/lib/data";

interface NotificationItem {
  id: string;
  title: string;
  time: string;
  read: boolean;
  type: "session" | "invite" | "alert";
}

const mockNotifications: NotificationItem[] = [
  {
    id: "n1",
    title: "Mentor Rahul Sharma confirmed your 1-on-1 session for 2:00 PM today.",
    time: "10 mins ago",
    read: false,
    type: "session",
  },
  {
    id: "n2",
    title: "Arya Shukla sent a squad collaboration request for SkillBridge.",
    time: "1 hour ago",
    read: false,
    type: "invite",
  },
  {
    id: "n3",
    title: "Build With Bharat 4.0: Milestone submission opens in 6 hours.",
    time: "2 hours ago",
    read: true,
    type: "alert",
  },
];

export default function TopBar() {
  const router = useRouter();
  const [user, setUser] = useState(defaultUser);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);

  const menuRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Synchronize profile data with localStorage / events
  useEffect(() => {
    const syncUser = () => {
      try {
        const saved = localStorage.getItem("skillbridge_user");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.name === "Praveen Mishra") {
            localStorage.removeItem("skillbridge_user");
            setUser(defaultUser);
          } else {
            setUser((prev) => ({ ...prev, ...parsed }));
          }
        } else {
          setUser(defaultUser);
        }
      } catch (e) {
        console.error(e);
      }
    };
    syncUser();
    window.addEventListener("profile_updated", syncUser);
    window.addEventListener("storage", syncUser);

    return () => {
      window.removeEventListener("profile_updated", syncUser);
      window.removeEventListener("storage", syncUser);
    };
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <header className="h-16 bg-white border-b border-border flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30 shadow-xs">
      {/* Left: Mobile Menu Trigger + Search */}
      <div className="flex items-center gap-2 flex-1 max-w-md mr-3">
        <button
          onClick={() => window.dispatchEvent(new Event("open_mobile_sidebar"))}
          aria-label="Open Navigation Menu"
          className="p-2 -ml-1 rounded-xl text-text-secondary hover:bg-surface hover:text-sb-dark transition-colors md:hidden shrink-0 cursor-pointer"
        >
          <Menu size={20} />
        </button>

        {/* Search Input */}
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search mentors, projects, teammates..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-surface border border-border text-xs focus:outline-none focus:ring-2 focus:ring-sb-green/20 focus:border-sb-green transition-all"
          />
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-3">
        {/* Notification Bell with Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative p-2 rounded-xl text-text-secondary hover:bg-surface hover:text-sb-dark transition-colors cursor-pointer"
            title="Notifications"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white animate-pulse" />
            )}
          </button>

          {/* Notifications Dropdown */}
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl border border-border shadow-xl p-3 z-50 animate-scale-up space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-border px-1">
                <span className="text-xs font-bold text-sb-dark">Notifications</span>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-[11px] text-sb-green font-semibold hover:underline cursor-pointer"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-64 overflow-y-auto space-y-1.5 divide-y divide-border/60">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-2 rounded-xl transition-colors ${
                      n.read ? "bg-white text-text-secondary" : "bg-sb-bg/40 text-sb-dark font-medium"
                    }`}
                  >
                    <p className="text-xs leading-snug">{n.title}</p>
                    <span className="text-[10px] text-text-muted mt-1 block">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Pill & Dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2.5 p-1.5 pr-3 rounded-2xl hover:bg-surface border border-transparent hover:border-border transition-all cursor-pointer group"
          >
            <Avatar src={user.avatar} name={user.name} size="md" />
            <div className="text-left hidden sm:block">
              <span className="text-xs font-bold text-sb-dark group-hover:text-sb-green transition-colors block leading-tight">
                {user.name.split(" ")[0]}
              </span>
              <span className="text-[10px] text-text-muted block leading-tight">Builder Profile</span>
            </div>
            <ChevronDown size={14} className="text-text-muted group-hover:text-sb-dark transition-colors" />
          </button>

          {/* Profile Dropdown Menu */}
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl border border-border shadow-2xl p-2 z-50 animate-scale-up space-y-1">
              {/* User Header Summary */}
              <Link
                href="/dashboard/profile"
                onClick={() => setMenuOpen(false)}
                className="p-3 bg-surface rounded-xl flex items-center gap-3 hover:bg-sb-bg/60 transition-colors block"
              >
                <Avatar src={user.avatar} name={user.name} size="md" />
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-sb-dark truncate">{user.name}</h4>
                  <p className="text-[11px] text-sb-mid font-medium truncate">{user.headline || "Full-Stack Developer"}</p>
                  <span className="text-[10px] text-sb-green font-semibold flex items-center gap-1 mt-0.5">
                    <ShieldCheck size={12} /> View Full Profile
                  </span>
                </div>
              </Link>

              <div className="py-1">
                <Link
                  href="/dashboard/profile"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-text-secondary hover:text-sb-dark hover:bg-surface rounded-xl transition-colors"
                >
                  <User size={15} className="text-sb-green" />
                  <span>My Profile &amp; Skills</span>
                </Link>

                <Link
                  href="/dashboard/find-mentors"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-text-secondary hover:text-sb-dark hover:bg-surface rounded-xl transition-colors"
                >
                  <Sparkles size={15} className="text-sb-gold" />
                  <span>Find Mentors</span>
                </Link>

                <Link
                  href="/dashboard/team"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-text-secondary hover:text-sb-dark hover:bg-surface rounded-xl transition-colors"
                >
                  <Settings size={15} className="text-text-muted" />
                  <span>Team Settings</span>
                </Link>
              </div>

              <div className="pt-1 border-t border-border">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    router.push("/auth/signin");
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer text-left"
                >
                  <LogOut size={15} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
