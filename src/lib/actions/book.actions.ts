"use server";
import { BookType } from "@/types";
import { prisma } from "../prisma";
import { auth } from "../../../auth";
import { TrackingStatus } from "@prisma/client";
import { updateCurrentPageSchema } from "../validators";

// ─── Auth helper ──────────────────────────────────────────────────────────────

async function getAuthenticatedUser() {
  const session = await auth();
  if (!session?.user?.email) return null;

  return await prisma.user.findUnique({
    where: { email: session.user.email },
  });
}

// ─── Library ──────────────────────────────────────────────────────────────────

export async function addBookToLib(book: BookType, status: TrackingStatus) {
  const user = await getAuthenticatedUser();
  if (!user) return { success: false, message: "Unauthorized" };

  let dbBook = await prisma.book.findFirst({
    where: { title: book.title, author: book.author },
  });

  if (!dbBook) {
    dbBook = await prisma.book.create({
      data: {
        title: book.title,
        author: book.author,
        coverUrl: book.coverUrl ?? null,
        description: book.description ?? null,
        pageCount: book.pageCount ?? null,
        publishedAt: book.publishedAt ?? null,
        genre: book.genre ?? null,
        isFeatured: book.isFeatured ?? null,
      },
    });
  }

  await prisma.bookTracking.upsert({
    where: { userId_bookId: { userId: user.id, bookId: dbBook.id } },
    update: {
      status,
      finishedAt: status === "FINISHED" ? new Date() : null,
      startedAt: status === "READING" ? new Date() : null,
    },
    create: {
      userId: user.id,
      bookId: dbBook.id,
      status,
      finishedAt: status === "FINISHED" ? new Date() : null,
      startedAt: status === "READING" ? new Date() : null,
    },
  });

  return { success: true };
}

export async function removeBookFromLib(bookId: string) {
  const user = await getAuthenticatedUser();
  if (!user) return { success: false, message: "Unauthorized" };

  await prisma.bookTracking.deleteMany({
    where: { userId: user.id, bookId },
  });

  await prisma.review.deleteMany({
    where: { userId: user.id, bookId },
  });

  return { success: true, message: "Book and rating removed" };
}

// ─── Ratings ──────────────────────────────────────────────────────────────────

export async function updateUserBookTrackingRating(
  userId: string,
  bookId: string,
  rating: number,
) {
  const tracking = await prisma.bookTracking.upsert({
    where: { userId_bookId: { userId, bookId } },
    update: { rating },
    create: { userId, bookId, rating, status: "WANT_TO_READ", currentPage: 0 },
  });

  await prisma.review.upsert({
    where: { userId_bookId: { userId, bookId } },
    update: { rating },
    create: { userId, bookId, rating, content: "" },
  });

  return tracking;
}

// ─── Progress ─────────────────────────────────────────────────────────────────

export async function updateCurrentPage(data: {
  userId: string;
  bookId: string;
  currentPage: number;
}) {
  const parsed = updateCurrentPageSchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Invalid input", details: parsed.error.flatten() };
  }

  const { userId, bookId, currentPage } = parsed.data;

  try {
    const updatedTracking = await prisma.bookTracking.update({
      where: { userId_bookId: { userId, bookId } },
      data: { currentPage },
    });

    return { success: true, data: updatedTracking };
  } catch (error) {
    return { error: "Failed to update current page", details: error };
  }
}
