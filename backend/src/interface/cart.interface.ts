import { Document, Types } from "mongoose";

export interface ICartProduct {
  productId: Types.ObjectId | string;
  quantity: number;
  color: string;
  size: string;
}

export interface ICart {
  userId: Types.ObjectId | string;
  products: ICartProduct[];
}

export interface ICartDocument extends ICart, Document {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}