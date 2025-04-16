import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity('dosage')
export class Dosage {
  @PrimaryGeneratedColumn()
  dosage_id: number;

  @ManyToOne(() => Product, (product) => product.dosages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ type: 'text' })
  description: string;
}
