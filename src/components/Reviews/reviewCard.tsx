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
        "flex items-start rounded-2xl bg-background gap-2 p-3 px-4 max-w-2xl lg:max-w-2xl h-fit",
        className
      )}
    >
      <div className="flex flex-col w-full h-full gap-3">
        <div className="flex justify-between  items-center gap-2 h-8 ">
          <div className="flex items-center  gap-2 text-sm">
            <div className="flex justify-center items-center border w-8 h-8 overflow-hidden rounded-full">
              <Image
                className=" object-cover rounded-full w-full h-full"
                alt={name}
                src={avatar || a}
                width={96}
                height={96}
                objectFit="fill"
              ></Image>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-medium">{name}</span>
              <span className=" opacity-80">&bull;</span>
              <span className="text-xs opacity-80">{date || "01/01/2025"}</span>
            </div>
          </div>

          <div className="ml-auto">
            <Rating size="sm" canModified={false} value={rating} />
          </div>

          {reviewBookId && comment && (
            <div className="">
              <RemoveReviewButton bookId={reviewBookId ?? ""} />
            </div>
          )}
        </div>
        {comment && (
          <div className="w-full h-full flex">
            <p className="text-sm text-pretty">{comment}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
