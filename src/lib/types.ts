export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  mobile: string;
  mobile_country_code: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type VerifyRequest = {
  code: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  mobile?: string;
  mobile_country_code?: string;
  image?: string | null;
  email_verified_at?: boolean | string | null;
  token?: string;
};

export type AuthResponse = {
  id: number;
  type?: string;
  name: string;
  email: string;
  mobile_country_code?: string;
  mobile?: string;
  image?: string | null;
  email_verified_at?: boolean | string | null;
  token: string;
};

export type ApiResponse<T> = {
  status: boolean;
  status_code?: number;
  data?: T;
  message?: string;
};
