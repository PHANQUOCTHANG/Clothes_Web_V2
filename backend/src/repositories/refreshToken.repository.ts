import RefreshTokenModel from "@/models/refreshToken.model";

export class RefreshTokenRepository {
  // Thay đổi: Sử dụng findOneAndUpdate với upsert
  async create(data: any) {
    return RefreshTokenModel.findOneAndUpdate(
      { userId: data.userId }, // Tìm theo userId
      { 
        token: data.token, 
        expiresAt: data.expiresAt, 
        revoked: false // Reset trạng thái khi login mới
      },
      { 
        upsert: true,     // Nếu không tìm thấy thì tạo mới
        new: true,        // Trả về bản ghi mới sau khi cập nhật
        setDefaultsOnInsert: true 
      }
    );
  }

  // Tìm refresh token hợp lệ (Giữ nguyên)
  async findValid(token: string) {
    return RefreshTokenModel.findOne({ token, revoked: false });
  }

  // Thu hồi refresh token (Giữ nguyên)
  async revoke(token: string) {
    return RefreshTokenModel.updateOne({ token }, { revoked: true });
  }

  // Thu hồi tất cả token của user (Giữ nguyên - hữu ích khi đổi pass)
  async revokeAllByUser(userId: string) {
    return RefreshTokenModel.updateMany({ userId }, { revoked: true });
  }
}