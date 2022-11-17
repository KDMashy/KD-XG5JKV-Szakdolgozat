import { Statuses } from './../../constants/Statuses.enum';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        unique: true
    })
    username: string;

    @Column({
        type: 'varchar',
        unique: true
    })
    email: string;

    @Column({
        type: 'varchar',
    })
    password: string;

    @Column({
        type: 'varchar',
    })
    first_name: string;

    @Column({
        type: 'varchar',
    })
    last_name: string;

    @Column({
        type: 'varchar',
    })
    status: string
}