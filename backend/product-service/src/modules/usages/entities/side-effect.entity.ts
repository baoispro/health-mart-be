import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity('side_effect')
export class SideEffect {
  @PrimaryGeneratedColumn()
  side_effect_id: number;

  @ManyToOne(() => Product, (product) => product.sideEffects, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ type: 'text' })
  description: string;
}
