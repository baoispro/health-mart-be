import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { IngredientService } from '../services/ingredient.service';
import { CreateIngredientRequest } from '../dto/requests/create-ingredients-request.dto';
import { UpdateIngredientRequest } from '../dto/requests/update-ingredients-request.dto';

@Controller('ingredient')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  // Lấy tất cả thành phần
  @MessagePattern('get_all_ingredients')
  getAllIngredients() {
    return this.ingredientService.findAll();
  }

  // Lấy thành phần theo ID
  @MessagePattern('get_ingredient_by_id')
  async getIngredientById(@Payload() id: number) {
    return this.ingredientService.findOne(id);
  }

  // Tạo thành phần mới
  @MessagePattern('create_ingredient')
  async createIngredient(@Payload() createRequest: CreateIngredientRequest) {
    return this.ingredientService.create(createRequest);
  }

  // Cập nhật thành phần
  @MessagePattern('update_ingredient')
  async updateIngredient(
    @Payload() payload: { id: number; updateRequest: UpdateIngredientRequest },
  ) {
    return this.ingredientService.update(payload.id, payload.updateRequest);
  }

  // Xoá thành phần
  @MessagePattern('delete_ingredient')
  async deleteIngredient(@Payload() id: number) {
    return this.ingredientService.remove(id);
  }
}
