import { Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ClientProxyFactoryService } from 'src/utils/client-proxy.factory';
import { CreateUserRequest } from './dto/requests/create-user-request.dto';
import { UpdateUserRequest } from './dto/requests/update-user-request.dto';
import { catchError, throwError } from 'rxjs';

@Injectable()
export class UserService {
    private userClient: ClientProxy;

    constructor(private readonly clientProxyFactory: ClientProxyFactoryService){
        this.userClient = this.clientProxyFactory.createClient('userService');
    }

    getUsers() {
        return this.userClient.send({ cmd: 'get_all_users' }, {});
    }

    getUserById(id: number) {
        return this.userClient.send({ cmd: 'get_user_by_id' }, id)
        .pipe(catchError(error => throwError(() => new RpcException(error.response))));
    }

    createUser(createUserRequest: CreateUserRequest) {
        return this.userClient.send({ cmd: 'create_user' }, createUserRequest);
    }

    updateUser(id: number, updateUserRequest: UpdateUserRequest) {
        return this.userClient.send({ cmd: 'update_user' }, { id, updateUserRequest });
    }

    deleteUser(id: number) {
        return this.userClient.send({ cmd: 'delete_user' }, id);
    }
}
