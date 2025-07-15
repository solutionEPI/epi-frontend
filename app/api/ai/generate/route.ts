import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

export const maxDuration = 300; // 5 minutes

const openrouter = createOpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPEN_ROUTER_API_KEY,
});

const BATCH_SIZE = 5;
const MAX_RETRIES = 3;

// Helper function to format field constraints
function formatFieldConstraints(fields: Record<string, any>): string {
  if (!fields || Object.keys(fields).length === 0) {
    return "No specific field constraints provided.";
  }

  const constraints = Object.entries(fields)
    .map(([key, value]) => {
      if (value.readOnly) return null; // Don't include read-only fields

      const parts = [`- Field: \`${key}\``];
      if (value.type) {
        parts.push(`  - Type: ${value.type}`);
      }
      if (value.maxLength) {
        parts.push(`  - Maximum Length: ${value.maxLength} characters`);
      }
      if (value.required) {
        parts.push(`  - Required: Yes`);
      }
      if (value.choices && value.choices.length > 0) {
        const choiceLabels = value.choices.map((c: any) => c.label).join(", ");
        parts.push(`  - Choices: Must be one of [${choiceLabels}]`);
      }
      return parts.join("\n");
    })
    .filter(Boolean) // Remove null entries
    .join("\n");

  return `Please adhere to the following constraints for each field:\n${constraints}`;
}

// Helper function to format existing data for the AI
function formatExistingData(existingData: any): string {
  // Check if we have any existing data
  if (
    !existingData ||
    ((!existingData.uniqueValues ||
      Object.keys(existingData.uniqueValues).length === 0) &&
      (!existingData.langValues ||
        Object.keys(existingData.langValues).length === 0))
  ) {
    return "";
  }

  let result =
    "IMPORTANT: To avoid duplicates, DO NOT use any of the following existing values:\n\n";

  // Handle legacy format for backward compatibility
  if (
    existingData.existingNames ||
    existingData.existingSlugs ||
    existingData.existingNamesByLanguage ||
    existingData.existingSlugsByLanguage
  ) {
    if (existingData.existingNames?.length) {
      result += "- Names: " + existingData.existingNames.join(", ") + "\n";
    }
    if (existingData.existingSlugs?.length) {
      result += "- Slugs: " + existingData.existingSlugs.join(", ") + "\n";
    }

    // Format multilingual names/slugs in old format
    if (existingData.existingNamesByLanguage) {
      result += "\nMultilingual names:\n";
      for (const [lang, names] of Object.entries(
        existingData.existingNamesByLanguage
      )) {
        if ((names as any[]).length) {
          result += `- ${lang.toUpperCase()}: ${(names as any[]).join(", ")}\n`;
        }
      }
    }

    if (existingData.existingSlugsByLanguage) {
      result += "\nMultilingual slugs:\n";
      for (const [lang, slugs] of Object.entries(
        existingData.existingSlugsByLanguage
      )) {
        if ((slugs as any[]).length) {
          result += `- ${lang.toUpperCase()}: ${(slugs as any[]).join(", ")}\n`;
        }
      }
    }

    return result;
  }

  // Format regular fields (name, slug, etc.)
  if (
    existingData.uniqueValues &&
    Object.keys(existingData.uniqueValues).length > 0
  ) {
    result += "Main fields with existing values:\n";

    for (const [field, values] of Object.entries(existingData.uniqueValues)) {
      if ((values as any[]).length > 0) {
        // Format field name to be more readable
        const formattedFieldName = field
          .replace(/([A-Z])/g, " $1") // Add spaces before capital letters
          .replace(/_/g, " ") // Replace underscores with spaces
          .trim() // Remove extra spaces
          .replace(/^\w/, (c) => c.toUpperCase()); // Capitalize first letter

        result += `- ${formattedFieldName}: ${(values as any[]).join(", ")}\n`;
      }
    }
  }

  // Format language-specific fields
  if (
    existingData.langValues &&
    Object.keys(existingData.langValues).length > 0
  ) {
    result += "\nMultilingual values:\n";

    for (const [lang, fields] of Object.entries(existingData.langValues)) {
      if (Object.keys(fields).length > 0) {
        result += `\nLanguage: ${lang.toUpperCase()}\n`;

        for (const [field, values] of Object.entries(fields)) {
          if ((values as any[]).length > 0) {
            // Get base field name without language suffix
            const baseFieldName = field.replace(new RegExp(`_${lang}$`), "");

            // Format field name to be more readable
            const formattedFieldName = baseFieldName
              .replace(/([A-Z])/g, " $1")
              .replace(/_/g, " ")
              .trim()
              .replace(/^\w/, (c) => c.toUpperCase());

            result += `- ${formattedFieldName}: ${(values as any[]).join(
              ", "
            )}\n`;
          }
        }
      }
    }
  }

  return result;
}

export async function POST(req: Request) {
  try {
    const { prompt, count = 1, fields, existingData } = await req.json();
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
        const fieldConstraints = formatFieldConstraints(fields);
        const existingDataConstraints = formatExistingData(existingData);

        for (let i = 0; i < count; i++) {
          let retries = 0;
          let success = false;
          while (retries < MAX_RETRIES && !success) {
            try {
              console.log(
                `Generating item ${i + 1} of ${count}. Attempt ${retries + 1}.`
              );

              const adjustedPrompt = `${prompt}\n\n${fieldConstraints}\n\n${existingDataConstraints}\n\nImportant: This is item number ${
                i + 1
              } of a batch of ${count}. Please ensure variety and uniqueness compared to previous items if applicable. Your output must be a single, raw JSON object without any markdown, comments, or other text, and must not contain any duplicate names or slugs from the existing data.`;

              const result = await streamText({
                model: openrouter(
                  process.env.OPENROUTER_MODEL ||
                    "mistralai/mistral-7b-instruct:free"
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
              console.error(
                `Error generating item ${
                  i + 1
                }, attempt ${retries}. Retrying...`,
                error
              );
              if (retries >= MAX_RETRIES) {
                console.error(
                  `Failed to generate item ${
                    i + 1
                  } after ${MAX_RETRIES} attempts.`
                );
                const errorJson = JSON.stringify({
                  error: `Failed to generate item ${i + 1}.`,
                });
                controller.enqueue(
                  new TextEncoder().encode(errorJson + "\n---\n")
                );
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
