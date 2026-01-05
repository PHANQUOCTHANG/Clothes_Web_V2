import bcrypt from "bcrypt";
import AppError from "@/utils/appError";
import { IUserRepository } from "@/repositories/user.repository";
import {
  CreateUserRequestDto,
  UpdateUserRequestDto,
} from "@/dto/request/user.request";
import { IUserDocument } from "@/interface/user.interface";
import {
  BaseQuery,
  IPaginatedResult,
  normalizeQuery,
} from "@/interface/query.interface";

export interface IUserService {
  create(dto: CreateUserRequestDto): Promise<any>;
  findAll(query?: any): Promise<any>;
  findById(id: string): Promise<any>;
  update(id: string, dto: UpdateUserRequestDto): Promise<any>;
  delete(id: string): Promise<void>;
}

export class UserService implements IUserService {
  constructor(private readonly userRepo: IUserRepository) {}

  // Tạo người dùng mới, kiểm tra trùng email và mã hóa mật khẩu
  async create(dto: CreateUserRequestDto): Promise<any> {
    const { email, password, ...rest } = dto;

    // Kiểm tra email đã tồn tại hay chưa
    const existed = await this.userRepo.findByEmail(email);
    if (existed) throw new AppError("Email đã tồn tại trên hệ thống", 400);

    // Mã hóa mật khẩu an toàn
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await this.userRepo.create({
      ...rest,
      email,
      passwordHash,
      role: dto.role ?? "CUSTOMER",
      status: "ACTIVE",
    });

    return this.mapToResponse(user);
  }

  // Lấy danh sách kèm phân trang và chuẩn hóa query
  async findAll(query: any): Promise<any> {
    const normalizedQuery = normalizeQuery(query);
    const result = await this.userRepo.findAll(normalizedQuery);

    return {
      ...result,
      data: result.data.map((user: any) => this.mapToResponse(user)),
    };
  }

  // Lấy chi tiết theo ID
  async findById(id: string): Promise<any> {
    const user = await this.userRepo.findById(id);
    if (!user) throw new AppError("Không tìm thấy người dùng", 404);

    return this.mapToResponse(user);
  }

  // Cập nhật thông tin và kiểm tra sự tồn tại
  async update(id: string, dto: UpdateUserRequestDto): Promise<any> {
    const user = await this.userRepo.updateById(id, dto);
    if (!user) throw new AppError("Người dùng không tồn tại", 404);

    return this.mapToResponse(user);
  }

  // Thực hiện xóa (gọi hàm xóa mềm từ repo)
  async delete(id: string): Promise<void> {
    const user = await this.userRepo.findById(id);
    if (!user) throw new AppError("Người dùng không tồn tại để xóa", 404);

    await this.userRepo.deleteById(id);
  }

  // Chuyển đổi dữ liệu sang dạng phản hồi sạch
  private mapToResponse(user: IUserDocument): any {
    return {
      id: user._id || user.id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.status,
      addresses: user.addresses || [],
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
