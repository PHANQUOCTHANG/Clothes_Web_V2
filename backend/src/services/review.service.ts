import AppError from "@/utils/appError";
import { ReviewRepository } from "@/repositories/review.repository";
import { ProductRepository } from "@/repositories/product.repository";
import { CreateReviewRequestDto } from "@/dto/request/review.request";
import { IReviewDocument } from "@/interface/review.interface";
import { BaseQuery, IPaginatedResult } from "@/interface/query.interface";

export class ReviewService {
  constructor(
    private readonly reviewRepo: ReviewRepository,
    private readonly productRepo: ProductRepository
  ) {}

  // Tạo đánh giá mới và cập nhật Rating trung bình cho Product
  async createReview(userId: string, dto: CreateReviewRequestDto): Promise<IReviewDocument> {
    // Kiểm tra xem user đã đánh giá sản phẩm này chưa (Tránh spam)
    const existed = await this.reviewRepo.findOne({ user: userId, product: dto.product });
    if (existed) throw new AppError("Bạn đã đánh giá sản phẩm này rồi", 400);

    // Lưu review vào DB
    const review = await this.reviewRepo.create({ ...dto, user: userId });

    // Tính toán lại Rating trung bình từ Aggregation
    const stats = await this.reviewRepo.calculateAverageRating(dto.product);
    
    // Cập nhật điểm rating và số lượng đánh giá vào bảng Product
    await this.productRepo.updateById(dto.product, { 
      rating: Math.round(stats.avgRating * 10) / 10, // Làm tròn 1 chữ số thập phân (vd: 4.5)
      amountBuy: stats.totalReviews // Giả sử dùng amountBuy hoặc field tương đương để lưu số lượt review
    });

    return review;
  }

  // Lấy danh sách đánh giá có phân trang (Dành cho trang chi tiết sản phẩm)
  async getReviews(query: BaseQuery, productId?: string): Promise<IPaginatedResult<IReviewDocument>> {
    const filter = productId ? { product: productId } : {};
    return this.reviewRepo.findAll(query, filter);
  }

  // Xoá đánh giá và tính toán lại Rating
  async deleteReview(id: string): Promise<void> {
    const review = await this.reviewRepo.findById(id);
    if (!review) throw new AppError("Đánh giá không tồn tại", 404);

    const productId = review.product.toString();
    await this.reviewRepo.deleteById(id);

    // Tính toán lại sau khi xoá
    const stats = await this.reviewRepo.calculateAverageRating(productId);
    await this.productRepo.updateById(productId, { 
      rating: Math.round(stats.avgRating * 10) / 10 
    });
  }
}