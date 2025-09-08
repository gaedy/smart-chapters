import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Flame, Calendar, ArrowRight, Trophy } from "lucide-react";
import Link from "next/link";

interface UserReadingStatsProps {
  bookFinished: number;

  pagesThisMonth: number;
  currentlyReading: number;
  wantToRead: number;
}

export function BookStats({
  bookFinished = 24,

  pagesThisMonth = 450,
  wantToRead = 12,
  currentlyReading = 25,
}: UserReadingStatsProps) {
  return (


    
    <Card className="p-6 border-none h-fit min-w-md shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between gap-3 flex-wrap ">
        <div>
          <div className="flex items-center gap-3">
            <h2 className=" font-bold">Reading Progress</h2>
          </div>
        </div>

        <Link href="/stats">
          <Button
            variant="secondary"
            size="sm"
            className="border-primary/30 text-muted-foreground hover:text-primary cursor-pointer hover:bg-primary/10 bg-transparent"
          >
            View Details
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 ">
        <div className="p-4 rounded-lg border border-border/50 text-center hover:bg-card/80 transition-colors">
          <div className="flex items-center justify-center mb-2">
            <Trophy className="w-5 h-5 text-chart-4" />
          </div>
          <div className="text-2xl font-bold">{bookFinished}</div>
          <p className="text-xs text-muted-foreground font-medium">
            Books Finished
          </p>
        </div>

        <div className="bg-card/50 p-4 rounded-lg border border-border/50 text-center hover:bg-card/80 transition-colors">
          <div className="flex items-center justify-center mb-2">
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <div className="text-2xl font-bold">{currentlyReading}</div>
          <p className="text-xs text-muted-foreground font-medium">
            Reading Now
          </p>
        </div>

        <div className="bg-card/50 p-4 rounded-lg border border-border/50 text-center hover:bg-card/80 transition-colors">
          <div className="flex items-center justify-center mb-2">
            <Flame className="w-5 h-5 text-destructive" />
          </div>
          <div className="text-2xl font-bold">{wantToRead}</div>
          <p className="text-xs text-muted-foreground font-medium">
            Want to read
          </p>
        </div>

        <div className="bg-card/50 p-4 rounded-lg border border-border/50 text-center hover:bg-card/80 transition-colors">
          <div className="flex items-center justify-center mb-2">
            <Calendar className="w-5 h-5 text-primary" />
          </div>
          <div className="text-2xl font-bold">{pagesThisMonth}</div>
          <p className="text-xs text-muted-foreground font-medium">
            Pages/Month
          </p>
        </div>
      </div>
    </Card>
  );
}
