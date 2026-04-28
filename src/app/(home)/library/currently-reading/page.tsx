import { LibraryView } from "@/components/library/LibraryView";
import { getTrackedBooksWithDetails } from "@/lib/data/book.data";
import { auth } from "../../../../../auth";

type LibrarySearchParams = Promise<{
  q?: string;
  sort?: "updated" | "title" | "author" | "rating" | "progress";
}>;

export default async function ReadingPage({
  searchParams,
}: {
  searchParams: LibrarySearchParams;
}) {
  const session = await auth();
  const params = await searchParams;

  if (!session || !session.user?.id) {
    return (
      <p className="text-center">
        Please sign in to view your Currently Reading books.
      </p>
    );
  }

  const books = await getTrackedBooksWithDetails(session.user.id);

  return (
    <LibraryView
      books={books}
      status="READING"
      query={params.q}
      sort={params.sort}
    />
  );
}
