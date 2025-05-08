import { IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePharmacyProductRequest {
  @ApiProperty({ example: 100, description: 'Số lượng tồn kho' })
  @IsOptional()
  @IsNumber({}, { message: 'quantity phải là số' })
  quantity?: number;
}
