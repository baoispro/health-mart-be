import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class UpdateAddressDto {
  @ApiProperty({
    example: '123 Lê Lợi',
    description: 'Tên đường và số nhà',
    required: false,
  })
  @IsNotEmpty({ message: 'Địa chỉ không được để trống' })
  @IsOptional()
  address_street?: string;

  @ApiProperty({
    example: 'Phường Bến Nghé',
    description: 'Tên phường',
    required: false,
  })
  @IsNotEmpty({ message: 'Phường không được để trống' })
  @IsOptional()
  ward?: string;

  @ApiProperty({
    example: 'Quận 1',
    description: 'Tên quận/huyện',
    required: false,
  })
  @IsNotEmpty({ message: 'Quận không được để trống' })
  @IsOptional()
  district?: string;

  @ApiProperty({
    example: 'TP Hồ Chí Minh',
    description: 'Tên thành phố',
    required: false,
  })
  @IsNotEmpty({ message: 'Thành phố không được để trống' })
  @IsOptional()
  city?: string;

  @ApiProperty({
    example: 1,
    description: 'ID của người dùng',
    required: false,
  })
  @IsNumber({}, { message: 'userId phải là số' })
  @IsOptional()
  userId?: number;
}
