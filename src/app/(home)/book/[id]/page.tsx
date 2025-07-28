import AddToLibrary from "@/components/Book/add-to-library";
import RemoveFromLibrary from "@/components/Book/removeFromLibrary";
import ReviewCard from "@/components/Book/reviewCard";
import Rating from "@/components/ui/rating";
import {
  getBookById,
  getUserBookTrackingRating,
  getUserBookTrackingStatus,
} from "@/lib/actions/book.actions";
import Image from "next/image";
import { notFound } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Check, Plus } from "lucide-react";
import { auth } from "auth";
import { Metadata } from "next";
import { Progress } from "@/components/ui/progress";

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

  return (
    <>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col lg:flex-row w-full gap-4 h-fit">
          <div
            className=" w-full lg:w-fit h-full lg:h-auto flex flex-col items-center 
        justify-start  gap-2"
          >
            <div className="flex flex-col w-44 justify-center items-center  gap-4 transition-colors  ">
              <div className="w-40 h-60 rounded-2xl relative flex justify-center items-center ">
                <Image
                  src={imgSource}
                  alt="Book Cover"
                  fill
                  className="rounded-2xl object-cover shadow-lg" // object-cover to cover entire or object-contain to respect ratio
                />
              </div>

              <div className="flex justify-center items-center flex-col gap-4 flex-wrap">
                <Rating
                  bookId={book.id}
                  canModified={true}
                  value={rate?.rating ?? 0}
                />

                {/* <p>4</p>
                <p className="text-sm opacity-80">12,454 Reviews</p> */}
              </div>

              <div className="flex w-full flex-col gap-2">
                {/* <ButtonToWork /> */}

                {/* <div className="flex gap-2">
                  <AddToLibrary
                    iconName="wantToRead"
                    item={{
                      title: book.title,
                      author: book.author,
                    }}
                    status="WANT_TO_READ"
                    label="Want to Read"
                  ></AddToLibrary>
                </div> */}

                <Dialog>
                  <DialogTrigger
                    className={`flex justify-center gap-1 items-center bg-background p-2.5 text-[13px] 
                  rounded-full cursor-pointer active:scale-100 hover:scale-105 hover:shadow-lg 
                  transition-all duration-200 ${
                    isTracked && "bg-library-color-1 text-accent-foreground"
                  }`}
                  >
                    {isTracked ? (
                      <>
                        <Check className="w-5" />

                        <p>Added to Library</p>
                      </>
                    ) : (
                      <>
                        <Plus className="w-5" />

                        <p>Add to Library</p>
                      </>
                    )}
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader className="flex gap-4 font-libre">
                      <DialogTitle>Choose a List for this book</DialogTitle>
                      <DialogDescription className="flex flex-col self-center gap-2 min-w-1/2 max-w-72">
                        <AddToLibrary
                          iconName={`${
                            status === "WANT_TO_READ" ? "check" : "wantToRead"
                          }`}
                          item={{
                            title: book.title,
                            author: book.author,
                          }}
                          status="WANT_TO_READ"
                          label="Want to Read"
                          className={`${
                            status === "WANT_TO_READ" &&
                            "bg-library-color-1  text-primary pointer-events-none"
                          }`}
                        ></AddToLibrary>

                        <AddToLibrary
                          iconName={`${
                            status === "READING" ? "check" : "reading"
                          }`}
                          item={{
                            title: book.title,
                            author: book.author,
                          }}
                          status="READING"
                          label={
                            status === "READING"
                              ? "Currently Reading"
                              : "Currently Reading"
                          }
                          className={`${
                            status === "READING" &&
                            "bg-library-color-1 text-primary pointer-events-none"
                          } `}
                        ></AddToLibrary>

                        <AddToLibrary
                          iconName={`${
                            status === "FINISHED" ? "check" : "finished"
                          }`}
                          item={{
                            title: book.title,
                            author: book.author,
                          }}
                          status="FINISHED"
                          label="Finished"
                          className={`${
                            status === "FINISHED" &&
                            "bg-library-color-1 text-primary pointer-events-none"
                          }`}
                        ></AddToLibrary>

                        {isTracked && (
                          <RemoveFromLibrary
                            iconName="remove"
                            bookId={book.id}
                            label="Remove from Library"
                          />
                        )}
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>

          <div className=" w-full lg:flex-[2]  gap-4 h-full lg:h-auto flex flex-col ">
            <div className="flex flex-col gap-2">
              <p className="text-2xl">{book.title}</p>
              <p>{book.author}</p>
              <p className="text-sm text-pretty">{book.description}</p>
            </div>
          </div>

          <div
            className=" w-full min-w-2xs  lg:flex-1 lg:max-w-xs h-full 
        lg:h-auto flex"
          >
            <div className="flex flex-col w-full gap-4">
              <p>Progress</p>

              <Progress
                value={
                  currentPage != null && book?.pageCount
                    ? Math.min(
                        100,
                        Math.round((currentPage / book.pageCount) * 100)
                      )
                    : 0
                }
              ></Progress>

              {isTracked && (
                <div className="flex bg-background text-sm rounded-2xl gap-4 flex-col p-4 w-full h-fit">
                  <div className="flex justify-between items-center ">
                    <p>Current Page</p>
                    <p>
                      {currentPage}/{book.pageCount}
                    </p>
                  </div>

                  {/* <div className="flex justify-between items-center ">
                  <p>Pages Left</p>
                  <p>451</p>
                </div> */}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-medium">Reviews</p>

          <ReviewCard
            name="Rita Arens"
            date="August 29, 2016"
            rating={5}
            comment="One of the best books, read over the last few years. In my
                  opinion, the title does NOT do it justice. While this is
                  applicable to negotiating, and the title DOES highlight a
                  critical component, this book is valuable to MANY types of
                  negotiating, even situations that we may not consider to be
                  negotiating."
          />
        </div>
      </div>
    </>
  );
}
