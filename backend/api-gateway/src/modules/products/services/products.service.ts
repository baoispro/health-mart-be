import { Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, throwError } from 'rxjs';
import { instanceToPlain } from 'class-transformer';
import { ClientProxyFactoryService } from 'src/utils/client-proxy.factory';
import { CreateUsageRequest } from '../dto/requests/create-usage-request.dto';
import { UpdateUsageRequest } from '../dto/requests/update-usage-request.dto';
import { CreateDosageRequest } from '../dto/requests/create-dosage-request.dto';
import { UpdateDosageRequest } from '../dto/requests/update-dosage-request.dto';
import { CreateStorageRequest } from '../dto/requests/create-storage-request.dto';
import { UpdateStorageRequest } from '../dto/requests/update-storage-request.dto';
import { CreateIngredientRequest } from '../dto/requests/create-ingredients-request.dto';
import { UpdateIngredientRequest } from '../dto/requests/update-ingredients-request.dto';
import { CreatePrecautionRequest } from '../dto/requests/create-precaution-request.dto';
import { UpdatePrecautionRequest } from '../dto/requests/update-precaution-request.dto';
import { CreatePharmacyStockRequest } from '../dto/requests/create-pharmacystock-request.dto';
import { UpdatePharmacyStockRequest } from '../dto/requests/update-pharmacystock-request.dto';
import { CreateSideEffectRequest } from '../dto/requests/create-sideEffect-request.dto';
import { UpdateSideEffectRequest } from '../dto/requests/update-sideEffect-request.dto';

@Injectable()
export class ProductsService {
  private readonly productClient: ClientProxy;

  constructor(private readonly clientProxyFactory: ClientProxyFactoryService) {
    this.productClient = this.clientProxyFactory.createClient('productService');
  }

  private handleError = catchError((error) =>
    throwError(() => new RpcException(error.response || error.message)),
  );

  getAllProducts() {
    return this.productClient
      .send('get_all_products', {})
      .pipe(this.handleError);
  }

  getProductById(id: number) {
    return this.productClient
      .send('get_product_by_id', id)
      .pipe(this.handleError);
  }

  createProduct(payload: any) {
    return this.productClient
      .send('create_product', payload)
      .pipe(this.handleError);
  }

  updateProduct(id: number, payload: any) {
    return this.productClient
      .send('update_product', { id, payload })
      .pipe(this.handleError);
  }

  deleteProduct(id: number) {
    return this.productClient.send('delete_product', id).pipe(this.handleError);
  }

  getAllIngredients() {
    return this.productClient
      .send('get_all_ingredients', {})
      .pipe(this.handleError);
  }

  getIngredientById(id: number) {
    return this.productClient
      .send('get_ingredient_by_id', id)
      .pipe(this.handleError);
  }

  createIngredient(createRequest: CreateIngredientRequest) {
    const payload = instanceToPlain(createRequest);
    return this.productClient
      .send('create_ingredient', payload)
      .pipe(this.handleError);
  }

  updateIngredient(id: number, updateRequest: UpdateIngredientRequest) {
    const payload = instanceToPlain(updateRequest);
    return this.productClient
      .send('update_ingredient', { id, updateRequest: payload })
      .pipe(this.handleError);
  }

  deleteIngredient(id: number) {
    return this.productClient
      .send('delete_ingredient', id)
      .pipe(this.handleError);
  }

  getAllPrecautions() {
    return this.productClient
      .send('get_all_precautions', {})
      .pipe(this.handleError);
  }

  getPrecautionById(id: number) {
    return this.productClient
      .send('get_precaution_by_id', id)
      .pipe(this.handleError);
  }

  createPrecaution(createRequest: CreatePrecautionRequest) {
    const payload = instanceToPlain(createRequest);
    return this.productClient
      .send('create_precaution', payload)
      .pipe(this.handleError);
  }

  updatePrecaution(id: number, updateRequest: UpdatePrecautionRequest) {
    const payload = instanceToPlain(updateRequest);
    return this.productClient
      .send('update_precaution', { id, updateRequest: payload })
      .pipe(this.handleError);
  }

  deletePrecaution(id: number) {
    return this.productClient
      .send('delete_precaution', id)
      .pipe(this.handleError);
  }

  getAllUsages() {
    return this.productClient.send('get_all_usages', {}).pipe(this.handleError);
  }

  getUsagesById(id: number) {
    return this.productClient
      .send('get_usage_by_id', id)
      .pipe(this.handleError);
  }

  getUsageByProductId(productId: number) {
    return this.productClient
      .send('get_usage_by_product_id', productId)
      .pipe(this.handleError);
  }

  createUsage(createUsageRequest: CreateUsageRequest) {
    const payload = instanceToPlain(createUsageRequest);
    return this.productClient
      .send('create_usage', payload)
      .pipe(this.handleError);
  }

  updateUsage(id: number, updateUsageRequest: UpdateUsageRequest) {
    const payload = instanceToPlain(updateUsageRequest);
    return this.productClient
      .send('update_usage', { id, updateUsageRequest: payload })
      .pipe(this.handleError);
  }

