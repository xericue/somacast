# 🧠 Somacast — Adaptive Emotional Workflow Engine

Socrates is an AI-powered emotional workflow system that transforms a user’s emotional state into a targeted, science-backed **micro-ritual**. In just one minute, users speak or type how they feel — and Socrates analyzes their tone, detects stress patterns, and responds with personalized calming sequences like **box breathing**, **grounding prompts**, or **focus-reset cycles**.

Built in 8 hours for a hackathon, Socrates demonstrates how **emotion-aware automation** can improve daily wellbeing and help users return to clarity and focus faster.

---

## 🚀 Features

### 🎙️ Real-Time Emotion Analysis
- Uses open-source HuggingFace models for sentiment & emotion classification  
- No OpenAI/closed APIs required  
- Fast, lightweight inference  

### 🧩 Adaptive Ritual Generator
- Converts emotional states into dynamic micro-rituals  
- Supports states such as stress, overwhelm, anxiety, low energy, and distraction  
- Rituals include:  
  - Box breathing animation  
  - Grounding prompts  
  - “Next best action” focus nudges  
  - Cognitive reset micro-tasks  

### 🌐 Public REST API
Somacast provides an API you can integrate with your own apps or automation tools.

#### `POST /api/analyze`
Send text → Receive emotional metadata  
**Returns:** `{ sentiment, emotion, intensity, recommendedRitual }`

#### `POST /api/ritual`
Send emotion → Receive structured ritual workflow

### 🖥️ Modern Frontend
- Next.js  
- React  
- Tailwind CSS  
- shadcn/ui  
- Framer Motion animations  

---

## 🏗️ Tech Stack

### Frontend
- Next.js 14  
- React 19  
- TailwindCSS  
- shadcn/ui  
- Framer Motion  

### AI
- HuggingFace Transformers (emotion classifier)  
- Optional Librosa audio preprocessing  

### Backend / API
- Next.js API routes  
- Node + Transformers inference  
- Ritual selection engine  

---

## 🔥 How It Works

1. User speaks describing how they feel
2. AI performs:  
   - Sentiment analysis  
   - Emotion classification  
   - Stress-level scoring  
3. Ritual engine maps emotion → recommended micro-ritual  
4. UI displays:  
   - Breathing guide  
   - Grounding prompt  
   - Small “reset” tasks  

This creates a new category: **emotional micro-workflow automation**.

---

## 🧪 Local Development

```bash
npm install
npm run dev

