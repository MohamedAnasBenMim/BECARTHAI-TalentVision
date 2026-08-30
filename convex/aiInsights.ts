"use node";

import { action } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";

const DEFAULT_GEMINI_MODEL = "gemini-3.6-flash";
const GEMINI_MAX_ATTEMPTS = 3;

export const generateInterviewInsights = action({
  args: { interviewId: v.id("interviews") },
  handler: async (ctx, args) => {
    // 1. Fetch interview details
    const interview = await ctx.runQuery(internal.interviews.getInterviewInternal, { id: args.interviewId });
    if (!interview) throw new Error("Interview not found");

    // 2. Fetch comments for this interview
    const comments = await ctx.runQuery(internal.comments.getCommentsInternal, { interviewId: args.interviewId });
    
    if (comments.length === 0) {
      return "No comments available to generate insights.";
    }

    // 3. Prepare the prompt for Gemini
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("GEMINI_API_KEY is missing");

    const customModel = process.env.GEMINI_MODEL;
    const candidates = customModel
      ? [customModel, "gemini-2.5-flash", "gemini-3.6-flash", "gemini-flash-latest"]
      : ["gemini-2.5-flash", "gemini-3.6-flash", "gemini-flash-latest"];
    const modelsToTry = candidates.filter((m, i, a) => m && a.indexOf(m) === i);

    const commentsText = comments.map(c => `- Rating: ${c.rating}/5. Notes: ${c.content}`).join("\n");
    
    const promptText = `
Role: Senior Technical Recruiter.
Goal: Summarize the interview feedback for candidate ${interview.candidateName || 'Unknown'} and provide a final hiring recommendation.

Interview Context:
- Role/Title: ${interview.title}
- Description: ${interview.description || "N/A"}

Interviewer Feedback:
${commentsText}

Please provide a concise, structured summary in Markdown format with the following sections:
### Executive Summary
### Key Strengths Demonstrated
### Areas of Concern
### Final Recommendation (Strong Hire, Hire, Weak Hire, or No Hire)
`;

    const body = JSON.stringify({
      contents: [{ role: "user", parts: [{ text: promptText }] }],
      generationConfig: {
        maxOutputTokens: 1500,
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

            if (text) {
              // Save the AI summary as a comment
              await ctx.runMutation(internal.comments.addInternalComment, {
                interviewId: args.interviewId,
                content: text,
                rating: 0, // 0 means AI
                interviewerId: "AI_SUPER_RECRUITER",
              });
              
              return "Insights generated successfully.";
            }
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
