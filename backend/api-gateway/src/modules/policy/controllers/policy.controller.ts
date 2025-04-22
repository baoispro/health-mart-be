import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PoliciesService } from '../services/policies.service';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { BaseResponseDto } from 'src/modules/user/dto/responses/base-response.dto';
import { UpdatePolicyRequest } from '../dto/request/update-policy-request.dto';
import { CreatePolicyRequest } from '../dto/request/create-policy-request.dto';

@Controller('policies')
@ApiTags('Policies')
export class PoliciesController {
  constructor(private readonly policiesService: PoliciesService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách chính sách' })
  @ApiResponse({
    status: 200,
    description: 'Danh sách chính sách',
    type: BaseResponseDto,
  })
  @ResponseMessage('Lấy danh sách tất cả chính sách thành công')
  getAllPolicies() {
    return this.policiesService.getAllPolicies();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin chính sách theo ID' })
  @ApiResponse({
    status: 200,
    description: 'Thông tin chính sách',
    type: BaseResponseDto,
  })
  @ResponseMessage('Lấy thông tin chính sách thành công')
  getPolicyById(@Param('id') id: number) {
    return this.policiesService.getPolicyById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Tạo mới một Chính sách' })
  @ApiResponse({
    status: 201,
    description: 'Chính sách được tạo thành công',
    type: BaseResponseDto,
  })
  @ResponseMessage('Tạo Chính sách thành công.')
  createPolicy(@Body() createPolicyRequest: CreatePolicyRequest) {
    return this.policiesService.createPolicy(createPolicyRequest);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin chính sách' })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật thành công',
    type: BaseResponseDto,
  })
  @ResponseMessage('Cập nhật chính sách thành công.')
  updatePolicy(
    @Param('id') id: number,
    @Body() updatePolicyRequest: UpdatePolicyRequest,
  ) {
    return this.policiesService.updatePolicy(id, updatePolicyRequest);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa chính sách' })
  @ApiResponse({
    status: 200,
    description: 'Xóa thành công',
    type: BaseResponseDto,
  })
  @ResponseMessage('Xóa chính sách thành công.')
  deleteProduct(@Param('id') id: number) {
    return this.policiesService.deletePolicy(id);
  }
}
