"use client";

import { useState, useEffect } from "react";
import {
  MapPin,
  Globe,
  Award,
  Calendar,
  Sparkles,
  Edit3,
  CheckCircle2,
  X,
  Code2,
  ShieldCheck,
  Camera,
  Plus,
  Trash2,
  Briefcase,
  GraduationCap,
  ExternalLink,
  Layers,
  Palette,
  Terminal,
  Share2,
  Check,
  Upload,
  Image as ImageIcon,
} from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import { currentUser as defaultUser } from "@/lib/data";

interface LanguageProficiency {
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  years: string;
}

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  duration: string;
  description: string;
  skillsUsed: string[];
}

interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  duration: string;
  grade: string;
}

interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId: string;
}

const bannerGradients: Record<string, { name: string; bgClass: string }> = {
  emerald: {
    name: "Bharat Emerald",
    bgClass: "bg-gradient-to-r from-emerald-950 via-teal-900 to-emerald-800",
  },
  cyber: {
    name: "Cyber Indigo",
    bgClass: "bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900",
  },
  sunset: {
    name: "Hackathon Dusk",
    bgClass: "bg-gradient-to-r from-amber-950 via-rose-950 to-emerald-950",
  },
  ocean: {
    name: "Deep Ocean",
    bgClass: "bg-gradient-to-r from-blue-950 via-teal-950 to-emerald-950",
  },
  violet: {
    name: "Electric Violet",
    bgClass: "bg-gradient-to-r from-purple-950 via-indigo-900 to-blue-950",
  },
  aurora: {
    name: "Aurora Borealis",
    bgClass: "bg-gradient-to-r from-teal-950 via-emerald-900 to-cyan-950",
  },
};

const sampleBannerImages = [
  {
    id: "b1",
    name: "AI Neural Matrix",
    category: "AI & Tech",
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1400&auto=format&fit=crop&q=80",
  },
  {
    id: "b2",
    name: "Cyber Circuit",
    category: "Hardware & IoT",
    src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1400&auto=format&fit=crop&q=80",
  },
  {
    id: "b3",
    name: "Silicon Night",
    category: "Developer",
    src: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1400&auto=format&fit=crop&q=80",
  },
  {
    id: "b4",
    name: "Abstract Neon",
    category: "Abstract",
    src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1400&auto=format&fit=crop&q=80",
  },
  {
    id: "b5",
    name: "Geometric Tech",
    category: "Design",
    src: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=1400&auto=format&fit=crop&q=80",
  },
  {
    id: "b6",
    name: "Dark Code Terminal",
    category: "Developer",
    src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1400&auto=format&fit=crop&q=80",
  },
  {
    id: "b7",
    name: "Quantum Deep Space",
    category: "Science",
    src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&auto=format&fit=crop&q=80",
  },
  {
    id: "b8",
    name: "Cyber Microchips",
    category: "Hardware & IoT",
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&auto=format&fit=crop&q=80",
  },
  {
    id: "b9",
    name: "Bharat Emerald Mesh",
    category: "Abstract",
    src: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1400&auto=format&fit=crop&q=80",
  },
];

const presetAvatars = [
  { id: "p1", name: "Praveen", src: "/avatars/praveen.jpg" },
  { id: "p2", name: "Rahul", src: "/avatars/rahul.jpg" },
  { id: "p3", name: "Elena", src: "/avatars/elena.jpg" },
  { id: "p4", name: "Aman", src: "/avatars/aman.jpg" },
  { id: "p5", name: "Aanya", src: "/avatars/aanya.jpg" },
  { id: "p6", name: "Neha", src: "/avatars/neha.jpg" },
];

