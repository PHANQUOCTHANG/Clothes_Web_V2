import AppError from "@/utils/appError";
import { CartRepository } from "@/repositories/cart.repository";
import { AddToCartRequestDto, UpdateCartItemDto } from "@/dto/request/cart.request";
import { ICartDocument } from "@/interface/cart.interface";

export class CartService {
  constructor(private readonly cartRepo: CartRepository) {}

  // Lấy hoặc tạo mới giỏ hàng (Đảm bảo luôn có object để thao tác)
  async getOrCreateCart(userId: string): Promise<ICartDocument> {
    let cart = await this.cartRepo.findByUserId(userId);
    if (!cart) cart = await this.cartRepo.create(userId);
    return cart;
  }

  // Xử lý thêm sản phẩm: Trùng SKU thì tăng số lượng, không trùng thì push mới
  async addToCart(userId: string, dto: AddToCartRequestDto): Promise<ICartDocument> {
    const cart = await this.getOrCreateCart(userId);

    const existingIndex = cart.products.findIndex(
      (p) => p.productId === dto.productId && 
             p.color === dto.color && 
             p.size === dto.size
    );

    if (existingIndex > -1) {
      cart.products[existingIndex].quantity += dto.quantity;
    } else {
      cart.products.push(dto as any);
    }

    return this.cartRepo.save(cart);
  }

  // Cập nhật số lượng trực tiếp (Dùng cho input nhập số hoặc nút +/-)
  async updateQuantity(userId: string, dto: UpdateCartItemDto): Promise<ICartDocument> {
    const cart = await this.getOrCreateCart(userId);
    const item = cart.products.find(
      (p) => p.productId === dto.productId && 
             p.color === dto.color && 
             p.size === dto.size
    );

    if (!item) throw new AppError("Sản phẩm không có trong giỏ hàng", 404);
    
    item.quantity = dto.quantity || 1;
    return this.cartRepo.save(cart);
  }

  // Loại bỏ hoàn toàn 1 SKU khỏi giỏ
  async removeItem(userId: string, productId: string, color: string, size: string): Promise<ICartDocument> {
    const cart = await this.getOrCreateCart(userId);
    cart.products = cart.products.filter(
      (p) => !(p.productId === productId && p.color === color && p.size === size)
    );
    return this.cartRepo.save(cart);
  }
}