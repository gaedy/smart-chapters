import { auth } from "../../../../auth";
import { BookShelf } from "@/components/books/BookShelf";
import { EmptyState } from "@/components/layout/EmptyState";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getBooks, getGenres, getSuggestedBooks } from "@/lib/data/book.data";
import { BookOpenCheck, LibraryBig, Search, Sparkles } from "lucide-react";
import Link from "next/link";

type ExploreSearchParams = Promise<{
  q?: string;
  genre?: string;
  collection?: string;
  shelf?: string;
}>;

type ExploreCollection = "featured" | "weekend" | "";

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: ExploreSearchParams;
}) {
  const session = await auth();
  const params = await searchParams;

  if (!session || !session.user?.id) {
    return <p className="text-center">Please sign in to view Books.</p>;
  }

  const [allBooks, suggestedBooks, genres] = await Promise.all([
    getBooks(),
    getSuggestedBooks(session.user.id, 12),
    getGenres(),
  ]);

  const featuredBooks = allBooks.filter((book) => book.isFeatured).slice(0, 8);
  const trendingBooks = [...allBooks]
    .sort((a, b) => (b.pageCount ?? 0) - (a.pageCount ?? 0))
    .slice(0, 10);
  const popularThisMonth = [...suggestedBooks].slice(0, 10);
  const genreBooks = allBooks.slice(0, 12);
  const genreLabels = genres
    .map((item) => item.genre)
    .filter((genre): genre is string => Boolean(genre))
    .slice(0, 8);
  const query = params.q?.trim() ?? "";
  const selectedGenre = params.genre?.trim() ?? "";
  const selectedCollection: ExploreCollection =
    params.collection === "featured" || params.collection === "weekend"
      ? params.collection
      : "";
  const selectedShelf = params.shelf === "classics" ? "classics" : "";
  const searchTerm = query.toLowerCase();
  const filteredBooks = allBooks.filter((book) => {
    const matchesQuery =
      !searchTerm ||
      book.title.toLowerCase().includes(searchTerm) ||
      book.author.toLowerCase().includes(searchTerm) ||
      book.genre?.toLowerCase().includes(searchTerm);
    const matchesGenre = !selectedGenre || book.genre === selectedGenre;
    const matchesCollection =
      !selectedCollection ||
      (selectedCollection === "featured" && book.isFeatured) ||
      (selectedCollection === "weekend" &&
        book.pageCount !== null &&
        book.pageCount <= 400);
    const matchesShelf =
      !selectedShelf ||
      book.genre === "Fiction" ||
      book.genre === "Historical Fiction" ||
      book.genre === "Science Fiction" ||
      (book.pageCount !== null && book.pageCount >= 450);

    return matchesQuery && matchesGenre && matchesCollection && matchesShelf;
  });
  const hasActiveFilters =
    Boolean(query) ||
    Boolean(selectedGenre) ||
    Boolean(selectedCollection) ||
    Boolean(selectedShelf);
  const filteredTitle = [
    query ? `Search results for "${query}"` : "Filtered books",
    selectedGenre,
    selectedCollection === "featured" ? "Featured for quiet reading" : "",
    selectedCollection === "weekend" ? "Weekend reading list" : "",
    selectedShelf ? "Classics shelf" : "",
  ].filter(Boolean);

  const buildExploreHref = (
    nextParams: Partial<{
      q: string;
      genre: string;
      collection: ExploreCollection;
      shelf: string;
    }>
  ) => {
    const next = new URLSearchParams();
    const values = {
      q: query,
      genre: selectedGenre,
      collection: selectedCollection,
      shelf: selectedShelf,
      ...nextParams,
    };

    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        next.set(key, value);
      }
    });

    const qs = next.toString();
    return qs ? `/explore?${qs}` : "/explore";
  };

  return (
    <div className="flex w-full flex-col gap-10">
      <PageHeader
        title="Explore Books"
        description="Discover thoughtful picks, familiar genres, and warm shelves of books to add to your next chapter."
      />

      <form className="grid gap-4 rounded-3xl bg-background p-4 lg:grid-cols-[1fr_auto]">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            name="q"
            defaultValue={query}
            placeholder="Search books, authors, or genres..."
            className="h-12 rounded-full bg-foreground pl-11"
          />
          {selectedGenre && <input type="hidden" name="genre" value={selectedGenre} />}
          {selectedCollection && (
            <input type="hidden" name="collection" value={selectedCollection} />
          )}
          {selectedShelf && <input type="hidden" name="shelf" value={selectedShelf} />}
        </div>
        <Button className="h-12 rounded-full">
          <Sparkles className="mr-2 h-4 w-4" />
          Find a book
        </Button>
      </form>

      {hasActiveFilters && (
        filteredBooks.length > 0 ? (
          <BookShelf
            title={filteredTitle.join(" / ")}
            description={`${filteredBooks.length} matching ${
              filteredBooks.length === 1 ? "book" : "books"
            } from titles, authors, genres, and shelves.`}
            books={filteredBooks}
          />
        ) : (
          <EmptyState
            title="No books matched"
            description="Try a different search term, genre, or shelf filter."
          />
        )
      )}

      {genreLabels.length > 0 && (
        <section className="flex flex-col gap-4">
          <SectionHeader
            title="Browse by genre"
            description="Quick paths into the shelves you return to most."
          />
          <div className="flex gap-2 overflow-x-auto pb-1">
            {genreLabels.map((genre) => (
              <Button
                asChild
                key={genre}
                variant="ghost"
                className={`shrink-0 rounded-full bg-background px-5 hover:bg-background hover:text-primary ${
                  selectedGenre === genre ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Link href={buildExploreHref({ genre, collection: "", shelf: "" })}>
                  {genre}
                </Link>
              </Button>
            ))}
            {selectedGenre && (
              <Button
                asChild
                variant="ghost"
                className="shrink-0 rounded-full bg-background px-5 text-muted-foreground hover:bg-background hover:text-primary"
              >
                <Link href={buildExploreHref({ genre: "" })}>All genres</Link>
              </Button>
            )}
          </div>
        </section>
      )}

      <BookShelf
        title="Featured for quiet reading"
        description="A calm starting shelf for your next read."
        books={featuredBooks.length > 0 ? featuredBooks : allBooks.slice(0, 8)}
        href={buildExploreHref({ collection: "featured", shelf: "" })}
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="flex min-h-44 flex-col justify-between rounded-3xl bg-background p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-foreground p-3 text-muted-foreground">
              <BookOpenCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-semibold">Weekend reading list</h2>
              <p className="text-sm text-muted-foreground">
                A compact collection for slower mornings and focused evenings.
              </p>
            </div>
          </div>
          <Button
            asChild
            variant="ghost"
            className="mt-6 w-fit rounded-full bg-foreground"
          >
            <Link href={buildExploreHref({ collection: "weekend", shelf: "" })}>
              View collection
            </Link>
          </Button>
        </div>
        <div className="flex min-h-44 flex-col justify-between rounded-3xl bg-background p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-foreground p-3 text-muted-foreground">
              <LibraryBig className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-semibold">Build your classics shelf</h2>
              <p className="text-sm text-muted-foreground">
                A gentle route into books with staying power.
              </p>
            </div>
          </div>
          <Button
            asChild
            variant="ghost"
            className="mt-6 w-fit rounded-full bg-foreground"
          >
            <Link href={buildExploreHref({ shelf: "classics", collection: "" })}>
              Browse shelf
            </Link>
          </Button>
        </div>
      </div>

      <BookShelf
        title="Trending books"
        description="Books readers are most likely to linger with."
        books={trendingBooks}
      />

      <BookShelf
        title="Popular this month"
        description="Recommendations shaped by ratings and review activity."
        books={popularThisMonth}
      />

      <BookShelf
        title="More to discover"
        description="A broader shelf when you want to wander."
        books={genreBooks}
      />
    </div>
  );
}
