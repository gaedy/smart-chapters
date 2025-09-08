import {
  Clock,
  BookOpen,
  CheckCircle,
  Plus,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export type ActivityItem = {
  id: string;
  type: "finished" | "started" | "progress" | "added" | "milestone";
  bookTitle: string;
  author?: string;
  timestamp: string;
  details?: string;
  pages?: number;
  rawDate: Date | null;
};

interface RecentActivityProps {
  activities?: ActivityItem[];
}

type TrackingStatus = "READING" | "WANT_TO_READ" | "FINISHED" | null;

interface UserBookTracking {
  isTracked: boolean;
  status: TrackingStatus;
  currentPage: number | null;
  updatedAt?: Date | null;
  startedAt?: Date | null;
  finishedAt?: Date | null;
}

interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string | null;
  isFeatured?: boolean | null;
}

/* ----------------- Helpers ----------------- */
const getActivityIcon = (type: ActivityItem["type"]) => {
  const icons = {
    finished: <CheckCircle className="w-4 h-4 text-emerald-600" />,
    started: <BookOpen className="w-4 h-4 text-blue-600" />,
    progress: <TrendingUp className="w-4 h-4 text-orange-600" />,
    added: <Plus className="w-4 h-4 text-purple-600" />,
    milestone: <Clock className="w-4 h-4 text-amber-600" />,
  };
  return icons[type] || <BookOpen className="w-4 h-4 text-muted-foreground" />;
};

const getActivityText = (activity: ActivityItem) => {
  const texts: Record<ActivityItem["type"], string> = {
    finished: "Finished reading",
    started: "Started reading",
    progress: "Made progress on",
    added: "Added to library",
    milestone: "Milestone reached in",
  };
  return texts[activity.type] ?? "Activity on";
};

function timeAgo(date: Date): string {
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

/* ----------------- Mapper ----------------- */
export function mapBookToActivity(
  book: Book,
  tracking: UserBookTracking
): ActivityItem {
  let type: ActivityItem["type"];
  let details: string | undefined;
  let date: Date | null = null;

  switch (tracking.status) {
    case "READING":
      type = "progress";
      details = tracking.currentPage
        ? `Currently at page ${tracking.currentPage}`
        : "Reading in progress";
      date = tracking.updatedAt ?? tracking.startedAt ?? new Date();
      break;

    case "WANT_TO_READ":
      type = "added";
      details = "Added to reading list";
      date = tracking.updatedAt ?? new Date();
      break;

    case "FINISHED":
      type = "finished";
      details = "Finished this book";
      date = tracking.finishedAt ?? tracking.updatedAt ?? new Date();
      break;

    default:
      type = "started";
      details = "Started reading";
      date = tracking.startedAt ?? new Date();
  }

  return {
    id: book.id,
    type,
    bookTitle: book.title,
    author: book.author,
    timestamp: date ? timeAgo(date) : "Just now",
    details,
    pages: tracking.currentPage ?? undefined,
    rawDate: date,
  } as ActivityItem & { rawDate: Date | null };
}

/* ----------------- Component ----------------- */
export function RecentActivity({ activities = [] }: RecentActivityProps) {
  return (
    <div className="bg-card border-none w-full  rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-semibold text-card-foreground">Recent Activity</h2>
        {/* <Button
          variant="secondary"
          size="sm"
          className="border-primary/30 text-muted-foreground hover:text-primary  cursor-pointer hover:bg-primary/10 bg-transparent"
        >
          View All
          <ArrowRight className="w-4 h-4 ml-1" />
        </Button> */}
      </div>

      {activities.length === 0 ? (
        <p className="text-sm text-muted-foreground">No recent activity</p>
      ) : (
        <div className="space-y-2 h-fit">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex-shrink-0 mt-0.5">
                {getActivityIcon(activity.type)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <p className="text-sm text-card-foreground">
                      <span className="text-muted-foreground">
                        {getActivityText(activity)}
                      </span>
                      <Link href={`/book/${activity.id}`}>
                        <span className="font-medium hover:underline ml-1">
                          {activity.bookTitle}
                        </span>
                      </Link>

                      {activity.author && (
                        <span className="text-muted-foreground ml-1">
                          by {activity.author}
                        </span>
                      )}
                    </p>

                    {activity.details && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {activity.details}
                      </p>
                    )}
                  </div>

                  <span className="text-xs text-muted-foreground flex-shrink-0">
                    {activity.timestamp}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
