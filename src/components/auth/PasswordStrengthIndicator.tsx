"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import { calculatePasswordStrength } from "@/lib/utils/password-strength.util";
import { cn } from "@/shared/lib/utils";
import { Progress } from "@/ui/ui/progress";

interface PasswordStrengthIndicatorProps {
  password: string;
  showRequirements?: boolean;
  showTips?: boolean;
  className?: string;
}

const strengthConfig = {
  "too-weak": {
    color: "bg-error-500",
    bgColor: "bg-error-50",
    borderColor: "border-error-200",
    textColor: "text-error-700",
    label: "Too weak",
  },
  weak: {
    color: "bg-warning-500",
    bgColor: "bg-warning-50",
    borderColor: "border-warning-200",
    textColor: "text-warning-700",
    label: "Weak",
  },
  fair: {
    color: "bg-primary-500",
    bgColor: "bg-primary-50",
    borderColor: "border-primary-200",
    textColor: "text-primary-700",
    label: "Fair",
  },
  good: {
    color: "bg-primary-600",
    bgColor: "bg-primary-50",
    borderColor: "border-primary-200",
    textColor: "text-primary-700",
    label: "Good",
  },
  strong: {
    color: "bg-success-500",
    bgColor: "bg-success-50",
    borderColor: "border-success-200",
    textColor: "text-success-700",
    label: "Strong",
  },
};

export function PasswordStrengthIndicator({
  password,
  showRequirements = true,
  showTips = true,
  className,
}: PasswordStrengthIndicatorProps) {
  const strength = calculatePasswordStrength(password);
  const config = strengthConfig[strength.level];

  // Don't show anything if password is empty
  if (!password) {
    return null;
  }

  return (
    <div className={cn("space-y-3", className)}>
      {/* Strength Bar */}
      <div className="space-y-2">
        <Progress
          value={strength.score}
          className="h-2 bg-neutral-200"
          indicatorClassName={config.color}
        />

        {/* Strength Label */}
        <div className="flex items-center justify-between">
          <span className={cn("text-sm font-semibold", config.textColor)}>
            {strength.feedback}
          </span>
          <span className="text-xs text-neutral-500">
            {strength.score}% strong
          </span>
        </div>
      </div>

      {/* Requirements Checklist */}
      {showRequirements && strength.level !== "strong" && (
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          <RequirementItem
            met={strength.checks.hasMinLength}
            label="At least 8 characters"
          />
          <RequirementItem
            met={strength.checks.hasUppercase}
            label="One uppercase letter (A-Z)"
          />
          <RequirementItem
            met={strength.checks.hasLowercase}
            label="One lowercase letter (a-z)"
          />
          <RequirementItem
            met={strength.checks.hasNumber}
            label="One number (0-9)"
          />
          <RequirementItem
            met={strength.checks.hasSpecial}
            label="One special character (!@#$%)"
          />
        </div>
      )}

      {/* Contextual Tip */}
      {showTips && strength.level !== "strong" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="text-xs text-neutral-500 italic"
        >
          {strength.tip}
        </motion.div>
      )}

      {/* Celebration for Strong Password */}
      <AnimatePresence>
        {strength.level === "strong" && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-lg border",
              config.bgColor,
              config.borderColor
            )}
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.5 }}
              className="text-lg"
            >
              🎉
            </motion.span>
            <span className={cn("text-sm font-medium", config.textColor)}>
              Excellent! Your password is very secure.
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface RequirementItemProps {
  met: boolean;
  label: string;
}

function RequirementItem({ met, label }: RequirementItemProps) {
  return (
    <div className="flex items-center gap-2">
      <AnimatePresence mode="wait">
        {met ? (
          <motion.div
            key="check"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="flex-shrink-0"
          >
            <div className="h-4 w-4 rounded-full bg-success-100 flex items-center justify-center">
              <Check className="h-3 w-3 text-success-600" />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="x"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="flex-shrink-0"
          >
            <div className="h-4 w-4 rounded-full bg-neutral-100 flex items-center justify-center">
              <X className="h-3 w-3 text-neutral-400" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <span
        className={cn(
          "text-xs transition-colors",
          met ? "text-neutral-700 font-medium" : "text-neutral-500"
        )}
      >
        {label}
      </span>
    </div>
  );
}
