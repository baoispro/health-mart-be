import { IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePharmacyStockRequest {
  @ApiProperty({
    example: 'Nhà thuốc An Khang',
    description: 'Tên kho nhà thuốc',
  })
  @IsOptional()
  @IsString({ message: 'name phải là chuỗi' })
  name?: string;

  @ApiProperty({ example: '123 Nguyễn Trãi', description: 'Địa chỉ (đường)' })
  @IsOptional()
  @IsString({ message: 'address_street phải là chuỗi' })
  address_street?: string;

  @ApiProperty({ example: 'Phường 1', description: 'Phường' })
  @IsOptional()
  @IsString({ message: 'ward phải là chuỗi' })
  ward?: string;

  @ApiProperty({ example: 'Quận 5', description: 'Quận / Huyện' })
  @IsOptional()
  @IsString({ message: 'district phải là chuỗi' })
  district?: string;

  @ApiProperty({ example: 'TP. Hồ Chí Minh', description: 'Tỉnh / Thành phố' })
  @IsOptional()
  @IsString({ message: 'city phải là chuỗi' })
  city?: string;

  @ApiProperty({ example: 100, description: 'Số lượng tồn kho' })
  @IsOptional()
  @IsNumber({}, { message: 'quantity phải là số' })
  quantity?: number;
}
