"use client";

import { useEffect, useId, useState } from "react";
import { Star } from "lucide-react";
import { useSession } from "next-auth/react";
import { updateUserBookTrackingRating } from "@/lib/actions/book.actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type SizeKey = "sm" | "lg";

interface RatingProps {
  value: number;
  canModified: boolean;
  bookId?: string;
  size?: SizeKey;
  showValue?: boolean;
  label?: string;
}

export default function Rating({
  value,
  canModified = false,
  bookId,
  size = "lg",
  showValue = false,
  label,
}: RatingProps) {
  const [rating, setRating] = useState(value);
  const [hover, setHover] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const groupId = useId();

  useEffect(() => {
    setRating(value);
  }, [value]);

  const handleClick = async (star: number) => {
    if (!session?.user?.id || !bookId) return;

    const previousRating = rating;
    setRating(star);
    setIsSaving(true);

    try {
      await updateUserBookTrackingRating(session.user.id, bookId, star);
      router.refresh();
      toast.success("Book rated successfully.");
    } catch (error) {
      setRating(previousRating);
      toast.error("Unable to save your rating. Please try again.");
      console.error("Unable to save rating:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const sizes: Record<SizeKey, string> = {
    sm: "size-4",
    lg: "size-6",
  };

  const roundedValue = Math.max(0, Math.min(5, rating));
  const displayLabel =
    label ??
    (roundedValue > 0
      ? `${roundedValue.toFixed(1)} out of 5 stars`
      : "No rating yet");

  const renderStar = (star: number, filledAmount: number) => (
    <span
      key={star}
      className={cn("relative inline-flex shrink-0", sizes[size])}
      aria-hidden="true"
    >
      <Star className="size-full text-muted-foreground/35" strokeWidth={1.8} />
      <span
        className="absolute inset-0 overflow-hidden text-yellow-500"
        style={{ width: `${filledAmount * 100}%` }}
      >
        <Star className="size-full fill-current" strokeWidth={1.8} />
      </span>
    </span>
  );

  if (!canModified) {
    return (
      <span className="inline-flex items-center gap-2">
        <span
          className="inline-flex items-center gap-0.5"
          role="img"
          aria-label={displayLabel}
        >
          {[1, 2, 3, 4, 5].map((star) => {
            const filledAmount = Math.max(0, Math.min(1, roundedValue - star + 1));
            return renderStar(star, filledAmount);
          })}
        </span>
        {showValue && (
          <span className="text-sm font-medium tabular-nums">
            {roundedValue > 0 ? roundedValue.toFixed(1) : "No rating"}
          </span>
        )}
      </span>
    );
  }

  return (
    <fieldset
      className="inline-flex items-center gap-2"
      disabled={isSaving}
      onMouseLeave={() => setHover(0)}
    >
      <legend className="sr-only">{label ?? "Rate this book"}</legend>
      <div
        className="inline-flex items-center gap-1"
        role="radiogroup"
        aria-label={label ?? "Rate this book"}
      >
        {[1, 2, 3, 4, 5].map((star) => {
          const isActive = (hover || rating) >= star;
          const inputId = `${groupId}-${star}`;

          return (
            <label
              key={star}
              htmlFor={inputId}
              className={cn(
                "inline-flex cursor-pointer rounded-md p-0.5 text-muted-foreground/40 transition-colors hover:text-yellow-500 focus-within:ring-2 focus-within:ring-yellow-500/40 focus-within:ring-offset-2 focus-within:ring-offset-background",
                isActive && "text-yellow-500",
                isSaving && "cursor-wait opacity-70",
              )}
              onMouseEnter={() => setHover(star)}
            >
              <input
                id={inputId}
                className="sr-only"
                type="radio"
                name={`${groupId}-rating`}
                value={star}
                checked={rating === star}
                aria-label={`${star} star${star === 1 ? "" : "s"}`}
                onChange={() => handleClick(star)}
              />
              <Star
                className={cn(sizes[size], isActive && "fill-current")}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </label>
          );
        })}
      </div>
      {showValue && (
        <span className="text-sm text-muted-foreground">
          {rating > 0 ? `${rating}/5` : "Not rated"}
        </span>
      )}
    </fieldset>
  );
}
