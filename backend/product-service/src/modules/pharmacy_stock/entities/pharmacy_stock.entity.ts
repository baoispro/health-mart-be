import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity('pharmacy_stock')
export class PharmacyStock {
  @PrimaryColumn()
  pharmacy_id: number;

  @PrimaryColumn()
  product_id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column()
  address_street: string;

  @Column()
  ward: string;

  @Column()
  district: string;

  @Column()
  city: string;

  @Column({ type: 'int' })
  quantity: number;

  @ManyToOne(() => Product, (product) => product.pharmacyStock, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
