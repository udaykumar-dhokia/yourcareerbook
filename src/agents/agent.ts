import { createAgent } from "langchain";
import { careerGuidancePrompt } from "./prompts/prompts";

const agent = createAgent({
  model: "gemini-2.0-flash",
  systemPrompt: careerGuidancePrompt,
});

export default agent;
