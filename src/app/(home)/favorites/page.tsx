import { auth } from "auth";
import { BookGrid } from "@/components/books/BookGrid";
import { PageHeader } from "@/components/layout/PageHeader";
import { getTrackedBooksWithDetails } from "@/lib/data/book.data";

export default async function FavoritesPage() {
  const session = await auth();

  if (!session || !session.user?.id) {
    return <p className="text-center">Please sign in to view favorites.</p>;
  }

  const books = await getTrackedBooksWithDetails(session.user.id);
  const favorites = books
    .filter((book) => (book.bookTrackings[0]?.rating ?? 0) >= 4)
    .map((book) => ({ ...book, status: book.bookTrackings[0]?.status }));

  return (
    <div className="flex w-full flex-col gap-8">
      <PageHeader
        title="Favorites"
        description="The books you rated highly, gathered into a warm shelf of keepers."
      />
      <BookGrid
        books={favorites}
        emptyTitle="No favorites yet"
        emptyDescription="Rate books four stars or higher and they will appear here."
      />
    </div>
  );
}
