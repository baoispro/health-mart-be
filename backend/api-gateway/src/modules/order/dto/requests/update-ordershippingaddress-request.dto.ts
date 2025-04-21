import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateOrderShippingAddressRequest {
  @ApiProperty({ 
    description: 'City', 
    example: 'Hà Nội',
    required: false 
  })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({ 
    description: 'District', 
    example: 'Cầu Giấy',
    required: false 
  })
  @IsOptional()
  @IsString()
  district?: string;

  @ApiProperty({ 
    description: 'Ward', 
    example: 'Dịch Vọng',
    required: false 
  })
  @IsOptional()
  @IsString()
  ward?: string;

  @ApiProperty({ 
    description: 'Detailed address', 
    example: '123 Nguyễn Văn A',
    required: false 
  })
  @IsOptional()
  @IsString()
  address?: string;
}