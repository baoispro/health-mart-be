import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class LoginRequest {
  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiProperty({ type: String })
  @IsString()
  password: string;

  @ApiPropertyOptional({ type: Boolean, required: false })
  @IsOptional()
  @IsBoolean()
  remember?: boolean;
}
