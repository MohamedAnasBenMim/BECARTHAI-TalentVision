"use node";

import { action } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";

const DEFAULT_GEMINI_MODEL = "gemini-3.6-flash";
const GEMINI_MAX_ATTEMPTS = 3;

export const sendMessage = action({
  args: { 
    jobId: v.optional(v.string()),
    message: v.string(),
    history: v.array(v.object({ role: v.string(), content: v.string() }))
  },
  handler: async (ctx, args) => {
    let jobContext = "You are Vity AI, a helpful recruitment assistant for BECARTH.AI Consulting. You help candidates with general questions about the application process.";

    if (args.jobId) {
      const job = await ctx.runQuery(internal.applications.getJobByJobIdInternal, { jobId: args.jobId });
      if (job) {
        jobContext = `You are Vity AI, a helpful recruitment assistant for BECARTH.AI Consulting.
You are currently helping a candidate who is looking at the following job posting:
Title: ${job.title}
Location: ${job.location || 'Not specified'}
Contract Type: ${job.contractType || 'Not specified'}
Required Skills: ${job.requiredSkills.join(", ")}
Description: ${job.description}

Answer the candidate's questions about this role or the company. Be friendly, concise, and helpful. Do not promise them a job or an interview.`;
      }
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("GEMINI_API_KEY is missing");

    const customModel = process.env.GEMINI_MODEL;
    const candidates = customModel
      ? [customModel, "gemini-2.5-flash", "gemini-3.6-flash", "gemini-flash-latest"]
      : ["gemini-2.5-flash", "gemini-3.6-flash", "gemini-flash-latest"];
    const modelsToTry = candidates.filter((m, i, a) => m && a.indexOf(m) === i);

    // Convert history to Gemini format
    const contents = args.history.map(msg => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }]
    }));
    
    // Add current message
    contents.push({
      role: "user",
      parts: [{ text: args.message }]
    });

    const body = JSON.stringify({
      systemInstruction: { parts: [{ text: jobContext }] },
      contents,
      generationConfig: {
        maxOutputTokens: 500,
      },
    });

    let lastError = "";

    for (const model of modelsToTry) {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

      for (let attempt = 1; attempt <= GEMINI_MAX_ATTEMPTS; attempt++) {
        try {
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-goog-api-key": apiKey,
            },
            body,
          });

          if (response.ok) {
            const data = await response.json();
            const parts = data.candidates?.[0]?.content?.parts
              ?.filter((part: any) => typeof part.text === "string" && part.text.trim().length > 0)
              ?.map((part: any) => part.text);
            const text = parts && parts.length > 0 ? parts.join("\n").trim() : null;
            if (text) return text;
          }

          const errText = await response.text();
          lastError = `${model} (${response.status}): ${errText}`;
        } catch (error) {
          lastError = error instanceof Error ? error.message : String(error);
        }
        await new Promise(r => setTimeout(r, 500 * attempt));
      }
    }

    throw new Error(`Gemini API error: ${lastError || "All candidate models failed"}`);
  },
});
