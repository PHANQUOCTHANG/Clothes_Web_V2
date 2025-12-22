import AppError from "@/utils/appError";
import { CategoryRepository } from "@/repositories/category.repository";
import { CreateCategoryRequestDto, UpdateCategoryRequestDto } from "@/dto/request/category.request";
import { ICategoryDocument } from "@/interface/category.interface";
import { BaseQuery, IPaginatedResult } from "@/interface/query.interface";
import slugify from "slugify";

export class CategoryService {
  constructor(private readonly categoryRepo: CategoryRepository) {}

  async createCategory(dto: CreateCategoryRequestDto): Promise<ICategoryDocument> {
    // Kiểm tra trùng tên
    const existed = await this.categoryRepo.findByName(dto.name);
    if (existed) throw new AppError("Tên danh mục đã tồn tại", 400);

    const slug = slugify(dto.name, { lower: true, strict: true });
    const nameNoAccent = dto.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    return this.categoryRepo.create({ ...dto, slug, nameNoAccent });
  }

  async getCategories(query: BaseQuery): Promise<IPaginatedResult<ICategoryDocument>> {
    return this.categoryRepo.findAll(query);
  }

  async getCategoryById(id: string): Promise<ICategoryDocument> {
    const category = await this.categoryRepo.findById(id);
    if (!category) throw new AppError("Danh mục không tìm thấy", 404);
    return category;
  }

  async updateCategory(id: string, dto: UpdateCategoryRequestDto): Promise<ICategoryDocument> {
    const updateData: any = { ...dto };
    if (dto.name) {
      updateData.slug = slugify(dto.name, { lower: true, strict: true });
      updateData.nameNoAccent = dto.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
    const category = await this.categoryRepo.updateById(id, updateData);
    if (!category) throw new AppError("Danh mục không tìm thấy", 404);
    return category;
  }

  async deleteCategory(id: string): Promise<void> {
    const category = await this.categoryRepo.findById(id);
    if (!category) throw new AppError("Danh mục không tìm thấy", 404);
    await this.categoryRepo.softDelete(id);
  }
}