"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Sparkles,
  Target,
  Search,
  Users,
  Clock,
  CheckCircle2,
  Star,
  Zap,
  Shield,
  ChevronRight,
} from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Smart Matching",
    desc: "Find mentors who fit your project needs",
  },
  {
    icon: Target,
    title: "Explainable Results",
    desc: "See why a mentor is recommended",
  },
  {
    icon: Search,
    title: "Role Gap Detection",
    desc: "Identify missing skills in your team",
  },
  {
    icon: Clock,
    title: "Hackathon Ready",
    desc: "Get quick guidance during deadlines",
  },
];

const steps = [
  { num: "1", title: "Create a profile", desc: "Skills, interests, availability and portfolio links" },
  { num: "2", title: "Post or discover", desc: "Projects with roles, domain and timeline" },
  { num: "3", title: "Get explainable matches", desc: "See fit, gaps and match reasons" },
  { num: "4", title: "Build the team", desc: "Invite candidates and track missing roles" },
];

const stats = [
  { value: "500+", label: "Students" },
  { value: "50+", label: "Mentors" },
  { value: "200+", label: "Projects" },
  { value: "95%", label: "Match Rate" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <img
              src="/logo.png"
              alt="SkillBridge Logo"
              className="w-9 h-9 rounded-lg object-contain shadow-xs"
            />
            <span className="font-bold text-xl text-sb-dark tracking-tight">SkillBridge</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-text-secondary">
            <a href="#features" className="hover:text-sb-dark transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-sb-dark transition-colors">For Students</a>
            <a href="#mentors" className="hover:text-sb-dark transition-colors">For Mentors</a>
            <a href="#" className="hover:text-sb-dark transition-colors">Hackathons</a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/auth/signin"
              className="text-sm font-medium text-text-secondary hover:text-sb-dark transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-sb-dark text-white text-sm font-medium rounded-lg hover:bg-sb-green transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Get Started <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sb-bg/60 via-white to-primary-50/40" />
        <div className="absolute top-20 -right-40 w-[500px] h-[500px] bg-sb-wash/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-40 w-[400px] h-[400px] bg-primary-100/40 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-sb-bg border border-sb-wash rounded-full text-xs font-medium text-sb-dark mb-6">
                <Zap size={12} className="text-sb-gold" />
                Built for Hackathons
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-sb-dark leading-[1.1] tracking-tight">
                Your Hackathon.
                <br />
                <span className="text-sb-green">The Right Mentor.</span>
              </h1>

              <p className="mt-6 text-lg text-text-secondary leading-relaxed max-w-lg">
                Connect with experienced mentors who can help your team solve technical, product,
                design and presentation challenges.
              </p>

              <div className="mt-8 flex items-center gap-4">
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-sb-dark text-white font-semibold rounded-xl hover:bg-sb-green transition-all duration-300 shadow-lg shadow-sb-dark/20 hover:shadow-xl hover:shadow-sb-green/20 hover:-translate-y-0.5"
                >
                  Find a Mentor <ArrowRight size={16} />
                </Link>
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-sb-dark font-semibold rounded-xl border-2 border-border hover:border-sb-pale hover:bg-sb-bg transition-all duration-300"
                >
                  Become a Mentor
                </Link>
              </div>

              {/* Floating Tags */}
              <div className="mt-10 flex flex-wrap gap-2">
                {["AI/ML Mentor", "Product Guidance", "Pitch Mentor"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-white border border-border rounded-full text-xs font-medium text-text-secondary shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — Hero Image */}
            <div className="relative animate-slide-up hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-sb-dark/10 border border-border/50">
                <Image
                  src="/avatars/rahul.jpg"
                  alt="Mentorship session"
                  width={600}
                  height={400}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sb-dark/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="glass rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-sb-green flex items-center justify-center">
                        <CheckCircle2 size={20} className="text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-sb-dark">94% Match Found</p>
                        <p className="text-xs text-text-secondary">
                          Rahul Sharma • AI/ML Mentor • Available now
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating stats card */}
              <div className="absolute -left-8 top-12 glass rounded-xl p-3 shadow-lg animate-fade-in stagger-3">
                <div className="flex items-center gap-2">
                  <Star size={14} className="text-sb-gold fill-sb-gold" />
                  <span className="text-sm font-semibold text-sb-dark">4.9</span>
                  <span className="text-xs text-text-muted">(24 mentorships)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-surface-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-xl p-6 border border-border hover:border-sb-pale hover:shadow-lg hover:shadow-sb-pale/10 transition-all duration-300 group animate-fade-in"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="w-10 h-10 rounded-lg bg-sb-bg flex items-center justify-center mb-4 group-hover:bg-sb-wash transition-colors">
                    <Icon size={20} className="text-sb-green" />
                  </div>
                  <h3 className="font-semibold text-sb-dark text-sm">{f.title}</h3>
                  <p className="text-xs text-text-secondary mt-1">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-sb-dark">How SkillBridge Works</h2>
            <p className="mt-3 text-text-secondary max-w-xl mx-auto">
              A campus platform that translates skills, interests and project needs into clear
              recommendations.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-sb-dark text-white font-bold flex items-center justify-center text-sm">
                    {step.num}
                  </div>
                  {i < steps.length - 1 && (
                    <ChevronRight size={16} className="text-sb-pale absolute right-0 top-3 hidden md:block" />
                  )}
                </div>
                <h3 className="font-semibold text-sb-dark">{step.title}</h3>
                <p className="text-sm text-text-secondary mt-1">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiation */}
      <section id="mentors" className="py-24 bg-sb-dark text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-sb-green/20 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Why SkillBridge</h2>
            <p className="mt-3 text-sb-wash max-w-xl mx-auto">
              Most tools list people. SkillBridge helps form a balanced team around an actual
              project need.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: "Explainable Recommendations",
                desc: "Students see why a match fits. Every recommendation lists skills, interests and availability behind the score.",
              },
              {
                icon: Users,
                title: "Complementary Teams",
                desc: "Creators fill missing roles instead of collecting duplicate skills. Build balanced, diverse teams.",
              },
              {
                icon: Shield,
                title: "Campus Context",
                desc: "Availability, learning goals and hackathon urgency guide discovery. Built for the student workflow.",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-sb-green/20 flex items-center justify-center mb-5">
                    <Icon size={24} className="text-sb-pale" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-sb-wash leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-bold text-sb-dark">{stat.value}</div>
                <div className="text-sm text-text-secondary mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-sb-bg via-white to-primary-50">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-sb-dark">
            Ready to find your perfect team?
          </h2>
          <p className="mt-4 text-text-secondary">
            SkillBridge helps students find the right project, teammate and mentor with clear,
            explainable recommendations.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-sb-dark text-white font-semibold rounded-xl hover:bg-sb-green transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Get Started Free <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sb-dark text-sb-wash py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2.5">
              <img
                src="/logo.png"
                alt="SkillBridge Logo"
                className="w-8 h-8 rounded-lg object-contain bg-white/10 p-0.5"
              />
              <span className="font-bold text-white">SkillBridge</span>
            </div>
            <p className="text-sm text-sb-wash/70">
              © 2026 SkillBridge · Build With Bharat 4.0
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
