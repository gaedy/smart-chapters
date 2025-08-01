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
