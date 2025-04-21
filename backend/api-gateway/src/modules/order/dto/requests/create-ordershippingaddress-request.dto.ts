import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateOrderShippingAddressRequest {
  @ApiProperty({ description: 'Order ID', example: 1 })
  @IsNumber()
  orderId: number;

  @ApiProperty({ description: 'City', example: 'Hà Nội' })
  @IsString()
  city: string;

  @ApiProperty({ description: 'District', example: 'Cầu Giấy' })
  @IsString()
  district: string;

  @ApiProperty({ description: 'Ward', example: 'Dịch Vọng' })
  @IsString()
  ward: string;

  @ApiProperty({ description: 'Detailed address', example: '123 Nguyễn Văn A' })
  @IsString()
  address: string;

  @ApiProperty({ 
    description: 'Pharmacy ID (optional)', 
    example: 1,
    required: false 
  })
  @IsOptional()
  @IsNumber()
  pharmacy_id?: number;
}