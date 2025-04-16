import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class UserInfo {
  @ApiProperty()
  id: number;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  avatar: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  role: string;
}
export class LoginRespone {
  @ApiProperty({ type: UserInfo })
  user: UserInfo;

  @ApiProperty({ type: String })
  token: string;

  @ApiPropertyOptional({ type: String, required: false })
  refresh_token?: string;
}
