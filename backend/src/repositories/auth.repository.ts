import { IUserDocument } from "@/interface/user.interface";
import User from "@/models/user.model";


export class AuthRepository {
  // Tìm user theo email
  async findByEmail(email: string): Promise<IUserDocument | null> {
    return User.findOne({ email });
  }

  // Tìm user theo id
  async findById(id: string): Promise<IUserDocument | null> {
    return User.findById(id);
  }

  // Tạo user mới
  async create(data: Partial<IUserDocument>): Promise<IUserDocument> {
    return User.create(data);
  }
}
