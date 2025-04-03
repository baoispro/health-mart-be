import { Injectable } from '@nestjs/common';
import { ClientProxy, Payload } from '@nestjs/microservices';
import { ClientProxyFactoryService } from '../utils/client-proxy.factory'; // Đảm bảo đường dẫn đúng

@Injectable()
export class AuthService {
  private userClient: ClientProxy;

  constructor(
    private readonly clientProxyFactory: ClientProxyFactoryService, // Inject service này vào
  ) {
    this.userClient = this.clientProxyFactory.createClient('userService'); // Khởi tạo ClientProxy
  }

  async findUser(@Payload() email: string): Promise<any> {
    return this.userClient
      .send({ cmd: 'get_user_by_email' }, { email })
      .toPromise();
  }
}
