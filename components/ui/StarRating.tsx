import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  size?: number;
  className?: string;
}

export function StarRating({ rating, size = 18, className }: StarRatingProps) {
  return (
    <div className={cn("flex gap-0.5", className)} aria-label={`Note : ${rating} sur 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={size}
          className={cn(
            i < Math.floor(rating)
              ? "fill-accent text-accent"
              : i < rating
                ? "fill-accent/50 text-accent"
                : "fill-neutral-200 text-neutral-200"
          )}
        />
      ))}
    </div>
  );
}
