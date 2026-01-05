export interface UserResponseDto {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: "ADMIN" | "STAFF" | "CUSTOMER";
  status: "ACTIVE" | "BLOCKED";
  addresses: any[];
  createdAt: Date;
  updatedAt: Date;
}
