import { Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ClientProxyFactoryService } from 'src/utils/client-proxy.factory';
import { CreateUserRequest } from '../dto/requests/create-user-request.dto';
import { UpdateUserRequest } from '../dto/requests/update-user-request.dto';
import { catchError, throwError } from 'rxjs';

@Injectable()
export class UserService {
  private userClient: ClientProxy;

  constructor(private readonly clientProxyFactory: ClientProxyFactoryService) {
    this.userClient = this.clientProxyFactory.createClient('userService');
  }

  getUsers() {
    return this.userClient.send('get_all_users', {});
  }

  getUserById(id: number) {
    return this.userClient
      .send('get_user_by_id', id)
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }

  createUser(createUserRequest: CreateUserRequest) {
    return this.userClient
      .send('create_user', createUserRequest)
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }

  updateUser(id: number, updateUserRequest: UpdateUserRequest) {
    return this.userClient
      .send('update_user', { id, updateUserRequest })
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }

  deleteUser(id: number) {
    return this.userClient
      .send('delete_user', id)
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }
}
