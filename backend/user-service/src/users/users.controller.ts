import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

  @MessagePattern({ cmd: 'get_users' })
  getUsers() {
    return this.userService.findAll();
  }
}
