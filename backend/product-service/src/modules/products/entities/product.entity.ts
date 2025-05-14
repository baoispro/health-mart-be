import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Ingredient } from '../../ingredients/entities/ingredient.entity';
import { SideEffect } from '../../side_effect/entities/side_effect.entity';
import { Precaution } from '../../precautions/entities/precaution.entity';
import { Expose } from 'class-transformer';
import { Category } from '../../categories/entities/category.entity';
import { Usage } from '../../usages/entities/usage.entity';
import { Storage } from '../../storages/entities/storage.entity';
import { Dosage } from '../../dosages/entities/dosage.entity';
import { PharmacyProduct } from 'src/modules/pharmacy_product/entities/pharmacy_product.entity';

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

  @Column({ type: 'float', default: 0 })
  discount_percentage: number;

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

  @OneToMany(() => Storage, (storage) => storage.product)
  storages: Storage[];

  @OneToMany(
    () => PharmacyProduct,
    (pharmacyProduct) => pharmacyProduct.product,
  )
  pharmacyProduct: PharmacyProduct[];

  @Expose()
  get safeIngredients(): Ingredient[] {
    return this.ingredients ?? [];
  }

  @Expose()
  get safeUsages(): Usage[] {
    return this.usages ?? [];
  }

  @Expose()
  get safeDosages(): Dosage[] {
    return this.dosages ?? [];
  }

  @Expose()
  get safeSideEffects(): SideEffect[] {
    return this.sideEffects ?? [];
  }

  @Expose()
  get safePrecautions(): Precaution[] {
    return this.precautions ?? [];
  }

  @Expose()
  get safeStorages(): Storage[] {
    return this.storages ?? [];
  }

  @Expose()
  get safePharmacyProduct(): PharmacyProduct[] {
    return this.pharmacyProduct ?? [];
  }
}
