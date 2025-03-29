import { Controller } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserRequest } from '../dto/requests/create-user-request.dto';
import { UpdateUserRequest } from '../dto/requests/update-user-request.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @MessagePattern('get_all_users')
  getAllUsers() {
    return this.userService.findAll();
  }

  @MessagePattern('get_user_by_id')
  async getUserById(@Payload() id: number) {
    return this.userService.findOne(id);
  }

  @MessagePattern('create_user')
  async createUser(@Payload() createUserRequest: CreateUserRequest) {
    return this.userService.create(createUserRequest);
  }

  @MessagePattern('update_user')
  async updateUser(
    @Payload() data: { id: number; updateUserRequest: UpdateUserRequest },
  ) {
    return this.userService.update(data.id, data.updateUserRequest);
  }

  @MessagePattern('delete_user')
  async deleteUser(@Payload() id: number) {
    return this.userService.remove(id);
  }

  @MessagePattern('check_user_exists')
  async checkUserExists(@Payload() data: { user_id: number }) {
    const user = await this.userService.findOne(data.user_id);
    return !!user;
  }
}
