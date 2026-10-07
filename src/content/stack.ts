import type { SkillGroup } from "./types";

// CONTENT.md > Stack, verbatim and in the order written. "(learning)" becomes the flag.
export const skillGroups: readonly SkillGroup[] = [
  {
    id: "languages",
    name: "Languages",
    items: [
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "VB.NET" },
      { name: "SQL (T-SQL)" },
      { name: "HTML" },
      { name: "CSS" },
      { name: "C#", learning: true },
    ],
  },
  {
    id: "frontEnd",
    name: "Front end",
    items: [
      { name: "React" },
      { name: "Next.js" },
      { name: "Tailwind CSS" },
      { name: "jQuery" },
      { name: "Bootstrap" },
      { name: "Razor" },
    ],
  },
  {
    id: "backEnd",
    name: "Back end",
    items: [
      { name: "ASP.NET MVC" },
      { name: ".NET Framework" },
      { name: "Next.js route handlers" },
      { name: "REST APIs" },
      { name: "ASP.NET Core", learning: true },
    ],
  },
  {
    id: "data",
    name: "Data",
    items: [
      { name: "SQL Server" },
      { name: "stored procedures" },
      { name: "query optimisation" },
      { name: "Redis (Upstash)" },
    ],
  },
  {
    id: "ai",
    name: "AI",
    items: [
      { name: "Claude Code" },
      { name: "LLM API integration (Gemini)" },
      { name: "structured outputs" },
      { name: "prompt design" },
    ],
  },
  {
    id: "tools",
    name: "Tools",
    items: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "Vercel" },
      { name: "Vitest" },
      { name: "JIRA" },
      { name: "Confluence" },
    ],
  },
];
