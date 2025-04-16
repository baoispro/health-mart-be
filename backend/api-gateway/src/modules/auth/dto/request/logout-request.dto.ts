import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LogoutRequest {
  @ApiProperty()
  @IsString()
  userId: string;
}
