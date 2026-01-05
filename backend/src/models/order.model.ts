import {
  EOrderStatus,
  EPaymentMethod,
  IOrderDocument,
} from "@/interface/order.interface";
import mongoose, { Schema, Model } from "mongoose";

const OrderSchema: Schema<IOrderDocument> = new Schema(
  {
    // Mã đơn hàng dễ đọc (vd: ORD-170345678)
    orderCode: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product" },
        productName: { type: String, required: true },
        size: { type: String, required: true },
        color: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true, min: 1 },
        totalPrice: { type: Number, required: true },
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: Object.values(EPaymentMethod),
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(EOrderStatus),
      default: EOrderStatus.PENDING,
    },

    orderDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual ID để đồng bộ với motif Project
OrderSchema.virtual("id").get(function (this: IOrderDocument) {
  return this._id.toString();
});

const Order: Model<IOrderDocument> = mongoose.model<IOrderDocument>(
  "Order",
  OrderSchema
);
export default Order;
