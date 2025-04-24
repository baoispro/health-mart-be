// side-effect.service.interface.ts
import { SideEffect } from '../entities/side_effect.entity';
import { CreateSideEffectRequest } from '../dto/requests/create-sideEffect-request.dto';
import { UpdateSideEffectRequest } from '../dto/requests/update-sideEffect-request.dto';

export interface SideEffectService {
  create(createRequest: CreateSideEffectRequest): Promise<SideEffect>;
  findAll(): Promise<SideEffect[]>;
  findByProduct(productId: number): Promise<SideEffect[]>;
  update(
    id: number,
    updateRequest: UpdateSideEffectRequest,
  ): Promise<SideEffect>;
  remove(id: number): Promise<void>;
}
