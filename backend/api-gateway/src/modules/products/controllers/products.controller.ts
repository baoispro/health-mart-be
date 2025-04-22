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
import { UpdatePrecautionRequest } from '../dto/requests/update-precaution-request.dto';
import { CreatePrecautionRequest } from '../dto/requests/create-precaution-request.dto';
import { UpdateIngredientRequest } from '../dto/requests/update-ingredients-request.dto';
import { CreateIngredientRequest } from '../dto/requests/create-ingredients-request.dto';

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

  // ----- Ingredient APIs -----
  @Get('/ingredients')
  @ApiOperation({ summary: 'Lấy danh sách tất cả nguyên liệu' })
  @ResponseMessage('Lấy danh sách nguyên liệu thành công')
  getAllIngredients() {
    return this.productService.getAllIngredients();
  }

  @Get('/ingredients/:id')
  @ApiOperation({ summary: 'Lấy thông tin nguyên liệu theo ID' })
  @ResponseMessage('Lấy thông tin nguyên liệu thành công')
  getIngredientById(@Param('id') id: number) {
    return this.productService.getIngredientById(id);
  }

  @Post('/ingredients')
  @ApiOperation({ summary: 'Tạo nguyên liệu mới' })
  @ResponseMessage('Tạo nguyên liệu thành công')
  createIngredient(@Body() createRequest: CreateIngredientRequest) {
    return this.productService.createIngredient(createRequest);
  }

  @Put('/ingredients/:id')
  @ApiOperation({ summary: 'Cập nhật nguyên liệu' })
  @ResponseMessage('Cập nhật nguyên liệu thành công')
  updateIngredient(
    @Param('id') id: number,
    @Body() updateRequest: UpdateIngredientRequest,
  ) {
    return this.productService.updateIngredient(id, updateRequest);
  }

  @Delete('/ingredients/:id')
  @ApiOperation({ summary: 'Xóa nguyên liệu' })
  @ResponseMessage('Xóa nguyên liệu thành công')
  deleteIngredient(@Param('id') id: number) {
    return this.productService.deleteIngredient(id);
  }

  // ----- Precaution APIs -----
  @Get('/precautions')
  @ApiOperation({ summary: 'Lấy danh sách tất cả lưu ý' })
  @ResponseMessage('Lấy danh sách lưu ý thành công')
  getAllPrecautions() {
    return this.productService.getAllPrecautions();
  }

  @Get('/precautions/:id')
  @ApiOperation({ summary: 'Lấy thông tin lưu ý theo ID' })
  @ResponseMessage('Lấy thông tin lưu ý thành công')
  getPrecautionById(@Param('id') id: number) {
    return this.productService.getPrecautionById(id);
  }

  @Post('/precautions')
  @ApiOperation({ summary: 'Tạo lưu ý mới' })
  @ResponseMessage('Tạo lưu ý thành công')
  createPrecaution(@Body() createRequest: CreatePrecautionRequest) {
    return this.productService.createPrecaution(createRequest);
  }

  @Put('/precautions/:id')
  @ApiOperation({ summary: 'Cập nhật lưu ý' })
  @ResponseMessage('Cập nhật lưu ý thành công')
  updatePrecaution(
    @Param('id') id: number,
    @Body() updateRequest: UpdatePrecautionRequest,
  ) {
    return this.productService.updatePrecaution(id, updateRequest);
  }

  @Delete('/precautions/:id')
  @ApiOperation({ summary: 'Xóa lưu ý' })
  @ResponseMessage('Xóa lưu ý thành công')
  deletePrecaution(@Param('id') id: number) {
    return this.productService.deletePrecaution(id);
  }
}
