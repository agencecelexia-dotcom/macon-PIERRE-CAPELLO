"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import {
  quoteFormSchema,
  stepSchemas,
  type QuoteFormData,
} from "@/lib/schemas/quote-form";
import { FormProgressBar } from "./FormProgressBar";
import { StepProjectType } from "./StepProjectType";
import { StepProjectDetails } from "./StepProjectDetails";
import { StepContactInfo } from "./StepContactInfo";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, ArrowRight, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { track } from "@/components/features/AnalyticsTracker";

const TOTAL_STEPS = 3;

// Fields to validate per step
const stepFields: (keyof QuoteFormData)[][] = [
  ["projectType"],
  ["surface", "timeline", "postalCode"],
  ["fullName", "phone", "email", "message", "consent"],
];

export function QuoteForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const form = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      surface: 50,
      postalCode: "",
      fullName: "",
      phone: "",
      email: "",
      message: "",
    },
    mode: "onTouched",
  });

  const validateCurrentStep = async (): Promise<boolean> => {
    const fields = stepFields[currentStep];
    const currentValues: Record<string, unknown> = {};

    for (const field of fields) {
      currentValues[field] = form.getValues(field);
    }

    // Validate just the current step's schema
    const stepSchema = stepSchemas[currentStep];
    const result = stepSchema.safeParse(currentValues);

    if (!result.success) {
      // Trigger validation on all step fields so errors show
      await form.trigger(fields);
      return false;
    }

    return true;
  };

  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    if (isValid) {
      if (currentStep === 0) track("form_start");
      setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS - 1));
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi du formulaire");
      }

      setSubmitStatus("success");
      track("form_submit");
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success state
  if (submitStatus === "success") {
    return (
      <div className="text-center py-12">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-heading font-bold text-primary mb-2">
          Demande envoyée avec succès !
        </h3>
        <p className="text-neutral-500 max-w-md mx-auto">
          Merci pour votre demande de devis. Nous vous recontacterons sous 48h
          pour discuter de votre projet.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <FormProgressBar currentStep={currentStep} />

      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        {/* Step content */}
        <div className="min-h-[320px]">
          {currentStep === 0 && <StepProjectType form={form} />}
          {currentStep === 1 && <StepProjectDetails form={form} />}
          {currentStep === 2 && <StepContactInfo form={form} />}
        </div>

        {/* Error banner */}
        {submitStatus === "error" && (
          <div className="flex items-center gap-2 mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>
              Une erreur est survenue. Veuillez réessayer ou nous contacter
              directement par téléphone.
            </span>
          </div>
        )}

        {/* Navigation buttons */}
        <div
          className={cn(
            "flex mt-8 gap-3",
            currentStep === 0 ? "justify-end" : "justify-between"
          )}
        >
          {currentStep > 0 && (
            <Button
              type="button"
              variant="outline"
              onClick={handlePrev}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Précédent
            </Button>
          )}

          {currentStep < TOTAL_STEPS - 1 ? (
            <Button
              type="button"
              variant="accent"
              onClick={handleNext}
            >
              Suivant
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              type="submit"
              variant="accent"
              disabled={isSubmitting}
              className={cn(isSubmitting && "opacity-70 cursor-not-allowed")}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Envoi en cours...
                </>
              ) : (
                <>
                  Envoyer ma demande
                  <Send className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
