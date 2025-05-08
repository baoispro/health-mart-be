import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('pharmacy_stock')
export class PharmacyStock {
  @PrimaryColumn()
  pharmacy_id: number;

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
}