export default function ProfilePage() {
  // Main user profile state
  const [user, setUser] = useState({
    ...defaultUser,
    openToHackathons: true,
    openToRoles: "Full-Stack Dev, ML Engineer, Tech Lead",
    bannerType: "image" as "gradient" | "image",
    bannerKey: "emerald",
    customBannerUrl:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1400&auto=format&fit=crop&q=80",
    portfolioUrl: "https://praveenmishra.dev",
    linkedinUrl: "https://linkedin.com/in/praveenmishra-dev",
    githubUrl: "https://github.com/praveenmishra",
    leetcodeUrl: "https://leetcode.com/praveen_codes",
    twitterUrl: "https://x.com/praveen_builds",
  });

  // Languages state
  const [languages, setLanguages] = useState<LanguageProficiency[]>([
    { name: "TypeScript", level: "Expert", years: "3 yrs" },
    { name: "Python", level: "Advanced", years: "4 yrs" },
    { name: "JavaScript", level: "Expert", years: "4 yrs" },
    { name: "C++", level: "Intermediate", years: "2 yrs" },
    { name: "SQL", level: "Advanced", years: "3 yrs" },
  ]);

  // Skill categories
  const [skillCategories, setSkillCategories] = useState({
    frameworks: ["React", "Next.js 15", "FastAPI", "Node.js", "TailwindCSS", "Express"],
    ai_ml: ["LangChain", "RAG Pipelines", "ChromaDB", "Vector Embeddings", "Hugging Face"],
    cloud_devops: ["Docker", "PostgreSQL", "MongoDB", "Redis", "Git & GitHub Actions"],
    domains: ["Healthcare AI", "Full-Stack Web", "API Architecture", "Hackathon Pitching"],
  });

  // Experiences
  const [experiences, setExperiences] = useState<ExperienceItem[]>([
    {
      id: "exp1",
      role: "Lead Full-Stack Developer",
      company: "HealthAI Squad (Build With Bharat 4.0)",
      location: "Remote / Mumbai",
      duration: "Oct 2026 - Present",
      description:
        "Architecting an AI-assisted clinical diagnosis tool using Next.js 15, FastAPI, and ChromaDB vector search. Validating medical RAG pipeline latency with mentors.",
      skillsUsed: ["Next.js", "FastAPI", "RAG", "ChromaDB", "TailwindCSS"],
    },
    {
      id: "exp2",
      role: "Full-Stack Developer Intern",
      company: "Nexus Labs India",
      location: "Bengaluru, India (Hybrid)",
      duration: "May 2026 - Jul 2026",
      description:
        "Developed reusable design system components in React and optimized backend PostgreSQL database query execution by 38%.",
      skillsUsed: ["React", "PostgreSQL", "Node.js", "Docker"],
    },
  ]);

  // Education
  const [education] = useState<EducationItem[]>([
    {
      id: "edu1",
      institution: "Indian Institute of Information Technology (IIIT)",
      degree: "Bachelor of Technology (B.Tech)",
      field: "Computer Science & Engineering",
      duration: "2023 - 2027",
      grade: "CGPA: 8.9 / 10.0",
    },
  ]);

  // Certifications
  const [certifications] = useState<CertificationItem[]>([
    {
      id: "cert1",
      title: "Build With Bharat 4.0 - Verified Finalist",
      issuer: "Build With Bharat Foundation",
      issueDate: "Oct 2026",
      credentialId: "BWB-2026-V8892",
    },
    {
      id: "cert2",
      title: "DeepLearning.AI - LangChain & Vector Databases",
      issuer: "DeepLearning.AI",
      issueDate: "Aug 2026",
      credentialId: "DL-LC-7712",
    },
  ]);

  // Modal & Form state
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "general" | "photo" | "banner" | "languages" | "skills" | "experience" | "socials"
  >("general");
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form Temp States
  const [formName, setFormName] = useState(user.name);
  const [formHeadline, setFormHeadline] = useState(user.headline);
  const [formBio, setFormBio] = useState(user.bio);
  const [formLocation, setFormLocation] = useState(user.location);
  const [formOpenToWork, setFormOpenToWork] = useState(user.openToHackathons);
  const [formOpenToRoles, setFormOpenToRoles] = useState(user.openToRoles);
  const [formAvatar, setFormAvatar] = useState(user.avatar);
  const [formBannerType, setFormBannerType] = useState<"gradient" | "image">(user.bannerType || "image");
  const [formBannerKey, setFormBannerKey] = useState(user.bannerKey || "emerald");
  const [formCustomBannerUrl, setFormCustomBannerUrl] = useState(user.customBannerUrl || "");
  const [bannerCategoryFilter, setBannerCategoryFilter] = useState<string>("All");

  const [formGithub, setFormGithub] = useState(user.githubUrl);
  const [formLinkedin, setFormLinkedin] = useState(user.linkedinUrl);
  const [formPortfolio, setFormPortfolio] = useState(user.portfolioUrl);
  const [formLeetcode, setFormLeetcode] = useState(user.leetcodeUrl);

  // Language input state
  const [newLangName, setNewLangName] = useState("");
  const [newLangLevel, setNewLangLevel] = useState<LanguageProficiency["level"]>("Intermediate");
  const [newLangYears, setNewLangYears] = useState("2 yrs");

  // Skill input state
  const [newSkillText, setNewSkillText] = useState("");
  const [newSkillCategory, setNewSkillCategory] =
    useState<keyof typeof skillCategories>("frameworks");

  // Experience input state
  const [newExpRole, setNewExpRole] = useState("");
  const [newExpCompany, setNewExpCompany] = useState("");
  const [newExpDuration, setNewExpDuration] = useState("");
  const [newExpDesc, setNewExpDesc] = useState("");

  // Sync with localStorage on client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("skillbridge_user");
      if (saved) {
        const parsed = JSON.parse(saved);
        setUser((prev) => ({ ...prev, ...parsed }));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleOpenModal = (defaultTab: typeof activeTab = "general") => {
    setFormName(user.name);
    setFormHeadline(user.headline);
    setFormBio(user.bio);
    setFormLocation(user.location);
    setFormOpenToWork(user.openToHackathons);
    setFormOpenToRoles(user.openToRoles);
    setFormAvatar(user.avatar);
    setFormBannerType(user.bannerType || "image");
    setFormBannerKey(user.bannerKey || "emerald");
    setFormCustomBannerUrl(
      user.customBannerUrl ||
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1400&auto=format&fit=crop&q=80"
    );
    setFormGithub(user.githubUrl);
    setFormLinkedin(user.linkedinUrl);
    setFormPortfolio(user.portfolioUrl);
    setFormLeetcode(user.leetcodeUrl);
    setSavedSuccess(false);
    setActiveTab(defaultTab);
    setEditModalOpen(true);
  };

  const handleSaveAll = () => {
    const updatedUser = {
      ...user,
      name: formName,
      headline: formHeadline,
      bio: formBio,
      location: formLocation,
      openToHackathons: formOpenToWork,
      openToRoles: formOpenToRoles,
      avatar: formAvatar,
      bannerType: formBannerType,
      bannerKey: formBannerKey,
      customBannerUrl: formCustomBannerUrl,
      githubUrl: formGithub,
      linkedinUrl: formLinkedin,
      portfolioUrl: formPortfolio,
      leetcodeUrl: formLeetcode,
    };
    setUser(updatedUser);
    try {
      localStorage.setItem("skillbridge_user", JSON.stringify(updatedUser));
      window.dispatchEvent(new Event("profile_updated"));
    } catch (e) {
      console.error(e);
    }
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setEditModalOpen(false);
    }, 600);
  };

  const handleAddLanguage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLangName.trim()) return;
    setLanguages([
      ...languages,
      { name: newLangName.trim(), level: newLangLevel, years: newLangYears },
    ]);
    setNewLangName("");
  };

  const handleRemoveLanguage = (name: string) => {
    setLanguages(languages.filter((l) => l.name !== name));
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillText.trim()) return;
    setSkillCategories({
      ...skillCategories,
      [newSkillCategory]: [...skillCategories[newSkillCategory], newSkillText.trim()],
    });
    setNewSkillText("");
  };

  const handleRemoveSkill = (category: keyof typeof skillCategories, skill: string) => {
    setSkillCategories({
      ...skillCategories,
      [category]: skillCategories[category].filter((s) => s !== skill),
    });
  };

  const handleAddExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpRole.trim() || !newExpCompany.trim()) return;
    const item: ExperienceItem = {
      id: `exp_${Date.now()}`,
      role: newExpRole,
      company: newExpCompany,
      location: "India",
      duration: newExpDuration || "2026",
      description: newExpDesc,
      skillsUsed: ["Full-Stack", "Problem Solving"],
    };
    setExperiences([item, ...experiences]);
    setNewExpRole("");
    setNewExpCompany("");
    setNewExpDuration("");
    setNewExpDesc("");
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setFormAvatar(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setFormCustomBannerUrl(reader.result);
          setFormBannerType("image");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const bannerClass =
    bannerGradients[user.bannerKey]?.bgClass || bannerGradients.emerald.bgClass;

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in pb-16">
      {/* ─── Profile Card (LinkedIn Style) ─── */}
      <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden">
        {/* Cover Banner with Custom Image or Gradient Theme */}
        <div
          className={`h-48 w-full relative flex items-start justify-between p-6 overflow-hidden ${
            user.bannerType === "gradient" ? bannerClass : "bg-slate-900"
          }`}
        >
          {user.bannerType === "image" && user.customBannerUrl && (
            <img
              src={user.customBannerUrl}
              alt="Profile Cover Banner"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}

          {/* Dark scrim overlay for contrast */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[0.5px]" />

          <div className="flex items-center gap-2 relative z-10">
            <span className="bg-black/40 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-semibold text-white flex items-center gap-1.5 shadow-sm border border-white/10">
              <ShieldCheck size={14} className="text-sb-wash" /> Build With Bharat 4.0 Verified
            </span>
          </div>

          <button
            onClick={() => handleOpenModal("banner")}
            className="px-3.5 py-1.5 bg-black/50 hover:bg-black/70 backdrop-blur-md text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md border border-white/10 cursor-pointer relative z-10"
          >
            <Palette size={13} /> Change Banner &amp; Photo
          </button>
        </div>

        {/* Profile Details Header */}
        <div className="px-8 pb-8 pt-0 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 -mt-14 mb-6">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-5">
              {/* Profile Avatar with Camera Button */}
              <div className="relative group shrink-0" style={{ width: "112px", height: "112px" }}>
                <div className="w-28 h-28 rounded-full ring-4 ring-white shadow-xl overflow-hidden bg-white flex items-center justify-center">
                  <Avatar src={user.avatar} name={user.name} size="2xl" />
                </div>
                <button
                  onClick={() => handleOpenModal("photo")}
                  className="absolute bottom-0 right-0 p-2 bg-sb-dark hover:bg-sb-green text-white rounded-full shadow-md transition-all group-hover:scale-110 cursor-pointer z-20"
                  title="Update Profile Photo"
                >
                  <Camera size={14} />
                </button>
              </div>

              {/* Name & Headline */}
              <div className="mb-1 space-y-1">
                <div className="flex items-center gap-2.5">
                  <h1 className="text-2xl font-bold text-sb-dark tracking-tight">{user.name}</h1>
                  <span className="p-1 bg-sb-bg rounded-full text-sb-green shadow-xs">
                    <ShieldCheck size={18} />
                  </span>
                </div>
                <p className="text-sm font-semibold text-sb-mid max-w-xl leading-snug">
                  {user.headline}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted pt-1">
                  <span className="flex items-center gap-1 font-medium">
                    <MapPin size={13} className="text-sb-green" /> {user.location}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-medium text-sb-green">
                    <Briefcase size={13} /> Open to Hackathon Teaming
                  </span>
                  <span>•</span>
                  <span className="text-text-secondary font-medium">500+ Connections</span>
                </div>
              </div>
            </div>

            {/* Top Action Buttons */}
            <div className="flex items-center gap-2.5 self-start md:self-auto shrink-0">
              <button
                onClick={() => handleOpenModal("general")}
                className="px-4 py-2.5 bg-sb-dark hover:bg-sb-green text-white text-xs font-semibold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <Edit3 size={14} /> Customize Profile
              </button>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  alert("Profile link copied to clipboard!");
                }}
                className="p-2.5 bg-surface hover:bg-surface-hover border border-border text-sb-dark rounded-xl text-xs transition-colors cursor-pointer"
                title="Share Profile"
              >
                <Share2 size={15} />
              </button>
            </div>
          </div>

          {/* Open to Work Banner */}
          {user.openToHackathons && (
            <div className="bg-sb-bg/70 border border-sb-wash/90 rounded-2xl p-4 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 animate-fade-in">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-sb-green text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-sb-dark flex items-center gap-2">
                    Open to Hackathons &amp; Roles
                    <span className="px-2 py-0.5 bg-sb-green text-white text-[10px] font-bold rounded-full">
                      ACTIVE
                    </span>
                  </h4>
                  <p className="text-xs text-text-secondary mt-0.5">
                    Looking for: <strong className="text-sb-dark">{user.openToRoles}</strong>
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleOpenModal("general")}
                className="text-xs font-bold text-sb-green hover:underline shrink-0 cursor-pointer"
              >
                Edit Preferences →
              </button>
            </div>
          )}

          {/* Bio / About */}
          <div className="pt-4 border-t border-border">
            <h3 className="text-xs font-bold text-sb-dark uppercase tracking-wider mb-2">About</h3>
            <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-line">
              {user.bio}
            </p>
          </div>

          {/* Social Links Row */}
          <div className="pt-4 mt-4 border-t border-border/60 flex flex-wrap items-center gap-3">
            <span className="text-xs font-bold text-sb-dark uppercase tracking-wider mr-2">
              Social Links:
            </span>
            {user.githubUrl && (
              <a
                href={user.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 bg-surface hover:bg-surface-hover border border-border rounded-xl text-xs font-medium text-sb-dark flex items-center gap-1.5 transition-all"
              >
                <Code2 size={13} className="text-sb-green" /> GitHub
                <ExternalLink size={11} className="text-text-muted" />
              </a>
            )}
            {user.linkedinUrl && (
              <a
                href={user.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 bg-surface hover:bg-surface-hover border border-border rounded-xl text-xs font-medium text-sb-dark flex items-center gap-1.5 transition-all"
              >
                <Globe size={13} className="text-sb-mid" /> LinkedIn
                <ExternalLink size={11} className="text-text-muted" />
              </a>
            )}
            {user.portfolioUrl && (
              <a
                href={user.portfolioUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 bg-surface hover:bg-surface-hover border border-border rounded-xl text-xs font-medium text-sb-dark flex items-center gap-1.5 transition-all"
              >
                <Globe size={13} className="text-sb-light" /> Portfolio
                <ExternalLink size={11} className="text-text-muted" />
              </a>
            )}
            {user.leetcodeUrl && (
              <a
                href={user.leetcodeUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 bg-surface hover:bg-surface-hover border border-border rounded-xl text-xs font-medium text-sb-dark flex items-center gap-1.5 transition-all"
              >
                <Terminal size={13} className="text-amber-600" /> LeetCode
                <ExternalLink size={11} className="text-text-muted" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ─── Grid: Languages, Skills, Experience, Education ─── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left 2 Columns: Languages, Skills, Experience */}
        <div className="md:col-span-2 space-y-6">
          {/* Programming Languages */}
          <div className="bg-white rounded-3xl border border-border p-7 space-y-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Terminal size={18} className="text-sb-green" />
                <h3 className="text-base font-bold text-sb-dark">Known Programming Languages</h3>
              </div>
              <button
                onClick={() => handleOpenModal("languages")}
                className="text-xs font-bold text-sb-green hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Plus size={13} /> Add Language
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {languages.map((lang) => (
                <div
                  key={lang.name}
                  className="p-3.5 bg-surface rounded-2xl border border-border flex items-center justify-between hover:border-sb-light transition-all"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-sb-dark">{lang.name}</span>
                    <p className="text-[11px] text-text-muted">{lang.years} experience</p>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      lang.level === "Expert"
                        ? "bg-emerald-100 text-emerald-800"
                        : lang.level === "Advanced"
                        ? "bg-blue-100 text-blue-800"
                        : lang.level === "Intermediate"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {lang.level}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Categorized Skills */}
          <div className="bg-white rounded-3xl border border-border p-7 space-y-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Layers size={18} className="text-sb-green" />
                <h3 className="text-base font-bold text-sb-dark">Technical Skills &amp; Stack</h3>
              </div>
              <button
                onClick={() => handleOpenModal("skills")}
                className="text-xs font-bold text-sb-green hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Plus size={13} /> Add Skill
              </button>
            </div>

            {/* Frameworks */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-text-muted uppercase tracking-wider">
                Web &amp; Frameworks
              </span>
              <div className="flex flex-wrap gap-2">
                {skillCategories.frameworks.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-sb-bg border border-sb-wash text-sb-dark text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-2xs"
                  >
                    <CheckCircle2 size={13} className="text-sb-green" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* AI/ML */}
            <div className="space-y-2 pt-2 border-t border-border/60">
              <span className="text-xs font-bold text-text-muted uppercase tracking-wider">
                AI / Machine Learning &amp; RAG
              </span>
              <div className="flex flex-wrap gap-2">
                {skillCategories.ai_ml.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-2xs"
                  >
                    <Sparkles size={13} className="text-indigo-600" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Cloud & DevOps */}
            <div className="space-y-2 pt-2 border-t border-border/60">
              <span className="text-xs font-bold text-text-muted uppercase tracking-wider">
                Database, Cloud &amp; Tools
              </span>
              <div className="flex flex-wrap gap-2">
                {skillCategories.cloud_devops.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-surface border border-border text-text-primary text-xs font-medium rounded-xl flex items-center gap-1.5"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Work & Hackathon Experience */}
          <div className="bg-white rounded-3xl border border-border p-7 space-y-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Briefcase size={18} className="text-sb-green" />
                <h3 className="text-base font-bold text-sb-dark">Experience &amp; Hackathons</h3>
              </div>
              <button
                onClick={() => handleOpenModal("experience")}
                className="text-xs font-bold text-sb-green hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Plus size={13} /> Add Experience
              </button>
            </div>

            <div className="space-y-6 divide-y divide-border/60">
              {experiences.map((exp, idx) => (
                <div key={exp.id} className={`${idx > 0 ? "pt-5" : ""} space-y-2`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-sb-dark">{exp.role}</h4>
                      <p className="text-xs font-semibold text-sb-mid">{exp.company}</p>
                      <p className="text-[11px] text-text-muted mt-0.5">
                        {exp.duration} • {exp.location}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed pt-1">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {exp.skillsUsed.map((sk) => (
                      <span
                        key={sk}
                        className="px-2 py-0.5 bg-surface text-text-muted text-[10px] font-medium rounded-md border border-border/60"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Badges, Education, Certifications & Availability */}
        <div className="space-y-6">
          {/* Hackathon Badges */}
          <div className="bg-white rounded-3xl border border-border p-6 space-y-4 shadow-sm">
            <h3 className="text-sm font-bold text-sb-dark uppercase tracking-wider flex items-center gap-2">
              <Award size={16} className="text-sb-gold" /> Hackathon Badges
            </h3>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-amber-50/60 border border-amber-200/60 rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
                  🏆
                </div>
                <div>
                  <h5 className="text-xs font-bold text-amber-900">Bharat 4.0 Contender</h5>
                  <p className="text-[11px] text-amber-700">Official Hackathon Finalist</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-emerald-50/60 border border-emerald-200/60 rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
                  ⚡
                </div>
                <div>
                  <h5 className="text-xs font-bold text-emerald-900">Sprint MVP</h5>
                  <p className="text-[11px] text-emerald-700">Top Code Velocity</p>
                </div>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="bg-white rounded-3xl border border-border p-6 space-y-4 shadow-sm">
            <h3 className="text-sm font-bold text-sb-dark uppercase tracking-wider flex items-center gap-2">
              <GraduationCap size={16} className="text-sb-green" /> Education
            </h3>

            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="space-y-1">
                  <h4 className="text-xs font-bold text-sb-dark">{edu.institution}</h4>
                  <p className="text-xs text-sb-mid font-medium">{edu.degree}, {edu.field}</p>
                  <p className="text-[11px] text-text-muted">{edu.duration} • {edu.grade}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-white rounded-3xl border border-border p-6 space-y-4 shadow-sm">
            <h3 className="text-sm font-bold text-sb-dark uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck size={16} className="text-sb-green" /> Certifications
            </h3>

            <div className="space-y-3">
              {certifications.map((cert) => (
                <div key={cert.id} className="p-3 bg-surface rounded-2xl border border-border space-y-1">
                  <h5 className="text-xs font-bold text-sb-dark">{cert.title}</h5>
                  <p className="text-[11px] text-text-muted">{cert.issuer} • Issued {cert.issueDate}</p>
                  <p className="text-[10px] text-sb-mid font-mono">{cert.credentialId}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Availability Schedule */}
          <div className="bg-white rounded-3xl border border-border p-6 space-y-3 shadow-sm">
            <h3 className="text-sm font-bold text-sb-dark uppercase tracking-wider flex items-center gap-2">
              <Calendar size={16} className="text-sb-green" /> Mentorship Availability
            </h3>

            <div className="space-y-2">
              {user.availability?.map((slot) => (
                <div
                  key={slot.day}
                  className="flex items-center justify-between p-2.5 bg-surface rounded-xl text-xs"
                >
                  <span className="font-bold text-sb-dark">{slot.day}</span>
                  <span className="text-text-muted">{slot.times.join(", ")}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Multi-Tab Edit Modal with Banner Customizer ─── */}
      {editModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-border shadow-2xl overflow-hidden animate-scale-up flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-6 border-b border-border flex items-center justify-between bg-surface shrink-0">
              <div className="flex items-center gap-2">
                <Edit3 size={18} className="text-sb-green" />
                <h3 className="text-base font-bold text-sb-dark">Customize Profile</h3>
              </div>
              <button
                onClick={() => setEditModalOpen(false)}
                className="text-text-muted hover:text-sb-dark p-1 rounded-lg hover:bg-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="flex items-center px-6 border-b border-border bg-surface/50 overflow-x-auto shrink-0 gap-2 py-2">
              {[
                { id: "general", label: "Basic Info" },
                { id: "banner", label: "Cover Banner" },
                { id: "photo", label: "Profile Photo" },
                { id: "languages", label: "Languages" },
                { id: "skills", label: "Skills" },
                { id: "experience", label: "Experience" },
                { id: "socials", label: "Social Links" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-sb-dark text-white shadow-sm"
                      : "text-text-secondary hover:bg-surface hover:text-sb-dark"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Modal Content Area */}
            <div className="p-6 overflow-y-auto flex-1 space-y-5">
              {savedSuccess && (
                <div className="p-4 bg-sb-bg border border-sb-wash text-sb-dark rounded-2xl flex items-center gap-3 text-xs font-bold animate-fade-in">
                  <CheckCircle2 size={18} className="text-sb-green" />
                  Profile changes saved successfully!
                </div>
              )}

              {/* 1. General Tab */}
              {activeTab === "general" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-sb-dark uppercase tracking-wider mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full p-2.5 bg-surface rounded-xl text-xs border border-border focus:outline-none focus:border-sb-green"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-sb-dark uppercase tracking-wider mb-1.5">
                      Headline
                    </label>
                    <input
                      type="text"
                      value={formHeadline}
                      onChange={(e) => setFormHeadline(e.target.value)}
                      placeholder="e.g. Full-Stack Developer | React & Node.js"
                      className="w-full p-2.5 bg-surface rounded-xl text-xs border border-border focus:outline-none focus:border-sb-green"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-sb-dark uppercase tracking-wider mb-1.5">
                      Location
                    </label>
                    <input
                      type="text"
                      value={formLocation}
                      onChange={(e) => setFormLocation(e.target.value)}
                      className="w-full p-2.5 bg-surface rounded-xl text-xs border border-border focus:outline-none focus:border-sb-green"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-sb-dark uppercase tracking-wider mb-1.5">
                      About / Bio
                    </label>
                    <textarea
                      rows={4}
                      value={formBio}
                      onChange={(e) => setFormBio(e.target.value)}
                      className="w-full p-2.5 bg-surface rounded-xl text-xs border border-border focus:outline-none focus:border-sb-green"
                    />
                  </div>

                  {/* Open to Work Toggle */}
                  <div className="p-4 bg-surface rounded-2xl border border-border space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-sb-dark">
                        Show &ldquo;Open to Hackathons &amp; Roles&rdquo; badge
                      </span>
                      <input
                        type="checkbox"
                        checked={formOpenToWork}
                        onChange={(e) => setFormOpenToWork(e.target.checked)}
                        className="w-4 h-4 accent-sb-green cursor-pointer"
                      />
                    </div>
                    {formOpenToWork && (
                      <input
                        type="text"
                        value={formOpenToRoles}
                        onChange={(e) => setFormOpenToRoles(e.target.value)}
                        placeholder="e.g. Full-Stack Dev, ML Engineer, Tech Lead"
                        className="w-full p-2 bg-white rounded-xl text-xs border border-border focus:outline-none focus:border-sb-green"
                      />
                    )}
                  </div>
                </div>
              )}

              {/* 2. Cover Banner Tab */}
              {activeTab === "banner" && (
                <div className="space-y-6">
                  {/* Live Banner Preview */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold text-sb-dark uppercase tracking-wider">
                        Live Banner Preview
                      </label>
                      <span className="text-[11px] text-text-muted">
                        Preview of how your profile header will look
                      </span>
                    </div>
                    
                    <div className="relative rounded-2xl overflow-hidden h-28 w-full border border-border shadow-inner bg-slate-950 flex items-start justify-between p-3.5">
                      {formBannerType === "image" && formCustomBannerUrl ? (
                        <img
                          src={formCustomBannerUrl}
                          alt="Banner Preview"
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      ) : (
                        <div
                          className={`absolute inset-0 ${
                            bannerGradients[formBannerKey]?.bgClass || bannerGradients.emerald.bgClass
                          }`}
                        />
                      )}
                      
                      {/* Scrim overlay */}
                      <div className="absolute inset-0 bg-black/30" />
                      
                      {/* Badge in preview */}
                      <div className="relative z-10 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-white border border-white/10">
                        <ShieldCheck size={12} className="text-sb-wash" /> Verified Finalist
                      </div>

                      {/* Mock avatar cutout in corner */}
                      <div className="relative z-10 self-end -mb-1">
                        <div className="w-10 h-10 rounded-full ring-2 ring-white shadow-md overflow-hidden bg-white">
                          <Avatar src={formAvatar} name={formName} size="sm" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Banner Style Toggle */}
                  <div>
                    <label className="block text-xs font-bold text-sb-dark uppercase tracking-wider mb-2">
                      Cover Banner Style
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setFormBannerType("image")}
                        className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                          formBannerType === "image"
                            ? "border-sb-green bg-sb-bg shadow-sm"
                            : "border-border hover:border-sb-light"
                        }`}
                      >
                        <span className="text-xs font-bold text-sb-dark flex items-center gap-1.5">
                          <ImageIcon size={14} className="text-sb-green" /> Custom Wallpaper / Photos
                        </span>
                        <p className="text-[11px] text-text-muted mt-0.5">
                          Upload file, paste image URL, or pick sample
                        </p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFormBannerType("gradient")}
                        className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                          formBannerType === "gradient"
                            ? "border-sb-green bg-sb-bg shadow-sm"
                            : "border-border hover:border-sb-light"
                        }`}
                      >
                        <span className="text-xs font-bold text-sb-dark flex items-center gap-1.5">
                          <Palette size={14} className="text-sb-green" /> Gradient Schemes
                        </span>
                        <p className="text-[11px] text-text-muted mt-0.5">
                          Curated hackathon dynamic gradients
                        </p>
                      </button>
                    </div>
                  </div>

                  {/* Image Options: Upload, URL, Samples */}
                  {formBannerType === "image" && (
                    <div className="space-y-5">
                      {/* Upload Box */}
                      <div className="p-4 bg-surface rounded-2xl border border-dashed border-border hover:border-sb-green transition-colors space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-sb-bg text-sb-green flex items-center justify-center shrink-0 border border-sb-wash">
                              <Upload size={18} />
                            </div>
                            <div>
                              <span className="text-xs font-bold text-sb-dark block">
                                Upload Custom Banner Image
                              </span>
                              <p className="text-[11px] text-text-muted">
                                Recommended: 1400×400px (PNG, JPG, WebP up to 10MB)
                              </p>
                            </div>
                          </div>
                          
                          <label className="px-4 py-2 bg-sb-dark hover:bg-sb-green text-white text-xs font-semibold rounded-xl cursor-pointer inline-flex items-center justify-center gap-1.5 transition-all shadow-xs shrink-0">
                            <Camera size={13} /> Browse Files
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleBannerUpload}
                              className="hidden"
                            />
                          </label>
                        </div>

                        {/* Direct Image URL input */}
                        <div className="pt-2 border-t border-border/60">
                          <label className="block text-[11px] font-semibold text-text-muted mb-1.5">
                            Or Use Direct Image URL:
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="url"
                              placeholder="https://images.unsplash.com/photo-..."
                              value={formCustomBannerUrl}
                              onChange={(e) => setFormCustomBannerUrl(e.target.value)}
                              className="flex-1 p-2.5 bg-white rounded-xl text-xs border border-border focus:outline-none focus:border-sb-green"
                            />
                            {formCustomBannerUrl && (
                              <button
                                type="button"
                                onClick={() => setFormCustomBannerUrl("")}
                                className="px-3 py-2 text-xs text-text-muted hover:text-red-500 bg-white border border-border rounded-xl cursor-pointer"
                                title="Clear URL"
                              >
                                Clear
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Sample Wallpapers Section */}
                      <div className="space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <span className="text-xs font-bold text-sb-dark uppercase tracking-wider block">
                            Sample Tech &amp; Hackathon Banners:
                          </span>
                          
                          {/* Category Filter Pills */}
                          <div className="flex items-center gap-1 overflow-x-auto pb-1">
                            {["All", "AI & Tech", "Developer", "Hardware & IoT", "Design", "Abstract"].map(
                              (cat) => (
                                <button
                                  key={cat}
                                  type="button"
                                  onClick={() => setBannerCategoryFilter(cat)}
                                  className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all whitespace-nowrap cursor-pointer ${
                                    bannerCategoryFilter === cat
                                      ? "bg-sb-dark text-white shadow-2xs"
                                      : "bg-surface text-text-muted hover:bg-surface-hover hover:text-sb-dark border border-border/60"
                                  }`}
                                >
                                  {cat}
                                </button>
                              )
                            )}
                          </div>
                        </div>

                        {/* Banner Samples Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-64 overflow-y-auto pr-1">
                          {sampleBannerImages
                            .filter(
                              (s) =>
                                bannerCategoryFilter === "All" ||
                                s.category === bannerCategoryFilter
                            )
                            .map((sample) => {
                              const isSelected =
                                formCustomBannerUrl === sample.src && formBannerType === "image";
                              return (
                                <button
                                  key={sample.id}
                                  type="button"
                                  onClick={() => {
                                    setFormCustomBannerUrl(sample.src);
                                    setFormBannerType("image");
                                  }}
                                  className={`relative rounded-2xl overflow-hidden border-2 text-left h-24 group transition-all cursor-pointer ${
                                    isSelected
                                      ? "border-sb-green ring-2 ring-sb-green/40 shadow-md"
                                      : "border-border hover:border-sb-light"
                                  }`}
                                >
                                  <img
                                    src={sample.src}
                                    alt={sample.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    loading="lazy"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-2">
                                    <span className="text-[10px] text-sb-wash/90 font-mono uppercase tracking-wider">
                                      {sample.category}
                                    </span>
                                    <span className="text-[11px] font-bold text-white drop-shadow-sm truncate">
                                      {sample.name}
                                    </span>
                                  </div>
                                  {isSelected && (
                                    <span className="absolute top-1.5 right-1.5 bg-sb-green text-white rounded-full p-1 shadow-xs">
                                      <Check size={12} />
                                    </span>
                                  )}
                                </button>
                              );
                            })}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Gradient Themes */}
                  {formBannerType === "gradient" && (
                    <div className="space-y-3">
                      <span className="text-xs font-bold text-sb-dark uppercase tracking-wider block">
                        Select Gradient Scheme:
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {Object.entries(bannerGradients).map(([key, b]) => {
                          const isSelected =
                            formBannerKey === key && formBannerType === "gradient";
                          return (
                            <button
                              key={key}
                              type="button"
                              onClick={() => {
                                setFormBannerKey(key);
                                setFormBannerType("gradient");
                              }}
                              className={`p-3 rounded-2xl border-2 text-left transition-all relative overflow-hidden cursor-pointer ${
                                isSelected
                                  ? "border-sb-green shadow-sm ring-2 ring-sb-green/20 bg-sb-bg/30"
                                  : "border-border hover:border-sb-light bg-surface"
                              }`}
                            >
                              <div className={`h-12 rounded-xl ${b.bgClass} mb-2 shadow-inner`} />
                              <span className="text-xs font-bold text-sb-dark block">{b.name}</span>
                              {isSelected && (
                                <span className="absolute top-2 right-2 bg-white rounded-full p-0.5 text-sb-green shadow-xs">
                                  <Check size={12} />
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 3. Photo Tab */}
              {activeTab === "photo" && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-sb-dark uppercase tracking-wider mb-3">
                      Profile Photo
                    </label>
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar src={formAvatar} name={formName} size="xl" />
                      <div className="space-y-2">
                        <label className="px-3.5 py-2 bg-sb-dark hover:bg-sb-green text-white text-xs font-semibold rounded-xl cursor-pointer inline-flex items-center gap-1.5 transition-all shadow-xs">
                          <Camera size={14} /> Upload Custom Photo
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarUpload}
                            className="hidden"
                          />
                        </label>
                        <p className="text-[11px] text-text-muted">
                          Upload PNG, JPG or select a preset avatar
                        </p>
                      </div>
                    </div>

                    <p className="text-xs font-semibold text-sb-dark mb-2">Preset Avatars:</p>
                    <div className="flex gap-3 overflow-x-auto pb-2">
                      {presetAvatars.map((preset) => (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => setFormAvatar(preset.src)}
                          className={`p-1.5 rounded-2xl border-2 transition-all shrink-0 cursor-pointer ${
                            formAvatar === preset.src
                              ? "border-sb-green bg-sb-bg"
                              : "border-border hover:border-sb-light"
                          }`}
                        >
                          <Avatar src={preset.src} name={preset.name} size="md" />
                          <p className="text-[10px] text-text-muted mt-1 text-center font-medium">
                            {preset.name.split(" ")[0]}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 4. Languages Tab */}
              {activeTab === "languages" && (
                <div className="space-y-5">
                  <form
                    onSubmit={handleAddLanguage}
                    className="p-4 bg-surface rounded-2xl border border-border space-y-3"
                  >
                    <span className="text-xs font-bold text-sb-dark uppercase tracking-wider">
                      Add New Programming Language
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      <input
                        type="text"
                        placeholder="Language (e.g. Rust, Go, Java)"
                        value={newLangName}
                        onChange={(e) => setNewLangName(e.target.value)}
                        className="p-2 bg-white rounded-xl text-xs border border-border focus:outline-none focus:border-sb-green"
                        required
                      />
                      <select
                        value={newLangLevel}
                        onChange={(e) =>
                          setNewLangLevel(e.target.value as LanguageProficiency["level"])
                        }
                        className="p-2 bg-white rounded-xl text-xs border border-border focus:outline-none"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Expert">Expert</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Years (e.g. 3 yrs)"
                        value={newLangYears}
                        onChange={(e) => setNewLangYears(e.target.value)}
                        className="p-2 bg-white rounded-xl text-xs border border-border focus:outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-sb-dark hover:bg-sb-green text-white text-xs font-semibold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus size={14} /> Add Language
                    </button>
                  </form>

                  <div className="space-y-2">
                    <p className="text-xs font-bold text-sb-dark uppercase tracking-wider">
                      Current Languages ({languages.length})
                    </p>
                    <div className="space-y-2">
                      {languages.map((l) => (
                        <div
                          key={l.name}
                          className="p-3 bg-white rounded-xl border border-border flex items-center justify-between"
                        >
                          <div>
                            <span className="text-xs font-bold text-sb-dark">{l.name}</span>
                            <span className="text-[11px] text-text-muted ml-2">
                              • {l.level} ({l.years})
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveLanguage(l.name)}
                            className="text-red-500 hover:text-red-700 p-1 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 5. Skills Tab */}
              {activeTab === "skills" && (
                <div className="space-y-5">
                  <form
                    onSubmit={handleAddSkill}
                    className="p-4 bg-surface rounded-2xl border border-border space-y-3"
                  >
                    <span className="text-xs font-bold text-sb-dark uppercase tracking-wider">
                      Add Technical Skill
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Skill (e.g. Docker, PyTorch, GraphQL)"
                        value={newSkillText}
                        onChange={(e) => setNewSkillText(e.target.value)}
                        className="p-2 bg-white rounded-xl text-xs border border-border focus:outline-none focus:border-sb-green"
                        required
                      />
                      <select
                        value={newSkillCategory}
                        onChange={(e) =>
                          setNewSkillCategory(e.target.value as keyof typeof skillCategories)
                        }
                        className="p-2 bg-white rounded-xl text-xs border border-border focus:outline-none"
                      >
                        <option value="frameworks">Web &amp; Frameworks</option>
                        <option value="ai_ml">AI / ML &amp; RAG</option>
                        <option value="cloud_devops">Database &amp; Cloud</option>
                        <option value="domains">Domain Expertise</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-sb-dark hover:bg-sb-green text-white text-xs font-semibold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus size={14} /> Add Skill Tag
                    </button>
                  </form>

                  {(["frameworks", "ai_ml", "cloud_devops", "domains"] as const).map((cat) => (
                    <div key={cat} className="space-y-2">
                      <span className="text-xs font-bold text-text-muted uppercase tracking-wider">
                        {cat.replace("_", " ")}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {skillCategories[cat].map((s) => (
                          <span
                            key={s}
                            className="px-3 py-1 bg-surface border border-border text-xs rounded-xl flex items-center gap-2"
                          >
                            <span>{s}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveSkill(cat, s)}
                              className="text-text-muted hover:text-red-500 cursor-pointer"
                            >
                              <X size={12} />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 6. Experience Tab */}
              {activeTab === "experience" && (
                <div className="space-y-5">
                  <form
                    onSubmit={handleAddExperience}
                    className="p-4 bg-surface rounded-2xl border border-border space-y-3"
                  >
                    <span className="text-xs font-bold text-sb-dark uppercase tracking-wider">
                      Add Hackathon / Work Experience
                    </span>
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="Role / Title (e.g. Frontend Lead)"
                        value={newExpRole}
                        onChange={(e) => setNewExpRole(e.target.value)}
                        className="w-full p-2 bg-white rounded-xl text-xs border border-border focus:outline-none"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Organization or Hackathon Event (e.g. Smart India Hackathon)"
                        value={newExpCompany}
                        onChange={(e) => setNewExpCompany(e.target.value)}
                        className="w-full p-2 bg-white rounded-xl text-xs border border-border focus:outline-none"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Duration (e.g. Aug 2026 - Sep 2026)"
                        value={newExpDuration}
                        onChange={(e) => setNewExpDuration(e.target.value)}
                        className="w-full p-2 bg-white rounded-xl text-xs border border-border focus:outline-none"
                      />
                      <textarea
                        rows={2}
                        placeholder="Key responsibilities & accomplishments..."
                        value={newExpDesc}
                        onChange={(e) => setNewExpDesc(e.target.value)}
                        className="w-full p-2 bg-white rounded-xl text-xs border border-border focus:outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-sb-dark hover:bg-sb-green text-white text-xs font-semibold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus size={14} /> Add Experience Item
                    </button>
                  </form>

                  <div className="space-y-3">
                    {experiences.map((exp) => (
                      <div
                        key={exp.id}
                        className="p-3 bg-white rounded-xl border border-border flex items-start justify-between"
                      >
                        <div>
                          <h5 className="text-xs font-bold text-sb-dark">{exp.role}</h5>
                          <p className="text-[11px] text-sb-mid font-medium">
                            {exp.company} • {exp.duration}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setExperiences(experiences.filter((e) => e.id !== exp.id))}
                          className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 7. Social Links Tab */}
              {activeTab === "socials" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-sb-dark uppercase tracking-wider mb-1.5">
                      GitHub Profile URL
                    </label>
                    <input
                      type="url"
                      value={formGithub}
                      onChange={(e) => setFormGithub(e.target.value)}
                      placeholder="https://github.com/username"
                      className="w-full p-2.5 bg-surface rounded-xl text-xs border border-border focus:outline-none focus:border-sb-green"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-sb-dark uppercase tracking-wider mb-1.5">
                      LinkedIn Profile URL
                    </label>
                    <input
                      type="url"
                      value={formLinkedin}
                      onChange={(e) => setFormLinkedin(e.target.value)}
                      placeholder="https://linkedin.com/in/username"
                      className="w-full p-2.5 bg-surface rounded-xl text-xs border border-border focus:outline-none focus:border-sb-green"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-sb-dark uppercase tracking-wider mb-1.5">
                      Portfolio / Website URL
                    </label>
                    <input
                      type="url"
                      value={formPortfolio}
                      onChange={(e) => setFormPortfolio(e.target.value)}
                      placeholder="https://yourportfolio.dev"
                      className="w-full p-2.5 bg-surface rounded-xl text-xs border border-border focus:outline-none focus:border-sb-green"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-sb-dark uppercase tracking-wider mb-1.5">
                      LeetCode Profile URL
                    </label>
                    <input
                      type="url"
                      value={formLeetcode}
                      onChange={(e) => setFormLeetcode(e.target.value)}
                      placeholder="https://leetcode.com/username"
                      className="w-full p-2.5 bg-surface rounded-xl text-xs border border-border focus:outline-none focus:border-sb-green"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-border bg-surface flex items-center justify-end gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setEditModalOpen(false)}
                className="px-4 py-2 text-xs font-medium text-text-secondary hover:text-sb-dark cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveAll}
                className="px-5 py-2.5 bg-sb-dark hover:bg-sb-green text-white text-xs font-semibold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <CheckCircle2 size={14} /> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
