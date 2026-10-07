import type { Project } from "./types";

// CONTENT.md > Projects, verbatim.
export const creatorMatch: Project = {
  id: "creator-match",
  number: "01",
  name: "Creator Match",
  year: "2026",
  featured: true,
  tagline: "AI creator-matching tool for brands. Personal project.",
  live: "https://creator-match-ahsanullahdaud.vercel.app/",
  code: "https://github.com/ahsanullahdaud/creator-match",
  oneLine:
    "Turns a brand brief into ten scored YouTube creators, each with reasons, concerns and a draft outreach message, in about 12 seconds.",
  builtAiFirst:
    "Built AI-first with Claude Code in about eight hours of working sessions, from plan to production.",
  stack: [
    "Next.js 16",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Gemini API (structured outputs)",
    "YouTube Data API v3",
    "Upstash Redis",
    "Vitest",
    "Vercel",
  ],
  featuredChips: ["Next.js 16", "TypeScript", "Gemini API (structured outputs)", "Vercel"],
  highlights: [
    "Designed around free-tier limits of 100 YouTube searches and 500 LLM requests a day.",
    "7-day cache keyed on a normalised brief, so repeat briefs cost nothing.",
    "Per-visitor rate limits and global daily budgets that fail closed.",
    "Batched scoring cut LLM requests per brief from 11 to 3.",
    "Precomputed examples that still work when every quota is spent or Redis is down.",
    "158 automated tests with the LLM and YouTube clients mocked.",
  ],
};

export const priceComparison: Project = {
  id: "price-comparison",
  number: "02",
  name: "Price comparison tool",
  description:
    "React price comparison tool built for a private e-commerce client using AI-assisted development, working directly with the client from requirements to delivery.",
  note: "Client is private: no name, link or screenshots.",
  stack: ["React"],
};

export const cyberSecurity: Project = {
  id: "cyber-security-assessment",
  number: "03",
  name: "Cyber-security exposure assessment",
  year: "2024",
  description:
    "MSc final project. A web application that assesses an organisation's staff exposure to cyber-security threats: staff authentication, a 30-question assessment, individual risk scoring and organisation-level recommendations.",
  stack: ["ASP.NET MVC", "SQL Server"],
};

export const projects: readonly Project[] = [creatorMatch, priceComparison, cyberSecurity];
