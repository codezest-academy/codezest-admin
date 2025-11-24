import { z } from "zod";

/**
 * Validation schema for module creation and editing
 */
export const moduleFormSchema = z.object({
  languageId: z.string().uuid("Please select a valid programming language"),
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must not exceed 100 characters"),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .max(100, "Slug must not exceed 100 characters")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug must contain only lowercase letters, numbers, and hyphens"
    ),
  description: z
    .string()
    .max(500, "Description must not exceed 500 characters")
    .optional()
    .or(z.literal("")),
  syllabus: z.string().optional().or(z.literal("")),
  order: z
    .number({
      required_error: "Order is required",
      invalid_type_error: "Order must be a number",
    })
    .int("Order must be a whole number")
    .positive("Order must be a positive number"),
});

export type ModuleFormData = z.infer<typeof moduleFormSchema>;

/**
 * Generate a URL-friendly slug from a title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}
