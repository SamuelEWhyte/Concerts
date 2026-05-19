import { Star } from "lucide-react";

export function StarRating({
  rating,
  max = 5,
  size = "sm",
}: {
  rating: number;
  max?: number;
  size?: "sm" | "md";
}) {
  const iconClass = size === "md" ? "h-5 w-5" : "h-4 w-4";

  return (
    <div
      className="flex gap-0.5"
      aria-label={`${rating} out of ${max} stars`}
      role="img"
    >
      {Array.from({ length: max }, (_, i) => {
        const filled = i < rating;
        return (
          <Star
            key={i}
            className={`${iconClass} ${
              filled
                ? "fill-warning text-warning"
                : "fill-none text-base-content/25"
            }`}
            aria-hidden
          />
        );
      })}
    </div>
  );
}
