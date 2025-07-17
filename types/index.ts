import { insertBookSchema, updateBookSchema } from "@/lib/validators";
import { z } from "zod";

// Export inferred types globally
export type BookInsertInput = z.infer<typeof insertBookSchema>;
export type BookUpdateInput = z.infer<typeof updateBookSchema>;
