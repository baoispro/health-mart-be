import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity('pharmacy_product')
export class PharmacyProduct {
  @PrimaryColumn()
  pharmacy_id: number;

  @PrimaryColumn()
  product_id: number;

  @Column({ type: 'int' })
  quantity: number;

  @ManyToOne(() => Product, (product) => product.pharmacyProduct, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
