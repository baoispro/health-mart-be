import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { OrderStatus } from './order.enum';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column() 
  user_id: number;


  @Column()
  product_id: string;

  @Column()
  quantity: number;

  @Column()
  total_price: number;

  @Column({type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING})
  order_status: OrderStatus;

  @CreateDateColumn()
  created_at: Date;
}
