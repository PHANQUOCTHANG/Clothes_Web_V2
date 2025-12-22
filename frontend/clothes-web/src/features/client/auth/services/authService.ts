// File: src/services/authService.ts

import axios from "axios";
import { LoginFormState } from "@/features/auth/constants/constantsAuth";

// --- Cấu hình Căn bản ---
const BASE_URL = "https://api.yourshop.com/v1/auth";
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Giả lập Interceptor để thêm độ trễ mạng (1s) cho Mock API
apiClient.interceptors.request.use((config) => {
  return new Promise((resolve) => setTimeout(() => resolve(config), 1000));
});

// --- Type cho Phản hồi ---
interface AuthResponseData {
  token?: string;
  message?: string;
  user?: { id: number; email: string; name: string };
}

// ====================================================================
// --- Các Hàm Dịch vụ Xác thực Cụ thể ---
// ====================================================================

export const authService = {
  /** Dịch vụ Đăng nhập */
  login: async (email: string, password: string): Promise<AuthResponseData> => {
    if (email === "test@shop.com" && password === "123456") {
      return {
        token: "mock-jwt-token-12345",
        message: "Đăng nhập thành công!",
        user: { id: 1, email, name: "Test User" },
      };
    } else {
      throw new Error("Thông tin đăng nhập không hợp lệ.");
    }
  },

  /** Dịch vụ Đăng ký */
  register: async (form: LoginFormState): Promise<AuthResponseData> => {
    if (form.email === "error@shop.com") {
      throw new Error("Email này đã được sử dụng.");
    }

    return { message: "Đăng ký thành công! Vui lòng đăng nhập." };
  },

  /** B1: Gửi email để nhận OTP */
  sendPasswordResetEmail: async (email: string): Promise<AuthResponseData> => {
    if (email === "notfound@shop.com") {
      throw new Error("Email không tồn tại trong hệ thống.");
    }

    return {
      message:
        "Mã OTP đã được gửi tới email của bạn. Vui lòng kiểm tra hộp thư!",
    };
  },

  /** B2: Xác thực OTP */
  verifyOtp: async (email: string, otp: string): Promise<AuthResponseData> => {
    if (otp !== "123456") {
      // Mock OTP
      throw new Error("Mã OTP không hợp lệ.");
    }

    return { message: "Xác thực OTP thành công. Vui lòng đặt mật khẩu mới." };
  },

  /** B3: Đặt lại Mật khẩu */
  resetPassword: async (
    email: string,
    otp: string,
    newPassword: string
  ): Promise<AuthResponseData> => {
    if (newPassword.length < 6) {
      throw new Error("Mật khẩu phải có ít nhất 6 ký tự.");
    }

    return { message: "Đặt lại mật khẩu thành công! Bạn có thể đăng nhập." };
  },
};
