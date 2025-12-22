import { IProductDocument } from "@/interface/product.interface";

export class ProductResponseDto {
  id: string;
  name: string;
  slug: string;
  price: number;
  discount: number;
  finalPrice: number;
  description: string;
  images: string[];
  stock: number;
  status: string;
  category: any;
  rating: number;
  amountBuy: number;
  productNew: boolean;
  color: any;
  size: string;
  createdAt: Date;
  updatedAt: Date;

  // Map dữ liệu an toàn cho client giống motif User
  constructor(product: IProductDocument) {
    this.id = product.id; // virtual id
    this.name = product.name;
    this.slug = product.slug;
    
    // Xử lý Decimal128 an toàn
    const basePrice = product.price ? Number(product.price.toString()) : 0;
    this.price = basePrice;
    this.discount = product.discount || 0;
    
    // Logic tính giá cuối cùng
    this.finalPrice = basePrice * (1 - this.discount / 100);
    
    this.description = product.description || "";
    this.images = product.images || [];
    this.stock = product.stock || 0;
    this.status = product.status;
    this.category = product.category;
    this.rating = product.rating || 0;
    this.amountBuy = product.amountBuy || 0;
    this.productNew = product.productNew;
    this.color = product.color;
    this.size = product.size || "";
    this.createdAt = product.createdAt;
    this.updatedAt = product.updatedAt;
  }
}