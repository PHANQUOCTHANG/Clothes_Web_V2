import { Request, Response } from "express";
import asyncHandler from "@/utils/asyncHandler";
import { ReviewService } from "@/services/review.service";
import { ReviewResponseDto } from "@/dto/response/review.response";
import { normalizeQuery } from "@/interface/query.interface";

export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  // POST /reviews
  createReview = asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as any).user.id; // Lấy từ authMiddleware
    const review = await this.reviewService.createReview(userId, req.body);
    res.status(201).json(new ReviewResponseDto(review));
  });

  // GET /reviews/product/:productId
  getProductReviews = asyncHandler(async (req: Request, res: Response) => {
    const query = normalizeQuery(req.query);
    const result = await this.reviewService.getReviews(query, req.params.productId);

    res.json({
      ...result,
      data: result.data.map(rev => new ReviewResponseDto(rev)),
    });
  });

  // DELETE /reviews/:id
  deleteReview = asyncHandler(async (req: Request, res: Response) => {
    await this.reviewService.deleteReview(req.params.id);
    res.status(204).send();
  });
}