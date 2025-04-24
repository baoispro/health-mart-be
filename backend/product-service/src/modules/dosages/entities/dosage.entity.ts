import { Product } from 'src/modules/products/entities/product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('dosage')
export class Dosage {
  @PrimaryGeneratedColumn()
  dosage_id: number;

  @ManyToOne(() => Product, (product) => product.dosages, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ type: 'text' })
  description: string;
}
