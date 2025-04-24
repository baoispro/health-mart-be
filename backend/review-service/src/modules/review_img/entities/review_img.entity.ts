// src/modules/reviews/entities/review_img.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Review } from '../../reviews/entities/review.entity';

@Entity('review_img')
export class ReviewImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  img_url: string;

  @ManyToOne(() => Review, (review) => review.images, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'reviewId' })
  review: Review;
}
