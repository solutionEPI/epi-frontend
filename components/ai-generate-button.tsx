"use client";

import { useState } from "react";
import { useCompletion } from "@ai-sdk/react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";

interface AiGenerateButtonProps {
  modelConfig: any;
  form: any; // react-hook-form useForm return type
}

export function AiGenerateButton({ modelConfig, form }: AiGenerateButtonProps) {
  const t = useTranslations("AiGenerateButton");
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const { toast } = useToast();

  const { complete, isLoading } = useCompletion({
    api: "/api/ai/generate",
    onFinish: (prompt, completion) => {
      try {
        // The AI might wrap the JSON in markdown or other text.
        // We'll extract the JSON part of the response.
        const match = completion.match(/{[\s\S]*}/);
        if (!match) {
          throw new Error(t("noJsonError"));
        }
        const jsonString = match[0];
        const jsonResponse = JSON.parse(jsonString);

        Object.keys(jsonResponse).forEach((key) => {
          if (modelConfig.fields[key]) {
            form.setValue(key, jsonResponse[key], { shouldValidate: true });
          }
        });
        toast({
          title: t("successTitle"),
          description: t("successDescription"),
        });
        setIsOpen(false);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : t("errorParsingDescription");
        toast({
          variant: "destructive",
          title: t("errorParsingTitle"),
          description: errorMessage,
        });
        console.error(
          "AI response parsing error:",
          error,
          "Raw completion from AI:",
          completion
        );
      }
    },
    onError: (err) => {
      toast({
        variant: "destructive",
        title: t("generationErrorTitle"),
        description: err.message,
      });
    },
  });

  const handleGenerate = () => {
    const schema = Object.entries(modelConfig.fields)
      .filter(([, fieldConfig]: [string, any]) => fieldConfig.editable)
      .reduce((acc, [fieldName, fieldConfig]: [string, any]) => {
        acc[fieldName] = {
          type: fieldConfig.type,
          required: fieldConfig.required,
          verbose_name: fieldConfig.verbose_name,
          help_text: fieldConfig.help_text,
        };
        if (fieldConfig.choices) {
          acc[fieldName].choices = fieldConfig.choices.map((c: any) => c.value);
        }
        return acc;
      }, {} as Record<string, any>);

    const fullPrompt = `
      You are a data generation assistant for the Solution EPI platform.
      Your task is to generate a complete JSON object based on a user's request and a provided model schema.
      The JSON object must be valid and should not be wrapped in markdown or any other text.

      User Request: "${prompt}"

      Model: "${modelConfig.verbose_name}"

      Instructions:
      1. Analyze the user request.
      2. Look at the model schema below to understand the required fields, their types, and their languages.
      3. **Crucially, you must provide plausible values for ALL fields in the schema, especially for all language variations (e.g., fields ending in _en, _fr, _de , etc... it can be less or more languages).** If the user's prompt is in one language, you must translate and adapt the content for the other languages.
      4. The output must be ONLY the JSON object.

      Model Schema (for your reference):
      ${JSON.stringify(schema, null, 2)}
    `;
    complete(fullPrompt);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Sparkles className="h-4 w-4 mr-2" />
          {t("generateWithAI")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("dialogTitle")}</DialogTitle>
          <DialogDescription>
            {t("dialogDescription", { modelName: modelConfig.verbose_name })}
          </DialogDescription>
        </DialogHeader>
        <Textarea
          placeholder={t("promptPlaceholder")}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={4}
        />
        <DialogFooter>
          <Button
            onClick={handleGenerate}
            disabled={isLoading || !prompt}
            className="w-full">
            {isLoading ? t("generatingButton") : t("generateButton")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
