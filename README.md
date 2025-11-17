🧠 Socrates — Adaptive Emotional Workflow Engine

Socrates is an AI-powered emotional workflow system that transforms a user’s emotional state into a targeted, science-backed micro-ritual.
In just one minute, users speak or type how they feel — and Socrates analyzes their tone, detects stress patterns, and responds with personalized calming sequences like box breathing, grounding prompts, or focus-reset cycles.

Built in 8 hours for a hackathon, Socrates demonstrates how emotion-aware automation can improve daily wellbeing and help users re-enter clarity and focus faster.

🚀 Features
🎙️ Real-Time Emotion Analysis

Uses open-source HuggingFace models for sentiment & emotion classification

Lightweight inference pipeline (no OpenAI API required)

Optimized for fast hackathon-level deployment

🧩 Adaptive Ritual Generator

Converts emotional states into dynamic micro-rituals

Supports stress, overwhelm, anxiety, low energy, and distraction

Ritual types include:

Box breathing animation

Grounding prompts

“Next best action’’ productivity nudges

Cognitive reset micro-tasks

🌐 Public REST API

Socrates includes a lightweight API for programmatic access:

POST /api/analyze

Send text → Receive emotional metadata
Returns: { sentiment, intensity, recommendedRitual }

POST /api/ritual

Send emotion → Receive a structured ritual workflow

This enables:

third-party integrations

automation

other teams building emotion-aware workflows

🖥️ Modern Frontend

Next.js 14

shadcn/ui + Tailwind CSS

Framer Motion for breathing animation

Minimalist, calming UI theme

🏗️ Tech Stack
Frontend

Next.js

React

TailwindCSS

shadcn/ui

Framer Motion

AI Pipeline

HuggingFace Transformers (DistilBERT emotion model)

Librosa (audio preprocessing optional)

Backend / API

Next.js API routes

Lightweight Node inference

JSON structured ritual schema

🔥 How It Works

User submits text describing how they feel

Backend model performs:

Sentiment analysis

Emotion classification

Stress-level estimation

Ritual engine maps emotion → recommended micro-ritual

UI displays:

breathing animation

grounding prompt

cognitive clarity steps

This is a new category: emotional micro-workflow automation.
