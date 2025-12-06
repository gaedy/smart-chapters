import 'dotenv/config'

import { simpleData } from "./simpleData";

import bookData from "./bookData.json";
import { prisma } from "@/lib/prisma";
async function main() {
  console.log("🌱 Starting database seeding...");

  // Clean tables respecting FK dependencies

  await prisma.review.deleteMany();
  await prisma.bookTracking.deleteMany();
  await prisma.book.deleteMany();
  await prisma.user.deleteMany();

  // Seed Users
  await prisma.user.createMany({
    data: simpleData.users,
  });

  // Seed Books
  await prisma.book.createMany({
    data: bookData,
  });

  // Seed BookTrackings
  await prisma.bookTracking.createMany({
    data: simpleData.bookTrackings,
  });

  // Seed Reviews
  await prisma.review.createMany({
    data: simpleData.reviews,
  });

  console.log("✅ Seeding completed successfully.");

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
