import { Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ClientProxyFactoryService } from 'src/utils/client-proxy.factory';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { LoginRequest } from '../dto/request/login-request.dto';

@Injectable()
export class AuthService {
  private authClient: ClientProxy;

  constructor(private readonly clientProxyFactory: ClientProxyFactoryService) {
    this.authClient = this.clientProxyFactory.createClient('authService');
  }

  getUserByEmail(email: string) {
    return this.authClient
      .send('auth_login_by_email', email)
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }

  login(dto: LoginRequest) {
    return this.authClient
      .send('login', dto)
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }

  async logout(userId: string) {
    try {
      const result = await firstValueFrom(
        this.authClient.send('logout', userId),
      );
      return result;
    } catch (error) {
      console.error('Lỗi logout:', error);
      throw new RpcException(error?.response || 'Logout thất bại');
    }
  }

  refreshToken(refreshToken: string) {
    return this.authClient
      .send('refresh_token', refreshToken)
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }
}
