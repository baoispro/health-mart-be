import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./users.enum";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    avatar: string;

    @Column()
    fullName: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    password: string;

    @Column({type: 'enum', enum: Role, default: Role.CUSTOMER})
    role: Role;
}