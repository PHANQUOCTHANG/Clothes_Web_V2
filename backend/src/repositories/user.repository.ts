import { BaseQuery, IPaginatedResult } from "@/interface/query.interface";
import { IUser, IUserDocument } from "@/interface/user.interface";
import User from "@/models/user.model";

export class UserRepository {
  // Tạo user mới
  async create(data: Partial<IUser>): Promise<IUserDocument> {
    return User.create(data);
  }

  // Tìm user theo email
  async findByEmail(email: string): Promise<IUserDocument | null> {
    return User.findOne({ email });
  }

  // Tìm user theo id
  async findById(id: string): Promise<IUserDocument | null> {
    return User.findById(id);
  }

  // Cập nhật user theo id
  async updateById(
    id: string,
    data: Partial<IUser>
  ): Promise<IUserDocument | null> {
    return User.findByIdAndUpdate(id, data, { new: true });
  }

  // Cập nhật user theo email
  async updateByEmail(
    email: string,
    data: Partial<IUser>
  ): Promise<IUserDocument | null> {
    return User.findOneAndUpdate(
      { email }, // điều kiện
      { $set: data }, // dữ liệu update
      {
        new: true, // trả document sau update
        runValidators: true,
      }
    );
  }

  // Xoá user
  async deleteById(id: string): Promise<void> {
    await User.findByIdAndDelete(id);
  }

  // Lấy danh sách user có phân trang + search + sort
  async findAll(query: BaseQuery): Promise<IPaginatedResult<IUserDocument>> {
    const { page, limit, search, sort } = query;

    const filter = search
      ? {
          $or: [
            { fullName: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const [data, total] = await Promise.all([
      User.find(filter)
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(limit),
      User.countDocuments(filter),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
