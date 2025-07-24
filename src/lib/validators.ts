import { email, z } from "zod";

/**
 * Schema for inserting a new book
 * Used for:
 * - API: POST /api/books
 * - Admin dashboard forms
 * - Seed validation if needed
 */
export const insertBookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  coverUrl: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  pageCount: z.number().int().positive().optional().nullable(),
  publishedAt: z.date().optional().nullable(),
  genre: z.string().optional().nullable(),
  isFeatured: z.boolean().optional().nullable(),
});

/**
 * Schema for updating an existing book
 * All fields are optional, but at least one must be present
 */
export const updateBookSchema = insertBookSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
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
