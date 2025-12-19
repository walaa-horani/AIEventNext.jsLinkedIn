/**
 * AI Agent Client for Event Generation
 * Calls OpenAI Workflow via HTTPS using your workflow ID
 */

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
  private workflowEndpoint: string;

  constructor() {
    this.apiKey = process.env.AI_AGENT_API_KEY || "";
    this.workflowId =
      process.env.NEXT_PUBLIC_WORKFLOW_ID ||
      "wf_693f1003520c8f9097bf09b22d0b83b0d0d066da6dec8f229"; // fallback to your known ID
    this.workflowEndpoint = `https://api.openai.com/v1/workflows/${this.workflowId}/runs`;

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
      console.log("🚀 Calling AI Workflow via HTTPS...");
      console.log("Endpoint:", this.workflowEndpoint);
      console.log("Prompt:", input.prompt);

      const response = await fetch(this.workflowEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          input: {
            prompt: input.prompt,
          },
        }),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error:", errorText);
        throw new Error(`AI Agent API error: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log("✅ API Response:", result);

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
      const response = await fetch("https://api.openai.com/v1/models", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
      });
      return response.ok;
    } catch {
      return false;
    }
  }
}

// Export singleton instance
export const aiAgent = new AIAgentClient();
