import { IReviewDocument } from "@/interface/review.interface";

export class ReviewResponseDto {
  id: string;
  user: any; // Thông tin User (thường được populate fullName, avatar)
  product: string;
  rating: number;
  comment: string;
  images: string[];
  createdAt: Date;

  constructor(review: IReviewDocument) {
    this.id = review.id;
    this.user = review.user;
    this.product = review.product.toString();
    this.rating = review.rating;
    this.comment = review.comment || "";
    this.images = review.images || [];
    this.createdAt = review.createdAt;
  }
}