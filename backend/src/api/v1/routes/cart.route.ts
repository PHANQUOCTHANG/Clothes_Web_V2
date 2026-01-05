import { Router } from "express";
import * as cartCtrl from "@/controllers/cart.controller";
import validationMiddleware from "@/middleware/validate.middleware";
import {
  AddToCartRequestDto,
  UpdateCartItemDto,
} from "@/dto/request/cart.request";

const router = Router();

/**
 * @swagger
 * /api/v1/cart:
 * get:
 * summary: Lấy giỏ hàng của người dùng hiện tại
 * tags: [Cart]
 * security:
 * - bearerAuth: []
 * responses:
 * 200:
 * description: Thành công
 */
// URL: /api/v1/cart
router.get("/", cartCtrl.getCart);

/**
 * @swagger
 * /api/v1/cart/add:
 * post:
 * summary: Thêm sản phẩm vào giỏ hàng
 * tags: [Cart]
 * security:
 * - bearerAuth: []
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/AddToCartRequestDto'
 * responses:
 * 200:
 * description: Đã thêm vào giỏ hàng
 */
// URL: /api/v1/cart/add
router.post(
  "/add",
  validationMiddleware(AddToCartRequestDto),
  cartCtrl.addToCart
);

/**
 * @swagger
 * /api/v1/cart/update:
 * patch:
 * summary: Cập nhật số lượng sản phẩm trong giỏ
 * tags: [Cart]
 * security:
 * - bearerAuth: []
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/UpdateCartItemDto'
 * responses:
 * 200:
 * description: Đã cập nhật số lượng
 */
// URL: /api/v1/cart/update
router.patch(
  "/update",
  validationMiddleware(UpdateCartItemDto),
  cartCtrl.updateCart
);

/**
 * @swagger
 * /api/v1/cart/remove:
 * delete:
 * summary: Xóa sản phẩm khỏi giỏ hàng
 * tags: [Cart]
 * security:
 * - bearerAuth: []
 * responses:
 * 200:
 * description: Đã xóa thành công
 */
// URL: /api/v1/cart/remove
router.delete("/remove", cartCtrl.removeFromCart);

export default router;