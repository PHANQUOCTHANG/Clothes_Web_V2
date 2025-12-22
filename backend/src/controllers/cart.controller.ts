import { Request, Response } from "express";
import asyncHandler from "@/utils/asyncHandler";
import { CartService } from "@/services/cart.service";

export class CartController {
  constructor(private readonly cartService: CartService) {}

  // GET /cart
  getCart = asyncHandler(async (req: any, res: Response) => {
    const cart = await this.cartService.getOrCreateCart(req.user.id);
    res.status(200).json({ status: "success", data: cart });
  });

  // POST /cart/add
  addToCart = asyncHandler(async (req: any, res: Response) => {
    const cart = await this.cartService.addToCart(req.user.id, req.body);
    res.status(200).json({ status: "success", data: cart });
  });

  // PATCH /cart/update
  updateQuantity = asyncHandler(async (req: any, res: Response) => {
    const cart = await this.cartService.updateQuantity(req.user.id, req.body);
    res.status(200).json({ status: "success", data: cart });
  });

  // DELETE /cart/remove
  removeFromCart = asyncHandler(async (req: any, res: Response) => {
    const { productId, color, size } = req.body;
    const cart = await this.cartService.removeItem(req.user.id, productId, color, size);
    res.status(200).json({ status: "success", data: cart });
  });
}