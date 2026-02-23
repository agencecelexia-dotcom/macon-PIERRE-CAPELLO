import type { ProcessStep } from "@/lib/data/services";

interface ProcessTimelineProps {
  steps: ProcessStep[];
}

export function ProcessTimeline({ steps }: ProcessTimelineProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {steps.map((step) => (
        <div key={step.step} className="relative group">
          {/* Connector line (hidden on first item and mobile) */}
          {step.step > 1 && (
            <div className="hidden lg:block absolute top-5 -left-4 w-8 h-px bg-gradient-to-r from-accent/20 to-accent/40" />
          )}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-accent to-accent-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-accent-glow/30 group-hover:scale-110 transition-transform duration-300">
              {step.step}
            </div>
            <h3 className="font-bold text-primary tracking-tight">{step.title}</h3>
          </div>
          <p className="text-sm text-neutral-500 leading-relaxed pl-[52px]">
            {step.description}
          </p>
        </div>
      ))}
    </div>
  );
}
