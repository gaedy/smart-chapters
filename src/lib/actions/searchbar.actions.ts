"use server";

import { prisma } from "../prisma";

export async function searchBarBooks(query: string, limit = 5) {
  if (!query) return [];

  const books = await prisma.book.findMany({
    where: {
      OR: [
        { title: { contains: query, mode: "insensitive" } },
        { author: { contains: query, mode: "insensitive" } },
      ],
    },
    take: 20, 
    select: {
      id: true,
      title: true,
      author: true,
      coverUrl: true,
    },
  });

  const q = query.toLowerCase();

  const scored = books.map((b) => {
    let score = 0;
    if (b.title.toLowerCase().startsWith(q)) score += 3;
    if (b.title.toLowerCase().includes(q)) score += 2;
    if (b.author.toLowerCase().includes(q)) score += 1;
    return { ...b, score };
  });

  return scored.sort((a, b) => b.score - a.score).slice(0, limit);
}
