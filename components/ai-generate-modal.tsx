use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Save, XCircle } from "lucide-react";

interface AiGenerateModalProps {
  isOpen: boolean;
  onClose: () => void;
  modelKey: string;
  modelName: string;
  apiUrl: string;
  fields: Record<string, any>; // Model fields for parsing/saving
}

interface GeneratedItem {
  id: number;
  content: string;
  parsedData?: Record<string, any>;
  status: "pending" | "success" | "error";
  message?: string;
}

export function AiGenerateModal({
  isOpen,
  onClose,
  modelKey,
  modelName,
  apiUrl,
  fields,
}: AiGenerateModalProps) {
  const t = useTranslations("AiGenerateModal");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [prompt, setPrompt] = useState("");
  const [count, setCount] = useState(1);
  const [generatedItems, setGeneratedItems] = useState<GeneratedItem[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentGenerationIndex, setCurrentGenerationIndex] = useState(0);

  const createItemMutation = useMutation({
    mutationFn: ({ data }: { data: Record<string, any> }) =>
      api.createModelItem(apiUrl, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["modelItems", modelKey] });
      queryClient.invalidateQueries({ queryKey: ["adminConfig"] });
    },
    onError: (error: any, variables) => {
      console.error("Failed to save item:", variables.data, error);
      toast({
        variant: "destructive",
        title: t("saveErrorTitle"),
        description: error.message || t("saveErrorMessage"),
      });
    },
  });

  const parseGeneratedContent = useCallback(
    (content: string): Record<string, any> | undefined => {
      try {
        // Attempt to parse as JSON
        const json = JSON.parse(content);
        // Basic validation: check if parsed JSON has keys matching model fields
        const hasValidKeys = Object.keys(json).some((key) => fields[key]);
        if (hasValidKeys) {
          return json;
        }
      } catch (e) {
        // Not valid JSON, try to infer from text
      }

      // Fallback: simple text content, assign to a default field like 'name' or 'content'
      const defaultField =
        Object.keys(fields).find(
          (key) => fields[key].type === "string" && !fields[key].readOnly
        ) || "name"; // Assuming 'name' or first string field as default

      if (defaultField && content.trim() !== "") {
        return { [defaultField]: content.trim() };
      }

      return undefined;
    },
    [fields]
  );

  const handleGenerate = async () => {
    if (!prompt || count <= 0) {
      toast({
        variant: "destructive",
        title: t("validationErrorTitle"),
        description: t("validationErrorMessage"),
      });
      return;
    }

    setIsGenerating(true);
    setGeneratedItems([]);
    setCurrentGenerationIndex(0);

    try {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, count }),
      });

      if (!response.ok || !response.body) {
        throw new Error(t("generationFailed") + response.statusText);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedChunks = "";
      let itemCounter = 0;

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        accumulatedChunks += decoder.decode(value, { stream: true });

        const parts = accumulatedChunks.split("\n---\n");
        accumulatedChunks = parts.pop() || ""; // Keep the last incomplete part

        for (const part of parts) {
          if (part.trim() !== "") {
            const parsedData = parseGeneratedContent(part);
            setGeneratedItems((prev) => [
              ...prev,
              {
                id: itemCounter++,
                content: part,
                parsedData: parsedData,
                status: parsedData ? "pending" : "error",
                message: parsedData ? undefined : t("parsingError"),
              },
            ]);
            setCurrentGenerationIndex(itemCounter);
          }
        }
      }

      // Process any remaining accumulated chunks after the stream ends
      if (accumulatedChunks.trim() !== "") {
        const parsedData = parseGeneratedContent(accumulatedChunks);
        setGeneratedItems((prev) => [
          ...prev,
          {
            id: itemCounter++,
            content: accumulatedChunks,
            parsedData: parsedData,
            status: parsedData ? "pending" : "error",
            message: parsedData ? undefined : t("parsingError"),
          },
        ]);
      }

      toast({
        title: t("generationSuccessTitle"),
        description: t("generationSuccessDescription", { count }),
      });
    } catch (error: any) {
      console.error("AI generation error:", error);
      toast({
        variant: "destructive",
        title: t("generationErrorTitle"),
        description: error.message || t("generationErrorMessage"),
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveItem = async (itemToSave: GeneratedItem) => {
    if (!itemToSave.parsedData) {
      toast({
        variant: "destructive",
        title: t("saveErrorTitle"),
        description: t("noDataToSave"),
      });
      return;
    }

    try {
      await createItemMutation.mutateAsync({ data: itemToSave.parsedData });
      setGeneratedItems((prev) =>
        prev.map((item) =>
          item.id === itemToSave.id ? { ...item, status: "success" } : item
        )
      );
      toast({
        title: t("saveSuccessTitle"),
        description: t("saveSuccessDescription"),
      });
    } catch (error) {
      setGeneratedItems((prev) =>
        prev.map((item) =>
          item.id === itemToSave.id
            ? { ...item, status: "error", message: (error as Error).message }
            : item
        )
      );
    }
  };

  const handleClose = () => {
    setPrompt("");
    setCount(1);
    setGeneratedItems([]);
    setIsGenerating(false);
    setCurrentGenerationIndex(0);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{t("generateTitle", { modelName })}</DialogTitle>
          <DialogDescription>{t("generateDescription")}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4 flex-grow overflow-y-auto">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="prompt" className="text-right">
              {t("promptLabel")}
            </Label>
            <Textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={t("promptPlaceholder")}
              className="col-span-3"
              rows={3}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="count" className="text-right">
              {t("countLabel")}
            </Label>
            <Input
              id="count"
              type="number"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              min={1}
              max={10}
              className="col-span-3"
            />
          </div>

          <Button
            onClick={handleGenerate}
            disabled={isGenerating || createItemMutation.isPending}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t("generating", {
                  current: currentGenerationIndex,
                  total: count,
                })}
              </>
            ) : (
              t("generateButton")
            )}
          </Button>

          {generatedItems.length > 0 && (
            <div className="mt-4 space-y-4 border p-4 rounded-md bg-muted/50">
              <h3 className="text-lg font-semibold">{t("generatedResults")}</h3>
              {generatedItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3 border rounded-md bg-background flex flex-col gap-2"
                >
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-medium">
                      {t("item")} #{item.id + 1}
                    </p>
                    {item.status === "pending" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSaveItem(item)}
                        disabled={createItemMutation.isPending}
                      >
                        <Save className="mr-2 h-4 w-4" />
                        {createItemMutation.isPending
                          ? t("saving")
                          : t("save")}
                      </Button>
                    )}
                    {item.status === "success" && (
                      <Badge variant="success">{t("saved")}</Badge>
                    )}
                    {item.status === "error" && (
                      <Badge variant="destructive" className="flex items-center gap-1">
                        <XCircle className="h-3 w-3" />
                        {t("error")}
                      </Badge>
                    )}
                  </div>
                  <pre className="whitespace-pre-wrap text-xs bg-muted p-2 rounded-sm max-h-40 overflow-y-auto">
                    {item.content}
                  </pre>
                  {item.parsedData && (
                    <div className="text-xs text-muted-foreground">
                      <strong>{t("parsedData")}:</strong>{" "}
                      {JSON.stringify(item.parsedData, null, 2)}
                    </div>
                  )}
                  {item.message && item.status === "error" && (
                    <p className="text-xs text-destructive">{item.message}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            {t("close")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}