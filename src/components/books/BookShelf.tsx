import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BookCard from "@/components/Book/BookCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ShelfBook {
  id: string | number;
  title: string;
  author: string;
  coverUrl?: string | null;
  status?: string | null;
}

interface BookShelfProps {
  title: string;
  description?: string;
  books: ShelfBook[];
  href?: string;
  limit?: number;
  itemClassName?: string;
}

export function BookShelf({
  title,
  description,
  books,
  href,
  limit,
  itemClassName,
}: BookShelfProps) {
  const visibleBooks = limit ? books.slice(0, limit) : books;
  const showControls = visibleBooks.length > 2;

  if (visibleBooks.length === 0) {
    return null;
  }

  return (
    <section className="flex flex-col gap-4 overflow-hidden">
      <Carousel
        opts={{
          align: "start",
          dragFree: true,
          containScroll: "trimSnaps",
        }}
        className="w-full"
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="flex min-w-0 flex-col gap-1">
            <h2 className="text-lg font-bold">{title}</h2>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {href && (
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="rounded-full border-primary/30 bg-transparent text-muted-foreground hover:bg-primary/10 hover:text-primary"
              >
                <Link href={href}>
                  View all
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            )}
            {showControls && (
              <div className="hidden items-center gap-2 sm:flex">
                <CarouselPrevious className="static size-8 translate-y-0 border-border bg-background text-muted-foreground shadow-none hover:bg-background hover:text-primary disabled:hidden" />
                <CarouselNext className="static size-8 translate-y-0 border-border bg-background text-muted-foreground shadow-none hover:bg-background hover:text-primary disabled:hidden" />
              </div>
            )}
          </div>
        </div>

        <div className="relative">
          <CarouselContent className="-ml-4 py-2">
            {visibleBooks.map((book) => (
              <CarouselItem
                key={book.id}
                className={cn("basis-[11rem]", itemClassName)}
              >
                <Link
                  href={`/book/${book.id}`}
                  className="block w-40 rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                >
                  <BookCard
                    title={book.title}
                    author={book.author}
                    coverUrl={book.coverUrl}
                    status={book.status}
                  />
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-10 bg-gradient-to-l from-foreground to-transparent sm:block" />
        </div>
      </Carousel>
    </section>
  );
}
