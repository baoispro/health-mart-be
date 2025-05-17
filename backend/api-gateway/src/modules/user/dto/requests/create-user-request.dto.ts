import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../enums/users.enum';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class CreateUserRequest {
  @ApiProperty({
    example:
      'https://bucket-ktpm.s3.ap-southeast-1.amazonaws.com/avatars/4c66412e-6894-4bfd-b717-3018f79faf13_avatar-default.svg',
  })
  @IsString({ message: 'avatar phải là chuỗi' })
  @IsOptional()
  avatar?: string =
    'https://bucket-ktpm.s3.ap-southeast-1.amazonaws.com/avatars/4c66412e-6894-4bfd-b717-3018f79faf13_avatar-default.svg';
  @ApiProperty({ example: 'Nguyen Van A' })
  @IsNotEmpty({ message: 'Tên không được để trống' })
  fullName: string;
  @ApiProperty({ example: 'nguyenvana@example.com' })
  @IsNotEmpty({ message: 'Email không được để trống' })
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string;
  @ApiProperty({ example: '0987654321' })
  @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
  @Matches(/^(0[1-9][0-9]{8,9})$/, {
    message:
      'Số điện thoại không hợp lệ, phải có 10 hoặc 11 chữ số và bắt đầu bằng số 0',
  })
  phone: string;
  @ApiProperty({ example: 'password123' })
  @IsNotEmpty({ message: 'password không được để trống' })
  password: string;
  @ApiProperty({ example: 'admin' })
  @IsEnum(Role, { message: 'role phải là "customer", "admin" hoặc "seller"' })
  @IsOptional()
  role?: Role;
}
