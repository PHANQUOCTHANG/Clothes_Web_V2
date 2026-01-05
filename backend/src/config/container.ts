// ==================== REPOSITORIES ====================
import {
  UserRepository,
  IUserRepository,
} from "@/repositories/user.repository";
import {
  CartRepository,
  ICartRepository,
} from "@/repositories/cart.repository";
import {
  CategoryRepository,
  ICategoryRepository,
} from "@/repositories/category.repository";
import { OtpRepository, IOtpRepository } from "@/repositories/otp.repository";
import {
  OrderRepository,
  IOrderRepository,
} from "@/repositories/order.repository";
import {
  ProductRepository,
  IProductRepository,
} from "@/repositories/product.repository";
import {
  ReviewRepository,
  IReviewRepository,
} from "@/repositories/review.repository";
import {
  RefreshTokenRepository,
  IRefreshTokenRepository,
} from "@/repositories/refreshToken.repository";

// ==================== SERVICES ====================
import { AuthService } from "@/services/auth.service";
import { CartService } from "@/services/cart.service";
import { CategoryService } from "@/services/category.service";
import { EmailService } from "@/services/email.service";
import { OtpService } from "@/services/otp.service";
import { OrderService } from "@/services/order.service";
import { ProductService } from "@/services/product.service";
import { ReviewService } from "@/services/review.service";
import { UserService } from "@/services/user.service";

// ==================== INITIALIZE REPOSITORIES ====================
const userRepository: IUserRepository = new UserRepository();
const cartRepository: ICartRepository = new CartRepository();
const categoryRepository: ICategoryRepository = new CategoryRepository();
const otpRepository: IOtpRepository = new OtpRepository();
const orderRepository: IOrderRepository = new OrderRepository();
const productRepository: IProductRepository = new ProductRepository();
const reviewRepository: IReviewRepository = new ReviewRepository();
const refreshTokenRepository: IRefreshTokenRepository =
  new RefreshTokenRepository();

// ==================== INITIALIZE SERVICES ====================
export const authService = new AuthService(
  userRepository,
  refreshTokenRepository,
  otpRepository
);

export const userService = new UserService(userRepository);

export const productService = new ProductService(productRepository);

export const categoryService = new CategoryService(categoryRepository);

export const cartService = new CartService(cartRepository);

export const orderService = new OrderService(
  orderRepository,
  cartRepository,
  productRepository
);

export const reviewService = new ReviewService(
  reviewRepository,
  productRepository
);

export const otpService = new OtpService(otpRepository, userRepository);

export const emailService = new EmailService();
