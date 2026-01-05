import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { AddressRequestDto } from "./address.request";

export class CreateUserRequestDto {
  @IsString({ message: "Họ tên phải là chuỗi" })
  @IsNotEmpty({ message: "Họ tên không được để trống" })
  fullName!: string;

  @IsEmail({}, { message: "Email không đúng định dạng" })
  email!: string;

  @IsString({ message: "Số điện thoại phải là chuỗi" })
  @IsNotEmpty({ message: "Số điện thoại không được để trống" })
  phone!: string;

  @IsString({ message: "Mật khẩu phải là chuỗi" })
  @MinLength(6, { message: "Mật khẩu tối thiểu 6 ký tự" })
  password!: string;

  @IsEnum(["ADMIN", "STAFF", "CUSTOMER"], {
    message: "Role chỉ có thể là ADMIN, STAFF hoặc CUSTOMER",
  })
  @IsOptional()
  role?: "ADMIN" | "STAFF" | "CUSTOMER";

  @ValidateNested({ each: true })
  @Type(() => AddressRequestDto)
  @IsOptional()
  addresses?: AddressRequestDto[];
}

export class UpdateUserRequestDto {
  @IsString({ message: "Họ tên phải là chuỗi" })
  @IsOptional()
  fullName?: string;

  @IsString({ message: "Số điện thoại phải là chuỗi" })
  @IsOptional()
  phone?: string;

  @IsEnum(["ADMIN", "STAFF", "CUSTOMER"], {
    message: "Role chỉ có thể là ADMIN, STAFF hoặc CUSTOMER",
  })
  @IsOptional()
  role?: "ADMIN" | "STAFF" | "CUSTOMER";

  @IsEnum(["ACTIVE", "BLOCKED"], {
    message: "Trạng thái chỉ có thể là ACTIVE hoặc BLOCKED",
  })
  @IsOptional()
  status?: "ACTIVE" | "BLOCKED";

  @ValidateNested({ each: true })
  @Type(() => AddressRequestDto)
  @IsOptional()
  addresses?: AddressRequestDto[];
}
