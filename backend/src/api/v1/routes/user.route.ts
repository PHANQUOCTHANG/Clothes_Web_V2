import { Router } from "express";
import * as userCtrl from "@/controllers/user.controller";
import {
  CreateUserRequestDto,
  UpdateUserRequestDto,
} from "@/dto/request/user.request";
import validationMiddleware from "@/middleware/validate.middleware";

const router = Router();

/**
 * @swagger
 * /api/v1/users:
 * get:
 * summary: Lấy danh sách người dùng
 * tags: [Users]
 * security:
 * - bearerAuth: []
 * responses:
 * 200:
 * description: Thành công
 * post:
 * summary: Tạo người dùng mới
 * tags: [Users]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/CreateUserRequestDto'
 * responses:
 * 201:
 * description: Đã tạo thành công
 */
router
  .route("/")
  .get(userCtrl.getUsers)
  .post(validationMiddleware(CreateUserRequestDto), userCtrl.createUser);

/**
 * @swagger
 * /api/v1/users/{id}:
 * get:
 * summary: Chi tiết người dùng
 * tags: [Users]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * responses:
 * 200:
 * description: Thành công
 * patch:
 * summary: Cập nhật người dùng
 * tags: [Users]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/UpdateUserRequestDto'
 * responses:
 * 200:
 * description: Cập nhật thành công
 * delete:
 * summary: Xóa người dùng
 * tags: [Users]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * responses:
 * 204:
 * description: Xóa thành công
 */
router
  .route("/:id")
  .get(userCtrl.getUser)
  .patch(validationMiddleware(UpdateUserRequestDto), userCtrl.updateUser)
  .delete(userCtrl.deleteUser);

export default router;