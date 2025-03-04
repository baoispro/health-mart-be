import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ClientProxyFactoryService } from 'src/utils/client-proxy.factory';

@Injectable()
export class UserService {
    private userClient: ClientProxy;

    constructor(private readonly clientProxyFactory: ClientProxyFactoryService){
        this.userClient = this.clientProxyFactory.createClient('userService');
    }

    getUsers() {
        return this.userClient.send({ cmd: 'get_users' }, {});
    }
}
