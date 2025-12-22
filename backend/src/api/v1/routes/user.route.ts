import { UserController } from "@/controllers/user.controller";
import { CreateUserRequestDto, UpdateUserRequestDto } from "@/dto/request/user.request";
import validationMiddleware from "@/middleware/validate.middleware";
import { UserRepository } from "@/repositories/user.repository";
import { UserService } from "@/services/user.service";
import { Router } from "express";

const router = Router();

// Manual DI
const userRepo = new UserRepository();
const userService = new UserService(userRepo);
const userController = new UserController(userService);

// Tạo user
router.post("/", validationMiddleware(CreateUserRequestDto), userController.createUser);

// Lấy danh sách user
router.get("/", userController.getUsers);

// Lấy chi tiết user
router.get("/:id", userController.getUserById);

// Cập nhật user
router.patch(
  "/:id",
  validationMiddleware(UpdateUserRequestDto, true),
  userController.updateUser
);

// Xoá user
router.delete("/:id", userController.deleteUser);

export default router;
