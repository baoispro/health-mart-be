import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class VerifyTokenRequest {
  @ApiProperty()
  @IsString()
  token: string;
}
