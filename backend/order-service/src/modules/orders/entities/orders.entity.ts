import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { OrderShipMethod, OrderStatus } from '../enums/order.enum';
import { OrderShippingAddress } from 'src/modules/order_shipping_address/entities/order_shipping_address.entity';
import { OrderItem } from '../../order_items/entities/order_items.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column({ type: 'decimal' })
  total_price: number;

  @Column({ type: 'decimal' })
  discount: number;

  @Column({ type: 'decimal' })
  final_price: number;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  order_status: OrderStatus;

  @Column({
    type: 'enum',
    enum: OrderShipMethod,
    default: OrderShipMethod.HOME_DELIVERY,
  })
  ship_method: OrderShipMethod;

  @CreateDateColumn()
  created_at: Date;

  @OneToOne(() => OrderShippingAddress, (shippingAddress) => shippingAddress.order)
  shippingAddress: OrderShippingAddress;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];
}
