import BookCard from "@/components/Book/BookCard";
import {
  getAllTrackedBooks,
  getReadingBooks,
  getSuggestedBooks,
  getUserBookCounts,
  getUserBookTrackingStatus,
} from "@/lib/actions/book.actions";
import { auth } from "../../../auth";
import Link from "next/link";
import { BookStats } from "@/components/booksStats";
import {
  ActivityItem,
  mapBookToActivity,
  RecentActivity,
} from "@/components/recent-activity";
import { Card } from "@/components/ui/card";
import { CurrentReading } from "@/components/currentReading";
import { CurrentRecommend } from "@/components/CurrentRecommend";

export default async function Home() {
  const session = await auth();

  if (!session?.user?.id) {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-2xl font-medium">Welcome to Your Reading Haven!</p>
        <p>Discover your next great read and keep track of your journey.</p>
        <p>
          <Link
            href="/sign-in"
            className="text-primary underline underline-offset-4 hover:text-primary/80 transition"
          >
            Sign in
          </Link>{" "}
          to start building your personal library and track your progress.
        </p>
      </div>
    );
  }
  const readingBooks = await getReadingBooks(session.user.id);

  const books = await getAllTrackedBooks(session.user.id);

  const booksCount = await getUserBookCounts(session.user.id);

  const suggestBooks = await getSuggestedBooks(session.user.id, 4);

  const activities: (ActivityItem & { rawDate: Date | null })[] =
    await Promise.all(
      books.map(async (book) => {
        const tracking = await getUserBookTrackingStatus(
          session.user.id,
          book.id
        );
        return mapBookToActivity(book, tracking);
      })
    );

  activities.sort((a, b) => {
    const aTime = a.rawDate ? a.rawDate.getTime() : 0;
    const bTime = b.rawDate ? b.rawDate.getTime() : 0;
    return bTime - aTime; // desc
  });

  return (
    <>
      <div className="flex flex-col w-full h-full gap-10">
        <div className="flex flex-col gap-4 ">
          {session && (
            <p className="text-2xl font-medium">{`Welcome, ${
              session?.user?.name?.split(" ")[0]
            }!`}</p>
          )}

          <p className="mb-6">Ready to continue your reading journey?</p>

          {books.length === 0 ? (
            <p className="">
              Start adding books to your library, track your progress, and share
              your thoughts with the community.
            </p>
          ) : (
            <>
              <div className="flex flex-col gap-10">
                <CurrentReading books={readingBooks} />

                <CurrentRecommend books={suggestBooks} />

                <div className="flex flex-col gap-4">
                  <p className="text-xl">Your Stats</p>
                  <div className="flex flex-col w-full gap-4 lg:flex-row">
                    <BookStats
                      bookFinished={booksCount.TOTAL}
                      pagesThisMonth={54}
                      currentlyReading={booksCount.READING}
                      wantToRead={booksCount.WANT_TO_READ}
                    />

                    <RecentActivity activities={activities} />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
