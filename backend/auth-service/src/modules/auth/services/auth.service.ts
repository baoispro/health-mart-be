import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { AuthToken } from '../entities/auth.entity';
import { ClientProxyFactoryService } from 'src/utils/client-proxy.factory';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  private userClient: ClientProxy;

  constructor(
    @InjectRepository(AuthToken)
    private readonly authRepository: Repository<AuthToken>,

    private readonly clientProxyFactory: ClientProxyFactoryService,
  ) {
    this.userClient = this.clientProxyFactory.createClient('userService');
  }

  async findUserByEmail(email: string): Promise<any> {
    return firstValueFrom(
      this.userClient.send('get_user_by_email', email), // không cần { email: email }, vì user service chỉ dùng string
    );
  }
}
