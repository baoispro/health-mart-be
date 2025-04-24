import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity('ingredient')
export class Ingredient {
  @PrimaryGeneratedColumn()
  ingredient_id: number;

  @ManyToOne(() => Product, (product) => product.ingredients, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  concentration: string;
}
