import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { CreateUserRequest } from '../dto/requests/create-user-request.dto';
import { UpdateUserRequest } from '../dto/requests/update-user-request.dto';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { BaseResponseDto } from '../dto/responses/base-response.dto';
import { UpdateAddressDto } from '../dto/requests/update-address-request.dto';
import { CreateAddressDto } from '../dto/requests/create-address-request.dto';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
@ApiTags('User')
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
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
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
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  getUserById(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }

  @Post('/register')
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiOperation({ summary: 'Đăng ký tài khoản' })
  @ApiResponse({
    status: 201,
    description: 'Tạo thành công',
    type: BaseResponseDto,
  })
  @ResponseMessage('Đăng ký tài khoản thành công.')
  createUser(
    @Body() createUserRequest: CreateUserRequest,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const payload = {
      ...createUserRequest,
      avatarFile: file
        ? {
            originalname: file.originalname,
            mimetype: file.mimetype,
            buffer: Array.from(file.buffer), // Chuyển Buffer sang JSON để truyền qua RabbitMQ
          }
        : null,
    };
    return this.userService.createUser(payload);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin người dùng' })
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiResponse({
    status: 200,
    description: 'Cập nhật thành công',
    type: BaseResponseDto,
  })
  @ResponseMessage('Cập nhật người dùng thành công.')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  updateUser(
    @Param('id') id: number,
    @Body() updateUserRequest: UpdateUserRequest,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const payload = {
      ...updateUserRequest,
      avatarFile: file
        ? {
            originalname: file.originalname,
            mimetype: file.mimetype,
            buffer: Array.from(file.buffer), // Chuyển Buffer sang JSON để truyền qua RabbitMQ
          }
        : null,
    };
    return this.userService.updateUser(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa người dùng' })
  @ApiResponse({
    status: 200,
    description: 'Xóa thành công',
    type: BaseResponseDto,
  })
  @ResponseMessage('Xóa người dùng thành công.')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }

  @Get('/address/:id')
  @ApiOperation({ summary: 'Lấy thông tin một địa chỉ theo id' })
  @ApiResponse({
    status: 200,
    description: 'Thông tin địa chỉ',
    type: BaseResponseDto,
  })
  @ResponseMessage('Lấy thông tin địa chỉ thành công')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  getAddressById(@Param('id') id: number) {
    return this.userService.getAddressById(id);
  }

  @Post('/address')
  @ApiOperation({ summary: 'Tạo mới một địa chỉ' })
  @ApiResponse({
    status: 201,
    description: 'Tạo thành công',
    type: BaseResponseDto,
  })
  @ResponseMessage('Tạo địa chỉ thành công.')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  createAddress(@Body() createUserRequest: CreateAddressDto) {
    return this.userService.createAddress(createUserRequest);
  }

  @Put('/address/:id')
  @ApiOperation({ summary: 'Cập nhật thông tin địa chỉ' })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật thành công',
    type: BaseResponseDto,
  })
  @ResponseMessage('Cập nhật địa chỉ thành công.')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  updateAddress(
    @Param('id') id: number,
    @Body() updateUserRequest: UpdateAddressDto,
  ) {
    return this.userService.updateAddress(id, updateUserRequest);
  }

  @Delete('/address/:id')
  @ApiOperation({ summary: 'Xóa địa chỉ' })
  @ApiResponse({
    status: 200,
    description: 'Xóa thành công',
    type: BaseResponseDto,
  })
  @ResponseMessage('Xóa địa chỉ thành công.')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  deleteAddress(@Param('id') id: number) {
    return this.userService.deleteAddress(id);
  }
}
