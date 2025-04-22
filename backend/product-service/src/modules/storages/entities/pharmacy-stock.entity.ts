import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity('pharmacy_stock')
export class PharmacyStock {
  @PrimaryColumn()
  pharmacy_id: number; // PK

  @PrimaryColumn()
  product_id: number; // PK + FK

  @Column({ type: 'varchar', length: 255 })
  name: string; // Tên nhà thuốc

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

  // FK: Mỗi record tham chiếu tới Product
  @ManyToOne(() => Product, (product) => product.pharmacyStock, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
