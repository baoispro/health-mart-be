import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('policies')
export class Policy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column()
  slug: string;
}
