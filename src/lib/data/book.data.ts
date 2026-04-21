import { prisma } from "../prisma";
import { convertToPlainObject } from "../utils";
import { TrackingStatus } from "@prisma/client";

// ─── Shared book select fields ────────────────────────────────────────────────

const bookSelectFields = {
  id: true,
  title: true,
  author: true,
  coverUrl: true,
  isFeatured: true,
} as const;

// ─── Helper: fetch books by tracking status ───────────────────────────────────

async function getBooksByTrackingStatus(
  userId: string,
  status: TrackingStatus,
) {
  const books = await prisma.book.findMany({
    where: {
      bookTrackings: {
        some: { userId, status },
      },
    },
    select: bookSelectFields,
    orderBy: { createdAt: "asc" },
  });

  return convertToPlainObject(books);
}

// ─── Books ────────────────────────────────────────────────────────────────────

export async function getBooks() {
  const books = await prisma.book.findMany({
    select: bookSelectFields,
    orderBy: { createdAt: "asc" },
  });

  return convertToPlainObject(books);
}

export async function getBookById(id: string) {
  return await prisma.book.findFirst({ where: { id } });
}

export async function getBooksByTitle(title: string) {
  return await prisma.book.findMany({
    where: { title: { contains: title, mode: "insensitive" } },
  });
}

export async function getBooksByGenre(genre: string) {
  return await prisma.book.findMany({ where: { genre } });
}

export async function getGenres() {
  return await prisma.book.findMany({
    where: { genre: { not: null } },
    distinct: ["genre"],
    select: { genre: true },
  });
}

// ─── Tracked Books ────────────────────────────────────────────────────────────

export const getWantToReadBooks = (userId: string) =>
  getBooksByTrackingStatus(userId, "WANT_TO_READ");

export const getReadingBooks = (userId: string) =>
  getBooksByTrackingStatus(userId, "READING");

export const getFinishedBooks = (userId: string) =>
  getBooksByTrackingStatus(userId, "FINISHED");

export async function getAllTrackedBooks(userId: string) {
  const books = await prisma.book.findMany({
    where: {
      bookTrackings: { some: { userId } },
    },
    select: {
      ...bookSelectFields,
      bookTrackings: {
        where: { userId },
        select: { status: true },
      },
    },
  });

  return convertToPlainObject(books);
}

export async function getUserBookCounts(userId: string) {
  const counts = await prisma.bookTracking.groupBy({
    by: ["status"],
    where: { userId },
    _count: { status: true },
  });

  const getCount = (status: TrackingStatus) =>
    counts.find((c) => c.status === status)?._count.status ?? 0;

  return {
    READING: getCount("READING"),
    WANT_TO_READ: getCount("WANT_TO_READ"),
    FINISHED: getCount("FINISHED"),
    TOTAL: counts.reduce((acc, c) => acc + c._count.status, 0),
  };
}

// ─── Book Tracking ────────────────────────────────────────────────────────────

export async function getUserBookTrackingStatus(
  userId: string,
  bookId: string,
) {
  const tracking = await prisma.bookTracking.findUnique({
    where: { userId_bookId: { userId, bookId } },
    select: {
      status: true,
      currentPage: true,
      startedAt: true,
      finishedAt: true,
      updatedAt: true,
    },
  });

  if (!tracking) {
    return {
      isTracked: false,
      status: null,
      currentPage: null,
      startedAt: null,
      finishedAt: null,
      updatedAt: null,
    };
  }

  return { isTracked: true, ...tracking };
}

export async function getUserBookTrackingRating(
  userId: string,
  bookId: string,
) {
  return await prisma.bookTracking.findUnique({
    where: { userId_bookId: { userId, bookId } },
    select: { rating: true },
  });
}

// ─── Ratings ──────────────────────────────────────────────────────────────────

export async function getAverageRatingForAllUsers(bookId: string) {
  const result = await prisma.review.aggregate({
    _avg: { rating: true },
    _count: { rating: true },
    where: { bookId, rating: { not: null } },
  });

  return {
    averageRating: result._avg.rating ?? 0,
    totalRatings: result._count.rating ?? 0,
  };
}

// ─── Suggestions ─────────────────────────────────────────────────────────────

export async function getSuggestedBooks(userId: string, limit: number = 10) {
  const trackedBookIds = await prisma.bookTracking
    .findMany({ where: { userId }, select: { bookId: true } })
    .then((rows) => rows.map((r) => r.bookId));

  const books = await prisma.book.findMany({
    where: { id: { notIn: trackedBookIds } },
    select: {
      id: true,
      title: true,
      author: true,
      coverUrl: true,
      _count: { select: { Review: true } },
      Review: { select: { rating: true } },
    },
  });

  return books
    .map((book) => {
      const ratings = book.Review.map((r) => r.rating).filter(
        (r): r is number => r !== null,
      );

      const avgRating =
        ratings.length > 0
          ? ratings.reduce((a, b) => a + b, 0) / ratings.length
          : 0;

      return {
        id: book.id,
        title: book.title,
        author: book.author,
        coverUrl: book.coverUrl,
        reviewCount: book._count.Review,
        avgRating,
      };
    })
    .sort((a, b) =>
      b.reviewCount !== a.reviewCount
        ? b.reviewCount - a.reviewCount
        : b.avgRating - a.avgRating,
    )
    .slice(0, limit);
}
