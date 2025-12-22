import { Router } from "express";
import { ProductController } from "@/controllers/product.controller";
import { ProductService } from "@/services/product.service";
import { ProductRepository } from "@/repositories/product.repository";
import validationMiddleware from "@/middleware/validate.middleware";
import { CreateProductRequestDto, UpdateProductRequestDto } from "@/dto/request/product.request";

const router = Router();

// Khởi tạo Dependency Injection thủ công theo motif User
const productRepo = new ProductRepository();
const productService = new ProductService(productRepo);
const productController = new ProductController(productService);

// Định nghĩa các Routes
router.post(
  "/", 
  validationMiddleware(CreateProductRequestDto), // Kiểm tra dữ liệu đầu vào
  productController.createProduct
);

router.get("/", productController.getProducts);

router.get("/:id", productController.getProductById);

router.patch(
  "/:id",
  validationMiddleware(UpdateProductRequestDto, true), // Validate với chế độ bỏ qua các trường thiếu (update partial)
  productController.updateProduct
);

router.delete("/:id", productController.deleteProduct);

export default router;