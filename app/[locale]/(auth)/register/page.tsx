"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { FormInput } from "@/components/ui/form-input";
import { FormButton } from "@/components/ui/form-button";
import Link from "next/link";

export default function RegisterPage() {
  const t = useTranslations("RegisterPage");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: t("toastErrorTitle"),
        description: t("toastPasswordsMismatchDescription"),
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: t("toastSuccessTitle"),
          description: t("toastSuccessDescription"),
        });
        router.push("/login");
      } else {
        toast({
          variant: "destructive",
          title: t("toastErrorTitle"),
          description: data.message || t("toastRegistrationErrorDescription"),
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        variant: "destructive",
        title: t("toastUnexpectedErrorTitle"),
        description: t("toastUnexpectedErrorDescription"),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="form-container">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">{t("dashboardName")}</h1>
          <p className="text-muted-foreground mt-2">
            {t("dashboardDescription")}
          </p>
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">{t("title")}</h2>
        <form onSubmit={handleSubmit}>
          <FormInput
            id="username"
            name="username"
            label={t("usernameLabel")}
            required
            type="text"
          />
          <FormInput
            id="email"
            name="email"
            label={t("emailLabel")}
            required
            type="email"
          />
          <FormInput
            id="password"
            name="password"
            label={t("passwordLabel")}
            required
            type="password"
          />
          <FormInput
            id="confirmPassword"
            name="confirmPassword"
            label={t("confirmPasswordLabel")}
            required
            type="password"
          />
          <div className="mt-6">
            <FormButton
              type="submit"
              className="w-full"
              isLoading={isLoading}
              disabled={isLoading}
            >
              {t("registerButton")}
            </FormButton>
          </div>
        </form>
        <p className="text-center text-sm text-muted-foreground mt-4">
          {t("alreadyHaveAccount")}{" "}
          <Link href="/login" className="text-primary hover:underline">
            {t("signInLink")}
          </Link>
        </p>
      </div>
    </div>
  );
}
