import { ReviewReply } from 'src/modules/review-replies/entities/review-replies.entity';
import { ReviewImage } from 'src/modules/review_img/entities/review_img.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number;

  @Column()
  userId: number;

  @Column({ type: 'int' })
  rating: number;

  @Column({ type: 'text' })
  comment: string;

  @Column()
  isHidden: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => ReviewImage, (image) => image.review, { cascade: true })
  images: ReviewImage[];

  @OneToMany(() => ReviewReply, (reply) => reply.review, { cascade: true })
  replies: ReviewReply[];
}
