"use client";

import { cn } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";
import { QuoteFormData } from "@/lib/schemas/quote-form";
import { Home, Building2, Paintbrush, Wrench } from "lucide-react";

const projectTypes = [
  {
    value: "toiture" as const,
    label: "Démoussage Toiture",
    icon: Home,
  },
  {
    value: "facade" as const,
    label: "Ravalement Façade",
    icon: Building2,
  },
  {
    value: "peinture" as const,
    label: "Peinture",
    icon: Paintbrush,
  },
  {
    value: "autre" as const,
    label: "Autre",
    icon: Wrench,
  },
];

interface StepProjectTypeProps {
  form: UseFormReturn<QuoteFormData>;
}

export function StepProjectType({ form }: StepProjectTypeProps) {
  const selectedType = form.watch("projectType");
  const error = form.formState.errors.projectType;

  return (
    <div>
      <h3 className="text-lg font-heading font-bold text-primary mb-2">
        Quel type de projet avez-vous ?
      </h3>
      <p className="text-neutral-500 text-sm mb-6">
        Sélectionnez la catégorie qui correspond le mieux à votre projet.
      </p>

      <div className="grid grid-cols-2 gap-4">
        {projectTypes.map(({ value, label, icon: Icon }) => {
          const isSelected = selectedType === value;

          return (
            <button
              key={value}
              type="button"
              onClick={() => {
                form.setValue("projectType", value, {
                  shouldValidate: true,
                });
              }}
              className={cn(
                "flex flex-col items-center justify-center gap-3 p-6 rounded-xl border-2 transition-all duration-200 cursor-pointer",
                "hover:border-accent-300 hover:shadow-md",
                isSelected
                  ? "border-accent bg-accent-50 shadow-md"
                  : "border-neutral-200 bg-white"
              )}
            >
              <Icon
                className={cn(
                  "w-8 h-8 transition-colors duration-200",
                  isSelected ? "text-accent" : "text-neutral-400"
                )}
                strokeWidth={1.5}
              />
              <span
                className={cn(
                  "text-sm font-semibold text-center transition-colors duration-200",
                  isSelected ? "text-accent" : "text-primary"
                )}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>

      {error && (
        <p className="mt-3 text-sm text-red-600">{error.message}</p>
      )}
    </div>
  );
}
