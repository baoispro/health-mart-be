import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { OrderShipMethod, OrderStatus } from './order.enum';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column() 
  user_id: number; // chỗ này lấy từ user-service bạn xem thử

  @Column({ type: 'decimal' })
  total_price: number;

  @Column({ type: 'decimal' })
  discount: number;

  @Column({ type: 'decimal' })
  final_price: number;
  
  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  order_status: OrderStatus;

  @Column({ type: 'enum', enum: OrderShipMethod, default: OrderShipMethod.HOME_DELIVERY })
  ship_method: OrderShipMethod;


  @CreateDateColumn()
  created_at: Date;
}
