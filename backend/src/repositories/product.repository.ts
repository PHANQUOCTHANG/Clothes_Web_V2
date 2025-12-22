import { BaseQuery, IPaginatedResult } from "@/interface/query.interface";
import { IProduct, IProductDocument } from "@/interface/product.interface";
import Product from "@/models/product.model";

export class ProductRepository {
  // Tạo sản phẩm mới vào Database
  async create(data: Partial<IProduct>): Promise<IProductDocument> {
    return Product.create(data);
  }

  // Tìm sản phẩm theo ID và nạp luôn thông tin Category (populate)
  async findById(id: string): Promise<IProductDocument | null> {
    return Product.findById(id).populate("category");
  }

  // Cập nhật sản phẩm theo ID, trả về data mới sau khi update
  async updateById(id: string, data: Partial<IProduct>): Promise<IProductDocument | null> {
    return Product.findByIdAndUpdate(id, data, { 
      new: true, // Trả về document mới
      runValidators: true // Đảm bảo dữ liệu update vẫn thoả mãn Schema
    });
  }

  // Xử lý xoá mềm bằng cách cập nhật flag 'deleted' và thời gian xoá
  async softDelete(id: string): Promise<void> {
    await Product.findByIdAndUpdate(id, { 
      deleted: true, 
      deletedAt: new Date() 
    });
  }

  // Lấy danh sách có phân trang, tìm kiếm theo tên (có dấu và không dấu)
  async findAll(query: BaseQuery): Promise<IPaginatedResult<IProductDocument>> {
    const { page, limit, search, sort } = query;

    // Filter mặc định chỉ lấy sản phẩm chưa bị xoá (logic này đã có ở middleware model nhưng viết ở đây cho chắc chắn)
    const filter: any = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } }, // Tìm theo tên gốc
        { nameNoAccent: { $regex: search, $options: "i" } }, // Tìm theo tên không dấu
      ];
    }

    // Chạy song song truy vấn data và đếm tổng số bản ghi để tăng hiệu năng
    const [data, total] = await Promise.all([
      Product.find(filter)
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(limit)
        .populate("category"),
      Product.countDocuments(filter),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}