/**
 * Password Strength Utility
 * Calculates password strength based on multiple criteria
 */

export interface PasswordChecks {
  hasMinLength: boolean;
  hasMaxLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
}

export type StrengthLevel = "too-weak" | "weak" | "fair" | "good" | "strong";

export interface PasswordStrength {
  score: number; // 0-100
  level: StrengthLevel;
  feedback: string;
  checks: PasswordChecks;
  tip: string;
}

/**
 * Check if password meets all requirements
 */
export function checkPasswordRequirements(password: string): PasswordChecks {
  return {
    hasMinLength: password.length >= 8,
    hasMaxLength: password.length <= 100,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[^A-Za-z0-9]/.test(password),
  };
}

/**
 * Calculate password strength score (0-100)
 */
export function calculatePasswordScore(
  password: string,
  checks: PasswordChecks
): number {
  let score = 0;

  // Length scoring (0-40 points)
  if (password.length >= 8) score += 10;
  if (password.length >= 12) score += 10;
  if (password.length >= 16) score += 10;
  if (password.length >= 20) score += 10;

  // Character variety (0-40 points)
  if (checks.hasLowercase) score += 10;
  if (checks.hasUppercase) score += 10;
  if (checks.hasNumber) score += 10;
  if (checks.hasSpecial) score += 10;

  // Complexity bonus (0-20 points)
  const uniqueChars = new Set(password).size;
  if (uniqueChars >= 8) score += 10;
  if (uniqueChars >= 12) score += 10;

  return Math.min(100, score);
}

/**
 * Determine strength level from score
 */
export function getStrengthLevel(score: number): StrengthLevel {
  if (score < 25) return "too-weak";
  if (score < 50) return "weak";
  if (score < 75) return "fair";
  if (score < 90) return "good";
  return "strong";
}

/**
 * Get feedback message based on strength level
 */
export function getFeedbackMessage(level: StrengthLevel): string {
  const messages: Record<StrengthLevel, string> = {
    "too-weak": "Too weak - Add more characters",
    weak: "Weak - Add uppercase & numbers",
    fair: "Fair - Almost there!",
    good: "Good - Add special character",
    strong: "Strong password!",
  };

  return messages[level];
}

/**
 * Get contextual tip based on current password state
 */
export function getContextualTip(checks: PasswordChecks): string {
  if (!checks.hasMinLength) {
    return "💡 Tip: Longer passwords are more secure";
  }
  if (!checks.hasUppercase) {
    return "💡 Tip: Add an uppercase letter (A-Z)";
  }
  if (!checks.hasLowercase) {
    return "💡 Tip: Add a lowercase letter (a-z)";
  }
  if (!checks.hasNumber) {
    return "💡 Tip: Add a number (0-9)";
  }
  if (!checks.hasSpecial) {
    return "💡 Tip: Add a special character (!@#$%)";
  }
  return "💡 Tip: Consider using a passphrase for easier memory";
}

/**
 * Main function to calculate password strength
 */
export function calculatePasswordStrength(password: string): PasswordStrength {
  // Empty password
  if (!password) {
    return {
      score: 0,
      level: "too-weak",
      feedback: "Enter a password",
      checks: {
        hasMinLength: false,
        hasMaxLength: true,
        hasUppercase: false,
        hasLowercase: false,
        hasNumber: false,
        hasSpecial: false,
      },
      tip: "💡 Tip: Start with at least 8 characters",
    };
  }

  const checks = checkPasswordRequirements(password);
  const score = calculatePasswordScore(password, checks);
  const level = getStrengthLevel(score);
  const feedback = getFeedbackMessage(level);
  const tip = getContextualTip(checks);

  return {
    score,
    level,
    feedback,
    checks,
    tip,
  };
}
