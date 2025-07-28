"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Bot } from "lucide-react";
import { useTranslations } from "next-intl";
import { AiGenerateModal } from "./ai-generate-modal";

interface AiGenerateButtonProps {
  modelKey: string;
  modelName: string;
  apiUrl: string;
  fields: Record<string, any>;
  onGenerateSingle?: (data: Record<string, any>) => void;
  fieldCount: number;
  hasImageField: boolean;
  bulk?: boolean;
}

export function AiGenerateButton({
  modelKey,
  modelName,
  apiUrl,
  fields,
  onGenerateSingle,
  fieldCount,
  hasImageField,
  bulk = false,
}: AiGenerateButtonProps) {
  const t = useTranslations("AiGenerateButton");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const buttonText = bulk ? t("bulkGenerateWithAI") : t("generateWithAI");
  const buttonIcon = bulk ? (
    <Bot className="h-4 w-4 mr-2" />
  ) : (
    <Sparkles className="h-4 w-4 mr-2" />
  );

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setIsModalOpen(true)}
        type="button">
        {buttonIcon}
        {buttonText}
      </Button>
      <AiGenerateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        modelKey={modelKey}
        modelName={modelName}
        apiUrl={apiUrl}
        fields={fields}
        onGenerateSingle={onGenerateSingle}
        isBulkMode={bulk}
      />
    </>
  );
}
