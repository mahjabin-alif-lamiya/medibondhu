# MediBondhu — AI-Driven Healthcare Guidance Platform

**Live:** https://medibondhu.vercel.app

SciBlitz AI Challenge 2026 | Team AI104 (Solo Innovator) | Track A — Health & Society

## Problem
In rural Bangladesh, patients don't know which specialist to see. They waste consultations, delay treatment, and have no private channel for mental health crises.

## Solution
Describe your symptoms in Bengali, Banglish, or English. Gemini AI triages you into one of three outcomes:
- **Primary Guidance** — safe home-care advice for minor complaints
- **Specialist Referral** — the right doctor type + matched directory
- **Emergency Support** — crisis detection + one-tap call to helpline 1222

The AI detects your language and replies in it.

## Tech Stack
- Next.js 16 (App Router) + Tailwind CSS
- Next.js API Routes (server-side, keeps API key secure)
- Google Gemini 2.5 Flash via official SDK
- Deployed on Vercel

## How AI Works
Structured prompt engineering forces the LLM to return strict JSON (`type`, `message`, `specialist`). The `type` field drives the entire UI. The `specialist` field is constrained to English so a Bengali conversation can drive an English directory lookup.

## Run Locally
```bash
npm install
# create .env.local with: GEMINI_API_KEY=your_key
npm run dev
```

## Disclaimer
Preliminary guidance only. Not a substitute for a qualified doctor. Doctor records are synthetic placeholders.
