"use client";

type FunRatingInputProps = {
  value: number;
  onChange: (value: number) => void;
};

export function FunRatingInput({ value, onChange }: FunRatingInputProps) {
  return (
    <div className="form-control w-full">
      <span className="label">
        <span className="label-text font-medium">How fun was it?</span>
        <span className="label-text-alt">{value} / 5 stars</span>
      </span>
      <input type="hidden" name="fun_rating" value={value} />
      <div className="rating rating-lg gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <input
            key={star}
            type="radio"
            name="fun-rating-ui"
            className="mask mask-star-2 bg-orange-400"
            aria-label={`${star} star${star > 1 ? "s" : ""}`}
            checked={value === star}
            onChange={() => onChange(star)}
          />
        ))}
      </div>
    </div>
  );
}
