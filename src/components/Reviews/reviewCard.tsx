import React from "react";

import { cn } from "@/lib/utils";
import Rating from "../ui/rating";
import Image from "next/image";
import a from "/public/avatar.jpg";
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
        "flex items-start  rounded-2xl bg-background gap-2 p-4 max-w-2xl lg:max-w-2xl h-fit",
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
                  src={avatar || a}
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

          <div className="flex w-full self-center  h-fit items-center sm:justify-end justify-start ">
            <Rating size="sm" canModified={false} value={rating} />
          </div>
        </div>

        {comment && (
          <div className="w-full  h-fit flex">
            <p className="text-sm text-pretty">{comment}</p>
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
