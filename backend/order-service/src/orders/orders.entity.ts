import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' }) 
  user_id: number;


  @Column({ type: 'uuid' })
  product_id: string;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'decimal' })
  total_price: number;

  @Column({ type: 'varchar', length: 50 })
  order_status: string;

  @CreateDateColumn()
  created_at: Date;
}
