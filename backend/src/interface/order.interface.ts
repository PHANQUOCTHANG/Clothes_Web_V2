import { Document, Types } from "mongoose";

export enum EPaymentMethod {
  COD = "COD",
  VNPAY = "VNPAY",
  MOMO = "MOMO",
}

export enum EOrderStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  SHIPPING = "SHIPPING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export interface IOrderItem {
  productId: Types.ObjectId | string;
  productName: string; // Lưu tên tại thời điểm mua
  size: string;
  color: string;
  price: number;       // Giá tại thời điểm mua
  quantity: number;
  totalPrice: number;  // price * quantity
}

export interface IOrder {
  orderCode: string;
  userId: Types.ObjectId | string;
  items: IOrderItem[];
  totalAmount: number;
  paymentMethod: EPaymentMethod;
  status: EOrderStatus;
  orderDate: Date;
}

export interface IOrderDocument extends IOrder, Document {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}