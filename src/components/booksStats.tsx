import {
  BookOpen,
  BookMarked,
  CircleCheckBig,
  LibraryBig,
} from "lucide-react";

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
      title: "Books Finished",
      value: bookFinished,
      subtitle: "Total in your library",
      badge: "Complete",
      icon: CircleCheckBig,
    },
    {
      title: "Currently Reading",
      value: currentlyReading,
      subtitle: "In progress now",
      badge: "Active",
      icon: BookOpen,
    },
    {
      title: "Want To Read",
      value: wantToRead,
      subtitle: "Saved for later",
      badge: "Queued",
      icon: BookMarked,
    },
    {
      title: "Pages Read",
      value: pagesThisMonth,
      subtitle: "This month",
      badge: "Pages",
      icon: LibraryBig,
    },
  ];
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item, index) => (
          <div
            key={index}
            className="group flex min-h-32 w-full flex-col justify-between rounded-2xl border border-background/70 bg-background/90 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:bg-background sm:min-h-36 sm:p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 flex-col gap-1">
                <p className="text-sm font-medium text-secondary">
                  {item.title}
                </p>
                <p className="text-xs leading-5 text-secondary/75">
                  {item.subtitle}
                </p>
              </div>
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-foreground text-secondary transition-colors duration-300 group-hover:text-primary">
                <item.icon className="size-5" />
              </div>
            </div>

            <div className="flex items-end justify-between gap-3">
              <p className="flex items-center text-3xl font-semibold tracking-normal text-primary">
                {item.value}
              </p>
              <div className="rounded-full bg-green-color-1 px-3 py-1 text-xs font-medium text-green-color-2">
                {item.badge}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
