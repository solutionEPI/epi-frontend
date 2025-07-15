"use client";

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
import { Badge } from "@/components/ui/badge";

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

  // Defensively create a base URL to avoid issues with incoming apiUrl format
  const baseApiUrl = apiUrl.replace(/bulk_action\/?$/, "");

  const createItemMutation = useMutation({
    mutationFn: ({ data }: { data: Record<string, any> }) =>
      api.createModelItem(baseApiUrl, data),
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

  const bulkCreateItemsMutation = useMutation({
    mutationFn: (data: Record<string, any>[]) =>
      api.bulkCreateModelItems(`${baseApiUrl}`, data),
    onSuccess: (result: any) => {
      queryClient.invalidateQueries({ queryKey: ["modelItems", modelKey] });
      queryClient.invalidateQueries({ queryKey: ["adminConfig"] });
      toast({
        title: t("bulkSaveResultTitle"),
        description: t("bulkSaveResultDescription", {
          count: result.count,
          total: generatedItems.length,
        }),
      });
      // Optionally, update status for all items to "success"
      setGeneratedItems((prev) =>
        prev.map((item) => ({ ...item, status: "success" }))
      );
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: t("saveErrorTitle"),
        description: error.message || t("saveErrorMessage"),
      });
    },
  });

  const parseGeneratedContent = useCallback(
    (content: string): Record<string, any> | undefined => {
      // Clean the content to remove markdown code blocks
      const cleanedContent = content
        .replace(/```json\s*([\s\S]*?)\s*```/, "$1")
        .trim();

      try {
        const json = JSON.parse(cleanedContent);

        // Derive main keys from English translations
        for (const key in json) {
          if (key.endsWith("_en")) {
            const baseKey = key.slice(0, -3);
            if (!(baseKey in json)) {
              json[baseKey] = json[key];
            }
          }
        }

        const hasValidKeys = Object.keys(json).some((key) => fields[key]);
        if (hasValidKeys) {
          return json;
        }
      } catch (e) {
        // Not valid JSON, fall back to text processing
      }

      // Fallback for non-JSON content
      const defaultField =
        Object.keys(fields).find(
          (key) => fields[key].type === "string" && !fields[key].readOnly
        ) || "name"; // Assuming 'name' or first string field as default

      if (defaultField && cleanedContent.trim() !== "") {
        return { [defaultField]: cleanedContent.trim() };
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
        body: JSON.stringify({ prompt, count, fields }),
      });

      if (!response.ok || !response.body) {
        throw new Error(t("generationFailed") + response.statusText);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedChunks = "";
      let itemCounter = 0;

      while (itemCounter < count) {
        const { value, done } = await reader.read();
        if (done) break;

        accumulatedChunks += decoder.decode(value, { stream: true });

        const parts = accumulatedChunks.split("\n---\n");
        accumulatedChunks = parts.pop() || ""; // Keep the last incomplete part

        for (const part of parts) {
          if (itemCounter >= count) break;
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

      // If we broke out of the loop, there might still be an active stream.
      reader.cancel();

      // Process any remaining accumulated chunks after the stream ends
      if (itemCounter < count && accumulatedChunks.trim() !== "") {
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

  const handleSaveAll = async () => {
    const itemsToSave = generatedItems
      .filter((item) => item.status === "pending" && item.parsedData)
      .map((item) => item.parsedData!);

    if (itemsToSave.length === 0) {
      toast({
        variant: "destructive",
        title: t("saveErrorTitle"),
        description: t("noDataToSave"),
      });
      return;
    }

    await bulkCreateItemsMutation.mutateAsync(itemsToSave);
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
            className="w-full">
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
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">
                  {t("generatedResults")}
                </h3>
                {generatedItems.length > 1 && (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleSaveAll}
                    disabled={
                      bulkCreateItemsMutation.isPending ||
                      generatedItems.every((item) => item.status !== "pending")
                    }>
                    <Save className="mr-2 h-4 w-4" />
                    {bulkCreateItemsMutation.isPending
                      ? t("saving")
                      : t("saveAll", {
                          count: generatedItems.filter(
                            (i) => i.status === "pending"
                          ).length,
                        })}
                  </Button>
                )}
              </div>
              {generatedItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3 border rounded-md bg-background flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-medium">
                      {t("item")} #{item.id + 1}
                    </p>
                    {item.status === "pending" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSaveItem(item)}
                        disabled={createItemMutation.isPending}>
                        <Save className="mr-2 h-4 w-4" />
                        {createItemMutation.isPending ? t("saving") : t("save")}
                      </Button>
                    )}
                    {item.status === "success" && (
                      <Badge variant="success">{t("saved")}</Badge>
                    )}
                    {item.status === "error" && (
                      <Badge
                        variant="destructive"
                        className="flex items-center gap-1">
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
