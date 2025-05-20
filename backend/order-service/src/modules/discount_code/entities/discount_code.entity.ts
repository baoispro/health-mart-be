import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { OrderPromotion } from 'src/modules/order_promotions/entities/order_promotions.entity';

export enum DiscountType {
  NONE = 'NONE',
  FIXED = 'FIXED',
  PERCENTAGE = 'PERCENTAGE',
}

@Entity('discount_codes')
export class DiscountCode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column({
    type: 'enum',
    enum: DiscountType,
    default: DiscountType.NONE,
  })
  discountType: DiscountType;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  discountValue: number;

  @Column({ type: 'date' })
  validFrom: Date;

  @Column({ type: 'date' })
  validUntil: Date;

  @Column({ default: 0 })
  usageCount: number;

  @Column({ default: 1 })
  usageLimit: number;

  @OneToMany(
    () => OrderPromotion,
    (orderPromotion) => orderPromotion.discountCode,
  )
  orderPromotions: OrderPromotion[];
}
