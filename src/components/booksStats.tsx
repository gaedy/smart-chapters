import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Flame,
  ArrowRight,
  BookMarked,
  CircleCheckBig,
} from "lucide-react";
import Link from "next/link";

interface UserReadingStatsProps {
  bookFinished: number;

  pagesThisMonth: number;
  currentlyReading: number;
  wantToRead: number;
  isLink?: boolean;
}

export function BookStats({
  bookFinished = 24,

  pagesThisMonth = 450,
  wantToRead = 12,
  currentlyReading = 25,
  isLink = true,
}: UserReadingStatsProps) {
  const stats = [
    {
      title: "Book Finished",
      value: bookFinished,
      subtitle: "Last month",
      badge: "245",
      showBadge: true,
      icon: <Flame />,
    },
    {
      title: "Currently Reading",
      value: currentlyReading,
      subtitle: "Last month",
      badge: "5",
      showBadge: true,
      icon: <Flame />,
    },
    {
      title: "Want to read",
      value: wantToRead,
      subtitle: "Last month",
      badge: "16",
      showBadge: true,
      icon: <Flame />,
    },
    {
      title: "Pages Read",
      value: pagesThisMonth,
      subtitle: "Last month",
      badge: "1.4K",
      showBadge: true,
      icon: <Flame />,
    },
  ];
  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex gap-2 items-center justify-between">
        {stats.map((item, index) => (
          <div
            key={index}
            className="flex bg-background rounded-2xl w-1/4 p-4 h-36 gap-2 flex-col justify-between"
          >
            {/* Title + Icon */}
            <div className="gap-2 text-secondary flex items-center">
              {item.icon && item.icon}
              <p>{item.title}</p>
            </div>

            {/* Value */}
            <p className="text-2xl font-bold flex items-center">{item.value}</p>

            {/* Footer */}
            {item.showBadge && (
              <div className="flex items-center text-sm gap-2 text-secondary">
                <div className="bg-green-color-1 p-1 px-2.5 rounded-full">
                  <p className="text-green-color-2">+{item.badge}</p>
                </div>
                <p>{item.subtitle}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
