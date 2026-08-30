# 🚀 BECARTHAI TalentVision

> **Enterprise AI-Powered Talent Assessment & Real-Time Video Evaluation Platform**  
> Built with Next.js 14, Convex Real-Time Backend, Google Gemini AI, Stream Video SDK, and Clerk Authentication.

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Convex](https://img.shields.io/badge/Convex-1.42-FF5840?style=for-the-badge&logo=convex)](https://convex.dev/)
[![Stream](https://img.shields.io/badge/Stream_Video-SDK-005FFF?style=for-the-badge&logo=stream)](https://getstream.io/video/)
[![Gemini AI](https://img.shields.io/badge/Google_Gemini-AI_Screening-8E75FF?style=for-the-badge&logo=google)](https://ai.google.dev/)
[![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?style=for-the-badge&logo=clerk)](https://clerk.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38BDF8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)

---

## 📌 Executive Summary

**BECARTHAI TalentVision** is a next-generation, high-signal talent assessment and interview management workspace engineered for **BECARTH.AI Consulting**. 

The platform revolutionizes standard hiring workflows by unifying automated AI resume screening, dynamic skill assessment generation, live collaborative coding environments, real-time video evaluation calls, and candidate shortlisting into a single reactive workspace.

![BECARTHAI TalentVision Dashboard](images/pub.png)

---

## ✨ Key Features & Capabilities

### 🤖 1. AI CV Screening & Match Engine
- **Automated Resume Parsing**: Evaluates candidate resumes/CVs against structured job profiles using **Google Gemini AI**.
- **Match Score & Skill Breakdown**: Calculates percentage compatibility scores, extracts hard/soft skills, identifies experience gaps, and suggests tailored interview questions.
- **Custom AI Screening Policies**: Recruiters can set customized pass/fail thresholds and screening rules to automatically triage applications.
- **Interactive AI Insights Dashboard**: Comprehensive breakdown of candidate pipelines, match analytics, and shortlisting recommendations.

### 📹 2. HD Live Video Interview Suite
- **Stream Video Integration**: High-definition video and audio streaming built on **GetStream Video SDK**.
- **Real-Time Controls**: Camera/microphone toggles, screen sharing, speaker layout switching, and live participant status.
- **Session Recording Vault**: Built-in support for recording live video interviews with cloud storage access for post-interview team reviews.

### 💻 3. Collaborative Live Code Editor
- **Monaco Code Editor**: Integrated Monaco editor (`@monaco-editor/react`) inside the live interview environment.
- **Multi-Language Support**: Interactive sandbox for JavaScript, Python, Java, and technical problem solving during live technical rounds.
- **Real-Time Code Sync**: Real-time code synchronization between candidates and interviewers powered by Convex reactive functions.

### 🎯 4. AI-Powered Job & QCM Assessment Generator
- **Job Description Generation**: Generates full, structured job postings based on role titles and skill requirements.
- **Dynamic Assessment Generator**: Automatically creates role-specific Multiple-Choice Question (QCM) banks.
- **Pre-Call Assessment Gate**: Candidate pre-call verification and quiz gate before entering the live interview room.

### 📊 5. Recruiter Command Center & Workflow Management
- **Role-Based Workspaces**: Seamless toggle between Candidate view and Recruiter Super Command Center.
- **Application Lifecycle Tracking**: Manages candidates across stages (*Submitted*, *AI Shortlisted*, *Interview Scheduled*, *Passed*, *Rejected*).
- **Structured Scoring & Feedback**: Evaluators can record interview notes, rate technical/soft skills, and submit final hiring decisions.
- **Automated Email Notifications**: Integrates with **Resend** to dispatch automated interview invites and updates to candidates.

---

## 🏗 System Architecture & Design

BECARTHAI TalentVision uses a reactive 3-tier system architecture designed for high scalability, zero-latency state synchronization, and secure multi-tenant access.

### 🖼 Architectural Overview

#### 🏛 3-Tier Enterprise Architecture
![Three Tier Architecture](images/three_tier_architecture.png)

#### ⚙ Software & Service Integration Architecture
![Software Architecture](images/software_architecture.png)

#### 🤖 AI Pipeline Flow
![AI Pipeline](images/ai_pipeline.png)

#### 👥 System Use Case Blueprint
![Use Case Diagram](images/talentvision_use_case_diagram.png)

---

## 🛠 Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | Next.js 14 (App Router) | Server-rendered & client-side reactive components |
| **Language** | TypeScript | End-to-end type safety |
| **Styling & UI** | Tailwind CSS + Radix UI / shadcn | Modern responsive dark/light UI design system |
| **Backend & Database** | Convex (`v1.42+`) | Real-time reactive database, serverless functions & webhooks |
| **Video Engine** | Stream Video React SDK (`v1.39+`) | Live video/audio calls, screen share, and recording |
| **AI Engine** | Google Gemini API (`gemini-2.5-flash` / `gemini-3.6-flash`) | Resume analysis, job profile generation & assessment creation |
| **Authentication** | Clerk Auth (`v6.9+`) | OAuth, session management & role-based authorization |
| **Email Service** | Resend API | Automated candidate notifications & interview invitations |
| **Code Execution** | Monaco Editor | Interactive live coding during technical interviews |

---

## 📂 Project Structure

```text
BECARTHAI-TalentVision/
├── convex/                   # Convex Serverless Backend Functions & Schema
│   ├── _generated/           # Auto-generated Convex type definitions
│   ├── aiInsights.ts         # Analytics & recruitment insights queries
│   ├── applicationAnalysis.ts# Gemini AI resume parsing & scoring backend
│   ├── applications.ts       # Candidate application state & lifecycle mutations
│   ├── assessments.ts        # QCM question bank & candidate scoring logic
│   ├── chat.ts               # In-meeting real-time candidate/interviewer chat
│   ├── codeSessions.ts       # Live Monaco code editor sync functions
│   ├── comments.ts           # Interviewer evaluation feedback & rating logic
│   ├── http.ts               # Webhook routing (Clerk user sync)
│   ├── interviews.ts         # Meeting scheduling & call state management
│   ├── jobGeneration.ts      # Gemini AI job description generator
│   └── schema.ts             # Database schemas & index definitions
│
├── src/                      # Next.js Application Source Code
│   ├── actions/              # Server actions (Stream token generation, Resend email)
│   ├── app/                  # Next.js App Router Page Routes
│   │   ├── (admin)/dashboard/# Recruiter Super Command Center (Jobs, AI Insights, Shortlisted)
│   │   ├── (root)/           # Core application routes (Home, Schedule, Meeting, Recordings)
│   │   ├── apply/            # Public candidate application portal
│   │   └── jobs/             # Job board & detail pages
│   ├── components/           # Reusable UI & Feature Components
│   │   ├── applications/     # Application cards, filters & details drawer
│   │   ├── assessments/      # Dynamic QCM quiz components & scorecards
│   │   ├── jobs/             # AI Job Editor & management tools
│   │   ├── CodeEditor.tsx    # Live collaborative Monaco code editor
│   │   ├── MeetingRoom.tsx   # Stream video interview conference room
│   │   ├── MeetingSetup.tsx   # Audio/Video preview & assessment gate
│   │   └── RoleSwitcher.tsx  # Dynamic candidate/recruiter role switcher
│   ├── hooks/                # Custom React hooks (Stream video, Convex queries)
│   └── lib/                  # Utilities, formatters, and client instances
│
├── images/                   # Technical architecture & workflow diagrams
└── public/                   # Static assets (Language icons, favicon)
```

---

## ⚡ Getting Started

Follow these steps to set up and run **BECARTHAI TalentVision** locally on your machine.

### Prerequisites

Ensure you have the following installed:
- **Node.js**: `v18.x` or higher
- **npm** or **pnpm** / **yarn**
- **Git**

Accounts needed for API credentials:
1. [Convex Account](https://convex.dev) (Real-time backend database)
2. [Clerk Account](https://clerk.com) (Authentication provider)
3. [Stream Account](https://getstream.io/video) (Video SDK provider)
4. [Google AI Studio Account](https://aistudio.google.com) (Gemini API key)
5. [Resend Account](https://resend.com) (Email notification provider, optional)

---

### 📥 1. Clone the Repository

```bash
git clone https://github.com/MohamedAnasBenMim/test-talent-vision.git
cd BECARTHAI-TalentVision
```

---

### 📦 2. Install Dependencies

```bash
npm install
```

---

### 🔑 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Convex Database Deployment
CONVEX_DEPLOYMENT=dev:your-deployment-name
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
NEXT_PUBLIC_CONVEX_SITE_URL=https://your-deployment.convex.site

# Stream Video SDK
NEXT_PUBLIC_STREAM_API_KEY=your_stream_api_key
STREAM_SECRET_KEY=your_stream_secret_key

# Resend Email Integration
RESEND_API_KEY=your_resend_api_key
INTERVIEW_INVITE_FROM="BECARTHAI TalentVision <onboarding@resend.dev>"

# Gemini AI Integration (Local reference)
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash
```

Set required secret keys in your **Convex Backend Environment**:

```bash
# Set Gemini API key for AI Resume & Assessment backend functions
npx convex env set GEMINI_API_KEY your_gemini_api_key
npx convex env set GEMINI_MODEL gemini-2.5-flash

# Set Clerk Webhook Secret (if using Clerk user sync via convex/http.ts)
npx convex env set CLERK_WEBHOOK_SECRET your_clerk_webhook_secret
```

---

### 🚀 4. Run Development Servers

Start the **Convex backend development engine** (in terminal 1):

```bash
npx convex dev
```

Start the **Next.js frontend application** (in terminal 2):

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## ⚙ Environment Variables Reference

| Variable Name | Required | Scope | Description |
| :--- | :---: | :--- | :--- |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Yes | Client | Clerk authentication publishable frontend key |
| `CLERK_SECRET_KEY` | Yes | Server | Clerk authentication secret key |
| `CONVEX_DEPLOYMENT` | Yes | Server/CLI | Active Convex deployment identifier |
| `NEXT_PUBLIC_CONVEX_URL` | Yes | Client | Public Convex WebSocket endpoint URL |
| `NEXT_PUBLIC_CONVEX_SITE_URL` | Yes | Client | Convex HTTP actions site URL |
| `NEXT_PUBLIC_STREAM_API_KEY` | Yes | Client | GetStream.io Video API Key |
| `STREAM_SECRET_KEY` | Yes | Server | GetStream.io Video Secret Key |
| `GEMINI_API_KEY` | Yes | Convex Env | Google Gemini API Key for AI resume screening & QCM generation |
| `GEMINI_MODEL` | Yes | Convex Env | Model version used by Convex AI functions (`gemini-2.5-flash` / `gemini-3.6-flash`) |
| `RESEND_API_KEY` | Optional | Server | Resend API Key for automated email dispatches |
| `INTERVIEW_INVITE_FROM` | Optional | Server | Sender email header address for automated interview invites |

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Runs the Next.js development server on `http://localhost:3000` |
| `npx convex dev` | Starts the Convex local development deployment sync |
| `npm run build` | Compiles and builds the production application bundle |
| `npm run start` | Starts the production Next.js application server |
| `npm run lint` | Runs Next.js ESLint verification across source files |

---

## 🤝 Contributing & Maintenance

Built and maintained for **BECARTH.AI Consulting**. Contributions, bug reports, and feature proposals are welcome via Pull Requests.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
