import ReviewCard from "@/components/Reviews/reviewCard";
import Rating from "@/components/ui/rating";

import Image from "next/image";
import { notFound } from "next/navigation";

import { auth } from "auth";
import { Metadata } from "next";
import { BookProgressBox } from "./BookProgressBox";
import { BookLibraryBox } from "./BookLibraryBox";
import ReviewEditor from "../../../../components/Reviews/reviewEditor";
import {
  getAllReviewsByBookId,
  getCurrentSessionReview,
} from "@/lib/data/reviews.data";

import {
  getAverageRatingForAllUsers,
  getBookById,
  getUserBookTrackingRating,
  getUserBookTrackingStatus,
} from "@/lib/data/book.data";
import { BookOpen, Calendar, Layers, MessageSquare, Star } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const book = await getBookById(id);
  if (!book) {
    return {
      title: "Book Not Found",
      description: "This book does not exist.",
    };
  }

  return {
    title: `${book.title} - Smart Chapters`,
    description: book.description || "Read more about this book.",
  };
}

export default async function theDetailedBookPage({ params }: PageProps) {
  const { id } = await params;

  const book = await getBookById(id);
  if (!book) notFound();

  const imgSource = book.coverUrl || "/book_cover1.jpg";

  const session = await auth();

  if (!session || !session.user?.id) {
    return;
  }

  const { isTracked, status, currentPage } = await getUserBookTrackingStatus(
    session?.user?.id,
    book.id,
  );

  const rate = await getUserBookTrackingRating(session.user.id, book.id);

  const { averageRating, totalRatings } = await getAverageRatingForAllUsers(
    book.id,
  );
  const reviews = await getAllReviewsByBookId(book.id);
  const myReview = await getCurrentSessionReview(session.user.id, book.id);
  const communityReviews = reviews.filter(
    (review) => review.userId !== session?.user?.id,
  );

  const ratingsNumber = reviews.filter((r) => r.rating != null).length;
  const reviewsNumber = reviews.filter((r) => r.content?.trim()).length;
  const publishedYear = book.publishedAt
    ? new Date(book.publishedAt).getFullYear()
    : null;

  return (
    <div className="flex w-full flex-col gap-8">
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="rounded-3xl bg-background p-4 sm:p-6">
          <div className="grid gap-6 lg:grid-cols-[180px_minmax(0,1fr)]">
            <aside className="flex flex-col items-center gap-5">
              <div className="relative h-72 w-48 overflow-hidden rounded-xl shadow-lg">
                <Image
                  src={imgSource}
                  alt={`${book.title} cover`}
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              <div className="flex w-full max-w-48 flex-col items-center gap-3 p-2">
                <Rating
                  bookId={book.id}
                  canModified={true}
                  value={rate?.rating ?? 0}
                />
                <p className="text-center text-xs text-muted-foreground">
                  {rate?.rating ? "Your rating" : "Rate this book"}
                </p>
              </div>

              <div className="w-full max-w-48">
                <BookLibraryBox
                  isTracked={isTracked}
                  status={status ?? undefined}
                  book={{
                    id: book.id,
                    title: book.title,
                    author: book.author,
                  }}
                />
              </div>
            </aside>

            <div className="flex min-w-0 flex-col gap-6">
              <div className="flex flex-col gap-3">
                {status && (
                  <span className="w-fit rounded-full bg-foreground px-3 py-1 text-xs text-muted-foreground">
                    {status === "READING"
                      ? "Currently Reading"
                      : status === "WANT_TO_READ"
                      ? "Want to Read"
                      : "Finished"}
                  </span>
                )}
                <div className="flex flex-col gap-2">
                  <h1 className="text-3xl font-medium leading-tight sm:text-4xl">
                    {book.title}
                  </h1>
                  <p className="text-base text-muted-foreground sm:text-lg">
                    by <span className="text-primary">{book.author}</span>
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm">
                  <Star className="h-4 w-4 text-muted-foreground" />
                  {totalRatings > 0 ? (
                    <>
                      <Rating
                        size="sm"
                        canModified={false}
                        value={averageRating}
                        bookId={book.id}
                      />
                      <span className="font-medium">
                        {averageRating.toFixed(1)}
                      </span>
                    </>
                  ) : (
                    <span className="text-muted-foreground">No ratings yet</span>
                  )}
                </div>

                <div className="flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm text-muted-foreground">
                  <MessageSquare className="h-4 w-4" />
                  <span>
                    {ratingsNumber} ratings
                    {reviewsNumber > 0 ? ` · ${reviewsNumber} reviews` : ""}
                  </span>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {book.genre && (
                  <div className="rounded-2xl bg-foreground p-4">
                    <Layers className="mb-2 h-4 w-4 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Genre</p>
                    <p className="mt-1 text-sm font-medium">{book.genre}</p>
                  </div>
                )}
                {book.pageCount && (
                  <div className="rounded-2xl bg-foreground p-4">
                    <BookOpen className="mb-2 h-4 w-4 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Length</p>
                    <p className="mt-1 text-sm font-medium">
                      {book.pageCount} pages
                    </p>
                  </div>
                )}
                {publishedYear && (
                  <div className="rounded-2xl bg-foreground p-4">
                    
                    
                    <Calendar className="mb-2 h-4 w-4 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Published</p>
                    <p className="mt-1 text-sm font-medium">{publishedYear}</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <h2 className="text-lg font-semibold">About this book</h2>
                <p className="max-w-3xl text-sm leading-7 text-primary/85">
                  {book.description ||
                    "No description has been added for this book yet."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {isTracked && status === "READING" ? (
          <BookProgressBox
            currentPage={currentPage || 0}
            pageCount={book.pageCount || 0}
            bookId={book.id}
            userId={session.user.id}
          />
        ) : (
          <aside className="flex h-fit flex-col gap-3 rounded-3xl bg-background p-5">
            <h2 className="font-semibold">Reading status</h2>
            <p className="text-sm leading-6 text-muted-foreground">
              {isTracked
                ? "Move this book to Currently Reading to start tracking page progress."
                : "Add this book to your library to track status, ratings, and progress."}
            </p>
          </aside>
        )}
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="flex max-w-3xl flex-col gap-5">
          {!myReview ? (
            <ReviewEditor bookId={book.id} />
          ) : (
            <div className="flex flex-col gap-3">
              <h2 className="text-lg font-semibold">
                {myReview.content ? "Your review" : "Your rating"}
              </h2>

              <ReviewCard
                key={myReview.id}
                name={myReview.user.name ?? "You"}
                rating={myReview.rating ?? 0}
                comment={myReview.content}
                avatar={myReview.user.image || undefined}
                date={new Date(myReview.createdAt).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  },
                )}
                reviewBookId={book.id}
              />

              {!myReview.content && <ReviewEditor bookId={book.id} />}
            </div>
          )}

          <div className="flex items-center gap-2 pt-2">
            <h2 className="text-lg font-semibold">Community reviews</h2>
            {communityReviews.length !== 0 && (
              <span className="rounded-full bg-background px-3 py-1 text-xs text-muted-foreground">
                {communityReviews.length}
              </span>
            )}
          </div>

          {communityReviews.length === 0 ? (
            <div className="rounded-3xl bg-background p-6 text-sm text-muted-foreground">
              No community reviews yet.
            </div>
          ) : (
            communityReviews.map((review) => (
              <ReviewCard
                key={review.id}
                name={review.user.name ?? "Reader"}
                rating={review.rating ?? 0}
                comment={review.content}
                date={new Date(review.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
                avatar={review.user.image || undefined}
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
}
