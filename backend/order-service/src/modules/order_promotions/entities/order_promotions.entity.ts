import { Order } from "src/modules/orders/entities/orders.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum DiscountType {
  NONE = 'NONE',
  FIXED = 'FIXED',
  PERCENTAGE = 'PERCENTAGE',
}

@Entity('order_promotions')
export class OrderPromotion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column('text')
  promoCode: string;

  @Column({
    type: 'enum',
    enum: DiscountType,
    default: DiscountType.NONE,
  }) 
  discountType: DiscountType;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  discountValue: number;
}
