import {
  getAllTrackedBooks,
  getReadingBooks,
  getSuggestedBooks,
  getUserBookCounts,
} from "@/lib/actions/book.actions";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";

import { CurrentReading } from "@/components/currentReading";
import { CurrentRecommend } from "@/components/CurrentRecommend";
import { BookStats } from "@/components/booksStats";

import GoalTracker from "@/components/goal";

export default async function Home() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/sign-in");
  }
  const readingBooks = await getReadingBooks(session.user.id);
  const books = await getAllTrackedBooks(session.user.id);
  const suggestBooks = await getSuggestedBooks(session.user.id, 4);
  const booksCount = await getUserBookCounts(session.user.id);
  return (
    <>
      <div className="flex flex-col w-full h-full gap-10">
        <div className="flex flex-col gap-4 ">
          <div className="flex flex-col gap-10">
            {/* <GoalTracker /> */}
            <BookStats
              bookFinished={booksCount.TOTAL}
              pagesThisMonth={54}
              currentlyReading={booksCount.READING}
              wantToRead={booksCount.WANT_TO_READ}
              isLink={false}
            />
            <CurrentReading books={readingBooks} />

            <CurrentRecommend books={suggestBooks} />
          </div>
        </div>
      </div>
    </>
  );
}
