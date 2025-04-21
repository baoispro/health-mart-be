import { Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, throwError } from 'rxjs';
import { ClientProxyFactoryService } from 'src/utils/client-proxy.factory';
import { CreatePharmacyStockRequest } from '../dto/requests/create-pharmacystock-request.dto';
import { UpdatePharmacyStockRequest } from '../dto/requests/update-pharmacystock-request.dto';

@Injectable()
export class PharmacyStockService {
  private readonly pharmacyStockClient: ClientProxy;

  constructor(private readonly clientProxyFactory: ClientProxyFactoryService) {
    this.pharmacyStockClient = this.clientProxyFactory.createClient('productService');
  }

  private handleError = catchError((error) =>
    throwError(() => new RpcException(error.response || error.message)),
  );

  getAllPharmacyStocks() {
    return this.pharmacyStockClient.send('get_all_pharmacy_stocks', {}).pipe(this.handleError);
  }

  getPharmacyStockById(pharmacyId: number, productId: number) {
    return this.pharmacyStockClient
      .send('get_pharmacy_stock_by_id', { pharmacyId, productId })
      .pipe(this.handleError);
  }

  createPharmacyStock(createRequest: CreatePharmacyStockRequest) {
    return this.pharmacyStockClient
      .send('create_pharmacy_stock', createRequest)
      .pipe(this.handleError);
  }

  updatePharmacyStock(pharmacyId: number, productId: number, updateRequest: UpdatePharmacyStockRequest) {
    return this.pharmacyStockClient
      .send('update_pharmacy_stock', { pharmacyId, productId, updateRequest })
      .pipe(this.handleError);
  }

  deletePharmacyStock(pharmacyId: number, productId: number) {
    return this.pharmacyStockClient
      .send('delete_pharmacy_stock', { pharmacyId, productId })
      .pipe(this.handleError);
  }

  getStockByPharmacy(pharmacyId: number) {
    return this.pharmacyStockClient
      .send('get_stock_by_pharmacy', pharmacyId)
      .pipe(this.handleError);
  }

  getStockByProduct(productId: number) {
    return this.pharmacyStockClient
      .send('get_stock_by_product', productId)
      .pipe(this.handleError);
  }
}
