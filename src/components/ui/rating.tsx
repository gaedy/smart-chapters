"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { useSession } from "next-auth/react";
import { updateUserBookTrackingRating } from "@/lib/actions/book.actions";

interface RatingProps {
  value: number;
  canModified: boolean;
  bookId: string;
}

export default function Rating({ value, canModified = false, bookId }: RatingProps) {
  const [rating, setRating] = useState(value);
  const [hover, setHover] = useState(0);
  const { data: session } = useSession();

  useEffect(() => {
    setRating(value); // If the API changes the value, reflect it
  }, [value]);

  const handleClick = async (star: number) => {
    if (!session?.user?.id) return;

    setRating(star); // update UI immediately
    await updateUserBookTrackingRating(session.user.id, bookId, star); // update DB
  };

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
              onClick={() => handleClick(star)}
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
