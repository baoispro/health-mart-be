import { Controller } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LoginRequest } from '../dto/request/login-request.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth_login_by_email')
  getUser(@Payload() email: string) {
    return this.authService.findUserByEmail(email);
  }

  @MessagePattern('login')
  loginUser(@Payload() dto: LoginRequest) {
    return this.authService.login(dto);
  }

  @MessagePattern('logout')
  async logoutUser(@Payload() userId: string) {
    await this.authService.logout(userId);
    return { success: true };
  }

  @MessagePattern('refresh_token')
  refreshToken(@Payload() refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }

  @MessagePattern('find_refresh_token')
  findRefreshToken(@Payload() email: string) {
    return this.authService.findRefreshToken(email);
  }

  @MessagePattern('validate_token')
  validateToken(@Payload() data: { token: string }) {
    return this.authService.validateToken(data.token);
  }
}
