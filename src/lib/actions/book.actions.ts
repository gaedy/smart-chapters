"use server";
import { BookType } from "@/types";
import { prisma } from "../prisma";
import { convertToPlainObject } from "../utils";
import { auth } from "../../../auth";
import { TrackingStatus } from "@prisma/client";

export async function getBooks() {
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

export async function getBookById(id: string) {
  return await prisma.book.findFirst({
    where: { id: id },
  });
}

export async function getReviews() {
  // const prisma = new PrismaClient();

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

export async function getWantToReadBooks(userId: string) {
  const books = await prisma.book.findMany({
    where: {
      bookTrackings: {
        some: {
          userId: userId,
          status: "WANT_TO_READ",
        },
      },
    },
    select: {
      id: true,
      title: true,
      author: true,
      coverUrl: true,
      isFeatured: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return convertToPlainObject(books);
}

export async function getReadingBooks(userId: string) {
  const books = await prisma.book.findMany({
    where: {
      bookTrackings: {
        some: {
          userId: userId,
          status: "READING",
        },
      },
    },
    select: {
      id: true,
      title: true,
      author: true,
      coverUrl: true,
      isFeatured: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return convertToPlainObject(books);
}

export async function getFinishedBooks(userId: string) {
  const books = await prisma.book.findMany({
    where: {
      bookTrackings: {
        some: {
          userId: userId,
          status: "FINISHED",
        },
      },
    },
    select: {
      id: true,
      title: true,
      author: true,
      coverUrl: true,
      isFeatured: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return convertToPlainObject(books);
}

export async function getAllTrackedBooks(userId: string) {
  const books = await prisma.book.findMany({
    where: {
      bookTrackings: {
        some: {
          userId: userId,
        },
      },
    },
    select: {
      id: true,
      title: true,
      author: true,
      coverUrl: true,
      bookTrackings: {
        where: { userId },
        select: { status: true },
      },
    },
  });

  return convertToPlainObject(books);
}

export async function addBookToLib(book: BookType, status: TrackingStatus) {
  const session = await auth();
  if (!session?.user?.email) {
    return { success: false, message: "Unauthorized" };
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return { success: false, message: "User not found" };
  }

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
    where: {
      userId_bookId: {
        userId: user.id,
        bookId: dbBook.id,
      },
    },
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
  const session = await auth();

  if (!session || !session.user?.email) {
    return { success: false, message: "Not authenticated" };
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return { success: false, message: "User not found" };
  }

  await prisma.bookTracking.deleteMany({
    where: {
      userId: user.id,
      bookId: bookId,
    },
  });

  return { success: true, message: "Book removed from library" };
}
