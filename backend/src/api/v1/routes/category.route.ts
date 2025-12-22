import { Router } from "express";
import { CategoryController } from "@/controllers/category.controller";
import { CategoryService } from "@/services/category.service";
import { CategoryRepository } from "@/repositories/category.repository";
import validationMiddleware from "@/middleware/validate.middleware";
import { CreateCategoryRequestDto, UpdateCategoryRequestDto } from "@/dto/request/category.request";

const router = Router();

const categoryRepo = new CategoryRepository();
const categoryService = new CategoryService(categoryRepo);
const categoryController = new CategoryController(categoryService);

// Tạo danh mục mới - Kiểm tra dữ liệu đầu vào qua DTO
router.post(
  "/", 
  validationMiddleware(CreateCategoryRequestDto), 
  categoryController.createCategory
);

// Lấy danh sách danh mục - Hỗ trợ phân trang và tìm kiếm
router.get("/", categoryController.getCategories);

// Lấy thông tin chi tiết danh mục theo ID
router.get("/:id", categoryController.getCategoryById);

// Cập nhật thông tin danh mục - Validate dữ liệu gửi lên (cho phép cập nhật một phần)
router.patch(
  "/:id",
  validationMiddleware(UpdateCategoryRequestDto, true),
  categoryController.updateCategory
);

// Xóa danh mục - Thực hiện xóa mềm (Soft Delete) trong database
router.delete("/:id", categoryController.deleteCategory);

export default router;