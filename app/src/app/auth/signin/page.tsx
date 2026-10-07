"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2, ArrowRight } from "lucide-react";

export default function SignInPage() {
  const [authLoading, setAuthLoading] = useState<"google" | "github" | "email" | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);
  const [email, setEmail] = useState("praveen@skillbridge.dev");
  const [password, setPassword] = useState("••••••••");

  const handleOAuthLogin = (provider: "google" | "github") => {
    setAuthLoading(provider);
    setTimeout(() => {
      setAuthLoading(null);
      setAuthSuccess(
        provider === "google"
          ? "Authenticated with Google (praveen.mishra@gmail.com)"
          : "Authenticated with GitHub (@praveenmishra)"
      );
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 600);
    }, 600);
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading("email");
    setTimeout(() => {
      setAuthLoading(null);
      setAuthSuccess("Welcome back, Praveen Mishra!");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 500);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sb-bg via-white to-primary-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <img
              src="/logo.png"
              alt="SkillBridge Logo"
              className="w-10 h-10 rounded-xl object-contain shadow-md group-hover:scale-105 transition-transform"
            />
            <span className="font-bold text-xl text-sb-dark tracking-tight">SkillBridge</span>
          </Link>
          <h1 className="mt-4 text-2xl font-bold text-sb-dark">Welcome back</h1>
          <p className="text-sm text-text-secondary mt-1">Sign in to your SkillBridge account</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-sb-dark/5 border border-border p-8 relative overflow-hidden">
          {authSuccess && (
            <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-20 flex flex-col items-center justify-center p-6 text-center animate-fade-in">
              <div className="w-14 h-14 rounded-full bg-sb-bg text-sb-green flex items-center justify-center mb-3 animate-bounce">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-base font-bold text-sb-dark">{authSuccess}</h3>
              <p className="text-xs text-text-muted mt-1">Redirecting to your Hackathon Dashboard...</p>
              <a
                href="/dashboard"
                className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-sb-dark hover:bg-sb-green text-white text-xs font-semibold rounded-xl transition-all shadow-md"
              >
                Enter Dashboard Now <ArrowRight size={14} />
              </a>
            </div>
          )}

          <div className="space-y-3">
            {/* Google Sign In Button */}
            <button
              onClick={() => handleOAuthLogin("google")}
              disabled={!!authLoading}
              className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-border rounded-xl text-sm font-semibold hover:bg-surface-hover hover:border-sb-light/60 transition-all disabled:opacity-60 shadow-xs cursor-pointer"
            >
              {authLoading === "google" ? (
                <Loader2 size={18} className="animate-spin text-sb-green" />
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              )}
              <span>{authLoading === "google" ? "Signing in with Google..." : "Continue with Google"}</span>
            </button>

            {/* GitHub Sign In Button */}
            <button
              onClick={() => handleOAuthLogin("github")}
              disabled={!!authLoading}
              className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-border rounded-xl text-sm font-semibold hover:bg-surface-hover hover:border-sb-light/60 transition-all disabled:opacity-60 shadow-xs cursor-pointer"
            >
              {authLoading === "github" ? (
                <Loader2 size={18} className="animate-spin text-sb-green" />
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              )}
              <span>{authLoading === "github" ? "Connecting GitHub Account..." : "Continue with GitHub"}</span>
            </button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-3 text-text-muted">or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-sb-dark mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="praveen@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-sb-green/20 focus:border-sb-green transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-sb-dark mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-sb-green/20 focus:border-sb-green transition-all"
                required
              />
            </div>
            <button
              type="submit"
              disabled={!!authLoading}
              className="w-full mt-2 py-2.5 bg-sb-dark text-white font-semibold rounded-xl hover:bg-sb-green transition-all duration-200 shadow-md hover:shadow-lg text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              {authLoading === "email" ? (
                <Loader2 size={16} className="animate-spin" />
              ) : null}
              <span>Sign In</span>
            </button>
          </form>

          <p className="text-center text-xs text-text-muted mt-5">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="text-sb-green font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
