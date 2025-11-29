/**
 * HTTP Client Service
 * Single Responsibility: Handle all HTTP communication
 */

import { parseApiError } from "../utils/error-handler.util";

/**
 * HTTP Client Configuration
 */
interface HttpClientConfig {
  baseURL: string;
  headers?: Record<string, string>;
}

/**
 * HTTP Request Options
 */
interface RequestOptions {
  headers?: Record<string, string>;
  body?: unknown;
}

/**
 * HTTP Client Class
 * Handles all HTTP requests with centralized error handling
 */
class HttpClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor(config: HttpClientConfig) {
    this.baseURL = config.baseURL;
    this.defaultHeaders = {
      "Content-Type": "application/json",
      ...config.headers,
    };
  }

  /**
   * Set authorization token
   */
  setAuthToken(token: string | null): void {
    if (token) {
      this.defaultHeaders["Authorization"] = `Bearer ${token}`;
    } else {
      delete this.defaultHeaders["Authorization"];
    }
  }

  /**
   * Build full URL
   */
  private buildUrl(endpoint: string): string {
    // Remove leading slash from endpoint if present
    const cleanEndpoint = endpoint.startsWith("/")
      ? endpoint.slice(1)
      : endpoint;
    // Remove trailing slash from baseURL if present
    const cleanBaseURL = this.baseURL.endsWith("/")
      ? this.baseURL.slice(0, -1)
      : this.baseURL;

    return `${cleanBaseURL}/${cleanEndpoint}`;
  }

  /**
   * Merge headers
   */
  private mergeHeaders(
    customHeaders?: Record<string, string>
  ): Record<string, string> {
    return {
      ...this.defaultHeaders,
      ...customHeaders,
    };
  }

  /**
   * Handle response
   */
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw {
        response: {
          data: errorData,
          status: response.status,
        },
      };
    }

    return response.json();
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    try {
      const response = await fetch(this.buildUrl(endpoint), {
        method: "GET",
        headers: this.mergeHeaders(options?.headers),
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      const apiError = parseApiError(error);
      throw apiError;
    }
  }

  /**
   * POST request
   */
  async post<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    try {
      const response = await fetch(this.buildUrl(endpoint), {
        method: "POST",
        headers: this.mergeHeaders(options?.headers),
        body: options?.body ? JSON.stringify(options.body) : undefined,
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      const apiError = parseApiError(error);
      throw apiError;
    }
  }

  /**
   * PUT request
   */
  async put<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    try {
      const response = await fetch(this.buildUrl(endpoint), {
        method: "PUT",
        headers: this.mergeHeaders(options?.headers),
        body: options?.body ? JSON.stringify(options.body) : undefined,
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      const apiError = parseApiError(error);
      throw apiError;
    }
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    try {
      const response = await fetch(this.buildUrl(endpoint), {
        method: "DELETE",
        headers: this.mergeHeaders(options?.headers),
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      const apiError = parseApiError(error);
      throw apiError;
    }
  }
}

/**
 * Create and export HTTP client instance
 */
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const httpClient = new HttpClient({
  baseURL: API_BASE_URL,
});

export default httpClient;
