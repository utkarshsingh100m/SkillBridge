import {
  UserProfile,
  Project,
  MatchResult,
  Conversation,
  Message,
  MentorRequest,
  MentorSession,
  SkillGap,
} from "./types";

// ─── Current User (Praveen) ────────────────────────────────
export const currentUser: UserProfile = {
  id: "u1",
  name: "Utkarsh",
  avatar: "/avatars/utkarsh.jpg",
  role: "student",
  headline: "Full-Stack Developer | React & Node.js",
  location: "New Delhi, India",
  bio: "Computer Science student passionate about building AI-powered tools for education and accessibility. Currently working on a smart tutoring platform for underprivileged students.",
  skills: ["React", "Next.js", "Node.js", "TypeScript", "TailwindCSS", "MongoDB"],
  interests: ["Education Tech", "AI/ML", "Web Development"],
  experience: "Intermediate",
  availability: [
    { day: "Mon", times: ["10:00 AM", "02:00 PM"] },
    { day: "Wed", times: ["10:00 AM", "02:00 PM", "04:00 PM"] },
    { day: "Fri", times: ["10:00 AM", "02:00 PM"] },
    { day: "Sat", times: ["10:00 AM", "02:00 PM", "04:00 PM"] },
  ],
  availabilityLabel: "Available now",
  githubUsername: "utkarshsingh100m",
  rating: 4.5,
};

// ─── Mentors ───────────────────────────────────────────────
export const mentors: UserProfile[] = [
  {
    id: "m1",
    name: "Rahul Sharma",
    avatar: "/avatars/rahul.jpg",
    role: "mentor",
    headline: "Senior AI Engineer | Ex-Google",
    location: "Bengaluru, India",
    bio: "AI Engineer with 5+ years of experience building ML and GenAI products. I love mentoring student teams and helping them solve real-world problems during hackathons.",
    skills: ["Python", "Machine Learning", "GenAI", "LLM", "RAG", "FastAPI"],
    interests: ["Healthcare AI", "EdTech", "NLP"],
    experience: "Expert",
    availability: [
      { day: "Tue", times: ["10:00 AM"] },
      { day: "Wed", times: ["10:00 AM", "02:00 PM", "04:00 PM"] },
      { day: "Thu", times: ["02:00 PM"] },
      { day: "Fri", times: ["10:00 AM"] },
      { day: "Sat", times: ["10:00 AM"] },
    ],
    availabilityLabel: "Available now",
    rating: 4.9,
    mentorshipsCount: 24,
    verified: true,
    isMentor: true,
    mentorType: ["Technical"],
  },
  {
    id: "m2",
    name: "Dr. Elena Rostova",
    avatar: "/avatars/elena.jpg",
    role: "mentor",
    headline: "Research Scientist | AI/ML",
    location: "Delhi, India",
    bio: "Research scientist specializing in machine learning applications in healthcare. Published 15+ papers on medical AI.",
    skills: ["Machine Learning", "Data Science", "Python", "TensorFlow", "Research"],
    interests: ["Medical AI", "Computer Vision", "Research Methodology"],
    experience: "Expert",
    availability: [
      { day: "Mon", times: ["02:00 PM"] },
      { day: "Thu", times: ["10:00 AM", "04:00 PM"] },
    ],
    availabilityLabel: "Available in 2h",
    rating: 4.8,
    mentorshipsCount: 18,
    verified: true,
    isMentor: true,
    mentorType: ["Technical", "Product"],
  },
  {
    id: "m3",
    name: "Aman Verma",
    avatar: "/avatars/aman.jpg",
    role: "mentor",
    headline: "Product Manager | Ex-Microsoft",
    location: "Pune, India",
    bio: "Product manager with experience in building consumer products. I help teams define their product story and pitch it effectively.",
    skills: ["Product Strategy", "UX", "Go-to-Market", "User Research", "Pitch Decks"],
    interests: ["EdTech", "SaaS", "Product-Led Growth"],
    experience: "Expert",
    availability: [
      { day: "Wed", times: ["10:00 AM"] },
      { day: "Sat", times: ["10:00 AM", "02:00 PM"] },
    ],
    availabilityLabel: "Available Mon+",
    rating: 4.7,
    mentorshipsCount: 22,
    verified: true,
    isMentor: true,
    mentorType: ["Product", "Pitch / Presentation"],
  },
  {
    id: "m4",
    name: "Neha Singh",
    avatar: "/avatars/neha.jpg",
    role: "mentor",
    headline: "Full Stack Engineer | Ex-Amazon",
    location: "Hyderabad, India",
    bio: "Full stack engineer passionate about system design and scalable architectures. Love helping students build production-ready applications.",
    skills: ["React", "Node.js", "System Design", "AWS", "PostgreSQL"],
    interests: ["Web Development", "Cloud Architecture", "Open Source"],
    experience: "Expert",
    availability: [
      { day: "Tue", times: ["04:00 PM"] },
      { day: "Thu", times: ["10:00 AM"] },
    ],
    availabilityLabel: "Available today",
    rating: 4.6,
    mentorshipsCount: 16,
    verified: true,
    isMentor: true,
    mentorType: ["Technical"],
  },
  {
    id: "m5",
    name: "Priya Kapoor",
    avatar: "/avatars/neha.jpg",
    role: "mentor",
    headline: "Design Lead | Figma Expert",
    location: "Bengaluru, India",
    bio: "Design lead with 8 years experience in UX/UI. Expert in design systems and rapid prototyping for hackathons.",
    skills: ["UI/UX", "Figma", "Design Systems", "User Research", "Prototyping"],
    interests: ["Design Thinking", "Accessibility", "Mobile Design"],
    experience: "Expert",
    availability: [
      { day: "Mon", times: ["10:00 AM", "02:00 PM"] },
      { day: "Wed", times: ["04:00 PM"] },
    ],
    availabilityLabel: "Available now",
    rating: 4.8,
    mentorshipsCount: 20,
    verified: true,
    isMentor: true,
    mentorType: ["Product"],
  },
];

