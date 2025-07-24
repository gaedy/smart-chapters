import BookCard from "@/components/BookCard";
import { getReadingBooks } from "@/lib/actions/book.actions";
import { auth } from "../../../auth";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  if (!session || !session.user?.id) {
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

  const books = await getReadingBooks(session.user.id);

  if (books.length === 0) {
    return <p className="text-center">No books added to this list yet.</p>;
  }

  return (
    <>
      <div className="flex flex-col w-full h-full gap-10">
        <div className="flex flex-col gap-4 ">
          {session && (
            <p className="text-2xl font-medium">{`Welcome Back, ${
              session?.user?.name?.split(" ")[0]
            }!`}</p>
          )}

          <p className="">Ready to continue your reading journey?</p>
        </div>

        <div className="flex flex-col gap-4">
          <p>Currently Reading</p>

          <div className="flex gap-4 ">
            {books.map((book) => (
              <Link href={`/book/${book.id}`} key={book.id}>
                <BookCard
                  title={book.title}
                  author={book.author}
                  coverUrl={book.coverUrl}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
