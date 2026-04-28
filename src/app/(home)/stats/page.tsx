import { BookStats } from "@/components/booksStats";
import { PageHeader } from "@/components/layout/PageHeader";
import { Progress } from "@/components/ui/progress";
import {
  ActivityItem,
  mapBookToActivity,
  RecentActivity,
} from "@/components/recent-activity";
import {
  getTrackedBooksWithDetails,
  getUserBookCounts,
  getUserBookTrackingStatus,
} from "@/lib/data/book.data";
import { auth } from "auth";
import { BookOpen, ChartNoAxesColumn, Star, Target } from "lucide-react";

export default async function StatsPage() {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return <p className="text-center">Please sign in to view Stats</p>;
  }

  const userId = session.user.id;

  const booksCount = await getUserBookCounts(userId);
  const books = await getTrackedBooksWithDetails(userId);

  const activities: (ActivityItem & { rawDate: Date | null })[] =
    await Promise.all(
      books.map(async (book) => {
        const tracking = await getUserBookTrackingStatus(
          userId,
          book.id
        );
        return mapBookToActivity(book, tracking);
      })
    );

  activities.sort((a, b) => {
    const aTime = a.rawDate ? a.rawDate.getTime() : 0;
    const bTime = b.rawDate ? b.rawDate.getTime() : 0;
    return bTime - aTime;
  });

  const finishedBooks = books.filter(
    (book) => book.bookTrackings[0]?.status === "FINISHED"
  );
  const pagesRead = books.reduce((total, book) => {
    const tracking = book.bookTrackings[0];
    if (tracking?.status === "FINISHED") return total + (book.pageCount ?? 0);
    return total + (tracking?.currentPage ?? 0);
  }, 0);
  const ratings = books
    .map((book) => book.bookTrackings[0]?.rating)
    .filter((rating): rating is number => typeof rating === "number");
  const averageRating =
    ratings.length > 0
      ? ratings.reduce((total, rating) => total + rating, 0) / ratings.length
      : 0;
  const readingGoal = 24;
  const goalProgress = Math.min(
    100,
    Math.round((finishedBooks.length / readingGoal) * 100)
  );
  const genreCounts = books.reduce<Record<string, number>>((acc, book) => {
    const genre = book.genre ?? "Unsorted";
    acc[genre] = (acc[genre] ?? 0) + 1;
    return acc;
  }, {});
  const topGenres = Object.entries(genreCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  const authorCounts = books.reduce<Record<string, number>>((acc, book) => {
    acc[book.author] = (acc[book.author] ?? 0) + 1;
    return acc;
  }, {});
  const topAuthors = Object.entries(authorCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="flex w-full flex-col gap-8">
      <PageHeader
        title="Statistics & Progress"
        description="A soft read on your pace, habits, and favorite corners of the library."
      />

      <BookStats
        bookFinished={booksCount.FINISHED}
        pagesThisMonth={pagesRead}
        currentlyReading={booksCount.READING}
        wantToRead={booksCount.WANT_TO_READ}
      />

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="flex flex-col gap-5 rounded-3xl bg-background p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-foreground p-3 text-muted-foreground">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-semibold">Reading goal</h2>
              <p className="text-sm text-muted-foreground">
                {finishedBooks.length} of {readingGoal} books finished this year
              </p>
            </div>
          </div>
          <Progress value={goalProgress} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <div className="rounded-3xl bg-background p-5">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Star className="h-4 w-4" />
              <span className="text-sm">Average rating</span>
            </div>
            <p className="mt-4 text-3xl font-bold">
              {averageRating ? averageRating.toFixed(1) : "-"}
            </p>
          </div>
          <div className="rounded-3xl bg-background p-5">
            <div className="flex items-center gap-2 text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              <span className="text-sm">Pages read</span>
            </div>
            <p className="mt-4 text-3xl font-bold">{pagesRead}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl bg-background p-5">
          <div className="mb-5 flex items-center gap-2">
            <ChartNoAxesColumn className="h-4 w-4 text-muted-foreground" />
            <h2 className="font-semibold">Favorite genres</h2>
          </div>
          <div className="flex flex-col gap-4">
            {topGenres.map(([genre, count]) => (
              <div key={genre} className="flex flex-col gap-2">
                <div className="flex justify-between text-sm">
                  <span>{genre}</span>
                  <span className="text-muted-foreground">{count}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-foreground">
                  <div
                    className="h-full rounded-full bg-progress"
                    style={{ width: `${(count / books.length) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-background p-5">
          <h2 className="mb-5 font-semibold">Top authors</h2>
          <div className="flex flex-col gap-3">
            {topAuthors.map(([author, count]) => (
              <div
                key={author}
                className="flex items-center justify-between rounded-2xl bg-foreground px-4 py-3"
              >
                <span className="text-sm font-medium">{author}</span>
                <span className="text-xs text-muted-foreground">
                  {count} {count === 1 ? "book" : "books"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <RecentActivity activities={activities} />
    </div>
  );
}
