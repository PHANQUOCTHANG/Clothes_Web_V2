import bcrypt from "bcrypt";
import AppError from "@/utils/appError";
import { OtpRepository } from "@/repositories/otp.repository";
import { UserRepository } from "@/repositories/user.repository";
import emailService from "@/services/email.service";

export class OtpService {
  // Dependency Injection: Tiêm các Repository cần thiết
  constructor(
    private readonly otpRepo: OtpRepository,
    private readonly userRepo: UserRepository
  ) {}

  // Chức năng: Xử lý quy trình gửi OTP
  async sendOtp(email: string): Promise<boolean> {
    // 1. Kiểm tra tài khoản tồn tại
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new AppError("Email không tồn tại trên hệ thống.", 404);

    // 2. Tạo mã 6 số ngẫu nhiên
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // 3. Bảo mật: Hash OTP trước khi lưu xuống Database
    const otpHash = await bcrypt.hash(otp, 10);

    // 4. Dọn dẹp: Xóa các yêu cầu OTP cũ của email này (nếu có)
    await this.otpRepo.deleteByEmail(email);

    // 5. Lưu trữ: Tạo bản ghi OTP mới với thời hạn 5 phút
    await this.otpRepo.create({
      email,
      otpHash,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      verified: false
    });

    // 6. Thực thi: Gửi mail (Nếu lỗi mail thì rollback xóa OTP trong DB)
    try {
      await emailService.sendOtpEmail(email, otp);
    } catch (error) {
      await this.otpRepo.deleteByEmail(email);
      throw error;
    }

    return true;
  }

  // Chức năng: Xác thực mã OTP người dùng gửi lên
  async verifyOtp(email: string, otp: string): Promise<boolean> {
    // 1. Tìm bản ghi OTP hợp lệ (Chưa hết hạn)
    const record = await this.otpRepo.findValidByEmail(email);
    if (!record) throw new AppError("Mã OTP đã hết hạn hoặc không tồn tại.", 400);

    // 2. Kiểm tra xem mã đã được sử dụng trước đó chưa
    if (record.verified) throw new AppError("Mã OTP này đã được sử dụng.", 400);

    // 3. So sánh mã người dùng nhập với bản hash trong DB
    const isValid = await bcrypt.compare(otp, record.otpHash);
    if (!isValid) throw new AppError("Mã OTP không chính xác.", 400);

    // 4. Đánh dấu đã xác thực thành công
    await this.otpRepo.markVerified(record.id);

    return true;
  }
}