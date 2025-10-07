"use client";

import { setAuthToken as setLocalToken } from "./api";

export function setTokenEverywhere(token: string | null) {
  // LocalStorage
  setLocalToken(token);
  // Cookie for middleware (httpOnly false because client must set)
  if (typeof document !== "undefined") {
    if (!token) {
      document.cookie = `auth_token=; Max-Age=0; path=/`;
    } else {
      // 7 days expiry
      const maxAge = 7 * 24 * 60 * 60;
      document.cookie = `auth_token=${encodeURIComponent(
        token
      )}; Max-Age=${maxAge}; Path=/`;
    }
  }
}
