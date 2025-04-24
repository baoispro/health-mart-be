import { Injectable, NotFoundException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { OrderItem } from '../entities/order_items.entity';
import { CreateOrderItemRequestDto } from '../dto/requests/create-order_item-request.dto';
import { UpdateOrderItemRequestDto } from '../dto/requests/update-order_item-request.dto';
import { Order } from '../../orders/entities/orders.entity';
import { ClientProxy } from '@nestjs/microservices';
import { ClientProxyFactoryService } from 'src/utils/client-proxy.factory';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OrderItemsService {
  private productClient: ClientProxy;

  constructor(
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private readonly clientProxyFactory: ClientProxyFactoryService,
  ) {
    this.productClient = this.clientProxyFactory.createClient('productService');
  }

  async checkProductExists(product_id: number): Promise<boolean> {
    try {
      const result = await firstValueFrom(
        this.productClient.send('check_product_exists', { product_id }),
      );
      return result;
    } catch (error) {
      throw new RpcException(
        new NotFoundException(`Product with ID ${product_id} not found`),
      );
    }
  }

  async create(
    createOrderItemRequest: CreateOrderItemRequestDto,
  ): Promise<OrderItem> {
    const { order_id, product_id, quantity, price } = createOrderItemRequest;

    // Kiểm tra xem Order có tồn tại hay không
    const order = await this.orderRepository.findOne({
      where: { id: order_id },
    });
    if (!order) {
      throw new RpcException(
        new NotFoundException(`Order với ID ${order_id} không tồn tại`),
      );
    }

    // Kiểm tra xem Product có tồn tại hay không
    const productExists = await this.checkProductExists(product_id);
    if (!productExists) {
      throw new RpcException(
        new NotFoundException(`Product với ID ${product_id} không tồn tại`),
      );
    }

    const newOrderItem = this.orderItemRepository.create({
      order,
      product_id,
      quantity,
      price,
    });

    return await this.orderItemRepository.save(newOrderItem);
  }

  async findAll(): Promise<OrderItem[]> {
    return await this.orderItemRepository.find({ relations: ['order'] });
  }

  async findOne(id: number): Promise<OrderItem> {
    const orderItem = await this.orderItemRepository.findOne({
      where: { id },
      relations: ['order'],
    });

    if (!orderItem) {
      throw new RpcException(
        new NotFoundException(`OrderItem with ID ${id} not found`),
      );
    }

    return orderItem;
  }

  async update(
    id: number,
    updateOrderItemRequest: UpdateOrderItemRequestDto,
  ): Promise<OrderItem> {
    const orderItem = await this.findOne(id);

    if (updateOrderItemRequest.order_id !== undefined) {
      const order = await this.orderRepository.findOne({
        where: { id: updateOrderItemRequest.order_id },
      });
      if (!order) {
        throw new RpcException(
          new NotFoundException(
            `Order với ID ${updateOrderItemRequest.order_id} không tồn tại`,
          ),
        );
      }
      orderItem.order = order;
    }

    if (updateOrderItemRequest.product_id !== undefined) {
      const productExists = await this.checkProductExists(
        updateOrderItemRequest.product_id,
      );
      if (!productExists) {
        throw new RpcException(
          new NotFoundException(
            `Product với ID ${updateOrderItemRequest.product_id} không tồn tại`,
          ),
        );
      }
      orderItem.product_id = updateOrderItemRequest.product_id;
    }

    // Cập nhật các trường khác
    Object.assign(orderItem, updateOrderItemRequest);

    return await this.orderItemRepository.save(orderItem);
  }

  async remove(id: number): Promise<DeleteResult> {
    const orderItem = await this.findOne(id);
    return await this.orderItemRepository.delete({ id: orderItem.id });
  }
}
