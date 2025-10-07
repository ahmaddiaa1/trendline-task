import { ApiResponse } from "./types";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://tinytales.trendline.marketing/api";

function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem("auth_token");
  } catch {
    return null;
  }
}

export async function apiRequest<T>(
  path: string,
  options?: {
    method?: HttpMethod;
    formData?: Record<string, string | Blob | undefined | null>;
    requireAuth?: boolean;
    signal?: AbortSignal;
  }
): Promise<ApiResponse<T>> {
  const method = options?.method || "GET";
  const url = `${BASE_URL}${path}`;

  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  if (options?.requireAuth) {
    const token = getAuthToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const init: RequestInit = {
    method,
    headers,
    signal: options?.signal,
  };

  if (options?.formData) {
    const fd = new FormData();
    Object.entries(options.formData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        fd.append(key, value as unknown as string);
      }
    });
    init.body = fd;
  }

  const res = await fetch(url, init);
  const contentType = res.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const body = isJson ? await res.json() : await res.text();

  if (!res.ok) {
    const message = isJson ? body?.message || "Request failed" : String(body);
    return { status: false, status_code: res.status, message };
  }

  return body as ApiResponse<T>;
}

export function setAuthToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (!token) {
    localStorage.removeItem("auth_token");
    return;
  }
  localStorage.setItem("auth_token", token);
}

export function getBaseUrl() {
  return BASE_URL;
}
