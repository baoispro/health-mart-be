import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity('storage')
export class Storage {
  @PrimaryGeneratedColumn()
  storage_id: number;

  @ManyToOne(() => Product, (product) => product.storages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ type: 'text' })
  description: string;
}
