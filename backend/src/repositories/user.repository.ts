import { BaseQuery, IPaginatedResult } from "@/interface/query.interface";
import { IUser, IUserDocument } from "@/interface/user.interface";
import User from "@/models/user.model";

export interface IUserRepository {
  create(data: Partial<IUser>): Promise<IUserDocument>;
  findAll(query: BaseQuery): Promise<IPaginatedResult<IUserDocument>>;
  findById(id: string): Promise<IUserDocument | null>;
  findByEmail(
    email: string,
    includePassword?: boolean
  ): Promise<IUserDocument | null>;
  updateById(id: string, data: Partial<IUser>): Promise<IUserDocument | null>;
  updateByEmail(
    email: string,
    data: Partial<IUser>
  ): Promise<IUserDocument | null>;
  deleteById(id: string): Promise<void>;
}

export class UserRepository implements IUserRepository {
  // Tạo bản ghi mới
  async create(data: Partial<IUser>): Promise<IUserDocument> {
    return User.create(data);
  }

  // Lấy danh sách kèm phân trang, tìm kiếm và lọc bản ghi chưa xóa
  async findAll(query: BaseQuery): Promise<IPaginatedResult<IUserDocument>> {
    const { page = 1, limit = 10, search, sort } = query;

    // Filter mặc định loại bỏ bản ghi xóa mềm
    const filter: any = { deleted: { $ne: true } };

    if (search) {
      filter.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const [data, total] = await Promise.all([
      User.find(filter)
        .sort(sort || { createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(), // Tăng tốc độ truy vấn bằng POJO
      User.countDocuments(filter),
    ]);

    return {
      data: data as IUserDocument[],
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // Tìm theo ID (bỏ qua bản ghi đã xóa)
  async findById(id: string): Promise<IUserDocument | null> {
    return User.findOne({ _id: id, deleted: { $ne: true } });
  }

  // Tìm theo Email (hỗ trợ lấy trường password ẩn)
  async findByEmail(
    email: string,
    includePassword = false
  ): Promise<IUserDocument | null> {
    const query = User.findOne({ email, deleted: { $ne: true } });
    if (includePassword) query.select("+password");
    return query;
  }

  // Cập nhật theo ID kèm kiểm tra schema
  async updateById(
    id: string,
    data: Partial<IUser>
  ): Promise<IUserDocument | null> {
    return User.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  // Cập nhật theo Email
  async updateByEmail(
    email: string,
    data: Partial<IUser>
  ): Promise<IUserDocument | null> {
    return User.findOneAndUpdate(
      { email, deleted: { $ne: true } },
      { $set: data },
      { new: true, runValidators: true }
    );
  }

  // Xóa mềm bằng cách cập nhật flag deleted
  async deleteById(id: string): Promise<void> {
    await User.findByIdAndUpdate(id, {
      deleted: true,
      deletedAt: new Date(),
    });
  }
}
