import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { AuthService } from '../services/auth.service';
import { LoginRespone } from '../dto/responses/login-response.dto';
import { LoginRequest } from '../dto/request/login-request.dto';
import { LogoutRequest } from '../dto/request/logout-request.dto';
import { VerifyTokenRequest } from '../dto/request/verify-token-request.dto';
import { RefreshTokenResponse } from '../dto/responses/refresh-token-response.dto';
import { BaseResponseDto } from '../dto/responses/base-response.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get(':email')
  @ApiOperation({ summary: 'Lấy thông tin một người dùng' })
  @ApiResponse({
    status: 200,
    description: 'Thông tin user',
  })
  @ResponseMessage('Lấy thông tin người dùng thành công')
  getUserById(@Param('email') email: string) {
    return this.authService.getUserByEmail(email);
  }

  @Post('/login')
  @ApiOperation({ summary: 'Đăng nhập vào hệ thống' })
  @ApiResponse({
    status: 201,
    description: 'Đăng nhập thành công',
    type: LoginRespone,
  })
  @ResponseMessage('Đăng nhập thành công.')
  createUser(@Body() dto: LoginRequest) {
    return this.authService.login(dto);
  }

  @Post('/refresh-token')
  @ApiOperation({ summary: 'Làm mới token' })
  @ApiResponse({
    status: 201,
    description: 'Làm mới token thành công',
    type: RefreshTokenResponse,
  })
  @ResponseMessage('Làm mới token thành công.')
  refreshToken(@Body() dto: VerifyTokenRequest) {
    return this.authService.refreshToken(dto.token);
  }

  @Get('/refresh-token/:email')
  @ApiOperation({ summary: 'Tìm kiếm refresh token theo email' })
  @ApiResponse({
    status: 200,
    description: '',
    type: BaseResponseDto,
  })
  @ResponseMessage('Tìm refresh token thành công')
  findrefreshToken(@Param('email') email: string) {
    return this.authService.findRefreshToken(email);
  }

  @Post('/logout')
  @ApiOperation({ summary: 'Đăng xuất khỏi hệ thống' })
  @ApiResponse({
    status: 201,
    description: 'Đăng xuất thành công',
  })
  @ResponseMessage('Đăng xuất thành công.')
  logout(@Body() dto: LogoutRequest) {
    return this.authService.logout(dto.userId);
  }
}
