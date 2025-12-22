import { Router } from "express";
import { ReviewController } from "@/controllers/review.controller";
import { ReviewService } from "@/services/review.service";
import { ReviewRepository } from "@/repositories/review.repository";
import { ProductRepository } from "@/repositories/product.repository";
import validationMiddleware from "@/middleware/validate.middleware";
import { CreateReviewRequestDto } from "@/dto/request/review.request";

const router = Router();

// Khởi tạo Dependency Injection thủ công
const reviewRepo = new ReviewRepository();
const productRepo = new ProductRepository();
const reviewService = new ReviewService(reviewRepo, productRepo);
const reviewController = new ReviewController(reviewService);

// Gửi đánh giá mới - Lưu thông tin và cập nhật điểm Rating sản phẩm
router.post(
  "/",
  // authMiddleware, // Cần thêm để xác thực người dùng
  validationMiddleware(CreateReviewRequestDto),
  reviewController.createReview
);

// Lấy danh sách đánh giá của một sản phẩm - Hỗ trợ phân trang và tìm kiếm bình luận
router.get(
  "/:productId",
  reviewController.getProductReviews
);

// Xóa đánh giá - Tự động tính toán lại điểm Rating sau khi xóa
router.delete(
  "/:id",
  // authMiddleware, // Chỉ cho phép Admin hoặc chủ nhân đánh giá xoá
  reviewController.deleteReview
);

export default router;