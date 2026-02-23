"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const steps = [
  { label: "Type de projet" },
  { label: "Détails" },
  { label: "Coordonnées" },
];

interface FormProgressBarProps {
  currentStep: number;
}

export function FormProgressBar({ currentStep }: FormProgressBarProps) {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <div key={index} className="flex-1 flex flex-col items-center relative">
              {/* Connector line */}
              {index > 0 && (
                <div
                  className={cn(
                    "absolute top-4 -left-1/2 w-full h-0.5",
                    isCompleted ? "bg-accent" : "bg-neutral-200"
                  )}
                  aria-hidden="true"
                />
              )}

              {/* Step circle */}
              <div
                className={cn(
                  "relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors duration-200",
                  isCompleted && "bg-accent text-white",
                  isCurrent && "bg-accent text-white ring-4 ring-accent-100",
                  !isCompleted && !isCurrent && "bg-neutral-200 text-neutral-500"
                )}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" strokeWidth={3} />
                ) : (
                  index + 1
                )}
              </div>

              {/* Step label */}
              <span
                className={cn(
                  "mt-2 text-xs font-medium text-center",
                  isCurrent && "text-accent",
                  isCompleted && "text-primary",
                  !isCompleted && !isCurrent && "text-neutral-400"
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
