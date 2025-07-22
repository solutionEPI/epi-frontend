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
import { formatBackendErrors, prepareDataForSubmission } from "@/lib/utils";

interface AiGenerateModalProps {
  isOpen: boolean;
  onClose: () => void;
  modelKey: string;
  modelName: string;
  apiUrl: string;
  fields: Record<string, any>; // Model fields for parsing/saving
  onGenerateSingle?: (data: Record<string, any>) => void;
  isBulkMode?: boolean;
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
  isBulkMode = false,
}: AiGenerateModalProps) {
  const t = useTranslations("AiGenerateModal");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Debug flag
  const debug = process.env.NODE_ENV === "development";

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
        description: formatBackendErrors(error),
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
          total: result.total,
        }),
      });

      // Update item statuses based on the results
      setGeneratedItems((prevItems) => {
        let currentItemIndex = 0;
        return prevItems.map((item) => {
          if (item.status === "pending") {
            const itemResult = result.results[currentItemIndex++];
            if (itemResult.status === "fulfilled" && !itemResult.value.error) {
              return { ...item, status: "success" };
            } else {
              return {
                ...item,
                status: "error",
                message:
                  itemResult.reason?.message ||
                  itemResult.value?.error?.message ||
                  t("saveErrorMessage"),
              };
            }
          }
          return item;
        });
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: t("saveErrorTitle"),
        description: formatBackendErrors(error),
      });
    },
  });

  const parseGeneratedContent = useCallback(
    (
      content: string
    ): { data: Record<string, any> | undefined; error?: string } => {
      const cleanedContent = content
        .replace(/^```json\s*/, "")
        .replace(/```\s*$/, "")
        .trim();

      // 1. Try to parse as JSON
      try {
        const parsedJson = JSON.parse(cleanedContent);
        const validatedData: Record<string, any> = {};
        let hasValidKeys = false;

        // Filter for keys that exist in the model's fields
        for (const key in fields) {
          if (Object.prototype.hasOwnProperty.call(parsedJson, key)) {
            const fieldConfig = fields[key];
            let value = parsedJson[key];

            // Truncate if max_length is exceeded
            if (
              fieldConfig.max_length &&
              typeof value === "string" &&
              value.length > fieldConfig.max_length
            ) {
              value = value.substring(0, fieldConfig.max_length);
              if (debug)
                console.warn(
                  `[AI Generate] Truncated value for field '${key}' to fit max_length of ${fieldConfig.max_length}.`
                );
            }

            validatedData[key] = value;
            hasValidKeys = true;
          }
        }

        // Auto-populate default language from English variant if needed
        for (const key in validatedData) {
          if (key.endsWith("_en")) {
            const baseKey = key.slice(0, -3);
            if (fields[baseKey]) {
              validatedData[baseKey] = validatedData[key];
            }
          }
        }

        if (hasValidKeys) {
          return { data: validatedData };
        }
      } catch (e) {
        // JSON parsing failed, proceed to fallback
      }

      // 2. Fallback for non-JSON plain text
      const textContent = cleanedContent.replace(/"/g, ""); // Remove quotes for plain text
      if (textContent) {
        // Find the first editable, non-relational string-based field
        const defaultField = Object.keys(fields).find((key) => {
          const field = fields[key];
          return (
            (field.type === "string" ||
              field.type === "text" ||
              field.ui_component === "textarea") &&
            field.editable &&
            !field.related_model
          );
        });

        if (defaultField) {
          if (debug)
            console.warn(
              `[AI Generate] JSON parsing failed. Falling back to populating '${defaultField}' with plain text.`
            );
          return { data: { [defaultField]: textContent } };
        }
      }

      const errorMessage = t("parsingError");
      if (debug)
        console.error(
          `[AI Generate] Parsing failed completely. Content: "${content}"`
        );
      return { data: undefined, error: errorMessage };
    },
    [fields, debug, t]
  );

  const handleGenerate = async () => {
    if (debug)
      console.log(
        "[AI Generate] mode:",
        isBulkMode ? "bulk" : "single",
        "prompt:",
        prompt,
        "count:",
        count
      );
    if (!prompt || (isBulkMode && count <= 0)) {
      toast({
        variant: "destructive",
        title: t("validationErrorTitle"),
        description: t("validationErrorMessage"),
      });
      return;
    }

    const translatableFields = Object.keys(fields).filter(
      (key) => fields[key].is_translation && key.endsWith("_en")
    );
    const baseFieldPrompt =
      translatableFields.length > 0
        ? ` For each translatable field (e.g., ${translatableFields
            .map((k) => `'${k}'`)
            .join(
              ", "
            )}), you MUST generate the base field (e.g., '${translatableFields[0].slice(
            0,
            -3
          )}') with EXACTLY the same value as the English version. Mismatches will be rejected.`
        : "";

    const autoGeneratedFields = [
      "id",
      "created_at",
      "updated_at",
      "post_count",
    ].filter((key) => fields[key]);
    const exclusionPrompt =
      autoGeneratedFields.length > 0
        ? ` Do not include the following fields in your response as they are auto-generated: ${autoGeneratedFields.join(
            ", "
          )}.`
        : "";

    const fullPrompt = `${prompt}\n${baseFieldPrompt}\n${exclusionPrompt}`;

    const simplifiedFields = Object.entries(fields).reduce(
      (acc, [key, value]) => {
        acc[key] = {
          type: value.type,
          required: value.required,
          ...(value.max_length && { max_length: value.max_length }),
          ...(value.choices && {
            choices: value.choices.map((c: any) => c.value),
          }),
        };
        return acc;
      },
      {} as Record<string, any>
    );

    setIsGenerating(true);
    setGeneratedItems([]);
    setCurrentGenerationIndex(0);
    const allGenerated: GeneratedItem[] = [];
    let retries = 0;
    const maxRetries = 2;

    const generateWithRetry = async () => {
      try {
        const response = await fetch("/api/ai/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: fullPrompt,
            count: isBulkMode ? count : 1,
            fields: simplifiedFields,
          }),
        });

        if (!response.ok || !response.body) {
          throw new Error(t("generationFailed") + response.statusText);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let accumulatedChunks = "";
        let itemCounter = 0;
        const generationCount = isBulkMode ? count : 1;
        let lastChunkReceived = Date.now();
        const streamTimeout = 30000; // 30 seconds

        const readStream = async () => {
          while (itemCounter < generationCount) {
            if (Date.now() - lastChunkReceived > streamTimeout) {
              reader.cancel();
              throw new Error("Stream timed out.");
            }

            const { value, done } = await reader.read();
            if (done) break;

            lastChunkReceived = Date.now();
            accumulatedChunks += decoder.decode(value, { stream: true });
            const parts = accumulatedChunks.split("\n---\n");
            accumulatedChunks = parts.pop() || "";

            for (const part of parts) {
              if (itemCounter >= generationCount) break;
              if (part.trim() !== "") {
                const { data: parsedData, error: parsingError } =
                  parseGeneratedContent(part);
                if (debug)
                  console.log("[AI Generate] chunk parsed", {
                    index: itemCounter,
                    parsedData,
                  });
                const newItem: GeneratedItem = {
                  id: itemCounter++,
                  content: part,
                  parsedData: parsedData,
                  status: parsedData ? "pending" : "error",
                  message: parsingError,
                };
                allGenerated.push(newItem);
                setGeneratedItems([...allGenerated]);
                setCurrentGenerationIndex(itemCounter);

                if (!isBulkMode && onGenerateSingle && parsedData) {
                  if (debug)
                    console.log(
                      "[AI Generate] Populating single item and closing modal"
                    );
                  onGenerateSingle(parsedData);
                  toast({
                    title: t("generationSuccessTitle"),
                    description: t("formPopulatedSuccess"),
                  });
                  handleClose();
                  return;
                }
              }
            }
          }
        };

        await readStream();

        reader.cancel();

        if (itemCounter < generationCount && accumulatedChunks.trim() !== "") {
          const { data: parsedData, error: parsingError } =
            parseGeneratedContent(accumulatedChunks);
          if (debug)
            console.log("[AI Generate] remaining chunk parsed", parsedData);
          const newItem: GeneratedItem = {
            id: itemCounter++,
            content: accumulatedChunks,
            parsedData: parsedData,
            status: parsedData ? "pending" : "error",
            message: parsingError,
          };
          allGenerated.push(newItem);
          setGeneratedItems([...allGenerated]);
        }

        toast({
          title: t("generationSuccessTitle"),
          description: t("generationSuccessDescription", {
            count: allGenerated.filter((item) => item.status !== "error")
              .length,
          }),
        });
      } catch (error: any) {
        if (retries < maxRetries) {
          retries++;
          if (debug)
            console.warn(
              `[AI Generate] Attempt ${retries} failed. Retrying...`,
              error
            );
          await new Promise((res) => setTimeout(res, 2000)); // Wait 2s before retry
          await generateWithRetry();
        } else {
          if (debug)
            console.error("[AI Generate] Critical error after all retries.", {
              prompt,
              count,
              modelKey,
              error,
            });
          toast({
            variant: "destructive",
            title: t("generationErrorTitle"),
            description: error.message || t("generationErrorMessage"),
          });
        }
      } finally {
        if (retries >= maxRetries || allGenerated.length >= count) {
          setIsGenerating(false);
        }
      }
    };

    await generateWithRetry();
  };

  const handleSaveAll = async () => {
    if (debug)
      console.log(
        "[AI Generate] saving all pending items",
        generatedItems.length
      );
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

    const processedData = itemsToSave.map((item) => {
      const prepared = prepareDataForSubmission(item, fields);
      for (const key in fields) {
        if (fields[key].required && !prepared[key]) {
          console.warn(
            `[AI Bulk Save] Missing required field '${key}' in item:`,
            item
          );
        }
      }
      return prepared;
    });

    await bulkCreateItemsMutation.mutateAsync(processedData);
  };

  const handleUseItem = (itemToUse: GeneratedItem) => {
    if (itemToUse.parsedData && onGenerateSingle) {
      if (debug)
        console.log("[AI Generate] Populating form with item", itemToUse.id);
      onGenerateSingle(itemToUse.parsedData);
      toast({
        title: t("generationSuccessTitle"),
        description: t("formPopulatedSuccess"),
      });
      handleClose();
    }
  };

  const handleSaveItem = async (itemToSave: GeneratedItem) => {
    if (debug) console.log("[AI Generate] saving single item", itemToSave.id);
    if (!itemToSave.parsedData) {
      toast({
        variant: "destructive",
        title: t("saveErrorTitle"),
        description: t("noDataToSave"),
      });
      return;
    }

    const processedData = prepareDataForSubmission(
      itemToSave.parsedData,
      fields
    );

    for (const key in fields) {
      if (fields[key].required && !processedData[key]) {
        console.warn(
          `[AI Single Save] Missing required field '${key}' in item:`,
          itemToSave
        );
      }
    }

    try {
      await createItemMutation.mutateAsync({ data: processedData });
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
    if (debug) console.log("[AI Generate] closing modal");
    setPrompt("");
    setCount(1);
    setGeneratedItems([]);
    setIsGenerating(false);
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
            <div>
              <Label htmlFor="generation-prompt">{t("promptLabel")}</Label>
              <Textarea
                id="generation-prompt"
                placeholder={t("promptPlaceholder")}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={5}
                className={`mt-1 ${
                  prompt.length > 0 && prompt.length < 10
                    ? "border-destructive"
                    : ""
                }`}
              />
              {prompt.length > 0 && prompt.length < 10 && (
                <p className="text-sm text-destructive mt-1">
                  {t("validation.promptLength")}
                </p>
              )}
            </div>

            {isBulkMode && (
              <div>
                <Label htmlFor="generation-count">{t("countLabel")}</Label>
                <Input
                  id="generation-count"
                  type="number"
                  min="1"
                  max="50"
                  value={count}
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    if (value > 50) {
                      setCount(50);
                    } else {
                      setCount(value);
                    }
                  }}
                  className="mt-1"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  {t("validation.maxCount")}
                </p>
              </div>
            )}

            <Button
              onClick={handleGenerate}
              disabled={
                isGenerating ||
                !prompt ||
                prompt.length < 10 ||
                (isBulkMode && (count <= 0 || count > 50))
              }>
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
                      {!isBulkMode && item.status === "pending" && (
                        <Button
                          size="sm"
                          variant="default"
                          onClick={() => handleUseItem(item)}
                          className="mt-1">
                          {t("useItemButton")}
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
