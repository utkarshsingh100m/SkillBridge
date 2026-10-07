// ─── User / Profile ────────────────────────────────────────
export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  role: "student" | "mentor";
  headline?: string;
  location?: string;
  bio?: string;
  skills: string[];
  interests: string[];
  experience: "Beginner" | "Intermediate" | "Expert";
  availability: AvailabilitySlot[];
  availabilityLabel?: string;
  portfolioLinks?: string[];
  githubUsername?: string;
  rating?: number;
  mentorshipsCount?: number;
  verified?: boolean;
  isMentor?: boolean;
  mentorType?: ("Technical" | "Product" | "Pitch / Presentation")[];
}

export interface AvailabilitySlot {
  day: string;
  times: string[];
}

// ─── Project ───────────────────────────────────────────────
export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  domain: string;
  timeline: string;
  roles: ProjectRole[];
  creatorId: string;
  teamMembers: TeamMember[];
  status: "Active" | "Planning" | "Completed";
  hackathonDeadline?: string;
  stars?: number;
  techStack?: string;
}

export interface ProjectRole {
  title: string;
  skills: string[];
  filled: boolean;
  assignedTo?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  role: string;
}

// ─── Matching ──────────────────────────────────────────────
export interface MatchResult {
  userId: string;
  user: UserProfile;
  overallScore: number;
  breakdown: {
    skillsMatch: number;
    projectRelevance: number;
    availability: number;
    experience: number;
  };
  reasons: string[];
}

// ─── Messages ──────────────────────────────────────────────
export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unread: boolean;
  online?: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

// ─── Mentorship ────────────────────────────────────────────
export interface MentorRequest {
  id: string;
  from: {
    name: string;
    avatar: string;
    team: string;
  };
  topic: string;
  tags: string[];
  urgency: "Low" | "Medium" | "Urgent";
  status: "Pending" | "Accepted" | "Declined";
  receivedAt: string;
}

export interface MentorSession {
  id: string;
  menteeTeam: string;
  scheduledAt: string;
  duration: number;
  topic: string;
  status: "Upcoming" | "Completed" | "Cancelled";
}

// ─── Skill Gaps ────────────────────────────────────────────
export interface SkillGap {
  role: string;
  description: string;
  icon: string;
}

// ─── Navigation ────────────────────────────────────────────
export interface NavItem {
  label: string;
  href: string;
  icon: string;
}
