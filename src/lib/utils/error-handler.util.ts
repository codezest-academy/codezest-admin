/**
 * Error Handler Utility
 * Centralized error handling for API responses
 */

import { ApiError } from "../types/auth.types";

/**
 * Parse API error response
 */
export function parseApiError(error: unknown): ApiError {
  // Network error
  if (error instanceof TypeError && error.message === "Failed to fetch") {
    return {
      message: "Network error. Please check your internet connection.",
      statusCode: 0,
      error: "NetworkError",
    };
  }

  // Axios-like error with response
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof error.response === "object" &&
    error.response !== null
  ) {
    const response = error.response as {
      data?: { message?: string; error?: string };
      status?: number;
    };

    return {
      message:
        response.data?.message ||
        response.data?.error ||
        "An unexpected error occurred",
      statusCode: response.status || 500,
      error: response.data?.error,
    };
  }

  // Generic error object
  if (error instanceof Error) {
    return {
      message: error.message || "An unexpected error occurred",
      statusCode: 500,
      error: "UnknownError",
    };
  }

  // Unknown error type
  return {
    message: "An unexpected error occurred",
    statusCode: 500,
    error: "UnknownError",
  };
}

/**
 * Get user-friendly error message based on status code
 */
export function getUserFriendlyErrorMessage(apiError: ApiError): string {
  const { statusCode, message } = apiError;

  // Map common status codes to user-friendly messages
  switch (statusCode) {
    case 400:
      return message || "Invalid request. Please check your input.";
    case 401:
      return "Invalid credentials. Please try again.";
    case 403:
      return "You don't have permission to perform this action.";
    case 404:
      return "The requested resource was not found.";
    case 409:
      return message || "This email is already registered.";
    case 422:
      return message || "Validation failed. Please check your input.";
    case 429:
      return "Too many requests. Please try again later.";
    case 500:
      return "Server error. Please try again later.";
    case 503:
      return "Service temporarily unavailable. Please try again later.";
    case 0:
      return message; // Network error message
    default:
      return message || "An unexpected error occurred. Please try again.";
  }
}

/**
 * Handle API error and return user-friendly message
 */
export function handleApiError(error: unknown): string {
  const apiError = parseApiError(error);
  return getUserFriendlyErrorMessage(apiError);
}
