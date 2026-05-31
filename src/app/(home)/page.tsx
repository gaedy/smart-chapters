import {
  getAllTrackedBooks,
  getReadingBooks,
  getSuggestedBooks,
  getTrackedBooksWithDetails,
  getUserBookCounts,
} from "@/lib/data/book.data";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";

import { CurrentReading } from "@/components/currentReading";
import { CurrentRecommend } from "@/components/CurrentRecommend";
import { BookStats } from "@/components/booksStats";
import { PageHeader } from "@/components/layout/PageHeader";

export default async function Home() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/sign-in");
  }
  const readingBooks = await getReadingBooks(session.user.id);
  // const books = await getAllTrackedBooks(session.user.id);
  const suggestBooks = await getSuggestedBooks(session.user.id, 4);
  const booksCount = await getUserBookCounts(session.user.id);
  const books = await getTrackedBooksWithDetails(session.user.id);

  const pagesRead = books.reduce((total, book) => {
    const tracking = book.bookTrackings[0];
    if (tracking?.status === "FINISHED") return total + (book.pageCount ?? 0);
    return total + (tracking?.currentPage ?? 0);
  }, 0);

  return (
    <div className="mx-auto flex h-full w-full max-w-7xl flex-col gap-8">
      <PageHeader
        title={
          session.user?.name
            ? `Good to see you, ${session.user.name.split(" ")[0]}!`
            : "Welcome to Smart Chapters"
        }
        description="A calm view of what you're reading now, what's next, and your growing library."
      />

      <BookStats
        bookFinished={booksCount.TOTAL}
        pagesThisMonth={pagesRead}
        currentlyReading={booksCount.READING}
        wantToRead={booksCount.WANT_TO_READ}
        isLink={false}
      />

      <CurrentReading books={readingBooks} />

      <CurrentRecommend books={suggestBooks} />
    </div>
  );
}
