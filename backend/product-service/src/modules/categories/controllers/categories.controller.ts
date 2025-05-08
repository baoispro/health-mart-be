import { Controller } from '@nestjs/common';
import { CategoriesService } from '../services/categories.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateCategoryRequest } from '../dto/requests/create-category-request.dto';
import { UpdateCategoryRequest } from '../dto/requests/update-category-request.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {}

  @MessagePattern('get_all_categories')
  getAllCategories() {
    return this.categoryService.findAll();
  }

  @MessagePattern('get_category_by_id')
  async getCategoryById(@Payload() id: number) {
    return this.categoryService.findOne(id);
  }

  @MessagePattern('create_category')
  async createCategory(
    @Payload() createCategoryRequest: CreateCategoryRequest,
  ) {
    return this.categoryService.create(createCategoryRequest);
  }

  @MessagePattern('update_category')
  async updateCategory(
    @Payload()
    payload: {
      id: number;
      updateCategoryRequest: UpdateCategoryRequest;
    },
  ) {
    const { id, updateCategoryRequest } = payload;
    return this.categoryService.update(id, updateCategoryRequest);
  }

  @MessagePattern('delete_category')
  async deleteCategory(@Payload() id: number) {
    return this.categoryService.remove(id);
  }

  @MessagePattern('get_root_category')
  async GetRootCategory() {
    return this.categoryService.findRootCategories();
  }
}
