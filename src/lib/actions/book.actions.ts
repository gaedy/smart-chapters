"use server";
import { BookType } from "@/types";
import { prisma } from "../prisma";
import { convertToPlainObject } from "../utils";
import { auth } from "../../../auth";
import { TrackingStatus } from "@prisma/client";
import { updateCurrentPageSchema } from "../validators";

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

export async function getUserBookCounts(userId: string) {
  const counts = await prisma.bookTracking.groupBy({
    by: ["status"],
    where: { userId },
    _count: { status: true },
  });

  return {
    READING: counts.find((c) => c.status === "READING")?._count.status ?? 0,
    WANT_TO_READ:
      counts.find((c) => c.status === "WANT_TO_READ")?._count.status ?? 0,
    FINISHED: counts.find((c) => c.status === "FINISHED")?._count.status ?? 0,
    TOTAL: counts.reduce((acc, c) => acc + c._count.status, 0),
  };
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

  // Remove book from library
  await prisma.bookTracking.deleteMany({
    where: {
      userId: user.id,
      bookId: bookId,
    },
  });

  // Remove user's review/rating for this book
  await prisma.review.deleteMany({
    where: {
      userId: user.id,
      bookId: bookId,
    },
  });

  return { success: true, message: "Book and rating removed" };
}

export async function getUserBookTrackingStatus(
  userId: string,
  bookId: string
) {
  const tracking = await prisma.bookTracking.findUnique({
    where: {
      userId_bookId: {
        userId,
        bookId,
      },
    },
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

  return {
    isTracked: true,
    status: tracking.status, // "READING" | "WANT_TO_READ" | "FINISHED"
    currentPage: tracking.currentPage,
    startedAt: tracking.startedAt,
    finishedAt: tracking.finishedAt,
    updatedAt: tracking.updatedAt,
  };
}

export async function getUserBookTrackingRating(
  userId: string,
  bookId: string
) {
  const rate = await prisma.bookTracking.findUnique({
    where: {
      userId_bookId: {
        userId,
        bookId,
      },
    },
    select: {
      rating: true,
    },
  });

  return rate;
}

export async function updateUserBookTrackingRating(
  userId: string,
  bookId: string,
  rating: number
) {
  // 1️⃣ Update BookTracking so the user's progress tracking has the latest rating
  const tracking = await prisma.bookTracking.upsert({
    where: {
      userId_bookId: {
        userId,
        bookId,
      },
    },
    update: {
      rating,
    },
    create: {
      userId,
      bookId,
      rating,
      status: "WANT_TO_READ",
      currentPage: 0,
    },
  });

  // 2️⃣ Upsert into Review table so that ALL ratings are in one place
  await prisma.review.upsert({
    where: {
      userId_bookId: {
        userId,
        bookId,
      },
    },
    update: {
      rating,
    },
    create: {
      userId,
      bookId,
      rating,
      content: "", // empty content for star-only ratings
    },
  });

  return tracking;
}

export async function getBooksByTitle(title: string) {
  return await prisma.book.findMany({
    where: {
      title: {
        contains: title,
        mode: "insensitive",
      },
    },
  });
}

export async function getGenres() {
  return await prisma.book.findMany({
    where: {
      genre: {
        not: null,
      },
    },
    distinct: ["genre"],
    select: {
      genre: true,
    },
  });
}

export async function getBooksByGenre(genre: string) {
  return await prisma.book.findMany({
    where: { genre },
  });
}

export async function getAverageRatingAForAllUser(bookId: string) {
  const result = await prisma.review.aggregate({
    _avg: { rating: true },
    _count: { rating: true },
    where: {
      bookId,
      rating: { not: null },
    },
  });

  return {
    averageRating: result._avg.rating || 0,
    totalRatings: result._count.rating || 0,
  };
}

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
      where: {
        userId_bookId: { userId, bookId },
      },
      data: {
        currentPage,
      },
    });

    return { success: true, data: updatedTracking };
  } catch (error) {
    return { error: "Failed to update current page", details: error };
  }
}




export async function getSuggestedBooks(userId: string, limit: number = 10) {
  // 1️⃣ نجيب الـ IDs للكتب اللي المستخدم متابعها
  const trackedBooks = await prisma.bookTracking.findMany({
    where: { userId },
    select: { bookId: true },
  });

  const excludedBookIds = trackedBooks.map((t) => t.bookId);

  // 2️⃣ نجيب الكتب مع الريفيوهات ونستبعد الكتب دي
  const books = await prisma.book.findMany({
    where: {
      id: { notIn: excludedBookIds }, // استبعاد كتب التراكنج
    },
    select: {
      id: true,
      title: true,
      author: true,
      coverUrl: true,
      _count: {
        select: {
          Review: true,
        },
      },
      Review: {
        select: {
          rating: true,
        },
      },
    },
  });

  // 3️⃣ نحسب الـ stats
  const booksWithStats = books.map((book) => {
    const ratings = book.Review.map((r) => r.rating).filter(
      (r): r is number => r !== null
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
  });

  // 4️⃣ نرتب ونطبق limit
  const sortedBooks = booksWithStats
    .sort((a, b) => {
      if (b.reviewCount !== a.reviewCount) {
        return b.reviewCount - a.reviewCount;
      }
      return b.avgRating - a.avgRating;
    })
    .slice(0, limit);

  return sortedBooks;
}