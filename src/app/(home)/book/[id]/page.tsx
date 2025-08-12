import ReviewCard from "@/components/Book/reviewCard";
import Rating from "@/components/ui/rating";
import {
  getAllReviewsByBookId,
  getAverageRatingAForAllUser,
  getBookById,
  getCurrentSessionReview,
  getUserBookTrackingRating,
  getUserBookTrackingStatus,
} from "@/lib/actions/book.actions";
import Image from "next/image";
import { notFound } from "next/navigation";

import { auth } from "auth";
import { Metadata } from "next";
import { ActionButton } from "@/components/ui/actionButton";
import { BookProgressBox } from "./BookProgressBox";
import { BookLibraryBox } from "./BookLibraryBox";
import { Textarea } from "@/components/ui/textarea";
interface PageProps {
  params: Promise<{ id: string }>;
}
type metaProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata({
  params,
}: metaProps): Promise<Metadata> {
  const book = await getBookById(params.id);
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

  const imgSource = book.coverUrl || "/2.jpg";

  const session = await auth();

  if (!session || !session.user?.id) {
    return;
  }

  const { isTracked, status, currentPage } = await getUserBookTrackingStatus(
    session?.user?.id,
    book.id
  );

  const rate = await getUserBookTrackingRating(session.user.id, book.id);

  const { averageRating, totalRatings } = await getAverageRatingAForAllUser(
    book.id
  );
  const reviews = await getAllReviewsByBookId(book.id);
  const myReview = await getCurrentSessionReview(session.user.id, book.id);
  const communityReviews = reviews.filter(
    (review) => review.userId !== session?.user?.id
  );

  return (
    <>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col lg:flex-row w-full gap-4 h-fit">
          <div
            className=" w-full lg:w-fit h-full lg:h-auto flex flex-col items-center 
        justify-start  gap-2"
          >
            <div className="flex flex-col w-40 justify-center items-center  gap-4 transition-colors  ">
              <div className="w-40 h-60 rounded-2xl border border-border relative flex justify-center items-center  ">
                <Image
                  src={imgSource}
                  alt="Book Cover"
                  fill
                  className="rounded-2xl object-cover shadow-lg" // object-cover to cover entire or object-contain to respect ratio
                />
              </div>

              <div className="flex justify-center items-center flex-col gap-4 flex-wrap">
                <div className="flex flex-col text-sm gap-4 justify-center items-center">
                  <Rating
                    bookId={book.id}
                    canModified={true}
                    value={rate?.rating ?? 0}
                  />{" "}
                  {rate?.rating ? <p>Rated</p> : <p>Rate this book</p>}{" "}
                </div>
              </div>

              <div className="flex w-full flex-col gap-2">
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
            </div>
          </div>

          <div className=" w-full lg:flex-[2] gap-4 h-full lg:h-auto flex flex-col ">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2 ">
                <span className="text-3xl font-medium">{book.title}</span>
                <span className="text-lg">{book.author}</span>
              </div>

              {totalRatings > 0 && (
                <div className="flex items-center gap-2  w-fit">
                  <p className="text-yellow-600 font-medium">{averageRating}</p>
                  <Rating
                    size="sm"
                    canModified={false}
                    value={averageRating}
                    bookId={book.id}
                  />
                  <p>&bull;</p>
                  <p className="text-sm">{totalRatings} Ratings</p>
                </div>
              )}

              <p className="text-sm text-pretty">{book.description}</p>
              <div className="text-sm text-pretty flex items-center gap-2">
                <div className="flex justify-center items-center rounded-full px-3 p-2 bg-background">
                  <p>{book.genre}</p>
                </div>
              </div>
            </div>
          </div>

          {isTracked && status === "READING" && (
            <div className="w-full min-w-2xs  lg:flex-1 lg:max-w-xs h-full lg:h-auto flex">
              <BookProgressBox
                currentPage={currentPage || 0}
                pageCount={book.pageCount || 0}
                bookId={book.id}
                userId={session.user.id}
              />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4 max-w-2xl">
          {!myReview ? (
            <>
              <div className="flex flex-col gap-3">
                <span>Write your review</span>
                <Textarea className="min-h-24 bg-background rounded-2xl" />
                <ActionButton className="w-fit" label="Submit" />
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-3">
                <span>{`Your ${
                  myReview.rating && myReview.content ? "Review" : "Rating"
                }`}</span>

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
                    }
                  )}
                />
                {!myReview.content && (
                  <div className="flex flex-col gap-3">
                    <p>Write your review</p>
                    <Textarea className="min-h-24 bg-background rounded-2xl" />
                    <ActionButton className="w-fit" label="Submit" />
                  </div>
                )}
              </div>
            </>
          )}

          <div className="font-medium flex items-center gap-2">
            <span>Community Reviews</span>

            {communityReviews.length !== 0 && (
              <>
                <span className=" text-muted-foreground">&bull;</span>
                <span>{communityReviews.length}</span>
              </>
            )}
          </div>

          {communityReviews.length === 0 ? (
            <span>No reviews yet.</span>
          ) : (
            communityReviews.map((review) => (
              <ReviewCard
                key={review.id}
                name={review.user.name ?? "g"}
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
      </div>
    </>
  );
}
