import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Category } from './category.entity';
import { PharmacyStock } from './pharmacy-stock.entity';
import { Ingredient } from './ingredient.entity';
import { Usage } from './usage.entity';
import { Dosage } from './dosage.entity';
import { SideEffect } from './side-effect.entity';
import { Precaution } from './precaution.entity';
import { Storage as StorageEntity } from './storage.entity';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  product_id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column()
  price: number;

  @Column({ type: 'varchar', length: 255 })
  brand: string;

  @Column({ type: 'varchar', length: 255 })
  unit: string;

  @ManyToOne(() => Category, (category) => category.products, {
    nullable: false,
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column({ type: 'varchar', length: 255 })
  specification: string;

  @Column({ type: 'varchar', length: 255 })
  country: string;

  @Column({ type: 'text' })
  short_description: string;

  @Column({ type: 'varchar', length: 255 })
  manufacturer: string;

  @Column({ type: 'varchar', length: 50 })
  registration_number: string;

  @Column({ type: 'text' })
  description_html: string;

  @Column()
  slug: string;

  @Column({ type: 'text' })
  image_url: string;

  @OneToMany(() => Ingredient, (ingredient) => ingredient.product)
  ingredients: Ingredient[];

  @OneToMany(() => Usage, (usage) => usage.product)
  usages: Usage[];

  @OneToMany(() => Dosage, (dosage) => dosage.product)
  dosages: Dosage[];

  @OneToMany(() => SideEffect, (sideEffect) => sideEffect.product)
  sideEffects: SideEffect[];

  @OneToMany(() => Precaution, (precaution) => precaution.product)
  precautions: Precaution[];

  @OneToMany(() => StorageEntity, (storage) => storage.product)
  storages: StorageEntity[];

  @OneToMany(() => PharmacyStock, (pharmacyStock) => pharmacyStock.product)
  pharmacyStock: PharmacyStock[];
}
