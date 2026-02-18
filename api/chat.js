import Groq from "groq-sdk";
import { DATA } from "../data/index.js";

/**
 * Helpers
 */
function safeArray(v) {
  return Array.isArray(v) ? v : [];
}

function truncateText(text = "", max = 500) {
  const t = String(text || "");
  if (t.length <= max) return t;
  return t.slice(0, max).trim() + "...";
}

/**
 * Make a small, token-friendly context.
 * Only pass what the chatbot needs.
 */
const summaryContext = {
  profile: {
    name: DATA?.profile?.name ?? "",
    title: DATA?.profile?.title ?? "",
    subtitle: DATA?.profile?.subtitle ?? "",
    email: DATA?.profile?.email ?? "",
    phone: DATA?.profile?.phone ?? "",
    location: DATA?.profile?.location ?? "",
    linkedin: DATA?.profile?.linkedin ?? "",
    github: DATA?.profile?.github ?? "",
    facebook: DATA?.profile?.facebook ?? "",
    summary: DATA?.profile?.summary ?? "",

    // added
    education: safeArray(DATA?.profile?.education).map((e) => ({
      degree: e?.degree ?? "",
      school: e?.school ?? "",
      period: e?.period ?? "",
      location: e?.location ?? "",
    })),

    // added (profile-level certifications)
    certifications: safeArray(DATA?.profile?.certifications).map((c) => ({
      title: c?.title ?? "",
      issuer: c?.issuer ?? "",
      year: c?.year ?? "",
    })),

    // optional but useful (kept small)
    stats: safeArray(DATA?.profile?.stats).map((s) => ({
      label: s?.label ?? "",
      value: s?.value ?? "",
      suffix: s?.suffix ?? "",
    })),
  },

  // skills: flatten categories -> one list
  skills: safeArray(DATA?.skills).flatMap((s) =>
    safeArray(s?.items).filter(Boolean)
  ),

  // projects: include problem/solution for better Q&A (still compact)
  projects: safeArray(DATA?.projects).map((p) => ({
    title: p?.title ?? "",
    category: p?.category ?? "",
    description: p?.description ?? "",
    problem: p?.problem ?? "",
    solution: p?.solution ?? "",
    tools: safeArray(p?.tools),
    impact: p?.impact ?? "",
  })),

  // experience: include period + achievements (kept as arrays)
  experience: safeArray(DATA?.experience).map((e) => ({
    company: e?.company ?? "",
    role: e?.role ?? "",
    years: e?.period ?? "",
    location: e?.location ?? "",
    employmentType: e?.employmentType ?? "",
    description: e?.description ?? "",
    achievements: safeArray(e?.achievements),
    skills: safeArray(e?.skills),
  })),

  // articles: keep only title + excerpt for token saving
  articles: safeArray(DATA?.articles).map((a) => ({
    title: a?.title ?? "",
    date: a?.date ?? "",
    category: a?.category ?? "",
    readTime: a?.readTime ?? "",
    summary: a?.excerpt ?? a?.summary ?? "",
  })),

  // certificates: from certificates.js (separate list)
  certificates: safeArray(DATA?.certificates).map((c) => ({
    title: c?.title ?? "",
    issuer: c?.issuer ?? "",
    date: c?.date ?? "",
  })),

  // gallery: captions only, trimmed
  gallery: safeArray(DATA?.gallery)
    .map((g) => g?.title || g?.caption || g?.name)
    .filter(Boolean)
    .slice(0, 30),
};

function stripMarkdown(text = "") {
  let t = String(text);

  t = t.replace(/```[\s\S]*?```/g, "");
  t = t.replace(/^\s{0,3}#{1,6}\s+/gm, "");
  t = t.replace(/\*\*(.*?)\*\*/g, "$1");
  t = t.replace(/\*(.*?)\*/g, "$1");
  t = t.replace(/__(.*?)__/g, "$1");
  t = t.replace(/_(.*?)_/g, "$1");
  t = t.replace(/^\s{0,3}>\s?/gm, "");
  t = t.replace(/^\s*[-*]\s+/gm, "• ");
  t = t.replace(/[<>`]/g, "");
  t = t.replace(/\n{3,}/g, "\n\n").trim();

  return t;
}

function buildSystemPrompt(context) {
  // Keep the context shorter so the model doesn’t drown
  const compactContext = {
    ...context,
    profile: {
      ...context.profile,
      summary: truncateText(context?.profile?.summary, 650),
    },
    experience: safeArray(context.experience).map((e) => ({
      ...e,
      description: truncateText(e?.description, 260),
      achievements: safeArray(e?.achievements).slice(0, 8),
      skills: safeArray(e?.skills).slice(0, 10),
    })),
    projects: safeArray(context.projects).map((p) => ({
      ...p,
      description: truncateText(p?.description, 220),
      problem: truncateText(p?.problem, 220),
      solution: truncateText(p?.solution, 220),
      tools: safeArray(p?.tools).slice(0, 12),
    })),
    skills: safeArray(context.skills).slice(0, 80),
    articles: safeArray(context.articles).slice(0, 20),
    certificates: safeArray(context.certificates).slice(0, 40),
  };

  return `
You are an AI assistant for Salam Domingo Kling's portfolio.

OUTPUT RULES (STRICT):
- Plain text only.
- Do not use markdown at all.
- Do not use these characters for formatting: *, #, _, \`, ~
- Do not use long intros like "I have data about..."
- Answer directly and cleanly.

STYLE:
- Simple sentences.
- Short sections.
- Use normal words.
- If listing items, use this format:

Skills:
• item
• item

Projects:
• Title - short description

Experience:
• Role at Company (Years)

Education:
• Degree - School (Years)

Certificates:
• Title - Issuer (Date or Year)

If information is missing, say "Not listed in the portfolio."

Portfolio data:
${JSON.stringify(compactContext)}
`.trim();
}

export default async function handler(req, res) {
  // CORS (lock this later to your domain)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  try {
    const { messages } = req.body || {};
    const safeMessages = Array.isArray(messages) ? messages : [];

    // remove any system messages coming from frontend
    const filteredMessages = safeMessages
      .filter((m) => m?.role === "user" || m?.role === "assistant")
      .map((m) => ({
        role: m.role,
        content: String(m.content || "").slice(0, 2000), // prevent huge payloads
      }));

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const systemMessage = {
      role: "system",
      content: buildSystemPrompt(summaryContext),
    };

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [systemMessage, ...filteredMessages],
      temperature: 0.2,
      max_tokens: 700,
    });

    const rawReply = completion?.choices?.[0]?.message?.content ?? "";
    const cleanReply = stripMarkdown(rawReply);

    return res.status(200).json({ reply: cleanReply });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "AI request failed" });
  }
}
