import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CategoriesService } from '../services/categories.service';
import { CreateCategoryRequest } from '../dto/requests/create-category-requests.dto';
import { UpdateCategoryRequest } from '../dto/requests/update-category-requests.dto';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { BaseResponseDto } from '../dto/responses/base-response.dto';

@Controller('category')
@ApiTags('Category')
export class CategoriesController {
    constructor(private readonly categoryService: CategoriesService) {}

    @Get()
    @ApiOperation({ summary: 'Lấy danh sách tất cả danh mục' })
    @ApiResponse({ status: 200, description: 'Danh sách danh mục', type: BaseResponseDto })
    @ResponseMessage('Lấy danh sách tất cả danh mục thành công')
    getAllCategories() {
        return this.categoryService.getAllCategories();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Lấy thông tin danh mục theo ID' })
    @ApiResponse({ status: 200, description: 'Thông tin danh mục', type: BaseResponseDto })
    @ResponseMessage('Lấy thông tin danh mục thành công')
    getCategoryById(@Param('id') id: number) {
        return this.categoryService.getCategoryById(id);
    }

    @Post()
    @ApiOperation({ summary: 'Tạo mới một danh mục' })
    @ApiResponse({ status: 201, description: 'Danh mục được tạo thành công', type: BaseResponseDto })
    @ResponseMessage('Tạo danh mục thành công.')
    createCategory(@Body() createCategoryRequest: CreateCategoryRequest) {
        return this.categoryService.createCategory(createCategoryRequest);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Cập nhật thông tin danh mục' })
    @ApiResponse({ status: 200, description: 'Cập nhật thành công', type: BaseResponseDto })
    @ResponseMessage('Cập nhật danh mục thành công.')
    updateCategory(
        @Param('id') id: number,
        @Body() updateCategoryRequest: UpdateCategoryRequest,
    ) {
        return this.categoryService.updateCategory(id, updateCategoryRequest);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Xóa danh mục' })
    @ApiResponse({ status: 200, description: 'Xóa thành công', type: BaseResponseDto })
    @ResponseMessage('Xóa danh mục thành công.')
    deleteCategory(@Param('id') id: number) {
        return this.categoryService.deleteCategory(id);
    }
}
