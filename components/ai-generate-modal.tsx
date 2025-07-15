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
import { Switch } from "@/components/ui/switch";

interface AiGenerateModalProps {
  isOpen: boolean;
  onClose: () => void;
  modelKey: string;
  modelName: string;
  apiUrl: string;
  fields: Record<string, any>; // Model fields for parsing/saving
  onGenerateSingle?: (data: Record<string, any>) => void;
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
  onGenerateSingle,
}: AiGenerateModalProps) {
  const t = useTranslations("AiGenerateModal");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [prompt, setPrompt] = useState("");
  const [count, setCount] = useState(1);
  const [generatedItems, setGeneratedItems] = useState<GeneratedItem[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentGenerationIndex, setCurrentGenerationIndex] = useState(0);
  const [isBulkMode, setIsBulkMode] = useState(true);

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

      if (!isBulkMode && onGenerateSingle && generatedItems[0]?.parsedData) {
        onGenerateSingle(generatedItems[0].parsedData);
        toast({
          title: t("generationSuccessTitle"),
          description: t("formPopulatedSuccess"),
        });
        handleClose();
        return;
      }

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
        if (!isBulkMode && onGenerateSingle && parsedData) {
          onGenerateSingle(parsedData);
          toast({
            title: t("generationSuccessTitle"),
            description: t("formPopulatedSuccess"),
          });
          handleClose();
          return;
        }
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
    setIsBulkMode(true);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{t("title", { modelName: modelName })}</DialogTitle>
          <DialogDescription>{t("description")}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          {/* Left side: Controls */}
          <div className="space-y-4">
            {onGenerateSingle && (
              <div className="flex items-center space-x-2">
                <Switch
                  id="bulk-mode-switch"
                  checked={isBulkMode}
                  onCheckedChange={setIsBulkMode}
                />
                <Label htmlFor="bulk-mode-switch">{t("bulkCreate")}</Label>
              </div>
            )}

            <div>
              <Label htmlFor="generation-prompt">{t("promptLabel")}</Label>
              <Textarea
                id="generation-prompt"
                placeholder={t("promptPlaceholder")}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={5}
                className="mt-1"
              />
            </div>

            {isBulkMode && (
              <div>
                <Label htmlFor="generation-count">{t("countLabel")}</Label>
                <Input
                  id="generation-count"
                  type="number"
                  min="1"
                  max="20"
                  value={count}
                  onChange={(e) => setCount(parseInt(e.target.value, 10))}
                  className="mt-1"
                />
              </div>
            )}

            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt || (isBulkMode && count <= 0)}>
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("generatingButton", {
                    current: currentGenerationIndex,
                    total: count,
                  })}
                </>
              ) : (
                t("generateButton")
              )}
            </Button>
          </div>

          {/* Right side: Results */}
          <div className="space-y-2">
            <Label>{t("resultsLabel")}</Label>
            <div className="h-[300px] overflow-y-auto p-2 border rounded-md space-y-2 bg-muted/50">
              {generatedItems.length === 0 && !isGenerating && (
                <div className="text-center text-muted-foreground py-10">
                  {t("noResultsYet")}
                </div>
              )}
              {isGenerating && generatedItems.length === 0 && (
                <div className="text-center text-muted-foreground py-10">
                  <Loader2 className="mx-auto h-8 w-8 animate-spin" />
                  <p className="mt-2">{t("generationInProgress")}</p>
                </div>
              )}
              {generatedItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3 border rounded-lg bg-background shadow-sm">
                  <div className="flex justify-between items-start">
                    <pre className="whitespace-pre-wrap font-sans text-sm break-words w-full pr-4">
                      {item.content}
                    </pre>
                    <div className="flex flex-col items-end space-y-1">
                      {item.status === "pending" && (
                        <Button
                          size="sm"
                          onClick={() => handleSaveItem(item)}
                          disabled={createItemMutation.isPending}>
                          <Save className="h-4 w-4" />
                        </Button>
                      )}
                      {item.status === "error" && (
                        <Badge
                          variant="destructive"
                          className="flex items-center">
                          <XCircle className="mr-1 h-3 w-3" />
                          {t("errorStatus")}
                        </Badge>
                      )}
                      {item.status === "success" && (
                        <Badge variant="success">{t("savedStatus")}</Badge>
                      )}
                    </div>
                  </div>
                  {item.message && (
                    <p className="text-xs text-destructive mt-1">
                      {item.message}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            {t("closeButton")}
          </Button>
          {isBulkMode && (
            <Button
              onClick={handleSaveAll}
              disabled={
                isGenerating ||
                generatedItems.every((item) => item.status !== "pending") ||
                bulkCreateItemsMutation.isPending
              }>
              {bulkCreateItemsMutation.isPending
                ? t("savingAllButton")
                : t("saveAllButton")}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
