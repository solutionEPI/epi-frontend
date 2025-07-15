"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { AiGenerateModal } from "./ai-generate-modal";

interface AiGenerateButtonProps {
  modelKey: string;
  modelName: string;
  apiUrl: string;
  fields: Record<string, any>;
  onGenerateSingle: (data: Record<string, any>) => void;
}

export function AiGenerateButton({
  modelKey,
  modelName,
  apiUrl,
  fields,
  onGenerateSingle,
}: AiGenerateButtonProps) {
  const t = useTranslations("AiGenerateButton");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button variant="outline" onClick={() => setIsModalOpen(true)}>
        <Sparkles className="h-4 w-4 mr-2" />
        {t("generateWithAI")}
      </Button>
      <AiGenerateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        modelKey={modelKey}
        modelName={modelName}
        apiUrl={apiUrl}
        fields={fields}
        onGenerateSingle={onGenerateSingle}
      />
    </>
  );
}
