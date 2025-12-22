import { ICategoryDocument } from "@/interface/category.interface";

export class CategoryResponseDto {
  id: string;
  name: string;
  slug: string;
  images: string[];
  image: string;
  description: string;
  createdAt: Date;

  constructor(category: ICategoryDocument) {
    this.id = category.id;
    this.name = category.name;
    this.slug = category.slug;
    this.images = category.images || [];
    this.image = category.image || "";
    this.description = category.description || "";
    this.createdAt = category.createdAt;
  }
}