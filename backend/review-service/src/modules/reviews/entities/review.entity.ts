// src/modules/reviews/entities/review.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number;

  @Column()
  userId: number;

  @Column('int')
  rating: number;

  @Column('text')
  comment: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
