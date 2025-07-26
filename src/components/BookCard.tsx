"use client";

import fg from "/public/h.jpg";
import Image from "next/image";

interface BookCardProps {
  title: string;
  author: string;
  coverUrl?: string | null;
  status?: string | null; // Optional coverUrl to allow for static images
}

export default function BookCard({
  title,
  author,
  coverUrl,
  status,
}: BookCardProps) {
  const imageSrc = coverUrl || fg; // fallback
  type TrackingStatus = "FINISHED" | "READING" | "WANT_TO_READ" | "DEFAULT";
  type TrackingStatusWithDefault = TrackingStatus | "DEFAULT";

  const statusConfig: Record<
    TrackingStatusWithDefault,
    { color: string; label: string }
  > = {
    FINISHED: { color: "bg-green-500/70 text-white", label: "Finished" },
    READING: { color: "bg-yellow-500/70 text-white", label: "Currently Reading" },
    WANT_TO_READ: { color: "bg-blue-500/70 text-white", label: "Want to Read" },
    DEFAULT: { color: "bg-gray-400/70 text-white", label: "Not Tracked" },
  };

  const key = (status ?? "DEFAULT") as TrackingStatusWithDefault;
  const { color, label } = statusConfig[key];

  return (
    <div className="flex flex-col w-fit gap-2  rounded-3xl group cursor-pointer">
      <div
        className="flex w-40 shadow-md hover:shadow-xl transition-all duration-300
        relative h-60 rounded-2xl overflow-hidden group-hover:scale-105"
      >
        <Image
          src={imageSrc}
          alt="Book Cover"
          fill
          className="rounded-2xl object-cover" // object-cover to cover entire or object-contain to respect ratio
        />

        {status && (
          <div className="p-2">
            <div
              className={`absolute p-2 px-2.5 text-xs rounded-full backdrop-blur-xs
              backdrop-brightness-80 ${color}`}
            >
              {label}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <div className="w-40 text-sm group-hover:underline">{title}</div>
        <div className="w-40 text-xs group-hover:underline">{author}</div>
      </div>
    </div>
  );
}
