import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class VerifyTokenRequest {
  @ApiProperty()
  @IsString()
  refreshToken: string;

  @ApiProperty()
  @IsString()
  time: string;
}
