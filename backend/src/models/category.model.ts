import mongoose, { Schema } from "mongoose";
import { ICategoryDocument } from "@/interface/category.interface"; // Giả định đã có interface

const categorySchema: Schema<ICategoryDocument> = new mongoose.Schema({
    // Tên danh mục (Name)
    name: {
        type: String, 
        required: true, // Bắt buộc
        unique: true,  // Tên danh mục phải là duy nhất
        trim: true,
    },
    // Tên không dấu (dùng cho tìm kiếm/slug)
    nameNoAccent: {
        type: String,
        index: true, // Tạo index cho tìm kiếm
    },
    images: {
        type: [String],
        default: [],
    },
    description: String,
    image: String, 
    slug: {
        type: String,
        unique: true, // Slug phải là duy nhất
        sparse: true,
    },
    // Xóa mềm (Soft Delete)
    deleted: {
        type: Boolean,
        default: false,
        select: false, // Không trả về trường này theo mặc định
    },
    deletedAt: {
        type: Date,
        default: null,
    },
} , {
    timestamps: true, // Tự động thêm createdAt và updatedAt
});


const Category = mongoose.model<ICategoryDocument>("Category", categorySchema, "category");

export default Category;