// ─── Match Results for Mentors ─────────────────────────────
export const mentorMatches: MatchResult[] = [
  {
    userId: "m1",
    user: mentors[0],
    overallScore: 94,
    breakdown: { skillsMatch: 96, projectRelevance: 92, availability: 98, experience: 90 },
    reasons: [
      "Strong AI/ML expertise",
      "Relevant hackathon experience",
      "Available during your timeline",
      "Has mentored 12+ student teams",
    ],
  },
  {
    userId: "m2",
    user: mentors[1],
    overallScore: 91,
    breakdown: { skillsMatch: 93, projectRelevance: 95, availability: 82, experience: 94 },
    reasons: [
      "Deep healthcare AI experience",
      "Published research in medical ML",
      "Strong data science background",
    ],
  },
  {
    userId: "m3",
    user: mentors[2],
    overallScore: 87,
    breakdown: { skillsMatch: 78, projectRelevance: 88, availability: 90, experience: 92 },
    reasons: [
      "Product strategy expertise",
      "Can help refine your pitch",
      "Experience with hackathon judging",
    ],
  },
  {
    userId: "m4",
    user: mentors[3],
    overallScore: 84,
    breakdown: { skillsMatch: 90, projectRelevance: 78, availability: 85, experience: 83 },
    reasons: [
      "Strong full-stack alignment",
      "System design expertise for scaling",
      "Available this week",
    ],
  },
  {
    userId: "m5",
    user: mentors[4],
    overallScore: 80,
    breakdown: { skillsMatch: 70, projectRelevance: 82, availability: 88, experience: 80 },
    reasons: [
      "UX/UI expertise for polishing your demo",
      "Rapid prototyping skills",
      "Available now",
    ],
  },
];

// ─── Teammates ─────────────────────────────────────────────
export const teammates: UserProfile[] = [
  {
    id: "t1",
    name: "Arya Tripathi",
    avatar: "/avatars/arya.jpg",
    role: "student",
    headline: "Frontend Developer | React Enthusiast",
    skills: ["React", "TypeScript", "TailwindCSS", "Figma", "Healthcare"],
    interests: ["Healthcare", "UI/UX", "Open Source"],
    experience: "Intermediate",
    availability: [{ day: "Sat", times: ["10:00 AM", "02:00 PM"] }, { day: "Sun", times: ["10:00 AM"] }],
    availabilityLabel: "Weekends",
    rating: 4.3,
  },
  {
    id: "t2",
    name: "Praveen Mishra",
    avatar: "/avatars/aman.jpg",
    role: "student",
    headline: "Backend Developer | Python & FastAPI",
    skills: ["Python", "FastAPI", "PostgreSQL", "Docker", "Redis"],
    interests: ["Backend Systems", "DevOps", "API Design"],
    experience: "Intermediate",
    availability: [{ day: "Mon", times: ["04:00 PM"] }, { day: "Wed", times: ["04:00 PM"] }],
    availabilityLabel: "Evenings",
    rating: 4.1,
  },
  {
    id: "t3",
    name: "Gauravi Mishra",
    avatar: "/avatars/aanya.jpg",
    role: "student",
    headline: "ML Engineer | Data Science",
    skills: ["Python", "TensorFlow", "NLP", "Data Analysis", "Jupyter"],
    interests: ["AI/ML", "NLP", "Research"],
    experience: "Intermediate",
    availability: [{ day: "Tue", times: ["10:00 AM"] }, { day: "Thu", times: ["10:00 AM", "02:00 PM"] }],
    availabilityLabel: "Available today",
    rating: 4.4,
  },
];

