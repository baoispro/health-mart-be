import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../enums/users.enum';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserRequest {
  @ApiProperty({ example: 'https://example.com/avatar.png' })
  @IsNotEmpty({ message: 'avatar không được để trống' })
  @IsOptional()
  avatar?: string;
  @ApiProperty({ example: 'Nguyen Van A' })
  @IsNotEmpty({ message: 'tên không được để trống' })
  @IsOptional()
  fullName?: string;
  @ApiProperty({ example: 'nguyenvana@example.com' })
  @IsNotEmpty({ message: 'email không được để trống' })
  @IsOptional()
  email?: string;
  @ApiProperty({ example: '0987654321' })
  @IsNotEmpty({ message: 'số điện thoại không được để trống' })
  @IsOptional()
  phone?: string;
  @ApiProperty({ example: 'password123' })
  @IsNotEmpty({ message: 'password không được để trống' })
  @IsOptional()
  password?: string;
  @ApiProperty({ example: 'admin' })
  @IsNotEmpty({ message: 'role không được để trống' })
  @IsEnum(Role, { message: 'role phải là "customer", "admin" hoặc "seller"' })
  @IsOptional()
  role?: Role;
}
