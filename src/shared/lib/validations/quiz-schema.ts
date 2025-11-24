import { z } from "zod";

/**
 * Validation schema for quiz option
 */
export const quizOptionSchema = z.object({
  id: z.string().optional(), // For editing existing options
  optionText: z.string().min(1, "Option text is required"),
  isCorrect: z.boolean(),
  order: z.number().int(),
});

export type QuizOptionData = z.infer<typeof quizOptionSchema>;

/**
 * Validation schema for quiz question
 */
export const quizQuestionSchema = z
  .object({
    id: z.string().optional(), // For editing existing questions
    question: z
      .string()
      .min(5, "Question must be at least 5 characters")
      .max(500, "Question must not exceed 500 characters"),
    explanation: z
      .string()
      .max(1000, "Explanation must not exceed 1000 characters")
      .optional()
      .or(z.literal("")),
    order: z.number().int(),
    points: z
      .number({
        required_error: "Points is required",
        invalid_type_error: "Points must be a number",
      })
      .int("Points must be a whole number")
      .positive("Points must be positive")
      .default(1),
    options: z
      .array(quizOptionSchema)
      .min(2, "Each question must have at least 2 options")
      .max(6, "Each question can have at most 6 options"),
  })
  .refine(
    (data) => {
      // At least one correct answer
      return data.options.some((opt) => opt.isCorrect);
    },
    {
      message: "At least one option must be marked as correct",
      path: ["options"],
    }
  );

export type QuizQuestionData = z.infer<typeof quizQuestionSchema>;

/**
 * Validation schema for quiz form
 */
export const quizFormSchema = z.object({
  moduleId: z.string().uuid("Please select a valid module"),
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title must not exceed 200 characters"),
  description: z
    .string()
    .max(500, "Description must not exceed 500 characters")
    .optional()
    .or(z.literal("")),
  passingScore: z
    .number({
      required_error: "Passing score is required",
      invalid_type_error: "Passing score must be a number",
    })
    .int("Passing score must be a whole number")
    .min(0, "Passing score must be at least 0")
    .max(100, "Passing score cannot exceed 100")
    .default(70),
  timeLimit: z
    .number({
      invalid_type_error: "Time limit must be a number",
    })
    .int("Time limit must be a whole number")
    .positive("Time limit must be positive")
    .optional()
    .nullable(),
  questions: z
    .array(quizQuestionSchema)
    .min(1, "Quiz must have at least 1 question"),
});

export type QuizFormData = z.infer<typeof quizFormSchema>;

/**
 * Get option label (A, B, C, D, etc.)
 */
export function getOptionLabel(index: number): string {
  return String.fromCharCode(65 + index); // 65 is 'A'
}

/**
 * Get question label (Q1, Q2, Q3, etc.)
 */
export function getQuestionLabel(index: number): string {
  return `Q${index + 1}`;
}
