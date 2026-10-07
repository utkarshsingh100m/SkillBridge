"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Trophy,
  Search,
  Filter,
  Clock,
  Users,
  MapPin,
  ExternalLink,
  Zap,
  Globe,
  Calendar,
  Tag,
  ChevronRight,
  Star,
  Bookmark,
  BookmarkCheck,
  Sparkles,
  Share2,
  CheckCircle2,
  AlertCircle,
  Plus,
  Flame,
  Award,
  Layers,
  ArrowUpRight,
  X,
  Code2,
  Briefcase,
  HeartHandshake,
} from "lucide-react";

interface Hackathon {
  id: string;
  title: string;
  tagline: string;
  organizer: string;
  organizerLogo?: string;
  bannerGradient: string;
  status: "ongoing" | "upcoming" | "closing_soon" | "past";
  mode: "Online" | "In-Person" | "Hybrid";
  location?: string;
  startDate: string;
  endDate: string;
  regDeadline: string;
  prizePool: string;
  prizePoolValue: number; // for sorting
  teamSize: string;
  domain: string[];
  tags: string[];
  matchScore: number;
  featured?: boolean;
  participantsCount: number;
  description: string;
  registrationUrl: string;
  tracks: { title: string; prize: string; desc: string }[];
  timeline: { title: string; date: string; completed?: boolean }[];
  prizes: { rank: string; reward: string; description: string }[];
  eligibility: string;
}

