import { IUserDocument } from "@/interface/user.interface";
import { Schema, model } from "mongoose";

// Schema địa chỉ (embedded)
const addressSchema = new Schema(
  {
    receiverName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    isDefault: { type: Boolean, default: false },
  },
  {
    _id: false, // không tạo _id cho address
  }
);

// User Schema
const userSchema = new Schema<IUserDocument>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true, // phục vụ search
    },

    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      // required: true,
      trim: true,
    },

    passwordHash: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["ADMIN", "STAFF", "CUSTOMER"],
      default: "CUSTOMER",
      index: true,
    },

    status: {
      type: String,
      enum: ["ACTIVE", "BLOCKED"],
      default: "ACTIVE",
      index: true,
    },

    addresses: {
      type: [addressSchema],
      default: [],
    },
  },
  {
    timestamps: true, // tự tạo createdAt, updatedAt
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual id để dùng user.id thay vì user._id
userSchema.virtual("id").get(function () {
  return this._id.toString();
});

export default model<IUserDocument>("User", userSchema);
