"use client";

// import fg from "/public/h.jpg";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";

interface BookCardProps {
  title: string;
  author: string;
  coverUrl?: string | null;
  status?: string | null;
  progressPercent?: number | null;
  className?: string;
}

export default function BookCard({
  title,
  author,
  coverUrl,
  status,
  progressPercent,
  className,
}: BookCardProps) {
  const imageSrc = coverUrl || "/book_cover1.jpg";
  const normalizedProgress =
    typeof progressPercent === "number"
      ? Math.min(100, Math.max(0, Math.round(progressPercent)))
      : null;

  type TrackingStatus = "FINISHED" | "READING" | "WANT_TO_READ" | "DEFAULT";
  type TrackingStatusWithDefault = TrackingStatus | "DEFAULT";

  const statusConfig: Record<
    TrackingStatusWithDefault,
    { color: string; label: string }
  > = {
    FINISHED: { color: "bg-green-500/70 text-white", label: "Finished" },
    READING: {
      color: "bg-yellow-500/70 text-white",
      label: "Currently Reading",
    },
    WANT_TO_READ: { color: "bg-blue-500/70 text-white", label: "Want to Read" },
    DEFAULT: { color: "bg-gray-400/70 text-white", label: "Not Tracked" },
  };

  const key = (status ?? "DEFAULT") as TrackingStatusWithDefault;
  const { color, label } = statusConfig[key];

  return (
    <div
      className={`flex flex-col w-fit gap-2 rounded-3xl group cursor-pointer ${className}`}
    >
      <div
        className="flex w-40 shadow-lg hover:shadow-xl transition-all duration-300
        relative h-60 rounded-2xl overflow-hidden group-hover:scale-105"
      >
        <Image
          src={imageSrc}
          alt="Book Cover"
          fill
          className="rounded-2xl object-cover" // object-cover to cover entire or object-contain to respect ratio
        />

        {status && label !== "Not Tracked" && (
          <div className="p-2">
            <div
              className={`absolute p-2 px-2.5 text-xs rounded-full backdrop-blur-xs
              backdrop-brightness-80 ${color}`}
            >
              {label}
            </div>
          </div>
        )}

        {normalizedProgress !== null && (
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 bg-linear-to-t from-black/95 via-black/65 to-transparent px-2.5 pb-2 pt-8">
            <div className="flex items-center justify-between text-[0.65rem] font-medium leading-none ">
              <span>Progress</span>
              <span className="tabular-nums">{normalizedProgress}%</span>
            </div>
            <Progress
              value={normalizedProgress}
              className="h-1 overflow-hidden bg-white/25 [&>div]:p-0"
              indicatorClassName="bg-white"
              showLabel={false}
            />
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
