import { z } from "zod";

/**
 * Validation schema for general profile information
 */
export const profileGeneralSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must not exceed 50 characters"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must not exceed 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  bio: z
    .string()
    .max(500, "Bio must not exceed 500 characters")
    .optional()
    .or(z.literal("")),
  avatar: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  location: z
    .string()
    .max(100, "Location must not exceed 100 characters")
    .optional()
    .or(z.literal("")),
});

export type ProfileGeneralData = z.infer<typeof profileGeneralSchema>;

/**
 * Validation schema for professional information
 */
export const profileProfessionalSchema = z.object({
  occupation: z
    .string()
    .max(100, "Occupation must not exceed 100 characters")
    .optional()
    .or(z.literal("")),
  company: z
    .string()
    .max(100, "Company must not exceed 100 characters")
    .optional()
    .or(z.literal("")),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),
  address: z
    .string()
    .max(200, "Address must not exceed 200 characters")
    .optional()
    .or(z.literal("")),
});

export type ProfileProfessionalData = z.infer<typeof profileProfessionalSchema>;

/**
 * Validation schema for social links
 */
export const profileSocialSchema = z.object({
  website: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  githubUrl: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  linkedinUrl: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  twitterUrl: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
});

export type ProfileSocialData = z.infer<typeof profileSocialSchema>;

/**
 * Validation schema for password change
 */
export const passwordChangeSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, "Current password must be at least 8 characters"),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type PasswordChangeData = z.infer<typeof passwordChangeSchema>;

/**
 * Combined profile update schema
 */
export const profileUpdateSchema = profileGeneralSchema
  .merge(profileProfessionalSchema)
  .merge(profileSocialSchema);

export type ProfileUpdateData = z.infer<typeof profileUpdateSchema>;
