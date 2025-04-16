import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class UserInfo {
  id: number;
  fullName: string;
  email: string;
  avatar: string;
  phone: string;
  role: string;
}
export class LoginRespone {
  user: UserInfo;
  token: string;
  refresh_token?: string;
}
