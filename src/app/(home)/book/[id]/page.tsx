import ButtonToWork from "@/components/button-to-work";
import ReviewCard from "@/components/reviewCard";
import Rating from "@/components/ui/rating";
import { getBookById } from "@/lib/actions/book.actions";
import { Bookmark, BookmarkCheck, BookOpenCheck } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function theDetailedBookPage({ params }: PageProps) {
  const { id } = await params;

  const book = await getBookById(id);
  if (!book) notFound();

  const imgSource = book.coverUrl || "/2.jpg";
  return (
    <>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col lg:flex-row w-full gap-4 h-fit">
          <div
            className=" w-full lg:w-fit h-full lg:h-auto flex flex-col items-center 
        justify-start  gap-2"
          >
            <div className="flex flex-col w-40 gap-4 transition-colors ">
              <div className="w-40 h-60 rounded-2xl relative flex justify-center items-center ">
                <Image
                  src={imgSource}
                  alt="Book Cover"
                  fill
                  className="rounded-3xl object-cover shadow-lg" // object-cover to cover entire or object-contain to respect ratio
                />
              </div>

              <div className="flex flex-col gap-2">
                <ButtonToWork/>
              </div>
            </div>
          </div>

          <div className=" w-full lg:flex-[2]  gap-4 h-full lg:h-auto flex flex-col ">
            <div className="flex flex-col gap-2">
              <p className="text-2xl">{book.title}</p>
              <p>{book.author}</p>
              <p className="text-sm text-pretty">{book.description}</p>
            </div>
            <div className="flex justify-start items-center mt-8 gap-4 flex-wrap">
              <Rating rating={4} />
              <p>4.0</p>
              <p className="text-sm opacity-80">12,454 Reviews</p>
            </div>
          </div>

          <div
            className=" w-full min-w-2xs lg:flex-1 lg:max-w-xs h-full 
        lg:h-auto flex"
          >
            <div className="flex flex-col w-full gap-4">
              <p>Progress</p>

              <div className="flex bg-secondary rounded-full p-1 w-full h-8">
                <div className="w-1/4 h-full text-sm p-2 bg-progress rounded-full flex justify-end items-center relative">
                  <p className="absolute">37%</p>
                </div>
              </div>

              <div className="flex bg-secondary text-sm rounded-2xl gap-4 flex-col p-4 w-full h-fit">
                <div className="flex justify-between items-center ">
                  <p>Total Pages</p>
                  <p>2549</p>
                </div>

                <div className="flex justify-between items-center ">
                  <p>Pages Left</p>
                  <p>451</p>
                </div>
              </div>

              <div className="flex bg-secondary text-sm rounded-2xl gap-4 flex-col p-4 w-full h-fit">
                <div className="flex justify-between items-center ">
                  <p>Total Pages</p>
                  <p>2549</p>
                </div>

                <div className="flex justify-between items-center ">
                  <p>Pages Left</p>
                  <p>451</p>
                </div>
              </div>
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
