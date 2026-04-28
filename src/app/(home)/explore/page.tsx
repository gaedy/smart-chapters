import { auth } from "../../../../auth";
import { BookShelf } from "@/components/books/BookShelf";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getBooks, getGenres, getSuggestedBooks } from "@/lib/data/book.data";
import { BookOpenCheck, LibraryBig, Search, Sparkles } from "lucide-react";

type ExploreSearchParams = Promise<{ q?: string }>;

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
  const searchResults = query
    ? allBooks.filter(
        (book) =>
          book.title.toLowerCase().includes(query.toLowerCase()) ||
          book.author.toLowerCase().includes(query.toLowerCase()) ||
          book.genre?.toLowerCase().includes(query.toLowerCase())
      )
    : [];

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
        </div>
        <Button className="h-12 rounded-full">
          <Sparkles className="mr-2 h-4 w-4" />
          Find a book
        </Button>
      </form>

      {query && (
        <BookShelf
          title={`Search results for "${query}"`}
          description="Matches from titles, authors, and genres."
          books={searchResults}
        />
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
                key={genre}
                variant="ghost"
                className="shrink-0 rounded-full bg-background px-5 text-muted-foreground hover:bg-background hover:text-primary"
              >
                {genre}
              </Button>
            ))}
          </div>
        </section>
      )}

      <BookShelf
        title="Featured for quiet reading"
        description="A calm starting shelf for your next read."
        books={featuredBooks.length > 0 ? featuredBooks : allBooks.slice(0, 8)}
        href="/library/want-to-read"
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
          <Button variant="ghost" className="mt-6 w-fit rounded-full bg-foreground">
            View collection
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
          <Button variant="ghost" className="mt-6 w-fit rounded-full bg-foreground">
            Browse shelf
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
