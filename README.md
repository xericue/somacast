# Socrates — AI-Powered Micro-Rituals for Focus, Calm & Deep Work

Socrates is a next-generation **AI workflow companion** that uses open-source local models to transform how humans manage stress, focus, and productivity — without relying on any external APIs.  
Built for the **AI Workflow Reimagination Hackathon**.

## 🌿 What Is Socrates?

Socrates is not a chatbot — it is a **system of micro-rituals** designed to guide users toward emotional regulation and mental clarity during moments of stress, overwhelm, or distraction.

It combines:

- **Real-time sentiment analysis** (HuggingFace transformers)
- **Adaptive AI-generated workflows** (no OpenAI / API calls)
- **Breathing and grounding animations** (React + Framer Motion)
- **On-device inference** for privacy and speed
- **Context-aware guidance** for difficult moments

Whether a user is anxious, stuck on a task, or losing focus, Socrates instantly generates an actionable “ritual” to return to clarity.

---

## ✨ Core Features

### 🔍 1. Emotion & Stress Detection  
Lightweight on-device transformer models analyze user input to detect:
- Stress  
- Frustration  
- Overthinking  
- Burnout  
- Lack of clarity  
- Emotional overwhelm  

No data leaves the device.

### 🧘 2. Adaptive Ritual Engine  
The system generates micro-interventions such as:
- 30-second box-breathing  
- 1-minute grounding  
- Cognitive reframing prompts  
- Momentum-building tasks  
- Mini journaling exercises  
- Reset workflows  

Each ritual adapts dynamically based on detected emotional state.

### 🎬 3. Breathing & Grounding Visuals  
High-quality animations built with **Framer Motion**:
- Smooth expanding/contracting box-breathing guide  
- Wave-like visualizers  
- Calming transitions  

These run instantly in-browser.

### 💡 4. Fully Local AI  
Powered by:
- HuggingFace Transformers (distilbert, roberta sentiment, emotion classification)
- No OpenAI  
- No cloud inference  
- Zero external API calls  

Perfect for privacy, security, and offline use.

### 🎨 5. Beautiful Modern UI  
Built using:
- **Next.js 16**
- **React 19**
- **TailwindCSS**
- **shadcn/ui**
- **Framer Motion**

Smooth, responsive, minimalistic design inspired by Apple-style calm interfaces.

---

## 🧱 Tech Stack

**Frontend**
- Next.js 16  
- React 19  
- TailwindCSS 4  
- shadcn/ui  
- Framer Motion  

**AI & Processing**
- HuggingFace transformers  
- sentiment/emotion classification models  
- On-device inference  
- No OpenAI / no external API dependencies  

**Utilities**
- TypeScript  
- Vercel Analytics (optional)  

---

## 🚀 Getting Started

```bash
git clone https://github.com/<your-username>/socrates
cd socrates
npm install
npm run dev
