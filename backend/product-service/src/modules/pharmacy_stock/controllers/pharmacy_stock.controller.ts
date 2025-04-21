import { Controller } from '@nestjs/common';
import { PharmacyStockService } from '../services/pharmacy_stock.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreatePharmacyStockRequest } from '../dto/requests/create-pharmacystock-request.dto';
import { UpdatePharmacyStockRequest } from '../dto/requests/update-pharmacystock-request.dto';

@Controller('pharmacy-stock')
export class PharmacyStockController {
  constructor(private readonly pharmacyStockService: PharmacyStockService) {}

  // Lấy tất cả các tồn kho
  @MessagePattern('get_all_pharmacy_stocks')
  getAllPharmacyStocks() {
    return this.pharmacyStockService.findAll();
  }

  // Lấy tồn kho theo pharmacyId
  @MessagePattern('get_stock_by_pharmacy')
  async getStockByPharmacy(@Payload() pharmacyId: number) {
    return this.pharmacyStockService.findByPharmacy(pharmacyId);
  }

  // Lấy tồn kho theo productId
  @MessagePattern('get_stock_by_product')
  async getStockByProduct(@Payload() productId: number) {
    return this.pharmacyStockService.findByProduct(productId);
  }

  // Lấy tồn kho theo cả pharmacyId và productId
  @MessagePattern('get_pharmacy_stock_by_id')
  async getPharmacyStockById(@Payload() payload: { pharmacyId: number, productId: number }) {
    return this.pharmacyStockService.findOne(payload.pharmacyId, payload.productId);
  }

  // Tạo mới tồn kho
  @MessagePattern('create_pharmacy_stock')
  async createPharmacyStock(@Payload() createRequest: CreatePharmacyStockRequest) {
    return this.pharmacyStockService.create(createRequest);
  }

  // Cập nhật tồn kho
  @MessagePattern('update_pharmacy_stock')
  async updatePharmacyStock(
    @Payload() payload: { 
      pharmacyId: number, 
      productId: number, 
      updateRequest: UpdatePharmacyStockRequest 
    },
  ) {
    return this.pharmacyStockService.update(
      payload.pharmacyId, 
      payload.productId, 
      payload.updateRequest
    );
  }

  // Xóa tồn kho
  @MessagePattern('delete_pharmacy_stock')
  async deletePharmacyStock(@Payload() payload: { pharmacyId: number, productId: number }) {
    return this.pharmacyStockService.remove(payload.pharmacyId, payload.productId);
  }

  // Kiểm tra tồn tại tồn kho theo pharmacyId
  @MessagePattern('check_pharmacy_exist')
  async checkPharmacyExist(@Payload() pharmacyId: number) {
    return this.pharmacyStockService.checkPharmacyExist(pharmacyId);
  }
  
}
