import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AuthToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  refreshToken: string;

  @Column()
  email: string;

  @Column()
  createdAt: Date;

  @Column()
  expiresAt: Date;
}
