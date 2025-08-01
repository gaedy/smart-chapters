"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { useSession } from "next-auth/react";
import { updateUserBookTrackingRating } from "@/lib/actions/book.actions";
type SizeKey = "sm" | "lg";

interface RatingProps {
  value: number;
  canModified: boolean;
  bookId?: string;
  size?: SizeKey;
}

export default function Rating({
  value,
  canModified = false,
  bookId,
  size = "lg",
}: RatingProps) {
  const [rating, setRating] = useState(value);
  const [hover, setHover] = useState(0);
  const { data: session } = useSession();

  useEffect(() => {
    setRating(value);
  }, [value]);

  const handleClick = async (star: number) => {
    if (!session?.user?.id || !bookId) return;

    setRating(star);
    await updateUserBookTrackingRating(session.user.id, bookId, star);
  };

  const sizes: Record<SizeKey, number> = {
    sm: 20,
    lg: 24,
  };

  return (
    <div className="flex gap-1">
      {canModified ? (
        <>
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={sizes[size]}
              className={`
            cursor-pointer transition-colors duration-200
            ${
              hover >= star || rating >= star
                ? "text-yellow-500"
                : "text-neutral-300"
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
              size={sizes[size]}
              className={`
            
            
            ${
              hover >= star || rating >= star
                ? "text-yellow-500"
                : "text-neutral-300"
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
