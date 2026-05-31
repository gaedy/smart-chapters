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
  featured?: boolean;
}

export function BookShelf({
  title,
  description,
  books,
  href,
  limit,
  itemClassName,
  featured = false,
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
        <div className="mb-4 flex flex-col gap-3 sm:mb-5 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div className="flex min-w-0 flex-col gap-1.5">
            <h2
              className={cn(
                " font-semibold tracking-normal text-primary",
                featured ? "text-xl" : "text-xl"
              )}
            >
              {title}
            </h2>
            {description && (
              <p className="max-w-xl text-sm leading-6 text-secondary">
                {description}
              </p>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-2 self-start">
            {href && (
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="rounded-full bg-background/70 px-4 text-secondary shadow-none hover:bg-accent hover:text-primary"
              >
                <Link href={href}>
                  View all
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            )}
            {showControls && (
              <div className="hidden items-center gap-2 sm:flex">
                <CarouselPrevious className="static size-9 translate-y-0 bg-background/70 text-secondary shadow-none hover:bg-accent hover:text-primary disabled:hidden" />
                <CarouselNext className="static size-9 translate-y-0 bg-background/70 text-secondary shadow-none hover:bg-accent hover:text-primary disabled:hidden" />
              </div>
            )}
          </div>
        </div>

        <div className="relative">
          <CarouselContent className="-ml-4 py-2 sm:-ml-5">
            {visibleBooks.map((book) => (
              <CarouselItem
                key={book.id}
                className={cn("pl-4 sm:pl-5", "basis-[min(10.75rem,46vw)] sm:basis-44", itemClassName)}
              >
                <Link
                  href={`/book/${book.id}`}
                  className="block rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
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
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-14 bg-gradient-to-l from-foreground via-foreground/70 to-transparent sm:block" />
        </div>
      </Carousel>
    </section>
  );
}
