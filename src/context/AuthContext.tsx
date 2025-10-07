"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { apiRequest } from "@/lib/api";
import { setTokenEverywhere } from "@/lib/token";
import type { ApiResponse, AuthResponse, User } from "@/lib/types";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  token: string | null;
  login: (
    email: string,
    password: string
  ) => Promise<{ ok: boolean; error?: string }>;
  register: (payload: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    mobile: string;
    mobile_country_code: string;
  }) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    const res = await apiRequest<User>("/auth/user-data", {
      method: "GET",
      requireAuth: true,
    });
    if (res?.status && res?.data) {
      setUser(res.data);
    }
  }, []);

  useEffect(() => {
    const existing =
      typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
    if (existing) {
      setToken(existing);
      fetchUser().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [fetchUser]);

  const login = useCallback(
    async (email: string, password: string) => {
      const res = await apiRequest<AuthResponse>("/auth/login", {
        method: "POST",
        formData: { email, password },
      });
      if (!res.status)
        return { ok: false, error: res.message || "Login failed" };
      const auth = res.data;
      const token = auth?.token;
      if (token) {
        setTokenEverywhere(token);
        setToken(token);
        await fetchUser();
        return { ok: true };
      }
      return { ok: false, error: "No token in response" };
    },
    [fetchUser]
  );

  const register = useCallback(
    async (payload: {
      name: string;
      email: string;
      password: string;
      password_confirmation: string;
      mobile: string;
      mobile_country_code: string;
    }) => {
      const res = await apiRequest<AuthResponse>("/auth/register", {
        method: "POST",
        formData: payload,
      });
      if (!res.status)
        return { ok: false, error: res.message || "Register failed" };
      const auth = res.data;
      const token = auth?.token;
      if (token) {
        setTokenEverywhere(token);
        setToken(token);
        await fetchUser();
        return { ok: true };
      }
      return { ok: false, error: "No token in response" };
    },
    [fetchUser]
  );

  const logout = useCallback(async () => {
    try {
      await apiRequest("/auth/logout", { method: "POST", requireAuth: true });
    } finally {
      setTokenEverywhere(null);
      setToken(null);
      setUser(null);
    }
  }, []);

  const refreshUser = useCallback(async () => {
    await fetchUser();
  }, [fetchUser]);

  const value = useMemo<AuthContextValue>(
    () => ({ user, loading, token, login, register, logout, refreshUser }),
    [user, loading, token, login, register, logout, refreshUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
