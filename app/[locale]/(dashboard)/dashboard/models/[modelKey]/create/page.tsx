"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { ModelForm } from "@/components/model-form";
import { AiGenerateButton } from "@/components/ai-generate-button";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CreateModelPage() {
  const t = useTranslations("ModelListPage");
  const tForm = useTranslations("ModelForm");
  const tCommon = useTranslations("Common");
  const params = useParams();
  const router = useRouter();
  const { status } = useSession();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const modelKey = params.modelKey as string;

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedItems, setGeneratedItems] = useState<any[]>([]);

  const {
    data: modelConfig,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["modelConfig", modelKey],
    queryFn: () => api.getModelConfig(`/api/admin/models/${modelKey}/config/`),
    enabled: status === "authenticated",
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const handleGenerate = (newItem: any) => {
    setGeneratedItems((prev) => [...prev, newItem]);
  };

  const createMutation = useMutation({
    mutationFn: (itemData: any) => api.createModelItem(`/api/admin/models/${modelKey}/`, itemData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["modelItems", modelKey] });
    },
  });

  const handleSaveAll = async () => {
    let successCount = 0;
    for (const item of generatedItems) {
      try {
        await createMutation.mutateAsync(item);
        successCount++;
      } catch (e) {
        console.error("Failed to save item:", item, e);
      }
    }
    toast({
      title: tForm("bulkSaveResultTitle"),
      description: tForm("bulkSaveResultDescription", {
        count: successCount,
        total: generatedItems.length,
      }),
    });
    if (successCount > 0) {
      router.push(`/models/${modelKey}`);
    }
  };

  if (isLoading || status === "loading") {
    return (
      <div>
        <Skeleton className="h-8 w-1/4 mb-6" />
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-destructive">{error.message}</div>;
  }

  if (!modelConfig) {
    return <div>{t("loadModelConfigFailed", { modelName: modelKey })}</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {t("createTitle", { modelName: modelConfig.verbose_name })}
        </h1>
        <AiGenerateButton
          modelConfig={modelConfig}
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
          setIsGenerating={setIsGenerating}
        />
      </div>

      {isGenerating && <p>{tCommon("generating")}</p>}

      {generatedItems.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{t("generatedItemsTitle")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {generatedItems.map((item, index) => (
              <div key={index} className="p-4 border rounded-md">
                <pre className="whitespace-pre-wrap text-sm">
                  {JSON.stringify(item, null, 2)}
                </pre>
              </div>
            ))}
            <Button onClick={handleSaveAll} disabled={createMutation.isPending}>
              {createMutation.isPending ? tCommon("saving") : t("saveAll")}
            </Button>
          </CardContent>
        </Card>
      )}

      {!isGenerating && generatedItems.length === 0 && (
        <ModelForm modelKey={modelKey} modelConfig={modelConfig} />
      )}
    </div>
  );
}
