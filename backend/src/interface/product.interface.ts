import { Document, Types } from "mongoose";

// Interface Color
export interface IProductColor {
  name?: string;
  code?: string;
}

// Interface Product (Logic thuần)
export interface IProduct {
  name: string;
  nameNoAccent: string;
  price: number | Types.Decimal128;
  description?: string;
  images: string[];
  stock: number;
  status: 'active' | 'inactive' | 'pending';
  category: Types.ObjectId | string;
  slug: string;
  rating: number;
  amountBuy: number;
  productNew: boolean;
  discount: number;
  color?: IProductColor;
  size?: string;
  deleted: boolean;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// Interface Product Document (Mongo)
export interface IProductDocument extends IProduct, Document {
  id: string; // virtual id
}