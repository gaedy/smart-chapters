import { PrismaClient } from "@/generated/prisma";
import { simpleData } from "./simpleData";

async function main() {
  const prisma = new PrismaClient();
  console.log("🌱 Starting database seeding...");

  // Clean tables respecting FK dependencies
  await prisma.verificationToken.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
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
    data: simpleData.books,
  });

  // Seed Accounts
  await prisma.account.createMany({
    data: simpleData.accounts,
  });

  // Seed Sessions
  await prisma.session.createMany({
    data: simpleData.sessions,
  });

  // Seed VerificationTokens
  await prisma.verificationToken.createMany({
    data: simpleData.verificationTokens,
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
