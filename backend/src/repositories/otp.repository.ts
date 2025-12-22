import { IOtp, IOtpDocument } from "@/interface/otp.interface";
import Otp from "@/models/otp.model";

export class OtpRepository {
  
  // Tạo Otp.
  async create(data: Partial<IOtp>): Promise<IOtpDocument> {
    return Otp.create(data);
  }

  // Tìm OTP còn hiệu lực (chưa hết hạn).
  async findValidByEmail(email: string): Promise<IOtpDocument | null> {
    return Otp.findOne({
      email,
      expiresAt: { $gt: new Date() },
      verified: false,
    }).sort({ createdAt: -1 }); // Lấy mã mới nhất
  }

  // Đánh dấu đã xác thực.
  async markVerified(id: string): Promise<void> {
    await Otp.findByIdAndUpdate(id, { verified: true });
  }

  // Xóa OTP cũ của email.
  async deleteByEmail(email: string): Promise<void> {
    await Otp.deleteMany({ email });
  }
}