import mongoose, { Schema, Model } from "mongoose";
import { ICartDocument } from "@/interface/cart.interface";

const cartSchema = new Schema<ICartDocument>(
  {
    userId: { 
      type: Schema.Types.ObjectId, 
      ref: "User", 
      required: true, 
      unique: true // Mỗi User chỉ có duy nhất một giỏ hàng
    },
    products: [
      {
        productId: { 
          type: Schema.Types.ObjectId, 
          ref: "Product", 
          required: true 
        },
        quantity: { 
          type: Number, 
          default: 1, 
          min: [1, "Số lượng không thể nhỏ hơn 1"] 
        },
        color: { type: String, required: true },
        size: { type: String, required: true },
      },
    ],
  },
  { 
    timestamps: true, // Tự động tạo createdAt và updatedAt
    versionKey: false 
  }
);

const Cart: Model<ICartDocument> = mongoose.model<ICartDocument>("Cart", cartSchema, "cart");
export default Cart;