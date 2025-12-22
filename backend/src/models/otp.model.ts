// models/otp.model.ts
import { Schema, model } from "mongoose";

const otpSchema = new Schema(
  {
    // Email dùng để gắn OTP (reset password)
    email: {
      type: String,
      required: true,
      index: true,
    },

    // OTP đã được hash (không lưu OTP plain)
    otpHash: {
      type: String,
      required: true,
    },

    // Thời điểm hết hạn OTP
    expiresAt: {
      type: Date,
      required: true,
      // TTL index: MongoDB tự xóa document khi quá hạn
      expires: 0,
    },

    // Đánh dấu OTP đã được xác thực hay chưa
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: "otps",
  }
);

export default model("Otp", otpSchema);
