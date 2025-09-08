"use server";

import { auth } from "auth";
import { prisma } from "../prisma";
import { convertToPlainObject } from "../utils";

export async function getReviews() {
  const reviews = await prisma.review.findMany({
    select: {
      id: true,
      rating: true,
      content: true,
      createdAt: true,
    },
    orderBy: { createdAt: "asc" },
  });

  return convertToPlainObject(reviews);
}

export async function deleteReview(bookId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Not authenticated");
  }

  await prisma.review.delete({
    where: {
      userId_bookId: {
        userId: session.user.id,
        bookId,
      },
    },
  });

  await prisma.bookTracking.updateMany({
    where: {
      userId: session.user.id,
      bookId,
    },
    data: {
      rating: 0,
    },
  });

  return { success: true };
}

export async function addReview(bookId: string, content: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Not authenticated");
  }
  const userId = session.user.id;

  // optional: ensure book exists
  const bookExists = await prisma.book.findUnique({
    where: { id: bookId },
    select: { id: true },
  });
  if (!bookExists) {
    throw new Error("Book not found");
  }

  const review = await prisma.review.upsert({
    where: {
      // compound unique from your schema @@unique([userId, bookId])
      userId_bookId: {
        userId,
        bookId,
      },
    },
    update: {
      content,
      // Prisma will auto-update `updatedAt` because of @updatedAt, so this is optional
    },
    create: {
      userId,
      bookId,
      content,
    },
  });

  return review;
}

export async function getCurrentSessionReview(userId: string, bookId: string) {
  return await prisma.review.findUnique({
    where: {
      userId_bookId: {
        userId,
        bookId,
      },
    },
    include: {
      user: true, // in case you want name/avatar
    },
  });
}

export async function getAllReviewsByBookId(bookId: string) {
  const reviews = await prisma.review.findMany({
    where: { bookId },
    orderBy: { createdAt: "desc" }, // latest first
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

  return reviews;
}
