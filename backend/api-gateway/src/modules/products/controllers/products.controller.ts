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
import { CreateUsageRequest } from '../dto/requests/create-usages-request.dto';
import { UpdateUsageRequest } from '../dto/requests/update-usages-request.dto';

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
