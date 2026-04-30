import Link from "next/link";
import { auth } from "auth";
import { getTrackedBooksWithDetails } from "@/lib/data/book.data";
import { EmptyState } from "@/components/layout/EmptyState";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookMarked, Highlighter, Search, StickyNote } from "lucide-react";

type NotesSearchParams = Promise<{
  q?: string;
  type?: string;
}>;

export default async function NotesPage({
  searchParams,
}: {
  searchParams: NotesSearchParams;
}) {
  const session = await auth();
  const params = await searchParams;

  if (!session || !session.user?.id) {
    return <p className="text-center">Please sign in to view your notes.</p>;
  }

  const query = params.q?.trim() ?? "";
  const selectedType =
    params.type === "Note" || params.type === "Reflection" ? params.type : "All";
  const books = await getTrackedBooksWithDetails(session.user.id);
  const notes = books.flatMap((book) => {
    const tracking = book.bookTrackings[0];
    const trackingNote = tracking?.notes
      ? [
          {
            id: `${book.id}-tracking-note`,
            type: "Note",
            content: tracking.notes,
            bookId: book.id,
            bookTitle: book.title,
            author: book.author,
            date: tracking.updatedAt,
          },
        ]
      : [];
    const reviews = book.Review.map((review) => ({
      id: review.id,
      type: "Reflection",
      content: review.content,
      bookId: book.id,
      bookTitle: book.title,
      author: book.author,
      date: review.updatedAt ?? review.createdAt,
    }));

    return [...trackingNote, ...reviews];
  });
  const searchTerm = query.toLowerCase();
  const filteredNotes = notes.filter((note) => {
    const matchesType = selectedType === "All" || note.type === selectedType;
    const matchesSearch =
      !searchTerm ||
      note.content.toLowerCase().includes(searchTerm) ||
      note.bookTitle.toLowerCase().includes(searchTerm) ||
      note.author.toLowerCase().includes(searchTerm) ||
      note.type.toLowerCase().includes(searchTerm);

    return matchesType && matchesSearch;
  });
  const booksWithNotes = books.filter(
    (book) => book.bookTrackings[0]?.notes || book.Review.length > 0
  );
  const filterItems = [
    { label: "All", value: "All" },
    { label: "Notes", value: "Note" },
    { label: "Reflections", value: "Reflection" },
  ];

  const buildNotesHref = (nextType: string) => {
    const next = new URLSearchParams();

    if (query) {
      next.set("q", query);
    }

    if (nextType !== "All") {
      next.set("type", nextType);
    }

    const qs = next.toString();
    return qs ? `/notes?${qs}` : "/notes";
  };

  return (
    <div className="flex w-full flex-col gap-8">
      <PageHeader
        title="Notes & Quotes"
        description="A quieter place for the lines, reflections, and book thoughts you want to return to."
        action={
          <span className="rounded-full bg-background px-4 py-2 text-sm">
            {notes.length} saved
          </span>
        }
      />

      <form className="grid gap-3 rounded-3xl bg-background p-4 md:grid-cols-[1fr_auto]">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            name="q"
            defaultValue={query}
            placeholder="Search notes, books, or authors..."
            className="rounded-full bg-foreground pl-11"
          />
          {selectedType !== "All" && (
            <input type="hidden" name="type" value={selectedType} />
          )}
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {filterItems.map((item) => (
            <Button
              asChild
              key={item.value}
              variant="ghost"
              className={`shrink-0 rounded-full shadow-none ${
                selectedType === item.value
                  ? "bg-theme-accent text-theme-accent-foreground hover:bg-theme-accent/90"
                  : "bg-foreground text-muted-foreground hover:bg-foreground-dark hover:text-primary"
              }`}
            >
              <Link href={buildNotesHref(item.value)}>{item.label}</Link>
            </Button>
          ))}
          <Button className="shrink-0 rounded-full">Search</Button>
        </div>
      </form>

      {notes.length === 0 ? (
        <EmptyState
          title="No notes saved yet"
          description="Add notes or reviews to books in your library and they will gather here."
        />
      ) : filteredNotes.length === 0 ? (
        <EmptyState
          title="No matching notes"
          description="Try another search term or switch the note filter."
        />
      ) : (
        <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
          <div className="grid gap-4">
            {filteredNotes.map((note) => (
              <article
                key={note.id}
                className="rounded-3xl bg-background p-5 transition hover:shadow-md"
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-foreground p-3 text-muted-foreground">
                      {note.type === "Note" ? (
                        <StickyNote className="h-4 w-4" />
                      ) : (
                        <Highlighter className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">
                        {note.type}
                      </p>
                      <Link
                        href={`/book/${note.bookId}`}
                        className="font-semibold hover:underline"
                      >
                        {note.bookTitle}
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        by {note.author}
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-sm leading-7 text-primary/90">{note.content}</p>
              </article>
            ))}
          </div>

          <aside className="h-fit rounded-3xl bg-background p-5">
            <div className="mb-4 flex items-center gap-2">
              <BookMarked className="h-4 w-4 text-muted-foreground" />
              <h2 className="font-semibold">Books with notes</h2>
            </div>
            <div className="flex flex-col gap-2">
              {booksWithNotes
                .slice(0, 8)
                .map((book) => (
                  <Link
                    key={book.id}
                    href={`/book/${book.id}`}
                    className="rounded-2xl bg-foreground px-4 py-3 text-sm hover:underline"
                  >
                    {book.title}
                  </Link>
                ))}
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
