import { BaseQuery, IPaginatedResult } from "@/interface/query.interface";
import { ICategory, ICategoryDocument } from "@/interface/category.interface";
import Category from "@/models/category.model";

export class CategoryRepository {
  // Tạo danh mục
  async create(data: Partial<ICategory>): Promise<ICategoryDocument> {
    return Category.create(data);
  }

  // Tìm theo ID
  async findById(id: string): Promise<ICategoryDocument | null> {
    return Category.findById(id);
  }

  // Tìm theo Name (kiểm tra trùng)
  async findByName(name: string): Promise<ICategoryDocument | null> {
    return Category.findOne({ name });
  }

  // Cập nhật
  async updateById(id: string, data: Partial<ICategory>): Promise<ICategoryDocument | null> {
    return Category.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  // Xóa mềm
  async softDelete(id: string): Promise<void> {
    await Category.findByIdAndUpdate(id, { deleted: true, deletedAt: new Date() });
  }

  // Lấy danh sách có phân trang + search
  async findAll(query: BaseQuery): Promise<IPaginatedResult<ICategoryDocument>> {
    const { page, limit, search, sort } = query;
    const filter: any = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { nameNoAccent: { $regex: search, $options: "i" } }
      ];
    }

    const [data, total] = await Promise.all([
      Category.find(filter).sort(sort).skip((page - 1) * limit).limit(limit),
      Category.countDocuments(filter),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }
}