import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class UpdateOrderShippingAddressRequest {
  @ApiProperty({ 
    description: 'City', 
    example: 'Hà Nội',
    required: true 
  })
  @IsString({ message: 'City phải là chuỗi' })
  @IsNotEmpty({ message: 'City không được để trống' })
  @MaxLength(50, { message: 'City không được vượt quá 50 ký tự' })
  city: string;

  @ApiProperty({ 
    description: 'District', 
    example: 'Cầu Giấy',
    required: true 
  })
  @IsString({ message: 'District phải là chuỗi' })
  @IsNotEmpty({ message: 'District không được để trống' })
  @MaxLength(50, { message: 'District không được vượt quá 50 ký tự' })
  district: string;

  @ApiProperty({ 
    description: 'Ward', 
    example: 'Dịch Vọng',
    required: true 
  })
  @IsString({ message: 'Ward phải là chuỗi' })
  @IsNotEmpty({ message: 'Ward không được để trống' })
  @MaxLength(50, { message: 'Ward không được vượt quá 50 ký tự' })
  ward: string;

  @ApiProperty({ 
    description: 'Detailed address', 
    example: '123 Nguyễn Văn A',
    required: true 
  })
  @IsString({ message: 'Address phải là chuỗi' })
  @IsNotEmpty({ message: 'Address không được để trống' })
  @MaxLength(255, { message: 'Address không được vượt quá 255 ký tự' })
  address: string;
}
