import { Controller, Get, Post, Body, Put, Delete, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SideEffectService } from '../services/side-effect.service';
import { CreateSideEffectRequest } from '../dto/requests/create-sideEffect-request.dto';
import { UpdateSideEffectRequest } from '../dto/requests/update-sideEffect-request.dto';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { BaseResponseDto } from '../dto/responses/base-response.dto';

@Controller('side-effects')
@ApiTags('Side Effects')
export class SideEffectController {
  constructor(private readonly sideEffectService: SideEffectService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy tất cả tác dụng phụ' })
  @ApiResponse({ status: 200, description: 'Danh sách tác dụng phụ', type: BaseResponseDto })
  @ResponseMessage('Lấy tất cả tác dụng phụ thành công')
  layTatCaTacDungPhu() {
    return this.sideEffectService.getAllSideEffects();
  }

  @Get('by-product/:productId')
  @ApiOperation({ summary: 'Lấy tác dụng phụ theo sản phẩm' })
  @ApiResponse({ status: 200, description: 'Danh sách tác dụng phụ theo sản phẩm', type: BaseResponseDto })
  @ResponseMessage('Lấy tác dụng phụ theo sản phẩm thành công')
  layTacDungPhuTheoSanPham(@Param('productId') productId: number) {
    return this.sideEffectService.getSideEffectsByProduct(productId);
  }

  @Post()
  @ApiOperation({ summary: 'Tạo tác dụng phụ mới' })
  @ApiResponse({ status: 201, description: 'Tạo mới tác dụng phụ thành công', type: BaseResponseDto })
  @ResponseMessage('Tạo tác dụng phụ thành công')
  taoTacDungPhu(@Body() createRequest: CreateSideEffectRequest) {
    return this.sideEffectService.createSideEffect(createRequest);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật tác dụng phụ' })
  @ApiResponse({ status: 200, description: 'Cập nhật tác dụng phụ thành công', type: BaseResponseDto })
  @ResponseMessage('Cập nhật tác dụng phụ thành công')
  capNhatTacDungPhu(
    @Param('id') id: number,
    @Body() updateRequest: UpdateSideEffectRequest,
  ) {
    return this.sideEffectService.updateSideEffect(id, updateRequest);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa tác dụng phụ' })
  @ApiResponse({ status: 200, description: 'Xóa tác dụng phụ thành công', type: BaseResponseDto })
  @ResponseMessage('Xóa tác dụng phụ thành công')
  xoaTacDungPhu(@Param('id') id: number) {
    return this.sideEffectService.deleteSideEffect(id);
  }
}
