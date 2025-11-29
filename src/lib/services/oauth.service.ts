/**
 * OAuth Service
 * Single Responsibility: Handle OAuth authentication
 */

import httpClient from "./http-client.service";
import { tokenStorage } from "./token-storage.service";
import { OAuthCallbackResponse } from "../types/auth.types";

/**
 * OAuth Provider Type
 */
export type OAuthProvider = "google" | "github";

/**
 * OAuth Service Class
 */
class OAuthService {
  private readonly API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

  /**
   * Get OAuth authorization URL
   */
  getOAuthUrl(provider: OAuthProvider): string {
    const redirectUri = `${window.location.origin}/auth/oauth/${provider}/callback`;

    // Build OAuth URL - this will redirect to backend OAuth endpoint
    return `${
      this.API_BASE_URL
    }/auth/oauth/${provider}?redirect_uri=${encodeURIComponent(redirectUri)}`;
  }

  /**
   * Get Google OAuth URL
   */
  getGoogleAuthUrl(): string {
    return this.getOAuthUrl("google");
  }

  /**
   * Get GitHub OAuth URL
   */
  getGithubAuthUrl(): string {
    return this.getOAuthUrl("github");
  }

  /**
   * Handle OAuth callback
   */
  async handleOAuthCallback(
    provider: OAuthProvider,
    code: string,
    state?: string
  ): Promise<OAuthCallbackResponse> {
    const params = new URLSearchParams({
      code,
      ...(state && { state }),
    });

    const response = await httpClient.get<OAuthCallbackResponse>(
      `/auth/oauth/${provider}/callback?${params.toString()}`
    );

    // Store tokens after successful OAuth
    if (response.data?.tokens) {
      tokenStorage.setTokens(response.data.tokens);
      httpClient.setAuthToken(response.data.tokens.accessToken);
    }

    return response;
  }

  /**
   * Initiate OAuth flow
   */
  initiateOAuth(provider: OAuthProvider): void {
    const oauthUrl = this.getOAuthUrl(provider);
    window.location.href = oauthUrl;
  }
}

/**
 * Export singleton instance
 */
export const oauthService = new OAuthService();

export default oauthService;
