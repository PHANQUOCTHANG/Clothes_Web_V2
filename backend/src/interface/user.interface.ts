import { Document } from "mongoose";

// Interface Address
export interface IUserAddress {
  receiverName: string;
  phone: string;
  address: string;
  isDefault: boolean;
}

// Interface User (logic thuần)
export interface IUser {
  fullName: string;
  email: string;
  phone: string;
  passwordHash: string;
  role: "ADMIN" | "STAFF" | "CUSTOMER";
  status: "ACTIVE" | "BLOCKED";
  addresses: IUserAddress[];
  createdAt: Date;
  updatedAt: Date;
}

// Interface User Document (Mongo)
export interface IUserDocument extends IUser, Document {
  id: string; // virtual id
}
