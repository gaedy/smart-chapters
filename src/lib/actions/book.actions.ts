"use server";

import { PrismaClient } from "@/generated/prisma";
import { convertToPlainObject } from "../utils";

export async function getBooks() {
  const prisma = new PrismaClient();
  const books = await prisma.book.findMany({
    select: {
      id: true,
      title: true,
      author: true,
      coverUrl: true,
      isFeatured: true,
    },
    orderBy: { createdAt: "asc" },
  });

  return convertToPlainObject(books);
}
