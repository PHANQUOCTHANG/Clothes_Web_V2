import { BaseQuery, IPaginatedResult } from "@/interface/query.interface";
import { IReview, IReviewDocument } from "@/interface/review.interface";
import Review from "@/models/review.model";
import mongoose from "mongoose";

export class ReviewRepository {
  // Tạo đánh giá mới
  async create(data: Partial<IReview>): Promise<IReviewDocument> {
    return Review.create(data);
  }

  // Tìm một đánh giá dựa trên filter (ví dụ: check một user đã đánh giá product này chưa)
  async findOne(filter: object): Promise<IReviewDocument | null> {
    return Review.findOne(filter).populate("user", "fullName");
  }

  // Tìm đánh giá theo ID
  async findById(id: string): Promise<IReviewDocument | null> {
    return Review.findById(id).populate("user", "fullName");
  }

  // Cập nhật đánh giá
  async updateById(id: string, data: Partial<IReview>): Promise<IReviewDocument | null> {
    return Review.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  // Xóa đánh giá (Review thường xóa cứng hoặc bạn có thể dùng soft delete nếu muốn)
  async deleteById(id: string): Promise<void> {
    await Review.findByIdAndDelete(id);
  }

  // Lấy danh sách review có phân trang + populate thông tin user/product
  async findAll(query: BaseQuery, filter: object = {}): Promise<IPaginatedResult<IReviewDocument>> {
    const { page, limit, sort, search } = query;

    // Nếu có search, tìm kiếm trong nội dung comment
    const finalFilter: any = { ...filter };
    if (search) {
      finalFilter.comment = { $regex: search, $options: "i" };
    }

    const [data, total] = await Promise.all([
      Review.find(finalFilter)
        .sort(sort || { createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate("user", "fullName")
        .populate("product", "name"),
      Review.countDocuments(finalFilter),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // Tính toán lại Rating trung bình bằng MongoDB Aggregation
  async calculateAverageRating(productId: string): Promise<{ avgRating: number; totalReviews: number }> {
    const stats = await Review.aggregate([
      {
        $match: {
          product: new mongoose.Types.ObjectId(productId),
        },
      },
      {
        $group: {
          _id: "$product",
          avgRating: { $avg: "$rating" },
          totalReviews: { $sum: 1 },
        },
      },
    ]);

    // Trả về kết quả mặc định nếu chưa có review nào
    if (stats.length > 0) {
      return {
        avgRating: stats[0].avgRating,
        totalReviews: stats[0].totalReviews,
      };
    }

    return { avgRating: 0, totalReviews: 0 };
  }
}