import { Schema, model } from "mongoose";
import { IProductDocument } from "@/interface/product.interface";

// Product Schema
const productSchema = new Schema<IProductDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    nameNoAccent: {
      type: String,
      index: true,
    },
    price: {
      type: Schema.Types.Decimal128,
      required: true,
      default: 0,
      // Getter chuyển Decimal128 sang Number khi truy vấn
      get: (v: any) => (v ? parseFloat(v.toString()) : 0),
    },
    description: {
      type: String,
    },
    images: {
      type: [String],
      default: [],
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'pending'],
      default: "active",
      index: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
      index: true,
    },
    slug: {
      type: String,
      unique: true,
      sparse: true,
    },
    rating: {
      type: Number,
      default: 5,
      min: 0,
      max: 5,
    },
    amountBuy: {
      type: Number,
      default: 0,
      min: 0,
    },
    productNew: {
      type: Boolean,
      default: true,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    color: {
      name: { type: String },
      code: { type: String },
    },
    size: {
      type: String,
    },
    deleted: {
      type: Boolean,
      default: false,
      select: false, // Ẩn mặc định
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true, getters: true },
  }
);

// Virtual id để dùng product.id thay vì product._id
productSchema.virtual("id").get(function () {
  return this._id.toString();
});

// // Query Middleware: Tự động lọc các sản phẩm chưa bị xóa mềm
// productSchema.pre(/^find/, function (next) {
//   this.$where({ deleted: { $ne: true } });
//   next();
// });

export default model<IProductDocument>("Product", productSchema);