const HACKATHONS_DATA: Hackathon[] = [
  {
    id: "sih-2026",
    title: "Smart India Hackathon 2026 (Software Edition)",
    tagline: "World's biggest open innovation hackathon by Govt. of India & AICTE.",
    organizer: "Ministry of Education & AICTE",
    bannerGradient: "from-blue-600 via-indigo-600 to-violet-700",
    status: "ongoing",
    mode: "Hybrid",
    location: "Nodal Centers across India",
    startDate: "May 10, 2026",
    endDate: "May 12, 2026",
    regDeadline: "May 08, 2026",
    prizePool: "₹1,00,00,000",
    prizePoolValue: 10000000,
    teamSize: "6 Members (Min 1 Female)",
    domain: ["Open Innovation", "AI/ML", "GovTech", "HealthTech"],
    tags: ["Govt of India", "Hardware/Software", "Grand Finale", "AICTE"],
    matchScore: 98,
    featured: true,
    participantsCount: 42500,
    description:
      "Smart India Hackathon is a nationwide initiative to provide students a platform to solve some of the pressing problems we face in our daily lives, and inculcate a culture of product innovation and a mindset of problem solving across 50+ central ministries and state departments.",
    registrationUrl: "https://sih.gov.in",
    tracks: [
      { title: "Smart Automation & Robotics", prize: "₹1,00,000 / problem", desc: "Automating civic services and industrial inspection using edge AI." },
      { title: "Clean & Green Technology", prize: "₹1,00,000 / problem", desc: "Renewable energy distribution, e-waste monitoring and smart water systems." },
      { title: "Disaster Management & HealthTech", prize: "₹1,00,000 / problem", desc: "AI early warning systems and telemedicine in remote terrains." },
    ],
    timeline: [
      { title: "Internal College Screening", date: "April 20, 2026", completed: true },
      { title: "Problem Statement Selection", date: "May 02, 2026", completed: true },
      { title: "Grand Finale 36h Coding", date: "May 10 - 12, 2026", completed: false },
    ],
    prizes: [
      { rank: "Winner per Problem Statement", reward: "₹1,00,000", description: "Cash prize + National felicitation + Ministry incubation" },
      { rank: "1st Runner Up", reward: "₹75,000", description: "Cash prize + Certificate of Excellence" },
      { rank: "Special Jury Award", reward: "₹50,000", description: "Best innovative prototype" },
    ],
    eligibility: "Regular college students pursuing graduation or post-graduation in India.",
  },
  {
    id: "ethindia-2026",
    title: "ETHIndia 2026 — Asia's Premier Ethereum Hackathon",
    tagline: "Build the decentralized future alongside 2,000+ top Web3 builders.",
    organizer: "Devfolio & ETHGlobal",
    bannerGradient: "from-cyan-600 via-teal-600 to-emerald-700",
    status: "closing_soon",
    mode: "In-Person",
    location: "KTPO, Bengaluru",
    startDate: "May 22, 2026",
    endDate: "May 24, 2026",
    regDeadline: "May 14, 2026",
    prizePool: "$150,000+",
    prizePoolValue: 12500000,
    teamSize: "2 - 4 Members",
    domain: ["Web3 & Blockchain", "FinTech", "AI/ML"],
    tags: ["Solidity", "Zero-Knowledge", "DeFi", "Account Abstraction"],
    matchScore: 94,
    featured: true,
    participantsCount: 2200,
    description:
      "ETHIndia is the flagship Ethereum hackathon of Asia. Join developers, founders, and creators for an unforgettable 36 hours of hacking on Ethereum, Layer 2s, Account Abstraction, ZK Proofs, and decentralized AI integrations with hands-on mentor support.",
    registrationUrl: "https://ethindia.co",
    tracks: [
      { title: "DeFi & Real World Assets", prize: "$25,000", desc: "Next-gen yield protocols, cross-chain swaps, and tokenized RWAs." },
      { title: "Autonomous AI Agents on Web3", prize: "$30,000", desc: "Autonomous on-chain bots with verifiable inference." },
      { title: "ZK & Privacy Tooling", prize: "$20,000", desc: "Private voting, zero-knowledge identity, and anonymous attestations." },
    ],
    timeline: [
      { title: "Hacker Applications Open", date: "April 01, 2026", completed: true },
      { title: "Application Review & RSVPs", date: "May 14, 2026", completed: false },
      { title: "Hacking Starts in Bengaluru", date: "May 22, 2026", completed: false },
    ],
    prizes: [
      { rank: "Overall Grand Prize", reward: "$15,000", description: "Top hack across all tracks + direct entry to accelerator" },
      { rank: "Sponsor Bounties (Polygon, Arbitrum, Base)", reward: "$100,000+", description: "Distributed among 40+ specific track winners" },
      { rank: "Pool Prize for All Qualified Submissions", reward: "$15,000", description: "Shared among valid hacks" },
    ],
    eligibility: "Open to developers worldwide. Free food, lodging support & hacker swag provided.",
  },
  {
    id: "google-solution-challenge-2026",
    title: "Google Solution Challenge 2026",
    tagline: "Build solutions for the UN 17 Sustainable Development Goals using Google tech.",
    organizer: "Google Developer Student Clubs (GDSC)",
    bannerGradient: "from-amber-500 via-orange-600 to-rose-600",
    status: "ongoing",
    mode: "Online",
    startDate: "May 01, 2026",
    endDate: "June 15, 2026",
    regDeadline: "May 20, 2026",
    prizePool: "$50,000 + Google Mentorship",
    prizePoolValue: 4100000,
    teamSize: "1 - 4 Members",
    domain: ["AI/ML", "Open Innovation", "EdTech", "HealthTech"],
    tags: ["Gemini API", "Flutter", "Firebase", "TensorFlow", "UN SDGs"],
    matchScore: 96,
    featured: true,
    participantsCount: 18400,
    description:
      "The Solution Challenge invites university students around the world to develop solutions for one or more of the United Nations 17 Sustainable Development Goals using one or more Google products or platforms.",
    registrationUrl: "https://developers.google.com/community/gdsc-solution-challenge",
    tracks: [
      { title: "Climate Action & Clean Water (SDG 6 & 13)", prize: "Top 3: $3,000 per member", desc: "Sensors & satellite data for environmental preservation." },
      { title: "Good Health & Well-being (SDG 3)", prize: "Top 3: $3,000 per member", desc: "Accessible diagnostic tools with multimodal Gemini AI." },
      { title: "Quality Education & Inclusivity (SDG 4)", prize: "Top 3: $3,000 per member", desc: "Voice/vernacular education agents for rural schools." },
    ],
    timeline: [
      { title: "Phase 1: Project Submission", date: "May 20, 2026", completed: false },
      { title: "Top 100 Mentorship Phase", date: "June 01, 2026", completed: false },
      { title: "Global Demo Day", date: "July 2026", completed: false },
    ],
    prizes: [
      { rank: "Top 3 Global Winners", reward: "$12,000 / team", description: "Direct mentorship with Google Directors + Google Cloud credits" },
      { rank: "Top 10 Finalists", reward: "$4,000 / team", description: "Google Hardware swag pack + 1-year Cloud Subscription" },
      { rank: "Top 100 Semi-Finalists", reward: "Certificates & Swag", description: "Official Google Global recognition" },
    ],
    eligibility: "Active university / college students affiliated with a GDSC or recognized college.",
  },
  {
    id: "flipkart-grid-7",
    title: "Flipkart GRiD 7.0 — Robotics & Tech Challenge",
    tagline: "India's premier engineering campus challenge with PPOs for top teams.",
    organizer: "Flipkart",
    bannerGradient: "from-blue-700 via-yellow-600 to-amber-600",
    status: "upcoming",
    mode: "Hybrid",
    location: "Flipkart HQ, Bengaluru",
    startDate: "June 01, 2026",
    endDate: "July 25, 2026",
    regDeadline: "May 30, 2026",
    prizePool: "₹15,00,000 + Pre-Placement Offers (PPO)",
    prizePoolValue: 1500000,
    teamSize: "2 - 3 Members",
    domain: ["AI/ML", "Cybersecurity", "IoT / Hardware"],
    tags: ["Robotics", "Computer Vision", "Information Security", "PPO Careers"],
    matchScore: 91,
    participantsCount: 35000,
    description:
      "Flipkart GRiD is Flipkart's Flagship Engineering Campus Challenge that tests students on real industry problem statements in Robotics, Smart Vision in Logistics, and Information Security, backed by direct PPI / PPO opportunities for winners.",
    registrationUrl: "https://unstop.com",
    tracks: [
      { title: "Software Development Track", prize: "₹5,00,000 + PPO", desc: "High-throughput microservice architecture under billion-event load." },
      { title: "Robotics & Computer Vision Track", prize: "₹5,00,000 + PPO", desc: "Real-time automated parcel dimensioning and OCR sorting." },
      { title: "Information Security Track", prize: "₹5,00,000 + PPO", desc: "Adversarial bot detection and zero-trust authentication." },
    ],
    timeline: [
      { title: "Level 1: E-Commerce & Tech Quiz", date: "June 05, 2026", completed: false },
      { title: "Level 2: Proof of Concept Prototype", date: "June 25, 2026", completed: false },
      { title: "Level 3: Grand Finale at Flipkart HQ", date: "July 25, 2026", completed: false },
    ],
    prizes: [
      { rank: "National Winners", reward: "₹5,00,000", description: "Full-time PPO / Internship + Trophy" },
      { rank: "First Runners Up", reward: "₹3,00,000", description: "Direct Interview for SDE roles" },
      { rank: "Second Runners Up", reward: "₹1,50,000", description: "Direct Interview Opportunity" },
    ],
    eligibility: "B.Tech/B.E./M.Tech students passing out in 2026, 2027, or 2028.",
  },
  {
    id: "hackmit-2026",
    title: "HackMIT 2026",
    tagline: "MIT's legendary weekend hackathon bringing over 1,000 international builders to Cambridge.",
    organizer: "Massachusetts Institute of Technology",
    bannerGradient: "from-rose-600 via-red-600 to-zinc-900",
    status: "upcoming",
    mode: "Hybrid",
    location: "MIT Campus, Cambridge MA & Online",
    startDate: "September 18, 2026",
    endDate: "September 20, 2026",
    regDeadline: "August 15, 2026",
    prizePool: "$35,000+",
    prizePoolValue: 2900000,
    teamSize: "1 - 4 Members",
    domain: ["AI/ML", "HealthTech", "Cybersecurity", "Open Innovation"],
    tags: ["MIT", "Global Hack", "Travel Grants", "Beginner Friendly"],
    matchScore: 88,
    participantsCount: 1200,
    description:
      "HackMIT is MIT's annual hackathon taking place in the fall. We bring together over 1,000 students from around the world to create groundbreaking software and hardware hacks, supported by world-class mentors from Silicon Valley and Boston tech hubs.",
    registrationUrl: "https://hackmit.org",
    tracks: [
      { title: "General Hack Track", prize: "$10,000", desc: "Open to any audacious tech concept." },
      { title: "Assistive Technology & Health", prize: "$8,000", desc: "Tools assisting neurodivergent or mobility-challenged users." },
      { title: "Next-Gen AI Interfaces", prize: "$7,000", desc: "Haptic, spatial, and voice-first computing models." },
    ],
    timeline: [
      { title: "Admissions Round 1", date: "July 15, 2026", completed: false },
      { title: "Travel Grant Decision", date: "August 01, 2026", completed: false },
      { title: "HackMIT Weekend", date: "Sept 18 - 20, 2026", completed: false },
    ],
    prizes: [
      { rank: "1st Place Overall", reward: "$10,000", description: "Cash prize + MIT Sandbox venture grant interview" },
      { rank: "Best Hardware Hack", reward: "$4,000", description: "Sponsored hardware gear + Cash" },
    ],
    eligibility: "Undergraduate and graduate students globally. Virtual and in-person admissions.",
  },
  {
    id: "unfold-2026",
    title: "Unfold 2026 — Web3 & Generative AI Nexus",
    tagline: "CoinDCX's premier developer summit and 48-hour builder hackathon.",
    organizer: "CoinDCX & Okto",
    bannerGradient: "from-purple-600 via-pink-600 to-rose-500",
    status: "closing_soon",
    mode: "In-Person",
    location: "Whitefield, Bengaluru",
    startDate: "May 29, 2026",
    endDate: "May 31, 2026",
    regDeadline: "May 18, 2026",
    prizePool: "$75,000",
    prizePoolValue: 6200000,
    teamSize: "2 - 4 Members",
    domain: ["Web3 & Blockchain", "FinTech", "AI/ML"],
    tags: ["Embedded Wallets", "DeFi", "Telegram Mini Apps", "AI Co-pilot"],
    matchScore: 92,
    participantsCount: 1500,
    description:
      "Unfold 2026 unites developers to explore the convergence of seamless Web3 UX (Account Abstraction & MPC) with on-chain AI assistants. Build apps that abstract blockchain complexity for 100M+ new users.",
    registrationUrl: "https://unfold.coindcx.com",
    tracks: [
      { title: "Web3 UX & Embedded Wallets", prize: "$20,000", desc: "Gasless onboarding via email/passkeys with Okto SDK." },
      { title: "GenAI DeFi Arbitrage & Portfolio Bots", prize: "$25,000", desc: "Intelligent autonomous trading workflows." },
    ],
    timeline: [
      { title: "Applications Close", date: "May 18, 2026", completed: false },
      { title: "Selected Hacker Confirmation", date: "May 22, 2026", completed: false },
      { title: "Hackathon Weekend", date: "May 29 - 31, 2026", completed: false },
    ],
    prizes: [
      { rank: "Grand Champion", reward: "$15,000", description: "Direct Seed grant consideration by CoinDCX Ventures" },
      { rank: "Track Winners (4 tracks)", reward: "$8,000 each", description: "Track specific winner prizes" },
    ],
    eligibility: "All developers, designers, and students interested in Web3 and AI.",
  },
  {
    id: "aws-genai-hackathon",
    title: "AWS GenAI Student Builder Challenge 2026",
    tagline: "Build scalable generative AI apps with Amazon Bedrock, Claude 3.5 & Titan.",
    organizer: "Amazon Web Services (AWS)",
    bannerGradient: "from-orange-500 via-amber-600 to-neutral-900",
    status: "ongoing",
    mode: "Online",
    startDate: "April 20, 2026",
    endDate: "May 25, 2026",
    regDeadline: "May 15, 2026",
    prizePool: "$40,000 + $100k AWS Credits",
    prizePoolValue: 3300000,
    teamSize: "1 - 4 Members",
    domain: ["AI/ML", "EdTech", "FinTech"],
    tags: ["Amazon Bedrock", "RAG", "LangChain", "Vector DB", "Serverless"],
    matchScore: 95,
    participantsCount: 11300,
    description:
      "Harness the power of foundation models on Amazon Bedrock to build enterprise-grade and student-oriented GenAI agents, semantic search tools, and multilingual learning assistants with $500 free AWS credits upon approval.",
    registrationUrl: "https://aws.amazon.com/events",
    tracks: [
      { title: "Enterprise RAG & Knowledge Extraction", prize: "$10,000", desc: "GraphRAG & hybrid search for proprietary documentation." },
      { title: "Multimodal Student Tutors", prize: "$10,000", desc: "Video and audio comprehension agents for STEM." },
    ],
    timeline: [
      { title: "Kickoff & Credit Distribution", date: "April 20, 2026", completed: true },
      { title: "Mid-way Office Hours with AWS Solutions Architects", date: "May 10, 2026", completed: false },
      { title: "Final Video & Code Submission", date: "May 25, 2026", completed: false },
    ],
    prizes: [
      { rank: "1st Place", reward: "$15,000 + $25,000 AWS Credits", description: "Fast-track interview for AWS Solutions Architect intern" },
      { rank: "2nd Place", reward: "$10,000 + $15,000 AWS Credits", description: "AWS Certification Vouchers" },
    ],
    eligibility: "Open to all enrolled university students worldwide.",
  },
  {
    id: "hack-the-north-2026",
    title: "Hack the North 2026",
    tagline: "Canada's largest hackathon hosted at University of Waterloo.",
    organizer: "Techvibes & UW Students",
    bannerGradient: "from-sky-600 via-blue-600 to-indigo-900",
    status: "upcoming",
    mode: "In-Person",
    location: "Waterloo, Ontario, Canada",
    startDate: "September 11, 2026",
    endDate: "September 13, 2026",
    regDeadline: "July 20, 2026",
    prizePool: "$45,000+",
    prizePoolValue: 3700000,
    teamSize: "1 - 4 Members",
    domain: ["Open Innovation", "AI/ML", "IoT / Hardware"],
    tags: ["Waterloo", "Travel Reimbursements", "Hardware Lab", "Sponsors HQ"],
    matchScore: 89,
    participantsCount: 1500,
    description:
      "Hack the North is Canada's premier hackathon. Join 1,500 builders for 36 hours of creation, learning, and collaboration with hardware lab access, mentorship from tech giants, and flight reimbursements.",
    registrationUrl: "https://hackthenorth.com",
    tracks: [
      { title: "Hardware & IoT", prize: "$6,000", desc: "Wearables, drones, and microcontrollers." },
      { title: "AI for Social Good", prize: "$8,000", desc: "Non-profit and community tech tooling." },
    ],
    timeline: [
      { title: "Hacker Applications Open", date: "June 01, 2026", completed: false },
      { title: "RSVP Confirmations", date: "August 10, 2026", completed: false },
      { title: "Hack the North Weekend", date: "Sept 11 - 13, 2026", completed: false },
    ],
    prizes: [
      { rank: "Top 12 Finalists", reward: "$3,000 each", description: "Stage pitch in front of industry judges" },
      { rank: "Hardware Winner", reward: "$4,000", description: "Full maker kit + Lab sponsor credits" },
    ],
    eligibility: "High school, undergraduate, and graduate students worldwide.",
  },
];

