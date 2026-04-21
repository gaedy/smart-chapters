"use server";

import { auth } from "auth";
import { prisma } from "../prisma";

export async function addReview(bookId: string, content: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  const bookExists = await prisma.book.findUnique({
    where: { id: bookId },
    select: { id: true },
  });
  if (!bookExists) throw new Error("Book not found");

  return await prisma.review.upsert({
    where: { userId_bookId: { userId: session.user.id, bookId } },
    update: { content },
    create: { userId: session.user.id, bookId, content },
  });
}

export async function deleteReview(bookId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  await prisma.review.delete({
    where: { userId_bookId: { userId: session.user.id, bookId } },
  });

  await prisma.bookTracking.updateMany({
    where: { userId: session.user.id, bookId },
    data: { rating: 0 },
  });

  return { success: true };
}
