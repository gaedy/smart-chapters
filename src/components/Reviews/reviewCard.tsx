import React from "react";

import { cn } from "@/lib/utils";
import Rating from "../ui/rating";
import RemoveReviewButton from "./removeReview";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ReviewCardProps {
  name: string;
  date?: string;
  rating: number;
  comment: string;
  className?: string;
  avatar?: string;
  reviewBookId?: string | null;
  isCurrentUser?: boolean;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  name,
  date,
  rating,
  comment,
  className,
  avatar,
  reviewBookId,
  isCurrentUser = false,
}) => {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={cn(
        "flex h-fit items-start gap-4 rounded-2xl border border-transparent bg-background p-5 shadow-sm",
        className,
      )}
    >
      <Avatar className="size-10 border bg-foreground">
        {avatar && <AvatarImage src={avatar} alt={name} />}
        <AvatarFallback className="text-xs font-medium">
          {initials || "R"}
        </AvatarFallback>
      </Avatar>

      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate text-sm font-semibold">{name}</h3>
              {isCurrentUser && (
                <span className="rounded-full bg-foreground px-2 py-0.5 text-xs text-muted-foreground">
                  You
                </span>
              )}
            </div>
            {date && (
              <p className="mt-1 text-xs text-muted-foreground">{date}</p>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <Rating size="sm" canModified={false} value={rating} />
            <span className="text-sm font-medium tabular-nums">
              {rating > 0 ? rating.toFixed(1) : "Unrated"}
            </span>
          </div>
        </div>

        {comment && (
          <p className="whitespace-pre-line text-sm leading-7 text-primary/85">
            {comment}
          </p>
        )}

        {reviewBookId && (
          <div className="flex justify-end border-t pt-3">
            <RemoveReviewButton bookId={reviewBookId ?? ""} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
