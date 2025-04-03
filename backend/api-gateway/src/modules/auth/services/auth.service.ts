import { Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ClientProxyFactoryService } from 'src/utils/client-proxy.factory';
import { catchError, throwError } from 'rxjs';

@Injectable()
export class AuthService {
  private authClient: ClientProxy;

  constructor(private readonly clientProxyFactory: ClientProxyFactoryService) {
    this.authClient = this.clientProxyFactory.createClient('authService');
  }

  getUserByEmail(email: string) {
    return this.authClient
      .send('auth_user_by_email', email)
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }
}
