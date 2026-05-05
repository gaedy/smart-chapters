import { z } from "zod";

/**
 * Schema for inserting a new book
 * Used for:
 * - API: POST /api/books
 * - Admin dashboard forms
 * - Seed validation if needed
 */
export const bookItemSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  coverUrl: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  pageCount: z.number().int().positive().optional().nullable(),
  publishedAt: z.date().optional().nullable(),
  genre: z.string().optional().nullable(),
  isFeatured: z.boolean().optional().nullable(),
});

export const insertBookSchema = z.object({
  items: z.array(bookItemSchema),
});

export const signInSchema = z.object({
  email: z.string().email("invalid mail"),
  password: z.string().min(6, "password must be at least 6 characters"),
});

export const signUpSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("invalid mail"),
    password: z.string().min(6, "password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "password not match",
    path: ["confirmPassword"],
  });

export const updateCurrentPageSchema = z.object({
  userId: z.string().min(1),
  bookId: z.string().min(1),
  currentPage: z.number().min(0),
});

const optionalText = z
  .string()
  .trim()
  .transform((value) => (value.length ? value : null))
  .nullable()
  .optional();

const maxCoverImageDataUrlLength = Math.ceil((1024 * 1024 * 4) / 3) + 256;

export const customBookSchema = z.object({
  title: z.string().trim().min(1, "Book title is required").max(180),
  subtitle: optionalText,
  author: z.string().trim().min(1, "Author is required").max(140),
  contributors: optionalText,
  genre: z.string().trim().min(1, "Genre or category is required").max(80),
  description: z.string().trim().min(1, "Description is required").max(2500),
  pageCount: z.coerce
    .number({ error: "Number of pages is required" })
    .int("Pages must be a whole number")
    .positive("Pages must be greater than 0")
    .max(100000, "Pages looks too large"),
  publicationYear: z.coerce
    .number({ error: "Publication year is required" })
    .int("Year must be a whole number")
    .min(1000, "Enter a four digit year")
    .max(new Date().getFullYear() + 1, "Publication year is too far ahead"),
  publisher: optionalText,
  language: optionalText,
  isbn: z
    .string()
    .trim()
    .regex(/^[0-9Xx -]*$/, "ISBN can only include numbers, X, spaces, or dashes")
    .transform((value) => (value.length ? value : null))
    .nullable()
    .optional(),
  coverUrl: z
    .string()
    .trim()
    .min(1, "Upload a cover image")
    .max(maxCoverImageDataUrlLength, "Cover image must be 1 MB or smaller")
    .regex(
      /^data:image\/(png|jpe?g|webp|gif);base64,/,
      "Upload a PNG, JPG, WEBP, or GIF image",
    ),
  status: z.enum(["WANT_TO_READ", "READING", "FINISHED"]),
  rating: z.preprocess(
    (value) => (value === "" || value === null ? undefined : value),
    z.coerce
      .number()
      .int("Rating must be a whole number")
      .min(1, "Rating must be between 1 and 5")
      .max(5, "Rating must be between 1 and 5")
      .optional(),
  ),
  tags: optionalText,
  notes: optionalText,
});
