// src/features/auth/services/auth.service.ts

import { AuthResponse } from "@/features/client/auth/types";
import { api } from "@/lib/axios";
import { handleAxiosError } from "@/utils/handleAxiosError";

export const authService = {
  // --- Đăng nhập ---
  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      // Call API đăng nhập, BE trả về { accessToken, user } và set cookie refreshToken
      const res = await api.post<{ data: AuthResponse }>("/api/auth/login", {
        email,
        password,
      });
      return res.data.data;
    } catch (error) {
      handleAxiosError(error);
      throw error;
    }
  },

  // --- Đăng ký ---
  register: async (
    fullName: string,
    email: string,
    password: string
  ): Promise<AuthResponse> => {
    try {
      // Call API đăng ký, BE trả về { accessToken, user } và set cookie refreshToken
      const res = await api.post<{ data: AuthResponse }>("/api/auth/register", {
        fullName,
        email,
        password,
      });
      return res.data.data;
    } catch (error) {
      handleAxiosError(error);
      throw error;
    }
  },

  // --- Làm mới accessToken ---
  refresh: async (): Promise<{ accessToken: string }> => {
    try {
      // BE đọc refreshToken từ cookie HttpOnly và trả accessToken mới
      const res = await api.post<{ data: { accessToken: string } }>(
        "/api/auth/refresh",
        {},
        { withCredentials: true }
      );
      return res.data.data;
    } catch (error) {
      handleAxiosError(error);
      throw error;
    }
  },

  // --- Đăng xuất ---
  logout: async (): Promise<void> => {
    try {
      // BE xóa refreshToken trong cookie
      await api.post("/api/auth/logout", {}, { withCredentials: true });
    } catch (error) {
      handleAxiosError(error);
      throw error;
    }
  },

  // --- Gửi OTP quên mật khẩu ---
  sendOtp: async (email: string): Promise<void> => {
    try {
      await api.post("/api/auth/send-otp", { email });
    } catch (error) {
      handleAxiosError(error);
      throw error;
    }
  },

  // --- Xác thực OTP ---
  verifyOtp: async (email: string, otp: string): Promise<void> => {
    try {
      await api.post("/api/auth/verify-otp", { email, otp });
    } catch (error) {
      handleAxiosError(error);
      throw error;
    }
  },

  // --- Đặt lại mật khẩu ---
  resetPassword: async (
    email: string,
    otp: string,
    newPassword: string
  ): Promise<void> => {
    try {
      await api.post("/api/auth/reset-password", { email, otp, newPassword });
    } catch (error) {
      handleAxiosError(error);
      throw error;
    }
  },
};
