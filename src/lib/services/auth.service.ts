/**
 * Authentication Service
 * Single Responsibility: Handle authentication operations
 */

import httpClient from "./http-client.service";
import { tokenStorage } from "./token-storage.service";
import {
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
  User,
} from "../types/auth.types";

/**
 * Authentication Service Class
 */
class AuthService {
  /**
   * Register a new user
   */
  async register(data: RegisterRequest): Promise<RegisterResponse> {
    const response = await httpClient.post<RegisterResponse>("/auth/register", {
      body: data,
    });

    // Store tokens after successful registration
    if (response.tokens) {
      tokenStorage.setTokens(response.tokens);
      httpClient.setAuthToken(response.tokens.accessToken);
    }

    return response;
  }

  /**
   * Login user
   */
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await httpClient.post<LoginResponse>("/auth/login", {
      body: data,
    });

    // Store tokens after successful login
    if (response.tokens) {
      tokenStorage.setTokens(response.tokens);
      httpClient.setAuthToken(response.tokens.accessToken);
    }

    return response;
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      // Call logout endpoint if it exists
      await httpClient.post("/auth/logout", {});
    } catch (error) {
      // Continue with local logout even if API call fails
      console.error("Logout API call failed:", error);
    } finally {
      // Always clear local tokens
      tokenStorage.clearTokens();
      httpClient.setAuthToken(null);
    }
  }

  /**
   * Get current user
   */
  async getCurrentUser(): Promise<User> {
    const accessToken = tokenStorage.getAccessToken();

    if (!accessToken) {
      throw new Error("No access token found");
    }

    httpClient.setAuthToken(accessToken);

    return httpClient.get<User>("/auth/me");
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return tokenStorage.isAuthenticated();
  }

  /**
   * Initialize auth state (call on app startup)
   */
  initializeAuth(): void {
    const accessToken = tokenStorage.getAccessToken();
    if (accessToken) {
      httpClient.setAuthToken(accessToken);
    }
  }

  /**
   * Refresh access token
   */
  async refreshToken(): Promise<void> {
    const refreshToken = tokenStorage.getRefreshToken();

    if (!refreshToken) {
      throw new Error("No refresh token found");
    }

    const response = await httpClient.post<{ accessToken: string }>(
      "/auth/refresh",
      {
        body: { refreshToken },
      }
    );

    // Update access token
    const tokens = tokenStorage.getTokens();
    if (tokens) {
      tokenStorage.setTokens({
        accessToken: response.accessToken,
        refreshToken: tokens.refreshToken,
      });
      httpClient.setAuthToken(response.accessToken);
    }
  }
}

/**
 * Export singleton instance
 */
export const authService = new AuthService();

export default authService;
