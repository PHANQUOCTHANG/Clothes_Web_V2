import { ICartDocument } from "@/interface/cart.interface";
import Cart from "@/models/cart.model";

export class CartRepository {
  // Tìm giỏ hàng và nạp chi tiết sản phẩm để FE hiển thị ngay
  async findByUserId(userId: string): Promise<ICartDocument | null> {
    return Cart.findOne({ userId }).populate({
      path: "products.productId",
      select: "name price images slug quantity", // Lấy quantity của Product để check stock
    });
  }

  // Khởi tạo giỏ hàng trống cho User
  async create(userId: string): Promise<ICartDocument> {
    return Cart.create({ userId, products: [] });
  }

  // Lưu lại các thay đổi sau khi Service xử lý logic
  async save(cart: ICartDocument): Promise<ICartDocument> {
    return cart.save();
  }

  // Xóa sạch giỏ hàng (Sau khi checkout thành công)
  async clear(userId: string): Promise<void> {
    await Cart.findOneAndUpdate({ userId }, { products: [] });
  }
}