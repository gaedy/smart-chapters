"use server";

// import { PrismaClient } from "@prisma/client";

import { prisma } from "../prisma";
import { convertToPlainObject } from "../utils";

export async function getBooks() {
  // const prisma = new PrismaClient();

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
