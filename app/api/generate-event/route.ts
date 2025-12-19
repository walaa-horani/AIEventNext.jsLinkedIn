import { NextResponse } from 'next/server';
import { z } from "zod";
import { Agent, AgentInputItem, Runner, withTrace } from "@openai/agents";

// --- Schema Definitions from User ---
const TopicAgentSchema = z.object({ title: z.string(), description: z.string(), category: z.string(), is_appropriate: z.boolean() });
const EventGeneratorAgentSchema = z.object({ Name: z.string(), description: z.string(), category: z.string(), is_appropriate: z.boolean() });
const RejectionAgentSchema = z.object({ Name: z.string(), is_appropriate: z.boolean(), description: z.string(), category: z.string() });

// --- Agent Definitions ---
const topicAgent = new Agent({
    name: "topic agent",
    instructions: `You are an AI event content generator. Your job is to create compelling, professional event details based on user input.

When given event information (topic, date, audience, goals), generate:
1. Event Title: Catchy, clear, 5-10 words
2. Description: 2-3 engaging paragraphs explaining what attendees will learn/experience
3. Key Topics: 3-5 bullet points of main discussion points
4. Target Audience: 1-2 sentences describing ideal attendees
5. Call to Action: Compelling registration message

Guidelines:
- Keep tone professional yet engaging
- Focus on value and outcomes
- Use active voice
- Avoid jargon unless industry-specific
- Make it scannable and clear

Output as structured JSON matching the provided schema.`,
    model: "gpt-4.1-nano", // NOTE: Ensure this model is available in your tier or fallback to standard gpt-4o-mini
    outputType: TopicAgentSchema,
    modelSettings: {
        temperature: 1,
        topP: 1,
        maxTokens: 2048,
        store: true
    }
});

const eventGeneratorAgent = new Agent({
    name: "event generator agent",
    instructions: `Using the validated event data, generate the final event content
ready to be saved or displayed.
`,
    model: "gpt-4.1-nano",
    outputType: EventGeneratorAgentSchema,
    modelSettings: {
        temperature: 1,
        topP: 1,
        maxTokens: 2048,
        store: true
    }
});

const rejectionAgent = new Agent({
    name: "rejection agent",
    instructions: `Return JSON ONLY matching the schema.
Set:
- is_appropriate = false
- Name = \"Rejected event\"
- description = short explanation why rejected
- category = \"rejected\"
`,
    model: "gpt-4.1-nano",
    outputType: RejectionAgentSchema,
    modelSettings: {
        temperature: 1,
        topP: 1,
        maxTokens: 2048,
        store: true
    }
});

type WorkflowInput = { input_as_text: string };

// --- Main Workflow Logic ---
const runWorkflow = async (workflow: WorkflowInput) => {
    return await withTrace("event", async () => {
        const conversationHistory: AgentInputItem[] = [
            { role: "user", content: [{ type: "input_text", text: workflow.input_as_text }] }
        ];

        const runner = new Runner({
            traceMetadata: {
                __trace_source__: "agent-builder",
                workflow_id: "wf_693f1003520c819097bf09b22db83b0d0d066da7dec8f229"
            }
        });

        // 1. Run Topic Agent
        const topicAgentResultTemp = await runner.run(topicAgent, [...conversationHistory]);
        conversationHistory.push(...topicAgentResultTemp.newItems.map((item) => item.rawItem));

        if (!topicAgentResultTemp.finalOutput) throw new Error("Agent result is undefined");

        const topicOutput = topicAgentResultTemp.finalOutput;

        // 2. Branch Logic
        if (topicOutput.is_appropriate) {
            const eventGeneratorAgentResultTemp = await runner.run(eventGeneratorAgent, [...conversationHistory]);

            if (!eventGeneratorAgentResultTemp.finalOutput) throw new Error("Agent result is undefined");

            // Normalize output to match our Frontend Expected Interface (AIEvent)
            const data = eventGeneratorAgentResultTemp.finalOutput;
            return {
                event: {
                    name: data.Name, // Note: Schema uses "Name" (capitalized), frontend expects "name"
                    description: data.description,
                    category: data.category
                }
            };
        } else {
            const rejectionAgentResultTemp = await runner.run(rejectionAgent, [...conversationHistory]);

            if (!rejectionAgentResultTemp.finalOutput) throw new Error("Agent result is undefined");

            const data = rejectionAgentResultTemp.finalOutput;
            return {
                is_appropriate: false,
                error: data.description || "Event request rejected as inappropriate."
            };
        }
    });
}

// --- API Route Handler ---
export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();

        if (!prompt) {
            return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
        }

        console.log("Running Agents SDK Workflow for:", prompt);

        // Ensure API Key is available for the SDK
        if (!process.env.OPENAI_API_KEY && process.env.AI_AGENT_API_KEY) {
            process.env.OPENAI_API_KEY = process.env.AI_AGENT_API_KEY;
        }

        const result = await runWorkflow({ input_as_text: prompt });
        console.log("Workflow Result:", result);

        return NextResponse.json(result);

    } catch (error) {
        console.error('Agents Workflow Error:', error);
        return NextResponse.json({ error: error instanceof Error ? error.message : 'Internal Server Error' }, { status: 500 });
    }
}
