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

  // --- Các trường mới cho thông tin người đặt và ghi chú ---
  @ApiProperty({
    description: 'Customer Name (orderer)',
    example: 'Nguyễn Văn A',
  })
  @IsString({ message: 'Customer Name phải là chuỗi' })
  customerName: string;

  @ApiProperty({
    description: 'Customer Phone (orderer)',
    example: '0987654321',
  })
  @IsString({ message: 'Customer Phone phải là chuỗi' })
  customerPhone: string;

  @ApiProperty({
    description: 'Customer Email (orderer, optional)',
    example: 'example@gmail.com',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Customer Email phải là chuỗi nếu có' })
  customerEmail?: string;

  @ApiProperty({
    description: 'Note (optional)',
    example: 'Ghi chú về đơn hàng',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Note phải là chuỗi nếu có' })
  note?: string;
}
