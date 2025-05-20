import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateOrderShippingAddressRequest {
  @ApiProperty({ description: 'Order ID', example: 1 })
  @IsNumber({}, { message: 'Order ID phải là số' })
  orderId: number;

  @ApiProperty({ description: 'City', example: 'Hà Nội' })
  @IsString({ message: 'City phải là chuỗi' })
  city: string;

  @ApiProperty({ description: 'District', example: 'Cầu Giấy' })
  @IsString({ message: 'District phải là chuỗi' })
  district: string;

  @ApiProperty({ description: 'Ward', example: 'Dịch Vọng' })
  @IsString({ message: 'Ward phải là chuỗi' })
  ward: string;

  @ApiProperty({ description: 'Detailed address', example: '123 Nguyễn Văn A' })
  @IsString({ message: 'Address phải là chuỗi' })
  address: string;

  @ApiProperty({
    description: 'Pharmacy ID (optional)',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Pharmacy ID phải là số nếu có' })
  pharmacy_id?: number;

  @ApiProperty({
    description: 'Recipient Name (optional)',
    example: 'Nguyễn Văn B',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Recipient Name phải là chuỗi nếu có' })
  recipientName?: string;

  @ApiProperty({
    description: 'Phone Number (optional)',
    example: '0123456789',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Phone Number phải là chuỗi nếu có' })
  phoneNumber?: string;
}
