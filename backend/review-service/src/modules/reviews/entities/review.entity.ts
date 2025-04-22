// src/modules/reviews/entities/review.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { ReviewImage } from '../../review_img/entities/review_img.entity';

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

  @OneToMany(() => ReviewImage, (reviewImage) => reviewImage.review, {
    cascade: true,
  })
  images: ReviewImage[];
}