const DOMAIN_FILTERS = [
  "All Domains",
  "AI/ML",
  "Web3 & Blockchain",
  "Open Innovation",
  "FinTech",
  "HealthTech",
  "EdTech",
  "Cybersecurity",
  "IoT / Hardware",
];

const STATUS_TABS = [
  { id: "all", label: "All Hackathons", icon: Trophy },
  { id: "ongoing", label: "🔴 Ongoing / Live", icon: Flame },
  { id: "upcoming", label: "🟢 Upcoming", icon: Calendar },
  { id: "closing_soon", label: "⏳ Closing Soon", icon: Clock },
  { id: "saved", label: "⭐ Saved / Bookmarked", icon: Bookmark },
];

export default function HackathonsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedDomain, setSelectedDomain] = useState<string>("All Domains");
  const [selectedMode, setSelectedMode] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"match" | "deadline" | "prize">("match");
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(["sih-2026", "ethindia-2026"]);
  const [activeHackathon, setActiveHackathon] = useState<Hackathon | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Toggle bookmark
  const toggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Share hackathon
  const handleShare = (hackathon: Hackathon, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: hackathon.title,
        text: `Check out ${hackathon.title} on SkillBridge! Prize pool: ${hackathon.prizePool}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${hackathon.title} — ${hackathon.prizePool}\nRegister: ${hackathon.registrationUrl}`);
      setCopiedId(hackathon.id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  // Filtered & Sorted Hackathons
  const filteredHackathons = useMemo(() => {
    return HACKATHONS_DATA.filter((hack) => {
      // Status filter
      if (selectedStatus === "saved") {
        if (!bookmarkedIds.includes(hack.id)) return false;
      } else if (selectedStatus !== "all" && hack.status !== selectedStatus) {
        return false;
      }

      // Domain filter
      if (selectedDomain !== "All Domains" && !hack.domain.includes(selectedDomain)) {
        return false;
      }

      // Mode filter
      if (selectedMode !== "all" && hack.mode.toLowerCase() !== selectedMode.toLowerCase()) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = hack.title.toLowerCase().includes(q);
        const matchesOrg = hack.organizer.toLowerCase().includes(q);
        const matchesTags = hack.tags.some((t) => t.toLowerCase().includes(q));
        const matchesDomain = hack.domain.some((d) => d.toLowerCase().includes(q));
        const matchesDesc = hack.description.toLowerCase().includes(q);
        if (!matchesTitle && !matchesOrg && !matchesTags && !matchesDomain && !matchesDesc) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "match") return b.matchScore - a.matchScore;
      if (sortBy === "prize") return b.prizePoolValue - a.prizePoolValue;
      if (sortBy === "deadline") return new Date(a.regDeadline).getTime() - new Date(b.regDeadline).getTime();
      return 0;
    });
  }, [selectedStatus, selectedDomain, selectedMode, searchQuery, sortBy, bookmarkedIds]);

  // Status stats
  const liveCount = HACKATHONS_DATA.filter((h) => h.status === "ongoing").length;
  const upcomingCount = HACKATHONS_DATA.filter((h) => h.status === "upcoming" || h.status === "closing_soon").length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-8 md:p-10 border border-slate-800 shadow-2xl">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{liveCount} Hackathons Active Right Now</span>
              <span className="text-white/40">•</span>
              <span className="text-indigo-200">{upcomingCount} Upcoming This Season</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Discover Hackathons & <br className="hidden sm:inline" />
              <span className="bg-linear-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                Assemble Your Dream Team
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Explore national and global collegiate hackathons matched directly to your tech stack. 
              Find compatible teammates on SkillBridge, apply with one click, and compete for over ₹2 Cr+ in prizes.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/dashboard/find-teammates"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all shadow-lg shadow-indigo-600/30 active:scale-95"
              >
                <Users className="w-4 h-4" />
                Find Teammates for a Hackathon
              </Link>

              <a
                href="#hackathons-list"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/10 font-medium text-sm transition-all backdrop-blur-xs"
              >
                <Trophy className="w-4 h-4 text-amber-400" />
                Browse Hackathons
              </a>
            </div>
          </div>

          {/* Quick Stat Pill Cards */}
          <div className="grid grid-cols-2 gap-3.5 sm:gap-4 shrink-0 lg:w-80">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="flex items-center justify-between text-indigo-300 mb-1">
                <span className="text-xs font-medium uppercase tracking-wider text-slate-400">Total Prize Pool</span>
                <Award className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-bold text-white">₹2.4 Cr+</div>
              <div className="text-xs text-slate-400 mt-1">Across all verified events</div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="flex items-center justify-between text-indigo-300 mb-1">
                <span className="text-xs font-medium uppercase tracking-wider text-slate-400">AI Match</span>
                <Sparkles className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-2xl font-bold text-white">98% Peak</div>
              <div className="text-xs text-emerald-400 mt-1">Matched to your profile</div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="flex items-center justify-between text-indigo-300 mb-1">
                <span className="text-xs font-medium uppercase tracking-wider text-slate-400">SkillBridge Teams</span>
                <Users className="w-4 h-4 text-sky-400" />
              </div>
              <div className="text-2xl font-bold text-white">142+</div>
              <div className="text-xs text-slate-400 mt-1">Formed this month</div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="flex items-center justify-between text-indigo-300 mb-1">
                <span className="text-xs font-medium uppercase tracking-wider text-slate-400">PPO Offers</span>
                <Briefcase className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-bold text-white">60+</div>
              <div className="text-xs text-slate-400 mt-1">Direct hiring routes</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div id="hackathons-list" className="space-y-4">
        <div className="flex items-center justify-between gap-4 border-b border-border pb-3 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2">
            {STATUS_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = selectedStatus === tab.id;
              const count =
                tab.id === "all"
                  ? HACKATHONS_DATA.length
                  : tab.id === "ongoing"
                  ? liveCount
                  : tab.id === "upcoming"
                  ? HACKATHONS_DATA.filter((h) => h.status === "upcoming").length
                  : tab.id === "closing_soon"
                  ? HACKATHONS_DATA.filter((h) => h.status === "closing_soon").length
                  : bookmarkedIds.length;

              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedStatus(tab.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                      : "bg-surface hover:bg-surface-hover text-text-secondary hover:text-text-primary border border-border"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      isActive ? "bg-white/20 text-white" : "bg-neutral-200 dark:bg-neutral-800 text-text-muted"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-text-muted hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              aria-label="Sort hackathons by"
              className="px-3 py-1.5 text-xs bg-surface border border-border rounded-lg text-text-primary focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-medium"
            >
              <option value="match">Highest AI Match</option>
              <option value="deadline">Registration Deadline (Soonest)</option>
              <option value="prize">Highest Prize Pool</option>
            </select>
          </div>
        </div>

        {/* Search and Filter Row */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
            <input
              type="text"
              placeholder="Search by hackathon title, tech stack (Solidity, Gemini, PyTorch), organizer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 bg-surface border border-border rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-text-muted hover:text-text-primary"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Mode Filter */}
          <div className="flex items-center gap-1.5 bg-surface border border-border p-1 rounded-xl shrink-0">
            {["all", "online", "in-person", "hybrid"].map((mode) => (
              <button
                key={mode}
                onClick={() => setSelectedMode(mode)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                  selectedMode === mode
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {mode === "all" ? "All Modes" : mode}
              </button>
            ))}
          </div>
        </div>

        {/* Domain Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <Filter className="w-3.5 h-3.5 text-text-muted shrink-0" />
          {DOMAIN_FILTERS.map((domain) => (
            <button
              key={domain}
              onClick={() => setSelectedDomain(domain)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all shrink-0 ${
                selectedDomain === domain
                  ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 font-semibold border border-indigo-200 dark:border-indigo-800"
                  : "bg-surface text-text-muted hover:text-text-primary border border-border hover:border-text-muted"
              }`}
            >
              {domain}
            </button>
          ))}
        </div>
      </div>

      {/* Hackathons Grid */}
      {filteredHackathons.length === 0 ? (
        <div className="p-12 text-center bg-surface border border-dashed border-border rounded-3xl space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center mx-auto text-indigo-600">
            <Trophy className="w-8 h-8 opacity-60" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-text-primary">No Hackathons Match Your Filter</h3>
            <p className="text-sm text-text-muted max-w-md mx-auto">
              Try adjusting your search terms, changing domain tags, or resetting filters to view all active events.
            </p>
          </div>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedStatus("all");
              setSelectedDomain("All Domains");
              setSelectedMode("all");
            }}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition-all"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHackathons.map((hackathon) => {
            const isBookmarked = bookmarkedIds.includes(hackathon.id);
            const isClosing = hackathon.status === "closing_soon";
            const isLive = hackathon.status === "ongoing";

            return (
              <div
                key={hackathon.id}
                onClick={() => setActiveHackathon(hackathon)}
                className="group relative bg-surface hover:bg-surface-hover border border-border hover:border-indigo-500/40 rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
              >
                {/* Banner Gradient */}
                <div className={`h-28 bg-linear-to-r ${hackathon.bannerGradient} relative p-4 flex items-start justify-between`}>
                  {/* Status Badges */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {isLive && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/90 text-white text-xs font-bold shadow-xs backdrop-blur-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                        Live Now
                      </span>
                    )}
                    {isClosing && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500 text-slate-900 text-xs font-bold shadow-xs">
                        <Clock className="w-3 h-3" />
                        Closing Soon
                      </span>
                    )}
                    <span className="px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-xs font-medium">
                      {hackathon.mode}
                    </span>
                  </div>

                  {/* Bookmark & Share Button */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={(e) => handleShare(hackathon, e)}
                      title="Share Hackathon"
                      aria-label="Share Hackathon"
                      className="w-8 h-8 rounded-full bg-black/30 backdrop-blur-md text-white hover:bg-black/50 flex items-center justify-center transition-all"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => toggleBookmark(hackathon.id, e)}
                      title={isBookmarked ? "Saved" : "Save Hackathon"}
                      aria-label={isBookmarked ? "Saved" : "Save Hackathon"}
                      className={`w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${
                        isBookmarked
                          ? "bg-amber-400 text-slate-900 shadow-md"
                          : "bg-black/30 text-white hover:bg-black/50"
                      }`}
                    >
                      {isBookmarked ? (
                        <BookmarkCheck className="w-4 h-4 fill-current" />
                      ) : (
                        <Bookmark className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  {/* AI Match Badge anchored bottom right of banner */}
                  <div className="absolute bottom-3 right-4 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/95 dark:bg-slate-900/95 shadow-md border border-white/20 text-xs font-bold text-indigo-600 dark:text-indigo-400 backdrop-blur-md">
                    <Sparkles className="w-3 h-3 text-purple-500" />
                    <span>{hackathon.matchScore}% Match</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-text-muted flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                      <span className="truncate">{hackathon.organizer}</span>
                    </div>

                    <h3 className="font-bold text-base text-text-primary leading-snug group-hover:text-indigo-600 transition-colors line-clamp-2">
                      {hackathon.title}
                    </h3>

                    <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">
                      {hackathon.tagline}
                    </p>
                  </div>

                  {/* Key Highlights (Prize, Team, Dates) */}
                  <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-border text-xs">
                    <div>
                      <span className="text-text-muted block text-[11px]">Prize Pool</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 truncate">
                        <Trophy className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        {hackathon.prizePool}
                      </span>
                    </div>

                    <div>
                      <span className="text-text-muted block text-[11px]">Team Size</span>
                      <span className="font-semibold text-text-primary flex items-center gap-1 truncate">
                        <Users className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                        {hackathon.teamSize}
                      </span>
                    </div>

                    <div className="col-span-2 pt-1 border-t border-border flex items-center justify-between text-[11px]">
                      <span className="text-text-muted flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-text-muted" />
                        Deadline: <strong className="text-text-primary">{hackathon.regDeadline}</strong>
                      </span>
                      <span className="text-text-muted flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-text-muted" />
                        {hackathon.location ? hackathon.location.split(",")[0] : "Virtual"}
                      </span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {hackathon.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-[10px] font-medium border border-indigo-200/50 dark:border-indigo-800/50"
                      >
                        {tag}
                      </span>
                    ))}
                    {hackathon.tags.length > 3 && (
                      <span className="text-[10px] text-text-muted">
                        +{hackathon.tags.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Action Row */}
                  <div className="pt-2 border-t border-border flex items-center gap-2">
                    <Link
                      href={`/dashboard/find-teammates?hackathon=${encodeURIComponent(hackathon.title)}`}
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/70 dark:hover:bg-indigo-900 text-indigo-700 dark:text-indigo-300 font-semibold text-xs transition-all border border-indigo-200 dark:border-indigo-800"
                    >
                      <Users className="w-3.5 h-3.5" />
                      Find Teammates
                    </Link>

                    <a
                      href={hackathon.registrationUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center justify-center gap-1 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all shadow-xs shrink-0"
                    >
                      <span>Apply</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Floating Copy Alert */}
      {copiedId && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Hackathon details copied to clipboard!</span>
        </div>
      )}

      {/* Detailed Hackathon Modal */}
      {activeHackathon && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div
            className="bg-white dark:bg-neutral-900 border border-border rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header with banner */}
            <div className={`h-40 bg-linear-to-r ${activeHackathon.bannerGradient} relative p-6 flex flex-col justify-between text-white`}>
              <button
                onClick={() => setActiveHackathon(null)}
                aria-label="Close modal"
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 text-white hover:bg-black/60 flex items-center justify-center transition-all"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-xs font-semibold">
                  {activeHackathon.mode}
                </span>
                {activeHackathon.status === "ongoing" && (
                  <span className="px-3 py-1 rounded-full bg-red-500 text-xs font-bold">
                    Live Now
                  </span>
                )}
              </div>

              <div>
                <div className="text-xs text-white/80 font-medium">{activeHackathon.organizer}</div>
                <h2 className="text-xl sm:text-2xl font-black text-white">{activeHackathon.title}</h2>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Quick Info Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-border text-xs">
                <div>
                  <span className="text-text-muted block text-[11px]">Total Prize</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                    {activeHackathon.prizePool}
                  </span>
                </div>
                <div>
                  <span className="text-text-muted block text-[11px]">Team Format</span>
                  <span className="font-semibold text-text-primary text-sm">
                    {activeHackathon.teamSize}
                  </span>
                </div>
                <div>
                  <span className="text-text-muted block text-[11px]">Registration Closes</span>
                  <span className="font-semibold text-text-primary text-sm">
                    {activeHackathon.regDeadline}
                  </span>
                </div>
                <div>
                  <span className="text-text-muted block text-[11px]">SkillBridge Match</span>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400 text-sm flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    {activeHackathon.matchScore}%
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="font-bold text-sm text-text-primary flex items-center gap-2">
                  <Zap className="w-4 h-4 text-indigo-500" />
                  About the Hackathon
                </h4>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  {activeHackathon.description}
                </p>
              </div>

              {/* Tracks / Themes */}
              <div className="space-y-3">
                <h4 className="font-bold text-sm text-text-primary flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-500" />
                  Tracks & Problem Themes
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeHackathon.tracks.map((track, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-surface border border-border space-y-1"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-xs text-text-primary">{track.title}</span>
                        <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 shrink-0">
                          {track.prize}
                        </span>
                      </div>
                      <p className="text-xs text-text-muted">{track.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prizes & Recognition */}
              <div className="space-y-3">
                <h4 className="font-bold text-sm text-text-primary flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  Prizes & Perks
                </h4>
                <div className="space-y-2">
                  {activeHackathon.prizes.map((prize, idx) => (
                    <div
                      key={idx}
                      className="flex items-start justify-between p-3 rounded-xl bg-surface border border-border text-xs gap-3"
                    >
                      <div>
                        <span className="font-bold text-text-primary block">{prize.rank}</span>
                        <span className="text-text-muted">{prize.description}</span>
                      </div>
                      <span className="font-black text-sm text-emerald-600 dark:text-emerald-400 shrink-0">
                        {prize.reward}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Eligibility */}
              <div className="p-3.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 text-xs text-indigo-950 dark:text-indigo-200 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-semibold block mb-0.5">Eligibility & Requirements</strong>
                  {activeHackathon.eligibility}
                </div>
              </div>

              {/* Footer CTA buttons */}
              <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
                <Link
                  href={`/dashboard/find-teammates?hackathon=${encodeURIComponent(activeHackathon.title)}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950 dark:hover:bg-indigo-900 text-indigo-600 dark:text-indigo-300 font-semibold text-xs sm:text-sm border border-indigo-200 dark:border-indigo-800 transition-all"
                >
                  <Users className="w-4 h-4" />
                  Find Teammates on SkillBridge
                </Link>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => toggleBookmark(activeHackathon.id)}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-border hover:bg-surface text-text-primary text-xs sm:text-sm font-medium transition-all"
                  >
                    {bookmarkedIds.includes(activeHackathon.id) ? (
                      <>
                        <BookmarkCheck className="w-4 h-4 text-amber-500 fill-current" />
                        Saved
                      </>
                    ) : (
                      <>
                        <Bookmark className="w-4 h-4" />
                        Save for Later
                      </>
                    )}
                  </button>

                  <a
                    href={activeHackathon.registrationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm transition-all shadow-lg shadow-indigo-600/30"
                  >
                    <span>Register on Official Site</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
