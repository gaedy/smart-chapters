import { bookItemSchema, insertBookSchema } from "@/lib/validators";
import { z } from "zod";

// Export inferred types globally
export type BookType = z.infer<typeof bookItemSchema>;
export type BookInsertType = z.infer<typeof insertBookSchema>;
