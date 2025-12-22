import { IUserDocument } from "@/interface/user.interface";


export class UserResponseDto {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  addresses: any[];
  createdAt: Date;
  updatedAt: Date;

  // Map dữ liệu an toàn cho client
  constructor(user: IUserDocument) {
    this.id = user.id; // virtual id
    this.fullName = user.fullName;
    this.email = user.email;
    this.phone = user.phone;
    this.role = user.role;
    this.status = user.status;
    this.addresses = user.addresses;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
