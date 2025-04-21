import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({ example: '123 Lê Lợi', description: 'Tên đường và số nhà' })
  @IsNotEmpty({ message: 'Địa chỉ không được để trống' })
  address_street: string;

  @ApiProperty({ example: 'Phường Bến Nghé', description: 'Tên phường' })
  @IsNotEmpty({ message: 'Phường không được để trống' })
  ward: string;

  @ApiProperty({ example: 'Quận 1', description: 'Tên quận/huyện' })
  @IsNotEmpty({ message: 'Quận không được để trống' })
  district: string;

  @ApiProperty({ example: 'TP Hồ Chí Minh', description: 'Tên thành phố' })
  @IsNotEmpty({ message: 'Thành phố không được để trống' })
  city: string;

  @ApiProperty({ example: 1, description: 'ID của người dùng' })
  @IsNumber({}, { message: 'userId phải là số' })
  userId: number;
}
