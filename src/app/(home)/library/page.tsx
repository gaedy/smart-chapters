import { LibraryView } from "@/components/library/LibraryView";
import { getTrackedBooksWithDetails } from "@/lib/data/book.data";
import { auth } from "../../../../auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Library - Smart Chapters",
};

type LibrarySearchParams = Promise<{
  q?: string;
  sort?: "updated" | "title" | "author" | "rating" | "progress";
}>;

async function page({ searchParams }: { searchParams: LibrarySearchParams }) {
  const session = await auth();
  const params = await searchParams;

  if (!session || !session.user?.id) {
    return (
      <p className="text-center">
        Please sign in to add Books to your Library.
      </p>
    );
  }

  const books = await getTrackedBooksWithDetails(session.user.id);

  return <LibraryView books={books} query={params.q} sort={params.sort} />;
}
export default page;
