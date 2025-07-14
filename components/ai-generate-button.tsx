"use client";

import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";

interface AiGenerateButtonProps {
  modelConfig: any;
  onGenerate: (data: any) => void; // Callback to handle generated data
  isGenerating: boolean;
  setIsGenerating: (isGenerating: boolean) => void;
}

const cleanJsonString = (str: string) => {
  const trimmed = str.trim();
  if (trimmed.startsWith("```json") && trimmed.endsWith("```")) {
    return trimmed.substring(7, trimmed.length - 3);
  }
  if (trimmed.startsWith("```") && trimmed.endsWith("```")) {
    return trimmed.substring(3, trimmed.length - 3);
  }
  return str;
};

export function AiGenerateButton({
  modelConfig,
  onGenerate,
  isGenerating,
  setIsGenerating,
}: AiGenerateButtonProps) {
  const t = useTranslations("AiGenerateButton");
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [count, setCount] = useState(1);
  const { toast } = useToast();

  const handleGenerate = async () => {
    setIsGenerating(true);
    setIsOpen(false);

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

    const fullPrompt = t("fullPrompt", {
      prompt,
      modelName: modelConfig.verbose_name,
      schema: JSON.stringify(schema, null, 2),
    });

    const processAndGenerate = (item: any) => {
      const newItem = { ...item };
      for (const key in newItem) {
        if (key.endsWith("_en")) {
          const baseKey = key.slice(0, -3);
          if (!(baseKey in newItem)) {
            newItem[baseKey] = newItem[key];
          }
        }
      }
      onGenerate(newItem);
    };

    try {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: fullPrompt, count }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message || "An unknown error occurred");
      }

      if (!response.body) {
        throw new Error("The response body is empty.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          if (buffer.trim()) {
            const cleanedBuffer = cleanJsonString(buffer);
            processAndGenerate(JSON.parse(cleanedBuffer));
          }
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n---\n");

        for (let i = 0; i < parts.length - 1; i++) {
          const part = parts[i];
          if (part.trim()) {
            try {
              const cleanedPart = cleanJsonString(part);
              if (cleanedPart) {
                processAndGenerate(JSON.parse(cleanedPart));
              }
            } catch (e) {
              console.error("Failed to parse JSON chunk:", part, e);
            }
          }
        }
        buffer = parts[parts.length - 1];
      }

      toast({
        title: t("successTitle"),
        description: t("successDescription", { count }),
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : t("errorParsingDescription");
      toast({
        variant: "destructive",
        title: t("generationErrorTitle"),
        description: errorMessage,
      });
      console.error("AI generation error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" disabled={isGenerating}>
          <Sparkles className="h-4 w-4 mr-2" />
          {isGenerating ? t("generatingButton") : t("generateWithAI")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("dialogTitle")}</DialogTitle>
          <DialogDescription>
            {t("dialogDescription", { modelName: modelConfig.verbose_name })}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder={t("promptPlaceholder")}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
          />
          <div className="space-y-2">
            <Label htmlFor="generation-count">
              {t("generationCountLabel")}
            </Label>
            <Input
              id="generation-count"
              type="number"
              value={count}
              onChange={(e) =>
                setCount(Math.max(1, parseInt(e.target.value, 10) || 1))
              }
              min="1"
              max="100"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt}
            className="w-full">
            {isGenerating ? t("generatingButton") : t("generateButton")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
