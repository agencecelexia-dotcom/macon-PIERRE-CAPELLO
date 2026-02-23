import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "outline";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
        variant === "default" && "bg-primary-50 text-primary",
        variant === "accent" && "bg-accent-50 text-accent-700",
        variant === "outline" && "border border-neutral-300 text-neutral-600",
        className
      )}
    >
      {children}
    </span>
  );
}
