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
import { UpdateOrderShippingAddressRequest } from '../dto/requests/update-ordershippingaddress-request.dto';
import { OrderShippingAddressService as IOrderShippingAddressService } from '../interfaces/order_shipping_address.service.interface';

@Injectable()
export class OrderShippingAddressService implements IOrderShippingAddressService {
  private readonly logger = new Logger(OrderShippingAddressService.name);
  private productClient: ClientProxy;
  private userClient: ClientProxy; // Khai báo cho user service

  constructor(
    @InjectRepository(OrderShippingAddress)
    private readonly orderShippingAddressRepository: Repository<OrderShippingAddress>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly clientProxyFactory: ClientProxyFactoryService,
  ) {
    this.productClient = this.clientProxyFactory.createClient('productService');
    this.userClient = this.clientProxyFactory.createClient('userService');
  }

  async findAll(): Promise<any[]> {
    // Lấy tất cả các shipping address kèm quan hệ order để có thể truy xuất thuộc tính order.user_id
    const shippingAddresses = await this.orderShippingAddressRepository.find({
      relations: ['order'],
    });
  
    const enrichedShippingAddresses = await Promise.all(
      shippingAddresses.map(async (address) => {
        const orderId = address.order ? address.order.id : null;
  
        let enrichedRecipientName = address.recipientName;
        let enrichedPhoneNumber = address.phoneNumber;
  
        if (address.order && address.order.user_id) {
          try {
            const user = await firstValueFrom(
              this.userClient.send('get_user_by_id', address.order.user_id)
            );
            if (!enrichedRecipientName) {
              enrichedRecipientName = user.fullName;
            }
            if (!enrichedPhoneNumber) {
              enrichedPhoneNumber = user.phone;
            }
          } catch (error) {
            this.logger.error(`Không lấy được thông tin user cho order ${orderId}: ${error.message}`);
          }
        }
  
        return {
          order_id: orderId,
          recipientName: enrichedRecipientName,
          phoneNumber: enrichedPhoneNumber,
          city: address.city,
          district: address.district,
          ward: address.ward,
          address: address.address,
          pharmacyName: address.pharmacy_id ? address.pharmacy_id : null,
        };
      })
    );
  
    return enrichedShippingAddresses;
  }

