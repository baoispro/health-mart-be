import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderPromotion } from '../entities/order_promotions.entity';
import { RpcException } from '@nestjs/microservices';
import { Order } from '../../orders/entities/orders.entity';
import { DiscountCode } from '../../discount_code/entities/discount_code.entity';
import { CreateOrderPromotionRequest } from '../dto/requests/create-order_promotions-request.dto';
import { UpdateOrderPromotionRequest } from '../dto/requests/update-order_promotions-request.dto';
import { OrderPromotionsService as OrderPromotionsServiceInterface } from '../interfaces/order_promotions.service.interface';

@Injectable()
export class OrderPromotionsService implements OrderPromotionsServiceInterface {
  private readonly logger = new Logger(OrderPromotionsService.name);

  constructor(
    @InjectRepository(OrderPromotion)
    private readonly orderPromotionRepository: Repository<OrderPromotion>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(DiscountCode)
    private readonly discountCodeRepository: Repository<DiscountCode>,
  ) {}

  async findAll(): Promise<OrderPromotion[]> {
    return await this.orderPromotionRepository.find({
      relations: ['order', 'discountCode'],
    });
  }

  async findByOrderId(orderId: number): Promise<OrderPromotion[]> {
    const orderExists = await this.orderRepository.findOneBy({ id: orderId });
    if (!orderExists) {
      throw new RpcException(
        new NotFoundException(`Đơn hàng với ID ${orderId} không tồn tại`),
      );
    }

    const promotions = await this.orderPromotionRepository.find({
      where: { order: { id: orderId } },
      relations: ['order', 'discountCode'],
    });

    if (!promotions || promotions.length === 0) {
      throw new RpcException(
        new NotFoundException(`Đơn hàng với ID ${orderId} không có khuyến mãi`),
      );
    }

    return promotions;
  }

  async createPromotion(
    dto: CreateOrderPromotionRequest,
  ): Promise<OrderPromotion> {
    // Ép các trường về số
    const orderId = parseInt(String(dto.order_id), 10);
    const discountCodeId = parseInt(String(dto.discountCodeId), 10);

    if (isNaN(orderId) || isNaN(discountCodeId)) {
      throw new RpcException(
        new BadRequestException(
          'order_id hoặc discountCodeId không hợp lệ, phải là số',
        ),
      );
    }

    // Kiểm tra xem Order tồn tại không
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
    });
    if (!order) {
      throw new RpcException(
        new NotFoundException(`Không tìm thấy đơn hàng với ID ${orderId}`),
      );
    }

    // Kiểm tra xem DiscountCode tồn tại không
    const discountCode = await this.discountCodeRepository.findOne({
      where: { id: discountCodeId },
    });
    if (!discountCode) {
      throw new RpcException(
        new NotFoundException(
          `Không tìm thấy mã giảm giá với ID ${discountCodeId}`,
        ),
      );
    }

    this.logger.debug(`orderId: ${orderId}`);
    this.logger.debug(
      `Retrieved discount code: ${JSON.stringify(discountCode)}`,
    );

    // Ràng buộc số lượt sử dụng: nếu usageCount đã đạt usageLimit, ném lỗi
    if (discountCode.usageCount >= discountCode.usageLimit) {
      throw new RpcException(new BadRequestException('Hết số lượt sử dụng'));
    }

    // Nếu còn lượt sử dụng, tăng usageCount lên 1 và lưu lại
    discountCode.usageCount = discountCode.usageCount + 1;
    await this.discountCodeRepository.save(discountCode);

    // Kiểm tra nếu OrderPromotion đã tồn tại (để tránh duplicate)
    const existingPromotion = await this.orderPromotionRepository.findOne({
      where: {
        order: { id: orderId },
        discountCode: { id: discountCode.id },
      },
    });
    if (existingPromotion) {
      throw new RpcException(
        new BadRequestException(
          `Mã giảm giá ${discountCode.code} đã được áp dụng cho đơn hàng với ID ${orderId}`,
        ),
      );
    }

    // Tạo mới Order Promotion
    const newPromotion = this.orderPromotionRepository.create({
      order: { id: orderId } as Order,
      discountCode: { id: discountCode.id } as DiscountCode,
    });
    return await this.orderPromotionRepository.save(newPromotion);
  }

  async updatePromotion(
    id: number,
    updateDto: UpdateOrderPromotionRequest,
  ): Promise<OrderPromotion> {
    const promotion = await this.orderPromotionRepository.findOne({
      where: { id },
      relations: ['discountCode'],
    });
    if (!promotion) {
      throw new RpcException(
        new NotFoundException(
          `Không tìm thấy khuyến mãi đơn hàng với ID ${id}`,
        ),
      );
    }

    const updateData: Partial<OrderPromotion> = {};

    if (updateDto.discountCodeId) {
      const discountCode = await this.discountCodeRepository.findOne({
        where: { id: parseInt(String(updateDto.discountCodeId), 10) },
      });
      if (!discountCode) {
        throw new RpcException(
          new NotFoundException(
            `Không tìm thấy mã giảm giá với ID ${updateDto.discountCodeId}`,
          ),
        );
      }
      updateData.discountCode = discountCode;
    }

    const updatedPromotion = this.orderPromotionRepository.merge(
      promotion,
      updateData,
    );
    return await this.orderPromotionRepository.save(updatedPromotion);
  }

  async deletePromotion(id: number): Promise<{ message: string }> {
    const promotion = await this.orderPromotionRepository.findOneBy({ id });
    if (!promotion) {
      throw new RpcException(
        new NotFoundException(
          `Không tìm thấy khuyến mãi đơn hàng với ID ${id}`,
        ),
      );
    }
    await this.orderPromotionRepository.remove(promotion);
    return { message: 'Xóa khuyến mãi đơn hàng thành công' };
  }
}
