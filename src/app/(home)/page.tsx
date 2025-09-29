import {
  getAllTrackedBooks,
  getReadingBooks,
  getSuggestedBooks,
} from "@/lib/actions/book.actions";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";

import { CurrentReading } from "@/components/currentReading";
import { CurrentRecommend } from "@/components/CurrentRecommend";

export default async function Home() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/sign-in");
  }
  const readingBooks = await getReadingBooks(session!.user!.id);

  const books = await getAllTrackedBooks(session!.user!.id);

  const suggestBooks = await getSuggestedBooks(session!.user!.id, 4);

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
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