  async createShippingAddress(
    createRequest: CreateOrderShippingAddressRequest,
  ): Promise<OrderShippingAddress> {
    const { orderId, pharmacy_id, ...shippingData } = createRequest;
    this.logger.debug(`createShippingAddress called with orderId: ${orderId}`);

    const order = await this.orderRepository.findOne({ where: { id: orderId } });
    if (!order) {
      throw new RpcException(new NotFoundException(`Order ${orderId} không tồn tại!`));
    }

    // Nếu có pharmacy_id thì kiểm tra xem có tồn tại không
    if (pharmacy_id) {
      const isPharmacyExists = await this.checkPharmacyExists(pharmacy_id);
      if (!isPharmacyExists) {
        throw new RpcException(new NotFoundException(`Pharmacy ${pharmacy_id} không tồn tại!`));
      }
    }

    // Kiểm tra đã có địa chỉ của đơn hàng chưa
    let existingShipping = await this.orderShippingAddressRepository.findOne({
      where: { order: { id: orderId } },
      relations: ['order'],
    });
    if (existingShipping) {
      // Nếu đã có, cập nhật thông tin nếu cần và trả về
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

  async getShippingAddress(orderId: number): Promise<any> {
    const shippingAddress = await this.orderShippingAddressRepository.findOne({
      where: { order: { id: orderId } },
      relations: ['order'],
    });
  
    if (!shippingAddress) {
      throw new RpcException(
        new NotFoundException(`Địa chỉ giao hàng cho đơn hàng ${orderId} không tồn tại`),
      );
    }
  
    let enrichedRecipientName = shippingAddress.recipientName;
    let enrichedPhoneNumber = shippingAddress.phoneNumber;
  
    if (shippingAddress.order && shippingAddress.order.user_id) {
      try {
        const user = await firstValueFrom(
          this.userClient.send('get_user_by_id', shippingAddress.order.user_id),
        );
        enrichedRecipientName = enrichedRecipientName || user.fullName;
        enrichedPhoneNumber = enrichedPhoneNumber || user.phone;
      } catch (error) {
        this.logger.error(`Không lấy được thông tin user cho order ${orderId}: ${error.message}`);
      }
    }
  
    return {
      order_id: orderId,
      recipientName: enrichedRecipientName,
      phoneNumber: enrichedPhoneNumber,
      city: shippingAddress.city,
      district: shippingAddress.district,
      ward: shippingAddress.ward,
      address: shippingAddress.address,
      pharmacyName: shippingAddress.pharmacy_id ? shippingAddress.pharmacy_id : null,
    };
  }
  

  async findOne(orderShippingAddressId: number): Promise<any> {
    const shippingAddress = await this.orderShippingAddressRepository.findOne({
      where: { id: orderShippingAddressId },
      relations: ['order'],
    });
  
    if (!shippingAddress) {
      throw new RpcException(
        new NotFoundException(`Địa chỉ giao hàng với ID ${orderShippingAddressId} không tồn tại`),
      );
    }
  
    const orderId = shippingAddress.order ? shippingAddress.order.id : null;
    let enrichedRecipientName = shippingAddress.recipientName;
    let enrichedPhoneNumber = shippingAddress.phoneNumber;
  
    if (shippingAddress.order && shippingAddress.order.user_id) {
      try {
        const user = await firstValueFrom(
          this.userClient.send('get_user_by_id', shippingAddress.order.user_id),
        );
        enrichedRecipientName = enrichedRecipientName || user.fullName;
        enrichedPhoneNumber = enrichedPhoneNumber || user.phone;
      } catch (error) {
        this.logger.error(`Không lấy được thông tin user cho order ${orderId}: ${error.message}`);
      }
    }
  
    return {
      order_id: orderId,
      recipientName: enrichedRecipientName,
      phoneNumber: enrichedPhoneNumber,
      city: shippingAddress.city,
      district: shippingAddress.district,
      ward: shippingAddress.ward,
      address: shippingAddress.address,
      pharmacyName: shippingAddress.pharmacy_id ? shippingAddress.pharmacy_id : null,
    };
  }
  
  async updateShippingAddress(
    orderId: number,
    shippingData: Partial<OrderShippingAddress>,
  ): Promise<any> {
    // Truy vấn entity thực từ repository để lấy thông tin (bao gồm cả ID)
    const existingShipping = await this.orderShippingAddressRepository.findOne({
      where: { order: { id: orderId } },
      relations: ['order'],
    });
    
    if (!existingShipping) {
      throw new RpcException(new NotFoundException(`Địa chỉ giao hàng cho đơn hàng ${orderId} không tồn tại`));
    }
    
    // Nếu dữ liệu cập nhật rỗng thì không thực hiện update
    if (Object.keys(shippingData).length === 0) {
      throw new RpcException(new BadRequestException('Không có dữ liệu cập nhật'));
    }
    
    // Kiểm tra pharmacy_id nếu có
    if (shippingData.pharmacy_id !== undefined && shippingData.pharmacy_id !== null) {
      const pharmacyExists = await this.checkPharmacyExists(shippingData.pharmacy_id);
      if (!pharmacyExists) {
        throw new RpcException(new NotFoundException(`Pharmacy ${shippingData.pharmacy_id} không tồn tại`));
      }
    }
    
    // Cập nhật entity theo ID đã tìm được
    await this.orderShippingAddressRepository.update(existingShipping.id, shippingData);
    
    // Lấy lại entity sau khi cập nhật
    const updatedEntity = await this.orderShippingAddressRepository.findOne({
      where: { id: existingShipping.id },
      relations: ['order'],
    });
    
    if (!updatedEntity) {
      throw new RpcException(new NotFoundException('Không thể lấy lại địa chỉ giao hàng sau khi cập nhật'));
    }
    
    // Enrich thông tin recipientName và phoneNumber nếu cần, lấy từ user nếu chưa có
    let enrichedRecipientName = updatedEntity.recipientName;
    let enrichedPhoneNumber = updatedEntity.phoneNumber;
    
    if (updatedEntity.order && updatedEntity.order.user_id) {
      try {
        const user = await firstValueFrom(
          this.userClient.send('get_user_by_id', updatedEntity.order.user_id),
        );
        enrichedRecipientName = enrichedRecipientName || user.fullName;
        enrichedPhoneNumber = enrichedPhoneNumber || user.phone;
      } catch (error) {
        this.logger.error(`Không lấy được thông tin user cho order ${orderId}: ${error.message}`);
      }
    }
    
    // Trả về kết quả enrich theo cấu trúc mong muốn
    return {
      order_id: updatedEntity.order ? updatedEntity.order.id : null,
      recipientName: enrichedRecipientName,
      phoneNumber: enrichedPhoneNumber,
      city: updatedEntity.city,
      district: updatedEntity.district,
      ward: updatedEntity.ward,
      address: updatedEntity.address,
      pharmacyName: updatedEntity.pharmacy_id ? updatedEntity.pharmacy_id : null,
    };
  }
  
  async deleteShippingAddress(orderId: number): Promise<void> {
    const shippingAddress = await this.getShippingAddress(orderId);
    await this.orderShippingAddressRepository.delete(shippingAddress.id);
  }
}
