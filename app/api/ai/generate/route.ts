import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

export const maxDuration = 300; // 5 minutes

const openrouter = createOpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPEN_ROUTER_API_KEY,
});

const BATCH_SIZE = 5;
const MAX_RETRIES = 3;

export async function POST(req: Request) {
  try {
    const { prompt, count = 1 } = await req.json();
    console.log(`Received generation request for ${count} items.`);

    if (!prompt) {
      return new Response(JSON.stringify({ error: "Prompt is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const readableStream = new ReadableStream({
      async start(controller) {
        const totalBatches = Math.ceil(count / BATCH_SIZE);

        for (let i = 0; i < count; i++) {
          let retries = 0;
          let success = false;
          while (retries < MAX_RETRIES && !success) {
            try {
              console.log(`Generating item ${i + 1} of ${count}. Attempt ${retries + 1}.`);
              
              const adjustedPrompt = `${prompt} \n\nImportant: This is item number ${i + 1} of a batch of ${count}. Please ensure variety and uniqueness compared to previous items if applicable.`;

              const result = await streamText({
                model: openrouter(
                  process.env.OPENROUTER_MODEL || "mistralai/mistral-7b-instruct:free"
                ),
                prompt: adjustedPrompt,
                temperature: process.env.AI_TEMPERATURE
                  ? parseFloat(process.env.AI_TEMPERATURE)
                  : 0.8,
              });

              for await (const chunk of result.textStream) {
                controller.enqueue(new TextEncoder().encode(chunk));
              }
              controller.enqueue(new TextEncoder().encode("\n---\n"));
              
              success = true;
              console.log(`Successfully generated item ${i + 1}.`);

            } catch (error) {
              retries++;
              console.error(`Error generating item ${i + 1}, attempt ${retries}. Retrying...`, error);
              if (retries >= MAX_RETRIES) {
                console.error(`Failed to generate item ${i + 1} after ${MAX_RETRIES} attempts.`);
                const errorJson = JSON.stringify({ error: `Failed to generate item ${i + 1}.` });
                controller.enqueue(new TextEncoder().encode(errorJson + "\n---\n"));
              }
            }
          }
        }
        controller.close();
      },
    });

    return new Response(readableStream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });

  } catch (error: any) {
    console.error("Error in AI generation endpoint:", error);
    const errorResponse = {
      error: {
        message: error.message || "An unexpected error occurred.",
      },
    };
    return new Response(JSON.stringify(errorResponse), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
