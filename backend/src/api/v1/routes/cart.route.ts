import { Router } from "express";
import { CartController } from "@/controllers/cart.controller";
import { CartService } from "@/services/cart.service";
import { CartRepository } from "@/repositories/cart.repository";
import validationMiddleware from "@/middleware/validate.middleware";
import { AddToCartRequestDto, UpdateCartItemDto } from "@/dto/request/cart.request";
// import authMiddleware from "@/middleware/auth.middleware"; 

const router = Router();

// Khởi tạo DI
const cartRepo = new CartRepository();
const cartService = new CartService(cartRepo);
const cartController = new CartController(cartService);

// // Áp dụng xác thực cho tất cả các hành động giỏ hàng
// router.use(authMiddleware);

router.get("/", cartController.getCart);

router.post(
  "/add", 
  validationMiddleware(AddToCartRequestDto), 
  cartController.addToCart
);

router.patch(
  "/update", 
  validationMiddleware(UpdateCartItemDto), 
  cartController.updateQuantity
);

router.post("/remove", cartController.removeFromCart); // Dùng post để truyền body phức tạp

export default router;