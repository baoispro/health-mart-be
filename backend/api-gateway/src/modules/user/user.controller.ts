import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserRequest } from './dto/requests/create-user-request.dto';
import { UpdateUserRequest } from './dto/requests/update-user-request.dto';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { BaseResponseDto } from './dto/responses/base-response.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('user')
@ApiTags('User')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy thông tin tất cả người dùng' })
  @ApiResponse({
    status: 200,
    description: 'Thông tin tất cả users',
    type: BaseResponseDto,
  })
  @ResponseMessage('Lấy danh sách tất cả người dùng thành công')
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin một người dùng' })
  @ApiResponse({
    status: 200,
    description: 'Thông tin user',
    type: BaseResponseDto,
  })
  @ResponseMessage('Lấy thông tin người dùng thành công')
  getUserById(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Tạo mới một người dùng' })
  @ApiResponse({
    status: 201,
    description: 'Tạo thành công',
    type: BaseResponseDto,
  })
  @ResponseMessage('Tạo người dùng thành công.')
  createUser(@Body() createUserRequest: CreateUserRequest) {
    return this.userService.createUser(createUserRequest);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin người dùng' })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật thành công',
    type: BaseResponseDto,
  })
  @ResponseMessage('Cập nhật người dùng thành công.')
  updateUser(
    @Param('id') id: number,
    @Body() updateUserRequest: UpdateUserRequest,
  ) {
    return this.userService.updateUser(id, updateUserRequest);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa người dùng' })
  @ApiResponse({
    status: 200,
    description: 'Xóa thành công',
    type: BaseResponseDto,
  })
  @ResponseMessage('Xóa người dùng thành công.')
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
