import { Router } from "express";
import { UserRepository } from "@/repositories/user.repository";
import { RefreshTokenRepository } from "@/repositories/refreshToken.repository";
import { OtpRepository } from "@/repositories/otp.repository";
import { AuthService } from "@/services/auth.service";
import { AuthController } from "@/controllers/auth.controller";
import {
  LoginRequestDto,
  RefreshTokenRequestDto,
  RegisterRequestDto,
  ResetPasswordRequestDto,
} from "@/dto/request/auth.request";
import asyncHandler from "@/utils/asyncHandler";
import validationMiddleware from "@/middleware/validate.middleware";
import {
  SendOtpRequestDto,
  VerifyOtpRequestDto,
} from "@/dto/request/otp.request";
import { OtpService } from "@/services/otp.service";

const router = Router();

// Khởi tạo dependency (DI thủ công, dễ test & mở rộng)
const userRepo = new UserRepository();
const refreshRepo = new RefreshTokenRepository();
const otpRepo = new OtpRepository();

const authService = new AuthService(userRepo, refreshRepo, otpRepo);
const otpService = new OtpService(otpRepo, userRepo);
const authController = new AuthController(authService, otpService);

// ================= AUTH =================

// Đăng ký tài khoản mới - Kiểm tra dữ liệu đầu vào và lưu thông tin người dùng
router.post(
  "/register",
  validationMiddleware(RegisterRequestDto),
  asyncHandler(authController.register)
);

// Đăng nhập - Xác thực thông tin và cấp phát bộ mã Access Token & Refresh Token
router.post(
  "/login",
  validationMiddleware(LoginRequestDto),
  asyncHandler(authController.login)
);

// Làm mới Access Token - Sử dụng Refresh Token để duy trì phiên đăng nhập mà không cần login lại
router.post(
  "/refresh-token",
  validationMiddleware(RefreshTokenRequestDto),
  asyncHandler(authController.refresh)
);

// Đăng xuất - Thu hồi/Xóa Refresh Token để kết thúc phiên làm việc an toàn
router.post(
  "/logout",
  validationMiddleware(RefreshTokenRequestDto),
  asyncHandler(authController.logout)
);

// ================= OTP =================

// Gửi mã OTP - Tạo và gửi mã xác thực qua Email/SMS phục vụ quên mật khẩu hoặc xác minh
router.post(
  "/send-otp",
  validationMiddleware(SendOtpRequestDto),
  asyncHandler(authController.sendOtp)
);

// Xác thực mã OTP - Kiểm tra mã người dùng nhập vào có khớp với mã đã gửi hay không
router.post(
  "/verify-otp",
  validationMiddleware(VerifyOtpRequestDto),
  asyncHandler(authController.verifyOtp)
);

// Đặt lại mật khẩu - Cho phép cập nhật mật khẩu mới sau khi đã xác thực OTP thành công
router.post(
  "/reset-password",
  validationMiddleware(ResetPasswordRequestDto),
  asyncHandler(authController.resetPassword)
);

export default router;