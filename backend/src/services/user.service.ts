import bcrypt from "bcrypt";
import AppError from "@/utils/appError";
import { UserRepository } from "@/repositories/user.repository";
import { CreateUserRequestDto, UpdateUserRequestDto } from "@/dto/request/user.request";
import { IUserDocument } from "@/interface/user.interface";
import { BaseQuery, IPaginatedResult } from "@/interface/query.interface";

export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  // Tạo user mới, kiểm tra email trùng
  async createUser(dto: CreateUserRequestDto): Promise<IUserDocument> {
    const { email, password, ...rest } = dto;

    const existed = await this.userRepo.findByEmail(email);
    if (existed) {
      throw new AppError("Email already exists", 400);
    }

    const passwordHash = await bcrypt.hash(password, 10);

    return this.userRepo.create({
      ...rest,
      email,
      passwordHash,
      role: dto.role ?? "CUSTOMER",
      status: "ACTIVE",
    });
  }

  // Lấy danh sách user
  async getUsers(query: BaseQuery): Promise<IPaginatedResult<IUserDocument>> {
    return this.userRepo.findAll(query);
  }

  // Lấy chi tiết user
  async getUserById(id: string): Promise<IUserDocument> {
    const user = await this.userRepo.findById(id);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return user;
  }

  // Cập nhật user
  async updateUser(id: string, dto: UpdateUserRequestDto): Promise<IUserDocument> {
    const user = await this.userRepo.updateById(id, dto);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return user;
  }

  // Xoá user
  async deleteUser(id: string): Promise<void> {
    const user = await this.userRepo.findById(id);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    await this.userRepo.deleteById(id);
  }
}
