/**
 * AI Agent Client for Event Generation
 * Uses OpenAI Workflows via the official SDK (no public URL needed)
 */

import { openai } from "@/openai.config";

export interface EventGenerationInput {
  prompt: string;
}

export interface EventGeneratorOutput {
  name: string;
  description: string;
  category: string;
  is_appropriate: boolean;
}

export interface AIAgentResponse {
  success: boolean;
  data?: EventGeneratorOutput;
  error?: string;
  reason?: string;
}

export class AIAgentClient {
  private apiKey: string;
  private workflowId: string;

  constructor() {
    this.apiKey = process.env.AI_AGENT_API_KEY || "";
    this.workflowId =
      process.env.NEXT_PUBLIC_WORKFLOW_ID ||
      "wf_693f1003520c8f9097bf09b22d0b83b0d0d066da6dec8f229"; // fallback to your known ID

    if (!this.apiKey) {
      throw new Error("AI_AGENT_API_KEY not configured in .env.local");
    }

    if (!this.workflowId) {
      throw new Error("NEXT_PUBLIC_WORKFLOW_ID not configured in .env.local");
    }
  }

  /**
   * Generate event content using the AI agent workflow
   * This calls your published OpenAI Agent Builder workflow
   */
  async generateEvent(input: EventGenerationInput): Promise<AIAgentResponse> {
    try {
      console.log("🚀 Calling AI Workflow via SDK...");
      console.log("Workflow ID:", this.workflowId);
      console.log("Prompt:", input.prompt);

      const run = await openai.workflows.runs.create({
        workflow_id: this.workflowId,
        input: {
          prompt: input.prompt,
        },
      });

      console.log("✅ Workflow run created:", run.id);
      const result = run.output ?? run.result ?? run;
      console.log("✅ Workflow output:", result);

      // Handle different response formats
      let output: EventGeneratorOutput | null = null;

      // Try to extract the output from various possible response structures
      if ((result as any).output) {
        output = (result as any).output;
      } else if ((result as any).data) {
        output = (result as any).data;
      } else if ((result as any).result) {
        output = (result as any).result;
      } else if ((result as any).name && (result as any).description) {
        // Direct output format
        output = result as any;
      }

      if (!output) {
        console.error("Could not parse response:", result);
        throw new Error("Unexpected response format from AI Agent");
      }

      // Check if the event was appropriate
      if (output.is_appropriate !== false) {
        return {
          success: true,
          data: output,
        };
      } else {
        return {
          success: false,
          reason: "The topic was flagged as inappropriate for event generation.",
        };
      }

    } catch (error) {
      console.error("❌ AI Agent error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  /**
   * Health check to verify API connection
   */
  async healthCheck(): Promise<boolean> {
    try {
      // Simple check to verify API key is valid
      const models = await openai.models.list();
      return models.data.length > 0;
    } catch {
      return false;
    }
  }
}

// Export singleton instance
export const aiAgent = new AIAgentClient();
