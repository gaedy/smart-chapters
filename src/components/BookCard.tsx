"use client";

import fg from "/public/h.jpg";
import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Bookmark, BookOpen } from "lucide-react";

interface BookCardProps {
  title: string;
  author: string;
  coverUrl?: string | null; // Optional coverUrl to allow for static images
}

export default function BookCard({ title, author, coverUrl }: BookCardProps) {
  const imageSrc = coverUrl || fg; // fallback

  return (
    <div className="flex flex-col w-fit gap-2  rounded-3xl group cursor-pointer">
      <div
        className="flex w-40 shadow-lg transition-transform duration-300
        relative h-60 rounded-3xl overflow-hidden group-hover:scale-105"
      >
        <Image
          src={imageSrc}
          alt="Book Cover"
          fill
          className="rounded-3xl object-cover" // object-cover to cover entire or object-contain to respect ratio
        />
        <div className="p-2">
          <div
            className="absolute p-2 px-2.5 text-xs rounded-full backdrop-blur-xs bg-green-500/20 
          backdrop-brightness-40 text-amber-50"
          >
            Want to Read
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <div className="w-40 text-sm group-hover:underline">{title}</div>
        <div className="w-40 text-xs group-hover:underline">{author}</div>
      </div>
    </div>
  );
}
