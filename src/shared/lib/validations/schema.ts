import { z } from "zod";

// ============================================================================
// ENUMS
// ============================================================================

export const UserRoleSchema = z.enum(["USER", "ADMIN"]);
export const DifficultySchema = z.enum([
  "BEGINNER",
  "INTERMEDIATE",
  "ADVANCED",
]);
export const MaterialTypeSchema = z.enum([
  "VIDEO",
  "ARTICLE",
  "CODE_EXAMPLE",
  "INTERACTIVE",
]);
export const SubmissionStatusSchema = z.enum([
  "PENDING",
  "RUNNING",
  "PASSED",
  "FAILED",
  "ERROR",
]);
export const ProgressStatusSchema = z.enum([
  "NOT_STARTED",
  "IN_PROGRESS",
  "COMPLETED",
]);
export const EnrollmentStatusSchema = z.enum([
  "ACTIVE",
  "PAUSED",
  "COMPLETED",
  "DROPPED",
]);
export const SubscriptionPlanSchema = z.enum(["FREE", "PRO", "ENTERPRISE"]);
export const SubscriptionStatusSchema = z.enum([
  "ACTIVE",
  "CANCELED",
  "EXPIRED",
  "PAUSED",
]);
export const TransactionStatusSchema = z.enum([
  "PENDING",
  "PROCESSING",
  "SUCCEEDED",
  "FAILED",
  "REFUNDED",
]);
export const InvoiceStatusSchema = z.enum([
  "DRAFT",
  "SENT",
  "PAID",
  "OVERDUE",
  "CANCELED",
]);
export const PaymentMethodTypeSchema = z.enum([
  "CARD",
  "PAYPAL",
  "BANK_TRANSFER",
]);
export const AnalysisTypeSchema = z.enum(["AI", "MANUAL", "HYBRID"]);

// ============================================================================
// AUTH & USER MODELS
// ============================================================================

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  passwordHash: z.string(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  role: UserRoleSchema.default("USER"),
  avatarUrl: z.string().url().nullable().optional(),
  bio: z.string().max(500).nullable().optional(),
  isEmailVerified: z.boolean().default(false),
  lastLoginAt: z.date().nullable().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateUserSchema = UserSchema.pick({
  email: true,
  firstName: true,
  lastName: true,
}).extend({
  password: z.string().min(8),
});

export const UpdateUserSchema = UserSchema.partial().omit({
  id: true,
  email: true,
  passwordHash: true,
  createdAt: true,
  updatedAt: true,
});

// ============================================================================
// LEARNING MODELS
// ============================================================================

export const CourseSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(3).max(100),
  slug: z.string().min(3),
  description: z.string().min(10),
  thumbnailUrl: z.string().url().nullable().optional(),
  difficulty: DifficultySchema,
  isPublished: z.boolean().default(false),
  publishedAt: z.date().nullable().optional(),
  authorId: z.string().uuid(),
  price: z.number().int().nonnegative().default(0),
  tags: z.array(z.string()),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateCourseSchema = CourseSchema.pick({
  title: true,
  description: true,
  difficulty: true,
  price: true,
  tags: true,
}).extend({
  thumbnailUrl: z.string().url().optional(),
});

// ============================================================================
// PAYMENT MODELS
// ============================================================================

export const SubscriptionSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  plan: SubscriptionPlanSchema.default("FREE"),
  status: SubscriptionStatusSchema.default("ACTIVE"),
  stripeCustomerId: z.string().nullable().optional(),
  stripeSubscriptionId: z.string().nullable().optional(),
  startedAt: z.date(),
  validUntil: z.date().nullable().optional(),
  canceledAt: z.date().nullable().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// ============================================================================
// TYPES
// ============================================================================

export type User = z.infer<typeof UserSchema>;
export type CreateUserInput = z.infer<typeof CreateUserSchema>;
export type UpdateUserInput = z.infer<typeof UpdateUserSchema>;

export type Course = z.infer<typeof CourseSchema>;
export type CreateCourseInput = z.infer<typeof CreateCourseSchema>;

export type Subscription = z.infer<typeof SubscriptionSchema>;
