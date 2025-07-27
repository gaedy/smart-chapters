"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";

interface RatingProps {
  value: number;
  canModified: boolean;
}

export default function Rating({
  value = 0,
  canModified = false,
}: RatingProps) {
  const [rating, setRating] = useState(value);
  const [hover, setHover] = useState(0);

  useEffect(() => {
    setRating(value); // If the API changes the value, reflect it
  }, [value]);

  return (
    <div className="flex gap-1">
      {canModified ? (
        <>
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={24}
              className={`
            cursor-pointer
            transition-colors duration-200
            ${
              hover >= star || rating >= star
                ? "text-yellow-400"
                : "text-gray-300"
            }
          `}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(star)}
              fill={hover >= star || rating >= star ? "#facc15" : "none"}
            />
          ))}
        </>
      ) : (
        <>
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={24}
              className={`
            
            
            ${
              hover >= star || rating >= star
                ? "text-yellow-400"
                : "text-gray-300"
            }
          `}
              fill={hover >= star || rating >= star ? "#facc15" : "none"}
            />
          ))}
        </>
      )}
    </div>
  );
}
