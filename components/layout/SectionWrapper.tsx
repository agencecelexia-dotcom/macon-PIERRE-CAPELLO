import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  background?: "white" | "neutral" | "primary" | "accent";
}

const bgStyles = {
  white: "bg-white",
  neutral: "bg-neutral-50/70",
  primary: "bg-primary text-white",
  accent: "bg-accent text-white",
};

export function SectionWrapper({ children, id, className, background = "white" }: SectionWrapperProps) {
  return (
    <section id={id} className={cn("py-20 md:py-28", bgStyles[background], className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
