import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { AuthToken } from '../entities/auth.entity';
import { ClientProxyFactoryService } from 'src/utils/client-proxy.factory';
import { firstValueFrom } from 'rxjs';
import { LoginRequest } from '../dto/request/login-request.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RefreshTokenResponse } from '../dto/response/refresh-token-response.dto';
@Injectable()
export class AuthService {
  private userClient: ClientProxy;

  constructor(
    @InjectRepository(AuthToken)
    private readonly authRepository: Repository<AuthToken>,

    private readonly jwtService: JwtService,
    private readonly clientProxyFactory: ClientProxyFactoryService,
  ) {
    this.userClient = this.clientProxyFactory.createClient('userService');
  }

  async findUserByEmail(email: string): Promise<any> {
    return firstValueFrom(this.userClient.send('get_user_by_email', email));
  }

  async login(dto: LoginRequest) {
    const user = await this.findUserByEmail(dto.email);
    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!user) {
      throw new RpcException(
        new ConflictException('Thông tin user không tồn tại!'),
      );
    } else if (!user.password) {
      throw new RpcException(
        new ConflictException('Password không được nhập!'),
      );
    } else if (!isMatch) {
      throw new RpcException(new ConflictException('password không đúng!'));
    }

    const payload = {
      sub: user.id,
      name: user.fullName,
      email: user.email,
      phone: user.phone,
      role: user.role,
    };

    const token = this.jwtService.sign(payload, { expiresIn: '7d' });

    let refreshToken: string | undefined;

    if (dto.remember) {
      const existingAuth = await this.authRepository.findOne({
        where: { userId: user.id },
      });

      const now = new Date();

      if (existingAuth) {
        const isExpired = new Date(existingAuth.expiresAt) < now;

        if (isExpired) {
          // ❌ Hết hạn → xóa token cũ
          await this.authRepository.delete({ userId: user.id });
        } else {
          // ✅ Vẫn còn hạn → không cần tạo mới
          refreshToken = existingAuth.refreshToken;
        }
      }
      if (!refreshToken) {
        refreshToken = this.jwtService.sign(
          { sub: user.id, email: user.email },
          { expiresIn: '14d' },
        );

        const authEntity = this.authRepository.create({
          userId: user.id,
          email: user.email,
          createdAt: new Date(),
          expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days
          refreshToken: refreshToken,
        });

        await this.authRepository.save(authEntity);
      }
    }
    return {
      token,
      user: user,
      refreshToken: refreshToken,
    };
  }

  async logout(userId: string): Promise<void> {
    await this.authRepository.delete({ userId: Number(userId) });
  }

  async refreshToken(token: string): Promise<RefreshTokenResponse> {
    try {
      const decoded = this.jwtService.verify(token);

      if (!decoded?.sub) {
        throw new RpcException(
          new UnauthorizedException('Refresh token không hợp lệ'),
        );
      }

      const authRecord = await this.authRepository.findOne({
        where: { refreshToken: token },
      });

      if (!authRecord) {
        throw new RpcException(
          new UnauthorizedException(
            'Refresh token không tồn tại trong hệ thống',
          ),
        );
      }

      const isExpired = new Date() > authRecord.expiresAt;
      if (isExpired) {
        await this.authRepository.delete({ refreshToken: token });
        throw new RpcException(
          new UnauthorizedException('Refresh token đã hết hạn'),
        );
      }

      const user = await this.findUserByEmail(authRecord.email);
      if (!user) {
        throw new RpcException(
          new UnauthorizedException('Người dùng không tồn tại'),
        );
      }

      const newAccessToken = this.jwtService.sign(
        {
          sub: user.id,
          email: user.email,
          name: user.fullName,
          phone: user.phone,
          role: user.role,
        },
        { expiresIn: '7d' },
      );

      const newRefreshToken = this.jwtService.sign(
        { sub: user.id, email: user.email },
        { expiresIn: '14d' },
      );

      authRecord.refreshToken = newRefreshToken;
      authRecord.expiresAt = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
      await this.authRepository.save(authRecord);

      return {
        access_token: newAccessToken,
        refresh_token: newRefreshToken,
      };
    } catch (error) {
      throw new RpcException(
        new UnauthorizedException('Refresh token không hợp lệ hoặc đã hết hạn'),
      );
    }
  }

  async findRefreshToken(email: string): Promise<string> {
    const auth = await this.authRepository.findOne({ where: { email } });

    if (!auth) {
      throw new RpcException(
        new NotFoundException(`Email ${email} không tìm thấy`),
      );
    }

    if (!auth.refreshToken) {
      throw new RpcException(
        new NotFoundException(`Refresh token không tồn tại cho email ${email}`),
      );
    }

    return auth.refreshToken;
  }

  async validateToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      return { userId: payload.sub, email: payload.email }; // hoặc payload gốc
    } catch (e) {
      throw new RpcException(new UnauthorizedException('Invalid token'));
    }
  }
}
