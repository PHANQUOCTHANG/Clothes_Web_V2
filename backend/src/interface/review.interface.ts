import { Document, Types } from "mongoose";

// Interface Review (Logic thuần)
export interface IReview {
  user: Types.ObjectId | string;
  product: Types.ObjectId | string;
  rating: number;
  comment?: string;
  images: string[]; // Mảng chứa URL các hình ảnh thực tế
  createdAt: Date;
}

// Interface Review Document (Dùng cho Model)
export interface IReviewDocument extends IReview, Document {
  id: string;
}