  deleteUsage(id: number) {
    return this.productClient.send('delete_usage', id).pipe(this.handleError);
  }

  getAllDosages() {
    return this.productClient
      .send('get_all_dosages', {})
      .pipe(this.handleError);
  }

  getDosagesById(id: number) {
    return this.productClient
      .send('get_dosage_by_id', id)
      .pipe(this.handleError);
  }

  getDosagesByProductId(productId: number) {
    return this.productClient
      .send('get_dosage_by_product_id', productId)
      .pipe(this.handleError);
  }

  createDosage(createDosageRequest: CreateDosageRequest) {
    const payload = instanceToPlain(createDosageRequest);
    return this.productClient
      .send('create_dosage', payload)
      .pipe(this.handleError);
  }
  updateDosage(id: number, updateDosageRequest: UpdateDosageRequest) {
    const payload = instanceToPlain(updateDosageRequest);
    return this.productClient
      .send('update_dosage', { id, updateDosageRequest: payload })
      .pipe(this.handleError);
  }

  deleteDosage(id: number) {
    return this.productClient.send('delete_dosage', id).pipe(this.handleError);
  }

  getAllStorages() {
    return this.productClient
      .send('get_all_storages', {})
      .pipe(this.handleError);
  }

  getStorageById(id: number) {
    return this.productClient
      .send('get_storage_by_id', id)
      .pipe(this.handleError);
  }

  getStorageByProductId(productId: number) {
    return this.productClient
      .send('get_storage_by_product_id', productId)
      .pipe(this.handleError);
  }

  createStorage(createStorageRequest: CreateStorageRequest) {
    const payload = instanceToPlain(createStorageRequest);
    return this.productClient
      .send('create_storage', payload)
      .pipe(this.handleError);
  }

  updateStorage(id: number, updateStorageRequest: UpdateStorageRequest) {
    const payload = instanceToPlain(updateStorageRequest);
    return this.productClient
      .send('update_storage', { id, updateStorageRequest: payload })
      .pipe(this.handleError);
  }

  deleteStorage(id: number) {
    return this.productClient.send('delete_storage', id).pipe(this.handleError);
  }

  getAllPharmacyStocks() {
    return this.productClient
      .send('get_all_pharmacy_stocks', {})
      .pipe(this.handleError);
  }

  getPharmacyStockById(pharmacyId: number, productId: number) {
    return this.productClient
      .send('get_pharmacy_stock_by_id', { pharmacyId, productId })
      .pipe(this.handleError);
  }

  createPharmacyStock(createRequest: CreatePharmacyStockRequest) {
    return this.productClient
      .send('create_pharmacy_stock', createRequest)
      .pipe(this.handleError);
  }

  updatePharmacyStock(
    pharmacyId: number,
    productId: number,
    updateRequest: UpdatePharmacyStockRequest,
  ) {
    return this.productClient
      .send('update_pharmacy_stock', { pharmacyId, productId, updateRequest })
      .pipe(this.handleError);
  }

  deletePharmacyStock(pharmacyId: number, productId: number) {
    return this.productClient
      .send('delete_pharmacy_stock', { pharmacyId, productId })
      .pipe(this.handleError);
  }

  getStockByPharmacy(pharmacyId: number) {
    return this.productClient
      .send('get_stock_by_pharmacy', pharmacyId)
      .pipe(this.handleError);
  }

  getStockByProduct(productId: number) {
    return this.productClient
      .send('get_stock_by_product', productId)
      .pipe(this.handleError);
  }

  getAllSideEffects() {
    return this.productClient
      .send('get_all_side_effects', {})
      .pipe(this.handleError);
  }

  getSideEffectsByProduct(productId: number) {
    return this.productClient
      .send('get_side_effects_by_product', productId)
      .pipe(this.handleError);
  }

  createSideEffect(createRequest: CreateSideEffectRequest) {
    return this.productClient
      .send('create_side_effect', createRequest)
      .pipe(this.handleError);
  }

  updateSideEffect(id: number, updateRequest: UpdateSideEffectRequest) {
    return this.productClient
      .send('update_side_effect', { id, updateRequest })
      .pipe(this.handleError);
  }

  deleteSideEffect(id: number) {
    return this.productClient
      .send('delete_side_effect', id)
      .pipe(this.handleError);
  }

  getAllCategories() {
    return this.productClient
      .send('get_all_categories', {})
      .pipe(this.handleError);
  }

  getCategoryById(id: number) {
    return this.productClient
      .send('get_category_by_id', id)
      .pipe(this.handleError);
  }

  createCategory(payload: any) {
    return this.productClient
      .send('create_category', payload)
      .pipe(this.handleError);
  }

  updateCategory(id: number, payload: any) {
    return this.productClient
      .send('update_category', { id, payload })
      .pipe(this.handleError);
  }

  deleteCategory(id: number) {
    return this.productClient
      .send('delete_category', id)
      .pipe(this.handleError);
  }

  findRootCategory() {
    return this.productClient
      .send('get_root_category', {})
      .pipe(this.handleError);
  }
}
