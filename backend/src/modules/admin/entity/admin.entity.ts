import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('admins')
export class Admin extends BaseEntity {
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
        type: 'varchar'
    })
    password: string;

    @CreateDateColumn({
        select: false
    })
    created_at: string;

    @UpdateDateColumn({
        type: 'timestamp',
        select: false
    })
    updated_at: number;
}