import "dotenv/config";
import { createAgent } from "langchain";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { careerGuidancePrompt } from "./prompts/prompts.js";
import { getJobs } from "./tools/webSearch.js";
import jobFinderOutput from "./outputs/jobFinder.js";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

export const jobAgent = createAgent({
  model: model,
  systemPrompt: careerGuidancePrompt,
  tools: [getJobs],
  responseFormat: jobFinderOutput,
});
