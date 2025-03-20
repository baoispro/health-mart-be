import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ClientProxyFactoryService } from 'src/utils/client-proxy.factory';

@Injectable()
export class AuthService {
  private authClient: ClientProxy;

  constructor(private readonly clientProxyFactory: ClientProxyFactoryService) {
    this.authClient = this.clientProxyFactory.createClient('authService');
  }

  getAllUsers(id: number) {
    return this.authClient.send({ cmd: 'get_user_by_id' }, id);
  }
}
