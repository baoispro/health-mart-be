import { Order } from 'src/modules/orders/entities/orders.entity';
import { DiscountCode } from '../../discount_code/entities/discount_code.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('order_promotions')
export class OrderPromotion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => DiscountCode, { eager: true })
  @JoinColumn({ name: 'discount_code_id' })
  discountCode: DiscountCode;
}
