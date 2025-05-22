import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreatePrecautionRequest } from '../dto/requests/create-precaution-request.dto';
import { UpdatePrecautionRequest } from '../dto/requests/update-precaution-request.dto';
import { PrecautionService } from '../services/preacaution.service';

@Controller('precaution')
export class PrecautionController {
  constructor(private readonly precautionService: PrecautionService) {}

  // Lấy tất cả cảnh báo
  @MessagePattern('get_all_precautions')
  getAllPrecautions() {
    return this.precautionService.findAll();
  }

  // Lấy cảnh báo theo ID
  @MessagePattern('get_precaution_by_id')
  async getPrecautionById(@Payload() id: number) {
    return this.precautionService.findOne(id);
  }

  // Tạo cảnh báo mới
  @MessagePattern('create_precaution')
  async createPrecaution(@Payload() createRequest: CreatePrecautionRequest) {
    return this.precautionService.create(createRequest);
  }

  // Cập nhật cảnh báo
  @MessagePattern('update_precaution')
  async updatePrecaution(
    @Payload() payload: { id: number; updateRequest: UpdatePrecautionRequest },
  ) {
    return this.precautionService.update(payload.id, payload.updateRequest);
  }

  // Xoá cảnh báo
  @MessagePattern('delete_precaution')
  async deletePrecaution(@Payload() id: number) {
    return this.precautionService.remove(id);
  }

  @MessagePattern('get_precautions_by_product_id')
  async getPrecautionsByProductId(@Payload() productId: number) {
    return this.precautionService.findByProduct(productId);
  }
}
