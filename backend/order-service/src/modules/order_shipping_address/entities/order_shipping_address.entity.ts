import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Order } from '../../orders/entities/orders.entity';

@Entity('order_shipping_address')
export class OrderShippingAddress {
  @PrimaryGeneratedColumn()
  id: number;
  
  @OneToOne(() => Order, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column()
  city: string;

  @Column()
  district: string;

  @Column()
  ward: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  pharmacy_id: number;

  @Column({ nullable: true })
  recipientName: string;

  @Column({ nullable: true })
  phoneNumber: string;
}
