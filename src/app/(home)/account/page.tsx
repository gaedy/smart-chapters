import Image from "next/image";
import Link from "next/link";
import { auth } from "auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/layout/PageHeader";
import { BookShelf } from "@/components/books/BookShelf";
import { Progress } from "@/components/ui/progress";
import {
  getFinishedBooks,
  getTrackedBooksWithDetails,
  getUserBookCounts,
} from "@/lib/data/book.data";
import { BookOpen, Heart, PenLine, Target } from "lucide-react";

export default async function AccountPage() {
  const session = await auth();

  if (!session || !session.user?.id) {
    return <p className="text-center">Please sign in to view your account.</p>;
  }

  const [books, finishedBooks, counts] = await Promise.all([
    getTrackedBooksWithDetails(session.user.id),
    getFinishedBooks(session.user.id),
    getUserBookCounts(session.user.id),
  ]);
  const goal = 24;
  const progress = Math.min(100, Math.round((counts.FINISHED / goal) * 100));
  const favoriteGenres = Object.entries(
    books.reduce<Record<string, number>>((acc, book) => {
      const genre = book.genre ?? "Unsorted";
      acc[genre] = (acc[genre] ?? 0) + 1;
      return acc;
    }, {})
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  return (
    <div className="flex w-full flex-col gap-8">
      <PageHeader
        title="My Account"
        description="Your reader profile, library snapshot, and personal details in one calm place."
        action={
          <Button asChild className="rounded-full">
            <Link href="/settings">
              <PenLine className="mr-2 h-4 w-4" />
              Edit settings
            </Link>
          </Button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[1fr_1.1fr]">
        <section className="rounded-2xl bg-background p-4 sm:rounded-3xl sm:p-5">
          <div className="flex min-w-0 items-center gap-4">
            <Avatar className="h-16 w-16 shrink-0 sm:h-20 sm:w-20">
              {session.user.image ? (
                <AvatarImage src={session.user.image} alt="User avatar" />
              ) : (
                <AvatarFallback className="text-xl">
                  {session.user.name?.[0] ?? "U"}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="min-w-0">
              <h2 className="text-xl font-semibold">
                {session.user.name ?? "Reader"}
              </h2>
              <p className="truncate text-sm text-muted-foreground">
                {session.user.email}
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm">
              Display name
              <Input
                defaultValue={session.user.name ?? ""}
                className="rounded-2xl bg-foreground"
                readOnly
              />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              Email
              <Input
                defaultValue={session.user.email ?? ""}
                className="rounded-2xl bg-foreground"
                readOnly
              />
            </label>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-background p-4 sm:rounded-3xl sm:p-5">
            <BookOpen className="mb-4 h-5 w-5 text-muted-foreground" />
            <p className="text-3xl font-bold">{counts.READING}</p>
            <p className="text-sm text-muted-foreground">Currently reading</p>
          </div>
          <div className="rounded-2xl bg-background p-4 sm:rounded-3xl sm:p-5">
            <Heart className="mb-4 h-5 w-5 text-muted-foreground" />
            <p className="text-3xl font-bold">{counts.WANT_TO_READ}</p>
            <p className="text-sm text-muted-foreground">Want to read</p>
          </div>
          <div className="rounded-2xl bg-background p-4 sm:rounded-3xl sm:p-5">
            <Target className="mb-4 h-5 w-5 text-muted-foreground" />
            <p className="text-3xl font-bold">{counts.FINISHED}</p>
            <p className="text-sm text-muted-foreground">Finished</p>
          </div>
        </section>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-2xl bg-background p-4 sm:rounded-3xl sm:p-5">
          <h2 className="mb-4 font-semibold">Reading goal snapshot</h2>
          <p className="mb-5 text-sm text-muted-foreground">
            {counts.FINISHED} of {goal} books finished this year
          </p>
          <Progress value={progress} />
        </section>

        <section className="rounded-2xl bg-background p-4 sm:rounded-3xl sm:p-5">
          <h2 className="mb-4 font-semibold">Favorite genres</h2>
          <div className="flex flex-wrap gap-2">
            {favoriteGenres.length > 0 ? (
              favoriteGenres.map(([genre, count]) => (
                <span
                  key={genre}
                  className="rounded-full bg-foreground px-4 py-2 text-sm"
                >
                  {genre} · {count}
                </span>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                Add books with genres to shape this profile.
              </p>
            )}
          </div>
        </section>
      </div>

      <BookShelf
        title="Recently finished"
        description="A small shelf of completed chapters."
        books={finishedBooks}
        href="/library/finished"
      />
    </div>
  );
}
