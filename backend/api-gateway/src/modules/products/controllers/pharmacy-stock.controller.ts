// src/controllers/pharmacy-stock.controller.ts
import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PharmacyStockService } from '../services/pharmacy-stock.service';
import { CreatePharmacyStockRequest } from '../dto/requests/create-pharmacystock-request.dto';
import { UpdatePharmacyStockRequest } from '../dto/requests/update-pharmacystock-request.dto';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { BaseResponseDto } from '../dto/responses/base-response.dto';

@Controller('pharmacy-stocks')
@ApiTags('Pharmacy Stock')
export class PharmacyStockController {
  constructor(private readonly pharmacyStockService: PharmacyStockService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tồn kho nhà thuốc' })
  @ApiResponse({ status: 200, type: BaseResponseDto })
  @ResponseMessage('Lấy danh sách tồn kho thành công')
  getAllPharmacyStocks() {
    return this.pharmacyStockService.getAllPharmacyStocks();
  }

  @Get('by-pharmacy/:pharmacyId')
  @ApiOperation({ summary: 'Lấy tồn kho theo nhà thuốc' })
  @ApiResponse({ status: 200, type: BaseResponseDto })
  @ResponseMessage('Lấy tồn kho theo nhà thuốc thành công')
  getStockByPharmacy(@Param('pharmacyId') pharmacyId: number) {
    return this.pharmacyStockService.getStockByPharmacy(pharmacyId);
  }

  @Get('by-product/:productId')
  @ApiOperation({ summary: 'Lấy tồn kho theo sản phẩm' })
  @ApiResponse({ status: 200, type: BaseResponseDto })
  @ResponseMessage('Lấy tồn kho theo sản phẩm thành công')
  getStockByProduct(@Param('productId') productId: number) {
    return this.pharmacyStockService.getStockByProduct(productId);
  }

  @Get(':pharmacyId/:productId')
  @ApiOperation({ summary: 'Lấy tồn kho theo nhà thuốc + sản phẩm' })
  @ApiResponse({ status: 200, type: BaseResponseDto })
  @ResponseMessage('Lấy tồn kho theo nhà thuốc và sản phẩm thành công')
  getPharmacyStockById(
    @Param('pharmacyId') pharmacyId: number,
    @Param('productId') productId: number,
  ) {
    return this.pharmacyStockService.getPharmacyStockById(pharmacyId, productId);
  }

  @Post()
  @ApiOperation({ summary: 'Tạo mới tồn kho nhà thuốc' })
  @ApiResponse({ status: 201, type: BaseResponseDto })
  @ResponseMessage('Tạo tồn kho thành công')
  createPharmacyStock(@Body() createRequest: CreatePharmacyStockRequest) {
    return this.pharmacyStockService.createPharmacyStock(createRequest);
  }

  @Put(':pharmacyId/:productId')
  @ApiOperation({ summary: 'Cập nhật thông tin tồn kho' })
  @ApiResponse({ status: 200, type: BaseResponseDto })
  @ResponseMessage('Cập nhật tồn kho thành công')
  updatePharmacyStock(
    @Param('pharmacyId') pharmacyId: number,
    @Param('productId') productId: number,
    @Body() updateRequest: UpdatePharmacyStockRequest,
  ) {
    return this.pharmacyStockService.updatePharmacyStock(pharmacyId, productId, updateRequest);
  }

  @Delete(':pharmacyId/:productId')
  @ApiOperation({ summary: 'Xóa tồn kho' })
  @ApiResponse({ status: 200, type: BaseResponseDto })
  @ResponseMessage('Xóa tồn kho thành công')
  deletePharmacyStock(
    @Param('pharmacyId') pharmacyId: number,
    @Param('productId') productId: number,
  ) {
    return this.pharmacyStockService.deletePharmacyStock(pharmacyId, productId);
  }
}
