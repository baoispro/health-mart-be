// gateway/jwt-auth.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService, // gọi sang microservice auth
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header missing');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token missing');
    }

    try {
      // Gửi token qua Auth microservice để validate
      const user = await this.authService.validateToken(token);
      request.user = user; // gán thông tin user vào req
      return true;
    } catch (err) {
      throw new UnauthorizedException('Token không hợp lệ: ' + err);
    }
  }
}