export const teammateMatches: MatchResult[] = [
  {
    userId: "t1",
    user: teammates[0],
    overallScore: 89,
    breakdown: { skillsMatch: 92, projectRelevance: 90, availability: 85, experience: 88 },
    reasons: ["Strong React skills match your project", "Healthcare interest aligns", "Weekend availability overlaps"],
  },
  {
    userId: "t2",
    user: teammates[1],
    overallScore: 85,
    breakdown: { skillsMatch: 88, projectRelevance: 82, availability: 80, experience: 90 },
    reasons: ["Backend skills complement your frontend", "Strong API design experience", "Docker/DevOps adds value"],
  },
  {
    userId: "t3",
    user: teammates[2],
    overallScore: 82,
    breakdown: { skillsMatch: 80, projectRelevance: 88, availability: 78, experience: 82 },
    reasons: ["ML expertise for your AI features", "NLP can enhance healthcare analysis", "Research background"],
  },
];

// ─── Projects ──────────────────────────────────────────────
export const projects: Project[] = [
  {
    id: "p1",
    title: "SkillBridge",
    description:
      "SkillBridge is a modern tech-driven platform designed to bridge the gap between students and experienced mentors. It utilizes intelligent matching algorithms to connect mentees with the right mentors based on skills, interests, and availability.",
    tags: ["AI/ML", "Ed-Tech", "Web App"],
    domain: "Ed-Tech",
    timeline: "Build With Bharat 4.0",
    roles: [
      { title: "Frontend", skills: ["React", "Next.js"], filled: true, assignedTo: "u1" },
      { title: "Backend", skills: ["Node.js", "Express"], filled: true, assignedTo: "t2" },
      { title: "Database", skills: ["PostgreSQL", "Redis"], filled: true, assignedTo: "t2" },
      { title: "Research", skills: ["NLP", "Medical AI"], filled: true, assignedTo: "t3" },
      { title: "AI/ML Mentor", skills: ["RAG", "LLM"], filled: false },
      { title: "Pitch Mentor", skills: ["Presentation", "Story"], filled: false },
    ],
    creatorId: "u1",
    teamMembers: [
      { id: "u1", name: "Utkarsh", avatar: "/avatars/utkarsh.jpg", role: "Frontend & Lead" },
      { id: "t1", name: "Arya", avatar: "/avatars/aanya.jpg", role: "Mobile Dev" },
      { id: "t2", name: "Praveen", avatar: "/avatars/vikram.jpg", role: "Backend" },
      { id: "t3", name: "Shaurya", avatar: "/avatars/shaurya.jpg", role: "Research" },
      { id: "t4", name: "Rudraksh", avatar: "/avatars/rudraksh.jpg", role: "Design" },
    ],
    status: "Active",
    hackathonDeadline: "2026-10-09T18:00:00+05:30",
  },
  {
    id: "p2",
    title: "Smart Meal Planner",
    description: "AI-powered nutrition planner that suggests personalized meal plans based on dietary requirements and local cuisine availability.",
    tags: ["AI/ML", "Health", "Mobile"],
    domain: "Health & Wellness",
    timeline: "2 weeks",
    roles: [
      { title: "Mobile Dev", skills: ["React Native", "Flutter"], filled: true },
      { title: "Backend", skills: ["Python", "FastAPI"], filled: false },
      { title: "ML Engineer", skills: ["NLP", "Recommendation"], filled: false },
    ],
    creatorId: "t1",
    teamMembers: [
      { id: "t1", name: "Arya Shukla", avatar: "/avatars/aanya.jpg", role: "Mobile Dev" },
    ],
    status: "Planning",
    stars: 856,
    techStack: "React Native",
  },
  {
    id: "p3",
    title: "Blockchain Voting System",
    description: "Decentralized voting platform for campus elections ensuring transparency and anonymity.",
    tags: ["Blockchain", "Smart Contracts", "Web3"],
    domain: "Governance",
    timeline: "4 weeks",
    roles: [
      { title: "Smart Contract Dev", skills: ["Solidity", "Ethereum"], filled: true },
      { title: "Frontend", skills: ["React", "Web3.js"], filled: false },
    ],
    creatorId: "t2",
    teamMembers: [
      { id: "t2", name: "Vikram Reddy", avatar: "/avatars/vikram.jpg", role: "Smart Contract Dev" },
    ],
    status: "Planning",
    stars: 1200,
    techStack: "Solidity",
  },
];

