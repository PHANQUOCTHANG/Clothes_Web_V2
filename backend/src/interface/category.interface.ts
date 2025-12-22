import { Document } from "mongoose";

// Interface Category (Logic thuần)
export interface ICategory {
  name: string;
  nameNoAccent: string;
  images: string[];
  description?: string;
  image?: string;
  slug: string;
  deleted: boolean;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// Interface Category Document (Mongo)
export interface ICategoryDocument extends ICategory, Document {
  id: string; // virtual id
}