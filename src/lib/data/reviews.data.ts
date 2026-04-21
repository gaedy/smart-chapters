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

export async function getCurrentSessionReview(userId: string, bookId: string) {
  return await prisma.review.findUnique({
    where: { userId_bookId: { userId, bookId } },
    include: { user: true },
  });
}

export async function getAllReviewsByBookId(bookId: string) {
  return await prisma.review.findMany({
    where: { bookId },
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: { name: true, image: true },
      },
    },
  });
}