import { Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ClientProxyFactoryService } from 'src/utils/client-proxy.factory';
import { catchError, throwError } from 'rxjs';
import { CreateAddressDto } from '../dto/requests/create-address-request.dto';
import { UpdateAddressDto } from '../dto/requests/update-address-request.dto';

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

  createUser(payload: any) {
    return this.userClient
      .send('create_user', payload)
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }

  updateUser(id: number, payload: any) {
    return this.userClient
      .send('update_user', { id, payload })
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

  checkUserExists(user_id: number) {
    return this.userClient
      .send('check_user_exists', { user_id })
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }

  getAddressById(id: number) {
    return this.userClient
      .send('get_address_by_id', id)
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }

  createAddress(createUserRequest: CreateAddressDto) {
    return this.userClient
      .send('create_address', createUserRequest)
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }

  updateAddress(id: number, updateUserRequest: UpdateAddressDto) {
    return this.userClient
      .send('update_address', { id, updateUserRequest })
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }

  deleteAddress(id: number) {
    return this.userClient
      .send('delete_address', id)
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      );
  }
}
