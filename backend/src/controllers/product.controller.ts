import { Request, Response } from "express";
import asyncHandler from "@/utils/asyncHandler";
import { ProductService } from "@/services/product.service";
import { ProductResponseDto } from "@/dto/response/product.response";
import { normalizeQuery } from "@/interface/query.interface";

export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // POST /products - Tạo sản phẩm
  createProduct = asyncHandler(async (req: Request, res: Response) => {
    const product = await this.productService.createProduct(req.body);
    // Trả về dữ liệu thông qua Response DTO để lọc bớt trường nội bộ
    res.status(201).json(new ProductResponseDto(product));
  });

  // GET /products - Lấy danh sách (phân trang + search)
  getProducts = asyncHandler(async (req: Request, res: Response) => {
    const query = normalizeQuery(req.query); // Chuẩn hoá page, limit từ URL
    const result = await this.productService.getProducts(query);

    res.json({
      ...result,
      data: result.data.map(p => new ProductResponseDto(p)), // Map từng phần tử qua DTO
    });
  });

  // GET /products/:id - Lấy chi tiết
  getProductById = asyncHandler(async (req: Request, res: Response) => {
    const product = await this.productService.getProductById(req.params.id);
    res.json(new ProductResponseDto(product));
  });

  // PATCH /products/:id - Cập nhật
  updateProduct = asyncHandler(async (req: Request, res: Response) => {
    const product = await this.productService.updateProduct(req.params.id, req.body);
    res.json(new ProductResponseDto(product));
  });

  // DELETE /products/:id - Xoá (Soft delete)
  deleteProduct = asyncHandler(async (req: Request, res: Response) => {
    await this.productService.deleteProduct(req.params.id);
    res.status(204).send(); // Thành công nhưng không trả về nội dung
  });
}