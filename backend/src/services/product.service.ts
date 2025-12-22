import AppError from "@/utils/appError";
import { ProductRepository } from "@/repositories/product.repository";
import { CreateProductRequestDto, UpdateProductRequestDto } from "@/dto/request/product.request";
import { IProductDocument } from "@/interface/product.interface";
import { BaseQuery, IPaginatedResult } from "@/interface/query.interface";
import slugify from "slugify";

export class ProductService {
  constructor(private readonly productRepo: ProductRepository) {}

  // Xử lý logic khi tạo mới sản phẩm
  async createProduct(dto: CreateProductRequestDto): Promise<IProductDocument> {
    // 1. Tự động tạo slug thân thiện cho SEO (ví dụ: "Áo Polo" -> "ao-polo")
    const slug = slugify(dto.name, { lower: true, strict: true });
    
    // 2. Chuyển tên có dấu thành không dấu để hỗ trợ tìm kiếm nhanh hơn
    const nameNoAccent = dto.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    return this.productRepo.create({
      ...dto,
      slug,
      nameNoAccent,
    });
  }

  // Lấy danh sách sản phẩm
  async getProducts(query: BaseQuery): Promise<IPaginatedResult<IProductDocument>> {
    return this.productRepo.findAll(query);
  }

  // Lấy chi tiết sản phẩm, quăng lỗi 404 nếu không thấy
  async getProductById(id: string): Promise<IProductDocument> {
    const product = await this.productRepo.findById(id);
    if (!product) throw new AppError("Sản phẩm không tồn tại", 404);
    return product;
  }

  // Cập nhật sản phẩm và làm mới lại slug nếu người dùng đổi tên
  async updateProduct(id: string, dto: UpdateProductRequestDto): Promise<IProductDocument> {
    const updateData: any = { ...dto };
    
    // Nếu có đổi tên thì phải update lại cả slug và nameNoAccent
    if (dto.name) {
      updateData.slug = slugify(dto.name, { lower: true, strict: true });
      updateData.nameNoAccent = dto.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    const product = await this.productRepo.updateById(id, updateData);
    if (!product) throw new AppError("Sản phẩm không tồn tại", 404);
    return product;
  }

  // Kiểm tra tồn tại trước khi tiến hành xoá mềm
  async deleteProduct(id: string): Promise<void> {
    const product = await this.productRepo.findById(id);
    if (!product) throw new AppError("Sản phẩm không tồn tại", 404);
    
    await this.productRepo.softDelete(id);
  }
}