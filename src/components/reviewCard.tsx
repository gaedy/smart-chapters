import React from "react";

import { cn } from "@/lib/utils";
import Rating from "./ui/rating";

interface ReviewCardProps {
  name?: string;
  date?: string;
  rating: number;
  comment: string;
  avatarColor?: string; // optional to customize avatar circle color
  className?: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  name,
  date,
  rating,
  comment,
  avatarColor = "bg-amber-900",
  className,
}) => {
  
  return (
    <div
      className={cn(
        "flex items-start rounded-2xl bg-secondary gap-2 p-3 px-3.5 w-full lg:max-w-xl h-fit",
        className
      )}
    >
      <div className="flex justify-center items-center">
        <div className={cn(avatarColor, "w-10 h-10 rounded-full")} />
      </div>
      <div className="flex flex-col w-full h-full gap-2">
        <div className="flex justify-between">
          <div className="flex flex-col gap-1 text-sm">
            <p className="font-semibold">{name}</p>
            <div className="text-xs opacity-80">{date}</div>
          </div>
          <Rating rating={rating} />
        </div>
        <div className="w-full h-full flex">
          <p className="text-sm text-pretty">{comment}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
