import OpenAI from "openai";

// Centralized OpenAI client using the API key from environment
export const openai = new OpenAI({
  apiKey: process.env.AI_AGENT_API_KEY,
});


