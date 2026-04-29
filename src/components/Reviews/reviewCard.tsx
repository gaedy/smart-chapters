import React from "react";

import { cn } from "@/lib/utils";
import Rating from "../ui/rating";
import Image from "next/image";
import RemoveReviewButton from "./removeReview";

interface ReviewCardProps {
  name: string;
  date?: string;
  rating: number;
  comment: string;

  className?: string;
  avatar?: string;
  reviewBookId?: string | null;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  name,
  date,
  rating,
  comment,

  className,
  avatar,
  reviewBookId,
}) => {
  return (
    <div
      className={cn(
        "flex h-fit max-w-3xl items-start gap-2 rounded-3xl bg-background p-5",
        className
      )}
    >
      <div className="flex  flex-col w-full h-full gap-4">
        <div className="flex sm:flex-row flex-col gap-4 h-fit">
          <div className="flex items-center gap-3 w-full">
            <div className="  w-fit h-full  flex items-center">
              <div className="flex justify-center items-center border w-10 h-10 overflow-hidden rounded-full">
                <Image
                  className=" object-cover rounded-full w-full h-full"
                  alt={name}
                  src={avatar || ""}
                  width={96}
                  height={96}
                  objectFit="fill"
                ></Image>
              </div>
            </div>
            <div className="flex justify-center gap-1 text-sm h-full w-full  flex-col ">
              <span className="font-medium">{name}</span>
              <span className="text-xs text-muted-foreground">
                {date || "01/01/2025"}
              </span>
            </div>
          </div>

          <div className="flex w-full self-center h-fit items-center justify-start sm:justify-end">
            <Rating size="sm" canModified={false} value={rating} />
          </div>
        </div>

        {comment && (
          <div className="flex h-fit w-full rounded-2xl bg-foreground p-4">
            <p className="text-sm leading-7 text-primary/85">{comment}</p>
          </div>
        )}
        {reviewBookId && comment && (
          <div className="self-end">
            <RemoveReviewButton bookId={reviewBookId ?? ""} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
