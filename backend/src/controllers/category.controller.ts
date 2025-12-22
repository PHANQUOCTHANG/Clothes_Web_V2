import { Request, Response } from "express";
import asyncHandler from "@/utils/asyncHandler";
import { CategoryService } from "@/services/category.service";
import { CategoryResponseDto } from "@/dto/response/category.response";
import { normalizeQuery } from "@/interface/query.interface";

export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // POST /categories - Tạo danh mục mới
  createCategory = asyncHandler(async (req: Request, res: Response) => {
    const category = await this.categoryService.createCategory(req.body);
    // Trả về dữ liệu đã được lọc qua DTO
    res.status(201).json(new CategoryResponseDto(category));
  });

  // GET /categories - Lấy danh sách danh mục (phân trang + search)
  getCategories = asyncHandler(async (req: Request, res: Response) => {
    const query = normalizeQuery(req.query); // Chuẩn hóa page, limit từ URL
    const result = await this.categoryService.getCategories(query);

    res.json({
      ...result,
      data: result.data.map(cat => new CategoryResponseDto(cat)),
    });
  });

  // GET /categories/:id - Lấy chi tiết một danh mục
  getCategoryById = asyncHandler(async (req: Request, res: Response) => {
    const category = await this.categoryService.getCategoryById(req.params.id);
    res.json(new CategoryResponseDto(category));
  });

  // PATCH /categories/:id - Cập nhật thông tin danh mục
  updateCategory = asyncHandler(async (req: Request, res: Response) => {
    const category = await this.categoryService.updateCategory(req.params.id, req.body);
    res.json(new CategoryResponseDto(category));
  });

  // DELETE /categories/:id - Xóa mềm danh mục
  deleteCategory = asyncHandler(async (req: Request, res: Response) => {
    await this.categoryService.deleteCategory(req.params.id);
    res.status(204).send(); // Thành công nhưng không trả nội dung
  });
}