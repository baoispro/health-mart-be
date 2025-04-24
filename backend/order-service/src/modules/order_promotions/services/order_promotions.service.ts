import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  DiscountType,
  OrderPromotion,
} from '../entities/order_promotions.entity';
import { RpcException } from '@nestjs/microservices';
import { Order } from '../../orders/entities/orders.entity';
import { CreateOrderPromotionRequest } from '../dto/requests/create-order_promotions-request.dto';
import { UpdateOrderPromotionRequest } from '../dto/requests/update-order_promotions-request.dto';

@Injectable()
export class OrderPromotionsService {
  private readonly logger = new Logger(OrderPromotionsService.name);

  constructor(
    @InjectRepository(OrderPromotion)
    private readonly orderPromotionRepository: Repository<OrderPromotion>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async findAll(): Promise<OrderPromotion[]> {
    return await this.orderPromotionRepository.find({ relations: ['order'] });
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
      relations: ['order'],
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
    const order = await this.orderRepository.findOne({
      where: { id: dto.order_id },
    });
    if (!order) {
      throw new RpcException(
        new NotFoundException(`Không tìm thấy đơn hàng với ID ${dto.order_id}`),
      );
    }
    if (!dto.promoCode || dto.promoCode.trim() === '') {
      throw new RpcException(
        new BadRequestException(
          'Mã khuyến mãi là bắt buộc và không được để trống',
        ),
      );
    }

    if (dto.discountType === DiscountType.FIXED) {
      if (typeof dto.discountValue !== 'number' || dto.discountValue <= 5000) {
        throw new RpcException(
          new BadRequestException(
            'Với discountType FIXED, discountValue phải là số tiền lớn hơn 5000',
          ),
        );
      }
    } else if (dto.discountType === DiscountType.PERCENTAGE) {
      if (
        typeof dto.discountValue !== 'number' ||
        dto.discountValue < 0 ||
        dto.discountValue > 100
      ) {
        throw new RpcException(
          new BadRequestException(
            'Với discountType PERCENTAGE, discountValue phải là số nằm trong khoảng từ 0 đến 100',
          ),
        );
      }
    } else if (dto.discountType === DiscountType.NONE) {
      if (
        dto.discountValue !== undefined &&
        dto.discountValue !== null &&
        dto.discountValue !== 0
      ) {
        throw new RpcException(
          new BadRequestException(
            'Với discountType NONE, discountValue không được nhập hoặc phải bằng 0',
          ),
        );
      }
    }

    const existingPromotion = await this.orderPromotionRepository.findOne({
      where: {
        promoCode: dto.promoCode.trim(),
        order: { id: order.id },
      },
    });
    if (existingPromotion) {
      throw new RpcException(
        new BadRequestException(
          `Mã khuyến mãi ${dto.promoCode} đã tồn tại cho đơn hàng với ID ${dto.order_id}`,
        ),
      );
    }

    const newPromotion = this.orderPromotionRepository.create({
      promoCode: dto.promoCode.trim(),
      discountType: dto.discountType,
      discountValue: dto.discountValue,
      order,
    });
    return await this.orderPromotionRepository.save(newPromotion);
  }

  async updatePromotion(
    id: number,
    updateDto: UpdateOrderPromotionRequest,
  ): Promise<OrderPromotion> {
    const promotion = await this.orderPromotionRepository.findOneBy({ id });
    if (!promotion) {
      throw new RpcException(
        new NotFoundException(
          `Không tìm thấy khuyến mãi đơn hàng với ID ${id}`,
        ),
      );
    }

    // Ràng buộc promoCode (bắt buộc phải có và không được để trống)
    if (!updateDto.promoCode || updateDto.promoCode.trim() === '') {
      throw new RpcException(
        new BadRequestException(
          'Mã khuyến mãi là bắt buộc và không được để trống',
        ),
      );
    } else {
      updateDto.promoCode = updateDto.promoCode.trim();
    }

    // Ràng buộc cho discountType và discountValue
    if (updateDto.discountType === DiscountType.FIXED) {
      if (
        typeof updateDto.discountValue !== 'number' ||
        updateDto.discountValue <= 5000
      ) {
        throw new RpcException(
          new BadRequestException(
            'Với discountType FIXED, discountValue phải là số tiền lớn hơn 5000',
          ),
        );
      }
    } else if (updateDto.discountType === DiscountType.PERCENTAGE) {
      if (
        typeof updateDto.discountValue !== 'number' ||
        updateDto.discountValue < 0 ||
        updateDto.discountValue > 100
      ) {
        throw new RpcException(
          new BadRequestException(
            'Với discountType PERCENTAGE, discountValue phải là số nằm trong khoảng từ 0 đến 100',
          ),
        );
      }
    } else if (updateDto.discountType === DiscountType.NONE) {
      // Nếu loại là NONE thì bất kỳ giá trị nào được truyền vào phải bằng 0, nếu không thì báo lỗi.
      if (
        updateDto.discountValue !== undefined &&
        updateDto.discountValue !== null &&
        updateDto.discountValue !== 0
      ) {
        throw new RpcException(
          new BadRequestException(
            'Với discountType NONE, discountValue không được nhập hoặc phải bằng 0',
          ),
        );
      }
      // Ép discountValue về 0
      updateDto.discountValue = 0;
    }

    // Gộp các thay đổi từ updateDto vào đối tượng promotion hiện có
    const updatedPromotion = this.orderPromotionRepository.merge(
      promotion,
      updateDto,
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
