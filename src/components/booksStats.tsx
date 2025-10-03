import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Flame,
  ArrowRight,
  BookMarked,
  CircleCheckBig,
} from "lucide-react";
import Link from "next/link";

interface UserReadingStatsProps {
  bookFinished: number;

  pagesThisMonth: number;
  currentlyReading: number;
  wantToRead: number;
  isLink?: boolean;
}

export function BookStats({
  bookFinished = 24,

  pagesThisMonth = 450,
  wantToRead = 12,
  currentlyReading = 25,
  isLink = true,
}: UserReadingStatsProps) {
  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex items-center justify-between gap-3 flex-wrap ">
        <div>
          <div className="flex items-center gap-3">
            <h2 className=" text-xl">Reading Progress</h2>
          </div>
        </div>

        {!isLink && (
          <Link href="/stats">
            <Button
              variant="ghost"
              size="sm"
              className="border-primary/30 text-muted-foreground hover:text-primary cursor-pointer hover:bg-primary/10 bg-transparent"
            >
              View Details
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        )}
      </div>

      <div className="flex gap-2 items-center justify-center lg:justify-start flex-wrap">
        <div className="flex bg-background rounded-4xl w-52 p-4 h-48 gap-2 flex-col ">
          <div className=" h-1/2 flex items-center">
            <div className="w-16 h-16 shadow-lg rounded-3xl flex justify-center items-center bg-blue-500">
              <Flame className="text-primary-foreground" />
            </div>
          </div>
          <div className=" h-1/4 flex items-center">
            <p className="text-2xl font-bold">{bookFinished}</p>
          </div>
          <div className=" h-1/4 text-muted-foreground flex items-center">
            <p>Book Finished</p>
          </div>
        </div>

        <div className="flex bg-background rounded-4xl w-52 p-4 h-48 gap-2 flex-col ">
          <div className=" h-1/2 flex items-center">
            <div className="w-16 h-16 shadow-lg rounded-3xl flex justify-center items-center bg-green-600">
              <BookOpen className="text-primary-foreground" />
            </div>
          </div>
          <div className=" h-1/4 flex items-center">
            <p className="text-2xl font-bold">{currentlyReading}</p>
          </div>
          <div className=" h-1/4 text-muted-foreground flex items-center">
            <p>Reading Now</p>
          </div>
        </div>

        <div className="flex bg-background rounded-4xl w-52 p-4 h-48 gap-2 flex-col ">
          <div className=" h-1/2 flex items-center">
            <div className="w-16 h-16 shadow-lg rounded-3xl flex justify-center items-center bg-purple-600">
              <BookMarked className="text-primary-foreground" />
            </div>
          </div>
          <div className=" h-1/4 flex items-center">
            <p className="text-2xl font-bold">{wantToRead}</p>
          </div>
          <div className=" h-1/4 text-muted-foreground flex items-center">
            <p>Want to read</p>
          </div>
        </div>

        <div className="flex bg-background rounded-4xl w-52 p-4 h-48 gap-2 flex-col ">
          <div className=" h-1/2 flex items-center">
            <div className="w-16 h-16 shadow-lg rounded-3xl flex justify-center items-center bg-orange-400">
              <CircleCheckBig className="text-primary-foreground" />
            </div>
          </div>
          <div className=" h-1/4 flex items-center">
            <p className="text-2xl font-bold">{pagesThisMonth}</p>
          </div>
          <div className=" h-1/4 text-muted-foreground flex items-center">
            <p>Pages Read</p>
          </div>
        </div>
      </div>
    </div>
  );
}
