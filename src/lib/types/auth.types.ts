/**
 * Authentication Type Definitions
 * Defines all types and interfaces for authentication operations
 */

/**
 * User Role Enum
 */
export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
  MODERATOR = "MODERATOR",
}

/**
 * User Model
 * Represents the authenticated user
 */
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userName?: string;
  role: UserRole;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Authentication Tokens
 */
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

/**
 * Registration Request
 */
export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  userName?: string;
}

/**
 * Registration Response
 */
export interface RegisterResponse {
  user: User;
  tokens: AuthTokens;
  isNewUser?: boolean;
}

/**
 * Login Request
 */
export interface LoginRequest {
  email: string;
  password: string;
  remember?: boolean;
}

/**
 * Login Response
 */
export interface LoginResponse {
  user: User;
  tokens: AuthTokens;
}

/**
 * OAuth Callback Response
 */
export interface OAuthCallbackResponse {
  status: string;
  data: {
    user: User;
    tokens: AuthTokens;
  };
}

/**
 * API Error Response
 */
export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
  details?: Record<string, unknown>;
}

/**
 * Auth State
 * Used for state management
 */
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
