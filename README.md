# 🌉 SkillBridge — Build with Bharat 4.0

> **AI-Powered Hackathon Teaming, Complementary Skill Matching & Real-Time Mentorship Platform**  
> *Developed for the Build with Bharat 4.0 Hackathon.*

---

## 🚀 Overview

**SkillBridge** bridges the gap between ambitious student developers and experienced industry mentors during fast-paced hackathons and sprint competitions. By leveraging AI-powered semantic matching, SkillBridge solves the critical hurdles student teams face: finding complementary teammates, filling technical skill gaps, and booking verified senior mentors on-demand.

---

## ✨ Core Features

### 1. 🤖 AI-Powered Mentor Match & Interactive Booking
- **Semantic Compatibility**: Calculates match scores ($98\%$, $92\%$, $86\%$) based on the team's project architecture and domain requirements.
- **Domain Filtering**: Filter mentors across *AI / ML, Healthcare Tech, Product & Pitch, Cloud Architecture, and Web Dev*.
- **Interactive Booking Flow**: Book 30-minute 1-on-1 sprint review slots with instant confirmation.

### 2. 👥 AI Complementary Teammate Discovery
- **Skill-Gap Analysis**: Automatically analyzes missing competencies in your project (e.g. *Needs ML Engineer & UI/UX Designer*).
- **Match Breakdown**: Evaluates technical synergy, availability overlap, and complementary strengths.
- **Direct Project Invitations**: Send custom personalized invitations with assigned roles directly from the platform.

### 3. 🎯 Hackathon Sprint Hub & Project Showcase
- **AI Hackathon Readiness Score**: Real-time evaluation of Code Quality ($94\%$), Pitch Deck ($85\%$), and Demo Readiness ($92\%$).
- **Milestone Sprint Tracker**: Interactive checklist tracking ideation, RAG integration, UI polish, and demo submissions.
- **Project Creator**: Instant creation modal with automated tech-stack tagging.

### 4. 📊 Team Management & Interactive Kanban Board
- **Team Roster**: Live member status indicators, skill tags, and GitHub profile shortcuts.
- **Coverage Matrix**: Real-time progress bars for Frontend, Backend, Database, AI/ML, and Pitch readiness.
- **Interactive Kanban**: Drag-free task progression (*To Do &rarr; In Progress &rarr; Completed*) with task creation.
- **Team Sync**: One-click team invite code generation (`BWB-2026`).

### 5. 💬 Mentorship Chat & AI Copilot
- **Live-Feel Chat Stream**: Seamless conversation switcher between senior mentors and hackathon squad.
- **AI Prompt Suggestions**: Pre-generated prompt pills (*"Review RAG retrieval latency"*, *"Critique pitch deck"*).
- **Instant Mentor Simulation**: Auto-responsive intelligent feedback.

### 6. 🎥 Live Virtual Mentorship Room
- **Simulation Interface**: Dual video feeds for mentor and mentee with mic/camera controls.
- **Collaborative Scratchpad**: Real-time markdown notes and code snippet review box.
- **Session History**: AI-summarized past meeting notes and actionable takeaways.

### 7. 👤 LinkedIn-Style Builder Profile & Customizer
- **Custom Cover Banner**: Choose from gradient themes (*Bharat Emerald, Cyber Indigo, Hackathon Dusk, Deep Ocean*).
- **Profile Photo Customizer**: Upload custom photos or select from preset avatars with circular aspect-ratio locking.
- **"Open to Hackathons" Status**: Customizable availability banner with target roles.
- **Languages & Skills Matrix**: Proficiency ratings (*Expert, Advanced, Intermediate*) with years of experience.
- **Work & Education History**: Structured experience cards, certifications, and portfolio links.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/) with Turbopack
- **UI & Components**: React 19, Tailwind CSS v4, Lucide React Icons
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailored HSL Palette with custom design tokens (`--color-sb-dark`, `--color-sb-green`, `--color-sb-wash`, etc.)
- **Performance**: 100% Statically Optimized Routes ($14/14$ routes prerendered)

---

## 📦 Project Structure

```bash
SkillBridge/
├── app/
│   ├── public/
│   │   └── avatars/          # Generated profile and mentor avatar assets
│   ├── src/
│   │   ├── app/
│   │   │   ├── auth/
│   │   │   │   ├── signin/   # Google & GitHub OAuth Sign In
│   │   │   │   └── signup/   # Role-based Sign Up (Student vs Mentor)
│   │   │   ├── dashboard/
│   │   │   │   ├── find-mentors/   # AI Mentor Matching & Booking
│   │   │   │   ├── find-teammates/ # AI Skill-Gap Matching
│   │   │   │   ├── messages/       # Chat Room & AI Copilot
│   │   │   │   ├── profile/        # LinkedIn-Style Profile Editor
│   │   │   │   ├── projects/       # Hackathon Showcase & Milestones
│   │   │   │   ├── sessions/       # Virtual Call Room Simulation
│   │   │   │   ├── team/           # Team Management & Kanban Board
│   │   │   │   └── page.tsx        # Dashboard Main View
│   │   │   ├── globals.css         # Custom Design Tokens & Utilities
│   │   │   ├── layout.tsx          # Root Layout
│   │   │   └── page.tsx            # Landing Page
│   │   ├── components/
│   │   │   ├── layout/       # Sidebar & TopBar
│   │   │   └── ui/           # Avatar, Badge, MatchCircle components
│   │   └── lib/
│   │       ├── data.ts       # Mock dataset for Hackathon simulation
│   │       └── types.ts      # TypeScript definitions
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17+ or 20+
- npm, pnpm, or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/utkarshsingh100m/SkilleBridge.git
   cd SkilleBridge/app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open in Browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🌐 Deployment

This application is ready for zero-config deployment on **Vercel**:

1. Push your code to GitHub.
2. Import the repository in [Vercel](https://vercel.com/new).
3. Set the **Root Directory** to `app`.
4. Deploy!

To build and test production locally:
```bash
cd app
npm run build
npm run start
```

---

## 🏆 Build with Bharat 4.0

- **Team Name**: Team Alpha
- **Project**: SkillBridge
- **Submission Track**: EdTech, AI, & Developer Productivity

---

## 📄 License

MIT License &copy; 2026 SkillBridge. Developed for Build with Bharat 4.0.
