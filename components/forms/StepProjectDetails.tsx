"use client";

import { cn } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";
import { QuoteFormData } from "@/lib/schemas/quote-form";

const timelineOptions = [
  { value: "urgent" as const, label: "Urgent" },
  { value: "3-mois" as const, label: "Sous 3 mois" },
  { value: "6-mois" as const, label: "Sous 6 mois" },
  { value: "estimation" as const, label: "Juste une estimation" },
];

interface StepProjectDetailsProps {
  form: UseFormReturn<QuoteFormData>;
}

export function StepProjectDetails({ form }: StepProjectDetailsProps) {
  const surface = form.watch("surface") ?? 50;
  const selectedTimeline = form.watch("timeline");
  const errors = form.formState.errors;

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-heading font-bold text-primary mb-2">
        Détails du projet
      </h3>
      <p className="text-neutral-500 text-sm mb-6">
        Précisez les caractéristiques de votre projet pour un devis plus précis.
      </p>

      {/* Surface slider */}
      <div>
        <label className="block text-sm font-semibold text-primary mb-2">
          Surface estimée
        </label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min={10}
            max={500}
            step={5}
            value={surface}
            onChange={(e) =>
              form.setValue("surface", Number(e.target.value), {
                shouldValidate: true,
              })
            }
            className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-accent"
          />
          <span className="min-w-[5rem] text-right text-sm font-bold text-accent">
            {surface} m²
          </span>
        </div>
        <div className="flex justify-between text-xs text-neutral-400 mt-1">
          <span>10 m²</span>
          <span>500 m²</span>
        </div>
        {errors.surface && (
          <p className="mt-1 text-sm text-red-600">{errors.surface.message}</p>
        )}
      </div>

      {/* Timeline radio buttons */}
      <div>
        <label className="block text-sm font-semibold text-primary mb-3">
          Délai souhaité
        </label>
        <div className="grid grid-cols-2 gap-3">
          {timelineOptions.map(({ value, label }) => {
            const isSelected = selectedTimeline === value;

            return (
              <button
                key={value}
                type="button"
                onClick={() =>
                  form.setValue("timeline", value, {
                    shouldValidate: true,
                  })
                }
                className={cn(
                  "px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 cursor-pointer",
                  "hover:border-accent-300",
                  isSelected
                    ? "border-accent bg-accent-50 text-accent"
                    : "border-neutral-200 bg-white text-primary"
                )}
              >
                {label}
              </button>
            );
          })}
        </div>
        {errors.timeline && (
          <p className="mt-1 text-sm text-red-600">
            {errors.timeline.message}
          </p>
        )}
      </div>

      {/* Postal code */}
      <div>
        <label
          htmlFor="postalCode"
          className="block text-sm font-semibold text-primary mb-2"
        >
          Code postal
        </label>
        <input
          id="postalCode"
          type="text"
          inputMode="numeric"
          maxLength={5}
          placeholder="ex : 75001"
          {...form.register("postalCode")}
          className={cn(
            "w-full px-4 py-3 rounded-lg border-2 text-sm transition-colors duration-200",
            "focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-100",
            errors.postalCode
              ? "border-red-400 bg-red-50"
              : "border-neutral-200 bg-white"
          )}
        />
        {errors.postalCode && (
          <p className="mt-1 text-sm text-red-600">
            {errors.postalCode.message}
          </p>
        )}
      </div>
    </div>
  );
}
