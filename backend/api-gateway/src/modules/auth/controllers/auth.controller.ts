import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { BaseResponseDto } from '../dto/responses/base-response.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get(':email')
  @ApiOperation({ summary: 'Lấy thông tin một người dùng' })
  @ApiResponse({
    status: 200,
    description: 'Thông tin user',
    type: BaseResponseDto,
  })
  @ResponseMessage('Lấy thông tin người dùng thành công')
  getUserById(@Param('email') email: string) {
    return this.authService.getUserByEmail(email);
  }
}
