import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductRequest } from './dto/requests/create-product-request.dto';
import { UpdateProductRequest } from './dto/requests/update-product-request.dto';
import { BaseResponseDto } from './dto/responses/base-response.dto';

@Controller('product')
@ApiTags('Product')
export class ProductsController {
    constructor(private readonly productService: ProductsService) {}

    @Get()
    @ApiOperation({ summary: 'Lấy danh sách tất cả sản phẩm' })
    @ApiResponse({ status: 200, description: 'Danh sách sản phẩm', type: BaseResponseDto })
    getAllProducts() {
        return this.productService.getAllProducts();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Lấy thông tin sản phẩm theo ID' })
    @ApiResponse({ status: 200, description: 'Thông tin sản phẩm', type: BaseResponseDto })
    getProductById(@Param('id') id: number) {
        return this.productService.getProductById(id);
    }

    @Post()
    @ApiOperation({ summary: 'Tạo mới một sản phẩm' })
    @ApiResponse({ status: 201, description: 'Sản phẩm được tạo thành công', type: BaseResponseDto })
    createProduct(@Body() createProductRequest: CreateProductRequest) {
        return this.productService.createProduct(createProductRequest);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Cập nhật thông tin sản phẩm' })
    @ApiResponse({ status: 200, description: 'Cập nhật thành công', type: BaseResponseDto })
    updateProduct(
    @Param('id') id: number,
    @Body() updateProductRequest: UpdateProductRequest,
    ) {

    // Bắt buộc đảm bảo có categoryId
    return this.productService.updateProduct(id, {
        ...updateProductRequest,
        categoryId: updateProductRequest.categoryId || updateProductRequest.category_id,
    });
    }


    @Delete(':id')
    @ApiOperation({ summary: 'Xóa sản phẩm' })
    @ApiResponse({ status: 200, description: 'Xóa thành công', type: BaseResponseDto })
    deleteProduct(@Param('id') id: number) {
        return this.productService.deleteProduct(id);
    }
}
