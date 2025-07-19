import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  rating: number; // expects 1 to 5 from API
  className?: string;
}

const Rating: React.FC<RatingProps> = ({ rating, className }) => {
  const totalStars = 5;

  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {[...Array(totalStars)].map((_, index) => (
        <Star
          key={index}
          className={cn(
            "w-5 h-5 text-gray-300",
            index < rating && "text-yellow-400 fill-yellow-400"
          )}
          fill={index < rating ? "currentColor" : "none"}
        />
      ))}
    </div>
  );
};

export default Rating;
