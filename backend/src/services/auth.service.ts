import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AppError from "@/utils/appError";

import { UserRepository } from "@/repositories/user.repository";
import { RefreshTokenRepository } from "@/repositories/refreshToken.repository";
import { OtpRepository } from "@/repositories/otp.repository";

import {
  LoginRequestDto,
  RegisterRequestDto,
} from "@/dto/request/auth.request";

export class AuthService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly refreshRepo: RefreshTokenRepository,
    private readonly otpRepo: OtpRepository
  ) {}

  // Đăng ký tài khoản
  async register(dto: RegisterRequestDto) {
    const { password, ...rest } = dto;

    const existed = await this.userRepo.findByEmail(dto.email);
    if (existed) throw new AppError("Email đã tồn tại", 409);

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await this.userRepo.create({
      ...rest,
      passwordHash,
      status: "ACTIVE",
    });

    return this.generateAuthResponse(user.id, user);
  }

  // Đăng nhập
  async login(dto: LoginRequestDto) {
    const { email, password } = dto;

    const user = await this.userRepo.findByEmail(email);
    // Nếu dùng Mongoose, hãy chắc chắn findByEmail đã .select('+passwordHash')
    if (!user || !user.passwordHash) {
      throw new AppError("Sai email hoặc mật khẩu", 401);
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) throw new AppError("Sai email hoặc mật khẩu", 401);

    if (user.status !== "ACTIVE") throw new AppError("Tài khoản bị khóa", 403);

    return this.generateAuthResponse(user.id, user);
  }

  // Làm mới access token
  async refresh(refreshToken: string) {
    if (!refreshToken) throw new AppError("Refresh token không tồn tại", 401);

    const stored = await this.refreshRepo.findValid(refreshToken);
    if (!stored)
      throw new AppError("Refresh token không hợp lệ hoặc đã hết hạn", 401);

    // Tìm user trước khi revoke để đảm bảo user vẫn tồn tại
    const user = await this.userRepo.findById(stored.userId.toString());
    if (!user) throw new AppError("User không tồn tại", 404);

    // Thu hồi token cũ ngay sau khi xác thực thành công
    await this.refreshRepo.revoke(refreshToken);

    return this.generateAuthResponse(user.id, user);
  }

  // Sinh access token + refresh token
  private async generateAuthResponse(userId: string, user: any) {
    const accessSecret = process.env.JWT_SECRET;
    const refreshSecret = process.env.JWT_REFRESH_SECRET;

    if (!accessSecret || !refreshSecret) {
      throw new AppError("Lỗi hệ thống: JWT Secret chưa được cấu hình", 500);
    }

    const accessToken = jwt.sign(
      { sub: userId, role: user.role },
      accessSecret,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign({ sub: userId }, refreshSecret, {
      expiresIn: "7d",
    });

    // Quan trọng: Hàm create này bên Repository phải dùng findOneAndUpdate (Upsert)
    // Để ghi đè phiên đăng nhập cũ, tránh Duplicate Key lỗi E11000
    await this.refreshRepo.create({
      userId,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: userId,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    };
  }

  // Đăng xuất
  async logout(refreshToken: string) {
    if (!refreshToken) return;

    // Thu hồi refresh token
    await this.refreshRepo.revoke(refreshToken);
  }

  // Reset mật khẩu sau khi OTP đã xác thực
  async resetPassword(email: string, otp: string, newPassword: string) {
    const record = await this.otpRepo.findValidByEmail(email);
    if (!record) {
      throw new AppError("OTP không hợp lệ hoặc đã hết hạn", 400);
    }

    if (!record.verified) {
      throw new AppError("OTP chưa được xác thực", 400);
    }

    // Hash mật khẩu mới
    const passwordHash = await bcrypt.hash(newPassword, 10);

    // Cập nhật mật khẩu
    await this.userRepo.updateByEmail(email, { passwordHash });

    // Thu hồi toàn bộ refresh token (bảo mật)
    await this.refreshRepo.revokeAllByUser(email);

    // Xóa OTP
    await this.otpRepo.deleteByEmail(email);

    return true;
  }
}
