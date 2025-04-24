import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity('precaution')
export class Precaution {
  @PrimaryGeneratedColumn()
  precaution_id: number;

  @ManyToOne(() => Product, (product) => product.precautions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ type: 'text' })
  description: string;
}
