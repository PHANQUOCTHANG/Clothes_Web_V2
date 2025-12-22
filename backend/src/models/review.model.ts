import mongoose, { Schema, Model } from 'mongoose';
import { IReviewDocument } from '@/interface/review.interface';

const ReviewSchema: Schema<IReviewDocument> = new Schema({
    // Tham chiếu đến người dùng đánh giá
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    // Tham chiếu đến sản phẩm được đánh giá
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true, 
    },
    // Điểm số từ 1 đến 5 sao
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    // Nội dung bình luận
    comment: {
        type: String,
        trim: true,
        maxlength: 500,
    },
    // Danh sách các ảnh thực tế (URL)
    images: {
        type: [String],
        default: [],
    },
}, { 
    timestamps: true,
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true, getters: true }
});

// Virtual ID để đồng bộ với motif User/Product
ReviewSchema.virtual("id").get(function () {
    return this._id.toString();
});

// Đảm bảo mỗi User chỉ đánh giá một sản phẩm duy nhất 1 lần
ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

const Review: Model<IReviewDocument> = mongoose.model<IReviewDocument>('Review', ReviewSchema);
export default Review;