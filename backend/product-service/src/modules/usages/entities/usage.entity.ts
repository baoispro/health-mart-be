import { Product } from 'src/modules/products/entities/product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('usage')
export class Usage {
  @PrimaryGeneratedColumn()
  usage_id: number;

  @ManyToOne(() => Product, (product) => product.usages, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ type: 'text' })
  description: string;
}
