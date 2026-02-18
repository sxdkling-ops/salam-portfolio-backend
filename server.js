import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";
import { DATA } from "./data/index.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

/**
 * Make a small, token-friendly context.
 * Also avoids missing fields (skills empty, etc.).
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
  },
  skills: Array.isArray(DATA?.skills) ? DATA.skills.map((s) => s?.name).filter(Boolean) : [],
  projects: Array.isArray(DATA?.projects)
    ? DATA.projects.map((p) => ({
        title: p?.title ?? "",
        description: p?.description ?? "",
        tools: Array.isArray(p?.tools) ? p.tools : [],
        impact: p?.impact ?? "",
      }))
    : [],
  experience: Array.isArray(DATA?.experience)
    ? DATA.experience.map((e) => ({
        company: e?.company ?? "",
        role: e?.role ?? "",
        years: e?.years ?? "",
      }))
    : [],
  articles: Array.isArray(DATA?.articles)
    ? DATA.articles.map((a) => ({
        title: a?.title ?? "",
        summary: a?.summary ?? a?.excerpt ?? "",
      }))
    : [],
  certificates: Array.isArray(DATA?.certificates)
    ? DATA.certificates.map((c) => ({
        title: c?.title ?? "",
        issuer: c?.issuer ?? "",
      }))
    : [],
  gallery: Array.isArray(DATA?.gallery)
    ? DATA.gallery.map((g) => g?.title || g?.caption || g?.name).filter(Boolean)
    : [],
};

/**
 * Hard-enforce "clean text":
 * - remove markdown headers/bold/italics/code fences
 * - remove bullet symbols that look like markdown
 * - normalize spacing/newlines
 */
function stripMarkdown(text = "") {
  let t = String(text);

  // Remove code fences
  t = t.replace(/```[\s\S]*?```/g, "");

  // Remove markdown headers like ### Title
  t = t.replace(/^\s{0,3}#{1,6}\s+/gm, "");

  // Remove bold/italic markers **text** *text* __text__ _text_
  t = t.replace(/\*\*(.*?)\*\*/g, "$1");
  t = t.replace(/\*(.*?)\*/g, "$1");
  t = t.replace(/__(.*?)__/g, "$1");
  t = t.replace(/_(.*?)_/g, "$1");

  // Remove blockquotes >
  t = t.replace(/^\s{0,3}>\s?/gm, "");

  // Convert markdown list markers to simple plain bullets (or remove)
  // "- item" or "* item" -> "• item"
  t = t.replace(/^\s*[-*]\s+/gm, "• ");

  // Remove leftover markdown junk characters (keeps normal punctuation)
  t = t.replace(/[<>`]/g, "");

  // Clean multiple blank lines
  t = t.replace(/\n{3,}/g, "\n\n").trim();

  return t;
}

/**
 * Optional: keep answers short and clean.
 * You can tweak these anytime.
 */
function buildSystemPrompt(context) {
  return `
You are an AI assistant for Salam Domingo Kling's portfolio.

OUTPUT RULES (STRICT):
- Plain text only.
- Do not use markdown at all.
- Do not use these characters for formatting: *, #, _, \`, ~
- Do not use headings like "1." with bold/italics.
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

If information is missing, say "Not listed in the portfolio."

Portfolio data:
${JSON.stringify(context)}
`.trim();
}

app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    // Safety: only accept an array of messages
    const safeMessages = Array.isArray(messages) ? messages : [];

    // Remove any system prompts coming from the client
    const filteredMessages = safeMessages.filter((m) => m?.role !== "system");

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

    res.json({ reply: cleanReply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI request failed" });
  }
});

app.listen(5000, () => {
  console.log("Groq AI server running on port 5000");
});
