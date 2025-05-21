import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderShippingAddress } from '../entities/order_shipping_address.entity';
import { Order } from '../../orders/entities/orders.entity';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ClientProxyFactoryService } from 'src/utils/client-proxy.factory';
import { firstValueFrom } from 'rxjs';
import { CreateOrderShippingAddressRequest } from '../dto/requests/create-ordershippingaddress-request.dto';
import { OrderShippingAddressService as IOrderShippingAddressService } from '../interfaces/order_shipping_address.service.interface';

@Injectable()
export class OrderShippingAddressService
  implements IOrderShippingAddressService
{
  private readonly logger = new Logger(OrderShippingAddressService.name);
  // Vì không cần lấy thông tin từ user nên không cần userClient nữa.
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

  // Lấy toàn bộ địa chỉ giao hàng, sử dụng trực tiếp thông tin từ entity
  async findAll(): Promise<any[]> {
    const shippingAddresses = await this.orderShippingAddressRepository.find({
      relations: ['order'],
    });

    return shippingAddresses.map((address) => {
      const orderId = address.order ? address.order.id : null;
      return {
        id: address.id,
        order_id: orderId,
        recipientName: address.recipientName,
        phoneNumber: address.phoneNumber,
        city: address.city,
        district: address.district,
        ward: address.ward,
        address: address.address,
        pharmacyName: address.pharmacy_id ? address.pharmacy_id : null,
      };
    });
  }

  // Tạo mới địa chỉ giao hàng (nếu đã có rồi thì update)
  async createShippingAddress(
    createRequest: CreateOrderShippingAddressRequest,
  ): Promise<OrderShippingAddress> {
    const { orderId, pharmacy_id, ...shippingData } = createRequest;
    this.logger.debug(`createShippingAddress called with orderId: ${orderId}`);

    const order = await this.orderRepository.findOne({
      where: { id: orderId },
    });
    if (!order) {
      throw new RpcException(
        new NotFoundException(`Order ${orderId} không tồn tại!`),
      );
    }

    // Kiểm tra pharmacy_id nếu có
    if (pharmacy_id) {
      const isPharmacyExists = await this.checkPharmacyExists(pharmacy_id);
      if (!isPharmacyExists) {
        throw new RpcException(
          new NotFoundException(`Pharmacy ${pharmacy_id} không tồn tại!`),
        );
      }
    }

    // Nếu đã có địa chỉ cho đơn hàng này thì cập nhật
    const existingShipping = await this.orderShippingAddressRepository.findOne({
      where: { order: { id: orderId } },
      relations: ['order'],
    });
    if (existingShipping) {
      Object.assign(existingShipping, shippingData, { pharmacy_id });
      return this.orderShippingAddressRepository.save(existingShipping);
    }

    const newShipping = this.orderShippingAddressRepository.create({
      ...shippingData,
      pharmacy_id,
      order,
    });
    return await this.orderShippingAddressRepository.save(newShipping);
  }

  // Hàm kiểm tra sự tồn tại của pharmacy thông qua productService
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

  // Lấy địa chỉ giao hàng theo order ID (dành cho view theo đơn hàng)
  async getShippingAddress(orderId: number): Promise<any> {
    const shippingAddress = await this.orderShippingAddressRepository.findOne({
      where: { order: { id: orderId } },
      relations: ['order'],
    });

    if (!shippingAddress) {
      throw new RpcException(
        new NotFoundException(
          `Địa chỉ giao hàng cho đơn hàng ${orderId} không tồn tại`,
        ),
      );
    }

    return {
      id: shippingAddress.id,
      order_id: orderId,
      recipientName: shippingAddress.recipientName,
      phoneNumber: shippingAddress.phoneNumber,
      city: shippingAddress.city,
      district: shippingAddress.district,
      ward: shippingAddress.ward,
      address: shippingAddress.address,
      pharmacyName: shippingAddress.pharmacy_id
        ? shippingAddress.pharmacy_id
        : null,
    };
  }

  // Lấy địa chỉ giao hàng theo shipping address ID
  async findOne(shippingAddressId: number): Promise<any> {
    const shippingAddress = await this.orderShippingAddressRepository.findOne({
      where: { id: shippingAddressId },
      relations: ['order'],
    });

    if (!shippingAddress) {
      throw new RpcException(
        new NotFoundException(
          `Địa chỉ giao hàng với ID ${shippingAddressId} không tồn tại`,
        ),
      );
    }

    const orderId = shippingAddress.order ? shippingAddress.order.id : null;
    return {
      id: shippingAddress.id,
      order_id: orderId,
      recipientName: shippingAddress.recipientName,
      phoneNumber: shippingAddress.phoneNumber,
      city: shippingAddress.city,
      district: shippingAddress.district,
      ward: shippingAddress.ward,
      address: shippingAddress.address,
      pharmacyName: shippingAddress.pharmacy_id
        ? shippingAddress.pharmacy_id
        : null,
    };
  }

  // Cập nhật địa chỉ giao hàng theo shipping address ID
  async updateShippingAddress(
    shippingAddressId: number,
    shippingData: Partial<OrderShippingAddress>,
  ): Promise<any> {
    const existingShipping = await this.orderShippingAddressRepository.findOne({
      where: { id: shippingAddressId },
      relations: ['order'],
    });

    if (!existingShipping) {
      throw new RpcException(
        new NotFoundException(
          `Địa chỉ giao hàng với ID ${shippingAddressId} không tồn tại`,
        ),
      );
    }

    if (Object.keys(shippingData).length === 0) {
      throw new RpcException(
        new BadRequestException('Không có dữ liệu cập nhật'),
      );
    }

    if (
      shippingData.pharmacy_id !== undefined &&
      shippingData.pharmacy_id !== null
    ) {
      const pharmacyExists = await this.checkPharmacyExists(
        shippingData.pharmacy_id,
      );
      if (!pharmacyExists) {
        throw new RpcException(
          new NotFoundException(
            `Pharmacy ${shippingData.pharmacy_id} không tồn tại`,
          ),
        );
      }
    }

    await this.orderShippingAddressRepository.update(
      existingShipping.id,
      shippingData,
    );

    const updatedEntity = await this.orderShippingAddressRepository.findOne({
      where: { id: existingShipping.id },
      relations: ['order'],
    });

    if (!updatedEntity) {
      throw new RpcException(
        new NotFoundException(
          'Không thể lấy lại địa chỉ giao hàng sau khi cập nhật',
        ),
      );
    }

    return {
      id: updatedEntity.id,
      order_id: updatedEntity.order ? updatedEntity.order.id : null,
      recipientName: updatedEntity.recipientName,
      phoneNumber: updatedEntity.phoneNumber,
      city: updatedEntity.city,
      district: updatedEntity.district,
      ward: updatedEntity.ward,
      address: updatedEntity.address,
      pharmacyName: updatedEntity.pharmacy_id
        ? updatedEntity.pharmacy_id
        : null,
    };
  }

  // Xóa địa chỉ giao hàng theo shipping address ID
  async deleteShippingAddress(shippingAddressId: number): Promise<void> {
    const shippingAddress = await this.orderShippingAddressRepository.findOne({
      where: { id: shippingAddressId },
      relations: ['order'],
    });
    if (!shippingAddress) {
      throw new RpcException(
        new NotFoundException(
          `Địa chỉ giao hàng với ID ${shippingAddressId} không tồn tại`,
        ),
      );
    }
    await this.orderShippingAddressRepository.delete(shippingAddress.id);
  }
}
