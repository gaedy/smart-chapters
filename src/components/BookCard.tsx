"use client";

import fg from "/public/h.jpg";
import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Bookmark, BookOpen } from "lucide-react";

// interface BookCardProps {
//   title: string;
//   author: string;
//   coverUrl: string ; // Optional coverUrl to allow for static images
// }

export default function BookCard() {
  return (
    <div className="flex flex-col w-fit gap-2  rounded-3xl group cursor-pointer">
      <div
        className="flex w-40 shadow-lg transition-transform duration-300
        relative h-60 rounded-3xl overflow-hidden group-hover:scale-105"
      >
        <Image
          src={fg}
          alt="Book Cover"
          fill
          className="rounded-3xl object-contain"
        />
        <div className="p-2">
          <div
            className="
absolute  
p-2 px-2.5 
    text-xs 
    rounded-full 
    backdrop-blur-xs
    bg-green-500/20
    backdrop-brightness-90
    
  "
          >
            Want to Read
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <div className="w-40 text-sm group-hover:underline">
          On the Edge: The Art of Risking Everything
        </div>
        <div className="w-40 text-xs group-hover:underline">Nate Silver</div>
      </div>
    </div>
  );
}
