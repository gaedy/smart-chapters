import { PrismaClient } from "@prisma/client";
import { usersData, booksData, reviewsData } from "./simpleData";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database with all models...");

  // Clean tables (order matters to respect FK constraints)
  await prisma.review.deleteMany();
  await prisma.bookTracking.deleteMany();
  await prisma.book.deleteMany();
  await prisma.user.deleteMany();

  // Create Users
  for (const user of usersData) {
    await prisma.user.create({
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        passwordHash: user.passwordHash,
      },
    });
  }

  // Create Books
  for (const book of booksData) {
    await prisma.book.create({
      data: {
        id: book.id,
        title: book.title,
        author: book.author,
        description: book.description,
        coverUrl: book.coverUrl,
        pageCount: book.pageCount,
        genre: book.genre,
        isFeatured: book.isFeatured,
      },
    });
  }

  // Create Reviews
  for (const review of reviewsData) {
    await prisma.review.create({
      data: review,
    });
  }

  console.log("✅ Seeding completed successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
