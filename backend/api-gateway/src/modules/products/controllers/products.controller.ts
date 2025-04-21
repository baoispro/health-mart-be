import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProductsService } from '../services/products.service';
import { CreateProductRequest } from '../dto/requests/create-product-request.dto';
import { UpdateProductRequest } from '../dto/requests/update-product-request.dto';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { BaseResponseDto } from '../dto/responses/base-response.dto';
import { CreateUsageRequest } from '../dto/requests/create-usage-request.dto';
import { UpdateUsageRequest } from '../dto/requests/update-usage-request.dto';
import { CreateDosageRequest } from '../dto/requests/create-dosage-request.dto';
import { UpdateDosageRequest } from '../dto/requests/update-dosage-request.dto';

@Controller('product')
@ApiTags('Product')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả sản phẩm' })
  @ApiResponse({
    status: 200,
    description: 'Danh sách sản phẩm',
    type: BaseResponseDto,
  })
  @ResponseMessage('Lấy danh sách tất cả sản phẩm thành công')
  getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Get('/dosages')
  @ApiOperation({ summary: 'Lấy danh sách tất cả cách dùng' })
  @ApiResponse({
    status: 200,
    description: 'Danh sách cách dùng',
    type: BaseResponseDto,
  })
  @ResponseMessage('Lấy danh sách tất cả cách dùng thành công')
  getAllDosages() {
    return this.productService.getAllDosages();
  }

  @Get('/usages')
  @ApiOperation({ summary: 'Lấy danh sách tất cả công dụng' })
  @ApiResponse({
    status: 200,
    description: 'Danh sách công dụng',
    type: BaseResponseDto,
  })
  @ResponseMessage('Lấy danh sách tất cả công dụng thành công')
  getAllUsages() {
    return this.productService.getAllUsages();
  }

  @Get('/dosages/:id')
  @ApiOperation({ summary: 'Lấy danh sách cách dùng theo id' })
  @ApiResponse({
    status: 200,
    description: 'Thông tin cách dùng theo id cách dùng',
    type: BaseResponseDto,
  })
  @ResponseMessage('Lấy danh sách cách dùng thành công')
  getDosageById(@Param('id') id: number) {
    return this.productService.getDosagesById(id);
  }

  @Get('/usages/:id')
  @ApiOperation({ summary: 'Lấy danh sách công dụng theo id' })
  @ApiResponse({
    status: 200,
    description: 'Thông tin công dụng theo id công dụng',
    type: BaseResponseDto,
  })
  @ResponseMessage('Lấy danh sách công dụng thành công')
  getUsageById(@Param('id') id: number) {
    return this.productService.getUsagesById(id);
  }

  @Get(':id/dosages')
  @ApiOperation({ summary: 'Lấy danh sách cách dùng theo id sản phẩm' })
  @ApiResponse({
    status: 200,
    description: 'Thông tin cách dùng theo id sản phẩm',
    type: BaseResponseDto,
  })
  @ResponseMessage('Lấy danh sách cách dùng theo id sản phẩm thành công')
  getDosageByProductId(@Param('id') id: number) {
    return this.productService.getDosagesByProductId(id);
  }

  @Get(':id/usage')
  @ApiOperation({ summary: 'Lấy danh sách công dụng theo id sản phẩm' })
  @ApiResponse({
    status: 200,
    description: 'Thông tin công dụng theo id sản phẩm',
    type: BaseResponseDto,
  })
  @ResponseMessage('Lấy danh sách công dụng theo id sản phẩm thành công')
  getUsageByProductId(@Param('id') id: number) {
    return this.productService.getUsageByProductId(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin sản phẩm theo ID' })
  @ApiResponse({
    status: 200,
    description: 'Thông tin sản phẩm',
    type: BaseResponseDto,
  })
  @ResponseMessage('Lấy thông tin sản phẩm thành công')
  getProductById(@Param('id') id: number) {
    return this.productService.getProductById(id);
  }

  @Post('/dosages')
  @ApiOperation({ summary: 'Tạo mới một cách dùng' })
  @ApiResponse({
    status: 201,
    description: 'Cách dùng được tạo thành công',
    type: BaseResponseDto,
  })
  @ResponseMessage('Tạo cách dùng thành công.')
  createDosage(@Body() createDosageRequest: CreateDosageRequest) {
    return this.productService.createDosage(createDosageRequest);
  }

  @Post('/usages')
  @ApiOperation({ summary: 'Tạo mới một công dụng' })
  @ApiResponse({
    status: 201,
    description: 'Công dụng được tạo thành công',
    type: BaseResponseDto,
  })
  @ResponseMessage('Tạo công dụng thành công.')
  createUsage(@Body() createUsageRequest: CreateUsageRequest) {
    return this.productService.createUsage(createUsageRequest);
  }

  @Post()
  @ApiOperation({ summary: 'Tạo mới một sản phẩm' })
  @ApiResponse({
    status: 201,
    description: 'Sản phẩm được tạo thành công',
    type: BaseResponseDto,
  })
  @ResponseMessage('Tạo sản phẩm thành công.')
  createProduct(@Body() createProductRequest: CreateProductRequest) {
    return this.productService.createProduct(createProductRequest);
  }

  @Put('/dosages/:id')
  @ApiOperation({ summary: 'Cập nhật thông tin cách dùng' })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật thành công',
    type: BaseResponseDto,
  })
  @ResponseMessage('Cập nhật cách dùng thành công.')
  updateDosage(
    @Param('id') id: number,
    @Body() updateDosageRequest: UpdateDosageRequest,
  ) {
    return this.productService.updateDosage(id, updateDosageRequest);
  }

  @Put('/usages/:id')
  @ApiOperation({ summary: 'Cập nhật thông tin công dụng' })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật thành công',
    type: BaseResponseDto,
  })
  @ResponseMessage('Cập nhật công dụng thành công.')
  updateUsage(
    @Param('id') id: number,
    @Body() updateUsageRequest: UpdateUsageRequest,
  ) {
    return this.productService.updateUsage(id, updateUsageRequest);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin sản phẩm' })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật thành công',
    type: BaseResponseDto,
  })
  @ResponseMessage('Cập nhật sản phẩm thành công.')
  updateProduct(
    @Param('id') id: number,
    @Body() updateProductRequest: UpdateProductRequest,
  ) {
    // Bắt buộc đảm bảo có categoryId
    return this.productService.updateProduct(id, updateProductRequest);
  }

  @Delete('/dosages/:id')
  @ApiOperation({ summary: 'Xóa cách dùng' })
  @ApiResponse({
    status: 200,
    description: 'Xóa thành công',
    type: BaseResponseDto,
  })
  @ResponseMessage('Xóa cách dùng thành công.')
  deleteDosage(@Param('id') id: number) {
    return this.productService.deleteDosage(id);
  }

  @Delete('/usages/:id')
  @ApiOperation({ summary: 'Xóa công dụng' })
  @ApiResponse({
    status: 200,
    description: 'Xóa thành công',
    type: BaseResponseDto,
  })
  @ResponseMessage('Xóa công dụng thành công.')
  deleteUsage(@Param('id') id: number) {
    return this.productService.deleteUsage(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa sản phẩm' })
  @ApiResponse({
    status: 200,
    description: 'Xóa thành công',
    type: BaseResponseDto,
  })
  @ResponseMessage('Xóa sản phẩm thành công.')
  deleteProduct(@Param('id') id: number) {
    return this.productService.deleteProduct(id);
  }
}
