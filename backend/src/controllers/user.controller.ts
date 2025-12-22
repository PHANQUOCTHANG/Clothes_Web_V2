import { Request, Response } from "express";
import asyncHandler from "@/utils/asyncHandler";
import { UserResponseDto } from "@/dto/response/user.response";
import { normalizeQuery } from "@/interface/query.interface";
import { UserService } from "@/services/user.service";

export class UserController {
  constructor(private readonly userService: UserService) {}

  // POST /users
  createUser = asyncHandler(async (req: Request, res: Response) => {
    const user = await this.userService.createUser(req.body);
    res.status(201).json(new UserResponseDto(user));
  });

  // GET /users
  getUsers = asyncHandler(async (req: Request, res: Response) => {
    const query = normalizeQuery(req.query);
    const result = await this.userService.getUsers(query);

    res.json({
      ...result,
      data: result.data.map(u => new UserResponseDto(u)),
    });
  });

  // GET /users/:id
  getUserById = asyncHandler(async (req: Request, res: Response) => {
    const user = await this.userService.getUserById(req.params.id);
    res.json(new UserResponseDto(user));
  });

  // PATCH /users/:id
  updateUser = asyncHandler(async (req: Request, res: Response) => {
    const user = await this.userService.updateUser(req.params.id, req.body);
    res.json(new UserResponseDto(user));
  });

  // DELETE /users/:id
  deleteUser = asyncHandler(async (_req: Request, res: Response) => {
    await this.userService.deleteUser(_req.params.id);
    res.status(204).send();
  });
}
