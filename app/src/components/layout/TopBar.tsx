"use client";

import { Search, Bell } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import { currentUser } from "@/lib/data";

export default function TopBar() {
  return (
    <header className="h-16 bg-white border-b border-border flex items-center justify-between px-6 sticky top-0 z-30">
      {/* Search */}
      <div className="relative w-96">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
        <input
          type="text"
          placeholder="Search mentors, projects, teams..."
          className="w-full pl-9 pr-4 py-2 rounded-lg bg-surface-secondary border border-border text-sm placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-sb-light/40 focus:border-sb-pale transition-all"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-lg hover:bg-surface-hover transition-colors">
          <Bell size={18} className="text-text-secondary" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <div className="flex items-center gap-2.5">
          <Avatar src={currentUser.avatar} name={currentUser.name} size="md" />
          <span className="text-sm font-medium text-text-primary">{currentUser.name.split(" ")[0]}</span>
        </div>
      </div>
    </header>
  );
}