// ─── Conversations ─────────────────────────────────────────
export const conversations: Conversation[] = [
  {
    id: "c1",
    participantId: "m1",
    participantName: "Rahul Sharma",
    participantAvatar: "/avatars/rahul.jpg",
    lastMessage: "Hey! What are you stuck with?",
    lastMessageTime: "10:24 AM",
    unread: true,
    online: true,
  },
  {
    id: "c2",
    participantId: "t1",
    participantName: "Team Alpha",
    participantAvatar: "/avatars/aanya.jpg",
    lastMessage: "Sounds good, let's connect.",
    lastMessageTime: "1 hour ago",
    unread: false,
    online: false,
  },
  {
    id: "c3",
    participantId: "m2",
    participantName: "Dr. Elena Rostova",
    participantAvatar: "/avatars/elena.jpg",
    lastMessage: "I can help with the data pipeline.",
    lastMessageTime: "3 hours ago",
    unread: false,
    online: false,
  },
  {
    id: "c4",
    participantId: "m3",
    participantName: "Aman Verma",
    participantAvatar: "/avatars/aman.jpg",
    lastMessage: "Let's discuss tomorrow.",
    lastMessageTime: "1 day ago",
    unread: false,
    online: false,
  },
];

export const chatMessages: Message[] = [
  {
    id: "msg1",
    senderId: "m1",
    content: "Rahul Sharma\nHey! What are you stuck with?",
    timestamp: "10:24 AM",
    isOwn: false,
  },
  {
    id: "msg2",
    senderId: "u1",
    content: "We're having an issue with our RAG pipeline for medical documents. Could you please guide us on the architecture?",
    timestamp: "10:25 AM",
    isOwn: true,
  },
  {
    id: "msg3",
    senderId: "m1",
    content: "Sure! Send me your current approach and your dataset details.",
    timestamp: "10:26 AM",
    isOwn: false,
  },
];

// ─── Mentor Requests (for Mentor Dashboard) ────────────────
export const mentorRequests: MentorRequest[] = [
  {
    id: "mr1",
    from: {
      name: "Team Alpha",
      avatar: "/avatars/aanya.jpg",
      team: "AI Healthcare Assistant",
    },
    topic: "RAG pipeline architecture guidance",
    tags: ["AI/ML", "Healthcare", "Web App"],
    urgency: "Urgent",
    status: "Pending",
    receivedAt: "Hackathon ends in 11 hours",
  },
  {
    id: "mr2",
    from: {
      name: "Team Nova",
      avatar: "/avatars/vikram.jpg",
      team: "Smart Meal App",
    },
    topic: "API design and database optimization",
    tags: ["Backend", "API", "PostgreSQL"],
    urgency: "Medium",
    status: "Pending",
    receivedAt: "2 hours ago",
  },
  {
    id: "mr3",
    from: {
      name: "Team Horizon",
      avatar: "/avatars/sneha.jpg",
      team: "Blockchain Voting System",
    },
    topic: "Smart contract security review",
    tags: ["Architecture", "Smart Contracts"],
    urgency: "Low",
    status: "Pending",
    receivedAt: "5 hours ago",
  },
];

export const mentorSessions: MentorSession[] = [
  { id: "s1", menteeTeam: "Team Alpha", scheduledAt: "Today, 2:00 PM", duration: 30, topic: "RAG Architecture Review", status: "Upcoming" },
  { id: "s2", menteeTeam: "Team Nova", scheduledAt: "Today, 4:00 PM", duration: 45, topic: "API Design Patterns", status: "Upcoming" },
  { id: "s3", menteeTeam: "Team Zenith", scheduledAt: "Yesterday, 11:00 AM", duration: 30, topic: "Model Selection", status: "Completed" },
];

// ─── Skill Gaps ────────────────────────────────────────────
export const skillGaps: SkillGap[] = [
  {
    role: "AI/ML Mentor",
    description: "Needed for model development",
    icon: "bot",
  },
  {
    role: "Pitch Mentor",
    description: "Needed for presentation and product story",
    icon: "mic",
  },
];

// ─── Mentor Recent Projects (for profile) ──────────────────
export const mentorProjects = [
  {
    title: "RAG-based Document Assistant",
    description: "AI powered document Q&A system",
    techStack: "Python",
    stars: 1200,
    type: "AI/ML",
  },
  {
    title: "Healthcare Diagnosis Model",
    description: "Early disease prediction using ML",
    techStack: "Research",
    stars: 856,
    type: "Healthcare",
  },
  {
    title: "LLM App Platform",
    description: "Full stack GenAI application",
    techStack: "Next.js",
    stars: 2100,
    type: "GenAI",
  },
];
