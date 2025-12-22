import { IChatDocument } from "@/interface/chat.interface";
import mongoose, { Schema } from "mongoose";

const chatSchema: Schema<IChatDocument> = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // Tham chiếu đến người dùng
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'system'], // Chỉ cho phép các giá trị này
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    timeAdminAccess: {
        type: Date,
        default: null,
    },
    deleted: {
        type: Boolean,
        default: false,
        select: false,
    },
    deletedAt: { // Tên trường được chuẩn hóa
        type: Date,
        default: null,
    },
}, {
    timestamps: true, // Tự động thêm createdAt và updatedAt
});

const Chat = mongoose.model<IChatDocument>("Chat", chatSchema, "chat");

export default Chat;