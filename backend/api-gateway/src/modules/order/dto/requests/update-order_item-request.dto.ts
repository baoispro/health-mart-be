import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class UpdateOrderItemRequest {
  @ApiProperty()
  @IsOptional()
  @IsNumber({}, { message: 'order_id phải là số!' })
  order_id?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber({}, { message: 'product_id phải là số!' })
  product_id?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber({}, { message: 'quantity phải là số!' })
  @Min(1, { message: 'quantity phải lớn hơn hoặc bằng 1!' })
  quantity?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber({}, { message: 'price phải là số!' })
  @Min(0, { message: 'price không được nhỏ hơn 0!' })
  price?: number;
}
