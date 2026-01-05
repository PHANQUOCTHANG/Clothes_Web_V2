import { cartService } from "@/config/container";
import asyncHandler from "@/utils/asyncHandler";
import { Request, Response } from "express";

// GET | /api/v1/cart | Lấy giỏ hàng của người dùng hiện tại
export const getCart = asyncHandler(async (req: any, res: Response) => {
  const data = await cartService.findByUserId(req.user.id);

  res.status(200).json({
    status: "success",
    data,
  });
});

// POST | /api/v1/cart/add | Thêm sản phẩm mới vào giỏ hàng
export const addToCart = asyncHandler(async (req: any, res: Response) => {
  const data = await cartService.add(req.user.id, req.body);

  res.status(200).json({
    status: "success",
    data,
  });
});

// PATCH | /api/v1/cart/update | Cập nhật số lượng của một sản phẩm trong giỏ
export const updateCart = asyncHandler(async (req: any, res: Response) => {
  const data = await cartService.update(req.user.id, req.body);

  res.status(200).json({
    status: "success",
    data,
  });
});

// DELETE | /api/v1/cart/remove | Xóa một sản phẩm cụ thể khỏi giỏ hàng
export const removeFromCart = asyncHandler(async (req: any, res: Response) => {
  const { productId, color, size } = req.body;
  const data = await cartService.remove(req.user.id, productId, color, size);

  res.status(200).json({
    status: "success",
    data,
  });
});
