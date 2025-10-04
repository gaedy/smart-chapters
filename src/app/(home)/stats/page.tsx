import { BookStats } from "@/components/booksStats";
import {
  ActivityItem,
  mapBookToActivity,
  RecentActivity,
} from "@/components/recent-activity";
import {
  getAllTrackedBooks,
  getUserBookCounts,
  getUserBookTrackingStatus,
} from "@/lib/actions/book.actions";
import { auth } from "auth";

export default async function StatsPage() {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return <p className="text-center">Please sign in to view Stats</p>;
  }

  const userId = session.user.id;

  const booksCount = await getUserBookCounts(userId);
  const books = await getAllTrackedBooks(userId);

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

  return (
    <div className="flex flex-col w-full h-full gap-8">
      <div className="flex flex-col gap-4">
        <p className="text-2xl font-medium">Statistics & Progress</p>
        <p className="">Search books, authors, or genres...</p>
      </div>

      <BookStats
        bookFinished={booksCount.TOTAL}
        pagesThisMonth={54}
        currentlyReading={booksCount.READING}
        wantToRead={booksCount.WANT_TO_READ}
      />

      <RecentActivity activities={activities} />
    </div>
  );
}
