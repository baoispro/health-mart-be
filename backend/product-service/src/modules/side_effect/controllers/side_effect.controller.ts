import { Controller } from '@nestjs/common';
import { SideEffectService } from '../services/side_effect.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateSideEffectRequest } from '../dto/requests/create-sideEffect-request.dto';
import { UpdateSideEffectRequest } from '../dto/requests/update-sideEffect-request.dto';

@Controller('side-effect')
  export class SideEffectController {
    constructor(private readonly sideEffectService: SideEffectService) {}

    @MessagePattern('get_all_side_effects')
  async getAllSideEffects() {
    return this.sideEffectService.findAll();
  }

  @MessagePattern('get_side_effects_by_product')
  async getSideEffectsByProduct(@Payload() productId: number) {
    return this.sideEffectService.findByProduct(productId);
  }

  @MessagePattern('create_side_effect')
  async createSideEffect(@Payload() createRequest: CreateSideEffectRequest) {
    return this.sideEffectService.create(createRequest);
  }

  @MessagePattern('update_side_effect')
  async updateSideEffect(
    @Payload() payload: { id: number, updateRequest: UpdateSideEffectRequest },
  ) {
    return this.sideEffectService.update(payload.id, payload.updateRequest);
  }

  @MessagePattern('delete_side_effect')
  async deleteSideEffect(@Payload() id: number) {
    return this.sideEffectService.remove(id);
  }
}