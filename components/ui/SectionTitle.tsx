import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
  accent?: boolean;
}

export function SectionTitle({ title, subtitle, align = "center", className, accent = true }: SectionTitleProps) {
  return (
    <div className={cn("mb-16", align === "center" && "text-center", className)}>
      {accent && (
        <div className={cn("divider-accent mb-6", align === "center" && "mx-auto")} />
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary mb-5 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          "text-lg text-neutral-500 leading-relaxed",
          align === "center" && "max-w-2xl mx-auto"
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
