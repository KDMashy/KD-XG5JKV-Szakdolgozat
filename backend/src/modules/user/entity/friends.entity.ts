import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('friends')
export class Friend extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    @ManyToOne(() => User, user => user.friend_one)
    first_user: number;

    @Column()
    @ManyToOne(() => User, user => user.friend_two)
    second_user: number;
    
    @CreateDateColumn({ select: false })
    created_at: string;

    @UpdateDateColumn({ type: "timestamp", select: false})
    updated_at: number;
}