/**
 * Token Storage Service
 * Single Responsibility: Manage authentication tokens
 */

import { AuthTokens } from "../types/auth.types";

/**
 * Storage keys
 */
const STORAGE_KEYS = {
  ACCESS_TOKEN: "auth_access_token",
  REFRESH_TOKEN: "auth_refresh_token",
} as const;

/**
 * Token Storage Service Class
 */
class TokenStorageService {
  /**
   * Check if localStorage is available
   */
  private isLocalStorageAvailable(): boolean {
    try {
      return typeof window !== "undefined" && !!window.localStorage;
    } catch {
      return false;
    }
  }

  /**
   * Set tokens in storage
   */
  setTokens(tokens: AuthTokens): void {
    if (!this.isLocalStorageAvailable()) {
      console.warn("localStorage is not available");
      return;
    }

    try {
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, tokens.accessToken);
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, tokens.refreshToken);
    } catch (error) {
      console.error("Failed to store tokens:", error);
    }
  }

  /**
   * Get access token
   */
  getAccessToken(): string | null {
    if (!this.isLocalStorageAvailable()) {
      return null;
    }

    try {
      return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    } catch (error) {
      console.error("Failed to retrieve access token:", error);
      return null;
    }
  }

  /**
   * Get refresh token
   */
  getRefreshToken(): string | null {
    if (!this.isLocalStorageAvailable()) {
      return null;
    }

    try {
      return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
    } catch (error) {
      console.error("Failed to retrieve refresh token:", error);
      return null;
    }
  }

  /**
   * Get both tokens
   */
  getTokens(): AuthTokens | null {
    const accessToken = this.getAccessToken();
    const refreshToken = this.getRefreshToken();

    if (!accessToken || !refreshToken) {
      return null;
    }

    return {
      accessToken,
      refreshToken,
    };
  }

  /**
   * Clear all tokens
   */
  clearTokens(): void {
    if (!this.isLocalStorageAvailable()) {
      return;
    }

    try {
      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    } catch (error) {
      console.error("Failed to clear tokens:", error);
    }
  }

  /**
   * Check if user is authenticated (has valid tokens)
   */
  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }
}

/**
 * Export singleton instance
 */
export const tokenStorage = new TokenStorageService();

export default tokenStorage;
