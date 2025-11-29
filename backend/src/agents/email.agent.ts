import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { TJob } from "../db/jobSchema";

const emailAgent = async (job: TJob) => {
  if (!job) return;

  try {
    const { text } = await generateText({
      model: google("gemini-2.0-flash"),
      prompt: `
You are an expert email writer. Write a professional follow-up email for this job application:

${JSON.stringify(job, null, 2)}

Make the email concise, polite, and enthusiastic.
      `,
    });

    return text;
  } catch (error: any) {
    throw error;
  }
};

export default emailAgent;
