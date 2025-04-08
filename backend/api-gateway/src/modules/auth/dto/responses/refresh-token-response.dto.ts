import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenResponse {
  @ApiProperty({ type: String })
  access_token: string;

  @ApiProperty({ type: String })
  refresh_token: string;
}
