import { z } from "zod";

/**
 * Material type enum
 */
export const MaterialType = {
  VIDEO: "VIDEO",
  ARTICLE: "ARTICLE",
  CODE_EXAMPLE: "CODE_EXAMPLE",
  INTERACTIVE: "INTERACTIVE",
} as const;

export type MaterialTypeValue =
  (typeof MaterialType)[keyof typeof MaterialType];

/**
 * Validation schema for material creation and editing
 */
export const materialFormSchema = z
  .object({
    moduleId: z.string().uuid("Please select a valid module"),
    title: z
      .string()
      .min(3, "Title must be at least 3 characters")
      .max(200, "Title must not exceed 200 characters"),
    type: z.enum(["VIDEO", "ARTICLE", "CODE_EXAMPLE", "INTERACTIVE"], {
      required_error: "Please select a material type",
    }),
    content: z.string().min(1, "Content is required"),
    duration: z
      .number({
        invalid_type_error: "Duration must be a number",
      })
      .int("Duration must be a whole number")
      .positive("Duration must be positive")
      .optional()
      .nullable(),
    order: z
      .number({
        required_error: "Order is required",
        invalid_type_error: "Order must be a number",
      })
      .int("Order must be a whole number")
      .positive("Order must be a positive number"),
  })
  .refine(
    (data) => {
      // Duration required only for VIDEO type
      if (data.type === "VIDEO" && !data.duration) {
        return false;
      }
      return true;
    },
    {
      message: "Duration is required for video materials",
      path: ["duration"],
    }
  )
  .refine(
    (data) => {
      // Content should be URL for VIDEO and INTERACTIVE
      if (data.type === "VIDEO" || data.type === "INTERACTIVE") {
        try {
          new URL(data.content);
          return true;
        } catch {
          return false;
        }
      }
      return true;
    },
    {
      message:
        "Content must be a valid URL for video and interactive materials",
      path: ["content"],
    }
  );

export type MaterialFormData = z.infer<typeof materialFormSchema>;

/**
 * Get placeholder text based on material type
 */
export function getContentPlaceholder(type: MaterialTypeValue): string {
  switch (type) {
    case "VIDEO":
      return "https://youtube.com/watch?v=... or https://vimeo.com/...";
    case "ARTICLE":
      return "Enter your article content in markdown format...";
    case "CODE_EXAMPLE":
      return "// Enter your code example here\nfunction example() {\n  return 'Hello World';\n}";
    case "INTERACTIVE":
      return "https://example.com/interactive-content";
    default:
      return "Enter content...";
  }
}

/**
 * Get content label based on material type
 */
export function getContentLabel(type: MaterialTypeValue): string {
  switch (type) {
    case "VIDEO":
      return "Video URL";
    case "ARTICLE":
      return "Article Content (Markdown)";
    case "CODE_EXAMPLE":
      return "Code Example";
    case "INTERACTIVE":
      return "Interactive Content URL";
    default:
      return "Content";
  }
}
