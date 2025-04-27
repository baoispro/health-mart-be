import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ProductsService } from '../services/products.service';
import { CreateProductRequest } from '../dto/requests/create-product-request.dto';
import { UpdateProductRequest } from '../dto/requests/update-product-request.dto';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { BaseResponseDto } from '../dto/responses/base-response.dto';
import { UpdatePrecautionRequest } from '../dto/requests/update-precaution-request.dto';
import { CreatePrecautionRequest } from '../dto/requests/create-precaution-request.dto';
import { UpdateIngredientRequest } from '../dto/requests/update-ingredients-request.dto';
import { CreateIngredientRequest } from '../dto/requests/create-ingredients-request.dto';
import { CreateUsageRequest } from '../dto/requests/create-usage-request.dto';
import { UpdateUsageRequest } from '../dto/requests/update-usage-request.dto';
import { CreateDosageRequest } from '../dto/requests/create-dosage-request.dto';
import { UpdateDosageRequest } from '../dto/requests/update-dosage-request.dto';
import { CreateStorageRequest } from '../dto/requests/create-storage-request.dto';
import { UpdateStorageRequest } from '../dto/requests/update-storage-request.dto';
import { CreatePharmacyStockRequest } from '../dto/requests/create-pharmacystock-request.dto';
import { UpdatePharmacyStockRequest } from '../dto/requests/update-pharmacystock-request.dto';
import { CreateSideEffectRequest } from '../dto/requests/create-sideEffect-request.dto';
import { UpdateSideEffectRequest } from '../dto/requests/update-sideEffect-request.dto';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt-auth.guard';
import { CreateCategoryRequest } from '../dto/requests/create-category-requests.dto';
import { UpdateCategoryRequest } from '../dto/requests/update-category-requests.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
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

  @Get('/categories')
  @ApiOperation({ summary: 'Lấy danh sách tất cả danh mục' })
  @ApiResponse({
    status: 200,
    description: 'Danh sách danh mục',
    type: BaseResponseDto,
  })
  @ResponseMessage('Lấy danh sách tất cả danh mục thành công')
  getAllCategories() {
    return this.productService.getAllCategories();
  }

  @Get('/pharmacy-stocks')
  @ApiOperation({ summary: 'Lấy danh sách tồn kho nhà thuốc' })
  @ApiResponse({ status: 200, type: BaseResponseDto })
  @ResponseMessage('Lấy danh sách tồn kho thành công')
  getAllPharmacyStocks() {
    return this.productService.getAllPharmacyStocks();
  }

  @Get('side-effects')
  @ApiOperation({ summary: 'Lấy tất cả tác dụng phụ' })
  @ApiResponse({
    status: 200,
    description: 'Danh sách tác dụng phụ',
    type: BaseResponseDto,
  })
  @ResponseMessage('Lấy tất cả tác dụng phụ thành công')
  layTatCaTacDungPhu() {
    return this.productService.getAllSideEffects();
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

  @Get('/precautions')
  @ApiOperation({ summary: 'Lấy danh sách tất cả lưu ý' })
  @ResponseMessage('Lấy danh sách lưu ý thành công')
  getAllPrecautions() {
    return this.productService.getAllPrecautions();
  }

  @Get('/ingredients')
  @ApiOperation({ summary: 'Lấy danh sách tất cả nguyên liệu' })
  @ResponseMessage('Lấy danh sách nguyên liệu thành công')
  getAllIngredients() {
    return this.productService.getAllIngredients();
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

  @Get('/storages')
  @ApiOperation({ summary: 'Lấy danh sách tất cả cách bảo quản' })
  @ApiResponse({
    status: 200,
    description: 'Danh sách công dụng',
    type: BaseResponseDto,
  })
  @ResponseMessage('Lấy danh sách tất cả cách bảo quản thành công')
  getAllStorages() {
    return this.productService.getAllStorages();
  }

  @Get('/category/:id')
  @ApiOperation({ summary: 'Lấy thông tin danh mục theo ID' })
  @ApiResponse({
    status: 200,
    description: 'Thông tin danh mục',
    type: BaseResponseDto,
  })
  @ResponseMessage('Lấy thông tin danh mục thành công')
  getCategoryById(@Param('id') id: number) {
    return this.productService.getCategoryById(id);
  }

  @Get('/ingredients/:id')
  @ApiOperation({ summary: 'Lấy thông tin nguyên liệu theo ID' })
  @ResponseMessage('Lấy thông tin nguyên liệu thành công')
  getIngredientById(@Param('id') id: number) {
    return this.productService.getIngredientById(id);
  }

  @Get('pharmacy-stocks/:pharmacyId')
  @ApiOperation({ summary: 'Lấy tồn kho theo nhà thuốc' })
  @ApiResponse({ status: 200, type: BaseResponseDto })
  @ResponseMessage('Lấy tồn kho theo nhà thuốc thành công')
  getStockByPharmacy(@Param('pharmacyId') pharmacyId: number) {
    return this.productService.getStockByPharmacy(pharmacyId);
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

  @Get('/precautions/:id')
  @ApiOperation({ summary: 'Lấy thông tin lưu ý theo ID' })
  @ResponseMessage('Lấy thông tin lưu ý thành công')
  getPrecautionById(@Param('id') id: number) {
    return this.productService.getPrecautionById(id);
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

  @Get('/storages/:id')
  @ApiOperation({ summary: 'Lấy danh sách cách bảo quản theo id' })
  @ApiResponse({
    status: 200,
    description: 'Thông tin cách bảo quản theo id cách bảo quản',
    type: BaseResponseDto,
  })
  @ResponseMessage('Lấy danh sách cách bảo quản thành công')
  getStorageById(@Param('id') id: number) {
    return this.productService.getStorageById(id);
  }

  @Get(':productId/pharmacy-stocks')
  @ApiOperation({ summary: 'Lấy tồn kho theo sản phẩm' })
  @ApiResponse({ status: 200, type: BaseResponseDto })
  @ResponseMessage('Lấy tồn kho theo sản phẩm thành công')
  getStockByProduct(@Param('productId') productId: number) {
    return this.productService.getStockByProduct(productId);
  }

  @Get(':productId/side-effects')
  @ApiOperation({ summary: 'Lấy tác dụng phụ theo sản phẩm' })
  @ApiResponse({
    status: 200,
    description: 'Danh sách tác dụng phụ theo sản phẩm',
    type: BaseResponseDto,
  })
  @ResponseMessage('Lấy tác dụng phụ theo sản phẩm thành công')
  layTacDungPhuTheoSanPham(@Param('productId') productId: number) {
    return this.productService.getSideEffectsByProduct(productId);
  }

  @Get(':productId/pharmacy-stocks/:pharmacyId')
  @ApiOperation({ summary: 'Lấy tồn kho theo nhà thuốc + sản phẩm' })
  @ApiResponse({ status: 200, type: BaseResponseDto })
  @ResponseMessage('Lấy tồn kho theo nhà thuốc và sản phẩm thành công')
  getPharmacyStockById(
    @Param('pharmacyId') pharmacyId: number,
    @Param('productId') productId: number,
  ) {
    return this.productService.getPharmacyStockById(pharmacyId, productId);
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

  @Get(':id/storage')
  @ApiOperation({ summary: 'Lấy danh sách cách bảo quản theo id sản phẩm' })
  @ApiResponse({
    status: 200,
    description: 'Thông tin cách bảo quản theo id sản phẩm',
    type: BaseResponseDto,
  })
  @ResponseMessage('Lấy danh sách cách bảo quản theo id sản phẩm thành công')
  getStorageByProductId(@Param('id') id: number) {
    return this.productService.getStorageByProductId(id);
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

  @Post('/precautions')
  @ApiOperation({ summary: 'Tạo lưu ý mới' })
  @ResponseMessage('Tạo lưu ý thành công')
  createPrecaution(@Body() createRequest: CreatePrecautionRequest) {
    return this.productService.createPrecaution(createRequest);
  }

  @Post('/pharmacy-stocks')
  @ApiOperation({ summary: 'Tạo mới tồn kho nhà thuốc' })
  @ApiResponse({ status: 201, type: BaseResponseDto })
  @ResponseMessage('Tạo tồn kho thành công')
  createPharmacyStock(@Body() createRequest: CreatePharmacyStockRequest) {
    return this.productService.createPharmacyStock(createRequest);
  }

  @Post('/side-effects')
  @ApiOperation({ summary: 'Tạo tác dụng phụ mới' })
  @ApiResponse({
    status: 201,
    description: 'Tạo mới tác dụng phụ thành công',
    type: BaseResponseDto,
  })
  @ResponseMessage('Tạo tác dụng phụ thành công')
  taoTacDungPhu(@Body() createRequest: CreateSideEffectRequest) {
    return this.productService.createSideEffect(createRequest);
  }

  @Post('/ingredients')
  @ApiOperation({ summary: 'Tạo nguyên liệu mới' })
  @ResponseMessage('Tạo nguyên liệu thành công')
  createIngredient(@Body() createRequest: CreateIngredientRequest) {
    return this.productService.createIngredient(createRequest);
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

  @Post('/category')
  @ApiOperation({ summary: 'Tạo mới một danh mục' })
  @ApiResponse({
    status: 201,
    description: 'Danh mục được tạo thành công',
    type: BaseResponseDto,
  })
  @ResponseMessage('Tạo danh mục thành công.')
  createCategory(@Body() createCategoryRequest: CreateCategoryRequest) {
    return this.productService.createCategory(createCategoryRequest);
  }

  @Post('/storages')
  @ApiOperation({ summary: 'Tạo mới một cách bảo quản' })
  @ApiResponse({
    status: 201,
    description: 'Cách bảo quản được tạo thành công',
    type: BaseResponseDto,
  })
  @ResponseMessage('Tạo cách bảo quản thành công.')
  createStorage(@Body() createStorageRequest: CreateStorageRequest) {
    return this.productService.createStorage(createStorageRequest);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image_url'))
  @ApiOperation({ summary: 'Tạo mới một sản phẩm' })
  @ApiResponse({
    status: 201,
    description: 'Sản phẩm được tạo thành công',
    type: BaseResponseDto,
  })
  @ResponseMessage('Tạo sản phẩm thành công.')
  createProduct(
    @Body() createProductRequest: CreateProductRequest,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const payload = {
      ...createProductRequest,
      avatarFile: file
        ? {
            originalname: file.originalname,
            mimetype: file.mimetype,
            buffer: Array.from(file.buffer), // Chuyển Buffer sang JSON để truyền qua RabbitMQ
          }
        : null,
    };
    return this.productService.createProduct(payload);
  }

  @Put(':productId/pharmacy-stocks/:pharmacyId')
  @ApiOperation({ summary: 'Cập nhật thông tin tồn kho' })
  @ApiResponse({ status: 200, type: BaseResponseDto })
  @ResponseMessage('Cập nhật tồn kho thành công')
  updatePharmacyStock(
    @Param('pharmacyId') pharmacyId: number,
    @Param('productId') productId: number,
    @Body() updateRequest: UpdatePharmacyStockRequest,
  ) {
    return this.productService.updatePharmacyStock(
      pharmacyId,
      productId,
      updateRequest,
    );
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

  @Put('/ingredients/:id')
  @ApiOperation({ summary: 'Cập nhật nguyên liệu' })
  @ResponseMessage('Cập nhật nguyên liệu thành công')
  updateIngredient(
    @Param('id') id: number,
    @Body() updateRequest: UpdateIngredientRequest,
  ) {
    return this.productService.updateIngredient(id, updateRequest);
  }

  @Put('/category/:id')
  @ApiOperation({ summary: 'Cập nhật thông tin danh mục' })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật thành công',
    type: BaseResponseDto,
  })
  @ResponseMessage('Cập nhật danh mục thành công.')
  updateCategory(
    @Param('id') id: number,
    @Body() updateCategoryRequest: UpdateCategoryRequest,
  ) {
    return this.productService.updateCategory(id, updateCategoryRequest);
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

  @Put('/storages/:id')
  @ApiOperation({ summary: 'Cập nhật thông tin cách bảo quản' })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật thành công',
    type: BaseResponseDto,
  })
  @ResponseMessage('Cập nhật cách bảo quản thành công.')
  updateStorage(
    @Param('id') id: number,
    @Body() updateStorageRequest: UpdateStorageRequest,
  ) {
    return this.productService.updateStorage(id, updateStorageRequest);
  }

  @Put('/side-effects/:id')
  @ApiOperation({ summary: 'Cập nhật tác dụng phụ' })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật tác dụng phụ thành công',
    type: BaseResponseDto,
  })
  @ResponseMessage('Cập nhật tác dụng phụ thành công')
  capNhatTacDungPhu(
    @Param('id') id: number,
    @Body() updateRequest: UpdateSideEffectRequest,
  ) {
    return this.productService.updateSideEffect(id, updateRequest);
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

  @Delete('/storages/:id')
  @ApiOperation({ summary: 'Xóa cách bảo quản' })
  @ApiResponse({
    status: 200,
    description: 'Xóa thành công',
    type: BaseResponseDto,
  })
  @ResponseMessage('Xóa cách bảo quản thành công.')
  deleteStorage(@Param('id') id: number) {
    return this.productService.deleteStorage(id);
  }

  @Delete('/precautions/:id')
  @ApiOperation({ summary: 'Xóa lưu ý' })
  @ResponseMessage('Xóa lưu ý thành công')
  deletePrecaution(@Param('id') id: number) {
    return this.productService.deletePrecaution(id);
  }

  @Delete('/category/:id')
  @ApiOperation({ summary: 'Xóa danh mục' })
  @ApiResponse({
    status: 200,
    description: 'Xóa thành công',
    type: BaseResponseDto,
  })
  @ResponseMessage('Xóa danh mục thành công.')
  deleteCategory(@Param('id') id: number) {
    return this.productService.deleteCategory(id);
  }

  @Delete('/side-effects/:id')
  @ApiOperation({ summary: 'Xóa tác dụng phụ' })
  @ApiResponse({
    status: 200,
    description: 'Xóa tác dụng phụ thành công',
    type: BaseResponseDto,
  })
  @ResponseMessage('Xóa tác dụng phụ thành công')
  xoaTacDungPhu(@Param('id') id: number) {
    return this.productService.deleteSideEffect(id);
  }

  @Delete('/ingredients/:id')
  @ApiOperation({ summary: 'Xóa nguyên liệu' })
  @ResponseMessage('Xóa nguyên liệu thành công')
  deleteIngredient(@Param('id') id: number) {
    return this.productService.deleteIngredient(id);
  }

  @Delete(':productId/pharmacy-stocks/:pharmacyId')
  @ApiOperation({ summary: 'Xóa tồn kho' })
  @ApiResponse({ status: 200, type: BaseResponseDto })
  @ResponseMessage('Xóa tồn kho thành công')
  deletePharmacyStock(
    @Param('pharmacyId') pharmacyId: number,
    @Param('productId') productId: number,
  ) {
    return this.productService.deletePharmacyStock(pharmacyId, productId);
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
