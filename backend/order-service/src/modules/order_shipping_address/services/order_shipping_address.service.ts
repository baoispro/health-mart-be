// src/modules/order_shipping_address/services/order_shipping_address.service.ts
import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderShippingAddress } from '../entities/order_shipping_address.entity';
import { Order } from '../../orders/entities/orders.entity';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ClientProxyFactoryService } from 'src/utils/client-proxy.factory';
import { firstValueFrom } from 'rxjs';
import { CreateOrderShippingAddressRequest} from '../dto/requests/create-ordershippingaddress-request.dto';
import { UpdateOrderShippingAddressRequest} from '../dto/requests/update-ordershippingaddress-request.dto';

@Injectable()
export class OrderShippingAddressService {
  private readonly logger = new Logger(OrderShippingAddressService.name);
  private productClient: ClientProxy;

  constructor(
    @InjectRepository(OrderShippingAddress)
    private readonly orderShippingAddressRepository: Repository<OrderShippingAddress>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly clientProxyFactory: ClientProxyFactoryService,
  ) {
    this.productClient = this.clientProxyFactory.createClient('productService');
  }

  async findAll(): Promise<OrderShippingAddress[]> {
    return this.orderShippingAddressRepository.find({ relations: ['order']});
  }

  async createShippingAddress(
    createRequest: CreateOrderShippingAddressRequest
  ): Promise<OrderShippingAddress> {
    const { orderId, pharmacy_id, ...shippingData } = createRequest;
  
    this.logger.debug(`createShippingAddress called with orderId: ${orderId}`);
  
    // 1. Kiểm tra order có tồn tại không
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
    });
  
    if (!order) {
      throw new RpcException(
        new NotFoundException(`Order ${orderId} không tồn tại!`)
      );
    }
  
    // 2. Nếu có pharmacy_id → kiểm tra với Product Service
    if (pharmacy_id) {
      const isPharmacyExists = await this.checkPharmacyExists(pharmacy_id);
      if (!isPharmacyExists) {
        throw new RpcException(
          new NotFoundException(`Pharmacy ${pharmacy_id} không tồn tại!`)
        );
      }
    }
  
    // 3. Kiểm tra đã có địa chỉ giao hàng cho đơn hàng chưa
    let existingShipping = await this.orderShippingAddressRepository.findOne({
      where: { order: { id: orderId } },
      relations: ['order'],
    });
  
    if (existingShipping) {
      // Cập nhật
      Object.assign(existingShipping, shippingData, { pharmacy_id });
      return this.orderShippingAddressRepository.save(existingShipping);
    }
  
    // 4. Tạo mới
    const newShipping = this.orderShippingAddressRepository.create({
      ...shippingData,
      pharmacy_id,
      order,
    });
  
    return await this.orderShippingAddressRepository.save(newShipping);
  }
  
  
  
  // Kiểm tra sự tồn tại của pharmacy_id trong product_service
  private async checkPharmacyExists(pharmacyId: number): Promise<boolean> {
    try {
      const result = await firstValueFrom(
        this.productClient.send('check_pharmacy_exist', pharmacyId),
      );
      return result;
    } catch (error) {
      this.logger.error(`Lỗi kiểm tra pharmacy_id: ${error.message}`);
      return false;
    }
  }

  // Lấy địa chỉ giao hàng của đơn hàng
  async getShippingAddress(orderId: number): Promise<OrderShippingAddress> {
    const shippingAddress = await this.orderShippingAddressRepository.findOne({
      where: { order: { id: orderId } },
      relations: ['order']
    });

    if (!shippingAddress) {
      throw new RpcException(new NotFoundException(`Địa chỉ giao hàng cho đơn hàng ${orderId} không tồn tại`));
    }

    return shippingAddress;
  }

  async findOne(orderShippingAddressId: number): Promise<OrderShippingAddress> {
    const shippingAddress = await this.orderShippingAddressRepository.findOne({
      where: {  id: orderShippingAddressId },
      relations: ['order']
    });

    if (!shippingAddress) {
      throw new RpcException(new NotFoundException(`Địa chỉ giao hàng cho đơn hàng ${orderShippingAddressId} không tồn tại`));
    }

    return shippingAddress;
  }

  // Cập nhật địa chỉ giao hàng cho đơn hàng
  async updateShippingAddress(
    orderId: number,
    shippingData: Partial<OrderShippingAddress>,
  ): Promise<OrderShippingAddress> {
    const shippingAddress = await this.getShippingAddress(orderId);

    // Kiểm tra tồn tại của pharmacy_id nếu được cung cấp trong dữ liệu cập nhật
    if (shippingData.pharmacy_id !== undefined && shippingData.pharmacy_id !== null) {
      const pharmacyExists = await this.checkPharmacyExists(shippingData.pharmacy_id);
      if (!pharmacyExists) {
        throw new RpcException(new NotFoundException(`Pharmacy ${shippingData.pharmacy_id} không tồn tại`));
      }
    }

    await this.orderShippingAddressRepository.update(shippingAddress.id, shippingData);
    return this.orderShippingAddressRepository.findOne({ where: { id: shippingAddress.id } });
  }

  // Xóa địa chỉ giao hàng của đơn hàng
  async deleteShippingAddress(orderId: number): Promise<void> {
    const shippingAddress = await this.getShippingAddress(orderId);
    await this.orderShippingAddressRepository.delete(shippingAddress.id);
  }
}