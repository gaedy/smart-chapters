import { Goal } from "lucide-react";
import { Progress } from "./ui/progress";

export default function GoalTracker() {
  return (
    <div className="flex flex-col h-fit gap-5 shadow-md text-primary-foreground bg-fuchsia-800 rounded-3xl justify-between p-4 w-full md:w-md ">
      <div className="h-1/2 w-full justify-between gap-2 flex flex-col">
        <div className="flex items-center gap-3 h-full  ">
          <div className="h-14 w-14 bg-green-600 rounded-full flex items-center justify-center">
            <Goal />
          </div>
          <p className="font-bold text-xl">Reading Goal 2025</p>
        </div>
        <p className="text-sm text-fuchsia-300">Your’re on track! Keep going</p>
      </div>

      <div className="h-1/2 flex gap-2 flex-col justify-between w-full">
        <div className="flex justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-xl font-bold">24</p>
            <p className="text-xs text-fuchsia-300">of 50 books</p>
          </div>

          <div className="flex flex-col gap-1 items-end">
            <p className="text-xl font-bold">48%</p>
            <p className="text-xs text-fuchsia-300">Completed</p>
          </div>
        </div>

        <Progress className="bg-fuchsia-950" value={48} />
      </div>
    </div>
  );
}
